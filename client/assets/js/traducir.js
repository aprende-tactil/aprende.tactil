let utterance;
        let speechSynthesis = window.speechSynthesis;
        let isReading = false;

        async function convertPDF() {
            const fileInput = document.getElementById('pdf-file');
            const file = fileInput.files[0];

            if (!file) {
                alert('Por favor, selecciona un archivo PDF');
                return;
            }

            const pdfData = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + ' ';
            }

            speakText(text);
        }

        function speakText(text) {
            if (utterance) {
                speechSynthesis.cancel(); // Detiene cualquier reproducción anterior
            }

            utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES'; // Código para español (España)
            utterance.onend = function() {
                isReading = false;
            };
            speechSynthesis.speak(utterance);
            isReading = true;
        }

        function stopSpeech() {
            speechSynthesis.cancel(); // Detiene la reproducción actual
            isReading = false;
        }

        // Manejadores de eventos de teclado
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                if (!isReading) {
                    convertPDF();
                }
            } else if (event.key === 'Escape') {
                if (isReading) {
                    stopSpeech();
                } else {
                    window.history.back();
                }
            }
        });
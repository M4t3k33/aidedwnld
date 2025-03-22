document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', handleDownload);
    });

    async function handleDownload(e) {
        // Znajdź główny przycisk nawet jeśli kliknięto ikonę
        const button = e.target.closest('.download-btn');
        if (!button) return;
        
        e.preventDefault();
        
        const originalText = button.innerHTML;
        const filePath = './downloads/AIDE Assistant Setup 0.4.0.exe';
        
        try {
            // Zmiana stanu przycisku
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Przygotowywanie...';
            button.disabled = true;

            // Sprawdzenie czy plik istnieje
            const response = await fetch(filePath, { method: 'HEAD' });
            if (!response.ok) {
                throw new Error('Plik nie jest obecnie dostępny');
            }

            // Rozpoczęcie pobierania
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Pobieranie...';
            
            const downloadLink = document.createElement('a');
            downloadLink.href = filePath;
            downloadLink.download = 'AIDE Assistant Setup 0.4.0.exe';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // Sukces
            button.innerHTML = '<i class="fas fa-check"></i> Pobieranie rozpoczęte!';
            
            // Przywróć oryginalny stan po 3 sekundach
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);

        } catch (error) {
            // Obsługa błędu
            console.error('Błąd pobierania:', error);
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Błąd pobierania';
            
            // Przywróć oryginalny stan po 3 sekundach
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);
        }
    }
}); 
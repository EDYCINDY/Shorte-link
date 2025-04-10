
        // Fungsi untuk menghasilkan string acak sederhana
        function generateRandomString(length = 6) {
            const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        function generateLink() {
            const longUrlInput = document.getElementById('longUrl');
            const shortCodeInput = document.getElementById('shortCode');
            const resultDiv = document.getElementById('result');
            const shortUrlSpan = document.getElementById('shortUrl');
            const jsonOutputCode = document.getElementById('json-output');

            const longUrl = longUrlInput.value.trim();
            let shortCode = shortCodeInput.value.trim();

            if (!longUrl) {
                alert('URL Panjang tidak boleh kosong!');
                return;
            }

            // Coba validasi URL sederhana
            try {
                new URL(longUrl);
            } catch (_) {
                alert('Masukkan URL yang valid (misalnya, diawali dengan http:// atau https://)');
                return;
            }

            if (!shortCode) {
                shortCode = generateRandomString();
            } else {
                // Sanitasi sederhana untuk kode pendek (hanya huruf, angka, tanda hubung)
                shortCode = shortCode.replace(/[^a-zA-Z0-9-]/g, '');
                if (!shortCode) {
                    alert('Kode Pendek tidak valid setelah sanitasi. Gunakan huruf, angka, atau tanda hubung (-).');
                    shortCode = generateRandomString(); // fallback ke acak
                    shortCodeInput.value = shortCode; // update input field
                }
            }

            // Dapatkan base URL GitHub Pages (perlu disesuaikan!)
            // Asumsi format: https://USERNAME.github.io/REPO_NAME/
            // Ganti 'USERNAME' dan 'REPO_NAME' dengan milik Anda!
            const githubUsername = "edycindy"; // <-- GANTI INI
            const githubRepoName = "Slink"; // <-- GANTI INI
            const baseUrl = `https://${githubUsername}.github.io/${githubRepoName}/`;

            const finalShortUrl = baseUrl + shortCode;
            const jsonEntry = `  "${shortCode}": "${longUrl}"`; // Tambahkan indentasi untuk kerapian

            shortUrlSpan.textContent = finalShortUrl;
            shortUrlSpan.innerHTML = `<a href="${finalShortUrl}" target="_blank">${finalShortUrl}</a> (Belum Aktif!)`;
            jsonOutputCode.textContent = jsonEntry;
            resultDiv.style.display = 'block';
        }

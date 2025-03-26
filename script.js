async function shortenURL() {
    const longUrl = document.getElementById('long-url').value;
    
    const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl })
    });

    const data = await response.json();
    document.getElementById('shortened-url').innerHTML = `Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
}

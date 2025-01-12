document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Collect form data

    fetch('/send-email', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        alert(data.message); // Show success or error message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message.');
    });
});

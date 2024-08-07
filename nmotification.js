document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('alertModal');
    const closeButton = document.querySelector('.close-button');

    // Add event listeners for the alert icons
    const alertIcons = document.querySelectorAll('.alert-icon');
    alertIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const matchDateTime = icon.getAttribute('data-match');
            openModal(matchDateTime);
        });
    });

    // Function to open the modal
    function openModal(matchDateTime) {
        modal.style.display = 'block';
        document.getElementById('setAlertButton').setAttribute('data-match', matchDateTime);
        document.getElementById('alertMinutes').value = ''; // Clear previous input
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Event listener for the close button
    closeButton.addEventListener('click', closeModal);

    // Event listener for clicks outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Setting alert when the button is clicked within the modal
    document.getElementById('setAlertButton').addEventListener('click', () => {
        const alertMinutes = parseInt(document.getElementById('alertMinutes').value, 10);
        const matchDateTime = document.getElementById('setAlertButton').getAttribute('data-match');

        if (alertMinutes && matchDateTime) {
            scheduleMatchAlert(matchDateTime, alertMinutes);
            closeModal();
        } else {
            alert('Please enter a valid number of minutes.');
        }
    });
});

// Function to schedule alerts for matches
function scheduleMatchAlert(matchDateTime, alertMinutes) {
    const matchDate = new Date(matchDateTime);
    const notificationTime = matchDate.getTime() - (alertMinutes * 60 * 1000); // Convert minutes to milliseconds

    const currentTime = new Date().getTime();
    if (notificationTime > currentTime) {
        const timeDifference = notificationTime - currentTime; // Calculate time until notification

        // Set a timeout for the notification alert
        setTimeout(() => {
            alert(`🟡 Notification: Your selected match is starting in ${alertMinutes} minutes!`);
        }, timeDifference);
        
        // Confirmation message
        document.getElementById('alertMessage').innerText = 'Alert set successfully!';
    } else {
        // Inform the user if they selected a past match
        document.getElementById('alertMessage').innerText = 'Please select a future match.';
    }
}

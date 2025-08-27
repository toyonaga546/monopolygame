// This file manages the interactions on the rules screen, such as displaying the rules and navigating back to the start screen.

document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');

    backButton.addEventListener('click', function() {
        window.location.href = 'start.html';
    });
});
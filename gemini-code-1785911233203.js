// app.js
document.addEventListener('DOMContentLoaded', () => {
    
    const continueBtn = document.getElementById('continueBtn');
    const authBox = document.getElementById('authBox');
    const verifyBox = document.getElementById('verifyBox');
    const simulateVerifyBtn = document.getElementById('simulateVerifyBtn');

    // Simulate clicking "Register/Continue"
    if(continueBtn) {
        continueBtn.addEventListener('click', () => {
            authBox.classList.add('hidden');
            verifyBox.classList.remove('hidden');
        });
    }

    // Simulate clicking the link in the email
    if(simulateVerifyBtn) {
        simulateVerifyBtn.addEventListener('click', () => {
            alert('Email verified successfully! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        });
    }
});
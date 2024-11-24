let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let generatedOTP = '';

document.addEventListener('DOMContentLoaded', function() {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const otpForm = document.getElementById('otp-form');
    const mainPage = document.getElementById('main-page');
    const unlockPasswordInput = document.getElementById('unlock-password');
    const unlockButton = document.getElementById('unlock-button');
    const otpInput = document.getElementById('otp-input');
    const verifyOtpButton = document.getElementById('verify-otp-button');

    // Check if user is logged in
    if (!currentUser) {
        window.location.href = 'feeproject.html'; // Redirect to login page if not logged in
        return;
    }

    unlockButton.addEventListener('click', unlockQRCode);
    verifyOtpButton.addEventListener('click', verifyOTP);

    function generateQRCode() {
        const qrContainer = document.getElementById('qr-code');
        qrContainer.innerHTML = ''; // Clear previous QR code
        
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        
        new QRCode(qrContainer, {
            text: generatedOTP,
            width: 128,
            height: 128
        });

        console.log('QR Code generated with OTP:', generatedOTP); // Debugging line
    }

    function unlockQRCode() {
        const unlockPassword = unlockPasswordInput.value;
        
        if (unlockPassword === currentUser.password) {
            qrCodeContainer.classList.add('hidden');
            otpForm.classList.remove('hidden');
            generateQRCode();
        } else {
            alert('Incorrect password');
        }
    }

    function verifyOTP() {
        const enteredOTP = otpInput.value;
        
        if (enteredOTP === generatedOTP) {
            otpForm.classList.add('hidden');
            mainPage.classList.remove('hidden');
        } else {
            alert('Incorrect OTP');
        }
    }
});



function verifyOTP() {
    const enteredOTP = otpInput.value;
    
    if (enteredOTP === generatedOTP) {
        otpForm.classList.add('hidden');
        mainPage.classList.remove('hidden');
        localStorage.setItem('isAuthenticated', 'true');
    } else {
        alert('Incorrect OTP');
    }
}






// localStorage.setItem('currentUser', JSON.stringify({
//     username: user.username,
//     email: user.email,
//     phone: user.phone || '',
//     profilePicture: user.profilePicture || '/placeholder.svg?height=128&width=128'
// }));
// localStorage.setItem('isAuthenticated', 'true');




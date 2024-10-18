document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.querySelector('.countdown-section');
    const emailInput = document.querySelector('.email-input')
    const submitButton = document.querySelector('.notify-button')
    // NOTE: MOVE DEPLOYEMENT_ID IN CONFIG BEFORE DEPLOYMENT
    const deploymentId = 'AKfycbyOa4cOLCPpRAYehNxaKXdLry6dGBrHLFo701gC6qVXyttquBZ6sCap71TKvtizUYAQ'
    const apiURL = `https://script.google.com/macros/s/${deploymentId}/exec`

    const validateEmail = (email) => {
        if (!email) return false;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }


    submitButton.addEventListener('click', async (e) => {
        e.preventDefault()

        email = emailInput.value.trim();

        if (!validateEmail(email)) {
            return alert('Please enter a valid email address.')
        }
    
        try {
            submitButton.disabled = true;
            const response = await fetch(apiURL, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': "text/plain;charset=utf-8"
                }
            });

            const result = await response.json();
            if (result.status === 'success') {
                window.location.href = 'thank-you.html';
            } else {
                throw new Error('Failed to submit email.');
            }
        } catch (ex) {
            console.error(ex)
            alert('Something went wrong, please try again.');
        }
        finally {
            submitButton.disabled = false;
        }
    })



    const updateCountdown = () => {
        const now = new Date().getTime();
        const targetDate = new Date('2024-11-01T00:00:00').getTime();
        const timeRemaining = targetDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        countdownElement.innerHTML = `
            <div class="time-unit">
                <span class="number">${days}</span>
                <span class="label">Days</span>
            </div>
            <div class="time-unit">
                <span class="number">${hours}</span>
                <span class="label">Hours</span>
            </div>
            <div class="time-unit">
                <span class="number">${minutes}</span>
                <span class="label">Minutes</span>
            </div>
        `;
    };

    setInterval(updateCountdown, 5000);
});

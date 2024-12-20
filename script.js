document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('.email-input')
    const submitButton = document.querySelector('.subscribe-button')
    const errorMessage = document.querySelector('.error-message');
    const successMessage = document.querySelector('.success-message');
    const visualizeDataBtn = document.querySelector(".visualize-data-button");

    const deploymentId = 'AKfycbzWFI_9TEk3r_MHuBWBJJuYUgemJBg0i796TE_nk1DrsXzIzVfJdrgYHpQGo7pBfhROrA'
    const apiURL = `https://script.google.com/macros/s/${deploymentId}/exec`

    const validateEmail = (email) => {
        if (!email) return false;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function setDeviceType() {
        const tableauVizs = document.querySelectorAll("#tableauViz");

        tableauVizs.forEach(viz => {
            if (window.innerWidth <= 767) {
                viz.setAttribute("device", "phone");
            } else if (window.innerWidth <= 1024) {
                viz.setAttribute("device", "tablet");
            } else {
                viz.setAttribute("device", "desktop");
            }
        })
    }


    submitButton.addEventListener('click', async (e) => {
        e.preventDefault()

        email = emailInput.value.trim();
        successMessage.style.display = 'none';

        if (!validateEmail(email)) {
            emailInput.classList.add('error');
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'inline';
            return;
        } else {
            errorMessage.style.display = 'none';
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
                successMessage.style.display = 'inline';
                emailInput.value = ''
                emailInput.classList.remove('error');
            } else {
                throw new Error('Failed to submit email.');
            }
        } catch (ex) {
            console.error(ex)
            emailInput.classList.add('error');
            errorMessage.style.display = 'inline';
            errorMessage.textContent = 'Something went wrong, please try again'
        }
        finally {
            submitButton.disabled = false;
        }
    })

    visualizeDataBtn.addEventListener("click", function () {
        document.querySelector(".deal-dashboard-section").scrollIntoView({
            behavior: "smooth"
        });
    });

    window.onload = setDeviceType;

});

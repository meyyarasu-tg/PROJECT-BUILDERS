
        let fullscreenContainer; // Define the fullscreen container globally

        // Function to open the image in fullscreen
        function openFullscreen(img) {
            // Create a fullscreen container div
            fullscreenContainer = document.createElement("div");
            fullscreenContainer.classList.add("fullscreen-image");

            // Clone the image and append it to the fullscreen container
            const fullscreenImg = img.cloneNode();
            fullscreenImg.style.width = 'auto'; // Ensure width is auto
            fullscreenImg.style.height = 'auto'; // Ensure height is auto
            fullscreenContainer.appendChild(fullscreenImg);

            // Append the fullscreen container to the body
            document.body.appendChild(fullscreenContainer);

            // Push state to history to detect back button press
            history.pushState({fullscreen: true}, null, "");

            // Add event listener to close the fullscreen when the container is clicked
            fullscreenContainer.onclick = function () {
                closeFullscreen();
            };
        }

        // Function to close fullscreen
        function closeFullscreen() {
            if (fullscreenContainer) {
                document.body.removeChild(fullscreenContainer);
                fullscreenContainer = null;
            }
        }

        // Listen for back button to close fullscreen instead of navigating away
        window.onpopstate = function(event) {
            if (event.state && event.state.fullscreen) {
                closeFullscreen(); // Close fullscreen when back button is pressed
            }
        };

        // Function to initiate payment via Instamojo
        function initiatePayment(projectID) {
            const paymentLink = 'payment.html';
            const redirectURL = `handler.html?project=${projectID}`;
            window.location.href = `${paymentLink}?redirect_url=${encodeURIComponent(redirectURL)}`;
        }

        // Function to order project via WhatsApp
        function orderProject(projectTitle) {
            const whatsappUrl = `https://wa.me/917603846096?text=I%20would%20like%20to%20order%20the%20project:%20${encodeURIComponent(projectTitle)}`;
            window.location.href = whatsappUrl;
        }
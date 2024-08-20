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

// Function to initiate payment via Razorpay
function initiatePayment(projectID, amount = 100) {
    const options = {
        "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        "amount": amount * 100, // Amount in paise (100 INR = 10000 paise)
        "currency": "INR",
        "name": "PROJECT BUILDERS",
        "description": `Payment for ${projectID}`,
        "image": "https://your-logo-url.com", // Optional: Add your logo URL
        "handler": function (response) {
            // Payment successful, redirect to handler.html with projectID and payment_id
            const redirectURL = `handler.html?project=${projectID}&payment_id=${response.razorpay_payment_id}`;
            window.location.href = redirectURL;
        },
        "prefill": {
            "name": "Customer Name",
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#F37254" // Customize the theme color
        }
    };

    const rzp = new Razorpay(options);

    // Open the Razorpay modal for payment
    rzp.open();

    // Optional: Handle payment failure
    rzp.on('payment.failed', function (response) {
        alert("Payment failed. Please try again.");
        console.error(response.error);
    });
}


        // Function to order project via WhatsApp
        function orderProject(projectTitle) {
            const whatsappUrl = `https://wa.me/917603846096?text=I%20would%20like%20to%20order%20the%20project:%20${encodeURIComponent(projectTitle)}`;
            window.location.href = whatsappUrl;
        }
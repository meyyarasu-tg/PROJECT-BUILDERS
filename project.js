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
function initiatePayment(projectID, amount) {
    const options = {
        "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        "amount": amount * 100, // Amount in paise
        "currency": "INR",
        "name": "Your Company Name",
        "description": `Payment for ${projectID}`,
        "image": "https://your-logo-url.com", // Optional
        "handler": function (response) {
            const redirectURL = `handler.html?project=${projectID}&payment_id=${response.razorpay_payment_id}`;
            window.location.href = redirectURL;
        },
        "prefill": {
            "name": "Customer Name",
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#F37254"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
        alert("Payment failed. Please try again.");
        console.error(response.error);
    });
}

// Function to order a project via WhatsApp
function orderProject(projectName) {
    const whatsappUrl = `https://wa.me/917603846096?text=I%20would%20like%20to%20order%20the%20project:%20${encodeURIComponent(projectName)}`;
    window.location.href = whatsappUrl;
}

// Automatically assign project IDs and set up event listeners
document.querySelectorAll('.project-table').forEach((table) => {
    const department = table.getAttribute('data-department');  // Get the department name
    const rows = table.querySelectorAll('tbody tr');  // Get all rows in the table

    rows.forEach((row, index) => {
        const paymentButton = row.querySelector('.payment-btn');
        const orderButton = row.querySelector('.order-btn');
        
        // Automatically generate projectID based on department and row index
        const projectID = `${department}project${index + 1}`;
        const amount = paymentButton.getAttribute('data-amount');  // Get amount
        
        // Automatically get the project name from the first <td> of the row
        const projectName = row.querySelector('td').innerText;

        // Set up payment button click handler
        paymentButton.addEventListener('click', function () {
            initiatePayment(projectID, amount);
        });

        // Set up order button click handler for ordering project
        orderButton.addEventListener('click', function () {
            orderProject(projectName);
        });
    });
});

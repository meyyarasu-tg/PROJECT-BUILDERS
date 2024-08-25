document.addEventListener('DOMContentLoaded', function() {
    // Function to initiate payment
    function initiatePayment(projectID, amount) {
        const options = {
            key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
            amount: 100 * amount,
            currency: "INR",
            name: "PROJECT BUILDERS",
            description: `Payment for ${projectID}`,
            image: "https://your-logo-url.com", // Replace with your logo URL
            handler: function (response) {
                const redirectURL = `handler.html?project=${projectID}&payment_id=${response.razorpay_payment_id}`;
                window.location.href = redirectURL;
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#F37254"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

        rzp.on("payment.failed", function (response) {
            alert("Payment failed. Please try again.");
            console.error(response.error);
        });
    }

   function orderProject(button) {
    // Find the parent container with the project title
    const projectItem = button.closest('.project-item');
    const projectTitle = projectItem.querySelector('.project-title').textContent.trim();

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/917603846096?text=I%20would%20like%20to%20order%20the%20project:%20${encodeURIComponent(projectTitle)}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
}

// Attach event listeners to all "Order Project" buttons
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        orderProject(this);
    });
});

        const paymentButtons = grid.querySelectorAll(".payment-btn");
        paymentButtons.forEach((button, index) => {
            const projectID = `project${index + 1}`;
            const amount = button.getAttribute("data-amount");

            button.addEventListener("click", function () {
                initiatePayment(projectID, amount);
            });
        });
    });
});
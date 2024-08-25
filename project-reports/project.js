document.addEventListener('DOMContentLoaded', function() {
    // Function to initiate payment
    function initiatePayment(projectID, amount) {
        const options = {
            key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
            amount: 100 * amount,
            currency: "INR",
            name: "Your Company Name",
            description: `Payment for ${projectID}`,
            image: "https://your-logo-url.com", // Replace with your logo URL
            handler: function(response) {
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

        rzp.on("payment.failed", function(response) {
            alert("Payment failed. Please try again.");
            console.error(response.error);
        });
    }

    // Function to handle the order project action
    function orderProject(projectName) {
        const whatsappUrl = `https://wa.me/917603846096?text=I%20would%20like%20to%20order%20the%20project:%20${encodeURIComponent(projectName)}`;
        console.log("WhatsApp URL:", whatsappUrl); // Debugging line
        window.location.href = whatsappUrl;
    }

    // Add event listeners to all "Order Project" buttons
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function() {
            console.log("Order button clicked"); // Debugging line
            const projectItem = this.closest('.project-item');
            const projectName = projectItem.previousElementSibling.innerText.trim();
            console.log("Project Name:", projectName); // Debugging line
            orderProject(projectName);
        });
    });

    // Add event listeners to all "Download" buttons
    document.querySelectorAll('.payment-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectID = `project${this.closest('.project-item').previousElementSibling.innerText.trim()}`;
            const amount = this.getAttribute('data-amount');
            initiatePayment(projectID, amount);
        });
    });
});

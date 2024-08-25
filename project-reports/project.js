document.addEventListener('DOMContentLoaded', function() {
    // Handle payment buttons
    const paymentButtons = document.querySelectorAll('.payment-btn');
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            const options = {
                "key": "your_razorpay_key", // Enter the Key ID generated from the Razorpay Dashboard
                "amount": amount * 100, // Razorpay accepts amount in paise (multiply by 100)
                "currency": "INR",
                "name": "Project Report",
                "description": "Download Civil Project Report",
                "handler": function (response) {
                    alert("Payment successful! Transaction ID: " + response.razorpay_payment_id);
                    // You can add further logic to download the file here
                },
                "prefill": {
                    "name": "Your Name",
                    "email": "your.email@example.com",
                    "contact": "9999999999"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
        });
    });

    // Handle order buttons
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectName = this.closest('.project-item').textContent.trim();
            const customerName = prompt("Enter your name:");
            const customerCollege = prompt("Enter your college name:");
            const customerAddress = prompt("Enter your delivery address:");

            if (customerName && customerCollege && customerAddress) {
                alert(`Order placed successfully for ${projectName}.\n\nDetails:\nName: ${customerName}\nCollege: ${customerCollege}\nAddress: ${customerAddress}`);
                // Implement order submission logic here, e.g., sending data to a backend server
            } else {
                alert("Please provide all details to place the order.");
            }
        });
    });
});

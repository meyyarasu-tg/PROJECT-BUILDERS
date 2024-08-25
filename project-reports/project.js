// Payment initiation function
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

        // Project ordering function via WhatsApp
        function orderProject(projectName) {
            const whatsappUrl = `https://wa.me/917603846096?text=I%20would%20like%20to%20order%20the%20project:%20${encodeURIComponent(projectName)}`;
            window.location.href = whatsappUrl;
        }

        // Adding event listeners to buttons
        document.querySelectorAll(".project-grid .project-item").forEach((item, index) => {
            const paymentButton = item.querySelector(".payment-btn");
            const orderButton = item.querySelector(".order-btn");
            const projectID = `project${index + 1}`;
            const amount = paymentButton.getAttribute("data-amount");

            if (paymentButton) {
                paymentButton.addEventListener("click", function () {
                    initiatePayment(projectID, amount);
                });
            }

            if (orderButton) {
                orderButton.addEventListener("click", function () {
                    const projectName = item.previousElementSibling.innerText;
                    orderProject(projectName);
                });
            }
        });
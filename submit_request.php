<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $requestType = htmlspecialchars($_POST['request_type']);
    $topic = htmlspecialchars($_POST['topic']);

    // Email settings
    $to = "projectbuilders.eng@gmail.com"; // Replace with your email address
    $subject = "New Request from $name";
    $message = "Name: $name\nEmail: $email\nRequest Type: $requestType\nTopic: $topic";
    $headers = "From: $email"; // Sender's email address

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Request submitted successfully.";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request method.";
}
?>

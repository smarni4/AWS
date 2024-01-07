<?php

$name = $POST['name'];
$email = $POST['email'];
$message = $POST['message'];

$subject = "New Contact from DJ BUNNY Website";
$body = "Name: $name\nEmail: $email\nMessage:\n$message";

$headers = "From: DJ BUNNY Website <no-reply@djbunny_svp.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

if (mail("srikanthmarni147@gmail.com", $subject, $body, $headers)) {
    echo "success"; // Indicate successful email sending
} else {
    echo "error"; // Indicate email sending failure
}


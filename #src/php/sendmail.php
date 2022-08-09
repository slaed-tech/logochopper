<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer-6.6.3/src/PHPMailer.php';
    require 'PHPMailer-6.6.3/src/Exception.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true);

    // to
    $mail->addAddress('logochopper@gmail.com');
    // theme of letter
    $mail->Subject = 'Hello from Logochopper!';

    // body of letter
    $body = '<h1>Body of Letter</h1>';

    if (trim(!empty($_POST['name']))) {
        $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p';
    }
    if (trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p';
    }
    if (trim(!empty($_POST['tel']))) {
        $body.='<p><strong>Phone:</strong> '.$_POST['tel'].'</p';
    }

    $mail->$body = $body;

    // Send
    if (!$mail->send()) {
        $message = 'Error';
    } else {
        $message = 'Success!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>
<?php
/*
THIS FILE USES PHPMAILER INSTEAD OF THE PHP MAIL() FUNCTION
*/

require 'PHPMailer-master/PHPMailerAutoload.php';

/*
*  CONFIGURE EVERYTHING HERE
*/

// an email address that will be in the From field of the email.
$fromEmail = 'info@thatdirtydog.com';
$fromName = 'That Dirty Dog';

// an email address that will receive the email with the output of the form
$sendToEmail = 'pickme@thatdirtydog.com';
$sendToName = 'That Dirty Dog';

// subject of the email
$subject = 'Employment Application';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('firstname' => 'First name', 'lastname' => 'Last name', 'phone' => 'Phone', 'email' => 'Email', 'address' => 'Address', 'city' => 'City, State, Zip', 'referral' => 'Referred by', 'position' => 'Applying for', 'workdays' => 'Days available', 'workhours' => 'Hours available', 'citizenship' => 'Authorized to work in the US', 'highesteducation' => 'Highest level of education', 'yearscompleted' => 'High school years completed', 'schoolname' => 'School name', 'collegetraining' => 'College training', 'skills' => 'Skills', 'driverslicense' => 'Has drivers license', 'felony' => 'Convicted of felony', 'felonydescription' => 'Felony description', 'employer1' => 'Employer', 'position1' => 'Position', 'employerphone1' => 'Phone', 'employeraddress1' => 'Address', 'employercity1' => 'City, State, Zip', 'startedworking1' => 'Started working', 'stoppedworking1' => 'Stopped working', 'startingpay1' => 'Starting pay', 'endingpay1' => 'Ending pay', 'reason1' => 'Reason for leaving', 'duties1' => 'Job duties', 'employer2' => 'Employer', 'position2' => 'Position', 'employerphone2' => 'Phone', 'employeraddress2' => 'Address', 'employercity2' => 'City, State, Zip', 'startedworking2' => 'Started working', 'stoppedworking2' => 'Stopped working', 'startingpay2' => 'Starting pay', 'endingpay2' => 'Ending pay', 'reason2' => 'Reason for leaving', 'duties2' => 'Job duties', 'employer3' => 'Employer', 'position3' => 'Position', 'employerphone3' => 'Phone', 'employeraddress3' => 'Address', 'employercity3' => 'City, State, Zip', 'startedworking3' => 'Started working', 'stoppedworking3' => 'Stopped working', 'startingpay3' => 'Starting pay', 'endingpay3' => 'Ending pay', 'reason3' => 'Reason for leaving', 'duties3' => 'Job duties', 'otheremployers' => 'Other employers', 'contactemployers' => 'Contact employers', 'whichemployers' => 'Employers that may be contacted', 'legal1' => 'Routine inquiry', 'legal2' => 'Past employment', 'legal3' => 'False statement', 'signature' => 'Signature', 'date' => 'Date');

// message that will be displayed when everything is OK :)
$okMessage = 'Thank you for submitting your application.';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting the form. Please try again.';

/*
*  LET'S DO THE SENDING
*/

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(0);

try
{
    
    if(count($_POST) == 0) throw new \Exception('Form is empty');
    
    $emailTextHtml = "<h1>You have a new employment application</h1><hr>";
    $emailTextHtml .= "<table>";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email
        if (isset($fields[$key])) {
            $emailTextHtml .= "<tr><td><strong>$fields[$key]</strong></td><td>$value</td></tr>";
        }
    }
    $emailTextHtml .= "</table><hr>";
    
    $mail = new PHPMailer;

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($sendToEmail, $sendToName); // you can add more addresses by simply adding another line with $mail->addAddress();
    $mail->addReplyTo($from);
    
    $mail->isHTML(true);

    $mail->Subject = $subject;
    $mail->msgHTML($emailTextHtml); // this will also create a plain-text version of the HTML email, very handy
    
    
    if(!$mail->send()) {
        throw new \Exception('I could not send the email.' . $mail->ErrorInfo);
    }
    
    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    // $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}


// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);
    
    header('Content-Type: application/json');
    
    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}
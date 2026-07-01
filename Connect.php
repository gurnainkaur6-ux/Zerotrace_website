<?php
// Secure contact form handler for ZeroTrace
// Works with XAMPP default MySQL: user 'root', no password. Adjust credentials for production.

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'cyber';

// Create connection
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($mysqli->connect_errno) {
    http_response_code(500);
    // Don't reveal DB details in production
    echo 'Database connection failed. Please try again later.';
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

// Helper to fetch POST values safely
function post_trim($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

$fname = post_trim('fname');
$lname = post_trim('lname');
$email = post_trim('email');
$phone = post_trim('phone');
$company = post_trim('company');
$title = post_trim('title');
$inquiryType = post_trim('inquiryType');
$companySize = post_trim('companySize');
$message = post_trim('message');
$plan = post_trim('plan');

$newsletter = isset($_POST['newsletter']) ? 1 : 0;
$privacy = isset($_POST['privacy']) ? 1 : 0;

// Basic validation
$errors = [];
if ($fname === '') $errors[] = 'First name is required.';
if ($lname === '') $errors[] = 'Last name is required.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email is required.';
if ($message === '') $errors[] = 'Message is required.';
if (!$privacy) $errors[] = 'You must agree to the Privacy Policy and Terms of Service.';

if (!empty($errors)) {
    http_response_code(400);
    foreach ($errors as $err) {
        echo htmlspecialchars($err, ENT_QUOTES, 'UTF-8') . "<br>";
    }
    exit;
}

// Prepared statement to insert data
$stmt = $mysqli->prepare(
    "INSERT INTO contacts (fname, lname, email, phone, company, title, inquiryType, companySize, message, plan, newsletter, privacy, created_at)\n     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
);

if (!$stmt) {
    http_response_code(500);
    echo 'Database error (prepare).';
    exit;
}

// Bind parameters: s = string, i = integer
$stmt->bind_param(
    'ssssssssssii',
    $fname, $lname, $email, $phone, $company, $title, $inquiryType, $companySize, $message, $plan, $newsletter, $privacy
);

if ($stmt->execute()) {
    // Redirect back to contact page and include plan if present
    $redirect = 'contact.html?submitted=1';
    if (!empty($plan)) {
        $redirect .= '&plan=' . urlencode($plan);
    }
    header('Location: ' . $redirect);
    exit;
} else {
    http_response_code(500);
    echo 'Database error (execute). Please try again later.';
}

$stmt->close();
$mysqli->close();
?>
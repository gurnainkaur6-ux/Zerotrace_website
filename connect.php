<?php
/**
 * ZeroTrace Contact Form Handler
 * Handles form submissions and stores data in MySQL database
 * 
 * Database: cyber
 * Table: contacts
 * 
 * Requirements:
 * - MySQL Server running
 * - Database "cyber" created
 * - Table "contacts" created with proper schema
 */

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================

$db_host = 'localhost';      // Database server address
$db_user = 'root';           // Database username
$db_pass = '';               // Database password
$db_name = 'cyber';          // Database name

// Note: For production, use environment variables instead of hardcoding
// $db_host = getenv('DB_HOST');
// $db_user = getenv('DB_USER');
// $db_pass = getenv('DB_PASS');
// $db_name = getenv('DB_NAME');

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($mysqli->connect_errno) {
    http_response_code(500);
    error_log("Database Connection Error: " . $mysqli->connect_error);
    // Don't reveal database details to users in production
    echo 'Database connection failed. Please try again later.';
    exit;
}

// Set charset to UTF-8
$mysqli->set_charset("utf8mb4");

// ============================================================================
// REQUEST METHOD VALIDATION
// ============================================================================

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed. Only POST requests are accepted.';
    exit;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Safely retrieve and trim POST values
 * 
 * @param string $key The POST parameter key
 * @return string Trimmed value or empty string if not set
 */
function post_trim($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

/**
 * Sanitize email address
 * 
 * @param string $email Email to sanitize
 * @return string Sanitized email
 */
function sanitize_email($email) {
    return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
}

/**
 * Sanitize string input
 * 
 * @param string $input String to sanitize
 * @return string Sanitized string
 */
function sanitize_string($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// ============================================================================
// RETRIEVE FORM DATA
// ============================================================================

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

// Checkboxes (default to 0 if not checked)
$newsletter = isset($_POST['newsletter']) ? 1 : 0;
$privacy = isset($_POST['privacy']) ? 1 : 0;

// ============================================================================
// FORM VALIDATION
// ============================================================================

$errors = [];

// Validate required fields
if (empty($fname)) {
    $errors[] = 'First name is required.';
} elseif (strlen($fname) > 100) {
    $errors[] = 'First name must not exceed 100 characters.';
}

if (empty($lname)) {
    $errors[] = 'Last name is required.';
} elseif (strlen($lname) > 100) {
    $errors[] = 'Last name must not exceed 100 characters.';
}

if (empty($email)) {
    $errors[] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
} elseif (strlen($email) > 150) {
    $errors[] = 'Email address must not exceed 150 characters.';
}

if (empty($message)) {
    $errors[] = 'Message is required.';
} elseif (strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters long.';
}

if (empty($inquiryType)) {
    $errors[] = 'Please select an inquiry type.';
}

// Validate optional fields if provided
if (!empty($phone) && strlen($phone) > 20) {
    $errors[] = 'Phone number must not exceed 20 characters.';
}

if (!empty($company) && strlen($company) > 150) {
    $errors[] = 'Company name must not exceed 150 characters.';
}

if (!empty($title) && strlen($title) > 100) {
    $errors[] = 'Job title must not exceed 100 characters.';
}

if (!empty($plan) && strlen($plan) > 100) {
    $errors[] = 'Plan must not exceed 100 characters.';
}

// Validate privacy agreement
if (!$privacy) {
    $errors[] = 'You must agree to the Privacy Policy and Terms of Service.';
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

if (!empty($errors)) {
    http_response_code(400);
    // Return error messages as HTML
    echo '<div style="background-color: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; font-family: Arial, sans-serif; margin: 20px;">';
    echo '<h3 style="margin-top: 0;">Form Submission Error:</h3>';
    echo '<ul style="margin: 10px 0;">';
    foreach ($errors as $err) {
        echo '<li>' . htmlspecialchars($err, ENT_QUOTES, 'UTF-8') . '</li>';
    }
    echo '</ul>';
    echo '<p><a href="contact.html" style="color: #721c24; text-decoration: underline;">Go back to contact form</a></p>';
    echo '</div>';
    exit;
}

// ============================================================================
// DATABASE INSERTION
// ============================================================================

// Prepare SQL statement with parameterized query (prevents SQL injection)
$stmt = $mysqli->prepare(
    "INSERT INTO contacts (fname, lname, email, phone, company, title, inquiryType, companySize, message, plan, newsletter, privacy, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
);

// Check if prepare was successful
if (!$stmt) {
    http_response_code(500);
    error_log("Database Prepare Error: " . $mysqli->error);
    echo '<div style="background-color: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; font-family: Arial, sans-serif; margin: 20px;">';
    echo '<h3 style="margin-top: 0;">Submission Error</h3>';
    echo '<p>There was an error processing your request. Please try again later.</p>';
    echo '<p><a href="contact.html" style="color: #721c24; text-decoration: underline;">Go back to contact form</a></p>';
    echo '</div>';
    exit;
}

// Bind parameters to the prepared statement
// Parameter types: s = string, i = integer
$stmt->bind_param(
    'ssssssssssii',
    $fname,
    $lname,
    $email,
    $phone,
    $company,
    $title,
    $inquiryType,
    $companySize,
    $message,
    $plan,
    $newsletter,
    $privacy
);

// Execute the prepared statement
if ($stmt->execute()) {
    // Successful submission
    $record_id = $stmt->insert_id;
    error_log("Contact form submitted successfully. Record ID: " . $record_id . " | Email: " . $email);
    
    // Redirect back to contact page with success indicator
    $redirect = 'contact.html?submitted=1&id=' . $record_id;
    
    // Add plan to redirect if provided
    if (!empty($plan)) {
        $redirect .= '&plan=' . urlencode($plan);
    }
    
    // Perform redirect
    header('Location: ' . $redirect);
    exit;
    
} else {
    // Execution failed
    http_response_code(500);
    error_log("Database Execute Error: " . $stmt->error . " | Email: " . $email);
    echo '<div style="background-color: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; font-family: Arial, sans-serif; margin: 20px;">';
    echo '<h3 style="margin-top: 0;">Submission Error</h3>';
    echo '<p>There was an error saving your information. Please try again later.</p>';
    echo '<p><a href="contact.html" style="color: #721c24; text-decoration: underline;">Go back to contact form</a></p>';
    echo '</div>';
}

// ============================================================================
// CLEANUP
// ============================================================================

$stmt->close();
$mysqli->close();

?>

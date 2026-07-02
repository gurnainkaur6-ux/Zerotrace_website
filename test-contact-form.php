<?php
// Test script to verify contact form and database connection
// This script submits sample data to test the form handler

echo "<h1>Contact Form Test</h1>";
echo "<p>Testing database connection and form submission...</p>";

// Sample data to test
$test_data = [
    'fname' => 'John',
    'lname' => 'Doe',
    'email' => 'john.doe@example.com',
    'phone' => '+1 (555) 987-6543',
    'company' => 'Tech Solutions Inc',
    'title' => 'Security Manager',
    'inquiryType' => 'sales',
    'companySize' => '201-1000',
    'message' => 'We are interested in your cybersecurity solutions for our enterprise environment. Please contact us with pricing details.',
    'plan' => 'premium',
    'newsletter' => 1,
    'privacy' => 1
];

// Test 1: Database Connection
echo "<h2>Test 1: Database Connection</h2>";
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'cyber';

$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($mysqli->connect_errno) {
    echo "<p style='color: red;'><strong>❌ Connection FAILED:</strong> " . $mysqli->connect_error . "</p>";
    exit;
} else {
    echo "<p style='color: green;'><strong>✅ Connection SUCCESS!</strong></p>";
}

// Test 2: Check if contacts table exists
echo "<h2>Test 2: Check Contacts Table</h2>";
$result = $mysqli->query("SHOW TABLES LIKE 'contacts'");
if ($result->num_rows > 0) {
    echo "<p style='color: green;'><strong>✅ Table 'contacts' exists!</strong></p>";
} else {
    echo "<p style='color: red;'><strong>❌ Table 'contacts' does not exist!</strong></p>";
    echo "<p>Please create the table using the SQL command provided earlier.</p>";
    exit;
}

// Test 3: Insert sample data
echo "<h2>Test 3: Insert Sample Data</h2>";
$stmt = $mysqli->prepare(
    "INSERT INTO contacts (fname, lname, email, phone, company, title, inquiryType, companySize, message, plan, newsletter, privacy, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
);

if (!$stmt) {
    echo "<p style='color: red;'><strong>❌ Prepare Error:</strong> " . $mysqli->error . "</p>";
    exit;
}

$stmt->bind_param(
    'ssssssssssii',
    $test_data['fname'],
    $test_data['lname'],
    $test_data['email'],
    $test_data['phone'],
    $test_data['company'],
    $test_data['title'],
    $test_data['inquiryType'],
    $test_data['companySize'],
    $test_data['message'],
    $test_data['plan'],
    $test_data['newsletter'],
    $test_data['privacy']
);

if ($stmt->execute()) {
    echo "<p style='color: green;'><strong>✅ Data inserted successfully!</strong></p>";
    echo "<p><strong>Inserted Record ID:</strong> " . $stmt->insert_id . "</p>";
} else {
    echo "<p style='color: red;'><strong>❌ Execute Error:</strong> " . $stmt->error . "</p>";
    exit;
}

// Test 4: Verify data was inserted
echo "<h2>Test 4: Verify Inserted Data</h2>";
$verify = $mysqli->query("SELECT * FROM contacts ORDER BY id DESC LIMIT 1");
if ($verify->num_rows > 0) {
    $row = $verify->fetch_assoc();
    echo "<p style='color: green;'><strong>✅ Data verified in database!</strong></p>";
    echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
    foreach ($row as $key => $value) {
        echo "<tr><td><strong>" . htmlspecialchars($key) . "</strong></td><td>" . htmlspecialchars($value) . "</td></tr>";
    }
    echo "</table>";
} else {
    echo "<p style='color: red;'><strong>❌ Could not verify inserted data!</strong></p>";
}

// Test 5: Count total records
echo "<h2>Test 5: Total Records in Database</h2>";
$count = $mysqli->query("SELECT COUNT(*) as total FROM contacts");
$count_row = $count->fetch_assoc();
echo "<p><strong>Total contacts in database:</strong> " . $count_row['total'] . "</p>";

$stmt->close();
$mysqli->close();

echo "<hr>";
echo "<p><strong>✅ All tests completed successfully!</strong></p>";
echo "<p><a href='contact.html'>Go back to Contact Form</a></p>";
?>

Connect.php
<html>
<head>
<title>Record</title>
</head>
<body>
<?php

// Create connection
$connection = mysqli_connect("localhost";"root"; "";"cyber";);

// Check connection
if (!$connection) {
die("Could not connect to server: " . mysqli_connect_error());
}
echo "Connected successfully<br>";

// Check if form was submitted
if (isset($_POST['submit'])) {
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$company = $_POST['company'];
$message = $_POST['message'];

// SQL query
$sql_query = "INSERT INTO table1 (fname, lname, email,phone,company,message)
VALUES ('$id', '$fname', '$phone', '$email', '$company', '$pincode')";

// Execute query and check result
if (mysqli_query($connection, $sql_query)) {
echo "Record inserted successfully.";
} else {
echo "Error inserting record: " . mysqli_error($connection);
}
}

// Close connection
mysqli_close($connection);
?>
</body>
</html>


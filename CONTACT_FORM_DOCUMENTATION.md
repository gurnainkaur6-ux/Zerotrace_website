# ZeroTrace Contact Form - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Database Configuration](#database-configuration)
5. [Client-Side Implementation](#client-side-implementation)
6. [Server-Side Implementation](#server-side-implementation)
7. [Security Features](#security-features)
8. [Testing Guide](#testing-guide)
9. [Troubleshooting](#troubleshooting)
10. [Production Deployment](#production-deployment)

---

## 🎯 Project Overview

The ZeroTrace Contact Form is a full-stack web application that allows users to submit contact inquiries. The system consists of:

- **Frontend (Client-Side)**: HTML5 form with real-time validation using JavaScript
- **Backend (Server-Side)**: PHP script that processes form data and stores it in MySQL database
- **Database**: MySQL database for persistent data storage

### Key Features:
✅ Real-time form validation  
✅ Client-side error handling  
✅ Server-side data validation  
✅ SQL injection prevention  
✅ Responsive design  
✅ Success/error notifications  
✅ Character counter for message field  
✅ Loading indicators  
✅ Form reset functionality  

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   WEB BROWSER (CLIENT)              │
│  ┌──────────────────────────────────────────────┐   │
│  │  contact.html                                │   │
│  │  - HTML Form                                 │   │
│  │  - CSS Styling                               │   │
│  │  - JavaScript Validation                     │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP POST Request
                       │ (Form Data)
                       ↓
┌─────────────────────────────────────────────────────┐
│              WEB SERVER (SERVER-SIDE)               │
│  ┌──────────────────────────────────────────────┐   │
│  │  connect.php                                 │   │
│  │  - Receive POST data                         │   │
│  │  - Server-side validation                    │   │
│  │  - Sanitize input                            │   │
│  │  - Connect to database                       │   │
│  │  - Insert data                               │   │
│  │  - Return response                           │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ INSERT Query
                       ↓
┌─────────────────────────────────────────────────────┐
│              DATABASE (MYSQL)                       │
│  ┌──────────────────────────────────────────────┐   │
│  │  Database: cyber                             │   │
│  │  Table: contacts                             │   │
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │ id │ fname │ lname │ email │ message  │  │   │
│  │  ├────────────────────────────────────────┤  │   │
│  │  │ 1  │ John  │ Doe   │ j...  │ ...      │  │   │
│  │  │ 2  │ Jane  │ Smith │ j...  │ ...      │  │   │
│  │  │ 3  │ Bob   │ Jones │ b...  │ ...      │  │   │
│  │  └────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Setup Instructions

### Prerequisites
- **XAMPP** (Apache, MySQL, PHP) - [Download](https://www.apachefriends.org/)
- **Git** - [Download](https://git-scm.com/)
- **Text Editor** (VS Code recommended)
- **Web Browser** (Chrome, Firefox, Safari)

### Step 1: Clone the Repository
```bash
git clone https://github.com/gurnainkaur6-ux/Zerotrace_website.git
cd Zerotrace_website
```

### Step 2: Start XAMPP Services
1. Open XAMPP Control Panel
2. Click "Start" for **Apache**
3. Click "Start" for **MySQL**

### Step 3: Setup Database
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click "New" to create a new database
3. Name: `cyber`
4. Collation: `utf8mb4_general_ci`
5. Click "Create"

### Step 4: Import Database Schema
1. Select the `cyber` database
2. Go to "SQL" tab
3. Copy and paste content from `database-schema.sql`
4. Click "Go"

### Step 5: Verify Installation
Navigate to: `http://localhost/Zerotrace_website/contact.html`

You should see the contact form loaded successfully!

---

## 🗄️ Database Configuration

### Database Details
- **Database Name**: `cyber`
- **Table Name**: `contacts`
- **Character Set**: UTF-8mb4
- **Collation**: utf8mb4_general_ci

### Table Structure

| Column | Type | Null | Key | Default |
|--------|------|------|-----|---------|
| id | int(11) | NO | PRI | AUTO_INCREMENT |
| fname | varchar(100) | NO | | |
| lname | varchar(100) | NO | | |
| email | varchar(150) | NO | INDEX | |
| phone | varchar(20) | YES | | NULL |
| company | varchar(150) | YES | | NULL |
| title | varchar(100) | YES | | NULL |
| inquiryType | varchar(50) | YES | INDEX | NULL |
| companySize | varchar(50) | YES | | NULL |
| message | text | NO | | |
| plan | varchar(100) | YES | | NULL |
| newsletter | tinyint(1) | NO | | 0 |
| privacy | tinyint(1) | NO | | 1 |
| created_at | timestamp | NO | INDEX | CURRENT_TIMESTAMP |

### Indexes
- **Primary Key**: `id`
- **Index on**: `email`, `inquiryType`, `created_at` (for faster queries)

---

## 💻 Client-Side Implementation

### Files
- **contact.html** - Main HTML form with embedded CSS and JavaScript

### Features

#### 1. **Real-Time Validation**
```javascript
// JavaScript validates on form submit
- First name (required, max 100 chars)
- Last name (required, max 100 chars)
- Email (required, valid format, max 150 chars)
- Message (required, min 10 chars, max 500 chars)
- Privacy checkbox (required)
```

#### 2. **Character Counter**
```javascript
// Counts characters in message field
- Real-time counter display
- Maximum 500 characters
- Auto-truncates if exceeded
```

#### 3. **Error Highlighting**
```javascript
// Fields with errors are highlighted in red
- Error message displayed below field
- Form prevents submission until fixed
```

#### 4. **User Feedback**
```javascript
// Visual feedback for user actions
- Loading spinner during submission
- Success message with Record ID
- Error messages from server
- Form reset after successful submission
```

#### 5. **Async Form Submission**
```javascript
// Form submitted via Fetch API (no page reload)
fetch('connect.php', {
  method: 'POST',
  body: formData
})
```

### Form Fields

**Required Fields:**
- First Name
- Last Name
- Email
- Inquiry Type
- Message
- Privacy Agreement

**Optional Fields:**
- Phone
- Company
- Job Title
- Company Size
- Plan
- Newsletter Subscription

---

## 🔌 Server-Side Implementation

### File
- **connect.php** - PHP backend that processes form submissions

### Processing Flow

#### 1. **Initialization**
```php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'cyber');
```

#### 2. **Request Validation**
```php
// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}
```

#### 3. **Data Retrieval**
```php
// Safely get POST values with trimming
$fname = post_trim('fname');
$email = post_trim('email');
// ... etc
```

#### 4. **Data Validation**
```php
// Validate all fields
- Check required fields are not empty
- Validate email format
- Check field length limits
- Verify privacy agreement
```

#### 5. **SQL Insertion**
```php
// Prepared statement prevents SQL injection
$stmt = $mysqli->prepare(
    "INSERT INTO contacts (...) VALUES (?, ?, ?, ...)"
);
$stmt->bind_param('ssssssssssii', ...);
$stmt->execute();
```

#### 6. **Response**
```php
// Success: Redirect with Record ID
// Error: Display error messages
```

### Security Features

1. **SQL Injection Prevention**
   - Uses prepared statements with parameterized queries
   - No direct SQL concatenation

2. **XSS Prevention**
   - Uses `htmlspecialchars()` for output
   - Proper encoding for HTML context

3. **Input Validation**
   - Email format validation
   - Field length checks
   - Type validation for checkboxes

4. **Error Handling**
   - Graceful error messages
   - No database credentials exposed
   - Error logging

---

## 🔒 Security Features

### Client-Side
- ✅ Real-time validation prevents invalid data
- ✅ HTML5 input types (email, tel)
- ✅ MaxLength attributes on inputs
- ✅ Disabled form during submission

### Server-Side
- ✅ Prepared statements (SQL injection protection)
- ✅ Input sanitization
- ✅ Email validation using filter_var()
- ✅ Field length validation
- ✅ POST method only
- ✅ Charset declaration (UTF-8)
- ✅ Error logging (no user exposure)

### Database
- ✅ Proper indexes for performance
- ✅ Timestamp tracking
- ✅ Character encoding

---

## 🧪 Testing Guide

### Manual Testing

#### 1. **Test Valid Submission**
```
Go to: http://localhost/Zerotrace_website/contact.html

Fill form with:
- First Name: John
- Last Name: Doe
- Email: john@example.com
- Inquiry Type: Sales
- Message: I would like to know more about your services

Check Privacy: ✓

Click: Submit

Expected:
- Success message displayed
- Record ID shown
- Form reset
- Data appears in phpMyAdmin
```

#### 2. **Test Client-Side Validation**
```
Try submitting with empty First Name

Expected:
- Error message: "First name is required"
- Field highlighted in red
- Form not submitted to server
```

#### 3. **Test Email Validation**
```
Fill with invalid email: "notanemail"

Expected:
- Error message: "Please enter a valid email address"
- Field highlighted
```

#### 4. **Test Message Length**
```
Enter message with < 10 characters: "hi"

Expected:
- Error message: "Message must be at least 10 characters long"
```

### Automated Testing

View data in phpMyAdmin:
1. Go to: `http://localhost/phpmyadmin`
2. Select database: `cyber`
3. Select table: `contacts`
4. Click: "Browse"
5. View all submitted records

### API Testing with cURL

```bash
curl -X POST http://localhost/Zerotrace_website/connect.php \
  -d "fname=John&lname=Doe&email=john@example.com&message=Test message&privacy=1"
```

---

## 🐛 Troubleshooting

### Issue: "Database connection failed"
**Cause**: MySQL server not running or credentials incorrect
**Solution**:
1. Start MySQL in XAMPP Control Panel
2. Verify credentials in `connect.php`:
   ```php
   $db_host = 'localhost';
   $db_user = 'root';
   $db_pass = '';
   $db_name = 'cyber';
   ```

### Issue: "Table contacts does not exist"
**Cause**: Database schema not imported
**Solution**:
1. Go to phpMyAdmin
2. Select `cyber` database
3. Go to SQL tab
4. Paste content from `database-schema.sql`
5. Click Go

### Issue: Form not submitting (no error message)
**Cause**: JavaScript error or network issue
**Solution**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify Apache is running
4. Check network tab for HTTP errors

### Issue: Data not appearing in database
**Cause**: SQL error or validation failure
**Solution**:
1. Check phpMyAdmin error logs
2. Verify all required fields are filled
3. Check field values don't exceed length limits
4. Verify privacy checkbox is checked

### Issue: 404 Error on connect.php
**Cause**: File not in correct location or server not running
**Solution**:
1. Verify `connect.php` is in project root directory
2. Verify Apache is running
3. Check file permissions (should be readable)

---

## 🚀 Production Deployment

### Before Going Live

1. **Update Database Credentials**
   ```php
   // Use environment variables instead of hardcoding
   $db_host = getenv('DB_HOST');
   $db_user = getenv('DB_USER');
   $db_pass = getenv('DB_PASS');
   $db_name = getenv('DB_NAME');
   ```

2. **Enable HTTPS**
   - Obtain SSL certificate
   - Update form action to use HTTPS
   - Set secure cookie flags

3. **Add CSRF Protection**
   ```php
   // Generate and validate tokens
   session_start();
   if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
       die('CSRF token validation failed');
   }
   ```

4. **Email Notifications**
   ```php
   // Send confirmation email to user
   mail($email, 'Thank you for contacting ZeroTrace', $message);
   ```

5. **Add Rate Limiting**
   ```php
   // Prevent spam submissions from same IP
   // Check submission frequency
   ```

6. **Setup Error Logging**
   ```php
   error_log("Contact form submission: " . json_encode($_POST));
   ```

7. **Database Backups**
   - Schedule regular backups
   - Test restore procedures

8. **Performance Optimization**
   - Enable caching
   - Minify CSS/JavaScript
   - Optimize database queries

### Hosting Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- HTTPS support
- Regular backups
- SSL certificate
- Adequate storage

### Deployment Steps

1. Push code to production server
2. Create database and run schema
3. Update configuration files
4. Set proper file permissions
5. Test all functionality
6. Monitor error logs
7. Setup automated backups

---

## 📞 Support

For issues or questions:
- Check troubleshooting section
- Review error logs
- Contact support team
- Email: info@zerotrace.com

---

## 📝 License

© 2025 ZeroTrace. All rights reserved.

---

## 📚 Additional Resources

- [PHP MySQLi Documentation](https://www.php.net/manual/en/book.mysqli.php)
- [HTML Form Standards](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [OWASP Security](https://owasp.org/)

---

**Last Updated**: July 2, 2026  
**Version**: 1.0  
**Status**: Production Ready

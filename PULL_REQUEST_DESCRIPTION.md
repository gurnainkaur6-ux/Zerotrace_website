fix: secure contact handler (connect.php) and replace broken Connect.php

Summary
- Adds a secure contact form handler (connect.php) using mysqli prepared statements and basic server-side validation.
- Replaces the previously broken Connect.php with the same secure handler to avoid duplicate or unsafe handlers.
- contact.html already posts to connect.php and includes client-side handling to attach a selected plan and show a success message after submission.

Testing (XAMPP / phpMyAdmin)
1. Start Apache & MySQL in XAMPP.
2. In phpMyAdmin run the SQL below to create the database and contacts table:

   CREATE DATABASE IF NOT EXISTS cyber CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE cyber;
   CREATE TABLE IF NOT EXISTS contacts (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
     fname VARCHAR(100) NOT NULL,
     lname VARCHAR(100) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50),
     company VARCHAR(200),
     title VARCHAR(150),
     inquiryType VARCHAR(100),
     companySize VARCHAR(50),
     message TEXT NOT NULL,
     plan VARCHAR(100),
     newsletter TINYINT(1) NOT NULL DEFAULT 0,
     privacy TINYINT(1) NOT NULL DEFAULT 0,
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     INDEX (email)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

3. Place the site in XAMPP htdocs (e.g., C:\xampp\htdocs\zerotrace) and open http://localhost/zerotrace/contact.html.
4. Submit the form — on success you'll be redirected to contact.html?submitted=1 and the record should appear in phpMyAdmin → cyber → contacts.

Security Notes
- The code uses XAMPP defaults (root user with no password). For production, create a dedicated DB user with a strong password and update the credentials in connect.php.
- Use HTTPS, add CSRF protection, server-side input length limits, rate limiting, and centralized error logging. Avoid exposing raw DB errors to end users.

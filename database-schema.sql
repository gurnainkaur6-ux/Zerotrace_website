-- ============================================================================
-- ZeroTrace Contact Form Database Schema
-- ============================================================================
-- This SQL file creates the database structure for storing contact form 
-- submissions from the ZeroTrace website.
--
-- Database: cyber
-- Table: contacts
-- ============================================================================

-- Create Database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS cyber
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- Select the database
USE cyber;

-- ============================================================================
-- Create Contacts Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS contacts (
    -- Primary Key
    id INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for each contact',
    
    -- Required Fields
    fname VARCHAR(100) NOT NULL COMMENT 'Contact first name',
    lname VARCHAR(100) NOT NULL COMMENT 'Contact last name',
    email VARCHAR(150) NOT NULL COMMENT 'Contact email address',
    message TEXT NOT NULL COMMENT 'Contact message',
    
    -- Optional Fields
    phone VARCHAR(20) COMMENT 'Contact phone number',
    company VARCHAR(150) COMMENT 'Contact company name',
    title VARCHAR(100) COMMENT 'Contact job title',
    inquiryType VARCHAR(50) COMMENT 'Type of inquiry: general, sales, support, partnership, demo, incident',
    companySize VARCHAR(50) COMMENT 'Company size category',
    plan VARCHAR(100) COMMENT 'Selected service plan',
    
    -- Preferences & Agreements
    newsletter TINYINT(1) DEFAULT 0 COMMENT 'Newsletter subscription preference (0=no, 1=yes)',
    privacy TINYINT(1) DEFAULT 1 COMMENT 'Privacy policy agreement (0=no, 1=yes)',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date and time of submission',
    
    -- Indexes for faster queries
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_inquiryType (inquiryType)
) 
ENGINE=InnoDB 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci
COMMENT='Contact form submissions from ZeroTrace website';

-- ============================================================================
-- Table Structure Summary
-- ============================================================================
--
-- COLUMN NAME       | TYPE            | NULL | DEFAULT              | KEY
-- ================================================================================
-- id                | INT(11)         | NO   | AUTO_INCREMENT       | PRIMARY
-- fname             | VARCHAR(100)    | NO   | —                    | —
-- lname             | VARCHAR(100)    | NO   | —                    | —
-- email             | VARCHAR(150)    | NO   | —                    | INDEX
-- phone             | VARCHAR(20)     | YES  | NULL                 | —
-- company           | VARCHAR(150)    | YES  | NULL                 | —
-- title             | VARCHAR(100)    | YES  | NULL                 | —
-- inquiryType       | VARCHAR(50)     | YES  | NULL                 | INDEX
-- companySize       | VARCHAR(50)     | YES  | NULL                 | —
-- message           | TEXT            | NO   | —                    | —
-- plan              | VARCHAR(100)    | YES  | NULL                 | —
-- newsletter        | TINYINT(1)      | NO   | 0                    | —
-- privacy           | TINYINT(1)      | NO   | 1                    | —
-- created_at        | TIMESTAMP       | NO   | CURRENT_TIMESTAMP    | INDEX
--
-- ============================================================================
-- Useful Queries
-- ============================================================================

-- Count total submissions
-- SELECT COUNT(*) as total_submissions FROM contacts;

-- Get recent submissions (last 7 days)
-- SELECT * FROM contacts 
-- WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
-- ORDER BY created_at DESC;

-- Get submissions by inquiry type
-- SELECT inquiryType, COUNT(*) as count FROM contacts
-- GROUP BY inquiryType;

-- Get newsletter subscribers
-- SELECT fname, lname, email FROM contacts 
-- WHERE newsletter = 1;

-- Get all submissions for a specific email
-- SELECT * FROM contacts WHERE email = 'example@email.com';

-- ============================================================================

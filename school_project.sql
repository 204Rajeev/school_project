CREATE DATABASE school;
USE school;


ALTER TABLE authprogress AUTO_INCREMENT = 1;

DELETE FROM studentregistration
WHERE StudentId=4;

SELECT *
FROM authprogress;

SELECT *
FROM studentidentity;

SELECT *
FROM studentregistration;

SELECT *
FROM previousschool;

DROP TABLE studentregistration;

DELETE FROM studentregistration
WHERE StudentId=3;


CREATE TABLE authprogress (
    MobileNumber VARCHAR(15) NOT NULL,
    StudentId INT AUTO_INCREMENT,
    studentidentity BOOLEAN DEFAULT false,
    studentregistration BOOLEAN DEFAULT false,
    previousschool BOOLEAN DEFAULT false,
    documents BOOLEAN DEFAULT false,
    submitform BOOLEAN DEFAULT false,
    PRIMARY KEY (MobileNumber),
    UNIQUE KEY (StudentId)
);

CREATE TABLE studentidentity (
    StudentId INT,
    NameAsPerAadhar VARCHAR(255) NOT NULL,
    AadharNo VARCHAR(12) UNIQUE NOT NULL,
    DOBAsPerAadhar DATE NOT NULL,
    Gender ENUM('male', 'female', 'transgender', 'others') NOT NULL,
    FatherName VARCHAR(255),
    MotherName VARCHAR(255),
    GuardianName VARCHAR(255),
    AadharNoMother VARCHAR(12) UNIQUE NOT NULL,
    AadharNoFather VARCHAR(12) UNIQUE NOT NULL,
    PresentAddress TEXT,
    Pincode VARCHAR(10),
    MobileNumber VARCHAR(15) NOT NULL,
    AlternateMobileNumber VARCHAR(15),
    EmailId VARCHAR(255),
    PANNo VARCHAR(11),
	Class INT,
    PRIMARY KEY(studentId),
    FOREIGN KEY (StudentId) REFERENCES authprogress(StudentId) ON DELETE CASCADE
);

CREATE TABLE studentregistration(
	StudentId INT,
	MotherTongue VARCHAR(50) NOT NULL,
	SocialCategory ENUM('sc', 'st', 'obc', 'gen') ,
    MinorityGroup ENUM('muslim', 'christian', 'sikh', 'buddhist', 'parsi', 'jain', 'notminority') NOT NULL,
    BPLBeneficiary ENUM('yes', 'no'),
    AAYBeneficiary ENUM('yes', 'no'),
    EWSDisadvantagedGroup ENUM('yes', 'no'),
    IsCWSN ENUM('yes', 'no'),
    CWSNImpairmentType VARCHAR(50),
    ChildIsIndianNational ENUM('yes', 'no'),
    ChildIsOutOfSchoolChild ENUM('yes', 'no'),
    MainstreamedDate DATE,
    Disability ENUM('None', 'Blindness', 'Hearing Impairment', 'Multiple Disabilities including Deaf-blindness',
                'Low-vision', 'Leprosy Cured Persons', 'Locomotor Disability', 'Dwarfism',
                'Intellectual Disability', 'Mental Illness', 'Autism Spectrum Disorder', 'Cerebral Palsy',
                'Muscular Dystrophy', 'Chronic Neurological Conditions', 'Specific Learning Disabilities',
                'Multiple Sclerosis', 'Speech and Language Disability', 'Thalassemia', 'Hemophilia',
                'Sickle Cell Disease', 'Acid Attack Victims', 'Parkinsons disease'),
	PRIMARY KEY(StudentId),
    FOREIGN KEY (StudentId) REFERENCES authprogress(StudentId) ON DELETE CASCADE
);

CREATE TABLE previousschool(
	StudentId INT,
    FatherName VARCHAR(255),
    MotherName VARCHAR(255),
    DOBAsPerTC DATE,  /*YYYY-MM-DD*/
    NameAsPerTC VARCHAR(255),
	PreviousSchoolName VARCHAR(255),
	TCDate DATE,
	UDISECode VARCHAR(15),
    PRIMARY KEY(StudentId),
    FOREIGN KEY (StudentId) REFERENCES authprogress(StudentId) ON DELETE CASCADE
);

CREATE TABLE documents(
    DocumentId INT,
    TransferCertificate LONGBLOB,
    Results LONGBLOB,
    AdharCard LONGBLOB,
    PassportPhoto LONGBLOB,
    Signature LONGBLOB,
    Affidavit LONGBLOB,
    PRIMARY KEY(DocumentId),
    FOREIGN KEY (DocumentId) REFERENCES authprogress(StudentId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  heading VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE admins (
  adminid INT PRIMARY KEY AUTO_INCREMENT,
  MobileNumber VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE Applications (
    studentId INT PRIMARY KEY,
    StudentName VARCHAR(255),
    MobileNumber BIGINT, -- Change the data type to BIGINT for a large number
    status INT DEFAULT 0 CHECK (status IN (0, 1, 2)),
    class INT
);
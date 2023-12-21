CREATE DATABASE school;
USE school;

DELETE FROM studentregistration
WHERE StudentId=1;

SELECT *
FROM authprogress;

SELECT *
FROM studentidentity;

SELECT *
FROM studentregistration;

DROP TABLE studentregistration;

DELETE FROM studentidentity
WHERE StudentId=1;

SELECT studentidentity studentregistration PrevSchoolInfo UploadDoc SubmitForm
FROM authprogress
WHERE StudentId=(?);

CREATE TABLE authprogress (
    MobileNumber VARCHAR(15) NOT NULL,
    StudentId INT AUTO_INCREMENT,
    studentidentity BOOLEAN DEFAULT false,
    studentregistration BOOLEAN DEFAULT false,
    PrevSchoolInfo BOOLEAN DEFAULT false,
    UploadDoc BOOLEAN DEFAULT false,
    SubmitForm BOOLEAN DEFAULT false,
    PRIMARY KEY (MobileNumber),
    UNIQUE KEY (StudentId)
);

CREATE TABLE studentidentity (
    StudentId INT,
    NameAsPerTC VARCHAR(255),
    NameAsPerAadhar VARCHAR(255) NOT NULL,
    AadharNo VARCHAR(12) UNIQUE NOT NULL,
    DOBAsPerTC DATE,  /*YYYY-MM-DD*/
    DOBAsPerAadhar DATE NOT NULL,
    Gender ENUM('male', 'female', 'transgender', 'others') NOT NULL,
    MotherName VARCHAR(255),
    FatherName VARCHAR(255),
    GuardianName VARCHAR(255),
    AadharNoMother VARCHAR(12) UNIQUE NOT NULL,
    AadharNoFather VARCHAR(12) UNIQUE NOT NULL,
    StudentNameAsPerAadhar VARCHAR(255) NOT NULL,
    PresentAddress TEXT,
    Pincode VARCHAR(10),
    MobileNumber VARCHAR(15) NOT NULL,
    AlternateMobileNumber VARCHAR(15),
    EmailId VARCHAR(255),
    AtLeastOneNotNull CHAR(255) GENERATED ALWAYS AS (COALESCE(MotherName, FatherName, GuardianName)) STORED,
    CHECK (AtLeastOneNotNull IS NOT NULL),
    AtLeastOneAadharNotNull VARCHAR(12) GENERATED ALWAYS AS (COALESCE(AadharNoMother, AadharNoFather)) STORED,
    CHECK (AtLeastOneAadharNotNull IS NOT NULL),
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
	PRIMARY KEY(StudentId),
    FOREIGN KEY (StudentId) REFERENCES authprogress(StudentId) ON DELETE CASCADE
);
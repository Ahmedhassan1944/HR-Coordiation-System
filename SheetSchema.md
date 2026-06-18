# Google Sheets Database Schema
# Enterprise HR Mobilization Management System
# ================================================
# Copy these exact column headers into your Google Sheet.
# Each section below is a separate SHEET TAB (right-click Sheet1 > Rename).
# ================================================


## TAB 1: tbl_Candidates

| Column # | Header Name             | Data Type  | Notes                                           |
|----------|-------------------------|------------|-------------------------------------------------|
| A        | CandidateID             | Text (UUID)| Auto-generated, Primary Key                     |
| B        | FullName                | Text       | Full legal name                                  |
| C        | Position                | Text       | Offered job title                                |
| D        | Department              | Text       | Department / Project                             |
| E        | Email                   | Email      | Unique. Used for magic link                      |
| F        | Phone                   | Text       | Include country code (+20...)                    |
| G        | Nationality             | Text       | Egyptian / Other                                 |
| H        | OfferSalary             | Number     | In OMR                                           |
| I        | AssignedCoordinatorEmail| Email      | Links to tbl_Users                               |
| J        | CurrentStatus           | Text       | See Status Lifecycle in architecture doc          |
| K        | CreatedAt               | DateTime   | ISO 8601 timestamp                               |
| L        | UpdatedAt               | DateTime   | ISO 8601 timestamp. Updated on every change      |
| M        | DriveFolderID           | Text       | Google Drive Folder ID. Auto-filled by DriveManager.gs |


## TAB 2: tbl_Documents

| Column # | Header Name     | Data Type  | Notes                                                        |
|----------|-----------------|------------|--------------------------------------------------------------|
| A        | DocumentID      | Text (UUID)| Auto-generated, Primary Key                                  |
| B        | CandidateID     | Text (UUID)| Foreign Key -> tbl_Candidates.CandidateID                    |
| C        | DocType         | Text       | ENUM: Passport, Photo, Graduation, MedicalExam, MedicalAnalysis |
| D        | FileName        | Text       | Original file name                                           |
| E        | FileURL         | URL        | Google Drive direct link to the file                         |
| F        | UploadDate      | DateTime   | ISO timestamp                                                |
| G        | ApprovalStatus  | Text       | ENUM: Pending Review, Approved, Rejected                     |
| H        | ApprovedBy      | Email      | HR Coordinator email who reviewed                            |
| I        | VersionNumber   | Number     | Integer. Starts at 1. Increments with every re-upload        |
| J        | Remarks         | Text       | Rejection reason notes from Coordinator                      |
| K        | ReviewedAt      | DateTime   | ISO timestamp of when the document was approved or rejected   |


## TAB 3: tbl_Users

| Column # | Header Name | Data Type | Notes                                                   |
|----------|-------------|-----------|----------------------------------------------------------|
| A        | UserID      | Text (UUID)| Auto-generated, Primary Key                             |
| B        | FullName    | Text      | User's display name                                      |
| C        | Email       | Email     | Must match their Google Account email                    |
| D        | Role        | Text      | ENUM: CANDIDATE, HR_COORDINATOR, HR_OPS_SPECIALIST, HR_OPS_HEAD, HR_DIRECTOR, ADMIN |
| E        | Department  | Text      | User's department                                        |
| F        | IsActive    | Boolean   | TRUE or FALSE                                            |
| G        | CreatedAt   | DateTime  | ISO timestamp                                            |


## TAB 4: tbl_SystemLogs

| Column # | Header Name  | Data Type  | Notes                                         |
|----------|--------------|------------|-----------------------------------------------|
| A        | LogID        | Text (UUID)| Auto-generated, Primary Key. APPEND-ONLY.     |
| B        | Timestamp    | DateTime   | ISO 8601 timestamp                            |
| C        | CandidateID  | Text (UUID)| FK to tbl_Candidates (may be 'SYSTEM')        |
| D        | Actor        | Email/Text | Who triggered the action (email or 'SYSTEM')  |
| E        | Event        | Text       | Free text summary of the action performed     |


## INITIAL SETUP STEPS

1. Open Google Sheets -> Create a new blank spreadsheet.
2. Create 4 sheet tabs: tbl_Candidates, tbl_Documents, tbl_Users, tbl_SystemLogs.
3. On row 1 of each tab, type the exact header names from Column "Header Name" above.
4. Copy the Spreadsheet ID from your URL bar (between /d/ and /edit).
5. In Database.gs, paste the ID into the SPREADSHEET_ID constant.
6. In Apps Script: go to Services > Gmail API and Drive API > Enable both.
7. Deploy as Web App (Execute as: Me, Access: Anyone with the link).
8. Done. The system is now live.

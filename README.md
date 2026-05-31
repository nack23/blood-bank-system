# Blood Bank Management System

## Overview

The Blood Bank Management System is a full-stack web application developed to simplify blood inventory management and blood request handling between hospitals and receivers.

Hospitals can manage their blood stock, while receivers can search available blood groups and send blood requests directly to hospitals. Hospitals can then approve or reject requests based on availability.

---

## Features

### Hospital Module

* Hospital Registration & Login
* Add Blood Samples
* Manage Blood Inventory
* View Incoming Blood Requests
* Approve Blood Requests
* Reject Blood Requests
* Automatic Blood Stock Deduction on Approval
* Real-time Blood Availability Updates

### Receiver Module

* Receiver Registration & Login
* Search Available Blood
* View Blood Inventory of Hospitals
* Send Blood Requests
* Track Request Status
* View Approved / Rejected Requests

### Public Access

* Anyone can view available blood inventory
* Login required before sending blood requests

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* PHP
* REST API Architecture

### Database

* MySQL
* phpMyAdmin

### Development Tools

* XAMPP
* VS Code
* Postman

---

## Database Structure

### Users Table

Stores hospital and receiver information.

| Field       | Type                     |
| ----------- | ------------------------ |
| id          | INT                      |
| name        | VARCHAR                  |
| email       | VARCHAR                  |
| password    | VARCHAR                  |
| role        | ENUM(hospital, receiver) |
| blood_group | VARCHAR                  |
| created_at  | TIMESTAMP                |

---

### Blood Samples Table

Stores blood inventory.

| Field       | Type      |
| ----------- | --------- |
| id          | INT       |
| hospital_id | INT       |
| blood_group | VARCHAR   |
| units       | INT       |
| created_at  | TIMESTAMP |

---

### Requests Table

Stores blood requests sent by receivers.

| Field        | Type                              |
| ------------ | --------------------------------- |
| id           | INT                               |
| receiver_id  | INT                               |
| sample_id    | INT                               |
| units        | INT                               |
| status       | ENUM(Pending, Approved, Rejected) |
| request_date | TIMESTAMP                         |

---

## Workflow

### Hospital Side

1. Hospital registers and logs in.
2. Hospital adds blood inventory.
3. Blood inventory becomes visible publicly.
4. Receivers send requests.
5. Hospital reviews requests.
6. Hospital approves or rejects requests.
7. Approved requests automatically reduce blood stock.

### Receiver Side

1. Receiver registers and logs in.
2. Receiver views available blood.
3. Receiver selects blood sample.
4. Receiver enters required units.
5. Request is sent to hospital.
6. Receiver tracks request status.

---

## Business Logic

### Blood Request Approval

When a hospital approves a request:

* Requested units are checked against available units.
* Approval is allowed only if stock is sufficient.
* Blood units are automatically deducted.
* Stock can never become negative.

Example:

Available Units = 10

Requested Units = 4

Remaining Units = 6

---

## API Actions

### User Authentication

* register
* login

### Blood Inventory

* add_blood
* get_blood_samples

### Blood Requests

* send_request
* get_requests
* approve_request
* reject_request
* get_receiver_requests

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/blood-bank-management-system.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

1. Install XAMPP
2. Start Apache
3. Start MySQL
4. Place backend folder inside:

```text
htdocs/
```

Example:

```text
C:/xampp/htdocs/blood-bank-system
```

### Database Setup

1. Open phpMyAdmin
2. Create database:

```sql
blood_bank_db
```

3. Import SQL file.

---

## Future Enhancements

* Email Notifications
* SMS Alerts
* Blood Donation Module
* Admin Dashboard
* Dashboard Analytics
* Search Filters
* JWT Authentication
* Real-time Notifications

---

## Project Author

Md Qais Alam

IIT Delhi

---

## License

This project is developed for educational and learning purposes.

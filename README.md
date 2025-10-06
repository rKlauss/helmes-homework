# Helmes Homework Assignment

This is a full-stack web application where users can enter their name, select sectors, and agree to terms.
The app saves user data in a PostgreSQL database and allows editing existing entries.

---

## Features

- **Sector hierarchy** – Nested sectors (parent → child) are loaded dynamically from the backend
- **User management**
  - Create new users
  - Edit existing users
  - View all users
- **Validation** – User must have:
  - A name
  - At least one selected sector
  - Agreement checkbox ticked

---

## Technologies Used

### **Frontend**

- **React + Vite Framework**
- **Docker**

### **Backend**

- **Spring Boot 3**
- **Java 21**
- **PostgreSQL**
- **Lombok**
- **Docker**

---

## Getting Started

### Prerequisites

- Docker

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rKlauss/helmes-homework.git
   cd helmes-homework
   ```

---

## Docker Setup

1. Navigate to frontend folder and run:

```bash
docker build -t frontend .
```

2. **Navigate to backend folder and Run with Docker Compose:**

```bash
docker-compose up --build
```

---

## Testing

1. Go to http://localhost:5173
2. Open the following links in your browser or with Postman:
   - View all users who have inserted data:
     http://localhost:8080/api/users
   - View a single user by ID:
     http://localhost:8080/api/user/{id}
3. You will immediately see how new records are added or updated in the PostgreSQL database after saving data from the frontend.

## Author

Rasmus Klaus

# 🌟 ReviewHub – Product Review System

A full-stack product review platform built with **React**, **Spring Boot**, and **MySQL**.

---

## 🗂️ Project Structure

```
product-review-system/
├── backend/                  # Spring Boot (Java 17)
│   ├── pom.xml
│   └── src/main/java/com/reviewsystem/
│       ├── ReviewSystemApplication.java
│       ├── model/            # Product, Review entities
│       ├── dto/              # DTOs & request bodies
│       ├── repository/       # Spring Data JPA repos
│       ├── service/          # Business logic
│       ├── controller/       # REST controllers
│       ├── exception/        # Global error handling
│       └── config/           # DataSeeder
├── frontend/                 # React + Vite
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── services/api.js   # Axios API layer
│       ├── components/       # Reusable UI components
│       └── pages/            # Route-level pages
└── database/
    └── schema.sql            # MySQL DDL + seed data
```

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| MySQL | 8.0+ |
| Node.js | 18+ |
| npm | 9+ |

---

## 🚀 Getting Started

### 1. Database Setup

```sql
-- Option A: Run the schema script
mysql -u root -p < database/schema.sql

-- Option B: Let Spring Boot auto-create tables (ddl-auto=update)
-- Just create the database:
CREATE DATABASE review_system;
```

### 2. Configure the Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/review_system?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**

> On first run, `DataSeeder.java` automatically inserts 4 sample products and 8 reviews.

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on **http://localhost:5173**

The Vite dev server proxies `/api/*` → `http://localhost:8080/api/*` so no CORS issues.

---

## 📡 REST API Reference

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products?search=query` | Search by name |
| GET | `/api/products?category=Electronics` | Filter by category |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/categories` | Get all categories |
| POST | `/api/products` | Create product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/{id}/reviews` | Get reviews for product |
| GET | `/api/products/{id}/reviews/stats` | Get rating stats |
| POST | `/api/products/{id}/reviews` | Add review |
| DELETE | `/api/reviews/{id}` | Delete review |

### Example: Create a Review

```json
POST /api/products/1/reviews
{
  "reviewerName": "Jane Doe",
  "reviewerEmail": "jane@example.com",
  "rating": 5,
  "title": "Absolutely love it!",
  "content": "Best product I have bought in years. Highly recommend."
}
```

---

## ✨ Features

- **Product Catalogue** – Browse, search, and filter by category
- **Product Detail** – Full product page with image and description
- **Rating Breakdown** – Visual bar chart for rating distribution (1–5 stars)
- **Review System** – Submit, view, and delete reviews
- **Duplicate Review Guard** – One review per email per product
- **Auto-seeded Sample Data** – Ready to explore on first launch
- **Validation** – Client-side and server-side form validation
- **Responsive Design** – Works on desktop and mobile
- **Dark Theme** – Modern dark UI with accent colors

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + React Router v6
- Vite (dev server + build)
- Axios (HTTP client)
- Custom CSS (no UI library)

**Backend**
- Spring Boot 3.2
- Spring Data JPA + Hibernate
- Spring Validation (Bean Validation)
- Lombok (boilerplate reduction)
- Global Exception Handler

**Database**
- MySQL 8
- Auto DDL via Hibernate (`ddl-auto=update`)

---

## 🧩 Key Design Decisions

- **One email per product** enforced at DB level (`UNIQUE KEY`) and service layer
- **Cascade delete** – deleting a product removes all its reviews
- **Proxy setup** – Vite proxies API calls so frontend and backend run on different ports without CORS config
- **DataSeeder** – Only seeds when DB is empty (`if (count > 0) return`)

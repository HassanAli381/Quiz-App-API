# 📘 Quiz App API

A **RESTful API** for managing quizzes, exams, categories, users, and authentication. Built with **Node.js, Express, and MongoDB**.


## 📝 Introduction

This API provides endpoints for creating, retrieving, updating, and deleting quizzes, exams, categories, and users. It supports authentication via JWT and Google OAuth2 and implements role-based access control for admin and regular users. The API also includes input validation, error handling, and detailed documentation with Swagger.


## 🚀 Features

* User authentication & authorization (JWT, Google OAuth2)
* Role-based access (Admin, User)
* CRUD operations for:

  * Users
  * Categories
  * Questions
  * Exams
* Middleware validation & error handling
* API documentation with Swagger
* Input validation with AJV
* Secure password hashing & Google login support


## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JWT + Google Passport
* **Validation**: AJV
* **API Docs**: Swagger
* **Utilities**: Custom error handling, status responses


## ⚡ Installation

```bash
git clone <repo-url>
cd quiz-app-api
npm install
npm run dev
```


## 📖 API Endpoints

### Categories

* `GET /api/categories` - Get all categories
* `GET /api/categories/:id` - Get category by ID
* `POST /api/categories` - Create category
* `PUT /api/categories/:id` - Update category
* `DELETE /api/categories/:id` - Delete category

### Questions

* `GET /api/questions` - Get all or filtered questions
* `GET /api/questions/:id` - Get question by ID
* `POST /api/questions` - Create question
* `PUT /api/questions/:id` - Update question
* `DELETE /api/questions/:id` - Delete question

### Exams

* `GET /api/exams` - Get all exams
* `GET /api/exams/:id` - Get exam by ID
* `POST /api/exams` - Create exam
* `PUT /api/exams/:id` - Update exam
* `DELETE /api/exams/:id` - Delete exam

### Users

* `GET /api/users` - Get all users
* `GET /api/users/:id` - Get user by ID
* `POST /api/users/register` - Register user
* `POST /api/users/login` - Login user
* `GET /api/auth/google` - Authenticate by Google
* `GET /api/auth/google/redirect` - Redirect user after authenticating with Google


## 📑 Notes

* Make sure to set environment variables in `.env`
* Use JWT token for authentication on protected routes
* API documentation is available at `/api-docs` if Swagger is configured

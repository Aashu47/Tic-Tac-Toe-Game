# Fullstack E-commerce Project

This repository contains a fullstack e-commerce application with separate layers for **frontend**, **backend**, and **BFF (Backend for Frontend)**.

## 🏗️ Project Structure

📂 frontend/

Built with React.
Features include user authentication, product search, and cart functionality.

cd frontend
npm install
npm start


📂 backend/

Built with Spring Boot and MongoDB.
Manages APIs for product data and user operations.

cd backend
mvn spring-boot:run


📂 bff/

Built with GraphQL.
Serves as middleware between the frontend and backend for optimized data fetching.

cd bff
npm install
npm start

cd backend
mvn spring-boot:run

✨ Features
User Authentication
Product Search and Filtering
Cart and Checkout



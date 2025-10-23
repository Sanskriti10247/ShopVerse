<!-- 🛍️ SHOPVERSE - Full MERN Stack E-Commerce Application -->

<p align="center">
  <img src="https://img.shields.io/badge/SHOPVERSE-Full%20MERN%20Stack-blueviolet?style=for-the-badge&logo=react&logoColor=white" alt="ShopVerse Badge" />
</p>

<h1 align="center">🛍️ <b>SHOPVERSE</b></h1>    <img width="986" height="550" alt="image" src="https://github.com/user-attachments/assets/91a5b3f9-e44c-45db-8e22-574a50f39c45" />


<p align="center">
  A modern, full-featured <b>E-Commerce Platform</b> built using the <b>MERN Stack</b> (MongoDB, Express, React, Node.js) <br />
  Featuring Secure Authentication, Stripe Payments, Cloudinary Integration, and Real-time Communication via Socket.IO.
</p>

---

## 🌈 Overview

ShopVerse is a **Full-Stack MERN E-Commerce Web App** built to simulate a real-world online shopping platform.  
It enables users to register, browse products, add items to their cart, place orders, and make secure payments.  
The backend integrates **Socket.IO**, **Stripe**, and **Ethereal Email** to provide a complete, real-time shopping experience.

---

## ✨ Features at a Glance

| Feature | Description |
|:--------|:-------------|
| 👤 **User Authentication** | JWT-based login & signup with secure password hashing (bcrypt). |
| 🛍️ **Product Management** | Products stored in MongoDB, images hosted via Cloudinary. |
| 🛒 **Cart System** | Persistent Redux cart across sessions. |
| 💳 **Payment Gateway** | Stripe integration with test mode support. |
| 📧 **Email Confirmation** | Nodemailer + Ethereal for fake order confirmation mails. |
| ⚡ **Real-Time Communication** | Socket.IO backend broadcasting live pings and events. |
| ☁️ **Cloud Hosted DB** | MongoDB Atlas with dynamic schema models. |
| 🖼️ **Responsive UI** | Built with TailwindCSS + PicoCSS for modern styling. |
| 🧾 **Order Tracking** | Fetch user-specific order history dynamically. |

---
## PREVIOUS UI:
![PHOTO-2025-10-21-17-22-57](https://github.com/user-attachments/assets/461290ca-8281-47e6-adbd-25556b179580)

## UI INTERFACE NOW:

![PHOTO-2025-10-23-10-29-10](https://github.com/user-attachments/assets/a3adc72e-256b-4e47-8d53-6d05851cc9ca)


##  Project Architecture

```
SHOPVERSE/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── sendEmail.js
│   │   └── sendRealEmail.js
│   │
│   ├── testSocketClient.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CancelPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MyOrdersPage.jsx
│   │   │   ├── PaymentsPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── SuccessPage.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   └── userSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── socket.js (frontend socket.io client)
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── .env
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── .gitignore
├── README.md
└── package.json
```

---
# References:-

### Screenshots for Folder Structure:

<img width="200" height="314" alt="image" src="https://github.com/user-attachments/assets/751a6a00-6ee3-46dd-87fc-bd7abe56be6d" />

<img width="150" height="200" alt="image" src="https://github.com/user-attachments/assets/a804e24e-395c-4634-9f49-ea7cd5d9a2fc" />

<img width="150" height="200" alt="image" src="https://github.com/user-attachments/assets/fdc6caf1-174c-4b41-b296-105cfba27d8e" />

### Register-Login Interface:

- <img width="1280" height="89" alt="image" src="https://github.com/user-attachments/assets/737c464d-2b0e-4b1e-87fc-9f943a39e4a4" />

#### REGISTER & LOGIN PAGES

<p align="center">
  
  <img src="https://github.com/user-attachments/assets/d15f52e2-6ce3-4bd2-ba24-84a72f1ebb06" alt="Register Page" width="42%" style="margin-right: 10px;" />

  
  
  <img src="https://github.com/user-attachments/assets/0741a03f-a00b-480f-8b3a-7a75beb75b74" alt="Login Page" width="40%" />
</p>

---

###  Folder-by-Folder Explanation

####  **backend/**
Contains all server-side logic of the application.  
Built using **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO**.

| Subfolder | Purpose |
|------------|----------|
| **config/** | Database and third-party service configurations (e.g., MongoDB, Cloudinary). |
| **controllers/** | Business logic for users, products, orders, and admin tasks. |
| **data/** | Seed data for initial setup or testing. |
| **middleware/** | Middleware functions that enhance route behavior (authentication, role protection, file uploads). |
| **models/** | Defines MongoDB schemas for users, products, and orders using Mongoose. |
| **routes/** | Defines Express routes, mapping endpoints to controllers. |
| **utils/** | Helper utilities like JWT generation and email services. |
| **server.js** | Initializes the Express app, sets up Socket.IO, connects to MongoDB. |

---

#### **Middlewares Explained**

- **authMiddleware.js** → Verifies JWT token for private routes.  
- **adminMiddleware.js** → Restricts route access to admin users only.  
- **uploadMiddleware.js** → Validates and manages file uploads (e.g., product images).

---

####  **Controllers Overview**

| Controller | Responsibility |
|-------------|----------------|
| `userController.js` | Registration, login, profile management. |
| `productController.js` | Product listing, creation, and updates. |
| `orderController.js` | Handles order creation and retrieval for users. |
| `adminController.js` | Admin-side operations (dashboard, analytics - future). |

---

####  **config/**  
- `db.js`: Establishes connection to MongoDB Atlas.  
- `cloudinary.js`: Configures Cloudinary SDK for image uploads.

### References: 

##### REFERENCES FROM CLOUDINARY & MONGODB ATLAS :

- ![PHOTO-2025-10-21-21-40-16](https://github.com/user-attachments/assets/80db6a9a-0095-4d2a-93e9-60281b6720b8)



- ![PHOTO-2025-10-21-21-40-29](https://github.com/user-attachments/assets/0499e269-fe9d-4cc9-9ac0-ab296be7ffee)




- ![PHOTO-2025-10-21-21-40-45](https://github.com/user-attachments/assets/25f72767-36ca-4be8-8b01-0a4eb73ef2dd)


---

####  **models/**
Defines how data is stored and structured in MongoDB.

- **userModel.js** → name, email, password (hashed), isAdmin.  
- **productModel.js** → name, price, image URL, brand, stock, etc.  
- **orderModel.js** → order items, payment status, delivery, timestamps.

---

####  **frontend/**
Built using **React + Vite**, this folder contains all client-side code.

| Subfolder | Purpose |
|------------|----------|
| **components/** | Reusable React components (e.g., Navbar, PrivateRoute). |
| **pages/** | Represents each view/screen (Home, Cart, Login, etc.). |
| **redux/** | Handles global application state. |
| **utils/** | Shared functions like API and Socket.IO setup. |
| **assets/** | Static images, icons, and other UI assets. |

---

####  **Frontend Highlights**

- **App.jsx** → Root of the application containing routes.  
- **main.jsx** → Mounts React app to the DOM.  
- **index.css** → TailwindCSS base and global styles.  
- **api.js** → Configured Axios instance with automatic JWT header injection.  
- **socket.js** → Handles real-time event connections via Socket.IO.

---

####  **Redux Store**

Redux Toolkit organizes the state logic into *slices*:
- `cartSlice.js` → Cart operations and persistence.
- `productSlice.js` → Fetches and stores product data.
- `userSlice.js` → Manages authentication state and user details.

The root store (`store.js`) combines all slices and provides them globally.

---

####  **Root-Level Files**

| File | Description |
|------|--------------|
| `.gitignore` | Specifies files ignored by Git. |
| `README.md` | Complete project documentation. |
| `package.json` | Project metadata and dependencies. |

---
##  Stripe Payment – Test Mode Guide

ShopVerse integrates **Stripe** for secure online payments.  
During development, all payments are processed in **Stripe Test Mode**, meaning **no real money** is involved.  

<img width="1280" height="709" alt="image" src="https://github.com/user-attachments/assets/8e2fb57d-bbed-4dff-8bfa-e242de075ec6" />

Follow the instructions below to test payment functionality successfully.
---

## Stripe Test Card Details

Use the following test card information on the **payment page (Stripe Checkout)** when completing a purchase.

| Field | Test Value | Description |
|--------|-------------|-------------|
| **Card Number** | `4242 4242 4242 4242` | Universal Visa test card accepted for all successful payments. |
| **Expiration Date** | Any **future date** (e.g., `12 / 34`) | Must be a valid future month and year. |
| **CVC / CVV** | Any 3-digit number (e.g., `123`) | Simulates a valid security code. |
| **Cardholder Name** | Any name (e.g., `Test User`) | Optional – for testing purposes only. |
| **ZIP / Postal Code** | Any 5-digit number (e.g., `10001`) | Simulates valid billing details. |

---

###  Additional Stripe Test Scenarios

Stripe allows you to simulate various outcomes using specific card numbers:

| Card Number | Result | Description |
|--------------|---------|-------------|
| `4242 4242 4242 4242` |  Successful Payment | Standard approval flow. |
| `4000 0566 5566 5556` |  Declined Payment | Simulates a generic decline. |
| `4000 0000 0000 9995` |  Requires Authentication | Triggers 3D Secure authentication. |
| `4000 0000 0000 9987` |  Insufficient Funds | Simulates a failed transaction due to low balance. |
| `4000 0000 0000 9979` |  Card Expired | Simulates expired card error. |

>  **Tip:** You can find more test cards in the official [Stripe Test Card Documentation](https://stripe.com/docs/testing#international-cards).

---

###  Key Architectural Principles

- **Modular Design:** Each feature (user, product, order) lives in its own controller, route, and model.  
- **Separation of Concerns:** Business logic, routing, and data handling are independent.  
- **Reusability:** Middleware and utility functions reduce code duplication.  
- **Scalability:** Easily extendable for admin dashboards, notifications, or analytics.  
- **Real-time Ready:** Built-in Socket.IO server for live updates and pings.  
- **Security:** JWT-based authentication, bcrypt password hashing, and CORS control.

---

### SOME REFERENCES :

1.   ### SELECTIVE SEARCHING ENABLED WITH AUTO SUGGESTION:
   
   <img width="1280" height="492" alt="image" src="https://github.com/user-attachments/assets/f36f7aa1-87d0-4805-9499-4d30050a59fb" />

2.   ### PRODUCTS PAGE - (CLICK OPEN AN ITEM WITH IT'S DETAILS AND REVIEWS):   

   <img width="1280" height="669" alt="image" src="https://github.com/user-attachments/assets/a25b5106-0cb6-4db2-8acf-cad74b8beb1b" />

3.    ### REVIEWS & REVIEW HANDLING :
   
   <img width="1280" height="806" alt="image" src="https://github.com/user-attachments/assets/ab4b9b61-e584-4ff4-aa87-ac56c7088b16" />

4.   ### STRIPE PAYMENT GATEWAY:

   <img width="504" height="680" alt="image" src="https://github.com/user-attachments/assets/687cc0ec-f210-443e-baf0-d97447481bd8" />

   - ### (NUMBER LOGIN)
     
     <img width="1280" height="681" alt="image" src="https://github.com/user-attachments/assets/30f1f1dd-806f-4155-81d8-2b1e87a9e092" />

   
5.    ### CART PAGE:
   
<img width="1280" height="709" alt="image" src="https://github.com/user-attachments/assets/61a19bd7-6dac-415b-800f-a6c20b325bf0" />

   
<img width="1280" height="636" alt="image" src="https://github.com/user-attachments/assets/d2de0dc9-1d94-459c-906a-3e4d9c4f623e" />

   - ### (DELETING & CLEARING ITEMS IN THE CART )
   
       <img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/d9b11cfe-8994-45bf-99b2-503c8250e314" />

   - ### CLEARED CART:
     
       <img width="1280" height="636" alt="image" src="https://github.com/user-attachments/assets/9813aa78-a5bd-4476-81a9-df5eca5812a5" />

6.   ### PROFILE PAGE:
   
   <img width="1280" height="709" alt="image" src="https://github.com/user-attachments/assets/afe6dc70-8401-444e-8308-55d34b01574e" />

   - ### (ADDRESS SAVER & DELETER/EDITOR REAL TIME)
     
     <img width="1280" height="146" alt="image" src="https://github.com/user-attachments/assets/7bfbcdc9-8585-44c8-bfe5-2ba11c8ec77c" />

   - ### PROFILE PICTURE CHANGER WITH INTEGRATED OPTIONS :

     <img width="1280" height="709" alt="image" src="https://github.com/user-attachments/assets/08fdf9d6-488e-4c9c-a093-14b4e15d1b0e" />

7.   ### NAVBAR's Profile Icon:
   
   <img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/2c362b8c-f5a4-4463-951c-ec26bca90e4f" />

8.   ### ORDERS PAGE:

   <img width="1280" height="681" alt="image" src="https://github.com/user-attachments/assets/8d5b93df-6832-4fe9-a625-fe9d6712c0d7" />



## ⚙️ Environment Setup

Before running the project, create separate `.env` files for both **backend** and **frontend**.

---

### 📁 Backend – `.env`

```
PORT=5001
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_key
ETHEREAL_USER=your_ethereal_username
ETHEREAL_PASS=your_ethereal_password
```
 Note:
ETHEREAL_USER and ETHEREAL_PASS are used for sending fake emails via Ethereal Email
 during testing.
Stripe test mode works over HTTP during development but requires HTTPS in production.

### REFERNCE FOR ETHEREAL ORDER CONFIRMATION AFTER SUCCESSFUL PAYMENT :

![PHOTO-2025-10-23-11-03-50](https://github.com/user-attachments/assets/68b0cd4c-5c5c-4258-a7c6-bbb66d470e09)


### 📁 Frontend – .env
```
VITE_API_BASE_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```
 Set these URLs to your deployed backend address when deploying the app online.


**How to Run the Project**
 
-  Backend Setup
``
cd backend
npm install
npm run dev
``
This starts the Express + Socket.IO server on:
👉 http://localhost:5001

## REFERENCE OF RUNNING BACKEND :

![PHOTO-2025-10-23-11-11-00](https://github.com/user-attachments/assets/575094cb-c863-41e5-9ba1-e22b39878c88)


- Frontend Setup
``
cd frontend
npm install
npm run dev
``
This launches the Vite-powered React frontend on:
👉 http://localhost:5173

## REFERENCE OF RUNNING FRONTEND :

![PHOTO-2025-10-23-11-10-37](https://github.com/user-attachments/assets/454e53ab-c7f6-4c0a-8b59-f3abd02ea916)


## ✅ Quick Verification Checklist

Once you’ve set up and started both servers, use this checklist to verify all core functionalities of **ShopVerse**.

| Step | Description | Expected Result |
|------|--------------|-----------------|
| 1 | Run backend (`npm run dev`) | Server starts and displays: `Server running with Socket.IO on port 5001` |
| 2 | Run frontend (`npm run dev`) | React app launches at [http://localhost:5173](http://localhost:5173) |
| 3 | Test Login/Register | User successfully registers and JWT token is stored in localStorage |
| 4 | Add Product to Cart | Product count updates dynamically in the cart |
| 5 | Checkout with Stripe | Payment success/cancel redirects work correctly |
| 6 | Check Backend Console | Ethereal email confirmation log appears |
| 7 | Test Socket.IO | Console logs show ping messages every 5 seconds |

---


## TESTING CONFIRMATION MAILS:

## 🧾 TESTING CONFIRMATION MAILS

<p align="center">
  <img src="https://github.com/user-attachments/assets/f0f175d9-dfb2-463f-aa13-0c6a10e0f901" alt="Testing Confirmation Mails" width="30%" />
</p>


## ⚡ Socket.IO Real-Time Events

ShopVerse includes backend-powered **real-time communication** via **Socket.IO**, allowing instant updates, live notifications, and heartbeat checks between the client and server.

| Event Name | Description |
|-------------|-------------|
| `ping` | Emitted automatically every 5 seconds from the backend to confirm active connection. |
| `userRegistered` | Triggered when a new user successfully registers on the platform. |
| `orderPlaced` *(future)* | Will notify the admin dashboard in real time when a new order is placed. |
| `paymentSuccess` *(future)* | Planned event for pushing live payment confirmation to users. |

---
### REFERNCES FOR PING UPDATES AND SOCKET.IO CONNECTION:

#### FOR PING UPDATES :

![PHOTO-2025-10-21-23-14-31](https://github.com/user-attachments/assets/81b1f74c-9231-4c14-a78e-d8a46ee3176d)

#### FOE LIVE TESTING CONFIRMATION:

![PHOTO-2025-10-21-23-17-38](https://github.com/user-attachments/assets/75f9cb7e-c868-4876-9ee5-640340ecf129)


## 🧪 How to Test Socket.IO Connection

A simple **test client** is included in the backend to verify that real-time communication is working correctly.

### Run the test client

```
cd backend
node testSocketClient.js
```

## LIVE TESTING VERIFICATION FROM MAIL:

![PHOTO-2025-10-21-22-56-40](https://github.com/user-attachments/assets/c90295cf-d5c9-475d-a973-093b7a5db819)


## 🌟 Future Enhancements

ShopVerse is designed for scalability and future expansion.
Below are planned enhancements and potential integrations to make the platform even more powerful:

| Feature | Description | Status |
|----------|--------------|--------|
| Admin Dashboard | Manage products, orders, and users with live updates. | Coming Soon |
| Inventory Automation | Auto-update stock levels post-purchase. | In Planning |
| Real-Time Order Tracking | Track order status dynamically via Socket.IO. | In Development |
| Live Chat (User ↔ Admin) | One-to-one chat powered by Socket.IO and Redux. | Planned |
| Analytics Dashboard | Insights on revenue, sales, and user metrics. | Research Phase |
| Multi-Vendor Marketplace | Allow multiple sellers to manage products. | Roadmap |
| Push Notifications | Browser notifications for updates and offers. | Planned |
| UI Enhancements | Advanced animations, dark mode toggle, etc. | Continuous |

---

##  Architectural Vision

ShopVerse is built as a **foundation for scalable e-commerce solutions** — focusing on modularity, performance, and real-time interaction.  
Future updates aim to extend its capabilities for enterprise-level applications.

| Architectural Goal | Description |
|---------------------|-------------|
| Modular Design | Separate backend and frontend with API-driven architecture. |
| Real-Time Communication | Use of Socket.IO for live updates and event-based triggers. |
| Scalable Infrastructure | Deployable on cloud platforms with horizontal scaling options. |
| Data Security | JWT authentication, bcrypt hashing, and secure cookie handling. |
| Extensibility | Easy integration of new modules like admin dashboard or chat. |
| Automation | Plans to automate inventory, order status, and email updates. |
| Deployment Flexibility | Ready for containerization (Docker) and CI/CD pipelines. |

---

### 🌟 Thank You for Visiting ShopVerse!

 *If you liked this project, don’t forget to star ⭐ the repo!*  
 *Feedback, suggestions, and collaborations are always welcome!*  

---

#### 💻 Developed & Designed By
**Sanskriti — Full Stack Developer (MERN)**

---

</div>

---

<div align="center">
  <table>
    <tr>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
      </td>
    </tr>
  </table>
</div>

---

<p align="center">
  <img src="https://forthebadge.com/images/badges/powered-by-coffee.svg" alt="Powered by Coffee" />
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with Love" />
  <img src="https://forthebadge.com/images/badges/made-with-javascript.svg" alt="Made with JavaScript" />
</p>

---

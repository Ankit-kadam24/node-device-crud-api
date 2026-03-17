# Node Device Based CRUD API

A simple **Node.js + Express.js CRUD API** that stores user data as JSON files based on **device IDs**.
Each device has its own JSON file, allowing the system to store, update, retrieve, and delete data per device.

This project does **not require a database** and instead uses the **Node.js file system (fs module)** for storage.

---

# 🚀 Features

* Device-based data storage
* CRUD operations using REST APIs
* JSON file-based storage (no database required)
* Separate file created for each device
* Automatic update if the same device sends new data
* Fetch all users API
* Lightweight and easy to deploy

---

# 📁 Project Structure

backendV2

assets
└ devices

controllers
└ userController.js

routes
└ userRoutes.js

utils
└ fileHelper.js

server.js
package.json
README.md

---

# ⚙️ Installation

Clone or download the project and install dependencies.

npm install

Start the server using:

npm run dev

Server will start at:

http://localhost:3000

---

# 📡 API Endpoints

## 1️⃣ Save User

POST /api/saveUser

Request Body

{
"deviceId": "device123",
"data": {
"name": "Ankit",
"mobile": "9999999999"
}
}

This will create a file:

assets/devices/device123.json

---

## 2️⃣ Get User

GET /api/getUser/:deviceId

Example

GET /api/getUser/device123

---

## 3️⃣ Update User

PUT /api/updateUser/:deviceId

Example Body

{
"mobile": "8888888888"
}

---

## 4️⃣ Delete User

DELETE /api/deleteUser/:deviceId

---

## 5️⃣ Get All Users

GET /api/getAllUsers

Example Response

{
"totalUsers": 2,
"users": [
{
"name": "Ankit",
"mobile": "9999999999"
},
{
"name": "Rahul",
"mobile": "8888888888"
}
]
}

---

# 📦 Technologies Used

Node.js
Express.js
File System (fs module)
JSON file storage

---

# 📌 Data Storage Logic

Each device has a separate JSON file stored in:

assets/devices/

Example file:

assets/devices/device123.json

Example content:

{
"name": "Ankit",
"mobile": "9999999999"
}

If the same device sends data again, the existing file will be **updated**.

---

# 🔮 Future Improvements

Possible improvements for this project:

* Add MongoDB database support
* Implement JWT authentication
* Add pagination for user list
* Add request validation
* Deploy API on cloud (Render / AWS)

---

# 👨‍💻 Author

Ankit kadam

Node.js Developer

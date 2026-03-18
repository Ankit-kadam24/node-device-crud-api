// const fileHelper = require('../utils/fileHelper');

// exports.saveUser = (req, res) => {

//     const { deviceId, data } = req.body;

//     if (!deviceId) {
//         return res.status(400).json({
//             message: "deviceId required"
//         });
//     }

//     fileHelper.writeData(deviceId, data);

//     res.json({
//         message: "User data saved",
//         deviceId: deviceId
//     });
// };

// exports.getUser = (req, res) => {

//     const deviceId = req.params.deviceId;

//     const data = fileHelper.readData(deviceId);

//     if (!data) {
//         return res.status(404).json({
//             message: "User not found"
//         });
//     }

//     res.json(data);
// };

// exports.updateUser = (req, res) => {

//     const deviceId = req.params.deviceId;

//     const existing = fileHelper.readData(deviceId);

//     if (!existing) {
//         return res.status(404).json({
//             message: "User not found"
//         });
//     }

//     const updatedData = {
//         ...existing,
//         ...req.body
//     };

//     fileHelper.writeData(deviceId, updatedData);

//     res.json({
//         message: "User updated"
//     });
// };

// exports.deleteUser = (req, res) => {

//     const deviceId = req.params.deviceId;

//     fileHelper.deleteData(deviceId);

//     res.json({
//         message: "User deleted"
//     });
// };

// exports.getAllUsers = (req, res) => {

//     const fs = require('fs');
//     const path = require('path');

//     const basePath = path.join(__dirname, '../assets/devices');

//     try {

//         const files = fs.readdirSync(basePath);

//         const users = files.map(file => {
//             const filePath = path.join(basePath, file);
//             const raw = fs.readFileSync(filePath);
//             return JSON.parse(raw);
//         });

//         res.json({
//             totalUsers: users.length,
//             users: users
//         });

//     } catch (error) {

//         res.status(500).json({
//             message: "Error reading users",
//             error: error.message
//         });

//     }

// };


const User = require('../models/User');

// SAVE (Create or Update same deviceId)
exports.saveUser = async (req, res) => {
    try {
        const { deviceId, data } = req.body;

        if (!deviceId) {
            return res.status(400).json({ message: "deviceId required" });
        }

        const user = await User.findOneAndUpdate(
            { deviceId },
            { data },
            { new: true, upsert: true } // 🔥 important
        );

        res.json({
            message: "User saved",
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET SINGLE
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ deviceId: req.params.deviceId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
// exports.updateUser = async (req, res) => {
//     try {
//         const user = await User.findOneAndUpdate(
//             { deviceId: req.params.deviceId },
//             { $set: { data: req.body } },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json({
//             message: "User updated",
//             user
//         });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.updateUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ deviceId: req.params.deviceId });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedData = {
            ...existingUser.data,   // 🔥 old data
            ...req.body             // 🔥 new data merge
        };

        existingUser.data = updatedData;

        await existingUser.save();

        res.json({
            message: "User updated",
            user: existingUser
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ deviceId: req.params.deviceId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json({
            totalUsers: users.length,
            users
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
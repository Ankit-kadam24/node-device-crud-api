const fileHelper = require('../utils/fileHelper');

exports.saveUser = (req, res) => {

    const { deviceId, data } = req.body;

    if (!deviceId) {
        return res.status(400).json({
            message: "deviceId required"
        });
    }

    fileHelper.writeData(deviceId, data);

    res.json({
        message: "User data saved",
        deviceId: deviceId
    });
};

exports.getUser = (req, res) => {

    const deviceId = req.params.deviceId;

    const data = fileHelper.readData(deviceId);

    if (!data) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(data);
};

exports.updateUser = (req, res) => {

    const deviceId = req.params.deviceId;

    const existing = fileHelper.readData(deviceId);

    if (!existing) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const updatedData = {
        ...existing,
        ...req.body
    };

    fileHelper.writeData(deviceId, updatedData);

    res.json({
        message: "User updated"
    });
};

exports.deleteUser = (req, res) => {

    const deviceId = req.params.deviceId;

    fileHelper.deleteData(deviceId);

    res.json({
        message: "User deleted"
    });
};

exports.getAllUsers = (req, res) => {

    const fs = require('fs');
    const path = require('path');

    const basePath = path.join(__dirname, '../assets/devices');

    try {

        const files = fs.readdirSync(basePath);

        const users = files.map(file => {
            const filePath = path.join(basePath, file);
            const raw = fs.readFileSync(filePath);
            return JSON.parse(raw);
        });

        res.json({
            totalUsers: users.length,
            users: users
        });

    } catch (error) {

        res.status(500).json({
            message: "Error reading users",
            error: error.message
        });

    }

};
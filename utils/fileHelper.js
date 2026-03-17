const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../assets/devices');

function getFilePath(deviceId) {
    return path.join(basePath, `${deviceId}.json`);
}

function writeData(deviceId, data) {
    const filePath = getFilePath(deviceId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function readData(deviceId) {
    const filePath = getFilePath(deviceId);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
}

function deleteData(deviceId) {
    const filePath = getFilePath(deviceId);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

module.exports = {
    writeData,
    readData,
    deleteData
};
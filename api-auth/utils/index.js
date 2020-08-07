var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    let binaryString = new Buffer(file.data).toString('base64');
    let prefix = `data:${file.mimetype};base64`;
    return `${prefix},${binaryString}`;
}

module.exports = {
    base64_encode
}
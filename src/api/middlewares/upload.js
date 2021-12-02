const path = require('path');

const multer = require('multer');

const pathUploads = path.join(__dirname, '../..', 'uploads');

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, pathUploads);
    },
    filename: (req, _file, callback) => {
        const { id } = req.params;
        const fileName = `${id}.jpeg`;
        callback(null, fileName);
    },
});

const upload = multer({ storage }).single('image');

module.exports = upload;
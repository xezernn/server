function createImg(req, res) {
    res.status(200).json({
        img_url: req.file.location,
        message: 'Image created successfully'
    });
}

module.exports = createImg; 
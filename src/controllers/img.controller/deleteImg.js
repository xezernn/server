
const deleteImage = async (req, res) => {
    const { filename } = req.params;
    const bucketName = process.env.S3_BUCKET_NAME;
    try {
        const deleteParams = {
            Bucket: bucketName,
            Key: filename,
        }
        await s3.send(new DeleteObjectCommand(deleteParams));

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
};

module.exports = deleteImage;
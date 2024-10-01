const { S3Client, DeleteObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});


// eger bu endpointi elave etmek istesem: app.use("/img/:filename", deleteImage)
const deleteImage = async (req, res) => {
    const { filename } = req.params;
    if (!filename || typeof filename !== 'string') {
        return res.status(400).json({ error: "Filename must be provided as a string." });
    }

    try {
        const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename
        };

        const response = await s3.send(new DeleteObjectCommand(deleteParams));

        res.status(200).json({ message: `Successfully deleted image: ${filename}` });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete image: ${error.message}` });
    }
};

const deleteImageByPathname = async (filenames) => {
    try {
        let arr = []

        if (typeof filenames == "string") arr.push(filenames)
        else arr = filenames

        const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: arr.map(filename => ({ Key: filename })),
                Quiet: false
            }
        };
        const response = await s3.send(new DeleteObjectsCommand(deleteParams));

        const deletedKeys = response.Deleted.map(obj => obj.Key);
        return `Successfully deleted images: ${deletedKeys.join(', ')}`;
    } catch (error) {
        throw new Error(`Failed to delete images: ${error.message}`);
    }
};


module.exports = deleteImageByPathname; 
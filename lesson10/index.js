import express from 'express'
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv'
dotenv.config()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express()
cloudinary.config({
    cloud_name: 'duwhpejeo',
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
})
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    try {
        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const fileName = file.originalname.split('.')[0];
        const uploadResult = await cloudinary.uploader
            .upload(
                dataUrl, {
                public_id: fileName,
            }
            )
            .catch((error) => {
                console.log(error);
            });

        res.send({
            uploadResult
        })

    } catch (error) {

    }
})

app.listen(8080, (err) => {
    if (err) throw new Error('Error')
    console.log('Server is running');

})
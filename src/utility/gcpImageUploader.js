const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();
const logger = require("../utils/logger");
const path = require("path");


const res = async (localFilePath, destination) => {

//getting the service_account key url from env file
const keyFilePath = process.env.SERVICE_ACCOUNT_KEY_URL;
// Initialize the Google Cloud Storage client
const storage = new Storage({ keyFilename: path.basename(keyFilePath) });
const bucketName = process.env.BUCKET_NAME;

    try{
        //referencing the bucket here
        const bucket = storage.bucket(bucketName);
        //upload file to bucket
        await bucket.upload(localFilePath,{
            destination,
            public: true //making the file public by default
        });

        //the file download url post upload
        const fileDownloadUrl = `https://${bucketName}/${destination}`;
        //logging file url info
        logger.info(`File download  URL: ${fileDownloadUrl}`);
        
        return [{ status: 'success', fileUrl: fileDownloadUrl }];

    }catch(e){  

        logger.info(`File upload error: ${JSON.stringify(e)}`);
        return [{status: 'error', info: e}];

    }
}

//exporting the response of the file upload operations
module.exports = res;
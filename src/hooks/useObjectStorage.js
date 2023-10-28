import React from "react";

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const endPoint = import.meta.env.VITE_LIARA_ENDPOINT;
const bucketName = import.meta.env.VITE_LIARA_BUCKET_NAME;
const accessKey = import.meta.env.VITE_LIARA_ACCESS_KEY;
const secretKey = import.meta.env.VITE_LIARA_SECRET_KEY;





const uploadIMG  = async (base64, key) => {


    const client = new S3Client({
        region: "default",
        endpoint: endPoint,
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretKey
        },
    });

    const params = {
        Body: base64,
        Bucket: bucketName,
        Key: key,
    };

    // async/await
    try {
    console.log("yes1")
    await client.send(new PutObjectCommand(params));
    console.log("yes2")
    console.log(base64)
    } catch (error) {
        console.log(error);
    }

    // callback
    client.send(new PutObjectCommand(params), (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);

    }
    });
}

const downloadIMG = async (key) => {

    const client = new S3Client({
        region: "default",
        endpoint: endPoint,
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretKey
        },
    });
    const params = {
      Bucket: bucketName,
      Key: key
    };
    
    // async/await
    try {
      const data = await client.send(new GetObjectCommand(params));
      console.log(data.Body.toString());
    } catch (error) {
      console.log(error);
    }
    
    // callback
    client.send(new GetObjectCommand(params), (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data.Body.toString());
        return data.Body.toString();
      }
    });
}


export {uploadIMG, downloadIMG};
import dotenv from "dotenv";
dotenv.config();

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

if(!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_SESSION_TOKEN){
    throw new Error("AWS Credentials are not set in Environment Variables");
}

export const dynamoClient = new DynamoDBClient({
    region : "us-east-1",

    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY!,
        sessionToken: process.env.AWS_SESSION_TOKEN!
    }
});

export const s3Client = new S3Client({
    region : "us-east-1",

    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY!,
        sessionToken: process.env.AWS_SESSION_TOKEN!
    }
});


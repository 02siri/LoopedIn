// import { NextApiRequest, NextApiResponse } from "next";
// import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
// import { dynamoClient } from "../utils/aws-sdk";

// const docClient = DynamoDBDocumentClient.from(dynamoClient);

// const setCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   const { email, user_name } = req.body;

//   if (!email || !user_name) {
//     return res.status(400).json({ success: false, message: "Email is required" });
//   }

//   const params = {
//     TableName: "currentUser",
//     Item: { email, user_name },
//   };

//   try {
//     await docClient.send(new PutCommand(params));
//     res.status(200).json({ success: true, message: "Current user set successfully" });
//   } catch (error) {
//     console.error("Error setting current user:", error);
//     res.status(500).json({ success: false, message: "Error storing user" });
//   }
// };

// export default setCurrentUser;

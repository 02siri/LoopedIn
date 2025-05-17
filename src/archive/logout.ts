// import { NextApiRequest, NextApiResponse } from "next";
// import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
// import { dynamoClient } from "../utils/aws-sdk";

// const docClient = DynamoDBDocumentClient.from(dynamoClient);

// const logoutUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   try {

//     const {user_email} = req.body;

//     if(!user_email){
//       return res.status(400).json({success: false, message: "User email is required"});

//     }
//     // Fetch the current user before deleting
//     const deleteParams = {
//       TableName: "currentUser",
//       Key: {email : user_email}
//     };

//     await docClient.send(new DeleteCommand(deleteParams));

//     res.status(200).json({ success: true, message: "User logged out successfully" });
//   } catch (error) {
//     console.error("Error logging out user:", error);
//     res.status(500).json({ success: false, message: "Error logging out" });
//   }
// };

// export default logoutUser;

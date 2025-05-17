// import { NextApiRequest, NextApiResponse } from "next";
// import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
// import { dynamoClient } from "../utils/aws-sdk";

// const docClient = DynamoDBDocumentClient.from(dynamoClient);

// const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   const params = {
//     TableName: "currentUser",
//     Key: { email: req.query.email }, // Ensure the email is passed correctly
//   };

//   try {
//     const { Item } = await docClient.send(new GetCommand(params));
//     if (Item) {
//       res.status(200).json({ 
//         success: true, 
//         email: Item.email, 
//         user_name: Item.user_name // Ensure this is returned
//       });
//     } else {
//       res.status(404).json({ success: false, message: "No user found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving current user:", error);
//     res.status(500).json({ success: false, message: "Error fetching user" });
//   }
// };

// export default getCurrentUser;

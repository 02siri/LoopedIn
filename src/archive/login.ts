// import { NextApiRequest, NextApiResponse } from "next";
// import { QueryCommand } from "@aws-sdk/client-dynamodb"; // Use QueryCommand for GSI
// import { dynamoClient } from '../../utils/aws-sdk'; // Assuming dynamoClient is configured correctly

// const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { email, password } = req.body;

//     // Define the parameters for QueryCommand to fetch user data based on email (GSI key)
//     const params = {
//       TableName: "login",
//       IndexName: "email-Index", // Replace with your actual GSI name if it's different
//       KeyConditionExpression: "email = :email", // Query by email
//       ExpressionAttributeValues: {
//         ":email": { S: email }, // Email value to query by
//       },
//     };

//     try {
//       // Sending the Query command to DynamoDB using the GSI
//       const { Items } = await dynamoClient.send(new QueryCommand(params));

//       // Check if any items are returned
//       if (Items && Items.length > 0) {
//         const Item = Items[0]; // Get the first item, as email should be unique

//         // Check if the password matches
//         if (Item.password.S === password) {
//           const user_name = Item.user_name.S;

//           // Respond with success and user_name (optional)
//           res.status(200).json({
//             success: true,
//             message: "Login successful",
//             user_name: user_name, // Include user_name in the response if necessary
//           });
//         } else {
//           res.status(400).json({
//             success: false,
//             message: "Invalid email or password.",
//           });
//         }
//       } else {
//         res.status(400).json({
//           success: false,
//           message: "Invalid email or password.",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: "An error occurred during login.",
//       });
//     }
//   } else {
//     res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }
// };

// export default loginHandler;

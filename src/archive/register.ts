// import { NextApiRequest, NextApiResponse } from 'next';
// import { dynamoClient } from '../../utils/aws-sdk';
// import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

// const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { email, username, password } = req.body;
     
//      if (!email || !username || !password) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }
//     // Validations
//     if (!email.endsWith("@student.rmit.edu.au")) {
//       return res.status(400).json({ success: false, message: "Email must end with @student.rmit.edu.au" });
//     }
//     if (!/^\d{6}$/.test(password)) {
//       return res.status(400).json({ success: false, message: "Password must be exactly 6 digits" });
//     }
//     if (!/\d$/.test(username)) {
//       return res.status(400).json({ success: false, message: "Username must end with a digit" });
//     }

//     // Check if email already exists using the GSI 'email-Index'
//     const queryParams = {
//       TableName: 'login',
//       IndexName: 'email-Index', // The GSI you mentioned
//       KeyConditionExpression: 'email = :email',
//       ExpressionAttributeValues: {
//         ':email': { S: email }, // Matching the email with the partition key in the GSI
//       },
//     };

//     try {
//       // Query the GSI for the email
//       const { Items } = await dynamoClient.send(new QueryCommand(queryParams));

//       // If email exists (any item returned), reject the registration
//       if (Items && Items.length > 0) {
//         return res.status(400).json({ success: false, message: 'The email already exists' });
//       }

//       // Add new user to DynamoDB with email as partition key and user_name as sort key
//       const newUser = {
//         TableName: 'login',
//         Item: {
//           email: { S: email },
//           user_name: { S: username },
//           password: { S: password },
//         },
//       };

//       // Add the new user to the table
//       await dynamoClient.send(new PutItemCommand(newUser));
//       res.status(200).json({ success: true, message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error during registration:', error); // Log the full error to help debugging
//       res.status(500).json({ success: false, message: 'Server error'});
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }
// };

// export default registerHandler;

// import { NextApiRequest, NextApiResponse } from 'next';
// import { QueryCommand } from '@aws-sdk/client-dynamodb';
// import { dynamoClient, s3Client } from '../utils/aws-sdk';

// const BUCKET_NAME = "music-bucket-a1";

// const fetchSubscriptions = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { user_email } = req.query;

//   if (!user_email) {
//     return res.status(400).json({ success: false, message: 'User email is required' });
//   }

//   const queryParams = {
//     TableName: 'subscriptions',
//     KeyConditionExpression: 'user_email = :user_email',
//     ExpressionAttributeValues: {
//       ':user_email': { S: user_email as string },
//     },
//   };

//   try {
//     const { Items } = await dynamoClient.send(new QueryCommand(queryParams));

//     if (Items && Items.length > 0) {
//       const formattedItems = Items.map((item) => ({
//         music_album: item.music_album.S,
//         music_title: item.music_title.S,
//         music_artist: item.music_artist.S,
//         music_img_url: item.music_img_url.S,
//         music_year: item.music_year.S || "Unknown Year"
  
//       }));
      

//       res.status(200).json({ success: true, subscriptions: formattedItems });
//     } else {
//       res.status(200).json({ success: true, subscriptions: [] });
//     }
//   } catch (error) {
//     console.error("Error fetching subscriptions:", error);
//     res.status(500).json({ success: false, message: "Error retrieving subscriptions" });
//   }
// };

// export default fetchSubscriptions;

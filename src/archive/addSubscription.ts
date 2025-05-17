
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PutItemCommand } from '@aws-sdk/client-dynamodb';
// import { dynamoClient } from '../../utils/aws-sdk';

// const subscribeMusic = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { user_email, music_title, music_artist, music_year, music_album, music_img_url } = req.body;
    
//     // Validate required fields
//     if (!user_email || !music_album) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Required fields missing' 
//       });
//     }

//     const params = {
//       TableName: 'subscriptions',
//       Item: {
//         user_email: { S: user_email },
//         music_album: { S: music_album },
//         music_title: { S: music_title || '' },
//         music_artist: { S: music_artist || '' },
//         music_year: { S: music_year || '' },
//         music_img_url: { S: music_img_url || '' },
//       },
//     };

//     console.log('Attempting to add subscription with params:', JSON.stringify(params));
    
//     await dynamoClient.send(new PutItemCommand(params));
    
//     return res.status(200).json({ 
//       success: true, 
//       message: 'Music subscribed successfully' 
//     });
//   } catch (error: unknown) {
//     console.error('DynamoDB error:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return res.status(500).json({ 
//       success: false, 
//       message: `Error subscribing to music: ${errorMessage}` 
//   });
// }
// };

// export default subscribeMusic;
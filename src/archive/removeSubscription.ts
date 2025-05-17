// import { NextApiRequest, NextApiResponse } from 'next';
// import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
// import { dynamoClient } from '../../utils/aws-sdk';

// const removeSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { user_email, music_album } = req.body;

//   const params = {
//     TableName: 'subscriptions',
//     Key: {
//       user_email: { S: user_email },
//       music_album: { S: music_album },
//     },
//   };

//   try {
//     await dynamoClient.send(new DeleteItemCommand(params));
//     res.status(200).json({ success: true, message: 'Subscription removed successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error removing subscription' });
//   }
// };

// export default removeSubscription;

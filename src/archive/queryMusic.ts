// import { NextApiRequest, NextApiResponse } from "next";
// import { ScanCommand } from "@aws-sdk/client-dynamodb";
// import { dynamoClient } from "../../utils/aws-sdk";

// const queryMusic = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   const { title, year, artist, album } = req.body;

//   console.log("Received query parameters:", req.body);

//   if (!title && !year && !artist && !album) {
//     return res.status(400).json({ success: false, message: "At least one filter is required" });
//   }

//   const queryParams: any = {
//     TableName: "music",
//     ExpressionAttributeNames: {},
//     ExpressionAttributeValues: {},
//     FilterExpression: ""
//   };

//   let filterConditions = [];

//   if (title) {
//     queryParams.ExpressionAttributeNames["#title"] = "title";
//     queryParams.ExpressionAttributeValues[":title"] = { S: title };
//     filterConditions.push("#title = :title");
//   }
//   if (artist) {
//     queryParams.ExpressionAttributeNames["#artist"] = "artist";
//     queryParams.ExpressionAttributeValues[":artist"] = { S: artist };
//     filterConditions.push("#artist = :artist");
//   }
//   if (year) {
//     queryParams.ExpressionAttributeNames["#year"] = "year";
//     queryParams.ExpressionAttributeValues[":year"] = { S: year };
//     filterConditions.push("#year = :year");
//   }
//   if (album) {
//     queryParams.ExpressionAttributeNames["#album"] = "album";
//     queryParams.ExpressionAttributeValues[":album"] = { S: album };
//     filterConditions.push("#album = :album");
//   }

//   if (filterConditions.length > 0) {
//     queryParams.FilterExpression = filterConditions.join(" AND ");
//   }

//   console.log("DynamoDB Query Params:", queryParams);

//   try {
//     const { Items } = await dynamoClient.send(new ScanCommand(queryParams));

//     if (Items && Items.length > 0) {
//       const formattedItems = Items.map((item) => ({
//         music_album: item.album.S,
//         music_title: item.title.S,
//         music_artist: item.artist.S,
//         music_img_url: item.img_url?.S || "",
//         music_year: item.year.S || "Unknown Year"
//       }));

//       res.status(200).json({ success: true, music: formattedItems });
//     } else {
//       res.status(200).json({ success: false, message: "No result is retrieved. Please query again." });
//     }
//   } catch (error) {
//     console.error("Error querying music:", error);
//     res.status(500).json({ success: false, message: "Error querying music" });
//   }
// };

// export default queryMusic;
npm install @aws-sdk/client-dynamodb @aws-sdk/client-s3 uuid

npm install @aws-sdk/s3-request-presigner - to generate pre-signed urls

To install next and node_modules :
npm install 

To start web app locally : 
npm run dev 

To host on EC2 :
-> run npm run build and upload file contents of out/ folder in the instance using FileZilla.
-> start the server (assuming ec2 instance is already started)
-> copy the public ipv4 dns address onto the web browser

To navigate to the register page via login page, add register.html in the browser path.
To navigate to the login page via register page, add login.html in the browser path.

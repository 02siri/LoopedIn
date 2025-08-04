
# LoopedIn
![registerBG](https://github.com/user-attachments/assets/7206ff26-d47f-4398-8ba8-0f7e7387f4f7)

LoopedIn is a sophisticated **serverless music subscription web application** designed to provide users with a seamless and interactive experience in managing their music subscriptions. 

Built on a robust tech stack that includes **AWS services, Next.js, React.js, TypeScript, and Node.js**, LoopedIn leverages the power of cloud computing to deliver a scalable and efficient platform. 

The application is engineered to support **real-time subscription management**, enabling users to easily subscribe to or unsubscribe from their favorite songs while maintaining **session-aware authentication** for enhanced security.

The architecture of LoopedIn utilizes **AWS Lambda functions** in **JavaScript** to handle backend operations, including **data retrieval and manipulation** through **RESTful APIs** which utilizes the **APIGateway**. With **Amazon S3** for **image storage** and **DynamoDB for NoSQL database management**, providing significant benefits such as **efficient partitioning** and **horizontal scalability**. 

The entire application is **hosted on an EC2 instance** with an **Apache server** using **Node.js**, providing a reliable environment for users to access the platform.
## Features

- **User Authentication:** The application supports secure login and registration processes, maintaining session-based authentication to ensure that user data and preferences are protected.
- **Real-Time Subscription Management:** Users can easily subscribe to or unsubscribe from songs, allowing for dynamic interaction with their music preferences.
- **Flexible Metadata Queries:** The platform allows users to search for music based on various criteria, including song title, album, artist, and release year, enhancing the user experience by making it easy to find desired content
- **Image Storage and Retrieval:** Artist images are stored in Amazon S3, enabling quick and efficient access while ensuring that the application remains lightweight and responsive.
- **RESTful API Integration:** The application utilizes REST APIs to facilitate communication between the frontend and backend, employing GET, POST, and DELETE methods for data operations, ensuring a smooth and efficient user experience.
- **Scalable Architecture:** By leveraging AWS Lambda and DynamoDB, LoopedIn is designed to scale effortlessly with user demand, providing a reliable service without the need for extensive server management. Key benefits from DynamoDB include:

    - Automatic Partitioning: Efficiently manages large amounts of data.
    - Horizontal Scalability: Supports increasing traffic without performance degradation.
    
- **Responsive Design:** Built with Next.js and React.js, the application features a modern and responsive design, ensuring that users can access their music subscriptions seamlessly across various devices..

## Tech Stack

**Frontend:** 
 - React.js
 - Next.js
 - TypeScript
 - TailwindCSS
 - ChakraUI
 - Framer Motion

**Backend:** 
- AWS S3
- AWS DynamoDB
- AWS API Gateway
- AWS Lambda
- AWS EC2


## Installation and Deployment

To get started with LoopedIn, follow these steps:

**1. Clone the Repository:**

```bash
git clone https://github.com/02siri/LoopedIn.git
cd LoopedIn
```
**2. Install Dependencies:**

```bash
npm install
```
**3. Install AWS SDK:**

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/client-s3 uuid
npm install @aws-sdk/s3-request-presigner
```
**4. Run the Application Locally:**

```bash
npm run dev
```
**5. Deploying to AWS EC2:**

1. Build the Application:
```bash
npm run build
```
2. Upload the contents of the out/ folder to your EC2 instance using FileZilla.
3. Start the server on your EC2 instance. 
4. Access the application via the public IPv4 DNS address in your web browser.

    (For Steps 2-4, refer section ***'Creating and Connecting to an EC2 Instance'***)

## Creating and Connecting to an EC2 Instance

**1. Create a New Ubuntu-Image VM**

- Log in to your AWS Management Console.
- Navigate to the EC2 Dashboard.
- Click on "Launch Instance".
- Select an Ubuntu AMI (Amazon Machine Image).
- Choose an instance type (e.g., t2.micro for free tier).
- Configure instance details, storage, and tags as needed.
- Configure security group to allow SSH (port 22) and HTTP (port 80).
- Review and launch the instance.

**2. Copy the Public IPv4 Address**

- Once the instance is running, select it from the EC2 Dashboard.
- Copy the Public IPv4 address displayed in the instance details.

**3. Download the PEM File from 'AWS Details'**

- Ensure you have the PEM file downloaded when you created the instance.
- This file is necessary for SSH access.

**4. Connect to the Instance/VM via Terminal**

Open your terminal and run the following command:

```bash
ssh -i /<path-to-your-pem-file>/labsuser.pem ubuntu@ec2-3-91-252-62.compute-1.amazonaws.com
```

If you encounter an error, change the permissions of the PEM file:

```bash
chmod 400 /<path-to-your-pem-file>/labsuser.pem
```

Then, run the SSH command again.

**5. Install Apache Server**

Once connected to your instance, install Apache with the following command:

```bash
sudo apt-get install apache2
```

To check the status of the Apache server, use:

```bash
sudo systemctl status apache2
```

**6. Install Node.js**

Download the setup script from NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

Install Node.js:

```bash
sudo apt install -y nodejs
```

Check the installed versions of Node.js and npm:

```bash
node -v
npm -v
```

**7. Uploading Files Using FileZilla**

In your next.config.ts, configure the output:

```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
```

In your package.json, ensure the scripts section includes:

```json
"scripts": {
"dev": "next dev",
```
Build your files:

```bash
npm run build
```
Change permissions for accessing /var/www/html:

```bash
sudo chmod -R 777 /var/www/html
```

Upload the contents of the **'out/'** folder to **'/var/www/html'** using FileZilla.

**8. Start Apache Server**

To start the Apache server, run:

```bash
1sudo service apache2 start
```

**9. Accessing the Application**

Use the public IPv4 DNS address to access your application:

- For login: <public-ipv4-address>/login.html
- For registration: <public-ipv4-address>/register.html

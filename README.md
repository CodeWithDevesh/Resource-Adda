# Link

https://resource-adda-1030059749120.asia-south1.run.app/

# Resource Adda

**Resource Adda** is an academic resource-sharing platform designed to help students access study materials, contribute resources, and connect with communities for their academic growth. The platform is structured to make it easy for users to find relevant study materials by semester, branch, and subjects while offering a space for top-performing students to share their notes.

# Project Structure

The project is divided into two parts, frontend and backend...

## Frontend ->
To setup the frontend
```bash
cd frontend
npm i
npm run dev
```
Before running the frontend make sure to setup the server url in the Constants.jsx file

Run npm run build to build the frontend directly in the backend's dist folder for serving with the backend...

## Backend ->
To setup the backend
```bash
cd backend
npm i
npm run dev
```
Make sure you setup the .env file first with the following parameters

```
MONGO_URI
PASSWORD
JWT_SECRET
BUCKET_NAME
```
Make sure to setup google cli as the backend runs on Google Cloud so you will need you creditentials...

Once the server is up and running you are good to go...

And one more thing you will need to mess up with the mongodb to setup a admin id pass as I was too lazy to create a route for it😅... jk it's for security reasons.
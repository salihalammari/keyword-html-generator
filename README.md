# keyword-html-generator
building an interface that demonstrates your skills in Node.js and MongoDB. The mission involves creating a web application where users can upload a file containing a list of keywords that i will share with you . The application will then generate HTML pages based on these keywords.

## Technology Stack

.` Backend:`Node.js with Express framework

.` Database:` MongoDB for storing keywords and generated HTML content

.` Frontend:` React for building the user interface

.` File Upload:` Multer for handling file uploads in Node.js

## Setting Up the Project Structure

### First, initialize a new `Node.js` project and install necessary dependencies.

```bash
mkdir keyword-html-generator && cd keyword-html-generator
npm init -y
npm install express multer mongoose cors dotenv
```

### Create a `.env` file to store environment variables like MongoDB connection string.

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=3001
```
### 1. File Upload Endpoint
. Install Multer for handling file uploads.
. Configures multer to store uploaded files in the `uploads` directory with a unique filename.

```bash
npm install multer
```
### 2. Import Dependencies:
.`express` for creating the server.
. `cors` for handling cross-origin requests.
. `mongoose` for connecting to MongoDB.
. `multer` for handling file uploads.
. `fs` and `path` for file system and path operations.
. Custom modules like `fileRoutes`, `errorHandler`, and `Keyword`.


# Frontend Setup

For the frontend, let's use React. Create a new React app and install Axios for HTTP requests.

```bash
npx create-react-app client
cd client
npm install axios
```


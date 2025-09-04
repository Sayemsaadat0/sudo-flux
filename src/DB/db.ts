import { connect } from "mongoose";
// const MONGO_URI = mongodb+srv://<username>:<password>@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// const MONGO_URI = process.env.MONGODB_URL;
const MONGO_URI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.njebycd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

if (!MONGO_URI) {
    throw new Error("MONGODB_URL environment variable is not defined.");
}

connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error: any) => console.log(error));
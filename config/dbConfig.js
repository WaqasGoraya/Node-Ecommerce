import mongoose from "mongoose";

const CONNECT_DB = async (DB_URL) => {
    try {
        const options = {
            dbName: process.env.DB_NAME
        }
        await mongoose.connect(DB_URL,options);
        console.log(`Database Connected`);
    } catch (error) {
        console.log(error);
    }
}

export default CONNECT_DB;
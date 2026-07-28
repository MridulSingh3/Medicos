// import mongoose from "mongoose";
// const connectDB = async () => {
//     mongoose.connection.on('connected', ()=> console.log("Database Connected"));

//     await mongoose.connect(`${process.env.MONGODB_URI}/medicos`)
// }

// export default connectDB
// import mongoose from "mongoose";

// const connectDB = async () => {
//     // Ye check karne ke liye ki variable load hua ya nahi
//     console.log("Connecting to:", process.env.MONGODB_URI);

//     if (!process.env.MONGODB_URI) {
//         console.error("❌ MONGODB_URI is not defined in .env file!");
//         return;
//     }

//     mongoose.connection.on('connected', () => console.log("Database Connected ✅"));
//     mongoose.connection.on('error', (err) => console.log("DB Connection Error: ", err));

//     try {
//         // family: 4 zaroor add karein mobile hotspot ke liye
//         await mongoose.connect(`${process.env.MONGODB_URI}/medicos`, {
//             family: 4
//         });
//     } catch (error) {
//         console.error("Connection Failed:", error.message);
//     }
// }

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
    console.log("Connecting to:", process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
        console.log("Database Connected ✅");
    });

    mongoose.connection.on("error", (err) => {
        console.log("DB Connection Error:", err);
    });

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            family: 4
        });
    } catch (error) {
        console.error("Connection Failed:", error.message);
    }
};

export default connectDB;
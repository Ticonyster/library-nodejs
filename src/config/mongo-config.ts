import "dotenv/config"
import mongoose, { connect } from "mongoose"

async function dbConnect(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI
    
    await connect(DB_URI)
}

mongoose.set('strictQuery', true)

export default dbConnect

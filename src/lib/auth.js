import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);

// 🔥 IMPORTANT: connect first
await client.connect();

const db = client.db(process.env.AUTH_DB_NAME || "auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true,   
  }, 
}); 
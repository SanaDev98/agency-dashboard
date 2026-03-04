import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Next.js hot-reload safe cached connection
const globalWithMongoose = global as typeof globalThis & {
    mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongooseCache) {
    globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongooseCache;

export async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let mongo: MongoClient;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  mongo = globalWithMongo._mongoClient;
} else {
  mongo = new MongoClient(uri, options);
}

export { mongo };

export async function getDb() {
  await mongo.connect();

  return mongo.db('take_home_assessment');
}

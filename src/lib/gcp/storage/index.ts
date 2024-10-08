import { Storage } from '@google-cloud/storage';

const private_key = new Buffer(
  process.env.GCP_STORAGE_PRIVATE_KEY as string,
  'base64'
).toString('ascii');

export const storage = new Storage({
  apiEndpoint: process.env.GCP_API_ENDPOINT,
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_STORAGE_CLIENT_EMAIL,
    private_key,
  },
});

export const avatarsBucket = storage.bucket(
  process.env.GCP_STORAGE_AVATARS_BUCKET_NAME as string
);

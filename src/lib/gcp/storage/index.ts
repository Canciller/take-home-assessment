import { Storage } from '@google-cloud/storage';

export const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_STORAGE_CLIENT_EMAIL,
    private_key: process.env.GCP_STORAGE_PRIVATE_KEY,
  },
});

export const avatarsBucket = storage.bucket(
  process.env.GCP_STORAGE_AVATARS_BUCKET_NAME as string
);

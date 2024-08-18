import { ObjectId } from 'mongodb';

export type ContactDocument = {
  _id: ObjectId;
  name: string;
  image?: {
    path: string;
    signedUrl: string;
  };
  last_contact_date: Date;
  createdAt: Date;
  updatedAt: Date;
};

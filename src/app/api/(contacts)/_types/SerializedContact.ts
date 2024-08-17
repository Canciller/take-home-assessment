export type SerializedContact = {
  _id: string;
  name: string;
  image?: {
    path: string;
    signedUrl: string;
  };
  last_contact_date: string;
  createdAt: string;
  updatedAt: string;
};

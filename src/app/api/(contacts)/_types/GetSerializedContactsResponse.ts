import { SerializedContact } from './SerializedContact';

export type GetSerializedContactsResponse = {
  data: SerializedContact[];
  count: number;
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
};

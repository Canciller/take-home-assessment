import { SerializedContact } from './SerializedContact';

export type GetSerializedContactsResponse = {
  data: SerializedContact[];
  count: number;
  total: number;
  page: number;
  limit: number;
};

import { SerializedContact } from './SerializedContact';

export type SerializedGetContactsResponse = {
  data: SerializedContact[];
  count: number;
};

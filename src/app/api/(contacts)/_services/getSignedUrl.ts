import { avatarsBucket } from '@/lib/gcp/storage';

export async function getSignedUrl(fileName: string): Promise<string> {
  const [url] = await avatarsBucket.file(fileName).getSignedUrl({
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
  });

  return url;
}

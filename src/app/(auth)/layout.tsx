import { redirect } from 'next/navigation';

import { ThemeDropdown } from '@/components/ThemeDropdown';
import { getSession } from '@/lib/session';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    return redirect('/');
  }

  return (
    <>
      <div className="absolute right-5 top-5 md:right-10 md:top-10">
        <ThemeDropdown />
      </div>

      {children}
    </>
  );
}

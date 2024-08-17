import { ThemeDropdown } from '@/components/ThemeDropdown';

export default function Layout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-border flex items-center justify-between border-b border-solid px-10 py-5">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <ThemeDropdown />
      </header>

      {children}

      {modals}
    </>
  );
}

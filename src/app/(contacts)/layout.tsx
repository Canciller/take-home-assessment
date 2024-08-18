import { ThemeDropdown } from '@/components/ThemeDropdown';

export default function Layout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen min-w-[320px] flex-col">
      <header className="flex items-center justify-between border-b border-solid border-border px-5 py-5 md:px-10">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <ThemeDropdown />
      </header>

      {children}

      {modals}
    </div>
  );
}

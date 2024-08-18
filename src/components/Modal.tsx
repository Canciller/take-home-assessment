'use client';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from './ui/dialog';

export function Modal({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogDescription></DialogDescription>
        <DialogContent className="overflow-y-hidden">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { EditContactForm } from '@/app/(contacts)/_components/EditContactForm';
import { Modal } from '@/components/Modal';

export function Content() {
  const router = useRouter();

  return (
    <Modal title="Edit contact">
      <EditContactForm onSuccess={() => router.back()} />
    </Modal>
  );
}

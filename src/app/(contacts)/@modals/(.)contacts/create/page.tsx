'use client';

import { useRouter } from 'next/navigation';

import { CreateContactForm } from '@/app/(contacts)/_components/CreateContactForm';
import { Modal } from '@/components/Modal';

export default function CreateContactModal() {
  const router = useRouter();

  return (
    <Modal title="Create a new contact">
      <CreateContactForm onSuccess={() => router.back()} />
    </Modal>
  );
}

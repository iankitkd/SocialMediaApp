"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { toast } from 'sonner';
import ConfirmationCard from '@/components/card/ConfirmationCard'
import apiClient from '@/lib/apiClient';
import { useUserStore } from '@/lib/store/userStore';

export default function page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
      setIsLoading(true);
      await apiClient('/api/signout', "POST");
      useUserStore.getState().clearUser()
      toast.success("Logged out successfully");
      router.push('/login');
      setIsLoading(false);
    }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-foreground/50'>
      <ConfirmationCard
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => router.back()}
        confirmBtnVariant="destructive"
        disabled={isLoading}
      />
    </div>
  )
}

'use client'

import { useEffect } from 'react'

import { useUserStore } from './userStore'
import { getCurrentUser } from '../actions/user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UserStoreInitializer() {
    const router = useRouter();
    const setUser = useUserStore.getState().setUser;
    const clearUser = useUserStore.getState().clearUser;
    
    useEffect(() => {
        const fetchUser = async () => {
            // loading toast while backend initialize
            let loadingToast: ReturnType<typeof toast.loading> | null = null;
            const timeout = setTimeout(() => {
                loadingToast = toast.loading('Starting up the backend — this may take up to a minute.');
            }, 5000);
            
            try {
                // get current user
                const user = await getCurrentUser();  

                if (user) {
                    setUser(user)
                    if(!user.isOnboarded) {
                        router.push('/onboarding');
                    }             
                } else {
                    setUser({_id: "", username: "", name: "Guest User", avatar: ""});
                    // clearUser()
                }
            } catch (error) {
                clearUser()
                toast.error(error instanceof Error ? error.message : "Something went wrong");
            } finally {
                clearTimeout(timeout);
                if (loadingToast) toast.dismiss(loadingToast);
            }
        }
        fetchUser();
  }, [])

  return null
}
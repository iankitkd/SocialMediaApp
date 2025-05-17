'use client'

import { useEffect } from 'react'

import { useUserStore } from './userStore'
import { getCurrentUser } from '../actions/user';
import { useRouter } from 'next/navigation';

export default function UserStoreInitializer() {
    const router = useRouter();
    const setUser = useUserStore.getState().setUser;
    const clearUser = useUserStore.getState().clearUser;
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();   
                if (user) {
                    if(!user.isOnboarded) {
                        router.push('/onboarding');
                    }             
                    setUser(user)
                } else {
                    clearUser()
                }
            } catch (error) {
                clearUser()
                router.push('/error');
            }
        }
        fetchUser();
  }, [])

  return null
}
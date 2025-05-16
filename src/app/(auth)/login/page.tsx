import React from 'react'
import AuthForm from '@/components/auth/AuthForm'

export default function page() {
  return (
    <div className='w-full min-h-dvh flex items-center justify-center'>
      <AuthForm mode='signin' />
    </div>
  )
}

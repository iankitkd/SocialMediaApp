"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoaderCircle, Mail, Lock, User } from 'lucide-react'
import { toast } from "sonner"

import { signinSchema, signupSchema, FormValues } from "@/lib/validations/user"
import { signin, signup } from "@/actions/auth"

type AuthFormProps = {
  mode: 'signup' | 'signin'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
      resolver: zodResolver(mode === 'signup' ? signupSchema : signinSchema),
      defaultValues: mode === 'signup' 
        ? { name: '', email: '', password: '' }
        : { email: '', password: '' }
  })
 
  async function onSubmit(values: FormValues) {
    console.log(values)
    setIsLoading(true)

    try {
      if(mode === "signup") {
        if ('name' in values) { // TypeScript now knows `values` is signupSchema
          await signup(values);
        }
        toast.success('Account created successfully.')
        router.push('/dashboard')
      } else if(mode === "signin") {
        await signin(values);
        toast.success('Successfully signed in.')
        router.push('/dashboard')
      }
    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full md:w-md h-screen md:max-h-[500px] py-4 px-6 flex flex-col gap-2 bg-card">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {mode === 'signup' 
            ? 'Create an Account' 
            : 'Welcome Back'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === 'signup'
            ? 'Enter your details to get started'
            : 'Sign in to continue'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {mode === 'signup' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="text" placeholder="Your Name" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                      <Mail className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="email" placeholder="you@example.com" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                      <Lock className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="password" placeholder="******" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : mode === 'signup' ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </Button>

          <p className="flex gap-2 w-full justify-center">
              <span>{mode==="signup" ? "Already have a account?" : "Don't have a account?"}</span>
              <Link href={mode === "signup" ? "/login" : "/signup"}
              className="underline">
                {mode==="signup" ? "Sign in" : "Sign up"}
              </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

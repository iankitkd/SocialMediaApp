"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from "../shared/DatePicker"
import { CircleUserRound, LoaderCircle } from 'lucide-react'
import { toast } from "sonner"

import { profileSchema, ProfileValues } from "@/lib/validations/user"

type ProfileFormProps = {
  mode: 'onboarding' | 'edit'
}

export default function ProfileForm({ mode }: ProfileFormProps) {

  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProfileValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: undefined,
        username: "",
        bio: "",
        gender: undefined,
        birthDate: undefined,
        photoUrl: "",
      }
  })
  
  async function onSubmit(values:ProfileValues) {
    console.log("here")
    console.log(values);
  }
  
  return (
    <div className="w-full sm:w-md h-screen sm:h-full min-h-[500px] py-4 px-6 flex flex-col gap-2 border-border border-1 rounded-2xl shadow-2xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Profile Details
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormLabel className="w-18 h-18 rounded-full">
                  <CircleUserRound strokeWidth={"0.5px"} className="w-full h-full text-muted-foreground"/>
                </FormLabel>
                <FormControl>
                    {/* <Input type="file" hidden {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          { mode === "edit" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-red-500 -ml-1">*</span></FormLabel>
                <FormControl>
                    <Input type="text" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          )}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username <span className="text-red-500 -ml-1">*</span></FormLabel>
                <FormControl>
                    <Input type="username" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4">
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder="Gender" />
                       </SelectTrigger>
                     </FormControl>
                    <SelectContent>
                       <SelectItem value="male">Male</SelectItem>
                       <SelectItem value="female">Female</SelectItem>
                       <SelectItem value="other">Other</SelectItem>
                     </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4">
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

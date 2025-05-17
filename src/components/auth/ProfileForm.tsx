"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from "../shared/DatePicker"
import { CircleCheckBig, CircleUserRound, CircleX, LoaderCircle } from 'lucide-react'
import { toast } from "sonner"

import { profileSchema, ProfileValues } from "@/lib/validations/user"
import { isUsernameAvailable, updateUser } from "@/lib/actions/user"
import { debounce } from "@/utils/debounce"
import { useUserStore } from "@/lib/store/userStore"

type ProfileFormProps = {
  mode: 'onboarding' | 'edit';
  initialData?: ProfileValues;
}

export default function ProfileForm({ mode, initialData }: ProfileFormProps) {
  const {username} = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser)
  
  const form = useForm<ProfileValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: initialData 
        ? {...initialData, birthDate: (initialData.birthDate ? new Date(initialData.birthDate) : undefined)} 
        : {
          name: undefined,
          username: "",
          bio: "",
          gender: undefined,
          birthDate: undefined,
          photoUrl: "",
          location: undefined,
          isOnboarded: true,
        }
  })
  
  async function onSubmit(values:ProfileValues) {
    setIsLoading(true);

    try {
      const user = await updateUser(values);
      setUser(user);
      
      if(mode === "edit") {
        toast.success('Account updated successfully');
        router.push(`/${username}`)
      } else if (mode === "onboarding") {
        router.push('/home')
      }

    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  
  const checkAvailability = useCallback(
    debounce(async (username: string) => {
      if (username.trim() === "") {
        form.clearErrors("username");
        return;
      }

      try {
        const isAvailable = await isUsernameAvailable(username);

        if (isAvailable) {
          form.clearErrors("username");
        } else {
          form.setError("username", {
            type: "manual",
            message: "Username is already taken.",
          });
        }
      } catch (error:any) {
        toast.error(error.message);
      }
    }, 1000),
    []
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    form.setValue("username", username);
    checkAvailability(username);
  };
  
  return (
    <div className="w-full sm:w-md h-full min-h-[500px] py-4 px-6 flex flex-col gap-2 border-border border-1 rounded-2xl shadow-2xl">
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
                  <div className="relative">
                    { !!form.formState.errors.username 
                        ? (<CircleX color="red" className="absolute h-4 w-4 right-3 top-1/2 -translate-y-1/2" />)
                        : (field.value && <CircleCheckBig color="green" className="absolute h-4 w-4 right-3 top-1/2 -translate-y-1/2" />)
                    }
                    <Input type="username" disabled={mode === "edit"} placeholder="" value = {field.value} onChange={handleUsernameChange} className="pr-9"/>
                  </div>
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

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading || Object.keys(form.formState.errors).length > 0}>
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

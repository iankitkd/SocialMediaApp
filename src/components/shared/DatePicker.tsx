"use client"

import { ControllerRenderProps } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

interface DatePickerFormProps {
  field: ControllerRenderProps<any, any>
}

export default function DatePicker({ field }: DatePickerFormProps) {
  const [month, setMonth] = useState<Date>(field.value || new Date())

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(month)
    newDate.setMonth(monthIndex)
    field.onChange(newDate)
    setMonth(newDate)
  }

  const handleYearChange = (year: number) => {
    const newDate = new Date(month)
    newDate.setFullYear(year)
    field.onChange(newDate)
    setMonth(newDate)
  }

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      field.onChange(date)
      setMonth(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span> }
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex justify-around">
          {/* Month */}
          <Select
            value={month.getMonth().toString()}
            onValueChange={(value) => handleMonthChange(Number(value))}
          >
            <SelectTrigger>
                <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent position="popper">
                {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={`${i}`}>
                    {format(new Date(0, i), "MMMM")}
                </SelectItem>
                ))}
            </SelectContent>
          </Select>
          
          {/* Year */}
          <Select
            value={month.getFullYear().toString()}
            onValueChange={(value) => handleYearChange(Number(value))}
          >
            <SelectTrigger>
                <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent position="popper">
                {Array.from({ length: 100 }, (_, i) => (
                <SelectItem
                    key={i}
                    value={`${new Date().getFullYear() - i}`}
                >
                    {new Date().getFullYear() - i}
                </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Calender */}
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={handleSelectDate}
            month={month}
            onMonthChange={setMonth}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
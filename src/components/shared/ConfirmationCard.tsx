import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ConfirmationCardProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmBtnVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean
}

export default function ConfirmationCard({
    title, 
    description, 
    confirmText = "Confirm", 
    cancelText = "Cancel", 
    onConfirm, 
    onCancel, 
    confirmBtnVariant="default",
    disabled = false
}: ConfirmationCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} className="rounded-full cursor-pointer" disabled={disabled}>
            {cancelText}
        </Button>
        <Button variant={confirmBtnVariant} onClick={onConfirm} className="rounded-full cursor-pointer" disabled={disabled}> 
            {confirmText}
        </Button>
      </CardFooter>
    </Card>
  )
}

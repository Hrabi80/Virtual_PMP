// src/components/ui/ConfirmDialog.tsx

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  /** Controls whether the AlertDialog is open */
  open: boolean
  /** Called when you want to open/close the dialog */
  onOpenChange: (open: boolean) => void
  /** Title text shown at the top */
  title: string
  /** Description text under the title */
  description: string
  /** Label for the “cancel” button */
  cancelText?: string
  /** Label for the “confirm” button */
  confirmText?: string
  /** Called when the user clicks the confirm button */
  onConfirm: () => void
}

/**
 * A reusable confirmation dialog using Radix AlertDialog.
 * 
 * Usage: Control its `open` prop from parent, and pass `onConfirm`.
 * The parent can render whichever trigger it wants (button, icon, etc.).
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
}) => {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          className="fixed inset-0 bg-black/30"
        />
        <AlertDialogPrimitive.Content
          className="fixed top-[50%] left-[50%] w-[90vw] max-w-[450px] 
                     translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6
                     shadow-lg focus:outline-none"
        >
         
            <AlertDialogPrimitive.Title className="text-lg font-medium">
              {title}
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description className="mt-3 mb-3 text-sm text-gray-600">
              {description}
            </AlertDialogPrimitive.Description>

            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="outline">{cancelText}</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button variant="destructive" onClick={onConfirm}>
                {confirmText}
              </Button>
            </AlertDialogPrimitive.Action>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

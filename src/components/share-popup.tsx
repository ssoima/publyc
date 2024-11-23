import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SharePopupProps {
  isOpen: boolean
  onClose: () => void
  onSchedule: () => void
  onPublish: () => void
}

export function SharePopup({ isOpen, onClose, onSchedule, onPublish }: SharePopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            Choose how you want to share your post
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <Button onClick={onSchedule}>Schedule Post</Button>
          <Button onClick={onPublish}>Publish Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


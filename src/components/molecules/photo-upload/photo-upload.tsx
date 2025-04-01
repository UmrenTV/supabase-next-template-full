'use client'

import { useState, useRef } from 'react'
import { FaUpload, FaTimes } from 'react-icons/fa'
import { DefaultAvatar } from '@/components/atoms/default-avatar/default-avatar'

interface PhotoUploadProps {
  currentPhoto?: string | null
  onPhotoChange: (file: File) => void
  className?: string
  name?: string
}

export function PhotoUpload({ currentPhoto, onPhotoChange, className = '', name }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        onPhotoChange(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`} data-testid="photo-upload-container">
      <div className="relative w-full h-full">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              onClick={handleRemove}
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              aria-label="Remove photo"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <DefaultAvatar name={name} size="lg" />
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        data-testid="file-input"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="btn btn-outline btn-sm"
      >
        {preview ? 'Change Photo' : 'Upload a photo'}
      </button>
    </div>
  )
} 
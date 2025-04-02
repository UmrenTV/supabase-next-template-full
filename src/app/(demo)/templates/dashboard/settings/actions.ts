'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Validation schemas
export const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
})

export const securitySchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).superRefine(async (data, ctx) => {
  if (data.newPassword !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ["confirmPassword"]
    });
  }
})

export const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
})

export const privacySchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends']),
  activityStatus: z.enum(['online', 'offline', 'away']),
  dataCollection: z.boolean(),
  thirdPartyAccess: z.boolean(),
})

// Mock database functions (replace with actual database calls)
async function getUserSettings(userId: string) {
  // Simulate database fetch
  return {
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Software Developer',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    profileVisibility: 'public',
    activityStatus: 'online',
    dataCollection: true,
    thirdPartyAccess: false,
  }
}

async function updateUserSettings(userId: string, data: any) {
  // Simulate database update
  console.log('Updating settings for user:', userId, data)
  return { success: true }
}

// Server actions
export async function updateProfile(userId: string, data: z.infer<typeof profileSchema>) {
  try {
    const validatedData = profileSchema.parse(data)
    await updateUserSettings(userId, validatedData)
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, error: 'Failed to update profile' }
  }
}

export async function updateSecurity(userId: string, data: z.infer<typeof securitySchema>) {
  try {
    const validatedData = securitySchema.parse(data)
    await updateUserSettings(userId, validatedData)
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, error: 'Failed to update security settings' }
  }
}

export async function updateNotifications(userId: string, data: z.infer<typeof notificationSchema>) {
  try {
    const validatedData = notificationSchema.parse(data)
    await updateUserSettings(userId, validatedData)
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, error: 'Failed to update notification settings' }
  }
}

export async function updatePrivacy(userId: string, data: z.infer<typeof privacySchema>) {
  try {
    const validatedData = privacySchema.parse(data)
    await updateUserSettings(userId, validatedData)
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, error: 'Failed to update privacy settings' }
  }
} 
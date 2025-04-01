'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      // Handle registration logic here
      console.log('Registration data:', data)
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider: string) => {
    // Handle social registration logic here
    console.log('Social registration with:', provider)
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold">Create an Account</h2>
            <p className="text-base-content/70">Join us today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register('fullName')}
                className={`input input-bordered ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.fullName.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password')}
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                placeholder="Create a password"
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.confirmPassword.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  I accept the{' '}
                  <Link href="/terms" className="link link-primary">
                    Terms and Conditions
                  </Link>
                </span>
                <input
                  type="checkbox"
                  {...register('acceptTerms')}
                  className="checkbox checkbox-primary"
                />
              </label>
              {errors.acceptTerms && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.acceptTerms.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="space-y-2">
            <button
              onClick={() => handleSocialRegister('google')}
              className="btn btn-outline w-full"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialRegister('github')}
              className="btn btn-outline w-full"
            >
              <FaGithub className="mr-2" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleSocialRegister('facebook')}
              className="btn btn-outline w-full"
            >
              <FaFacebook className="mr-2" />
              Continue with Facebook
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-base-content/70">
              Already have an account?{' '}
              <Link href="/auth/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
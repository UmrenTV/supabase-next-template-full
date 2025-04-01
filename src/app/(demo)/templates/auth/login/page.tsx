'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // Handle login logic here
      console.log('Login data:', data)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Handle social login logic here
    console.log('Social login with:', provider)
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
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-base-content/70">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <Link href="/auth/forgot-password" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
              <input
                type="password"
                {...register('password')}
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
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
              <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="space-y-2">
            <button
              onClick={() => handleSocialLogin('google')}
              className="btn btn-outline w-full"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="btn btn-outline w-full"
            >
              <FaGithub className="mr-2" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="btn btn-outline w-full"
            >
              <FaFacebook className="mr-2" />
              Continue with Facebook
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-base-content/70">
              Don't have an account?{' '}
              <Link href="/auth/register" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import { Button, TextInput } from '@/components/atoms'
import { FormGroup } from '@/components/molecules/form-group/form-group'

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void
  isLoading?: boolean
  error?: string
  className?: string
}

export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  className = ''
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!email || !password) {
      setFormError('Please fill in all fields')
      return
    }

    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 max-w-md mx-auto ${className}`}>
      <FormGroup
        label="Email"
        error={formError || error}
        required
      >
        <TextInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup
        label="Password"
        required
      >
        <TextInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          disabled={isLoading}
        />
      </FormGroup>

      <Button
        type="submit"
        label={isLoading ? 'Signing in...' : 'Sign in'}
        variant="primary"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  )
} 
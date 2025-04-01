import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SettingsPage from './page'

describe('SettingsPage', () => {
  it('renders all settings sections', () => {
    render(<SettingsPage />)
    
    // Check for section titles
    expect(screen.getByText('Profile Settings')).toBeInTheDocument()
    expect(screen.getByText('Security Settings')).toBeInTheDocument()
    expect(screen.getByText('Notification Settings')).toBeInTheDocument()
    expect(screen.getByText('Privacy Settings')).toBeInTheDocument()
  })

  it('validates profile form fields', async () => {
    render(<SettingsPage />)
    
    // Test empty name
    const nameInput = screen.getByLabelText('Full Name')
    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.blur(nameInput)
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
    
    // Test invalid email
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
    
    // Test long bio
    const bioInput = screen.getByLabelText('Bio')
    fireEvent.change(bioInput, { target: { value: 'a'.repeat(201) } })
    fireEvent.blur(bioInput)
    await waitFor(() => {
      expect(screen.getByText('Bio must be less than 200 characters')).toBeInTheDocument()
    })
  })

  it('validates security form fields', async () => {
    render(<SettingsPage />)
    
    // Test short password
    const newPasswordInput = screen.getByLabelText('New Password')
    fireEvent.change(newPasswordInput, { target: { value: 'short' } })
    fireEvent.blur(newPasswordInput)
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
    })
    
    // Test password mismatch
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
    fireEvent.change(newPasswordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } })
    fireEvent.blur(confirmPasswordInput)
    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument()
    })
  })

  it('handles notification toggles', async () => {
    render(<SettingsPage />)
    
    const emailToggle = screen.getByLabelText('Email Notifications')
    const pushToggle = screen.getByLabelText('Push Notifications')
    const smsToggle = screen.getByLabelText('SMS Notifications')
    const marketingToggle = screen.getByLabelText('Marketing Emails')

    fireEvent.click(emailToggle)
    fireEvent.click(pushToggle)
    fireEvent.click(smsToggle)
    fireEvent.click(marketingToggle)

    expect(emailToggle).not.toBeChecked()
    expect(pushToggle).not.toBeChecked()
    expect(smsToggle).toBeChecked()
    expect(marketingToggle).not.toBeChecked()
  })

  it('handles privacy settings changes', async () => {
    render(<SettingsPage />)
    
    const profileVisibilitySelect = screen.getByLabelText('Profile Visibility')
    const activityStatusSelect = screen.getByLabelText('Activity Status')
    const dataCollectionToggle = screen.getByLabelText('Data Collection')
    const thirdPartyToggle = screen.getByLabelText('Third-Party Access')

    fireEvent.change(profileVisibilitySelect, { target: { value: 'private' } })
    fireEvent.change(activityStatusSelect, { target: { value: 'away' } })
    fireEvent.click(dataCollectionToggle)
    fireEvent.click(thirdPartyToggle)

    expect(profileVisibilitySelect).toHaveValue('private')
    expect(activityStatusSelect).toHaveValue('away')
    expect(dataCollectionToggle).not.toBeChecked()
    expect(thirdPartyToggle).toBeChecked()
  })

  it('submits forms with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    render(<SettingsPage />)
    
    // Submit profile form
    const nameInput = screen.getByLabelText('Full Name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.click(screen.getByText('Save Changes'))
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Profile data:', expect.objectContaining({
        fullName: 'John Doe',
        email: 'john@example.com',
        bio: 'Software developer and tech enthusiast',
      }))
    })

    // Submit security form
    const newPasswordInput = screen.getByLabelText('New Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
    fireEvent.change(newPasswordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.click(screen.getByText('Update Password'))
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Security data:', expect.objectContaining({
        newPassword: 'password123',
        confirmPassword: 'password123',
      }))
    })

    consoleSpy.mockRestore()
  })

  it('disables submit buttons during form submission', async () => {
    render(<SettingsPage />)
    
    const saveButton = screen.getByText('Save Changes')
    fireEvent.click(saveButton)
    
    expect(saveButton).toBeDisabled()
    expect(saveButton).toHaveTextContent('Saving...')
    
    await waitFor(() => {
      expect(saveButton).not.toBeDisabled()
      expect(saveButton).toHaveTextContent('Save Changes')
    })
  })

  it('handles photo upload and removal', async () => {
    render(<SettingsPage />)
    
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const uploadButton = screen.getByText('Upload a photo')
    
    // Upload photo
    fireEvent.click(uploadButton)
    const fileInput = screen.getByTestId('file-input')
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    await waitFor(() => {
      const img = screen.getByAltText('Preview')
      expect(img).toBeInTheDocument()
    })
    
    // Remove photo
    const removeButton = screen.getByRole('button', { name: /remove/i })
    fireEvent.click(removeButton)
    
    await waitFor(() => {
      expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
      expect(screen.getByText('Upload a photo')).toBeInTheDocument()
    })
  })
}) 
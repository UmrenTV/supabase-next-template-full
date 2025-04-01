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
    
    const fullNameInput = screen.getByLabelText('Full Name')
    const emailInput = screen.getByLabelText('Email')
    const bioInput = screen.getByLabelText('Bio')
    const saveButton = screen.getByText('Save Changes')
    
    // Test empty name
    fireEvent.change(fullNameInput, { target: { value: '' } })
    fireEvent.click(saveButton)
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
    
    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(saveButton)
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
    
    // Test long bio
    fireEvent.change(bioInput, { target: { value: 'a'.repeat(201) } })
    fireEvent.click(saveButton)
    await waitFor(() => {
      expect(screen.getByText('Bio must be less than 200 characters')).toBeInTheDocument()
    })
    
    // Test valid form submission
    fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } })
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } })
    fireEvent.change(bioInput, { target: { value: 'Valid bio' } })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument()
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument()
      expect(screen.queryByText('Bio must be less than 200 characters')).not.toBeInTheDocument()
    })
  })

  it('validates security form fields', async () => {
    render(<SettingsPage />)
    
    const currentPasswordInput = screen.getByLabelText('Current Password')
    const newPasswordInput = screen.getByLabelText('New Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
    const updateButton = screen.getByText('Update Password')
    
    // Test short password
    fireEvent.change(newPasswordInput, { target: { value: 'short' } })
    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
    })
    
    // Test password mismatch
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } })
    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument()
    })
    
    // Test valid form submission
    fireEvent.change(currentPasswordInput, { target: { value: 'oldpass123' } })
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } })
    fireEvent.click(updateButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Password must be at least 8 characters')).not.toBeInTheDocument()
      expect(screen.queryByText("Passwords don't match")).not.toBeInTheDocument()
    })
  })

  it('handles notification settings toggles', async () => {
    render(<SettingsPage />)
    
    const emailNotificationsToggle = screen.getByLabelText('Email Notifications')
    const pushNotificationsToggle = screen.getByLabelText('Push Notifications')
    const smsNotificationsToggle = screen.getByLabelText('SMS Notifications')
    const marketingEmailsToggle = screen.getByLabelText('Marketing Emails')
    const saveButton = screen.getByText('Save Preferences')
    
    // Toggle notifications
    fireEvent.click(emailNotificationsToggle)
    fireEvent.click(pushNotificationsToggle)
    fireEvent.click(smsNotificationsToggle)
    fireEvent.click(marketingEmailsToggle)
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(emailNotificationsToggle).not.toBeChecked()
      expect(pushNotificationsToggle).not.toBeChecked()
      expect(smsNotificationsToggle).toBeChecked()
      expect(marketingEmailsToggle).not.toBeChecked()
    })
  })

  it('handles privacy settings changes', async () => {
    render(<SettingsPage />)
    
    const profileVisibilitySelect = screen.getByLabelText('Profile Visibility')
    const activityStatusSelect = screen.getByLabelText('Activity Status')
    const dataCollectionToggle = screen.getByLabelText('Data Collection')
    const thirdPartyAccessToggle = screen.getByLabelText('Third-Party Access')
    const saveButton = screen.getByText('Save Privacy Settings')
    
    // Change privacy settings
    fireEvent.change(profileVisibilitySelect, { target: { value: 'private' } })
    fireEvent.change(activityStatusSelect, { target: { value: 'away' } })
    fireEvent.click(dataCollectionToggle)
    fireEvent.click(thirdPartyAccessToggle)
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(profileVisibilitySelect).toHaveValue('private')
      expect(activityStatusSelect).toHaveValue('away')
      expect(dataCollectionToggle).not.toBeChecked()
      expect(thirdPartyAccessToggle).toBeChecked()
    })
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
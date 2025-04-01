import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SettingsPage from './page'

describe('SettingsPage', () => {
  it('renders all settings sections', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('General Settings')).toBeInTheDocument()
    expect(screen.getByText('Email Settings')).toBeInTheDocument()
    expect(screen.getByText('Security Settings')).toBeInTheDocument()
    expect(screen.getByText('Notification Settings')).toBeInTheDocument()
  })

  it('renders all form fields with correct initial values', () => {
    render(<SettingsPage />)
    
    // General Settings
    expect(screen.getByPlaceholderText('Enter site name')).toHaveValue('Admin Panel')
    expect(screen.getByPlaceholderText('Enter site description')).toHaveValue('A powerful admin panel for managing your application')
    expect(screen.getByPlaceholderText('Enter site URL')).toHaveValue('https://example.com')
    expect(screen.getByText('UTC')).toBeInTheDocument()

    // Email Settings
    expect(screen.getByPlaceholderText('Enter SMTP host')).toHaveValue('smtp.example.com')
    expect(screen.getByPlaceholderText('Enter SMTP port')).toHaveValue('587')
    expect(screen.getByPlaceholderText('Enter SMTP username')).toHaveValue('admin@example.com')
    expect(screen.getByPlaceholderText('Enter SMTP password')).toHaveValue('********')

    // Security Settings
    expect(screen.getByText('Enable Two-Factor Authentication')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter session timeout')).toHaveValue('30')
    expect(screen.getByPlaceholderText('Enter maximum login attempts')).toHaveValue('5')
    expect(screen.getByPlaceholderText('Enter password expiry period')).toHaveValue('90')

    // Notification Settings
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
    expect(screen.getByText('Push Notifications')).toBeInTheDocument()
    expect(screen.getByText('SMS Notifications')).toBeInTheDocument()
    expect(screen.getByText('realtime')).toBeInTheDocument()
  })

  it('updates form values when inputs change', () => {
    render(<SettingsPage />)
    
    const siteNameInput = screen.getByPlaceholderText('Enter site name')
    fireEvent.change(siteNameInput, { target: { value: 'New Site Name' } })
    expect(siteNameInput).toHaveValue('New Site Name')

    const smtpHostInput = screen.getByPlaceholderText('Enter SMTP host')
    fireEvent.change(smtpHostInput, { target: { value: 'new.smtp.example.com' } })
    expect(smtpHostInput).toHaveValue('new.smtp.example.com')

    const sessionTimeoutInput = screen.getByPlaceholderText('Enter session timeout')
    fireEvent.change(sessionTimeoutInput, { target: { value: '60' } })
    expect(sessionTimeoutInput).toHaveValue('60')
  })

  it('toggles boolean values correctly', () => {
    render(<SettingsPage />)
    
    const twoFactorToggle = screen.getByText('Enable Two-Factor Authentication').nextElementSibling
    const emailNotificationsToggle = screen.getByText('Email Notifications').nextElementSibling
    const pushNotificationsToggle = screen.getByText('Push Notifications').nextElementSibling
    const smsNotificationsToggle = screen.getByText('SMS Notifications').nextElementSibling

    fireEvent.click(twoFactorToggle!)
    fireEvent.click(emailNotificationsToggle!)
    fireEvent.click(pushNotificationsToggle!)
    fireEvent.click(smsNotificationsToggle!)

    expect(twoFactorToggle).toHaveAttribute('aria-checked', 'false')
    expect(emailNotificationsToggle).toHaveAttribute('aria-checked', 'false')
    expect(pushNotificationsToggle).toHaveAttribute('aria-checked', 'false')
    expect(smsNotificationsToggle).toHaveAttribute('aria-checked', 'true')
  })

  it('updates select values correctly', () => {
    render(<SettingsPage />)
    
    const timeZoneSelect = screen.getByText('UTC')
    const notificationFrequencySelect = screen.getByText('realtime')

    fireEvent.change(timeZoneSelect, { target: { value: 'EST' } })
    fireEvent.change(notificationFrequencySelect, { target: { value: 'daily' } })

    expect(timeZoneSelect).toHaveValue('EST')
    expect(notificationFrequencySelect).toHaveValue('daily')
  })

  it('submits form with updated values', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    render(<SettingsPage />)
    
    // Update some values
    fireEvent.change(screen.getByPlaceholderText('Enter site name'), { target: { value: 'New Site Name' } })
    fireEvent.change(screen.getByPlaceholderText('Enter SMTP host'), { target: { value: 'new.smtp.example.com' } })
    fireEvent.click(screen.getByText('Enable Two-Factor Authentication').nextElementSibling!)
    fireEvent.click(screen.getByText('Email Notifications').nextElementSibling!)

    // Submit form
    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Form data:', expect.objectContaining({
        'Site Name': 'New Site Name',
        'SMTP Host': 'new.smtp.example.com',
        'Enable Two-Factor Authentication': false,
        'Email Notifications': false,
      }))
    })

    consoleSpy.mockRestore()
  })
}) 
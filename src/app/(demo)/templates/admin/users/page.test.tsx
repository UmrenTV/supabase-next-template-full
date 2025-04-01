import { render, screen, fireEvent } from '@testing-library/react'
import UsersPage from './page'

describe('UsersPage', () => {
  it('renders users page title', () => {
    render(<UsersPage />)
    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<UsersPage />)
    expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument()
  })

  it('renders role and status filters', () => {
    render(<UsersPage />)
    
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('Editor')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('renders add user button', () => {
    render(<UsersPage />)
    expect(screen.getByText('Add User')).toBeInTheDocument()
  })

  it('renders users table with correct columns', () => {
    render(<UsersPage />)
    
    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Last Active')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders all users in the table', () => {
    render(<UsersPage />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
    expect(screen.getByText('Alice Brown')).toBeInTheDocument()
    expect(screen.getByText('Charlie Wilson')).toBeInTheDocument()
  })

  it('filters users by search query', () => {
    render(<UsersPage />)
    
    const searchInput = screen.getByPlaceholderText(/search users/i)
    fireEvent.change(searchInput, { target: { value: 'john' } })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('filters users by role', () => {
    render(<UsersPage />)
    
    const roleSelect = screen.getAllByRole('combobox')[0]
    fireEvent.change(roleSelect, { target: { value: 'Admin' } })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('filters users by status', () => {
    render(<UsersPage />)
    
    const statusSelect = screen.getAllByRole('combobox')[1]
    fireEvent.change(statusSelect, { target: { value: 'Inactive' } })
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('opens add user modal when clicking add user button', () => {
    render(<UsersPage />)
    
    const addButton = screen.getByText('Add User')
    fireEvent.click(addButton)
    
    expect(screen.getByText('Add New User')).toBeInTheDocument()
    expect(screen.getByText('Full Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('opens edit user modal when clicking edit button', () => {
    render(<UsersPage />)
    
    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    fireEvent.click(editButtons[0])
    
    expect(screen.getByText('Edit User')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Admin')).toBeInTheDocument()
  })

  it('shows confirmation dialog when clicking delete button', () => {
    const confirmSpy = jest.spyOn(window, 'confirm')
    render(<UsersPage />)
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])
    
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this user?')
  })

  it('closes modals when clicking cancel button', () => {
    render(<UsersPage />)
    
    // Open add user modal
    const addButton = screen.getByText('Add User')
    fireEvent.click(addButton)
    
    // Close add user modal
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.queryByText('Add New User')).not.toBeInTheDocument()
  })
}) 
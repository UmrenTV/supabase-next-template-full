'use client'

import { useState } from 'react'
import {
  Button,
  TextInput,
  Checkbox,
  DateTime,
  Textarea,
  Select,
  Radio,
  Switch,
  Search
} from '@/components/atoms'
import {
  FormGroup,
  InputGroup,
  Card
} from '@/components/molecules'
import {
  Header,
  LoginForm
} from '@/components/organisms'
import { BaseLayout } from '@/components/layouts/base-layout'

export default function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [radioValue, setRadioValue] = useState('')
  const [switchValue, setSwitchValue] = useState(false)

  const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true }
  ]

  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD'
  }

  return (
    <BaseLayout
      title="Components"
      headerContent={
        <Header 
          user={mockUser}
          showSearch
          showNotifications
        />
      }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Component Library Demo</h1>

        {/* Search Bar Demo */}
        <Card title="Search Bar">
          <div className="max-w-md mx-auto">
            <Search onSearch={(query) => console.log('Search:', query)} />
          </div>
        </Card>

        {/* Login Form Demo */}
        <Card title="Login Form" className="mt-8">
          <div className="max-w-md mx-auto">
            <LoginForm onSubmit={(data) => console.log('Login:', data)} />
          </div>
        </Card>

        {/* Button Demo */}
        <Card title="Buttons" className="mt-8">
          <div className="flex flex-wrap gap-4">
            <Button label="Primary" variant="primary" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Accent" variant="accent" />
            <Button label="Ghost" variant="ghost" />
            <Button label="Link" variant="link" />
            <Button label="Outline" variant="outline" />
          </div>
          
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Button Sizes</h3>
            <div className="flex items-center gap-4">
              <Button label="Extra Small" size="xs" />
              <Button label="Small" size="sm" />
              <Button label="Medium" size="md" />
              <Button label="Large" size="lg" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Button States</h3>
            <div className="flex items-center gap-4">
              <Button label="Loading" loading />
              <Button label="Disabled" disabled />
            </div>
          </div>
        </Card>

        {/* Form Controls Demo */}
        <Card title="Form Controls" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Inputs */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Text Inputs</h3>
              <TextInput
                label="Basic Input"
                placeholder="Enter text..."
                value={inputValue}
                onChange={setInputValue}
              />
              <TextInput
                label="With Error"
                placeholder="Enter email..."
                value=""
                onChange={() => {}}
                error="Please enter a valid email"
              />
              <TextInput
                placeholder="Search..."
                value=""
                onChange={() => {}}
              />
            </div>

            {/* Date & Time */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Date & Time</h3>
              <DateTime
                label="Date Input"
                type="date"
                value={dateValue}
                onChange={setDateValue}
              />
              <DateTime
                label="Time Input"
                type="time"
                value=""
                onChange={() => {}}
              />
            </div>

            {/* Textarea */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Textarea</h3>
              <Textarea
                label="Basic Textarea"
                placeholder="Enter description..."
                value={textareaValue}
                onChange={setTextareaValue}
              />
            </div>

            {/* Select */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Select</h3>
              <Select
                label="Basic Select"
                value={selectValue}
                onChange={setSelectValue}
                options={selectOptions}
              />
            </div>

            {/* Radio & Checkbox */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Radio & Checkbox</h3>
              <div className="space-y-2">
                <Radio
                  name="radio-group"
                  value="1"
                  checked={radioValue === '1'}
                  onChange={setRadioValue}
                  label="Option 1"
                />
                <Radio
                  name="radio-group"
                  value="2"
                  checked={radioValue === '2'}
                  onChange={setRadioValue}
                  label="Option 2"
                />
              </div>
              <div className="mt-4">
                <Checkbox
                  label="Basic Checkbox"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
              </div>
            </div>

            {/* Switch */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Switch</h3>
              <Switch
                label="Basic Switch"
                checked={switchValue}
                onChange={setSwitchValue}
              />
            </div>
          </div>
        </Card>

        {/* Form Groups Demo */}
        <Card title="Form Groups" className="mt-8">
          <div className="max-w-md mx-auto space-y-4">
            <FormGroup label="Basic Group" required>
              <TextInput value="" onChange={() => {}} />
            </FormGroup>
            <FormGroup label="With Error" error="This field is required">
              <TextInput value="" onChange={() => {}} />
            </FormGroup>
          </div>
        </Card>

        {/* Input Groups Demo */}
        <Card title="Input Groups" className="mt-8">
          <div className="max-w-md mx-auto space-y-4">
            <InputGroup>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input type="text" placeholder="Username" className="input input-bordered w-full" />
              </div>
            </InputGroup>
            <InputGroup>
              <div className="input-group">
                <input type="text" placeholder="Search..." className="input input-bordered w-full" />
                <button className="btn btn-primary">Search</button>
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>
    </BaseLayout>
  )
} 
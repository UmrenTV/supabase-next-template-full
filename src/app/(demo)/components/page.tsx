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
  Switch
} from '@/components/atoms'
import { FormGroup, InputGroup, InputGroupAddon, InputGroupInput } from '@/components/molecules'
import { LoginForm, SearchBar, Sidebar } from '@/components/organisms'

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

  const sidebarItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Templates', href: '/templates' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Component Library Demo</h1>
      
      {/* Sidebar Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
        <div className="h-64 border rounded-lg overflow-hidden">
          <Sidebar items={sidebarItems} />
        </div>
      </section>

      {/* Search Bar Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Search Bar</h2>
        <div className="max-w-md">
          <SearchBar onSearch={(query) => console.log('Search:', query)} />
        </div>
      </section>

      {/* Login Form Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Login Form</h2>
        <div className="max-w-md">
          <LoginForm onSubmit={(data) => console.log('Login:', data)} />
        </div>
      </section>

      {/* Button Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
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
      </section>

      {/* TextInput Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Text Inputs</h2>
        <div className="max-w-md space-y-4">
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
            label="Disabled Input"
            placeholder="Disabled..."
            value=""
            onChange={() => {}}
            disabled
          />
          <TextInput
            label="Read Only Input"
            placeholder="Read only..."
            value="Cannot edit this"
            onChange={() => {}}
            readOnly
          />
        </div>
      </section>

      {/* DateTime Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Date & Time Inputs</h2>
        <div className="max-w-md space-y-4">
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
          <DateTime
            label="DateTime Input"
            type="datetime-local"
            value=""
            onChange={() => {}}
            error="Please select a valid date and time"
          />
          <DateTime
            label="With Min/Max"
            type="date"
            value=""
            onChange={() => {}}
            min="2024-01-01"
            max="2024-12-31"
          />
        </div>
      </section>

      {/* Textarea Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Textareas</h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Basic Textarea"
            placeholder="Enter description..."
            value={textareaValue}
            onChange={setTextareaValue}
          />
          <Textarea
            label="With Error"
            placeholder="Enter content..."
            value=""
            onChange={() => {}}
            error="This field is required"
          />
          <Textarea
            label="Disabled Textarea"
            placeholder="Disabled..."
            value=""
            onChange={() => {}}
            disabled
          />
          <Textarea
            label="Read Only Textarea"
            placeholder="Read only..."
            value="Cannot edit this content"
            onChange={() => {}}
            readOnly
          />
          <Textarea
            label="Custom Size"
            placeholder="Custom rows and cols..."
            value=""
            onChange={() => {}}
            rows={5}
            cols={50}
          />
          <Textarea
            label="Resize Options"
            placeholder="Try resizing..."
            value=""
            onChange={() => {}}
            resize="vertical"
          />
        </div>
      </section>

      {/* Select Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Select</h2>
        <div className="max-w-md space-y-4">
          <Select
            label="Basic Select"
            value={selectValue}
            onChange={setSelectValue}
            options={selectOptions}
          />
          <Select
            label="With Error"
            value=""
            onChange={() => {}}
            options={selectOptions}
            error="Please select an option"
          />
          <Select
            label="Disabled Select"
            value=""
            onChange={() => {}}
            options={selectOptions}
            disabled
          />
        </div>
      </section>

      {/* Radio Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Radio Buttons</h2>
        <div className="space-y-4">
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
          <Radio
            name="radio-group"
            value="3"
            checked={radioValue === '3'}
            onChange={setRadioValue}
            label="Option 3"
            disabled
          />
        </div>
      </section>

      {/* Switch Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Switches</h2>
        <div className="space-y-4">
          <Switch
            label="Basic Switch"
            checked={switchValue}
            onChange={setSwitchValue}
          />
          <Switch
            label="Disabled Switch"
            checked={false}
            onChange={() => {}}
            disabled
          />
        </div>
      </section>

      {/* Checkbox Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Checkboxes</h2>
        <div className="space-y-4">
          <Checkbox
            label="Basic Checkbox"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <Checkbox
            label="With Error"
            checked={false}
            onChange={() => {}}
            error="Please accept the terms"
          />
          <Checkbox
            label="Disabled Checkbox"
            checked={false}
            onChange={() => {}}
            disabled
          />
        </div>
      </section>

      {/* FormGroup Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Form Groups</h2>
        <div className="max-w-md space-y-4">
          <FormGroup label="Basic Group" required>
            <TextInput value="" onChange={() => {}} />
          </FormGroup>
          <FormGroup label="With Error" error="This field is required">
            <TextInput value="" onChange={() => {}} />
          </FormGroup>
        </div>
      </section>

      {/* InputGroup Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Input Groups</h2>
        <div className="max-w-md space-y-4">
          <InputGroup>
            <InputGroupAddon>@</InputGroupAddon>
            <InputGroupInput>
              <TextInput value="" onChange={() => {}} placeholder="Username" />
            </InputGroupInput>
          </InputGroup>
          <InputGroup>
            <InputGroupInput>
              <TextInput value="" onChange={() => {}} placeholder="Search..." />
            </InputGroupInput>
            <InputGroupAddon>
              <Button label="Search" variant="primary" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </section>
    </div>
  )
} 
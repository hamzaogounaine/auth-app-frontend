import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ProfileTab = ({user}) => {
  return (
    <div className="space-y-6">
    <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="first-name" className="text-foreground">
          First Name
        </Label>
        <Input
          id="first-name"
          defaultValue="Alex"
          className="mt-1 bg-input border-border"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <Label htmlFor="last-name" className="text-foreground">
          Last Name
        </Label>
        <Input
          id="last-name"
          defaultValue="Johnson"
          className="mt-1 bg-input border-border"
          placeholder="Enter last name"
        />
      </div>
    </div>

    <div>
      <Label htmlFor="email" className="text-foreground">
        Email Address
      </Label>
      <Input
        id="email"
        type="email"
        defaultValue={user.email}
        className="mt-1 bg-input border-border"
        placeholder="Enter email"
      />
    </div>

    <div>
      <Label htmlFor="phone" className="text-foreground">
        Phone Number
      </Label>
      <Input
        id="phone"
        type="tel"
        defaultValue="+1 (555) 123-4567"
        className="mt-1 bg-input border-border"
        placeholder="Enter phone"
      />
    </div>

    <div>
      <Label htmlFor="bio" className="text-foreground">
        Bio
      </Label>
      <textarea
        id="bio"
        defaultValue="Product designer & developer"
        className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
        placeholder="Tell us about yourself"
      />
    </div>

    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
  </div>
  )
}

export default ProfileTab

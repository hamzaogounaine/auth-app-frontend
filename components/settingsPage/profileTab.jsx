import React, { use, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '@/lib/api'
import { toast } from 'sonner'

const ProfileTab = ({user}) => {
  const [firstName , setFirstName] = useState(user.first_name)
  const [lastName , setLastName] = useState(user.last_name)
  const [email , setEmail] = useState(user.email)
  const [phoneNumber , setPhoneNumber] = useState(user.phone_number)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await api.post('/update-profile' , {userId : user._id , firstName,lastName,email,phoneNumber})
      if(res.status === 200) {
        toast.success('profile updated')
      }
    }
     catch (err) {
      console.log(err)
     }
     finally {
      setLoading(false)
     }
  }

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
          defaultValue={firstName}
          className="mt-1 bg-input border-border"
          placeholder="Enter first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="last-name" className="text-foreground">
          Last Name
        </Label>
        <Input
          id="last-name"
          defaultValue={lastName}
          className="mt-1 bg-input border-border"
          placeholder="Enter last name"
          onChange={(e) => setLastName(e.target.value)}
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
        defaultValue={email}
        className="mt-1 bg-input border-border"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div>
      <Label htmlFor="phone" className="text-foreground">
        Phone Number
      </Label>
      <Input
        id="phone"
        type="string"
        defaultValue={phoneNumber}
        className="mt-1 bg-input border-border"
        placeholder="Enter phone"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>

    <div>
      <Label htmlFor="bio" className="text-foreground">
        Bio
      </Label>
      <textarea
        id="bio"
        defaultValue={user.bio || null}
        className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
        placeholder="Tell us about yourself"
      />
    </div>

    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading} onClick={handleSubmit}>Save Changes</Button>
  </div>
  )
}

export default ProfileTab

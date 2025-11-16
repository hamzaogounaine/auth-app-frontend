"use client";

import React, { use, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '@/lib/api'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl' // Import added

const ProfileTab = ({user}) => {
  const t = useTranslations('profileTab')
  const tNotif = useTranslations('notifications')
  
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
        // 💥 Translated Success Toast
        toast.success(tNotif('profileUpdated'))
      } else {
        // 💥 Added Error handling for non-200 responses
        toast.error(tNotif('profileUpdateFailure'))
      }
    }
     catch (err) {
      console.log(err)
      // 💥 Translated Error Toast (Crucial addition)
      toast.error(tNotif('profileUpdateFailure'))
     }
     finally {
      setLoading(false)
     }
  }

  return (
    <div className="space-y-6">
    {/* 💥 Translated Heading */}
    <h3 className="text-lg font-semibold text-foreground">{t('heading')}</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        {/* 💥 Translated Label 1 */}
        <Label htmlFor="first-name" className="text-foreground">
          {t('firstNameLabel')}
        </Label>
        <Input
          id="first-name"
          defaultValue={firstName}
          className="mt-1 bg-input border-border"
          // 💥 Translated Placeholder 1
          placeholder={t('firstNamePlaceholder')}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        {/* 💥 Translated Label 2 */}
        <Label htmlFor="last-name" className="text-foreground">
          {t('lastNameLabel')}
        </Label>
        <Input
          id="last-name"
          defaultValue={lastName}
          className="mt-1 bg-input border-border"
          // 💥 Translated Placeholder 2
          placeholder={t('lastNamePlaceholder')}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    </div>

    <div>
      {/* 💥 Translated Label 3 */}
      <Label htmlFor="email" className="text-foreground">
        {t('emailLabel')}
      </Label>
      <Input
        id="email"
        type="email"
        defaultValue={email}
        className="mt-1 bg-input border-border"
        // 💥 Translated Placeholder 3
        placeholder={t('emailPlaceholder')}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div>
      {/* 💥 Translated Label 4 */}
      <Label htmlFor="phone" className="text-foreground">
        {t('phoneLabel')}
      </Label>
      <Input
        id="phone"
        type="string"
        defaultValue={phoneNumber}
        className="mt-1 bg-input border-border"
        // 💥 Translated Placeholder 4
        placeholder={t('phonePlaceholder')}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>

    <div>
      {/* 💥 Translated Label 5 */}
      <Label htmlFor="bio" className="text-foreground">
        {t('bioLabel')}
      </Label>
      <textarea
        id="bio"
        defaultValue={user.bio || null}
        className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
        // 💥 Translated Placeholder 5
        placeholder={t('bioPlaceholder')}
      />
    </div>

    {/* 💥 Translated Button Text */}
    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading} onClick={handleSubmit}>{t('saveButton')}</Button>
  </div>
  )
}

export default ProfileTab
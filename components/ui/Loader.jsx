import { LoaderIcon } from 'lucide-react'
import React from 'react'

const LoaderComponent = () => {
  return (
    <div className='h-screen inset-0 z-50 bg-background flex w-screen items-center justify-center'>
      <LoaderIcon  className='animate-spin'/>
    </div>
  )
}

export default LoaderComponent

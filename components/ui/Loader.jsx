import { LoaderIcon } from 'lucide-react'
import React from 'react'

const LoaderComponent = () => {
  return (
    <div className='screen-h flex w-screen items-center justify-center'>
      <LoaderIcon  className='animate-spin'/>
    </div>
  )
}

export default LoaderComponent

import { Hash } from 'lucide-react'
import React from 'react'

export default function TopBar() {
  return (
    <div className="md:hidden absolute top-0 left-0 right-0 border-b py-2 flex items-center justify-center gap-2">
        <Hash strokeWidth="1.5px" className="text-primary" />
        {/* <h1 className="text-2xl font-bold bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {process.env.APP_NAME}
        </h1> */}
    </div>
  )
}

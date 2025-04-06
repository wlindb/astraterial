import React from 'react'
import { Button } from './ui/button'
import { Divider } from './divider'
import Link from 'next/link'
import { COMPANY_NAME } from '@/lib/constants'

export const GetStartedBanner = () => {
  return (
    <div className="container mx-auto w-3/5 md:w-1/3">
      <div className="flex flex-col items-center justify-center py-16">
        <h6 className="md:text-2xl font-bold text-center text-amber-600">GET STARTED</h6>
        <h2 className="text-3xl md:text-6xl font-bold text-center mt-4">Podcast Smarter. Stay in Flow</h2>
        <p className="text-slate-400 text-center mt-4">{COMPANY_NAME} allows you to regain valuable time so you can focus on what truly matters: creating exceptional content.</p>
        <div className="flex flex-col mt-8 align-center justify-center">
          <Link href="/signup" >
            <Button variant="default" size='lg'>Get started</Button>
          </Link>
        </div>
      </div>
      <Divider />
    </div>
  )
}


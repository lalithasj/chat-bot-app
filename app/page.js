'use client'
import Image from 'next/image'
import ChatInterface from './components/ChatInterface'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
     <ChatInterface />
    </main>
  )
}

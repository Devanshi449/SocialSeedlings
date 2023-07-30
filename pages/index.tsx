import Head from 'next/head'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import Headers from '@/Components/Headers'
// import HomePage from '@/Components/HomePage'
import Main from '@/Components/MainPage'
// import UserProfile from '@/Components/UserProfile'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div id="body">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Headers/>
      <Main/>
    </div>
  )
}

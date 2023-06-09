import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Profile.css'

export default function Profile() {
    const {currentUser} = useAuth()
  return (
    <span className='profile p-2'>
        {/* Below we call to the currentUser object to properly greet a logged in user. {currentUser.displayName.split(' ')[0]} */}
        Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' ')[0]}!
        <img src={currentUser.photoURL} alt='User Profile Pic' />
    </span>
  )
}

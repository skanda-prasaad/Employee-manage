import React from 'react'

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Welcome, {user.name || user.email}!</h1>
        <button 
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header

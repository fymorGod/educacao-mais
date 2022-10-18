import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { IoMdPerson, IoMdExit } from 'react-icons/io'
import { MdOutlineNotifications } from 'react-icons/md';
import { Sidebar } from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom'

function Home() {
    const { logout } = useContext(AuthContext);
    const handleSubmit = (e) => {
      e.preventDefault();
  
      logout();
    }
  
    return (
      <div className="flex w-full min-h-screen font-sans bg-dark-theme">
        <Sidebar />
        <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6">
          <div className="w-full h-16 bg-dark-purple relative">
            <div className="absolute right-5 pt-5 text-white">
              <ul className="flex">
                <li className="pr-2">
                  <IoMdPerson />
                </li>
                <li className="pr-2">
                  <MdOutlineNotifications />
                </li>
                <li className="pr-2">
                  <IoMdExit onClick={handleSubmit} className="cursor-pointer" alt="sair"/>
                </li>
              </ul>
            </div>
          </div>
        </main>

      </div>
    )
  }
  
  export { Home }
  
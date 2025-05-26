// src/views/auth/login/Login.tsx
import React from 'react'
import AuthLogin from '../authforms/AuthLogin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from "src/assets/images/logos/logo-white.svg";
import bgImage from "src/assets/images/backgrounds/login-phone-background.jpg"

const gradientStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #0803f5 0%, #e25108 50%, #2d3674 100%)',
}

export default function Login() {
    return (
        <div className="flex h-screen">

            <div
                className="w-full md:w-1/2 h-full flex justify-center items-center p-6"
                style={gradientStyle}
            >
                <div className="relative bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                    <ToastContainer position="top-right" />

                    <div className="flex flex-col items-center">
                        <img
                            src={Logo}
                            alt="CellCom Logo"
                            className="block w-64 h-auto"
                        />
                        <h2 className="mt-4 text-2xl font-bold text-white">
                            Acessar Painel
                        </h2>
                    </div>

                    <AuthLogin />
                </div>
            </div>

            <div
                className="hidden md:block md:w-1/2 bg-cover bg-black bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            />
        </div>
    )
}

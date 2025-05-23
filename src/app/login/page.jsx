
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to login with Google');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Lectura
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            {/* Dashboard */}
            <Link href="/dashboard" className="group flex flex-col items-center justify-center relative">
              <span className="flex items-center space-x-2 font-medium text-white transition-colors duration-300 group-hover:text-blue-400">
                <svg className="w-6 h-6 text-blue-400 group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-blue-500 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="2" y="2" width="6" height="6" rx="2"/>
                  <rect x="12" y="2" width="6" height="6" rx="2"/>
                  <rect x="12" y="12" width="6" height="6" rx="2"/>
                  <rect x="2" y="12" width="6" height="6" rx="2"/>
                </svg>
                <span>Dashboard</span>
              </span>
              <span className="block h-[3px] w-0 group-hover:w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 mt-1"></span>
            </Link>
            {/* Upload Notes */}
            <Link href="/upload" className="group flex flex-col items-center justify-center relative">
              <span className="flex items-center space-x-2 font-medium text-white transition-colors duration-300 group-hover:text-yellow-400">
                <svg className="w-6 h-6 text-yellow-400 group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-yellow-500 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeLinecap="round"/>
                </svg>
                <span>Upload Notes</span>
              </span>
              <span className="block h-[3px] w-0 group-hover:w-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-300 mt-1"></span>
            </Link>
            {/* Generate Notes */}
            <Link href="/generate" className="group flex flex-col items-center justify-center relative">
              <span className="flex items-center space-x-2 font-medium text-white transition-colors duration-300 group-hover:text-green-400">
                <svg className="w-6 h-6 text-green-400 group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-green-500 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Generate Notes</span>
              </span>
              <span className="block h-[3px] w-0 group-hover:w-8 bg-gradient-to-r from-green-400 to-green-300 rounded-full transition-all duration-300 mt-1"></span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login" className="text-white hover:text-blue-400 transition">Login</Link>
            <Link
              href="/signup"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-screen pt-24 items-center justify-center">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-[#18181b] rounded-lg shadow-xl overflow-hidden border border-[#222]">
          {/* Left: Form */}
          <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 mb-8">
              Log in to access your personalized study materials and tools.
            </p>

            {/* Google Login Button with Gradient Border */}
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center py-3 bg-[#18181b] rounded-full text-white hover:bg-[#18181b]/90 transition"
              >
                <span className="mr-3">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <g>
                      <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.78h5.5c-.24 1.3-.97 2.4-2.07 3.13v2.6h3.34c1.95-1.8 3.08-4.46 3.08-7.51z"/>
                      <path fill="#34A853" d="M10 20c2.7 0 4.96-.9 6.62-2.43l-3.34-2.6c-.93.62-2.12.99-3.28.99-2.52 0-4.66-1.7-5.42-3.99H1.1v2.5C2.76 17.98 6.13 20 10 20z"/>
                      <path fill="#FBBC05" d="M4.58 11.97A5.98 5.98 0 014 10c0-.68.12-1.33.32-1.97V5.53H1.1A9.98 9.98 0 000 10c0 1.57.38 3.05 1.1 4.47l3.48-2.5z"/>
                      <path fill="#EA4335" d="M10 4.02c1.47 0 2.8.5 3.85 1.5l2.89-2.89C15.95 1.14 13.6 0 10 0 6.13 0 2.76 2.02 1.1 5.53l3.48 2.5C5.34 6.7 7.48 4.02 10 4.02z"/>
                    </g>
                  </svg>
                </span>
                Continue with Google
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <hr className="w-1/3 border-[#333]" />
              <span className="text-gray-400 px-3">OR</span>
              <hr className="w-1/3 border-[#333]" />
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-5">
              {/* Email Input with Gradient Border */}
              <div className="relative rounded-md p-[2px] bg-gradient-to-r from-blue-500 to-purple-500">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 bg-[#18181b] text-white rounded-md focus:outline-none placeholder-gray-400 border-none"
                  required
                />
              </div>

              {/* Password Input with Gradient Border */}
              <div className="relative rounded-md p-[2px] bg-gradient-to-r from-blue-500 to-purple-500">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-4 bg-[#18181b] text-white rounded-md focus:outline-none placeholder-gray-400 border-none"
                  required
                />
                <div className="flex items-center mt-2 px-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="accent-blue-400 mr-2"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="text-sm text-[#b3b3b3]">
                    Show password
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 text-blue-400 bg-blue-400/10 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Gradient Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors"
              >
                Log In
              </button>
            </form>

            <p className="mt-6 text-sm text-[#b3b3b3]">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-blue-400 underline hover:text-purple-400 transition">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Right: Vibrant Geometric Illustration */}
          <div className="hidden md:flex md:w-2/5 items-center justify-center bg-[#18181b]">
            <img
              src="/vibrant-geo.svg"
              alt="Vibrant Geometric Illustration"
              className="w-full h-[480px] object-contain"
              style={{ maxWidth: '520px', maxHeight: '520px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

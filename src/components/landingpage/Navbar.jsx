'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LogOut, LogIn, User, Menu, X } from 'lucide-react';
import VideoUploadModal from '../VideoUploadModal';
import NoteUploadModal from '../NoteUploadModal';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGenerateNotesClick = async () => {
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 200));
    requestAnimationFrame(() => {
      setIsVideoModalOpen(true);
    });
  };

  const handleUploadNotesClick = async () => {
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 200));
    requestAnimationFrame(() => {
      setIsNoteModalOpen(true);
    });
  };

  const isActive = (route) => pathname === route;

  const underlineClass =
    'relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:rounded-full';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-black/60 backdrop-blur-md shadow-lg border-b border-zinc-800/40'
          : 'bg-black/30 backdrop-blur'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className="w-8 h-8 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-full
      transition-transform duration-500 ease-in-out
      group-hover:scale-125 group-hover:rotate-12
      group-hover:shadow-[0_0_10px_3px_rgba(128,90,213,0.8)]"
            ></div>
            <span
              className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400
      text-transparent bg-clip-text tracking-tight
      transition-all duration-500 ease-in-out
      group-hover:scale-105
      group-hover:text-white
      group-hover:drop-shadow-[0_0_8px_rgba(128,90,213,0.8)]"
            >
              Lectura
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="group flex flex-col items-center justify-center relative"
            >
              <span className="flex items-center space-x-2 font-medium text-white transition-colors duration-300 group-hover:text-blue-400">
                <svg
                  className="w-6 h-6 text-blue-400 group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-blue-500 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <rect x="2" y="2" width="6" height="6" rx="2" />
                  <rect x="12" y="2" width="6" height="6" rx="2" />
                  <rect x="12" y="12" width="6" height="6" rx="2" />
                  <rect x="2" y="12" width="6" height="6" rx="2" />
                </svg>
                <span>Dashboard</span>
              </span>
              <span className="block h-[3px] w-0 group-hover:w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 mt-1"></span>
            </Link>
            {/* Upload Notes */}
            <Link
              href="/upload"
              className="group flex flex-col items-center justify-center relative"
              onClick={handleUploadNotesClick}
            >
              <span className="flex items-center space-x-2 font-medium text-white transition-colors duration-300 group-hover:text-yellow-400">
                <svg
                  className="w-6 h-6 text-yellow-400 group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-yellow-500 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeLinecap="round" />
                </svg>
                <span>Upload Notes</span>
              </span>
              <span className="block h-[3px] w-0 group-hover:w-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-300 mt-1"></span>
            </Link>
            {/* Generate Notes */}
            <Link
              href="/generate"
              className="group flex flex-col items-center justify-center relative"
              onClick={handleGenerateNotesClick}
            >
              <span className="flex items-center space-x-2 font-medium text-white transition-colors duration-300 group-hover:text-green-400">
                <svg
                  className="w-6 h-6 text-green-400 group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-green-500 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Generate Notes</span>
              </span>
              <span className="block h-[3px] w-0 group-hover:w-8 bg-gradient-to-r from-green-400 to-green-300 rounded-full transition-all duration-300 mt-1"></span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-all duration-300"
                >
                  <LogIn className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-zinc-500 transition-all duration-300"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <NoteUploadModal isOpen={isNoteModalOpen} onClose={() => setIsNoteModalOpen(false)} />
      <VideoUploadModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </nav>
  );
}

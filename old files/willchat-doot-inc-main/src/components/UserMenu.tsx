import React, { useState, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { auth } from '../services/firebase';
import { signOut, User as FirebaseUser } from 'firebase/auth';

interface UserMenuProps {
  user: FirebaseUser | null;
  onOpenProfile: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onOpenProfile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setIsVisible(true);
      setTimeout(() => setIsExpanded(true), 10);
    } else {
      setIsExpanded(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    onOpenProfile();
    setDropdownOpen(false);
  };

  if (!user) {
    return null; 
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <User className="w-4 h-4" />
        )}
        <span>{user.displayName || user.email}</span>
      </button>

      {isVisible && (
        <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 transition-all duration-300 ease-out ${
          isExpanded
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
        }`} style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          <button
            onClick={handleProfileClick}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-lg"
          >
            <Settings className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-b-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

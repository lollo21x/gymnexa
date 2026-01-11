import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Upload, Save, User } from 'lucide-react';
import { auth, storage } from '../services/firebase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfileModalProps {
  onClose: () => void;
  onProfileUpdate: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onProfileUpdate }) => {
  const user = auth.currentUser;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.photoURL || null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Split display name into first and last name
  const [firstName, setFirstName] = useState(() => {
    const name = user?.displayName || '';
    const parts = name.split(' ');
    return parts[0] || '';
  });
  const [lastName, setLastName] = useState(() => {
    const name = user?.displayName || '';
    const parts = name.split(' ');
    return parts.slice(1).join(' ') || '';
  });

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // Match animation duration
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        setSelectedFile(null);
        setPreviewUrl(user?.photoURL || null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for actual upload
        setError('File size exceeds 2MB limit. Please choose a smaller image.');
        setSelectedFile(null);
        setPreviewUrl(user?.photoURL || null);
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) {
      setError('No user logged in.');
      return;
    }

    // Check if there are any changes to save
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const hasNameChanged = fullName !== (user.displayName || '');
    const hasPhotoChanged = selectedFile !== null;

    if (!hasNameChanged && !hasPhotoChanged) {
      setError('No changes to save.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updateData: { displayName?: string; photoURL?: string } = {};

      // Update name if changed
      if (hasNameChanged) {
        updateData.displayName = fullName;
      }

      // Update photo if selected
      if (hasPhotoChanged && selectedFile) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}/${selectedFile.name}`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const photoURL = await getDownloadURL(snapshot.ref);
        updateData.photoURL = photoURL;
      }

      await updateProfile(user, updateData);
      await onProfileUpdate();
      setLoading(false);
      handleClose();
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(`Failed to save profile: ${err.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-md z-[99999] flex items-center justify-center p-4 transition-opacity duration-200 ease-out ${
      isClosing
        ? 'opacity-0'
        : isVisible
          ? 'opacity-100'
          : 'opacity-0'
    }`} style={{ WebkitBackdropFilter: 'blur(12px)' }}>
      <div className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col my-auto p-6 transition-all duration-200 ease-out ${
        isClosing
          ? 'opacity-0 scale-95'
          : isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5" /> Profile
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF8C00] flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-gray-500" />
            )}
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.displayName || user?.email}</p>

          {/* Name Fields */}
          <div className="w-full space-y-3 mt-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <label htmlFor="profile-upload" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
            <Upload className="w-4 h-4" />
            Upload Photo
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 mt-6 bg-[#FF8C00] hover:bg-[#FF6B00] backdrop-blur-md text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Profile'}
          <Save className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

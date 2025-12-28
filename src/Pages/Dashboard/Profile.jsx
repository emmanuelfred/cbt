import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { FaCamera, FaUser, FaEnvelope, FaLock, FaSave, FaTimes } from 'react-icons/fa';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../Store/authStore';

const Profile = () => {
  const { user, updateprofile, updateEmail, updatePassword, isLoading } = useAuthStore();
  
  // Profile Update State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    academicLevel: user?.academicLevel || 'Beginner',
    interests: user?.interests || [],
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(user?.profilePic || '');

  // Email Update State
  const [newEmail, setNewEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Password Update State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Interest Options
  const interestOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'History', 'Geography', 'Economics',
    'Computer Science', 'Literature', 'Art', 'Music'
  ];

  // Handle Profile Picture Change
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  // Handle Interest Toggle
  const toggleInterest = (interest) => {
    if (profileData.interests.includes(interest)) {
      setProfileData({
        ...profileData,
        interests: profileData.interests.filter((i) => i !== interest),
      });
    } else {
      if (profileData.interests.length < 5) {
        setProfileData({
          ...profileData,
          interests: [...profileData.interests, interest],
        });
      } else {
        toast.error('You can select maximum 5 interests');
      }
    }
  };

  // Check Password Strength
  const checkPasswordStrength = (value) => {
    let strength = '';
    const regexWeak = /[a-z]/;
    const regexMedium = /(?=.*[A-Z])(?=.*[a-z])/;
    const regexStrong = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (value.length === 0) strength = '';
    else if (value.length < 6) strength = 'Too Short';
    else if (regexStrong.test(value)) strength = 'Strong';
    else if (regexMedium.test(value)) strength = 'Medium';
    else if (regexWeak.test(value)) strength = 'Weak';

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Strong':
        return 'bg-green-600';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Weak':
      case 'Too Short':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Handle Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('id', user._id);
      formData.append('name', profileData.name);
      formData.append('academicLevel', profileData.academicLevel);
      formData.append('interests', JSON.stringify(profileData.interests));
      
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      await updateprofile(formData);
      toast.success('Profile updated successfully!');
      setProfilePic(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  // Handle Email Update
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    
    if (newEmail === user.email) {
      toast.error('New email cannot be the same as current email');
      return;
    }

    try {
      await updateEmail({ userId: user._id, newEmail });
      toast.success('Email updated! Please verify your new email.');
      setShowEmailModal(false);
      setNewEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update email');
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordStrength === 'Weak' || passwordStrength === 'Too Short') {
      toast.error('Please use a stronger password');
      return;
    }

    try {
      await updatePassword({
        userId: user._id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password updated successfully!');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordStrength('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={previewPic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#0C6F89]"
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-0 right-0 bg-[#0C6F89] text-white p-2 rounded-full cursor-pointer hover:bg-[#0a5d73] transition"
            >
              <FaCamera />
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="hidden"
              />
            </label>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Academic Level: <span className="font-semibold">{user?.academicLevel}</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              {user?.interests?.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-[#0C6F89] text-white text-xs px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaUser className="text-[#0C6F89]" />
          Edit Profile Information
        </h3>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
              required
            />
          </div>

          {/* Academic Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Academic Level
            </label>
            <select
              value={profileData.academicLevel}
              onChange={(e) => setProfileData({ ...profileData, academicLevel: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interests (Select up to 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    profileData.interests.includes(interest)
                      ? 'bg-[#0C6F89] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {profileData.interests.length}/5
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0C6F89] text-white py-3 rounded-lg font-semibold hover:bg-[#0a5d73] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaSave />
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Account Security Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaLock className="text-[#0C6F89]" />
          Account Security
        </h3>

        <div className="space-y-4">
          {/* Update Email */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Email Address</h4>
              <p className="text-sm text-gray-600">{user?.email}</p>
              {!user?.isVerified && (
                <span className="text-xs text-red-500">Not Verified</span>
              )}
            </div>
            <button
              onClick={() => setShowEmailModal(true)}
              className="bg-[#0C6F89] text-white px-4 py-2 rounded-lg hover:bg-[#0a5d73] transition"
            >
              <FaEnvelope className="inline mr-2" />
              Update Email
            </button>
          </div>

          {/* Update Password */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Password</h4>
              <p className="text-sm text-gray-600">••••••••</p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-[#0C6F89] text-white px-4 py-2 rounded-lg hover:bg-[#0a5d73] transition"
            >
              <FaLock className="inline mr-2" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Email Update Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"style={{background:'#0000002c',}}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Update Email</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Current Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
                  required
                />
              </div>

              <p className="text-xs text-gray-600">
                You will need to verify your new email address
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0C6F89] text-white py-3 rounded-lg font-semibold hover:bg-[#0a5d73] transition disabled:bg-gray-400"
              >
                {isLoading ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4" style={{background:'#0000006e',}}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => {
                      setPasswordData({ ...passwordData, newPassword: e.target.value });
                      checkPasswordStrength(e.target.value);
                    }}
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className={`h-2 rounded-full ${getStrengthColor()}`}></div>
                    <p className="text-sm mt-1 text-gray-600">
                      Strength: {passwordStrength}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  isLoading ||
                  passwordStrength === 'Weak' ||
                  passwordStrength === 'Too Short'
                }
                className="w-full bg-[#0C6F89] text-white py-3 rounded-lg font-semibold hover:bg-[#0a5d73] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
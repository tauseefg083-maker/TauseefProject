import React, { useState } from 'react';
import { User } from '../../types';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChangePasswordModal from '../../components/ChangePasswordModal';

interface ProfilePageProps {
  user: User;
  onUpdate: (updatedData: Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChangePassword = (data: { oldPass: string; newPass: string }) => {
    console.log('Password change submitted:', data);
    // In a real app, you would make an API call here.
    setIsChangePasswordModalOpen(false);
    setIsPasswordSuccess(true);
    setTimeout(() => setIsPasswordSuccess(false), 3000);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Edit Profile</h1>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Input
                  label="First Name"
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Last Name"
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Input
              label="Email Address"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div className="flex items-center justify-end gap-4 pt-4">
              {isSuccess && <p className="text-green-400 text-sm">Profile updated successfully!</p>}
              {isPasswordSuccess && <p className="text-green-400 text-sm">Password updated successfully!</p>}
              <Button type="button" variant="secondary" onClick={() => setIsChangePasswordModalOpen(true)}>Change Password</Button>
              <Button type="submit" variant="success">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
      <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen} 
        onClose={() => setIsChangePasswordModalOpen(false)} 
        onSubmit={handleChangePassword}
      />
    </>
  );
};

export default ProfilePage;

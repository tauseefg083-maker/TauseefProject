import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

interface SignupPageProps {
  onSignup: () => void;
  onNavigate: (page: 'login' | 'landing') => void;
  referralCode?: string | null;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigate, referralCode }) => {
  const [referralValue, setReferralValue] = useState('');

  useEffect(() => {
    if (referralCode) {
      setReferralValue(referralCode);
    }
  }, [referralCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form data
    onSignup();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Your <span className="text-brand-orange">Account</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <Input label="First Name" id="firstName" type="text" required />
            <Input label="Last Name" id="lastName" type="text" required />
          </div>
          <Input label="Email" id="email" type="email" required />
          <Input label="Phone" id="phone" type="tel" required />
          <Input label="Password" id="password" type="password" required />
          <div>
            <Input
              label="Referral Code (Optional)"
              id="referralCode"
              type="text"
              value={referralValue}
              onChange={(e) => setReferralValue(e.target.value)}
              readOnly={!!referralCode}
              className={!!referralCode ? 'bg-gray-800/60 cursor-not-allowed' : ''}
            />
            {referralCode && (
                <p className="mt-2 text-sm text-green-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Referral code <strong className="font-semibold mx-1 text-green-300 truncate">{referralCode}</strong> applied.
                </p>
            )}
          </div>
          <Button type="submit" variant="success" className="w-full !mt-6">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="font-semibold text-brand-orange hover:underline">
            Log In
          </button>
        </p>
      </Card>
    </div>
  );
};

export default SignupPage;
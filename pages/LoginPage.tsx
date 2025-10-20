import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

interface LoginPageProps {
  onLogin: (role: 'user' | 'admin') => void;
  onNavigate: (page: 'signup' | 'landing' | 'forgot-password') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.startsWith('admin')) {
      onLogin('admin');
    } else {
      onLogin('user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Log In to <span className="text-brand-orange">FIN2X</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Email" 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="user@example.com"
          />
          <div>
            <Input 
              label="Password" 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="••••••••"
            />
             <div className="text-right mt-2">
                <button 
                    onClick={() => onNavigate('forgot-password')} 
                    type="button"
                    className="text-sm font-semibold text-brand-orange hover:underline focus:outline-none"
                >
                    Forgot Password?
                </button>
            </div>
          </div>
          <Button type="submit" variant="success" className="w-full !mt-8">
            Log In
          </Button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('signup')} className="font-semibold text-brand-orange hover:underline">
            Sign Up
          </button>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { User, UserRole, DepositRequest, RequestStatus, ProfitHistoryItem, ReferredUser, CommissionHistoryItem, Notification, WithdrawalRequest } from './types';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserApp from './pages/user/UserApp';
import AdminApp from './pages/admin/AdminApp';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const MOCK_PROFIT_HISTORY_1: ProfitHistoryItem[] = [
    { date: '2023-10-28', amount: 15.50, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-27', amount: 50.00, type: 'Referral Bonus', description: 'From user jane.smith' },
    { date: '2023-10-27', amount: 15.50, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-26', amount: 100.00, type: 'Rank Bonus', description: 'Achieved Silver Rank' },
    { date: '2023-10-26', amount: 15.50, type: 'Daily Profit', description: 'Daily investment return' },
];

const MOCK_PROFIT_HISTORY_2: ProfitHistoryItem[] = [
    { date: '2023-10-28', amount: 30.00, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-28', amount: 75.00, type: 'Referral Bonus', description: 'From user peter.j' },
    { date: '2023-10-27', amount: 30.00, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-25', amount: 30.00, type: 'Daily Profit', description: 'Daily investment return' },
];

const MOCK_PROFIT_HISTORY_3: ProfitHistoryItem[] = [
    { date: '2023-10-28', amount: 5.00, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-26', amount: 15.00, type: 'Referral Bonus', description: 'From new user' },
    { date: '2023-10-25', amount: 5.00, type: 'Daily Profit', description: 'Daily investment return' },
];

const MOCK_PROFIT_HISTORY_4: ProfitHistoryItem[] = [
    { date: '2023-10-28', amount: 70.00, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-28', amount: 250.00, type: 'Rank Bonus', description: 'Achieved Gold Rank' },
    { date: '2023-10-27', amount: 70.00, type: 'Daily Profit', description: 'Daily investment return' },
    { date: '2023-10-27', amount: 120.00, type: 'Referral Bonus', description: 'From 3 new members' },
];


const MOCK_REFERRED_USERS_1: ReferredUser[] = [
    { id: 'user-2', name: 'Jane Smith', joinDate: '2023-10-25', status: 'Active', investment: 10000 },
    { id: 'user-3', name: 'Peter Jones', joinDate: '2023-10-22', status: 'Active', investment: 1500 },
    { id: 'user-5', name: 'Mike Tyson', joinDate: '2023-10-28', status: 'Pending', investment: 0 },
];
const MOCK_COMMISSION_HISTORY_1: CommissionHistoryItem[] = [
    { date: '2023-10-27', fromUser: 'Jane Smith', level: 1, amount: 50.00 },
    { date: '2023-10-26', fromUser: 'A. Friend (L2)', level: 2, amount: 12.50 },
    { date: '2023-10-25', fromUser: 'B. Friend (L2)', level: 2, amount: 15.00 },
    { date: '2023-10-24', fromUser: 'Peter Jones', level: 1, amount: 7.50 },
    { date: '2023-10-23', fromUser: 'C. Indirect (L3)', level: 3, amount: 8.00 },
    { date: '2023-10-22', fromUser: 'D. Indirect (L4)', level: 4, amount: 5.50 },
    { date: '2023-10-21', fromUser: 'E. Indirect (L5)', level: 5, amount: 2.75 },
];

const MOCK_REFERRED_USERS_2: ReferredUser[] = [
    { id: 'user-4', name: 'Susan Boyle', joinDate: '2023-10-20', status: 'Active', investment: 30000 },
];
const MOCK_COMMISSION_HISTORY_2: CommissionHistoryItem[] = [
    { date: '2023-10-21', fromUser: 'Susan Boyle', level: 1, amount: 120.00 },
];


// Mock Data
const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    role: UserRole.USER,
    referralCode: 'johndoe123',
    walletBalance: 1250.75,
    totalInvested: 5000,
    teamSize: 137,
    teamInvested: 41500,
    totalWithdrawal: 1500,
    mxgnTokens: 10000,
    dailyProfit: 15.50,
    totalProfit: 1850.25,
    profitHistory: MOCK_PROFIT_HISTORY_1,
    referredUsers: MOCK_REFERRED_USERS_1,
    commissionHistory: MOCK_COMMISSION_HISTORY_1,
    joinDate: '2023-10-01',
  },
  {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '123-555-7891',
    role: UserRole.USER,
    referralCode: 'janesmith456',
    walletBalance: 3450.00,
    totalInvested: 10000,
    teamSize: 250,
    teamInvested: 80000,
    totalWithdrawal: 4000,
    mxgnTokens: 20000,
    dailyProfit: 30.00,
    totalProfit: 3200.00,
    profitHistory: MOCK_PROFIT_HISTORY_2,
    referredUsers: MOCK_REFERRED_USERS_2,
    commissionHistory: MOCK_COMMISSION_HISTORY_2,
    joinDate: '2023-09-15',
  },
  { id: 'user-3', firstName: 'Peter', lastName: 'Jones', email: 'peter.j@example.com', phone: '234-567-8901', role: UserRole.USER, referralCode: 'peterj789', walletBalance: 800.50, totalInvested: 1500, teamSize: 50, teamInvested: 12000, totalWithdrawal: 200, mxgnTokens: 3000, dailyProfit: 5.00, totalProfit: 250.75, profitHistory: MOCK_PROFIT_HISTORY_3, referredUsers: [], commissionHistory: [], joinDate: '2023-10-10' },
  { id: 'user-4', firstName: 'Susan', lastName: 'Boyle', email: 'susan.b@example.com', phone: '345-678-9012', role: UserRole.USER, referralCode: 'susanb101', walletBalance: 0, totalInvested: 30000, teamSize: 500, teamInvested: 250000, totalWithdrawal: 10000, mxgnTokens: 60000, dailyProfit: 70.00, totalProfit: 8500.00, profitHistory: MOCK_PROFIT_HISTORY_4, referredUsers: [], commissionHistory: [], joinDate: '2023-09-20' },
];


const MOCK_ADMIN: User = {
  id: 'admin-1',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  phone: '987-654-3210',
  role: UserRole.ADMIN,
  referralCode: 'admin',
  walletBalance: 0,
  totalInvested: 0,
  teamSize: 0,
  teamInvested: 0,
  totalWithdrawal: 0,
  mxgnTokens: 0,
  dailyProfit: 0,
  totalProfit: 0,
  profitHistory: [],
  referredUsers: [],
  commissionHistory: [],
  joinDate: '2023-01-01',
};

const initialRequests: DepositRequest[] = [
    { id: 'req-1', userId: 'user-2', userEmail: 'jane.smith@example.com', amount: 500, transactionId: '0x123abc...', status: RequestStatus.PENDING, screenshot: 'https://placehold.co/600x400/1a1a1a/f0f0f0/png?text=Screenshot+1', date: '2023-10-27' },
    { id: 'req-2', userId: 'user-3', userEmail: 'peter.j@example.com', amount: 1000, transactionId: '0x456def...', status: RequestStatus.APPROVED, screenshot: 'https://placehold.co/600x400/1a1a1a/f0f0f0/png?text=Screenshot+2', date: '2023-10-26' },
    { id: 'req-3', userId: 'user-4', userEmail: 'susan.b@example.com', amount: 250, transactionId: '0x789ghi...', status: RequestStatus.DECLINED, screenshot: 'https://placehold.co/600x400/1a1a1a/f0f0f0/png?text=Screenshot+3', date: '2023-10-26' },
    { id: 'req-4', userId: 'user-1', userEmail: 'john.doe@example.com', amount: 2000, transactionId: '0x012jkl...', status: RequestStatus.PENDING, screenshot: 'https://placehold.co/600x400/1a1a1a/f0f0f0/png?text=Screenshot+4', date: '2023-10-28' },
];

const MOCK_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
    { id: 'w-req-1', userId: 'user-1', userEmail: 'john.doe@example.com', amount: 200, walletName: 'Binance', walletAddress: '0xAbC123DeF456GhI789JkL012MnOpQ345RsT678Uv', network: 'BEP20', status: RequestStatus.PENDING, date: '2023-10-28' },
    { id: 'w-req-2', userId: 'user-2', userEmail: 'jane.smith@example.com', amount: 1000, walletName: 'Trust Wallet', walletAddress: '0x123AbcDef456GhI789jKl012mNoPqR345sT678uV', network: 'ERC20', status: RequestStatus.APPROVED, date: '2023-10-27' },
    { id: 'w-req-3', userId: 'user-4', userEmail: 'susan.b@example.com', amount: 500, walletName: 'Metamask', walletAddress: '0x789gHiJkL012mNoPqR345sT678uV123AbcDef456', network: 'BEP20', status: RequestStatus.DECLINED, date: '2023-10-26' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'System Maintenance Scheduled',
    content: 'We will be undergoing scheduled maintenance on Sunday at 2 AM UTC. The platform may be temporarily unavailable.',
    date: '2023-10-25',
  },
  {
    id: 'notif-2',
    title: 'New Rank Rewards Added!',
    content: 'Check out the Ranks & Rewards page for exciting new bonuses for our top performers. Keep growing your network!',
    date: '2023-10-22',
  },
];


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'otp-verification' | 'forgot-password' | 'reset-password'>('landing');
  const [otpPurpose, setOtpPurpose] = useState<'signup' | 'reset-password'>('signup');
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>(initialRequests);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(MOCK_WITHDRAWAL_REQUESTS);
  const [referralCodeFromUrl, setReferralCodeFromUrl] = useState<string | null>(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 'ref' && pathParts[2]) {
      const code = decodeURIComponent(pathParts[2]);
      setReferralCodeFromUrl(code);
      // Automatically navigate to signup if a referral code is present and we're on the landing page.
      setCurrentPage(prev => (prev === 'landing' ? 'signup' : prev));
    }
  }, []); // Run only once on mount to capture the URL.

  const userNotifications = useMemo(() => {
    if (currentUser && currentUser.role === UserRole.USER) {
      return notifications.filter(n => !n.userId || n.userId === currentUser.id);
    }
    return [];
  }, [notifications, currentUser]);
  
  const handleLogin = (role: 'user' | 'admin') => {
    setCurrentUser(role === 'admin' ? MOCK_ADMIN : users[0]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };
  
  const handleSignup = () => {
    setOtpPurpose('signup');
    setCurrentPage('otp-verification');
  };

  const handleSendOtp = () => {
    setOtpPurpose('reset-password');
    setCurrentPage('otp-verification');
  };

  const handleOtpVerification = () => {
    if (otpPurpose === 'signup') {
      setCurrentPage('login');
    } else {
      setCurrentPage('reset-password');
    }
  };

  const handlePasswordReset = () => {
    // In a real app, update the password then navigate
    setCurrentPage('login');
  };

  const updateRequestStatus = (id: string, status: 'approved' | 'declined') => {
    setDepositRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: status === 'approved' ? RequestStatus.APPROVED : RequestStatus.DECLINED } : req
      )
    );
  };

  const addWithdrawalRequest = (data: { amount: number; walletAddress: string; walletName: string; network: string; }) => {
    if (!currentUser) return;
    const newRequest: WithdrawalRequest = {
        id: `w-req-${Date.now()}`,
        userId: currentUser.id,
        userEmail: currentUser.email,
        amount: data.amount,
        walletName: data.walletName,
        walletAddress: data.walletAddress,
        network: data.network,
        status: RequestStatus.PENDING,
        date: new Date().toISOString().split('T')[0],
    };
    setWithdrawalRequests(prev => [newRequest, ...prev]);
  };

  const updateWithdrawalRequestStatus = (id: string, status: 'approved' | 'declined') => {
    setWithdrawalRequests(prev =>
        prev.map(req =>
            req.id === id ? { ...req, status: status === 'approved' ? RequestStatus.APPROVED : RequestStatus.DECLINED } : req
        )
    );
  };

  const handleUpdateUser = (updatedData: Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);

    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === currentUser.id ? updatedUser : u
      )
    );
  };
  
  const addNotification = (data: { title: string; content: string; userId?: string }) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      userId: data.userId,
      title: data.title,
      content: data.content,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const updateNotification = (updatedNotification: Notification) => {
    setNotifications(prev => 
      prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };


  if (!currentUser) {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onNavigate={setCurrentPage} referralCode={referralCodeFromUrl} />;
      case 'forgot-password':
        return <ForgotPasswordPage onSendOtp={handleSendOtp} onNavigate={setCurrentPage} />;
      case 'otp-verification':
        return <OtpVerificationPage onVerify={handleOtpVerification} purpose={otpPurpose} />;
      case 'reset-password':
        return <ResetPasswordPage onReset={handlePasswordReset} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  }

  if (currentUser.role === UserRole.ADMIN) {
    return <AdminApp 
        user={currentUser} 
        users={users} 
        requests={depositRequests} 
        withdrawalRequests={withdrawalRequests}
        onUpdateRequestStatus={updateRequestStatus} 
        onUpdateWithdrawalRequestStatus={updateWithdrawalRequestStatus}
        onLogout={handleLogout}
        notifications={notifications}
        onAddNotification={addNotification}
        onUpdateNotification={updateNotification}
        onDeleteNotification={deleteNotification} 
    />;
  }

  return <UserApp 
    user={currentUser} 
    onLogout={handleLogout} 
    onUpdateUser={handleUpdateUser}
    notifications={userNotifications}
    onAddWithdrawalRequest={addWithdrawalRequest}
  />;
};

export default App;

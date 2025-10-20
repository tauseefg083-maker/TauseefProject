import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

interface WithdrawPageProps {
  onAddRequest: (data: { amount: number; walletAddress: string; walletName: string; network: string; }) => void;
  walletBalance: number;
  onNavigate: (page: 'dashboard') => void;
}

const WithdrawPage: React.FC<WithdrawPageProps> = ({ onAddRequest, walletBalance, onNavigate }) => {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletName, setWalletName] = useState('');
  const [network, setNetwork] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [fee, setFee] = useState(0);
  const [feePercentage, setFeePercentage] = useState(0);
  const [netWithdrawal, setNetWithdrawal] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(walletBalance);

  useEffect(() => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
        setFee(0);
        setNetWithdrawal(0);
        setFeePercentage(6);
        setRemainingBalance(walletBalance);
        return;
    }

    const calculatedRemaining = walletBalance - numericAmount;
    setRemainingBalance(calculatedRemaining >= 0 ? calculatedRemaining : 0);

    if (numericAmount > walletBalance) {
        setFee(0);
        setNetWithdrawal(numericAmount);
        setFeePercentage(6);
        return;
    }

    let currentFeePercentage = 6;
    // Check if the withdrawal amount is greater than 80% of the wallet balance.
    if (numericAmount > walletBalance * 0.8 && numericAmount > 0) {
        currentFeePercentage = 20;
    }

    const calculatedFee = (numericAmount * currentFeePercentage) / 100;
    const calculatedNet = numericAmount - calculatedFee;

    setFeePercentage(currentFeePercentage);
    setFee(calculatedFee);
    setNetWithdrawal(calculatedNet > 0 ? calculatedNet : 0);
  }, [amount, walletBalance]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (numericAmount < 35) {
        setError('Minimum withdrawal amount is $35.');
        return;
    }
    if (numericAmount > walletBalance) {
        setError('Withdrawal amount cannot exceed your wallet balance.');
        return;
    }
    if (!walletName.trim()) {
      setError('Please enter a wallet name.');
      return;
    }
    if (!network.trim()) {
        setError('Please enter the network.');
        return;
    }
    if (!walletAddress.trim()) {
        setError('Please enter a valid wallet address.');
        return;
    }
    
    setError('');
    onAddRequest({ amount: numericAmount, walletAddress, walletName, network });
    setSubmitted(true);
  };
  
  if(submitted) {
    return (
        <Card className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Withdrawal Request Submitted</h1>
            <p className="text-gray-300 mb-6">Your withdrawal request has been sent for approval. Funds will be transferred to your wallet once confirmed by an administrator.</p>
            <div className="flex justify-center space-x-4 mt-6">
                <Button variant="secondary" onClick={() => {
                    setSubmitted(false);
                    setAmount('');
                    setWalletName('');
                    setWalletAddress('');
                    setNetwork('');
                }}>Make Another Withdrawal</Button>
                <Button onClick={() => onNavigate('dashboard')}>Go to Dashboard</Button>
            </div>
        </Card>
    )
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
        <div>
            <h1 className="text-3xl font-bold text-white">Request Withdrawal</h1>
            <p className="text-gray-400 mt-2">
            Withdraw funds from your wallet. Requests are processed manually for security.
            </p>
        </div>

        <Card>
            <div className="flex justify-between items-center mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <span className="text-gray-400">{remainingBalance !== walletBalance ? 'Remaining Balance' : 'Available Balance'}</span>
                <span className="text-2xl font-bold text-brand-orange">${remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                    label="Amount (USD)" 
                    id="amount" 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="e.g., 100"
                    step="0.01"
                    min="35"
                />
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Withdrawal Amount</span>
                        <span className="font-medium text-white">${!isNaN(parseFloat(amount)) && parseFloat(amount) > 0 ? parseFloat(amount).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="relative group flex items-center gap-1">
                          <span className="text-gray-400">International Fee ({feePercentage}%)</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2 border border-gray-600 shadow-lg z-10">
                            A 6% fee is applied for international transactions. Withdrawals over 80% of your balance incur a 20% fee.
                          </div>
                        </div>
                        <span className="font-medium text-red-400">-${fee.toFixed(2)}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between items-center text-base">
                        <span className="font-semibold text-gray-300">You Will Receive</span>
                        <span className="font-bold text-green-400">${netWithdrawal.toFixed(2)}</span>
                    </div>
                </div>

                <Input
                    label="Wallet Name"
                    id="walletName"
                    type="text"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    required
                    placeholder="e.g., My Binance Wallet"
                />

                <Input
                    label="Network"
                    id="network"
                    type="text"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    required
                    placeholder="e.g., BEP20, ERC20, TRC20"
                />

                <Input 
                    label="Your Wallet Address" 
                    id="walletAddress" 
                    type="text" 
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                    placeholder="0x..."
                />

                {error && <p className="text-sm text-red-500">{error}</p>}
                
                <Button type="submit" variant="primary" className="w-full">
                    Submit Request
                </Button>
            </form>
        </Card>
    </div>
  );
};

export default WithdrawPage;
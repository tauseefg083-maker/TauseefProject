import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

interface DepositPageProps {
  onNavigate: (page: 'dashboard') => void;
}

const DepositPage: React.FC<DepositPageProps> = ({ onNavigate }) => {
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [binanceCopied, setBinanceCopied] = useState(false);
  const [trustCopied, setTrustCopied] = useState(false);

  const binanceAddress = '0xAbC123DeF456GhI789JkL012MnOpQ345RsT678Uv';
  const trustAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';

  const handleCopy = (address: string, type: 'binance' | 'trust') => {
    navigator.clipboard.writeText(address);
    if (type === 'binance') {
      setBinanceCopied(true);
      setTimeout(() => setBinanceCopied(false), 2000);
    } else {
      setTrustCopied(true);
      setTimeout(() => setTrustCopied(false), 2000);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit data to a backend
    console.log({ amount, transactionId, screenshot });
    setSubmitted(true);
  };
  
  if(submitted) {
    return (
        <Card className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Request Submitted</h1>
            <p className="text-gray-300 mb-6">Your deposit request has been sent for approval. It will be reflected in your wallet balance once confirmed by an administrator.</p>
            <div className="flex justify-center space-x-4 mt-6">
                <Button variant="secondary" onClick={() => setSubmitted(false)}>Make Another Deposit</Button>
                <Button onClick={() => onNavigate('dashboard')}>Go to Dashboard</Button>
            </div>
        </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Deposit Funds</h1>
          <p className="text-gray-400 mt-2">
            To add funds to your wallet, please follow the steps below. Deposits are sent directly to our official accounts and are manually verified for security.
          </p>
        </div>
        <Card>
            <h2 className="text-xl font-semibold text-brand-orange mb-3">Official Binance Account</h2>
            <p className="text-sm text-gray-300">Wallet Address:</p>
            <div 
                className="flex items-center justify-between font-mono bg-gray-900/50 p-3 rounded-md my-1 border border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors break-all"
                onClick={() => handleCopy(binanceAddress, 'binance')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleCopy(binanceAddress, 'binance')}
            >
                <span>{binanceAddress}</span>
                <span className="ml-4 text-sm font-sans font-semibold text-brand-orange flex-shrink-0">
                    {binanceCopied ? 'Copied!' : 'Copy'}
                </span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Network:</p>
            <p className="font-mono bg-gray-900 p-2 rounded my-1">BEP20</p>
        </Card>
        <Card>
            <h2 className="text-xl font-semibold text-brand-orange mb-3">Official Trust Wallet</h2>
            <p className="text-sm text-gray-300">Wallet Address:</p>
             <div 
                className="flex items-center justify-between font-mono bg-gray-900/50 p-3 rounded-md my-1 border border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors break-all"
                onClick={() => handleCopy(trustAddress, 'trust')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleCopy(trustAddress, 'trust')}
            >
                <span>{trustAddress}</span>
                <span className="ml-4 text-sm font-sans font-semibold text-brand-orange flex-shrink-0">
                    {trustCopied ? 'Copied!' : 'Copy'}
                </span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Network:</p>
            <p className="font-mono bg-gray-900 p-2 rounded my-1">ERC20</p>
        </Card>
      </div>
      <Card>
        <h2 className="text-2xl font-bold text-white mb-6">Submit Your Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Amount (USD)" 
            id="amount" 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="e.g., 500"
          />
          <Input 
            label="Transaction ID (TID)" 
            id="tid" 
            type="text" 
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
            placeholder="0x..."
          />
          <div>
            <label htmlFor="screenshot" className="block text-sm font-medium text-gray-300 mb-1">
              Transaction Screenshot
            </label>
            <input 
              id="screenshot"
              type="file"
              onChange={handleFileChange}
              required
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-orange-600"
            />
          </div>
          <Button type="submit" variant="success" className="w-full">
            Submit for Approval
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DepositPage;
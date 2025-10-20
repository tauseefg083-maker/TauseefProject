import React, { useState, useMemo } from 'react';
import { DepositRequest, RequestStatus, User } from '../../types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import DeclineRequestModal from '../../components/DeclineRequestModal';
import ImagePreviewModal from '../../components/ImagePreviewModal';

interface DepositRequestsPageProps {
  requests: DepositRequest[];
  users: User[];
  onUpdateRequestStatus: (id: string, status: 'approved' | 'declined') => void;
  onAddNotification: (data: { title: string; content: string; userId?: string }) => void;
  initialFilter?: FilterStatus;
}

type FilterStatus = 'all' | RequestStatus;

const StatusBadge: React.FC<{ status: RequestStatus }> = ({ status }) => {
  const styles = {
    [RequestStatus.PENDING]: 'bg-yellow-500/20 text-yellow-400',
    [RequestStatus.APPROVED]: 'bg-green-500/20 text-green-400',
    [RequestStatus.DECLINED]: 'bg-red-500/20 text-red-400',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DepositRequestsPage: React.FC<DepositRequestsPageProps> = ({ requests, users, onUpdateRequestStatus, onAddNotification, initialFilter = 'all' }) => {
  const [filter, setFilter] = useState<FilterStatus>(initialFilter);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const filteredRequests = useMemo(() => {
    if (filter === 'all') {
      return requests;
    }
    return requests.filter(req => req.status === filter);
  }, [requests, filter]);

  const handleDeclineClick = (request: DepositRequest) => {
    setSelectedRequest(request);
    setIsDeclineModalOpen(true);
  };

  const handleDeclineSubmit = ({ title, reason }: { title: string; reason: string }) => {
    if (!selectedRequest) return;

    onAddNotification({
      title,
      content: reason,
      userId: selectedRequest.userId,
    });

    onUpdateRequestStatus(selectedRequest.id, 'declined');

    setIsDeclineModalOpen(false);
    setSelectedRequest(null);
  };

  const handlePreviewClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsPreviewOpen(true);
  };

  const filterTabs: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: RequestStatus.PENDING },
    { label: 'Approved', value: RequestStatus.APPROVED },
    { label: 'Declined', value: RequestStatus.DECLINED },
  ];

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Deposit Requests</h1>
        <Card>
          <div className="border-b border-gray-700 mb-4">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  {filterTabs.map(tab => (
                      <button
                          key={tab.value}
                          onClick={() => setFilter(tab.value)}
                          className={`${
                              filter === tab.value
                              ? 'border-brand-orange text-brand-orange'
                              : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                          } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                      >
                          {tab.label}
                      </button>
                  ))}
              </nav>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">User Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Amount</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">TID</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Wallet Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Screenshot</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => {
                  const user = users.find(u => u.id === req.userId);
                  return (
                    <tr key={req.id} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="p-4 text-sm text-gray-300 whitespace-nowrap">{req.date}</td>
                      <td className="p-4">{user ? `${user.firstName} ${user.lastName}` : req.userEmail}</td>
                      <td className="p-4 font-semibold">${req.amount.toLocaleString()}</td>
                      <td className="p-4 font-mono text-xs">{req.transactionId}</td>
                      <td className="p-4 text-sm text-gray-300">Binance</td>
                       <td className="p-4">
                        {req.screenshot ? (
                          <Button onClick={() => handlePreviewClick(req.screenshot)} variant="secondary" className="!px-3 !py-1 text-sm">
                            View
                          </Button>
                        ) : (
                          <span className="text-gray-500 text-sm">N/A</span>
                        )}
                      </td>
                      <td className="p-4"><StatusBadge status={req.status} /></td>
                      <td className="p-4">
                        {req.status === RequestStatus.PENDING ? (
                          <div className="flex space-x-2">
                            <Button onClick={() => onUpdateRequestStatus(req.id, 'approved')} className="!px-3 !py-1 text-sm">Approve</Button>
                            <Button onClick={() => handleDeclineClick(req)} variant="secondary" className="!px-3 !py-1 text-sm">Decline</Button>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-sm">Handled</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredRequests.length === 0 && (
                  <tr>
                      <td colSpan={8} className="text-center p-8 text-gray-500">
                          No {filter !== 'all' ? filter : ''} requests found.
                      </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <DeclineRequestModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onSubmit={handleDeclineSubmit}
        requestType="Deposit"
        userEmail={selectedRequest?.userEmail || ''}
      />
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={selectedImage}
      />
    </>
  );
};

export default DepositRequestsPage;
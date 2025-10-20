import React from 'react';
import Card from '../../components/Card';

const Icon = ({ path, className = 'w-8 h-8' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-brand-surface/50 p-6 rounded-lg border border-white/10">
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 bg-brand-orange/10 text-brand-orange p-3 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
        </div>
        <p className="mt-4 text-brand-gray">{children}</p>
    </div>
);

const AboutUsPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-brand-orange">FIN2X</span>
        </h1>
        <p className="text-xl text-brand-gray max-w-3xl mx-auto">
          The simple way to invest, grow your network, and earn rewards.
        </p>
      </header>

      <Card>
        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-brand-gray leading-relaxed text-lg">
          Our mission is to make finance simple and rewarding for everyone. We offer easy-to-use tools for investing and growing a network, creating a stable way for our members to earn.
        </p>
      </Card>

      <section>
        <h2 className="text-3xl font-bold text-white text-center mb-8">How You Earn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="Daily Profit" icon={<Icon path="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h.375m18 3.75h.75a.75.75 0 00.75-.75v-.75m0 0h-.75a.75.75 0 00-.75.75v.75m-7.5-3v4.5m-4.5-4.5v4.5m1.5.75h1.5m-1.5-1.5h1.5m-1.5-1.5h1.5m3-3h1.5m-1.5-1.5h1.5m-1.5-1.5h1.5" />}>
            Earn daily returns on your investment. Put your money to work.
          </FeatureCard>
          <FeatureCard title="Direct Commission" icon={<Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />}>
            Get an instant commission when people you refer invest.
          </FeatureCard>
          <FeatureCard title="Team Earning" icon={<Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964c.354.023.707.046 1.06.069 2.791.132 5.68-.455 8.34-1.996m-16.64 1.996c2.659 1.54 5.549 2.128 8.34 1.996" />}>
            Earn from your team's investments, up to 5 levels deep.
          </FeatureCard>
          <FeatureCard title="Monthly Salary" icon={<Icon path="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a9 9 0 11-18 0 9 9 0 0118 0z" />}>
            Hit team goals and get a monthly salary for your leadership.
          </FeatureCard>
          <FeatureCard title="Rank Rewards" icon={<Icon path="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 100 13.5zM16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />}>
            Grow your team to climb ranks and unlock exclusive bonuses.
          </FeatureCard>
           <FeatureCard title="Global Platform" icon={<Icon path="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918" />}>
            We are a verified UK company with a secure, global platform.
          </FeatureCard>
        </div>
      </section>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-brand-gray">
            <p>
                <strong className="text-white">Website:</strong><br/>
                <a href="http://www.fin2x.uk" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">www.fin2x.uk</a>
            </p>
            <p>
                <strong className="text-white">Support Email:</strong><br/>
                <a href="mailto:support@fin2x.uk" className="text-brand-orange hover:underline">support@fin2x.uk</a>
            </p>
        </div>
      </Card>
    </div>
  );
};

export default AboutUsPage;
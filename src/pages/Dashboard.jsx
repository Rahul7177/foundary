import { useState, useCallback } from 'react';
import DashboardWidgets from '../components/dashboard/DashboardWidgets';
import Inbox from '../components/dashboard/Inbox';
import MyPlan from '../components/dashboard/MyPlan';
import CategoriesPanel from '../components/marketplace/CategoriesPanel';
import AgentTable from '../components/marketplace/AgentTable';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeMarketplaceTab, setActiveMarketplaceTab] = useState('business');

  const handleTabChange = useCallback((tab) => {
    setActiveMarketplaceTab(tab);
  }, []);

  return (
    <div className="operational-dashboard">
      <div className="dashboard-greeting">
        <h1>
          Good Morning, <span className="accent">{user?.firstName || 'Bhupinder'}</span>
        </h1>
      </div>

      <DashboardWidgets />

      <div className="dashboard-lower">
        <Inbox />
        <MyPlan />
      </div>

      <CategoriesPanel activeTab={activeMarketplaceTab} onTabChange={handleTabChange} />

      <AgentTable activeTab={activeMarketplaceTab} onTabChange={handleTabChange} />
    </div>
  );
}

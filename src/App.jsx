import { useState, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import AgentDetail from './components/agents/AgentDetail';
import AgentMarketplace from './pages/AgentMarketplace';
import PortfolioROI from './pages/PortfolioROI';
import TriageAgent from './pages/TriageAgent';
import CXOCommandCenter from './pages/CXOCommandCenter';
import OperationsManager from './pages/OperationsManager';
import BusinessUser from './pages/BusinessUser';
import AgentExecutionPage from './pages/AgentExecutionPage';
import LoginPage from './pages/LoginPage';

/* ── Route guard: redirects to /login when unauthenticated ── */
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPersona, setCurrentPersona] = useState('operational-analyst');
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handlePersonaChange = useCallback(
    (persona) => {
      setCurrentPersona(persona);
      const personaRoutes = {
        'operational-analyst': '/',
        'operations-manager': '/operations-manager',
        'business-user': '/business-user',
        'cxo': '/cxo',
      };
      const route = personaRoutes[persona];
      if (route) {
        navigate(route);
      }
    },
    [navigate]
  );

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* All protected routes */}
      <Route
        path="/*"
        element={
          <RequireAuth>
            <>
              <Header currentPersona={currentPersona} onPersonaChange={handlePersonaChange} />
              <div className="layout-wrapper">
                <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
                <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/agents/:agentId" element={<AgentDetail />} />
                    <Route path="/agent-execution/:agentId" element={<AgentExecutionPage />} />
                    <Route path="/marketplace" element={<AgentMarketplace />} />
                    <Route path="/portfolio-roi" element={<PortfolioROI />} />
                    <Route path="/triage" element={<TriageAgent />} />
                    <Route path="/cxo" element={<CXOCommandCenter />} />
                    <Route path="/operations-manager" element={<OperationsManager />} />
                    <Route path="/business-user" element={<BusinessUser />} />
                  </Routes>
                </main>
              </div>
            </>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;

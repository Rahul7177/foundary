import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const userIdRef = useRef(null);

  const from = location.state?.from?.pathname || '/';

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    userIdRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Small delay for visual feedback
    setTimeout(() => {
      const result = login(userId, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-page">
      {/* Animated background particles */}
      <div className="login-bg-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="login-container">
        {/* Left branding panel */}
        <div className="login-branding">
          <div className="login-branding-content">
            <div className="login-logo-section">
              <img src="/icons/icons/Infosys_logo1.png" alt="Infosys" className="login-logo-exxon" />
              <span className="login-logo-divider">|</span>
              <img src="/icons/icons/AI Foundry Logo.svg" alt="AI Foundry" className="login-logo-foundry" />
            </div>
            <h1 className="login-brand-title">AI Agent Foundry</h1>
            <p className="login-brand-subtitle">Unified AI Platform for Enterprise Operations</p>
            <div className="login-brand-features">
              <div className="login-feature">
                <i className="fas fa-robot" />
                <span>22+ AI Agents</span>
              </div>
              <div className="login-feature">
                <i className="fas fa-shield-alt" />
                <span>Enterprise Security</span>
              </div>
              <div className="login-feature">
                <i className="fas fa-bolt" />
                <span>Auto-Triage &amp; Routing</span>
              </div>
              <div className="login-feature">
                <i className="fas fa-chart-line" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
          <div className="login-branding-footer">
            <span>Powered by Infosys</span>
          </div>
        </div>

        {/* Right login form */}
        <div className="login-form-panel">
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="login-form-header">
              <div className="login-avatar-icon">
                <i className="fas fa-user-circle" />
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to continue to AI Foundry</p>
            </div>

            {error && (
              <div className="login-error">
                <i className="fas fa-exclamation-circle" />
                <span>{error}</span>
              </div>
            )}

            <div className="login-field">
              <label htmlFor="userId">User ID</label>
              <div className="login-input-wrapper">
                <i className="fas fa-user" />
                <input
                  ref={userIdRef}
                  id="userId"
                  type="text"
                  placeholder="e.g. john.doe"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <i className="fas fa-lock" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            <div className="login-extras">
              <label className="login-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#!" className="login-forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="fas fa-arrow-right" />
                </>
              )}
            </button>

            <div className="login-sso-section">
              <span className="login-sso-divider">or</span>
              <button type="button" className="login-sso-btn" onClick={() => alert('SSO integration placeholder')}>
                <i className="fas fa-building" />
                <span>Sign in with Enterprise SSO</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

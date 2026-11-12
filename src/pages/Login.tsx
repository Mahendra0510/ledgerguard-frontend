import { useMemo, useState, type FormEvent } from 'react';
import { ShieldCheck, LockKeyhole, ArrowRight, Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('admin@acme.example');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordRules = useMemo(() => [
    { label: 'At least 12 characters', valid: password.length >= 12 },
    { label: 'One uppercase letter (A–Z)', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a–z)', valid: /[a-z]/.test(password) },
    { label: 'One number (0–9)', valid: /[0-9]/.test(password) },
    { label: 'One special character (!@#$...)', valid: /[^A-Za-z0-9]/.test(password) },
  ], [password]);
  const strength = passwordRules.filter((rule) => rule.valid).length;
  const strengthLabel = password.length === 0 ? 'Not set' : strength <= 2 ? 'Weak' : strength <= 4 ? 'Good' : 'Strong';

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-decoration">
        <div className="login-orbit orbit-one" /><div className="login-orbit orbit-two" />
        <div className="login-brand"><span className="brand-mark"><ShieldCheck /></span> LedgerGuard</div>
        <div className="login-copy">
          <span className="eyebrow">BILLING INFRASTRUCTURE, REIMAGINED</span>
          <h1>Clarity and control for every transaction.</h1>
          <p>One secure workspace to monitor usage, manage billing events, and understand your spend.</p>
          <div className="login-proof"><ShieldCheck size={17} /> Built for isolated enterprise workspaces</div>
        </div>
        <div className="login-footer">SECURE BY DESIGN · BUILT FOR ENTERPRISE</div>
      </div>

      <div className="login-panel">
        <form className="login-form" onSubmit={submit}>
          <div className="login-mobile-brand"><span className="brand-mark"><ShieldCheck /></span> LedgerGuard</div>
          <div className="form-icon"><LockKeyhole /></div>
          <h2>Welcome back</h2>
          <p className="muted">Sign in to your organization workspace.</p>

          <label htmlFor="email">Work email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />

          <label htmlFor="password">Password</label>
          <div className="password-input-wrap">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              <span>{showPassword ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          <div className="password-strength" aria-live="polite">
            <div className="strength-heading"><span>Password strength</span><strong className={strengthLabel === 'Not set' ? 'strength-empty' : `strength-${strengthLabel.toLowerCase()}`}>{strengthLabel}</strong></div>
            <div className="strength-bars">{[1, 2, 3, 4, 5].map((bar) => <span key={bar} className={bar <= strength ? `filled strength-fill-${strengthLabel.toLowerCase()}` : ''} />)}</div>
            <ul className="password-rules">
              {passwordRules.map((rule) => <li key={rule.label} className={rule.valid ? 'rule-valid' : ''}>{rule.valid ? <Check size={13} /> : <X size={13} />}{rule.label}</li>)}
            </ul>
          </div>

          <div className="form-meta"><span><ShieldCheck size={14} /> Secure sign in</span><span>JWT protected</span></div>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button login-submit" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in to workspace'} <ArrowRight size={17} /></button>
          <div className="demo-hint">Demo mode: enter any valid email and a password of at least 4 characters. The strength guide helps you check password complexity.</div>
        </form>
      </div>
    </div>
  );
}

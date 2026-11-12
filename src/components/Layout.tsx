import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Activity, BarChart3, CreditCard, LayoutDashboard, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
const links = [{to:'/',label:'Overview',icon:LayoutDashboard},{to:'/ledger',label:'Billing ledger',icon:CreditCard},{to:'/analytics',label:'Usage analytics',icon:BarChart3}];
export function Layout() {
  const { user, logout } = useAuth(); const [open, setOpen] = useState(false); const location = useLocation();
  const page = links.find((link) => link.to === location.pathname)?.label ?? 'Overview';
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}><div className="brand"><span className="brand-mark"><ShieldCheck size={21}/></span><span>Ledger<span className="brand-light">Guard</span></span><button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X/></button></div>
      <div className="workspace-label">WORKSPACE</div><div className="workspace"><span className="workspace-avatar">{user?.organization.slice(0,1) ?? 'A'}</span><span><b>{user?.organization ?? 'Your company'}</b><small>Enterprise plan</small></span></div>
      <nav className="nav-links">{links.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="secure-note"><ShieldCheck size={17}/><span><b>Tenant isolated</b><small>Secure workspace active</small></span></div><button className="logout-button" onClick={logout}><LogOut size={17}/> Sign out</button></div>
    </aside>
    {open && <button className="mobile-scrim" onClick={() => setOpen(false)} aria-label="Close navigation"/>}
    <main className="main-area"><header className="topbar"><button className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu/></button><div><span className="breadcrumb">Workspace /</span> <b>{page}</b></div><div className="topbar-right"><span className="live-indicator"><i/> System operational</span><div className="avatar">{user?.name.split(' ').map((x) => x[0]).join('') ?? 'AM'}</div></div></header><div className="page-content"><Outlet/></div><footer className="footer"><span><Activity size={14}/> LedgerGuard platform</span><span>Secure billing infrastructure · v1.0</span></footer></main>
  </div>;
}

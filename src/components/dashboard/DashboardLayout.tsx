import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Zap,
  FolderKanban,
  Settings,
  CreditCard,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const SIDEBAR_LINKS = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/integrations', label: 'Integrations', icon: Zap },
  { path: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  { path: '/dashboard/billing', label: 'Billing', icon: CreditCard },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-black -z-10"></div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800">
            <Link to="/dashboard" className="flex items-center justify-center">
              <img
                src="/erasebg-transformed copy.png"
                alt="Artificial Ignorance"
                className="w-full h-auto max-w-[220px]"
              />
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-neon-green' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <div className="bg-gradient-to-r from-neon-green/10 to-emerald-400/10 border border-neon-green/30 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-1 text-sm">Upgrade to Pro</h3>
              <p className="text-zinc-400 text-xs mb-3">
                Unlock unlimited AI agents and integrations
              </p>
              <Link
                to="/dashboard/billing"
                onClick={() => setSidebarOpen(false)}
                className="block w-full py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black text-sm font-bold rounded-lg hover:scale-[1.02] transition-all text-center"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {SIDEBAR_LINKS.find(link => link.path === location.pathname)?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-emerald-400 flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-white">
                    {user?.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl shadow-black/50 overflow-hidden animate-fadeIn">
                    <div className="p-3 border-b border-zinc-800">
                      <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                      <p className="text-xs text-zinc-500 mt-1">Free Plan</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setSolutionsOpen(false);
        setIsPinned(false);
      }
    };

    if (solutionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solutionsOpen]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Partner Program', path: '/partner-program' },
    { name: 'Integrations', path: '/integrations' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/erasebg-transformed.png"
              alt="Artificial Ignorance"
              className="h-40 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-neon-green'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => {
                  setIsPinned(!isPinned);
                  setSolutionsOpen(!solutionsOpen);
                }}
                onMouseEnter={() => {
                  if (!isPinned) {
                    setSolutionsOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!isPinned) {
                    setSolutionsOpen(false);
                  }
                }}
                className={`font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === '/solutions'
                    ? 'text-neon-green'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsOpen && (
                <div
                  ref={menuRef}
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => {
                    if (!isPinned) {
                      setSolutionsOpen(false);
                    }
                  }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] bg-gray-900 border-2 border-neon-green rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.2)] p-6 z-50"
                >
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-neon-green font-bold mb-4 text-sm uppercase tracking-wide">Use Cases</h3>
                      <div className="space-y-3">
                        <Link to="/solutions/customer-service" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Customer Service</div>
                          <div className="text-gray-400 text-xs">Automated voice support</div>
                        </Link>
                        <Link to="/solutions/receptionist" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Receptionist</div>
                          <div className="text-gray-400 text-xs">24/7 call handling</div>
                        </Link>
                        <Link to="/solutions/answering-service" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Answering Service</div>
                          <div className="text-gray-400 text-xs">Never miss a call</div>
                        </Link>
                        <Link to="/solutions/concierge" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Concierge</div>
                          <div className="text-gray-400 text-xs">Automated guest support</div>
                        </Link>
                        <Link to="/solutions/appointment-setter" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Appointment Setter</div>
                          <div className="text-gray-400 text-xs">Smart scheduling AI</div>
                        </Link>
                        <Link to="/solutions/ai-ivr" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">AI IVR</div>
                          <div className="text-gray-400 text-xs">Next-gen call menus</div>
                        </Link>
                        <Link to="/solutions/whatsapp-integration" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">WhatsApp Integration</div>
                          <div className="text-gray-400 text-xs">Automated business calls</div>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-neon-green font-bold mb-4 text-sm uppercase tracking-wide">Case Studies</h3>
                      <div className="space-y-3">
                        <Link to="/solutions/customer-support" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Customer Support</div>
                          <div className="text-gray-400 text-xs">AI-driven helpdesk</div>
                        </Link>
                        <Link to="/solutions/data-collection" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Data Collection</div>
                          <div className="text-gray-400 text-xs">Automated info capture</div>
                        </Link>
                        <Link to="/solutions/inbound-calls" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Inbound Calls</div>
                          <div className="text-gray-400 text-xs">Smart call handling</div>
                        </Link>
                        <Link to="/solutions/lead-reactivation" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Lead Reactivation</div>
                          <div className="text-gray-400 text-xs">Revive dormant leads</div>
                        </Link>
                        <Link to="/solutions/sales-qualification" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Sales Qualification</div>
                          <div className="text-gray-400 text-xs">Filter high-value leads</div>
                        </Link>
                        <Link to="/solutions/voice-ai-crm" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Voice AI for CRM</div>
                          <div className="text-gray-400 text-xs">Integrate AI calling</div>
                        </Link>
                        <Link to="/solutions/bpo-call-center" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">BPO & Call Center</div>
                          <div className="text-gray-400 text-xs">Scale call operations</div>
                        </Link>
                        <Link to="/solutions/ivr-optimization" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">IVR Optimization</div>
                          <div className="text-gray-400 text-xs">Human-level accuracy</div>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-neon-green font-bold mb-4 text-sm uppercase tracking-wide">Industries</h3>
                      <div className="space-y-3">
                        <Link to="/solutions/bpo" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">BPO</div>
                          <div className="text-gray-400 text-xs">Automate call ops</div>
                        </Link>
                        <Link to="/solutions/healthcare" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Healthcare</div>
                          <div className="text-gray-400 text-xs">Patient call routing</div>
                        </Link>
                        <Link to="/solutions/mortgage" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Mortgage</div>
                          <div className="text-gray-400 text-xs">Mortgage call support</div>
                        </Link>
                        <Link to="/solutions/recruitment" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Recruitment</div>
                          <div className="text-gray-400 text-xs">Screen candidates</div>
                        </Link>
                        <Link to="/solutions/car-dealership" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Car Dealership</div>
                          <div className="text-gray-400 text-xs">Dealer call automation</div>
                        </Link>
                        <Link to="/solutions/agency" className="block group">
                          <div className="text-white text-sm font-semibold group-hover:text-neon-green transition-colors">Agency</div>
                          <div className="text-gray-400 text-xs">White-label AI</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <>
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="clean-button-primary px-6 py-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-neon-green'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="space-y-2">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center justify-between w-full font-medium text-gray-300 hover:text-white transition-colors"
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsOpen && (
                <div className="pl-4 space-y-3 py-2">
                  <div>
                    <h4 className="text-neon-green font-bold text-xs uppercase tracking-wide mb-2">Use Cases</h4>
                    <div className="space-y-2">
                      <Link to="/solutions/customer-service" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Customer Service</Link>
                      <Link to="/solutions/receptionist" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Receptionist</Link>
                      <Link to="/solutions/answering-service" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Answering Service</Link>
                      <Link to="/solutions/concierge" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Concierge</Link>
                      <Link to="/solutions/appointment-setter" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Appointment Setter</Link>
                      <Link to="/solutions/ai-ivr" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">AI IVR</Link>
                      <Link to="/solutions/whatsapp-integration" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">WhatsApp Integration</Link>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-neon-green font-bold text-xs uppercase tracking-wide mb-2">Case Studies</h4>
                    <div className="space-y-2">
                      <Link to="/solutions/customer-support" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Customer Support</Link>
                      <Link to="/solutions/data-collection" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Data Collection</Link>
                      <Link to="/solutions/inbound-calls" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Inbound Calls</Link>
                      <Link to="/solutions/lead-reactivation" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Lead Reactivation</Link>
                      <Link to="/solutions/sales-qualification" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Sales Qualification</Link>
                      <Link to="/solutions/voice-ai-crm" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Voice AI for CRM</Link>
                      <Link to="/solutions/bpo-call-center" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">BPO & Call Center</Link>
                      <Link to="/solutions/ivr-optimization" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">IVR Optimization</Link>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-neon-green font-bold text-xs uppercase tracking-wide mb-2">Industries</h4>
                    <div className="space-y-2">
                      <Link to="/solutions/bpo" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">BPO</Link>
                      <Link to="/solutions/healthcare" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Healthcare</Link>
                      <Link to="/solutions/mortgage" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Mortgage</Link>
                      <Link to="/solutions/recruitment" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Recruitment</Link>
                      <Link to="/solutions/car-dealership" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Car Dealership</Link>
                      <Link to="/solutions/agency" onClick={() => setIsOpen(false)} className="block text-sm text-gray-300 hover:text-neon-green">Agency</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {user ? (
              <>
                <div className="flex items-center gap-2 text-gray-300 py-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full clean-button-primary px-6 py-2 text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

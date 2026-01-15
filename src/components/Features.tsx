import { Twitter, Linkedin, Github, Mail, Shield, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API Docs', href: '#docs' }
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ]
};

const contactInfo = {
  address: {
    line1: 'Merlin House',
    line2: 'Brunel Rd',
    line3: 'Theale, Reading RG7 4AB'
  },
  email: 'community@artificialignorance.io'
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' }
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t-2 border-neon-green">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-3">
              <img
                src="/1000049366.png"
                alt="Artificial Ignorance"
                className="h-32 w-auto"
              />
            </div>
            <p className="text-white mb-6 text-sm max-w-sm">
              Redefining voice with AI. Human-like voices and automation that scale instantly.
            </p>

            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg border-2 border-neon-green flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-neon-green text-xs">
              <Shield size={14} className="text-neon-green" />
              <span>Secured by Stripe</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-link text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-link text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-neon-green mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm leading-relaxed">
                  <div>{contactInfo.address.line1}</div>
                  <div>{contactInfo.address.line2}</div>
                  <div>{contactInfo.address.line3}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-neon-green mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-neon-green text-sm transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-neon-green pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs">
            © 2025 Artificial Ignorance. All rights reserved.
          </p>
          <p className="text-white text-xs">
            Designed by{' '}
            <a
              href="https://instagram.com/elliot_dolapo09"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neon-green transition-colors"
            >
              Elliot Adedolapo
            </a>
          </p>
          <p className="text-neon-green text-xs">
            artificialignorance.io
          </p>
        </div>
      </div>
    </footer>
  );
}

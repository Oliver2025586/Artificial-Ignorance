import { lazy, Suspense } from 'react';
import { usePageTitle } from '../utils/usePageTitle';
import PricingHero from '../components/pricing/PricingHero';
import TrustLogos from '../components/pricing/TrustLogos';
import FeatureHighlights from '../components/pricing/FeatureHighlights';
import PricingTiers from '../components/pricing/PricingTiers';

const FeatureComparison = lazy(() => import('../components/pricing/FeatureComparison'));
const PricingTestimonials = lazy(() => import('../components/pricing/PricingTestimonials'));
const EnterpriseSection = lazy(() => import('../components/pricing/EnterpriseSection'));
const PricingCTA = lazy(() => import('../components/pricing/PricingCTA'));
const Footer = lazy(() => import('../components/Footer'));

export default function PricingPage() {
  usePageTitle('Pricing — Artificial Ignorance');
  return (
    <div className="min-h-screen bg-black">
      <PricingHero />
      <TrustLogos />
      <FeatureHighlights />
      <PricingTiers />
      <Suspense fallback={<div className="h-96" />}>
        <FeatureComparison />
        <PricingTestimonials />
        <EnterpriseSection />
        <PricingCTA />
        <Footer />
      </Suspense>
    </div>
  );
}
import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import LogoCarousel from '../components/LogoCarousel';
import LeadFunnel from '../components/LeadFunnel';
import InfiniteRibbon from '../components/InfiniteRibbon';
import TestimonialVideos from '../components/TestimonialVideos';
import DemoPopup from '../components/DemoPopup';

const AnimatedBackground = lazy(() => import('../components/AnimatedBackground'));
const VoiceAgentDemo = lazy(() => import('../components/VoiceAgentDemo'));
const LiveCallRecording = lazy(() => import('../components/LiveCallRecording'));
const BookDemoCTA = lazy(() => import('../components/BookDemoCTA'));
const Stats = lazy(() => import('../components/Stats'));
const VoiceShowcase = lazy(() => import('../components/VoiceShowcase'));
const AIWorkflow = lazy(() => import('../components/AIWorkflow'));
const FeatureGrid = lazy(() => import('../components/FeatureGrid'));
const AutomationDemo = lazy(() => import('../components/AutomationDemo'));
const AIAgentDashboard = lazy(() => import('../components/AIAgentDashboard'));
const UseCases = lazy(() => import('../components/UseCases'));
const SolutionsShowcase = lazy(() => import('../components/SolutionsShowcase'));
const Integration = lazy(() => import('../components/Integration'));
const SocialProof = lazy(() => import('../components/SocialProof'));
const CallToAction = lazy(() => import('../components/CallToAction'));
const Footer = lazy(() => import('../components/Footer'));

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const hasStartedTimer = useRef(false);

  useEffect(() => {
    if (hasStartedTimer.current) return;

    const hasSeenPopup = sessionStorage.getItem('hasSeenDemoPopup');

    if (!hasSeenPopup) {
      hasStartedTimer.current = true;
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('hasSeenDemoPopup', 'true');
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
      <div className="relative z-10">
        <Hero />
        <TestimonialVideos />
        <LeadFunnel />
        <LogoCarousel />
        <Suspense fallback={<div className="h-screen" />}>
          <VoiceAgentDemo />
          <LiveCallRecording />
          <BookDemoCTA />
          <Stats />
          <VoiceShowcase />
          <InfiniteRibbon />
          <AIWorkflow />
          <FeatureGrid />
          <AutomationDemo />
          <AIAgentDashboard />
          <UseCases />
          <SolutionsShowcase />
          <Integration />
          <SocialProof />
          <CallToAction />
          <Footer />
        </Suspense>
      </div>

      {showPopup && <DemoPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

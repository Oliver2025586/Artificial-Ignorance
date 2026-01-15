import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import PartnerProgramPage from './pages/PartnerProgramPage';
import IntegrationsPage from './pages/IntegrationsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TalkToSalesPage from './pages/TalkToSalesPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import DashboardIntegrations from './pages/dashboard/IntegrationsPage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import BillingPage from './pages/dashboard/BillingPage';

import CustomerServicePage from './pages/solutions/CustomerServicePage';
import ReceptionistPage from './pages/solutions/ReceptionistPage';
import AnsweringServicePage from './pages/solutions/AnsweringServicePage';
import ConciergePage from './pages/solutions/ConciergePage';
import AppointmentSetterPage from './pages/solutions/AppointmentSetterPage';
import AIIVRPage from './pages/solutions/AIIVRPage';
import WhatsAppIntegrationPage from './pages/solutions/WhatsAppIntegrationPage';
import CustomerSupportPage from './pages/solutions/CustomerSupportPage';
import DataCollectionPage from './pages/solutions/DataCollectionPage';
import InboundCallsPage from './pages/solutions/InboundCallsPage';
import LeadReactivationPage from './pages/solutions/LeadReactivationPage';
import SalesQualificationPage from './pages/solutions/SalesQualificationPage';
import VoiceAICRMPage from './pages/solutions/VoiceAICRMPage';
import BPOCallCenterPage from './pages/solutions/BPOCallCenterPage';
import IVROptimizationPage from './pages/solutions/IVROptimizationPage';
import BPOPage from './pages/solutions/BPOPage';
import HealthcarePage from './pages/solutions/HealthcarePage';
import MortgagePage from './pages/solutions/MortgagePage';
import RecruitmentPage from './pages/solutions/RecruitmentPage';
import CarDealershipPage from './pages/solutions/CarDealershipPage';
import AgencyPage from './pages/solutions/AgencyPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
          <Route path="/dashboard/integrations" element={<ProtectedRoute><DashboardIntegrations /></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />

          <Route path="*" element={
            <>
              <Navigation />
              <div className="pt-32">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/partner-program" element={<PartnerProgramPage />} />
                  <Route path="/integrations" element={<IntegrationsPage />} />
                  <Route path="/talk-to-sales" element={<TalkToSalesPage />} />

            <Route path="/solutions/customer-service" element={<CustomerServicePage />} />
            <Route path="/solutions/receptionist" element={<ReceptionistPage />} />
            <Route path="/solutions/answering-service" element={<AnsweringServicePage />} />
            <Route path="/solutions/concierge" element={<ConciergePage />} />
            <Route path="/solutions/appointment-setter" element={<AppointmentSetterPage />} />
            <Route path="/solutions/ai-ivr" element={<AIIVRPage />} />
            <Route path="/solutions/whatsapp-integration" element={<WhatsAppIntegrationPage />} />
            <Route path="/solutions/customer-support" element={<CustomerSupportPage />} />
            <Route path="/solutions/data-collection" element={<DataCollectionPage />} />
            <Route path="/solutions/inbound-calls" element={<InboundCallsPage />} />
            <Route path="/solutions/lead-reactivation" element={<LeadReactivationPage />} />
            <Route path="/solutions/sales-qualification" element={<SalesQualificationPage />} />
            <Route path="/solutions/voice-ai-crm" element={<VoiceAICRMPage />} />
            <Route path="/solutions/bpo-call-center" element={<BPOCallCenterPage />} />
            <Route path="/solutions/ivr-optimization" element={<IVROptimizationPage />} />
            <Route path="/solutions/bpo" element={<BPOPage />} />
            <Route path="/solutions/healthcare" element={<HealthcarePage />} />
            <Route path="/solutions/mortgage" element={<MortgagePage />} />
            <Route path="/solutions/recruitment" element={<RecruitmentPage />} />
            <Route path="/solutions/car-dealership" element={<CarDealershipPage />} />
            <Route path="/solutions/agency" element={<AgencyPage />} />
                </Routes>
              </div>
            </>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import GlobalFundsSection from '../components/GlobalFundsSection';
import WhyInvestSection from '../components/WhyInvestSection';
import FundCategoriesSection from '../components/FundCategoriesSection';
import AdvisorProfile from '../components/AdvisorProfile';
import LeadForm from '../components/LeadForm';

export default function HomePage() {
  const formRef = useRef<HTMLElement | null>(null);

  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <HeroSection onCtaClick={scrollToForm} />

      {/* Global Funds Strategy Section */}
      <GlobalFundsSection onCtaClick={scrollToForm} />

      {/* Why Invest Section */}
      <div id="why-invest">
        <WhyInvestSection />
      </div>

      {/* Fund Categories Section */}
      <div id="funds">
        <FundCategoriesSection onInvestClick={scrollToForm} />
      </div>

      {/* Advisor Profile */}
      <AdvisorProfile />

      {/* Lead Capture Form */}
      <LeadForm />
    </>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpportunityPage from "./components/opportunity/OpportunityPage";
import NegotiationPage from "./components/negotiation/NegotiationPage";
import SalaryComparatorPage from "./components/salary_comparator/SalaryComparatorPage";
import Homepage from "./components/homepage/HomePage";
import SimulatorPage from "./components/simulator/SimulatorPage";
import PaygapPage from "./components/paygap_factor/PaygapPage";
import VoiceContent from "./components/simulator/VoicePage";
import AvatarPage from "./components/avatar/AvatarPage";
import ScrollToTop from "./components/reusable/ScrollToTop";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/factor" element={<PaygapPage />} />
            <Route path="/comparator" element={<SalaryComparatorPage />} />
            <Route path="/opportunity" element={<OpportunityPage />} />
            <Route path="/guide" element={<NegotiationPage />} />
            <Route path="/about" element={<Homepage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/voice" element={<VoiceContent />} />
            <Route path="/avatar" element={<AvatarPage/>} />
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
};

export default App;

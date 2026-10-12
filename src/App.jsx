import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ThemesSection from './components/ThemesSection';
import RoadmapSection from './components/RoadmapSection';
import ReviewExplorer from './components/ReviewExplorer';
import ReplyHelper from './components/ReplyHelper';
import MockUISection from './components/MockUISection';
import MetricsPanel from './components/MetricsPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <ThemesSection />
        <RoadmapSection />
        <ReviewExplorer />
        <ReplyHelper />
        <MockUISection />
        <MetricsPanel />
      </main>


    </div>
  );
}

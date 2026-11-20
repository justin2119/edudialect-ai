import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Selectors from './pages/Selectors';
import Explore from './pages/Explore';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import { isOnboardingDone } from './lib/storage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<Layout />}>
        <Route path="/selectors" element={<Selectors />} />
        <Route path="/explore" element={isOnboardingDone() ? <Explore /> : <Navigate to="/onboarding" replace />} />
        <Route path="/explore/:topicId" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

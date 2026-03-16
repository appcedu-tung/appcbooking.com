import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import MockTestPage from './pages/MockTestPage';
import WrongReviewPage from './pages/WrongReviewPage';
import RecordsPage from './pages/RecordsPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/mock-test" element={<MockTestPage />} />
        <Route path="/wrong-review" element={<WrongReviewPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

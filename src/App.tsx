import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { SynonymsPage } from './pages/SynonymsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/dashboard"  element={<DashboardPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/articles"   element={<ArticlesPage />} />
            <Route path="/synonyms"   element={<SynonymsPage />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

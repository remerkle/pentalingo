import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { DashboardPage } from './pages/DashboardPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { SynonymsPage } from './pages/SynonymsPage';
import { VerbTensesPage } from './pages/VerbTensesPage';
import { PrepositionsPage } from './pages/PrepositionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/learn"      element={<LearnPage />} />
            <Route path="/dashboard"  element={<DashboardPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/articles"   element={<ArticlesPage />} />
            <Route path="/synonyms"   element={<SynonymsPage />} />
            <Route path="/verbs"      element={<VerbTensesPage />} />
            <Route path="/prepositions" element={<PrepositionsPage />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

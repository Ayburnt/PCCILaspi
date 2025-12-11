import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import NewsPost from './pages/NewsPost';
import NewsIndex from './pages/NewsIndex'; // <--- Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinPage />} />
        
        {/* The Page showing ALL news */}
        <Route path="/news" element={<NewsIndex />} /> 
        
        {/* The Page showing ONE specific article */}
        <Route path="/news/:slug" element={<NewsPost />} /> 
      </Routes>
    </Router>
  );
}

export default App;
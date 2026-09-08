import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import TalabaDetail from './pages/TalabaDetail';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talaba/:id" element={<TalabaDetail />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
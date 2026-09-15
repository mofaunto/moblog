import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.success('Tizimdan chiqdingiz');
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
          MoBlog
        </Link>

        <nav className="flex items-center gap-3">

          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {user.ism?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-gray-800 font-medium">{user.ism}</span>
              </Link>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Chiqish
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">
                Kirish
              </Link>
              <Link to="/register" className="btn btn-secondary btn-sm">
                Ro‘yxatdan o‘tish
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
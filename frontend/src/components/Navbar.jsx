import { Link } from 'react-router';

function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
          MoBlog
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Bosh sahifa
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
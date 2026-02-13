import { Link, useNavigate } from 'react-router-dom';
import { Wheat, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, farmerProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Wheat className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">KrishiRise</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition">Contact</Link>
            {user && farmerProfile && (
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 transition">Dashboard</Link>
            )}

            {user && farmerProfile ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {farmerProfile.name}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium transition">Login</Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-green-600 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-700 hover:text-green-600 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-green-600 transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user && farmerProfile && (
              <Link to="/dashboard" className="block text-gray-700 hover:text-green-600 transition" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            )}

            {user && farmerProfile ? (
              <>
                <div className="text-sm text-gray-600">Welcome, {farmerProfile.name}</div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-green-600 hover:text-green-700 font-medium transition" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link
                  to="/register"
                  className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

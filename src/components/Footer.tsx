import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8" />
              <span className="text-xl font-bold">KrishiRise</span>
            </div>
            <p className="text-green-100">
              Empowering farmers with advanced AI technology for better yields and sustainable practices.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-100 hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="text-green-100 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-green-100 hover:text-white transition">Contact</Link></li>
              <li><Link to="/dashboard" className="text-green-100 hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/disease-detection" className="text-green-100 hover:text-white transition">Disease Detection</Link></li>
              <li><Link to="/crop-suggestion" className="text-green-100 hover:text-white transition">Crop Suggestion</Link></li>
              <li><Link to="/smart-solutions-plans" className="text-green-100 hover:text-white transition">Smart Solutions</Link></li>
              <li><Link to="/farmer-hub" className="text-green-100 hover:text-white transition">Farmer Hub</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-300" />
                <span>support@krishirise.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-300" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-300" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} KrishiRise Platform. All rights reserved. Empowering Farmers with AI Technology.</p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Sprout, Bug, TrendingUp, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              From Soil to Sale
              <span className="block text-green-600 mt-2">One Stop AI Platform Maximizing Farmer Outcomes</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Helping farmers choose the right crop, prevent disease, and sell at the best price using AI
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition inline-flex items-center justify-center"
              >
                Register as Farmer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Smart Farming Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/crop-suggestion" className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition block">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Crop Recommendation</h3>
              <p className="text-gray-600">
                AI-powered suggestions for the best crops based on soil, climate, and market demand
              </p>
            </Link>

            <Link to="/disease-detection" className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition block">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Bug className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Disease Detection</h3>
              <p className="text-gray-600">
                Upload crop images to detect diseases early and get treatment recommendations
              </p>
            </Link>

            <Link to="/smart-solutions-plans" className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition block">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Solutions Plans</h3>
              <p className="text-gray-600">
                Analyze and maximize your income with data-driven insights and strategies
              </p>
            </Link>

            <Link to="/farmer-hub" className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition block">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Farmer Hub</h3>
              <p className="text-gray-600">
                Connect with buyers, check mandi prices, and access government schemes
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The Problem We Solve</h2>
          <p className="text-center text-gray-600 mb-12">Current challenges facing Indian farmers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">20-30%</div>
              <p className="text-gray-700 font-semibold">Crop loss due to disease</p>
              <p className="text-gray-500 text-sm mt-2">Early detection can prevent this</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">8-12%</div>
              <p className="text-gray-700 font-semibold">Post harvest loss</p>
              <p className="text-gray-500 text-sm mt-2">Better storage and timing needed</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">Low</div>
              <p className="text-gray-700 font-semibold">Selling prices reduce income</p>
              <p className="text-gray-500 text-sm mt-2">Market connection is crucial</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Transform Your Farming with AI</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Before Using Platform</h3>
                    <p className="text-green-100">Low income, high crop loss, uncertain decisions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">After Using Platform</h3>
                    <p className="text-green-100">Higher yield, better profit, lower disease loss</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Expected Improvements</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-semibold">Income Increase</span>
                  <span className="text-green-600 font-bold text-xl">+25-35%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-semibold">Disease Loss Reduction</span>
                  <span className="text-green-600 font-bold text-xl">-40-60%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-semibold">Better Crop Selection</span>
                  <span className="text-green-600 font-bold text-xl">+20-30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Market Price Optimization</span>
                  <span className="text-green-600 font-bold text-xl">+15-25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers already using AI to increase their income and reduce losses
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

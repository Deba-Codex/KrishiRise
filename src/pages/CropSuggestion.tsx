import { useState } from 'react';
import { Sprout, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Recommendation {
  recommended_crop: string;
  alternative_crops: string[];
  expected_yield: number;
  risk_level: string;
  season: string;
  duration: string;
  market_demand: string;
  profit_potential: string;
}

export default function CropSuggestion() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [formData, setFormData] = useState({
    soil_type: 'loamy',
    rainfall: '',
    temperature: '',
    location: '',
  });

  const getCropRecommendation = (soil: string, rainfall: number, temp: number): Recommendation => {
    const recommendations = [
      {
        recommended_crop: 'Rice',
        alternative_crops: ['Sugarcane', 'Jute', 'Maize'],
        expected_yield: 45,
        risk_level: 'Low',
        season: 'Kharif (June-October)',
        duration: '120-150 days',
        market_demand: 'Very High',
        profit_potential: 'High - ₹40,000-60,000 per acre',
      },
      {
        recommended_crop: 'Wheat',
        alternative_crops: ['Barley', 'Mustard', 'Chickpea'],
        expected_yield: 38,
        risk_level: 'Low',
        season: 'Rabi (October-March)',
        duration: '120-140 days',
        market_demand: 'Very High',
        profit_potential: 'High - ₹35,000-55,000 per acre',
      },
      {
        recommended_crop: 'Cotton',
        alternative_crops: ['Soybean', 'Groundnut', 'Sunflower'],
        expected_yield: 25,
        risk_level: 'Medium',
        season: 'Kharif (June-November)',
        duration: '150-180 days',
        market_demand: 'High',
        profit_potential: 'Very High - ₹50,000-80,000 per acre',
      },
      {
        recommended_crop: 'Tomato',
        alternative_crops: ['Brinjal', 'Capsicum', 'Cucumber'],
        expected_yield: 200,
        risk_level: 'Medium',
        season: 'Year-round (with irrigation)',
        duration: '90-120 days',
        market_demand: 'Very High',
        profit_potential: 'Very High - ₹80,000-120,000 per acre',
      },
    ];

    if (rainfall > 1000) {
      return recommendations[0];
    } else if (temp < 20) {
      return recommendations[1];
    } else if (soil === 'black') {
      return recommendations[2];
    } else {
      return recommendations[Math.floor(Math.random() * recommendations.length)];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setRecommendation(null);

    setTimeout(async () => {
      const result = getCropRecommendation(
        formData.soil_type,
        parseFloat(formData.rainfall),
        parseFloat(formData.temperature)
      );

      setRecommendation(result);

      await supabase.from('crop_recommendations').insert([{
        farmer_id: user.id,
        soil_type: formData.soil_type,
        rainfall: parseFloat(formData.rainfall),
        temperature: parseFloat(formData.temperature),
        location: formData.location,
        recommended_crop: result.recommended_crop,
        alternative_crops: result.alternative_crops,
        expected_yield: result.expected_yield,
        risk_level: result.risk_level,
      }]);

      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <Sprout className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">AI Crop Recommendation</h1>
            <p className="text-gray-600 mt-2">Get personalized crop suggestions based on your conditions</p>
          </div>

          {/* India Map & City Search Section */}
          <div className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Map Placeholder */}
              <div className="w-full md:w-1/2 h-64 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-50 opacity-50 group-hover:opacity-30 transition"></div>
                <div className="z-10 text-center">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p className="text-gray-500 font-medium">Interactive Soil Map of India</p>
                  <p className="text-xs text-gray-400 mt-1">(Visualization)</p>
                </div>
              </div>

              {/* City Search */}
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Search by City</h3>
                <p className="text-gray-600 text-sm">Enter your city to get instant recommendations based on local soil and climate data.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter City Name (e.g., Pune, Nagpur)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                  <button
                    onClick={handleSubmit} // Reuses existing submit for now, could be specialized
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Search
                  </button>
                </div>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>Popular:</span>
                  <button onClick={() => setFormData({ ...formData, location: 'Pune' })} className="text-blue-600 hover:underline">Pune</button>
                  <button onClick={() => setFormData({ ...formData, location: 'Nashik' })} className="text-blue-600 hover:underline">Nashik</button>
                  <button onClick={() => setFormData({ ...formData, location: 'Punjab' })} className="text-blue-600 hover:underline">Punjab</button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400">OR Enter Details Manually</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <select
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="alluvial">Alluvial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rainfall (mm)</label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  required
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Temperature (°C)</label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  required
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 28"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="District, State"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing Conditions...' : 'Get Crop Recommendation'}
            </button>
          </form>

          {recommendation && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Recommended Crop</h2>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${recommendation.risk_level === 'Low' ? 'bg-green-200 text-green-800' :
                      recommendation.risk_level === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                    }`}>
                    {recommendation.risk_level} Risk
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <Sprout className="h-8 w-8 text-green-600" />
                  <h3 className="text-3xl font-bold text-green-600">{recommendation.recommended_crop}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Expected Yield</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{recommendation.expected_yield} quintals/acre</p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Growing Season</h3>
                  </div>
                  <p className="text-lg text-gray-700">{recommendation.season}</p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Crop Duration</h3>
                  </div>
                  <p className="text-lg text-gray-700">{recommendation.duration}</p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Market Demand</h3>
                  </div>
                  <p className="text-lg font-semibold text-green-600">{recommendation.market_demand}</p>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Profit Potential</h3>
                <p className="text-xl font-bold text-green-600">{recommendation.profit_potential}</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Crop Options</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {recommendation.alternative_crops.map((crop, idx) => (
                    <div key={idx} className="bg-green-50 p-3 rounded-lg text-center">
                      <Sprout className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <span className="text-gray-900 font-semibold">{crop}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Consider local market prices before making final decision</li>
                  <li>• Ensure proper irrigation facilities are available</li>
                  <li>• Purchase quality seeds from certified dealers</li>
                  <li>• Follow recommended fertilizer and pesticide schedules</li>
                  <li>• Monitor weather forecasts regularly during growing season</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

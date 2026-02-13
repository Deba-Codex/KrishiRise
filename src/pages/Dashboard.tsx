import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Sprout, TrendingUp, Bug, Activity, Upload, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, CropHistory, DiseaseDetection } from '../lib/supabase';

export default function Dashboard() {
  const { farmerProfile } = useAuth();
  const [cropHistory, setCropHistory] = useState<CropHistory[]>([]);
  const [recentDetections, setRecentDetections] = useState<DiseaseDetection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!farmerProfile) return;

      const [historyResult, detectionsResult] = await Promise.all([
        supabase
          .from('crop_history')
          .select('*')
          .eq('farmer_id', farmerProfile.id)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('disease_detections')
          .select('*')
          .eq('farmer_id', farmerProfile.id)
          .order('detected_at', { ascending: false })
          .limit(3),
      ]);

      if (historyResult.data) setCropHistory(historyResult.data);
      if (detectionsResult.data) setRecentDetections(detectionsResult.data);
      setLoading(false);
    };

    fetchData();
  }, [farmerProfile]);

  if (!farmerProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const totalIncome = cropHistory.reduce((sum, crop) => sum + crop.income_earned, 0);
  const avgYield = cropHistory.length > 0
    ? cropHistory.reduce((sum, crop) => sum + crop.yield_amount, 0) / cropHistory.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{farmerProfile.name}</h1>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}</span>
                </div>
                <p className="text-gray-600 mt-1">Mobile: {farmerProfile.mobile}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Land Size</p>
              <p className="text-2xl font-bold text-gray-900">{farmerProfile.land_size} acres</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Soil Type</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">{farmerProfile.soil_type}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Main Crops</p>
              <p className="text-lg font-bold text-gray-900">{farmerProfile.main_crops.join(', ')}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Income Range</p>
              <p className="text-lg font-bold text-gray-900">₹{farmerProfile.annual_income_range}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Income</h2>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-1">From {cropHistory.length} crop cycles</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Average Yield</h2>
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{avgYield.toFixed(1)} qtl</p>
            <p className="text-gray-500 text-sm mt-1">Per crop cycle</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Health Checks</h2>
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{recentDetections.length}</p>
            <p className="text-gray-500 text-sm mt-1">Recent disease scans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/disease-detection"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <Bug className="h-8 w-8 text-green-600" />
              <Upload className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Disease Detection</h3>
            <p className="text-gray-600 text-sm">Upload crop images for instant AI analysis</p>
          </Link>

          <Link
            to="/crop-suggestion"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <Sprout className="h-8 w-8 text-green-600" />
              <Activity className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Suggestion</h3>
            <p className="text-gray-600 text-sm">Get AI recommendations for best crops</p>
          </Link>

          <Link
            to="/profit-analysis"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <Activity className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profit Analysis</h3>
            <p className="text-gray-600 text-sm">View income growth and projections</p>
          </Link>

          <div className="bg-green-600 text-white rounded-xl shadow-md p-6 hover:shadow-lg transition group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="h-8 w-8" />
              <Activity className="h-5 w-5 opacity-75 group-hover:opacity-100 transition" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
            <p className="text-green-100 text-sm">Chat for instant farming advice</p>
          </div>
        </div>

        {recentDetections.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Disease Detections</h2>
            <div className="space-y-3">
              {recentDetections.map((detection) => (
                <div key={detection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{detection.disease_name}</h3>
                    <p className="text-sm text-gray-600">{detection.crop_type} - {new Date(detection.detected_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    detection.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                    detection.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {detection.risk_level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {cropHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Crop History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Crop</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Season</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Year</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Yield (qtl)</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Income</th>
                  </tr>
                </thead>
                <tbody>
                  {cropHistory.map((crop) => (
                    <tr key={crop.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{crop.crop_name}</td>
                      <td className="py-3 px-4 capitalize">{crop.season}</td>
                      <td className="py-3 px-4">{crop.year}</td>
                      <td className="py-3 px-4">{crop.yield_amount}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">₹{crop.income_earned.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

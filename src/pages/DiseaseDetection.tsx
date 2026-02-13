import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface DetectionResult {
  disease_name: string;
  risk_level: 'low' | 'medium' | 'high';
  treatment_advice: string;
  prevention_tips: string[];
  fertilizer_guidance: string;
}

export default function DiseaseDetection() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const mockDetection = (crop: string): DetectionResult => {
    const diseases = [
      {
        disease_name: 'Early Blight',
        risk_level: 'medium' as const,
        treatment_advice: 'Apply copper-based fungicides like Mancozeb or Chlorothalonil. Remove affected leaves and ensure proper spacing for air circulation.',
        prevention_tips: [
          'Rotate crops every season',
          'Use disease-resistant varieties',
          'Maintain proper plant spacing',
          'Avoid overhead watering',
        ],
        fertilizer_guidance: 'Use balanced NPK (19:19:19) with micronutrients. Avoid excess nitrogen which promotes disease.',
      },
      {
        disease_name: 'Powdery Mildew',
        risk_level: 'low' as const,
        treatment_advice: 'Spray sulfur-based fungicides or neem oil solution. Improve air circulation and reduce humidity around plants.',
        prevention_tips: [
          'Plant in sunny locations',
          'Water early in the morning',
          'Remove infected plant parts',
          'Use resistant varieties',
        ],
        fertilizer_guidance: 'Apply potassium-rich fertilizer (0:0:50) to strengthen plant immunity. Avoid excessive nitrogen.',
      },
      {
        disease_name: 'Leaf Rust',
        risk_level: 'high' as const,
        treatment_advice: 'Immediate application of systemic fungicides like Propiconazole. Remove and destroy infected leaves to prevent spread.',
        prevention_tips: [
          'Plant resistant cultivars',
          'Ensure proper drainage',
          'Remove crop residue after harvest',
          'Monitor regularly for early detection',
        ],
        fertilizer_guidance: 'Use balanced NPK with emphasis on potassium (12:32:16). Apply zinc and iron supplements.',
      },
    ];

    return diseases[Math.floor(Math.random() * diseases.length)];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetection = async () => {
    if (!selectedImage || !cropType || !user) return;

    setLoading(true);
    setResult(null);

    setTimeout(async () => {
      const detectionResult = mockDetection(cropType);
      setResult(detectionResult);

      await supabase.from('disease_detections').insert([{
        farmer_id: user.id,
        crop_type: cropType,
        disease_name: detectionResult.disease_name,
        risk_level: detectionResult.risk_level,
        image_url: null,
        treatment_advice: detectionResult.treatment_advice,
      }]);

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">AI Disease Detection</h1>
            <p className="text-gray-600 mt-2">Upload crop images for instant disease analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop Type</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose crop...</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="maize">Maize</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Crop Image</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {selectedImage && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Image</h3>
              <div className="flex justify-center">
                <img
                  src={selectedImage}
                  alt="Crop"
                  className="max-w-md rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleDetection}
            disabled={!selectedImage || !cropType || loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing Image...' : 'Detect Disease'}
          </button>

          {result && (
            <div className="mt-8 space-y-6">
              <div className={`p-6 rounded-xl ${
                result.risk_level === 'high' ? 'bg-red-50 border-2 border-red-200' :
                result.risk_level === 'medium' ? 'bg-yellow-50 border-2 border-yellow-200' :
                'bg-green-50 border-2 border-green-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Detection Result</h2>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    result.risk_level === 'high' ? 'bg-red-200 text-red-800' :
                    result.risk_level === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {result.risk_level.toUpperCase()} RISK
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <AlertCircle className={`h-6 w-6 ${
                    result.risk_level === 'high' ? 'text-red-600' :
                    result.risk_level === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                  <h3 className="text-xl font-semibold text-gray-900">{result.disease_name}</h3>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Treatment Advice
                </h3>
                <p className="text-gray-700">{result.treatment_advice}</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Prevention Tips</h3>
                <ul className="space-y-2">
                  {result.prevention_tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Fertilizer Guidance</h3>
                <p className="text-gray-700">{result.fertilizer_guidance}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

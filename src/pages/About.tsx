import { Users, Heart, Zap, Database, Cpu, Sprout } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About KrishiRise Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering Indian farmers with cutting-edge AI technology for smarter, sustainable, and profitable agriculture.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1625246333195-bf79134a6ef5?auto=format&fit=crop&q=80&w=1000"
              alt="Indian Farmer using technology"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              At KrishiRise, we believe that technology can transform agriculture. Our mission is to bridge the gap between traditional farming wisdom and modern AI capabilities.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              We provide accessible, easy-to-use tools that help farmers make data-driven decisions about their crops, soil health, and market opportunities.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="text-2xl font-bold text-green-600 mb-1">50k+</div>
                <div className="text-gray-600">Farmers Helped</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Collection</h3>
              <p className="text-gray-600">
                You provide basic information about your soil, location, and crop conditions through our simple interface.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                KrishiRise uses artificial intelligence to analyze soil conditions, weather patterns, disease indicators, and
                market trends to provide personalized recommendations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
              <p className="text-gray-600">
                Receive clear, actionable advice on what to plant, when to harvest, and how to treat diseases to maximize your yield.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Why AI for Agriculture?</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">The Challenge</h3>
              <p className="text-gray-700 leading-relaxed">
                Indian farmers face numerous challenges: unpredictable weather, disease outbreaks, market price fluctuations,
                and lack of access to modern farming knowledge. These factors contribute to crop losses of 20-30% and
                reduced income potential.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Solution</h3>
              <p className="text-gray-700 leading-relaxed">
                KrishiRise uses artificial intelligence to analyze soil conditions, weather patterns, disease indicators, and
                market trends to provide personalized recommendations. Our platform makes advanced agricultural science
                accessible to every farmer through simple, easy-to-use tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">The Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Farmers using our platform see significant improvements: higher yields, reduced losses, better crop selection,
                and increased profitability. We are building a network of successful farmers who are transforming their
                livelihoods through technology.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Who We Serve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Farmers</h3>
              <p className="text-gray-700">
                Our primary focus is empowering small and medium farmers with AI tools that were previously accessible
                only to large agricultural corporations. Whether you farm 2 acres or 200 acres, our platform is designed
                to help you succeed.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Agriculture Officers</h3>
              <p className="text-gray-700">
                Government and private agriculture extension workers can use our platform to provide better guidance
                to farmers, track disease outbreaks, and monitor crop health across their jurisdictions.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Buyers</h3>
              <p className="text-gray-700">
                Agricultural buyers and processors can connect directly with farmers producing the crops they need,
                ensuring quality produce and fair prices for both parties.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Researchers</h3>
              <p className="text-gray-700">
                Agricultural researchers and institutions can access aggregated data to study crop patterns, disease
                spread, and farming practices to develop better solutions for Indian agriculture.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-xl shadow-md p-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
          <p className="text-lg text-green-100 max-w-3xl mx-auto mb-6">
            We are committed to using AI for social good and transforming the lives of millions of farmers across India.
            Every feature we build, every algorithm we train, and every decision we make is guided by one principle:
            empowering farmers to thrive in modern agriculture.
          </p>
          <p className="text-xl font-semibold text-white">
            From Soil to Sale - Maximizing Farmer Outcomes with AI
          </p>
        </div>
      </div>
    </div>
  );
}

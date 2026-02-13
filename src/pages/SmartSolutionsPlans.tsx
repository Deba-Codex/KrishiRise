import { TrendingUp, AlertCircle, CheckCircle, BarChart, Sprout, ShieldCheck, DollarSign, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmartSolutionsPlans() {
    const currentIncome = 250000;
    const potentialIncome = 337500;
    const improvementPercent = 35;

    const diseaseLossCurrent = 60000;
    const diseaseLossAfterAI = 15000;
    const diseaseSavings = 45000;

    const crops = [
        { name: 'Rice', currentProfit: 45000, aiProfit: 60750 },
        { name: 'Wheat', currentProfit: 40000, aiProfit: 54000 },
        { name: 'Cotton', currentProfit: 65000, aiProfit: 91000 },
        { name: 'Tomato', currentProfit: 90000, aiProfit: 121500 },
    ];

    const BarGraph = ({ value, maxValue, color, label }: { value: number; maxValue: number; color: string; label: string }) => {
        const percentage = (value / maxValue) * 100;
        return (
            <div className="mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-semibold text-gray-900">₹{value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                    <div
                        className={`${color} h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-semibold transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    >
                        {percentage > 15 && `${Math.round(percentage)}%`}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8 text-center">
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                        <TrendingUp className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Smart Solutions Plans</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Comprehensive strategies to maximize your farm's potential through AI-driven insights,
                        optimized resource usage, and market timing.
                    </p>
                </div>

                {/* Pricing Plans Section */}
                <div className="mb-12" id="pricing">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Choose Your Smart Farming Plan</h2>
                        <p className="text-gray-600 mt-2">Unlock the full potential of AI for your farm</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-green-200 transition-all relative">
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Kisan Basic</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">Free</span>
                                </div>
                                <p className="text-gray-600 mb-6 text-sm">Essential tools for every farmer to get started with smart agriculture.</p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Unlimited AI Queries</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Disease Detection & Advice</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Fertilizer & Soil Guidance</span>
                                    </li>
                                    <li className="flex items-center">
                                        <X className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0" />
                                        <span className="text-gray-400">Smart Profit Analysis</span>
                                    </li>
                                    <li className="flex items-center">
                                        <X className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0" />
                                        <span className="text-gray-400">Modern Tech Solutions</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-gray-100 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                                    Get Started Free
                                </button>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-500 relative transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                Recommended
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Kisan Pro</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">₹249</span>
                                    <span className="text-gray-500 ml-2">/month</span>
                                </div>
                                <p className="text-gray-600 mb-6 text-sm">Advanced insights and technology for the modern, profitable farm.</p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Everything in Basic</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-900 font-medium">Smart Profit Solutions</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-900 font-medium">Modern Tech (Drone/IoT) Support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Advanced Market Predictions</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">Priority Expert Support</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg">
                                    Upgrade to Pro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 font-medium">Current Income</span>
                            <DollarSign className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹{currentIncome.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-1">Annual projected</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 font-medium">Potential Income</span>
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹{potentialIncome.toLocaleString()}</p>
                        <p className="text-sm text-green-600 font-medium mt-1">+{improvementPercent}% Growth</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 font-medium">Disease Savings</span>
                            <ShieldCheck className="h-5 w-5 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹{diseaseSavings.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-1">Loss avoided</p>
                    </div>
                </div>

                {/* Detailed Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Income Comparison Chart */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <BarChart className="h-5 w-5 mr-2 text-green-600" />
                            Income Projection
                        </h2>
                        <BarGraph
                            value={currentIncome}
                            maxValue={potentialIncome}
                            color="bg-blue-500"
                            label="Current Strategy"
                        />
                        <BarGraph
                            value={potentialIncome}
                            maxValue={potentialIncome}
                            color="bg-green-500"
                            label="With Smart Solutions"
                        />
                        <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-gray-900">Projected Gain: ₹{(potentialIncome - currentIncome).toLocaleString()}</p>
                                <p className="text-sm text-gray-600">By optimizing crop selection and timing.</p>
                            </div>
                        </div>
                    </div>

                    {/* Disease Impact Chart */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                            Risk Mitigation
                        </h2>
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-gray-600">Loss Risk</span>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                <div className="bg-red-500 h-full" style={{ width: '25%' }}></div>
                                <div className="bg-green-500 h-full" style={{ width: '5%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Traditional (20-30%)</span>
                                <span>AI Monitored (&lt;8%)</span>
                            </div>
                        </div>

                        <BarGraph
                            value={diseaseLossCurrent}
                            maxValue={diseaseLossCurrent}
                            color="bg-red-500"
                            label="Potential Loss (Unchecked)"
                        />
                        <BarGraph
                            value={diseaseLossAfterAI}
                            maxValue={diseaseLossCurrent}
                            color="bg-green-500"
                            label="Loss with AI Detection"
                        />
                    </div>
                </div>

                {/* Strategy Breakdown */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Solution Strategies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-4 border rounded-xl hover:shadow-md transition bg-green-50/50">
                            <div className="bg-white p-3 rounded-full w-fit mb-3 shadow-sm">
                                <Sprout className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Crop Rotation</h3>
                            <p className="text-sm text-gray-600">Scientific rotation plans to maintain soil health and maximize yield.</p>
                            <span className="inline-block mt-3 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">+25% Yield</span>
                        </div>

                        <div className="p-4 border rounded-xl hover:shadow-md transition bg-blue-50/50">
                            <div className="bg-white p-3 rounded-full w-fit mb-3 shadow-sm">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Pest Management</h3>
                            <p className="text-sm text-gray-600">Early warning systems and targeted pesticide application.</p>
                            <span className="inline-block mt-3 text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">-80% Loss</span>
                        </div>

                        <div className="p-4 border rounded-xl hover:shadow-md transition bg-yellow-50/50">
                            <div className="bg-white p-3 rounded-full w-fit mb-3 shadow-sm">
                                <Calendar className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Market Timing</h3>
                            <p className="text-sm text-gray-600">AI predictions to sell your produce when prices are highest.</p>
                            <span className="inline-block mt-3 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">+15% Profit</span>
                        </div>

                        <div className="p-4 border rounded-xl hover:shadow-md transition bg-purple-50/50">
                            <div className="bg-white p-3 rounded-full w-fit mb-3 shadow-sm">
                                <DollarSign className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Cost Optimization</h3>
                            <p className="text-sm text-gray-600">Efficient use of fertilizers and water to reduce input costs.</p>
                            <span className="inline-block mt-3 text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded">-10% Costs</span>
                        </div>
                    </div>
                </div>

                {/* Crop Comparison Profit Chart */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <BarChart className="h-6 w-6 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Crop Comparison Profit Chart</h2>
                    </div>
                    <p className="text-gray-600 mb-6">Expected profit improvement for different crops with AI guidance</p>

                    <div className="space-y-6">
                        {crops.map((crop) => (
                            <div key={crop.name} className="border-2 border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">{crop.name}</h3>
                                <div className="space-y-3">
                                    <BarGraph
                                        value={crop.currentProfit}
                                        maxValue={crop.aiProfit}
                                        color="bg-blue-500"
                                        label="Current Profit"
                                    />
                                    <BarGraph
                                        value={crop.aiProfit}
                                        maxValue={crop.aiProfit}
                                        color="bg-green-500"
                                        label="Profit with AI"
                                    />
                                    <div className="flex justify-between text-sm pt-2 border-t">
                                        <span className="text-gray-600">Improvement</span>
                                        <span className="font-bold text-green-600">
                                            +₹{(crop.aiProfit - crop.currentProfit).toLocaleString()} ({Math.round(((crop.aiProfit - crop.currentProfit) / crop.currentProfit) * 100)}%)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                {/* CTA Section */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Start Your Smart Farming Journey</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
                        Implement these strategies today. Use our tools to get specific recommendations for your farm.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/crop-suggestion" className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-md">
                            Get Crop Suggestion
                        </Link>
                        <Link to="/disease-detection" className="bg-green-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-900 transition shadow-md">
                            Scan for Diseases
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

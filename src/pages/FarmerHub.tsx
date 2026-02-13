import { Construction } from 'lucide-react';

export default function FarmerHub() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 max-w-md">
                <div className="bg-green-100 p-6 rounded-full inline-block mb-6">
                    <Construction className="h-16 w-16 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Farmer Hub</h1>
                <p className="text-gray-600 text-lg mb-8">
                    We are hard at work building a comprehensive market connection platform for you.
                    Soon you'll be able to connect directly with buyers and access real-time mandi prices.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">Coming Soon</p>
                </div>
            </div>
        </div>
    );
}

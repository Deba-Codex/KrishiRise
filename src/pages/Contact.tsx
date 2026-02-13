import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We're here to help you succeed in your farming journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-3">Toll-free helpline for all farmers</p>
            <p className="text-lg font-semibold text-green-600">+91 1800-XXX-XXXX</p>
            <p className="text-sm text-gray-500 mt-1">Available in Hindi, English, and regional languages</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-3">Get detailed assistance via email</p>
            <p className="text-lg font-semibold text-green-600">support@krishirise.in</p>
            <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Location</h3>
            <p className="text-gray-600 mb-3">Visit our headquarters</p>
            <p className="text-lg font-semibold text-gray-900">New Delhi, India</p>
            <p className="text-sm text-gray-500 mt-1">Krishi Bhawan Complex, Agricultural Wing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="technical">Technical Support</option>
                    <option value="farming">Farming Question</option>
                    <option value="disease">Disease Detection Help</option>
                    <option value="crop">Crop Recommendation</option>
                    <option value="account">Account Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Support Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-700">Saturday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-semibold text-red-600">Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                For urgent issues outside business hours, please send an email and we'll respond first thing next business day.
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
              <p className="text-gray-700 mb-4">
                For immediate assistance, try our AI Assistant available 24/7 on every page. It can help you with:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Crop recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Disease identification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Fertilizer guidance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Market price information</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Support</h3>
              <p className="text-gray-700 mb-4">
                We provide support in multiple Indian languages to ensure every farmer can access our services:
              </p>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Hindi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>English</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Marathi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Punjabi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Tamil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Telugu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

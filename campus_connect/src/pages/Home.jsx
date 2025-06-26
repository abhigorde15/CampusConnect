
import { Toaster, toast } from 'react-hot-toast';

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
    <div className="text-2xl font-bold text-blue-600">KKW Connect</div>
    <ul className="flex space-x-6 text-gray-700 font-medium">
      <li className="hover:text-blue-600 cursor-pointer">Home</li>
      <li className="hover:text-blue-600 cursor-pointer">Notes</li>
      <li className="hover:text-blue-600 cursor-pointer">Chat Groups</li>
      <li className="hover:text-blue-600 cursor-pointer">Marketplace</li>
      <li className="hover:text-blue-600 cursor-pointer">Events</li>
    </ul>
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button>
  </nav>
);

const Hero = () => (
  <section className="text-center py-16 px-4 bg-gray-50">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
      Helping KK wagh Students Stay Connected, Learn, and Grow!
    </h1>
    <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
      A one-stop platform for all your academic and social needs.
    </p>
    <div className="space-x-4">
      <button
        onClick={() => toast.success('Redirecting to signup...')}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Join Now
      </button>
      <button
        onClick={() => toast.error('Login required to upload notes')}
        className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
      >
        Upload Notes
      </button>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow hover:shadow-lg transition p-6 rounded-lg flex flex-col items-center text-center cursor-pointer">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

const Features = () => (
  <section className="py-12 px-4 bg-white">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Features Highlights</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      <FeatureCard icon="📚" title="Share and Access Notes" description="Upload and download study materials" />
      <FeatureCard icon="💬" title="Chat with Groups in Real-Time" description="Join conversations with classmates" />
      <FeatureCard icon="🛒" title="Buy & Sell Second-hand Products" description="List items like books and electronics" />
      <FeatureCard icon="🤖" title="Ask Our Smart Chatbot" description="Coming Soon" />
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6">
    <p>&copy; {new Date().getFullYear()} KKW Connect. Made for students by students.</p>
  </footer>
);

export default function HomePage() {
  return (
    <div className="font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

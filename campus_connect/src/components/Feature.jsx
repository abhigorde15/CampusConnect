import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard"
const Features = () => {
  return (
    <section className="px-4 bg-white p-1">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-20">
        Features Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <Link to="/notes" className="contents">
          <FeatureCard icon="📚" title="Share and Access Notes" description="Upload and download study materials" />
        </Link>

        <Link to="/chat_groups" className="contents">
          <FeatureCard icon="💬" title="Chat with Groups in Real-Time" description="Join conversations with classmates" />
        </Link>

        <Link to="/marketplace" className="contents">
          <FeatureCard icon="🛒" title="Buy & Sell Second-hand Products" description="List items like books and electronics" />
        </Link>

        <Link to="" className="contents">
          <FeatureCard icon="🤖" title="Ask Our Smart Chatbot" description="Coming Soon" />
        </Link>
      </div>
    </section>
  );
};
export default Features;

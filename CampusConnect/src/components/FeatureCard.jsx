const FeatureCard = ({ icon, title, description }) => { 
  return (<div className="bg-white shadow hover:shadow-lg transition  rounded-lg flex flex-col items-center text-center cursor-pointer">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>)
}
export default FeatureCard;
import { FaClock, FaShieldAlt, FaThumbsUp } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { icon: <FaClock />, title: "Fast Booking", desc: "Book tickets in just 30 seconds." },
    { icon: <FaShieldAlt />, title: "Secure Payment", desc: "100% safe & encrypted payment." },
    { icon: <FaThumbsUp />, title: "Trusted Service", desc: "Thousands of happy customers." }
  ];

  return (
    <div className="p-0 lg:p-6 py-10 w-11/12 mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Why Choose Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((f, index) => (
          <div
            key={index}
            className="p-5  rounded-xl shadow-sm text-center hover:shadow-md transition"
          >
            <div className="flex justify-center items-center text-4xl text-primary mb-3">
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { WhyChooseUs };

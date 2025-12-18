// import { FaBus, FaTrain, FaPlaneDeparture } from "react-icons/fa";

import { FaBus,   FaPlaneDeparture,   FaShip,   FaTrain } from "react-icons/fa";

const PopularRoutes = () => {
  const routes = [
    { icon: <FaBus />, from: "Dhaka", to: "Chittagong", type: "Bus" },
    { icon: <FaTrain />, from: "Sylhet", to: "Dhaka", type: "Train" },
    { icon: <FaPlaneDeparture />, from: "Dhaka", to: "Rajshahi", type: "Bus" },
    { icon: <FaShip/>, from: "Dhaka", to: "Sylhet", type: "Flight" }
  ];

  return (
    <div className="p-6 py-10 w-11/12 mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Popular Routes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {routes.map((route, index) => (
          <div
            key={index}
            className=" p-4  rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="text-3xl mb-2 text-primary">{route.icon}</div>
            <h3 className="font-semibold">{route.from} → {route.to}</h3>
            <p className="text-sm text-gray-600">{route.type} Service</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PopularRoutes };

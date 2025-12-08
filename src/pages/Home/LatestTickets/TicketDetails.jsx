import useAxiosSecure from "../../../hook/useAxiosecure";
import { Link, useParams } from "react-router";
// import { ArrowLeft, Bus, Calendar, Clock, MapPin, MapPinCheck, Ticket, User } from "lucide";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide";
import { FaArrowLeft, FaBus, FaCalendar, FaMap, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { LuMapPinned } from "react-icons/lu";
import { BsClockFill } from "react-icons/bs";
import { IoPricetagsSharp } from "react-icons/io5";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const ticketModalRef = useRef(null)
  const {register,handleSubmit}=useForm()
  
  const { data: ticket = [], isLoading } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-20 text-xl font-semibold animate-pulse">
        Loading ticket details...
      </div>
    );
  const handleModalRef = () => {
    ticketModalRef.current.showModal()
  }
  
  const handleTicketSubmit=(data)=>{
    
    const bookingInfo ={
      ticket_title:ticket.ticketTitle,
      image:ticket.image,
      quantity:Number(data.ticketQuantity),
      total_price:ticket.price*Number(data.ticketQuantity),
      from:ticket.from,
      to:ticket.to,
      date:ticket.date,
      time:ticket.time,
      

    }
    console.log(data,bookingInfo)
    axiosSecure.post('/bookings',bookingInfo)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
    
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-semibold mb-6 hover:text-primary/80 transition"
        >
          <RiArrowLeftCircleFill size={38} />
          {/* <TiArrowLeftThick /> */}
          {/* <FaArrowLeft></FaArrowLeft> */}
          {/* <ArrowLeft size={20} /> Back */}
        </Link>

        {/* Ticket Card */}


        {/* <form onSubmit={handleSubmit(handleTicketSubmit)}> */}

        <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl overflow-hidden">

          {/* Header Image */}
          <div className="h-64 w-full overflow-hidden relative">
            <img
              src={ticket.image}
              alt={ticket.ticketTitle}
              className="w-full h-full object-cover"
            />

            <div  className="absolute bottom-3 left-3 px-4 py-1 bg-black/50 text-white text-sm rounded-full">
              {ticket.transport}
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 space-y-6">

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 logo">
              {ticket.ticketTitle}
            </h1>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 text-gray-800">

              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <FaUser></FaUser>
                  {/* <User size={18} className="text-primary" /> */}
                  <span className="font-semibold">Name:</span> {ticket.name}
                </p>

                <p className="flex items-center gap-2">
                  <FaBus></FaBus>
                  {/* <Bus size={18} className="text-primary" /> */}
                  <span className="font-semibold">Transport:</span> {ticket.transport}
                </p>

                <p className="flex items-center gap-2">
                  <FaTicket></FaTicket>
                  {/* <Ticket size={18} className="text-primary" /> */}
                  <span className="font-semibold">Quantity:</span> {ticket.ticketQuantity}
                </p>

                <p className="flex items-center gap-2">
                  <IoPricetagsSharp />
                  <span className="font-semibold">Price:</span> ৳ {ticket.price}
                </p>
              </div>

              <div className="space-y-3">

                <p className="flex items-center gap-2">
                  <FaMap></FaMap>
                  {/* <MapPinCheck size={18} className="text-primary" /> */}
                  <span className="font-semibold">From:</span> {ticket.from}
                </p>

                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {/* <LuMapPinned /> */}
                  {/* <MapPinCheck
                   size={18} className="text-primary" /> */}
                  <span className="font-semibold">To:</span> {ticket.to}
                </p>

                <p className="flex items-center gap-2">
                  <FaCalendar></FaCalendar>
                  {/* <Calendar size={18} className="text-primary" /> */}
                  <span className="font-semibold">Date:</span> {ticket.date}
                </p>

                <p className="flex items-center gap-2">
                  <BsClockFill />
                  {/* <Clock size={18} className="text-primary" /> */}
                  <span className="font-semibold">Time:</span> {ticket.time}
                </p>

              </div>
            </div>

            {/* Perks */}
            {ticket.perks?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Perks Included</h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.perks.map((perk, i) => (
                    <span
                      key={i}
                      className="bg-primary/20 text-primary px-3 py-1 text-xs rounded-full"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-dashed border-gray-400 my-4"></div>

            {/* Verification */}
            <p
            //  {...register('status')}
              className={`font-semibold text-sm ${ticket.status === "approved"
                ? "text-green-600"
                : ticket.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
                }`}
            >
              Status: Pending
               {/* {ticket.verificationStatus} */}
            </p>


            <div className="pt-4">
              <button
                onClick={handleModalRef}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold
                 text-lg hover:bg-primary/80 transition">
                Book This Ticket
              </button>
            </div>


            {/* modal pages */}



            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={ticketModalRef} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Ticket Quantity</h3>
                <form onSubmit={handleSubmit(handleTicketSubmit)}>


                <fieldset className="fieldset space-y-4">
                  <legend className="fieldset-legend"></legend>
                  <input type="number"
                    {...register('ticketQuantity',{required:true})}
                  className="input w-full" placeholder="Ticket Quantity" />
                  <button className="btn btn-primary">Submit</button>

                </fieldset>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>



          </div>


        </div>
        {/* </form> */}


      </div>
    </div>
  );
};

export default TicketDetails;

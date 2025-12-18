import useAxiosSecure from "../../../hook/useAxiosecure";
import { Link, useNavigate, useParams } from "react-router";
// import { ArrowLeft, Bus, Calendar, Clock, MapPin, MapPinCheck, Ticket, User } from "lucide";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide";
import { FaArrowLeft, FaBus, FaCalendar, FaMap, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { LuMapPinned } from "react-icons/lu";
import { BsClockFill } from "react-icons/bs";
import { IoPricetagsSharp } from "react-icons/io5";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { useRef, } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import useAuth from "../../../hook/useAuth";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const ticketModalRef = useRef(null)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
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

  const handleTicketSubmit = (data) => {

    const bookingInfo = {
      ticketId: ticket._id,
      name: user.displayName,
      // email:ticket.email,
      ticket_title: ticket.ticketTitle,
      image: ticket.image,
      bookingQuantity: Number(data.bookingQuantity),
      ticketQuantity: Number(ticket.ticketQuantity),
      total_price: ticket.price * Number(data.bookingQuantity),
      from: ticket.from,
      to: ticket.to,
      departureDateTime: ticket.departureDateTime,
      // time: ticket.time,


    }
    console.log(data, bookingInfo)
    axiosSecure.post('/bookings', bookingInfo)
      .then(res => {
        ticketModalRef.current.close()
        navigate('/dashboard/myBookedTickets')
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const isSoldOut = ticket.ticketQuantity === 0;
  //  const isBookingOverLimit=ticket.ticketQuantity>ticketQuantity
  // countdown 
  const isExpired = new Date(ticket.departureDateTime) < new Date();
  const targetDateTime = ticket.departureDateTime
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 text-center font-bold">Expired</span>;
    }

    return (
      <div className="flex gap-3 text-3xl font-bold justify-center">
        <div>{days}d</div>
        <div>{hours}h</div>
        <div>{minutes}m</div>
        <div>{seconds}s</div>
      </div>
    );
  };
  return (
    <div className="min-h-screen  py-10 px-4 text-base-content">

      <div className="max-w-4xl mx-auto">

        {/* Back button */}

        <Link to="/" className="">

          <button className="bg-base-100 btn text-center w-48 rounded-2xl h-14 relative text-base-content  text-xl font-semibold group" type="button">
            <div className="bg-primary rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
              </svg>
            </div>
            <p className="translate-x-2 ">Go Back</p>
          </button>
        </Link>

        {/* Ticket Card */}


        {/* <form onSubmit={handleSubmit(handleTicketSubmit)}> */}

        <div className=" border border-white/40 shadow-xl rounded-2xl overflow-hidden mt-5">

          {/* Header Image */}
          <div className="h-64 w-full overflow-hidden relative">
            <img
              src={ticket.image}
              alt={ticket.ticketTitle}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-3 left-3 px-4 py-1 bg-black/50  text-sm rounded-full">
              {ticket.transport}
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 space-y-6">

            {/* Title */}
            <h1 className="text-3xl font-bold  logo">
              {ticket.ticketTitle}
            </h1>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 ">

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
                  <span className="font-semibold">Date:</span> {ticket.departureDateTime}
                </p>

                {/* <p className="flex items-center gap-2">
                  <BsClockFill />
                
                  <span className="font-semibold">Time:</span> {ticket.time}
                </p> */}

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
            {/* <p
             
              className={`font-semibold text-sm ${ticket.status === "approved"
                ? "text-primary"
                : ticket.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
                }`}
            >
              Status: Pending
              
            </p> */}

            {targetDateTime && (
              <Countdown
                date={targetDateTime}
                renderer={countdownRenderer}
                className="font-bold text-2xl"
              />
            )}

            {/* <Countdown
             date={new Date(`${ticket.date}T${ticket.time || "00:00"}:00`)}
              renderer={countdownRenderer}
              className="font-bold text-2xl" /> */}

            <div className="pt-4">
              <button
                disabled={isExpired || isSoldOut}
                onClick={handleModalRef}
                className={`w-full py-3 cursor-pointer  rounded-xl font-semibold
                 text-lg ${(isExpired || isSoldOut) ? " bg-primary cursor-not-allowed"
                    : "bg-primary hover:bg-primary/80 text-white"}  transition`}>
                Book This Ticket
              </button>
            </div>


            {/* modal pages */}



            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={ticketModalRef} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Booking Quantity</h3>
                <form onSubmit={handleSubmit(handleTicketSubmit)}>


                  <fieldset className="fieldset space-y-4">
                    <legend className="fieldset-legend"></legend>

                    <input type="number"
                      {...register('bookingQuantity', {
                        required: true,
                        min: {
                          value: 1,
                          message: "Minimum quantity is 1"
                        },
                        max: {
                          value: ticket.ticketQuantity,
                          message: "Booking quantity can’t be greater than ticket quantity"
                        }
                      })}
                      className="input w-full" placeholder="Booking Quantity" />
                    {
                      errors.bookingQuantity && (
                        <p className="text-red-500 mt-1 text-sm font-bold">{errors.bookingQuantity.message}</p>
                      )
                    }
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

import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosecure';
import Swal from 'sweetalert2';
import Loader from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { useForm } from 'react-hook-form';

const MyAddedTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [selectedTicket, setSelectedTicket] = useState(null)
    // const [editMode, setEditMode] = useState(false)
    // const { register, handleSubmit, formState: { errors } } = useForm()
    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ['tickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user?.email}`)
            return res.data;

        }
    })
    const ticketModalRef = useRef(null)
    const handleTicketShowModal = () => {
        ticketModalRef.current.showModal()
    }
    const perks = ["AC", "Breakfast", "WiFi", "TV", "Parking"];
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleTicketUpdate = (data) => {
        let imageUrl = selectedTicket.image;


        if (data.image && data.image.length > 0) {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`, formData)
                .then(imgRes => {
                    imageUrl = imgRes.data.data.url;

                    const updatedTicket = {
                        ...data,
                        image: imageUrl,
                        perks: data.perks || [],
                    };

                    return axiosSecure.patch(`/tickets/${selectedTicket._id}`, updatedTicket);
                })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        toast.success('Ticket updated successfully!');
                        refetch();
                        ticketModalRef.current.close();
                    } else {
                        toast.info('No changes were made.');
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Update failed!');
                });

        } else {

            const updatedTicket = {
                ...data,
                image: imageUrl,
                perks: data.perks || [],
            };

            axiosSecure.patch(`/tickets/${selectedTicket._id}`, updatedTicket)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        toast.success('Ticket updated successfully!');
                        refetch();
                        ticketModalRef.current.close();
                    } else {
                        toast.info('No changes were made.');
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Update failed!');
                });
        }
    };


    const handleTicketRemove = (id) => {

        Swal.fire({
            title: "Are you sure want to delete this ticket?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {

                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your ticket has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className="p-6 text-base-content px-5 lg:px-10">
            <h1 className="text-2xl font-bold  mb-8 text-center">My Added Tickets</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tickets.map(ticket => (
                    <div
                        key={ticket._id}
                        className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden
                         transform transition hover:-translate-y-1 hover:shadow-2xl "
                    >
                        {/* Ticket Image */}
                        <div className="h-48 overflow-hidden">
                            <img
                                src={ticket.image}
                                alt={ticket.ticketTitle}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Ticket Content */}
                        <div className="p-5 space-y-3">
                            <h2 className="text-[28px] font-bold logo ">{ticket.ticketTitle}</h2>
                            <p className=""><span className="font-semibold">Name:</span> {ticket.name}</p>
                            <p className=""><span className="font-semibold">From:</span> {ticket.from}</p>
                            <p className=""><span className="font-semibold">To:</span> {ticket.to}</p>
                            <p className=""><span className="font-semibold">Transport:</span> {ticket.transport}</p>
                            {/* <p className=""><span className="font-semibold">Time:</span> {ticket.time}</p> */}
                            <p className=""><span className="font-semibold">Quantity:</span> {ticket.ticketQuantity}</p>
                            <p className=""><span className="font-semibold">Price:</span> ৳ {ticket.price}</p>
                            <p className=""><span className="font-semibold">Email:</span> {ticket.email}</p>
                            <p className=""><span className="font-semibold">Date & Time:</span> {ticket.departureDateTime}</p>

                            {/* Perks */}
                            {ticket.perks && ticket.perks.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {ticket.perks.map((perk, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium"
                                        >
                                            {perk}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Verification Status */}
                            <p className={`mt-3 font-semibold text-sm ${ticket.status === "approved"
                                ? "text-green-600"
                                : ticket.status === "reject"
                                    ? "text-red-600"
                                    : "text-yellow-500"
                                }`}>
                                Status: {ticket.status || "pending"}
                            </p>

                            {/* Action Buttons */}
                            <div className="pt-3 flex justify-between">

                                <button
                                    disabled={ticket.status === 'reject'}
                                    onClick={() => {
                                        setSelectedTicket(ticket);
                                        handleTicketShowModal()
                                    }}
                                    className={`px-4 py-2 bg-primary btn text-white rounded-lg 
                                        ${ticket.status === 'reject' ? " cursor-not-allowed" : ""}
                                    hover:bg-primary/80 transition `}>
                                    Update
                                </button>
                                <button
                                    disabled={ticket.status === 'reject' ? 'cursor not allow' : ''}
                                    onClick={() => handleTicketRemove(ticket._id)}
                                    className={`px-4 py-2 border btn border-primary text-primary rounded-lg
                                        ${ticket.status === 'reject' ? "cursor-not-allowed" : ""}
                                         hover:bg-primary hover:text-white transition`}>
                                    Delete
                                </button>

                                {/* <button
                                
                                    onClick={() => setSelectedTicket(ticket)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition">
                                    Update
                                </button>
                                <button
                                    onClick={() => handleTicketRemove(ticket._id)}
                                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
                                    Delete
                                </button> */}



                            </div>
                        </div>



                    </div>
                ))}

            </div>

            {selectedTicket && (
                // <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                //     <form
                //         onSubmit={(e) => handleTicketUpdate(e, selectedTicket._id)}
                //         className="bg-base-100 p-6 rounded-xl w-[400px]"
                //     >
                //         <h2 className="text-xl font-bold mb-4">Update Ticket</h2>

                //         <h1 className='font-medium '>Ticket Title</h1>
                //         <input
                //             name="ticketTitle"
                //             defaultValue={selectedTicket.ticketTitle}
                //             className="input input-bordered w-full mb-3"
                //         />
                //         <h1 className='font-medium '>From</h1>
                //         <input
                //             name="from"
                //             defaultValue={selectedTicket.from}
                //             className="input input-bordered w-full mb-3"
                //         />
                //         <h1 className='font-medium'>To</h1>
                //         <input
                //             name="to"
                //             defaultValue={selectedTicket.to}
                //             className="input input-bordered w-full mb-3"
                //         />

                //         <h1 className='font-medium'>Transport</h1>
                //         <input
                //             name="price"
                //             defaultValue={selectedTicket.transport}
                //             className="input input-bordered w-full mb-3"
                //         />
                //         <h1 className='font-medium'> Date</h1>
                //         <input
                //             name="ticketQuantity"
                //             defaultValue={selectedTicket.date}
                //             className="input input-bordered w-full mb-3"
                //         />
                //         <h1 className='font-medium'> Time</h1>
                //         <input
                //             name="ticketQuantity"
                //             defaultValue={selectedTicket.time}
                //             className="input input-bordered w-full mb-3"
                //         />
                //         <h1 className='font-medium'> Quantity</h1>
                //         <input
                //             name="ticketQuantity"
                //             defaultValue={selectedTicket.ticketQuantity}
                //             className="input input-bordered w-full mb-3"
                //         />
                //         {/* <h1 className='font-medium'> Price</h1>
                //         <input
                //             name="ticketQuantity"
                //             defaultValue={selectedTicket.price}
                //             className="input input-bordered w-full mb-3"
                //         /> */}


                //         <div className="flex justify-end gap-3">
                //             <button
                //                 type="button"
                //                 onClick={() => setSelectedTicket(null)}
                //                 className="btn"
                //             >
                //                 Cancel
                //             </button>

                //             <button className="btn btn-primary">
                //                 Save
                //             </button>
                //         </div>
                //     </form>

                //     {/* <form onSubmit={handleSubmit(handleTicketUpdate)} className="card-body flex-1 w-full lg:w-1/2    ">
                //         <fieldset className="fieldset">

                //             <label className="label text-xl font-bold">Full name</label>


                //             {editMode ? (
                //                 <input
                //                     type="text"
                //                     name="name"

                //                     onChange={name}
                //                     className="input input-bordered w-full"
                //                     placeholder="Enter your name"
                //                     required
                //                 />
                //             ) : (
                //                 <p className="text-lg font-semibold">{user?.displayName || "No Name Set"}</p>
                //             )}

                //             <label className="label font-bold text-xl ">Photo URL</label>
                //             <div className=''>
                //                 {
                //                     editMode ? (
                //                         <input
                //                             type="text"
                //                             name='photo'

                //                             className='input input-bordered w-full mx-auto '
                //                             placeholder='Enter your photo url'
                //                         />
                //                     ) : (
                //                         <p className='text-lg font-semibold'>{user?.photoURL || "No phot url"} </p>
                //                     )
                //                 }
                //             </div>

                //             <label className="label font-bold text-xl">Email</label>
                //             <div className='text-lg font-semibold'>
                //                 {
                //                     user ? <span>{user.email}</span> : "No email found"
                //                 }
                //             </div>


                //             <div className='mt-6 flex gap-6'>
                //                 {editMode ? (
                //                     <>
                //                         <button type='submit' className='btn btn-success flex-1'>
                //                             Save Change
                //                         </button>
                //                         <button
                //                             type='button'
                //                             onClick={() => {
                //                                 setEditMode(false)
                //                             }}
                //                             className='btn btn-ghost flex-1'
                //                         >
                //                             Cancel
                //                         </button>
                //                     </>
                //                 ) : (
                //                     <button type='button'
                //                         onClick={() => { setEditMode(true) }}
                //                         className='w-full btn btn-accent '
                //                     >
                //                         Update
                //                     </button>
                //                 )}
                //             </div>





                //         </fieldset>
                //     </form> */}
                // </div>
                <dialog ref={ticketModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box w-full lg:w-11/12 lg:max-w-5xl">



                        {/* <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className='w-full '>
                            <div className=" mx-auto">
                                <div className="hero-content flex-col lg:flex-row shrink-0   rounded-2xl">

                                    <div className=" w-full  ">
                                        <div className="card-body ">
                                            <h1 className="text-2xl lg:text-3xl text-center light:text-red-500   font-bold">Update Tickets!</h1>
                                            <p className=' font-medium text-center text-base py-3'>Update tickets by editing schedules, prices, routes, and seat availability to ensure accurate, real-time bookings.</p>
                                            {/* update form */}
                                            <form onSubmit={handleSubmit(handleTicketUpdate)}>


                                                {/* ticket title info  */}


                                                <div className=' grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center pb-5'>
                                                    {/* ticket detail */}


                                                    {/* name filed */}
                                                    <div className='space-y-5 pt-7'>

                                                        <fieldset className="fieldset">
                                                            <label className="label font-medium text-[14px] "> Name</label>
                                                            <input type="text" defaultValue={user?.displayName}
                                                                {...register('name', { required: true })}
                                                                className="input  w-full  outline-primary border-0"
                                                                placeholder=" Name" />
                                                            {
                                                                errors.name?.type === "required" &&
                                                                <p className='text-red-600'> Name is required</p>
                                                            }
                                                        </fieldset>
                                                        <fieldset className="fieldset ">
                                                            <label className="label font-medium text-[14px] ">Ticket title</label>
                                                            <input type="text"
                                                                {...register('ticketTitle', { required: true })}

                                                                className="input  w-full outline-primary border-0"
                                                                placeholder="Ticket title" />
                                                            {
                                                                errors.ticketTitle?.type === "required" &&
                                                                <p className='text-red-600'>Ticket title is required</p>
                                                            }
                                                        </fieldset>







                                                        <fieldset className="fieldset">
                                                            <label className="label font-medium text-[14px] ">Departure date & time</label>
                                                            <input type="datetime-local"
                                                                {...register('departureDateTime', { required: true })}
                                                                className="input  w-full outline-primary border-0"
                                                                placeholder="Date and Time" />
                                                            {
                                                                errors.date?.type === "required" &&
                                                                <p className='text-red-600'>Departure date and  time  is required</p>
                                                            }
                                                        </fieldset>



                                                        <fieldset className="fieldset">
                                                            <label className="label font-medium text-[14px] ">Price</label>
                                                            <input type="number"
                                                                {...register('price', { required: true })}
                                                                className="input  w-full outline-primary border-0"
                                                                placeholder="Price" />
                                                            {
                                                                errors.price?.type === "required" && <p className='text-red-600'>Price is required</p>
                                                            }
                                                        </fieldset>






                                                    </div>



                                                    {/* email filed */}
                                                    <div className='space-y-5 pt-7'>


                                                        <fieldset className="fieldset">
                                                            <label className="label font-medium text-[14px] "> Email</label>
                                                            <input type="text" defaultValue={user?.email}
                                                                {...register('email', { required: true })}
                                                                className="input  w-full outline-primary border-0"
                                                                placeholder="sender Email" />
                                                            {
                                                                errors.email?.type === "required" &&
                                                                <p className='text-red-600'> Email is required</p>
                                                            }
                                                        </fieldset>


                                                        <div className=''>

                                                            <fieldset className='fieldset'>
                                                                <label className="label font-medium text-[14px] ">Transport type</label>
                                                                <select
                                                                    {...register('transport', { required: "Select a transport" })}
                                                                    className="select  w-full outline-primary border-0">
                                                                    <option value="">Select Transport </option>
                                                                    <option >Bus</option>
                                                                    <option >Train</option>
                                                                    <option >Plane</option>
                                                                    <option >Launch</option>


                                                                </select>
                                                                {
                                                                    errors.transport?.type === "required" &&
                                                                    <p className='text-red-600'>Transport type  is required</p>
                                                                }
                                                            </fieldset>



                                                        </div>



                                                        <fieldset className="fieldset">
                                                            <label className="label font-medium text-[14px] ">Image</label>
                                                            <input type="file"
                                                                {...register('image', { required: true })}
                                                                className="file-input  w-full outline-primary border-0"
                                                                placeholder="image" />
                                                            {
                                                                errors.image?.type === "required" &&
                                                                <p className='text-red-600'>Image  is required</p>
                                                            }
                                                        </fieldset>






                                                        <fieldset className="fieldset">
                                                            <label className="label font-medium text-[14px] ">
                                                                Ticket Quantity</label>
                                                            <input type="number"
                                                                {...register('ticketQuantity', { required: true })}
                                                                className="input  w-full outline-primary border-0"
                                                                placeholder="Ticket Quantity" />
                                                            {
                                                                errors.ticketQuantity?.type === "required" &&
                                                                <p className='text-red-600'>
                                                                    Ticket Quantity is required</p>
                                                            }
                                                        </fieldset>


                                                    </div>


                                                </div>

                                                <div className="space-y-2 pb-20">
                                                    <h1 className='font-medium text-[14px] '>Perks</h1>
                                                    {perks.map((perk, i) => (
                                                        <label key={i} className="flex items-center gap-2 cursor-pointer">

                                                            <input
                                                                type="checkbox"
                                                                value={perk}
                                                                {...register("perks", { required: true })}
                                                                className="checkbox checkbox-primary"
                                                            />
                                                            <span>{perk}</span>
                                                        </label>
                                                    ))}
                                                    {
                                                        errors.perks?.type === "required" &&
                                                        <p className='text-red-600'> At least select one perks</p>
                                                    }
                                                </div>



                                                <input type="submit" className=' btn btn-primary '
                                                    value="Update" />
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* add properties */}
                            {/* <div className='mx-20 py-5'>
                               <h1 className='text-3xl font-medium'>All Add Properties Details</h1>
                                  </div> */}
                        </div>



                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn my-btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>

    );
};

export default MyAddedTickets;

import React from 'react';
import { useForm, } from 'react-hook-form';
import { useLoaderData, useNavigate, } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { toast } from 'react-toastify';


// import useAxiosSecure from '../../hooks/useAxiosSecure';


const AddTicket = () => {
    const serviceCenter = useLoaderData()
    const regionsDuplicate = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const navigate =useNavigate()
    const axiosSecure = useAxiosSecure()
    const perks = ["AC", "Breakfast", "WiFi", "TV", "Parking"];
    const { user, } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleAddTicket = (data) => {
        console.log(data)

        Swal.fire({
            title: "Are you sure to added ticket ?",
            text: 'Add your ticket',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {

            if (!result.isConfirmed) return;


            const profileImage = data.image[0];

            // store the image in from data
            const formData = new FormData()
            formData.append('image', profileImage)

            // 2 send the photo to store the url
            const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
            toast.promise(axios.post(imageAPI_URL, formData),
                {
                    pending: 'Uploading to added tickets.Please wait...',
                     // success: 'Image uploaded successfully!',
                    error: 'Image upload failed!'
                }
            )

                .then(res => {
                    console.log('after image upload', res.data.data.url)
                    const imageUrl = res.data.data.url;
                    data.image = imageUrl
                    data.createAt=new Date()
                    // save the tickets in the database
                    toast.promise(axiosSecure.post('/tickets', data),

                        {
                            pending: 'Saving ticket...',
                            success: 'Ticket added!',
                            error: 'Failed to save ticket!'
                        }
                    )
                        .then(res => {
                            console.log('after saving data in database ', res.data)
                            navigate('/dashboard/myAddedTickets')
                            // toast.success('ticket added')
                            // Swal.fire({
                            //     title: "Deleted!",
                            //     text: "Your file has been deleted.",
                            //     icon: "success"
                            // });
                        })

                })


        });

    }

    return (
        <div className='bg-white px-5 py-5  lg:px-26  lg:py-20 bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100'>
            <h1 className='font-extrabold text-[56px] text-primary logo'>Add Ticket</h1>
            <form onSubmit={handleSubmit(handleAddTicket)}>


                {/* ticket title info  */}
                

                <div className=' grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center pb-5'>
                    {/* ticket detail */}


                        {/* name filed */}
                    <div className='space-y-5 pt-7'>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]"> Name</label>
                            <input type="text" defaultValue={user?.displayName} readOnly
                                {...register('name', { required: true })}
                                className="input bg-white w-full  outline-primary border-0"
                                placeholder=" Name" />
                            {
                                errors.name?.type === "required" &&
                                <p className='text-red-600'> Name is required</p>
                            }
                        </fieldset>
                        <fieldset className="fieldset ">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Ticket title</label>
                            <input type="text"
                                {...register('ticketTitle', { required: true })}

                                className="input bg-white w-full outline-primary border-0"
                                placeholder="Ticket title" />
                            {
                                errors.ticketTitle?.type === "required" && <p className='text-red-600'>Ticket title is required</p>
                            }
                        </fieldset>





                        {/* <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Image</label>
                            <input type="file"
                                {...register('image', { required: true })}
                                className="file-input bg-white w-full outline-primary border-0"
                                placeholder="image" />
                            {
                                errors.image?.type === "required" &&
                                <p className='text-red-600'>Image  is required</p>
                            }
                        </fieldset> */}

                                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Departure date & time</label>
                            <input type="date"
                                {...register('date', { required: true })}
                                className="input bg-white w-full outline-primary border-0"
                                placeholder="Date and Time" />
                            {
                                errors.date?.type === "required" &&
                                <p className='text-red-600'>Departure date and  time  is required</p>
                            }
                        </fieldset>

                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">From</label>
                            <select defaultValue="Pick a font"
                                {...register('from', { required: "Select your region" })}
                                className="select bg-white w-full outline-primary border-0">
                                <option value="">Select your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {
                                errors.from?.type === "required" &&
                                <p className='text-red-600'>From region is required</p>
                            }
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Price</label>
                            <input type="number"
                                {...register('price', { required: true })}
                                className="input bg-white w-full outline-primary border-0"
                                placeholder="Price" />
                            {
                                errors.price?.type === "required" && <p className='text-red-600'>Price is required</p>
                            }
                        </fieldset>
                       


                       


                    </div>



                    {/* email filed */}
                    <div className='space-y-5 pt-7'>


                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]"> Email</label>
                            <input type="text" defaultValue={user?.email} readOnly
                                {...register('email', { required: true })}
                                className="input bg-white w-full outline-primary border-0"
                                placeholder="sender Email" />
                            {
                                errors.email?.type === "required" &&
                                <p className='text-red-600'> Email is required</p>
                            }
                        </fieldset>


                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                            <fieldset className='fieldset'>
                                <label className="label font-medium text-[14px] text-[#0F172A]">Transport type</label>
                                <select 
                                    {...register('transport', { required: "Select a transport" })}
                                    className="select bg-white w-full outline-primary border-0">
                                    <option value="">Select Transport </option>
                                    <option >Bus</option>
                                    <option >Train</option>
                                    <option >Plain</option>
                                    <option >Launch</option>


                                </select>
                                {
                                    errors.transport?.type === "required" &&
                                    <p className='text-red-600'>Transport type  is required</p>
                                }
                            </fieldset>


                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]"> Time</label>
                                <input type="text" defaultValue={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {...register('time', { required: true })}
                                    className="input bg-white w-full outline-primary border-0"
                                    placeholder="sender Email" />
                                {
                                    errors.time?.type === "required" &&
                                    <p className='text-red-600'> Time is required</p>
                                }
                            </fieldset>
                        </div>



                                     <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Image</label>
                            <input type="file"
                                {...register('image', { required: true })}
                                className="file-input bg-white w-full outline-primary border-0"
                                placeholder="image" />
                            {
                                errors.image?.type === "required" &&
                                <p className='text-red-600'>Image  is required</p>
                            }
                        </fieldset>

                        {/* <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Departure date & time</label>
                            <input type="date"
                                {...register('date', { required: true })}
                                className="input bg-white w-full outline-primary border-0"
                                placeholder="Date and Time" />
                            {
                                errors.date?.type === "required" &&
                                <p className='text-red-600'>Departure date and  time  is required</p>
                            }
                        </fieldset> */}

                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">To</label>
                            <select  defaultValue=""
                                {...register('to', { required: 'Please select a region' })}
                                className="select bg-white w-full outline-primary border-0">
                                <option value="" >Select your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {
                                errors.to &&
                                <p className='text-red-600'>{errors.to.message}</p>
                            }
                        </fieldset>

                        {/* <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Perks  </label>
                            <input type="text"
                                {...register('perks', { required: true })}
                                className="input bg-white w-full outline-primary border-0"
                                placeholder="Perks" />
                            {
                                errors.perks?.type === "required" && <p className='text-red-600'> Perks is required</p>
                            }
                        </fieldset> */}
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Ticket Quantity</label>
                            <input type="number"
                                {...register('ticketQuantity', { required: true })}
                                className="input bg-white w-full outline-primary border-0"
                                placeholder="Ticket Quantity" />
                            {
                                errors.ticketQuantity?.type === "required" &&
                                <p className='text-red-600'> Ticket Quantity is required</p>
                            }
                        </fieldset>


                    </div>


                </div>
               
                <div className="space-y-2 pb-20">
                    <h1 className='font-medium text-[14px] text-[#0F172A]'>Perks</h1>
                    {perks.map((perk, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                value={perk}
                                {...register("perks", { required:true})}
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



                <input type="submit" className=' btn btn-primary ' value="Add Ticket" />
            </form>

        </div>
    );
};

export default AddTicket;

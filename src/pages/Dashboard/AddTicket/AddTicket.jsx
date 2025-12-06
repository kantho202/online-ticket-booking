
import React from 'react';
import { useForm,  } from 'react-hook-form';
import { useLoaderData,  } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hook/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';


const AddTicket = () => {
    const serviceCenter = useLoaderData()
    const regionsDuplicate = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    // const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // const navigate = useNavigate()
    // const districtsByRegion = region => {
    //     const regionDistricts = serviceCenter.filter(c => c.region === region)
    //     const districts = regionDistricts.map(d => d.district)
    //     return districts
    // }
    // console.log(regions)
    const { register, handleSubmit,  formState: { errors } } = useForm()
    // const from = useWatch({ control, name: "from" })
    // const to = useWatch({ control, name: "to" })
    const handleAddTicket = (data) => {
        console.log(data)
            ;
        Swal.fire({
            title: "Agree with the cost ?",
            text: 'Add your ticket',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed) {


                // axiosSecure.post('/parcels', data)
                //     .then(res => {
                //         console.log('after saving parcel', res.data)
                //         navigate('/dashboard/my-parcels')
                //         if (res.data.insertedId) {
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "Your work has been saved",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //         }
                //     })
                // // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }

    return (
        <div className='bg-white mt-8 px-26 rounded-4xl mb-20 py-20'>
            <h1 className='font-extrabold text-[56px] text-secondary logo'>Add Ticket</h1>
            <form onSubmit={handleSubmit(handleAddTicket)}>
                {/* document */}

                {/* parcel info  */}
                <fieldset className="fieldset pt-5">
                    <label className="label font-medium text-[14px] text-[#0F172A]">Ticket title</label>
                    <input type="text"
                        {...register('ticketTitle', { required: true })}

                        className="input bg-white "
                        placeholder="Ticket title" />
                    {
                        errors.ticketTitle?.type === "required" && <p className='text-red-600'>Ticket title is required</p>
                    }
                </fieldset>
                {/* <hr className='text-[000000] opacity-10' /> */}
                {/* two column */}
                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20'>
                    {/*  sender info */}

                    <div className='space-y-5 pt-7'>
                        {/* <h1 className='font-extrabold text-[18px] text-secondary pt-7'>Sender Details</h1> */}
                        <div className=''>
                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]"> Name</label>
                                <input type="text" defaultValue={user?.displayName}
                                    {...register('name', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder=" Name" />
                                {
                                    errors.name?.type === "required" &&
                                    <p className='text-red-600'> Name is required</p>
                                }
                            </fieldset>

                        </div>

                        <div className=''>
                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]">Image</label>
                                <input type="text"
                                    {...register('image', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="image" />
                                {
                                    errors.image?.type === "required" &&
                                    <p className='text-red-600'>Image  is required</p>
                                }
                            </fieldset>

                        </div>

                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">From</label>
                            <select defaultValue="Pick a font"
                                {...register('from', { required: true })}
                                className="select bg-white w-full">
                                <option defaultValue={true}>Select your region</option>
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
                                className="input bg-white w-full"
                                placeholder="Price" />
                            {
                                errors.price?.type === "required" && <p className='text-red-600'>Price is required</p>
                            }
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Ticket Quantity</label>
                            <input type="number" 
                                {...register('ticketQuantity', { required: true })}
                                className="input bg-white w-full"
                                placeholder="Ticket Quantity" />
                            {
                                errors.ticketQuantity?.type === "required" && <p className='text-red-600'> Ticket Quantity is required</p>
                            }
                        </fieldset>

                      

                    </div>

                    {/* receiver info */}
                    {/* <div>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]"> Email</label>
                            <input type="text" defaultValue={user?.email}
                                {...register('email', { required: true })}
                                className="input bg-white w-full"
                                placeholder="sender Email" />
                            {
                                errors.email?.type === "required" &&
                                <p className='text-red-600'> Email is required</p>
                            }
                        </fieldset>
                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">Transport type</label>
                            <select defaultValue="Pick a font"
                                {...register('senderWireHouse', { required: true })}
                                className="select bg-white w-full">
                                <option disabled={true} >Select Wire house</option>
                                <option >rent</option>
                                <option >war</option>
                                <option >theme</option>


                            </select>
                            {
                                errors.senderWireHouse?.type === "required" &&
                                <p className='text-red-600'>Sender wire house is required</p>
                            }
                        </fieldset>

                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">To</label>
                            <select defaultValue="Pick a font"
                                {...register('to', { required: true })}
                                className="select bg-white w-full">
                                <option defaultValue={true}>Select your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {
                                errors.senderRegion?.type === "required" &&
                                <p className='text-red-600'>Sender region is required</p>
                            }
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Departure date & time </label>
                            <input type="text" defaultValue={user?.displayName}
                                {...register('senderName', { required: true })}
                                className="input bg-white w-full"
                                placeholder="sender Name" />
                            {
                                errors.senderName?.type === "required" && <p className='text-red-600'> Sender name is required</p>
                            }
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Perks </label>
                            <input type="text" defaultValue={user?.displayName}
                                {...register('senderName', { required: true })}
                                className="input bg-white w-full"
                                placeholder="sender Name" />
                            {
                                errors.senderName?.type === "required" && <p className='text-red-600'> Sender name is required</p>
                            }
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Perks </label>
                            <input type="text" defaultValue={user?.displayName}
                                {...register('senderName', { required: true })}
                                className="input bg-white w-full"
                                placeholder="sender Name" />
                            {
                                errors.senderName?.type === "required" && <p className='text-red-600'> Sender name is required</p>
                            }
                        </fieldset>
                        
                    </div> */}


                     <div className='space-y-5 pt-7'>
                        {/* <h1 className='font-extrabold text-[18px] text-secondary pt-7'>Sender Details</h1> */}
                        <div className=''>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]"> Email</label>
                            <input type="text" defaultValue={user?.email}
                                {...register('email', { required: true })}
                                className="input bg-white w-full"
                                placeholder="sender Email" />
                            {
                                errors.email?.type === "required" &&
                                <p className='text-red-600'> Email is required</p>
                            }
                        </fieldset>

                        </div>

                        <div className=''>
                               <fieldset className='fieldset'>
                                <label className="label font-medium text-[14px] text-[#0F172A]">Transport type</label>
                                <select defaultValue="Pick a font "
                                    {...register('transport', { required: true })}
                                    className="select bg-white w-full">
                                    <option disabled={true} >Select Transport </option>
                                    <option >Bus</option>
                                    <option >Train</option>
                                    <option >Plain</option>
                                    <option >Launch</option>


                                </select>
                                {
                                    errors.senderWireHouse?.type === "required" &&
                                    <p className='text-red-600'>Transport type  is required</p>
                                }
                            </fieldset>
                        

                        </div>

                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">To</label>
                            <select defaultValue="Pick a font"
                                {...register('to', { required: true })}
                                className="select bg-white w-full">
                                <option defaultValue={true}>Select your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {
                                errors.to?.type === "required" &&
                                <p className='text-red-600'>To is required</p>
                            }
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Departure date & time</label>
                            <input type="text" 
                                {...register('date', { required: true })}
                                className="input bg-white w-full"
                                placeholder="Date and Time" />
                            {
                                errors.date?.type === "required" && 
                                <p className='text-red-600'>Departure date and  time  is required</p>
                            }
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Perks  </label>
                            <input type="text" 
                                {...register('perks', { required: true })}
                                className="input bg-white w-full"
                                placeholder="Perks" />
                            {
                                errors.perks?.type === "required" && <p className='text-red-600'> Perks is required</p>
                            }
                        </fieldset>

                      

                    </div>


                </div>
                <input type="submit" className=' btn btn-primary ' value="Add Ticket" />
            </form>

        </div>
    );
};

export default AddTicket;

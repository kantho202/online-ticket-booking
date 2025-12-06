
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const AddTicket = () => {
    const serviceCenter = useLoaderData()
    const regionsDuplicate = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate =useNavigate()
    const districtsByRegion = region => {
        const regionDistricts = serviceCenter.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }
    // console.log(regions)
    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const senderRegion = useWatch({ control, name: "senderRegion" })
    const receiverRegion = useWatch({ control, name: "receiverRegion" })
    const handleSendParcel = (data) => {
        console.log(data)
        const isDocument = data.parcelType === "document"
        const parcelWeight = parseFloat(data.parcelWeight);
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        console.log(isSameDistrict)

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWight = parcelWeight - 3
                const extraCharge = isSameDistrict ? extraWight * 40 :
                    extraWight * 40 + 40;

                cost = minCharge + extraCharge
            }
        }

        console.log('cost ', cost)
        data.cost = cost;
        Swal.fire({
            title: "Agree with the cost ?",
            text: `You will be charge ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data)
                        navigate('/dashboard/my-parcels')
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }

    return (
        <div className='bg-white mt-8 px-26 rounded-4xl mb-20 py-20'>
            <h1 className='font-extrabold text-[56px] text-secondary '>Add Parcel</h1>
            <form onSubmit={handleSubmit(handleSendParcel)}>
                {/* document */}
                <div>
                    <h1 className='font-extrabold text-[28px] text-secondary pt-20'>Enter your parcel details</h1>
                    <div className='py-8 '>
                        <label className='label pr-12 '>
                            <input type="radio"
                                {...register('parcelType', { required: true })}
                                value="document" className="radio radio-primary" />
                            Document

                        </label>
                        <label className='label'>
                            <input type="radio"
                                {...register('parcelType', { required: true })}
                                value="not-document" className="radio radio-primary" />
                            <span>Not-Document </span>
                        </label>
                        {
                            errors.parcelType?.type === "required" &&
                            <p className='text-red-600'>Select a parcel type</p>
                        }
                    </div>
                </div>
                {/* parcel info  */}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 pb-[60px]'>
                    <fieldset className="fieldset">
                        <label className="label font-medium text-[14px] text-[#0F172A]">Parcel Name</label>
                        <input type="text"
                            {...register('parcelName', { required: true })}

                            className="input bg-white"
                            placeholder="Parcel Name" />
                        {
                            errors.parcelName?.type === "required" && <p className='text-red-600'>Parcel name is required</p>
                        }
                    </fieldset>
                    <fieldset className='fieldset'>

                        <label className="label font-medium text-[14px] text-[#0F172A]">Parcel Weight (KG) </label>
                        <input type="number"
                            {...register('parcelWeight', { required: true })}
                            className="input bg-white"
                            placeholder="Parcel Weight" />
                        {
                            errors.parcelWeight?.type === "required" && <p className='text-red-600'>parcel Weight is required</p>
                        }
                    </fieldset>


                </div>
                <hr className='text-[000000] opacity-10' />
                {/* two column */}
                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20'>
                    {/*  sender info */}

                    <div className='space-y-5 pt-7'>
                        <h1 className='font-extrabold text-[18px] text-secondary pt-7'>Sender Details</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]">Sender Name</label>
                                <input type="text" defaultValue={user?.displayName}
                                    {...register('senderName', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="sender Name" />
                                {
                                    errors.senderName?.type === "required" && <p className='text-red-600'> Sender name is required</p>
                                }
                            </fieldset>
                            <fieldset className='fieldset'>
                                <label className="label font-medium text-[14px] text-[#0F172A]">Sender Pickup Wire house</label>
                                <select defaultValue="Pick a font"
                                    {...register('senderWireHouse', { required: true })}
                                    className="select bg-white ">
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
                        </div>
                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Sender Email</label>
                            <input type="text" defaultValue={user?.email}
                                {...register('senderEmail', { required: true })}
                                className="input bg-white w-full"
                                placeholder="sender Email" />
                            {
                                errors.senderEmail?.type === "required" && <p className='text-red-600'> Sender Email is required</p>
                            }
                        </fieldset>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]">Address</label>
                                <input type="text"
                                    {...register('senderAddress', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="Address" />
                                {
                                    errors.senderAddress?.type === "required" &&
                                    <p className='text-red-600'>Sender address  is required</p>
                                }
                            </fieldset>
                            <fieldset className='fieldset'>

                                <label className="label font-medium text-[14px] text-[#0F172A]">Sender Contact No</label>
                                <input type="number"
                                    {...register('senderContact', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="Contact Number" />
                                {
                                    errors.senderContact?.type === "required" &&
                                    <p className='text-red-600'>Sender Contact  is required</p>
                                }
                            </fieldset>
                        </div>

                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">Your Region</label>
                            <select defaultValue="Pick a font"
                                {...register('senderRegion', { required: true })}
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
                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">Sender District</label>
                            <select defaultValue="Pick a font"
                                {...register('senderDistrict', { required: true })}
                                className="select bg-white w-full">
                                <option defaultValue={true}>Select your region</option>
                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Pickup Instruction</label>
                            {/* <textarea name=" input border-1 " {...register('instruction',{required:true})}></textarea> */}
                            <textarea
                                className="w-full border border-gray-300 rounded-[5px] p-3 focus:outline-none focus:ring-1 "
                                // focus:ring-blue-500
                                rows={4}  {...register('senderInstruction', { required: true })}
                                placeholder="Pickup Instruction"
                            ></textarea>
                            {
                                errors.senderInstruction?.type === "required" &&
                                <p className='text-red-600'>Sender instruction is required</p>
                            }
                            {/* <input type="text"
                                
                                    {...register('instruction',{required:true})}
                                    className="input bg-white w-full "
                                    placeholder="Pickup Instruction" /> */}


                        </fieldset>

                    </div>

                    {/* receiver info */}

                    <div className='space-y-5 pt-7'>
                        <h1 className='font-extrabold text-[18px] text-secondary pt-7'>Received  Details</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]">Receiver Name</label>
                                <input type="text"
                                    {...register('receiverName', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="Receiver Name" />
                                {
                                    errors.receiverName?.type === "required" &&
                                    <p className='text-red-600'>Sender wire house is required</p>
                                }
                            </fieldset>
                            <fieldset className='fieldset'>
                                <label className="label font-medium text-[14px] text-[#0F172A]">Receiver Delivery Wire house</label>
                                <select defaultValue="Pick a font"
                                    {...register('receiverWireHouse', { required: true })}
                                    className="select bg-white ">
                                    <option >Select Wire house</option>
                                    <option>Inter</option>
                                    <option>Poppins</option>
                                    <option>Raleway</option>
                                </select>
                            </fieldset>
                        </div>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Receiver Email</label>
                            <input type="text"
                                {...register('senderReceiver', { required: true })}
                                className="input bg-white w-full"
                                placeholder=" Receiver email" />
                            {
                                errors.receiverEmail?.type === "required" && <p className='text-red-600'> Receiver Email is required</p>
                            }
                        </fieldset>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                            <fieldset className="fieldset">
                                <label className="label font-medium text-[14px] text-[#0F172A]">Receiver Address</label>
                                <input type="text"
                                    {...register('receiverAddress', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="Receiver Address" />
                                {
                                    errors.receiverAddress?.type === "required" &&
                                    <p className='text-red-600'>Sender wire house is required</p>
                                }
                            </fieldset>
                            <fieldset className='fieldset'>

                                <label className="label font-medium text-[14px] text-[#0F172A]">Receiver Contact No</label>
                                <input type="number"
                                    {...register('receiverContact', { required: true })}
                                    className="input bg-white w-full"
                                    placeholder="Contact Number" />
                                {
                                    errors.receiverContact?.type === "required" &&
                                    <p className='text-red-600'>Sender wire house is required</p>
                                }
                            </fieldset>
                        </div>
                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">Your Region</label>
                            <select defaultValue="Pick a font"
                                {...register('receiverRegion', { required: true })}
                                className="select bg-white w-full">
                                <option defaultValue={true}>Select your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className='fieldset'>
                            <label className="label font-medium text-[14px] text-[#0F172A]">Receiver District</label>
                            <select defaultValue="Pick a font"
                                {...register('receiverDistrict', { required: true })}
                                className="select bg-white w-full">
                                <option defaultValue={true}>Select your region</option>
                                {
                                    districtsByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label font-medium text-[14px] text-[#0F172A]">Pickup Instruction</label>
                            {/* <textarea name=" input border-1 " {...register('instruction',{required:true})}></textarea> */}
                            <textarea
                                className="w-full border border-gray-300 rounded-[5px] p-3 focus:outline-none focus:ring-1 "
                                // focus:ring-blue-500
                                rows={4}  {...register('receiverInstruction', { required: true })}
                                placeholder="Pickup Instruction"
                            ></textarea>
                            {
                                errors.receiverInstruction?.type === "required" &&
                                <p className='text-red-600'>Sender wire house is required</p>
                            }
                            {/* <input type="text"
                                
                                    {...register('instruction')}
                                    className="input bg-white w-full "
                                    placeholder="Pickup Instruction" /> */}


                        </fieldset>

                    </div>

                </div>
                {/* <input type="submit" className='bg-primary btn ' value="send" /> */}
                <button type="submit" className='bg-primary btn ' value="">Proceed to confirm Booking</button>
            </form>

        </div>
    );
};

export default AddTicket;

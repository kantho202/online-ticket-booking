import React from 'react';
import { Link, useLocation, useNavigate, } from 'react-router';

import useAuth from '../../hook/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { Bounce, toast } from 'react-toastify';
import useAxiosSecure from '../../hook/useAxiosecure';
const Register = () => {
    const {  createUser,updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure =useAxiosSecure()
    const handleRegister = (data) => {
        console.log(data)


        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)

                
                // create user in database 
                const userInfo ={
                    email:data.email,
                    displayName:data.name,
                    photoURL:data.photo
                }
                axiosSecure.post('/users',userInfo)
                .then(res=>{
                    if(res.data.insertedId){
                        //   navigate(location.state || "/");
                        console.log('user  created in the database',res.data)
                    }
                })

                const userProfile={
                    displayName:data.name,
                    photoURL:data.photo
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log("Profile Updated!");
                        navigate(location.state || "/");
                    })
            })
            .catch(error => {
                console.log(error)
                toast.error('Email already exits!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }
    return (
        <div className="card  w-full max-w-lg pt-14   bg-white">
            <div className="card-body">
                <h1 className="text-2xl lg:text-3xl font-extrabold text-center text-[42px]"> Create an new Account</h1>
                <p className='text-base font-normal'>Register now and step into a smarter travel experience! </p>

                <form onSubmit={handleSubmit(handleRegister)}>

                    <fieldset className="fieldset">

                        <img src="" alt="" />
                        {/* name */}
                        <label className="label text-black">Name</label>
                        <div className=' '>
                            <input type="text"  {...register('name', { required: true })}
                                className="input bg-white w-full"
                                placeholder="Name" />
                            {
                                errors.name?.type === "required" &&
                                <p className='text-red-500'>Name is required</p>
                            }
                        </div>
                        {/* photo */}
                        <label className="label text-black">Photo Url</label>
                        <div className=' '>
                            <input type="text"  {...register('photo', { required: true })}
                                className="input bg-white w-full"
                                placeholder="Photo url" />
                            {
                                errors.photo?.type === "required" &&
                                <p className='text-red-500'>Photo url is required</p>
                            }
                        </div>
                        {/* email */}
                        <label className="label text-black">Email Address</label>
                        <div className=' '>
                            <input type="email"  {...register('email',
                                { required: true })}
                                className="input bg-white w-full"
                                placeholder="Email Address" />
                            {
                                errors.email?.type === "required" &&
                                <p className='text-red-500'>Email is required</p>
                            }
                        </div>

                        {/* password */}
                        <label className="label text-black">Password</label>
                        <input type="password"  {...register("password",
                            {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                            })}
                            className="input bg-white w-full"
                            placeholder="Password" />


                        {
                            errors.password?.type === "required" &&
                            <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === "minLength" &&
                            <p className='text-red-500'>Password must be 6 character</p>
                        }
                        {
                            errors.password?.type === "pattern" &&
                            <p className='text-red-500'>Password must have One Uppercase,
                                One LowerCase and One Special character</p>
                        }
                        <button className="btn btn-primary  mt-4">Register</button>
                        {/* Google */}
                        <p className='text-base description'>Already have an account?
                            <Link state={location.state}
                                to="/login" className='text-primary'> Login</Link></p><br />
                        <SocialLogin></SocialLogin>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;
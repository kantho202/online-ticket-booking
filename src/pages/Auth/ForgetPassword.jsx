
import React from 'react';
import { Link } from 'react-router';

const ForgetPassword = () => {
    return (
        <div className="card  w-full max-w-lg pt-14   bg-white">
                    <div className="card-body">
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-[42px]">Forgot Password</h1>
                        <p className='text-base font-normal'>Enter your email address and we’ll send you a reset link.  </p>

                        <form>

                            <fieldset className="fieldset">


                                {/* email */}
                                <label className="label text-black">Email Address</label>
                                <div className=' '>
                                    <input type="email"  
                                        className="input bg-white w-full" name='email' 
                                        placeholder="Email Address" />
                                       
                                </div>

                              

                                <button className="btn btn-primary   mt-4">Send</button>
                                {/* Google */}
                                <p className='text-base description'>Don’t have any account?
                                    <Link
                                    state={location.state}
                                    to="/login" className='text-primary'> Login</Link></p><br /> 
                               
                            </fieldset>
                        </form>
                    </div>
                </div>
    );
};

export default ForgetPassword;

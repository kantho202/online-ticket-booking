import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import useAuth from '../../../hook/useAuth';
import Loader from '../../../components/Loading/Loading';
import { 
    FaReceipt, 
    FaCalendarAlt, 
    FaCreditCard, 
    FaTicketAlt,
    FaSearch,
    FaDownload,
    FaEye,
    FaCheckCircle,
    FaMoneyBillWave,
    FaUser,
    FaHashtag,
    FaFilter,
    FaFileExport
} from 'react-icons/fa';

const TransactionHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-BD').format(amount);
    };

    const filteredPayments = payments.filter(payment => 
        payment.ticketName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAmount = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <div className="text-xl font-semibold text-gray-600">Loading transactions...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100" data-aos="fade-up">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-4 shadow-lg">
                                <FaReceipt size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                                    Transaction History
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Track all your payment transactions and bookings
                                </p>
                            </div>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="flex gap-6">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200 text-center min-w-[120px]">
                                <div className="text-2xl font-bold text-blue-600">{payments.length}</div>
                                <div className="text-sm text-blue-600 font-medium">Total Transactions</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 text-center min-w-[120px]">
                                <div className="text-2xl font-bold text-green-600">৳{formatAmount(totalAmount)}</div>
                                <div className="text-sm text-green-600 font-medium">Total Spent</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by ticket name or transaction ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                            />
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                <FaFileExport />
                                Export
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300">
                                <FaFilter />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {filteredPayments.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <FaReceipt className="text-gray-400 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Transactions Found</h3>
                        <p className="text-gray-600 text-lg">
                            {searchTerm ? 'Try adjusting your search criteria' : 'You haven\'t made any transactions yet'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold flex items-center gap-2">
                                                <FaHashtag />
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <FaTicketAlt />
                                                    Ticket
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <FaUser />
                                                    Email
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <FaCreditCard />
                                                    Transaction ID
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt />
                                                    Date & Time
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <FaMoneyBillWave />
                                                    Amount
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-center font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPayments.map((payment, index) => (
                                            <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                                        {index + 1}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-800">{payment.ticketName}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-600">{payment.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="bg-gray-100 px-3 py-1 rounded-lg font-mono text-sm text-gray-700 break-all">
                                                        {payment.transactionId}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-600">{formatDate(payment.paidAt)}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold inline-block">
                                                        ৳{formatAmount(payment.amount)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200">
                                                            <FaEye size={14} />
                                                        </button>
                                                        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200">
                                                            <FaDownload size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-4" data-aos="fade-up" data-aos-delay="200">
                            {filteredPayments.map((payment, index) => (
                                <div key={payment._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                    {/* Card Header */}
                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                                                #{index + 1}
                                            </div>
                                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-lg">
                                                ৳{formatAmount(payment.amount)}
                                            </div>
                                        </div>
                                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                                            <FaCheckCircle size={12} />
                                            Completed
                                        </div>
                                    </div>
                                    
                                    {/* Card Content */}
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                                <FaTicketAlt size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500 font-medium">Ticket</div>
                                                <div className="font-semibold text-gray-800">{payment.ticketName}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3">
                                            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                                                <FaUser size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500 font-medium">Email</div>
                                                <div className="font-semibold text-gray-800">{payment.email}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                                                <FaCreditCard size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500 font-medium">Transaction ID</div>
                                                <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded break-all text-gray-700">
                                                    {payment.transactionId}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                                                <FaCalendarAlt size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500 font-medium">Date & Time</div>
                                                <div className="font-semibold text-gray-800">{formatDate(payment.paidAt)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card Actions */}
                                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200">
                                            <FaEye />
                                            View Details
                                        </button>
                                        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200">
                                            <FaDownload />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;

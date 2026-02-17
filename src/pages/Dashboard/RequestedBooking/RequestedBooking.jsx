import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import { 
   
    FaCheck, 
    FaTimes, 
    FaUser, 
    FaEnvelope, 
    FaHashtag,
    FaDollarSign,
    FaFilter,
    FaSearch,
    FaDownload,
    
} from 'react-icons/fa';
import { 
    FiCalendar, 
    FiClock, 
    FiMoreVertical,
    FiEye,
    FiCheckCircle,
    FiXCircle,
    FiRefreshCw
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import Loader from '../../../components/Loading/Loading';
import styled from 'styled-components';
import { FaTicket } from 'react-icons/fa6';
import { LuRefreshCcw } from 'react-icons/lu';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const RequestedBooking = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isProcessing, setIsProcessing] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const { data: bookings = [], isLoading, refetch,isFetching } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }

    // Filter bookings based on search and status
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.ticket_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const updateBookingStatus = async (id, status) => {
        const result = await Swal.fire({
            title: `${status === 'accepted' ? 'Accept' : 'Reject'} Booking Request?`,
            text: `Are you sure you want to ${status} this booking request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: status === 'accepted' ? "#10b981" : "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: `Yes, ${status === 'accepted' ? 'Accept' : 'Reject'}!`,
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            setIsProcessing(id);
            try {
                const updateInfo = { status };
                const res = await axiosSecure.patch(`/bookings/${id}`, updateInfo);
                
                if (res.data.modifiedCount) {
                    await Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Booking ${status === 'accepted' ? 'accepted' : 'rejected'} successfully!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    refetch();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong. Please try again.',
                });
            } finally {
                setIsProcessing(null);
            }
        }
    };

    const handleApproved = (id) => {
        updateBookingStatus(id, 'accepted');
    };

    const handleRejection = (id) => {
        updateBookingStatus(id, 'rejected');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepted':
                return <StatusBadge status="accepted"><FiCheckCircle /> Accepted</StatusBadge>;
            case 'rejected':
                return <StatusBadge status="rejected"><FiXCircle /> Rejected</StatusBadge>;
            default:
                return <StatusBadge status="pending"><FiClock /> Pending</StatusBadge>;
        }
    };

    const handleRefresh = async () => {
        // await refetch(); // This will refetch the data
       window.location.reload();
    };

    const handleOpenModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleOpenViewModal = (booking) => {
        setSelectedBooking(booking);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedBooking(null);
    };

    const handleUpdateBooking = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const updatedData = {
            name: form.name.value,
            email: form.email.value,
            ticket_title: form.ticket_title.value,
            bookingQuantity: parseInt(form.bookingQuantity.value),
            total_price: parseFloat(form.total_price.value),
            status: form.status.value
        };

        try {
            const res = await axiosSecure.patch(`/bookings/${selectedBooking._id}`, updatedData);
            
            if (res.data.modifiedCount > 0) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Booking has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
                handleCloseModal();
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update booking. Please try again.',
            });
        }
    };

    const handleExportPDF = () => {
        try {
            console.log('Starting PDF export...');
            console.log('Filtered bookings:', filteredBookings);
            
            const doc = new jsPDF();
            
            // Add title with background
            doc.setFillColor(255, 140, 66);
            doc.rect(0, 0, 210, 35, 'F');
            doc.setFontSize(24);
            doc.setTextColor(255, 255, 255);
            doc.text('Booking Requests Report', 105, 15, { align: 'center' });
            
            // Add date
            doc.setFontSize(11);
            const dateStr = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            doc.text(`Generated on: ${dateStr}`, 105, 25, { align: 'center' });
            
            // Add statistics section with boxes
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Summary Statistics', 14, 45);
            
            const stats = [
                { label: 'Total Requests', value: filteredBookings.length, color: [255, 140, 66] },
                { label: 'Accepted', value: filteredBookings.filter(b => b.status === 'accepted').length, color: [16, 185, 129] },
                { label: 'Rejected', value: filteredBookings.filter(b => b.status === 'rejected').length, color: [239, 68, 68] },
                { label: 'Pending', value: filteredBookings.filter(b => !b.status || b.status === 'pending').length, color: [245, 158, 11] }
            ];
            
            let xPos = 14;
            stats.forEach((stat, index) => {
                doc.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
                doc.rect(xPos, 50, 45, 20, 'F');
                doc.setFontSize(18);
                doc.setTextColor(255, 255, 255);
                doc.text(stat.value.toString(), xPos + 22.5, 60, { align: 'center' });
                doc.setFontSize(9);
                doc.text(stat.label, xPos + 22.5, 67, { align: 'center' });
                xPos += 48;
            });
            
            // Add detailed bookings section
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Detailed Booking Information', 14, 80);
            
            // Prepare comprehensive table data with all details
            const tableData = filteredBookings.map((booking, index) => {
                const bookingDate = booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A';
                return [
                    index + 1,
                    booking.name || 'N/A',
                    booking.email || 'N/A',
                    booking.ticket_title || 'N/A',
                    booking.bookingQuantity || 0,
                    `BDT ${booking.total_price?.toLocaleString() || '0'}`,
                    booking.status === 'accepted' ? 'Accepted' : 
                    booking.status === 'rejected' ? 'Rejected' : 'Pending',
                    bookingDate
                ];
            });
            
            console.log('Table data prepared:', tableData);
            
            // Add comprehensive table
            doc.autoTable({
                startY: 85,
                head: [['#', 'Customer', 'Email', 'Ticket', 'Qty', 'Amount', 'Status', 'Date']],
                body: tableData,
                theme: 'grid',
                headStyles: {
                    fillColor: [255, 140, 66],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    fontSize: 10,
                    halign: 'center'
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 4,
                    lineColor: [200, 200, 200],
                    lineWidth: 0.1
                },
                columnStyles: {
                    0: { cellWidth: 10, halign: 'center' },
                    1: { cellWidth: 28 },
                    2: { cellWidth: 38 },
                    3: { cellWidth: 32 },
                    4: { cellWidth: 12, halign: 'center' },
                    5: { cellWidth: 25, halign: 'right' },
                    6: { cellWidth: 22, halign: 'center' },
                    7: { cellWidth: 23, halign: 'center' }
                },
                didParseCell: function(data) {
                    // Color code status column
                    if (data.column.index === 6 && data.section === 'body') {
                        const status = data.cell.raw;
                        if (status === 'Accepted') {
                            data.cell.styles.textColor = [22, 101, 52];
                            data.cell.styles.fillColor = [220, 252, 231];
                            data.cell.styles.fontStyle = 'bold';
                        } else if (status === 'Rejected') {
                            data.cell.styles.textColor = [220, 38, 38];
                            data.cell.styles.fillColor = [254, 242, 242];
                            data.cell.styles.fontStyle = 'bold';
                        } else {
                            data.cell.styles.textColor = [217, 119, 6];
                            data.cell.styles.fillColor = [254, 243, 199];
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }
                },
                margin: { top: 85, left: 14, right: 14 }
            });
            
            console.log('Table added to PDF');
            
            // Calculate totals
            const totalAmount = filteredBookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
            const totalQuantity = filteredBookings.reduce((sum, b) => sum + (b.bookingQuantity || 0), 0);
            
            // Add summary at the end
            const finalY = doc.lastAutoTable.finalY + 10;
            doc.setFillColor(248, 250, 252);
            doc.rect(14, finalY, 182, 25, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text('Total Summary:', 20, finalY + 8);
            doc.setFontSize(10);
            doc.text(`Total Bookings: ${filteredBookings.length}`, 20, finalY + 15);
            doc.text(`Total Quantity: ${totalQuantity}`, 20, finalY + 21);
            doc.text(`Total Amount: BDT ${totalAmount.toLocaleString()}`, 100, finalY + 15);
            doc.text(`Report Generated: ${dateStr}`, 100, finalY + 21);
            
            // Add footer with page numbers and branding
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                
                // Footer line
                doc.setDrawColor(255, 140, 66);
                doc.setLineWidth(0.5);
                doc.line(14, doc.internal.pageSize.getHeight() - 15, 196, doc.internal.pageSize.getHeight() - 15);
                
                // Page number
                doc.setFontSize(9);
                doc.setTextColor(100);
                doc.text(
                    `Page ${i} of ${pageCount}`,
                    105,
                    doc.internal.pageSize.getHeight() - 10,
                    { align: 'center' }
                );
                
                // Branding
                doc.text(
                    'Online Ticket Booking System',
                    14,
                    doc.internal.pageSize.getHeight() - 10
                );
                
                doc.text(
                    `© ${new Date().getFullYear()}`,
                    196,
                    doc.internal.pageSize.getHeight() - 10,
                    { align: 'right' }
                );
            }
            
            console.log('Footer added');
            
            // Save the PDF
            const fileName = `booking-requests-${new Date().toISOString().split('T')[0]}.pdf`;
            console.log('Saving PDF as:', fileName);
            doc.save(fileName);
            
            console.log('PDF saved successfully');
            
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'PDF Downloaded!',
                text: `${filteredBookings.length} booking requests exported successfully.`,
                timer: 2500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            Swal.fire({
                icon: 'error',
                title: 'Export Failed',
                text: `Error: ${error.message}. Please check the console for details.`,
                confirmButtonColor: '#ff8c42'
            });
        }
    };
    return (
        <Container className='p-4 lg:p-8'>
            {/* Header Section */}
            <Header>
                <HeaderLeft>
                    <Title>Booking Requests</Title>
                    <Subtitle>Manage and review customer booking requests</Subtitle>
                </HeaderLeft>
                <HeaderRight>
                     <ActionButton onClick={handleRefresh} disabled={isFetching}>
                                    <FiRefreshCw className={isFetching ? 'animate-spin' : ''} />
                                    {isFetching ? 'Refreshing...' : 'Refresh'}
                                </ActionButton>
                    <ActionButton onClick={handleExportPDF}>
                        <FaDownload />
                        Export
                    </ActionButton>
                </HeaderRight>
            </Header>

            {/* Stats Overview */}
            <StatsContainer>
                <StatCard>
                    <StatIcon color="#ff8c42">
                        <FaTicket />
                    </StatIcon>
                    <StatContent>
                        <StatValue>{bookings.length}</StatValue>
                        <StatLabel>Total Requests</StatLabel>
                    </StatContent>
                </StatCard>
                <StatCard>
                    <StatIcon color="#10b981">
                        <FaCheck />
                    </StatIcon>
                    <StatContent>
                        <StatValue>{bookings.filter(b => b.status === 'accepted').length}</StatValue>
                        <StatLabel>Accepted</StatLabel>
                    </StatContent>
                </StatCard>
                <StatCard>
                    <StatIcon color="#ef4444">
                        <FaTimes />
                    </StatIcon>
                    <StatContent>
                        <StatValue>{bookings.filter(b => b.status === 'rejected').length}</StatValue>
                        <StatLabel>Rejected</StatLabel>
                    </StatContent>
                </StatCard>
                <StatCard>
                    <StatIcon color="#f59e0b">
                        <FiClock />
                    </StatIcon>
                    <StatContent>
                        <StatValue>{bookings.filter(b => !b.status || b.status === 'pending').length}</StatValue>
                        <StatLabel>Pending</StatLabel>
                    </StatContent>
                </StatCard>
            </StatsContainer>

            {/* Filters and Search */}
            <FiltersContainer>
                <SearchContainer>
                    <SearchIcon>
                        <FaSearch />
                    </SearchIcon>
                    <SearchInput
                        type="text"
                        placeholder="Search by name, email, or ticket title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>
                
                {/* DaisyUI Status Filter Select */}
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            </FiltersContainer>

            {/* Desktop Table View */}
            <TableContainer>
                <TableWrapper>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>#</TableHeaderCell>
                                <TableHeaderCell>Customer</TableHeaderCell>
                                <TableHeaderCell>Ticket Details</TableHeaderCell>
                                <TableHeaderCell>Quantity</TableHeaderCell>
                                <TableHeaderCell>Amount</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>Actions</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.map((booking, i) => (
                                <TableRow key={booking._id}>
                                    <TableCell>
                                        <RowNumber>#{i + 1}</RowNumber>
                                    </TableCell>
                                    <TableCell>
                                        <CustomerInfo>
                                            <CustomerAvatar>
                                                {booking.name.charAt(0).toUpperCase()}
                                            </CustomerAvatar>
                                            <CustomerDetails>
                                                <CustomerName>{booking.name}</CustomerName>
                                                <CustomerEmail>{booking.email}</CustomerEmail>
                                            </CustomerDetails>
                                        </CustomerInfo>
                                    </TableCell>
                                    <TableCell>
                                        <TicketInfo>
                                            <TicketTitle>{booking.ticket_title}</TicketTitle>
                                            <TicketMeta>
                                                <FaHashtag />
                                                ID: {booking._id.slice(-6)}
                                            </TicketMeta>
                                        </TicketInfo>
                                    </TableCell>
                                    <TableCell>
                                        <QuantityBadge>{booking.bookingQuantity}</QuantityBadge>
                                    </TableCell>
                                    <TableCell>
                                        <Amount>৳{booking.total_price?.toLocaleString()}</Amount>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(booking.status)}
                                    </TableCell>
                                    <TableCell>
                                        {(!booking.status || booking.status === 'pending') ? (
                                            <ActionButtons>
                                                <AcceptButton
                                                    onClick={() => handleApproved(booking._id)}
                                                    disabled={isProcessing === booking._id}
                                                >
                                                    <FaCheck />
                                                    <ButtonText>{isProcessing === booking._id ? 'Processing...' : 'Accept'}</ButtonText>
                                                </AcceptButton>
                                                <RejectButton
                                                    onClick={() => handleRejection(booking._id)}
                                                    disabled={isProcessing === booking._id}
                                                >
                                                    <FaTimes />
                                                    <ButtonText>Reject</ButtonText>
                                                </RejectButton>
                                            </ActionButtons>
                                        ) : (
                                            <ViewButton onClick={() => handleOpenViewModal(booking)}>
                                                <FiEye />
                                            </ViewButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableWrapper>
            </TableContainer>

            {/* Mobile Card View */}
            <MobileContainer>
                {filteredBookings.map((booking, i) => (
                    <BookingCard key={booking._id}>
                        <CardHeader>
                            <CardNumber>#{i + 1}</CardNumber>
                            {getStatusBadge(booking.status)}
                        </CardHeader>

                        <CardContent>
                            <TicketSection>
                                <TicketIcon>
                                    <FaTicket />
                                </TicketIcon>
                                <TicketDetails>
                                    <TicketTitle>{booking.ticket_title}</TicketTitle>
                                    <TicketId>Booking ID: {booking._id.slice(-6)}</TicketId>
                                </TicketDetails>
                            </TicketSection>

                            <InfoGrid>
                                <InfoItem>
                                    <InfoIcon><FaUser /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Customer</InfoLabel>
                                        <InfoValue>{booking.name}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon><FaEnvelope /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Email</InfoLabel>
                                        <InfoValue>{booking.email}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon><FaHashtag /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Quantity</InfoLabel>
                                        <InfoValue>{booking.bookingQuantity}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon><FaDollarSign /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Total Amount</InfoLabel>
                                        <InfoValue>৳{booking.total_price?.toLocaleString()}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                            </InfoGrid>
                        </CardContent>

                        {(!booking.status || booking.status === 'pending') && (
                            <CardActions>
                                <AcceptButton
                                    onClick={() => handleApproved(booking._id)}
                                    disabled={isProcessing === booking._id}
                                >
                                    <FaCheck />
                                    {isProcessing === booking._id ? 'Processing...' : 'Accept'}
                                </AcceptButton>
                                <RejectButton
                                    onClick={() => handleRejection(booking._id)}
                                    disabled={isProcessing === booking._id}
                                >
                                    <FaTimes />
                                    Reject
                                </RejectButton>
                            </CardActions>
                        )}
                    </BookingCard>
                ))}
            </MobileContainer>

            {filteredBookings.length === 0 && (
                <EmptyState>
                    <EmptyIcon>
                        <FaTicket />
                    </EmptyIcon>
                    <EmptyTitle>No booking requests found</EmptyTitle>
                    <EmptySubtitle>
                        {searchTerm || statusFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria'
                            : 'Booking requests will appear here when customers make reservations'
                        }
                    </EmptySubtitle>
                </EmptyState>
            )}

            {/* DaisyUI Modal for View Details */}
            {isViewModalOpen && selectedBooking && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <button 
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                            onClick={handleCloseViewModal}
                        >
                            ✕
                        </button>
                        
                        <h3 className="font-bold text-2xl mb-6 text-center" style={{color: '#ff8c42'}}>
                            Booking Details
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Booking ID */}
                            <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <FaHashtag className="text-orange-500 text-xl" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-500">Booking ID</p>
                                    <p className="font-semibold text-lg">{selectedBooking._id}</p>
                                </div>
                            </div>

                            {/* Customer Name */}
                            <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FaUser className="text-blue-500 text-xl" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-500">Customer Name</p>
                                    <p className="font-semibold text-lg">{selectedBooking.name}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaEnvelope className="text-green-500 text-xl" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-semibold text-lg">{selectedBooking.email}</p>
                                </div>
                            </div>

                            {/* Ticket Title */}
                            <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <FaTicket className="text-purple-500 text-xl" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-500">Ticket Title</p>
                                    <p className="font-semibold text-lg">{selectedBooking.ticket_title}</p>
                                </div>
                            </div>

                            {/* Quantity and Price */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <FaHashtag className="text-yellow-500 text-xl" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm text-gray-500">Quantity</p>
                                        <p className="font-semibold text-lg">{selectedBooking.bookingQuantity}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <FaDollarSign className="text-green-500 text-xl" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm text-gray-500">Total Price</p>
                                        <p className="font-semibold text-lg">৳{selectedBooking.total_price?.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                    {selectedBooking.status === 'accepted' ? (
                                        <FiCheckCircle className="text-green-500 text-xl" />
                                    ) : selectedBooking.status === 'rejected' ? (
                                        <FiXCircle className="text-red-500 text-xl" />
                                    ) : (
                                        <FiClock className="text-yellow-500 text-xl" />
                                    )}
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-500">Status</p>
                                    <div className="mt-1">
                                        {getStatusBadge(selectedBooking.status)}
                                    </div>
                                </div>
                            </div>

                            {/* Booking Date */}
                            {selectedBooking.createdAt && (
                                <div className="flex items-center p-4 bg-base-200 rounded-lg">
                                    <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                        <FiClock className="text-pink-500 text-xl" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm text-gray-500">Booking Date</p>
                                        <p className="font-semibold text-lg">
                                            {new Date(selectedBooking.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                style={{backgroundColor: '#ff8c42', color: 'white', border: 'none'}}
                                onClick={handleCloseViewModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={handleCloseViewModal}></div>
                </div>
            )}

            {/* DaisyUI Modal for Update */}
            {isModalOpen && selectedBooking && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-2xl mb-4 text-center" style={{color: '#ff8c42'}}>
                            Update Booking Details
                        </h3>
                        
                        <form onSubmit={handleUpdateBooking}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Customer Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Customer Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={selectedBooking.name}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={selectedBooking.email}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Ticket Title */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Ticket Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="ticket_title"
                                        defaultValue={selectedBooking.ticket_title}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Quantity</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="bookingQuantity"
                                        defaultValue={selectedBooking.bookingQuantity}
                                        className="input input-bordered w-full"
                                        min="1"
                                        required
                                    />
                                </div>

                                {/* Total Price */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Total Price (BDT)</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="total_price"
                                        defaultValue={selectedBooking.total_price}
                                        className="input input-bordered w-full"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                {/* Status */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Status</span>
                                    </label>
                                    <select
                                        name="status"
                                        defaultValue={selectedBooking.status || 'pending'}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn"
                                    style={{backgroundColor: '#ff8c42', color: 'white', border: 'none'}}
                                >
                                    Update Booking
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={handleCloseModal}></div>
                </div>
            )}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    background: #f8fafc;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const HeaderLeft = styled.div``;

const HeaderRight = styled.div`
    display: flex;
    gap: 1rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Subtitle = styled.p`
    color: #6b7280;
    font-size: 1.1rem;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    color: #374151;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f9fafb;
        border-color: #ff8c42;
        color: #ff8c42;
    }
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const StatCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
`;

const StatIcon = styled.div`
    width: 48px;
    height: 48px;
    background: ${props => props.color}20;
    color: ${props => props.color};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
`;

const StatContent = styled.div``;

const StatValue = styled.div`
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
`;

const StatLabel = styled.div`
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
`;

const FiltersContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SearchContainer = styled.div`
    position: relative;
    flex: 1;
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    background: white;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
`;

const FilterSelect = styled.select`
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    background: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
`;

const TableContainer = styled.div`
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    margin-bottom: 2rem;
    
    @media (max-width: 1024px) {
        display: none;
    }
`;

const TableWrapper = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
`;

const TableHeader = styled.thead`
    background: #f9fafb;
`;

const TableRow = styled.tr`
    &:hover {
        background: #f8fafc;
    }
`;

const TableHeaderCell = styled.th`
    padding: 1rem 1.5rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f3f4f6;
    vertical-align: middle;
`;

const RowNumber = styled.span`
    font-weight: 600;
    color: #6b7280;
    background: #f8fafc;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
`;

const CustomerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 180px;
`;

const CustomerAvatar = styled.div`
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
`;

const CustomerDetails = styled.div`
    min-width: 0;
    flex: 1;
`;

const CustomerName = styled.div`
    font-weight: 600;
    color: #1f2937;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CustomerEmail = styled.div`
    font-size: 0.8rem;
    color: #6b7280;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TicketInfo = styled.div`
    min-width: 200px;
`;

const TicketTitle = styled.div`
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TicketMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: #6b7280;
    white-space: nowrap;
`;

const QuantityBadge = styled.span`
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
`;

const Amount = styled.span`
    font-weight: 700;
    color: #10b981;
    font-size: 1.1rem;
    white-space: nowrap;
`;

const StatusBadge = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    
    ${props => {
        switch (props.status) {
            case 'accepted':
                return 'background: #dcfce7; color: #166534;';
            case 'rejected':
                return 'background: #fef2f2; color: #dc2626;';
            default:
                return 'background: #fef3c7; color: #d97706;';
        }
    }}
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    min-width: 140px;
`;

const ViewButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #f3f4f6;
    color: #6b7280;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    
    &:hover {
        background: #e5e7eb;
        color: #374151;
    }
`;

const ButtonText = styled.span`
    @media (max-width: 480px) {
        display: none;
    }
`;

const MobileContainer = styled.div`
    display: grid;
    gap: 1.5rem;
    
    @media (min-width: 1025px) {
        display: none;
    }
`;

const BookingCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const CardNumber = styled.span`
    font-weight: 700;
    color: #ff8c42;
    font-size: 1.1rem;
`;

const CardContent = styled.div`
    margin-bottom: 1.5rem;
`;

const TicketSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
`;

const TicketIcon = styled.div`
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
`;

const TicketDetails = styled.div`
    flex: 1;
    min-width: 0;
`;

const TicketId = styled.div`
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.25rem;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const InfoIcon = styled.div`
    width: 32px;
    height: 32px;
    background: #f3f4f6;
    color: #6b7280;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
`;

const InfoContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const InfoLabel = styled.div`
    font-size: 0.7rem;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
    word-break: break-all;
    overflow-wrap: anywhere;
`;

const CardActions = styled.div`
    display: flex;
    gap: 1rem;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 16px;
    margin-top: 2rem;
`;

const EmptyIcon = styled.div`
    width: 80px;
    height: 80px;
    background: #f3f4f6;
    color: #9ca3af;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 1.5rem;
`;

const EmptyTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const EmptySubtitle = styled.p`
    color: #6b7280;
    max-width: 400px;
    margin: 0 auto;
`;

const AcceptButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
    
    &:hover:not(:disabled) {
        background: #059669;
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const RejectButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
    
    &:hover:not(:disabled) {
        background: #dc2626;
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export default RequestedBooking;

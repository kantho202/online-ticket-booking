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

const RequestedBooking = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isProcessing, setIsProcessing] = useState(null);

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
                    <ActionButton>
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
                <FilterSelect
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </FilterSelect>
            </FiltersContainer>

            {/* Desktop Table View */}
            <TableContainer className="hidden lg:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>#</TableHeaderCell>
                            <TableHeaderCell>Customer</TableHeaderCell>
                            <TableHeaderCell>Ticket Details</TableHeaderCell>
                            <TableHeaderCell>Quantity</TableHeaderCell>
                            <TableHeaderCell>Amount</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
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
                                            {/* <img src={booking.image} alt="" /> */}
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
                                            <FiCalendar /> Booking ID: {booking._id.slice(-6)}
                                        </TicketMeta>
                                    </TicketInfo>
                                </TableCell>
                                <TableCell>
                                    <QuantityBadge>{booking.bookingQuantity}</QuantityBadge>
                                </TableCell>
                                <TableCell>
                                    <Amount>${booking.total_price?.toLocaleString()}</Amount>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(booking.status)}
                                </TableCell>
                                <TableCell>
                                    <ActionButtons>
                                        {(!booking.status || booking.status === 'pending') && (
                                            <>
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
                                            </>
                                        )}
                                        <ViewButton>
                                            <FiEye />
                                        </ViewButton>
                                    </ActionButtons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Mobile Card View */}
            <MobileContainer className="block lg:hidden">
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
                                    <TicketId>ID: {booking._id.slice(-6)}</TicketId>
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
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    // padding: 2rem;
    background: #;
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
    background: ;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    color: #;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #;
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
    background: ;
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
    color: #;
`;

const StatLabel = styled.div`
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
`;

const FiltersContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
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
    background: ;
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
    background: ;
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
    background: ;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background: #f9fafb;
`;

const TableRow = styled.tr`
    &:hover {
        background: #;
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
    background: #;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.8rem;
`;

const CustomerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
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
`;

const CustomerDetails = styled.div``;

const CustomerName = styled.div`
    font-weight: 600;
    color: #;
`;

const CustomerEmail = styled.div`
    font-size: 0.8rem;
    color: #6b7280;
`;

const TicketInfo = styled.div``;

const TicketTitle = styled.div`
    font-weight: 600;
    color: #;
    margin-bottom: 0.25rem;
`;

const TicketMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: #6b7280;
`;

const QuantityBadge = styled.span`
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
`;

const Amount = styled.span`
    font-weight: 700;
    color: #10b981;
    font-size: 1.1rem;
`;

const StatusBadge = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    
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
`;

const AcceptButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
        background: #059669;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const RejectButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
        background: #dc2626;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
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
    
    &:hover {
        background: #e5e7eb;
        color: #374151;
    }
`;

const MobileContainer = styled.div`
    display: grid;
    gap: 1.5rem;
`;

const BookingCard = styled.div`
    background: ;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
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
    background: #;
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
`;

const TicketDetails = styled.div`
    flex: 1;
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
`;

const InfoContent = styled.div`
    flex: 1;
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

export default RequestedBooking;

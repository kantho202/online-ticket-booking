import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import useAuth from '../../../hook/useAuth';
import Loader from '../../../components/Loading/Loading';
import styled from 'styled-components';
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
        return <Loader />;
    }

    return (
        <Container className='p-4 lg:p-8'>
            {/* Header Section */}
            <Header>
                <HeaderLeft>
                    <Title>Transaction History</Title>
                    <Subtitle>Track all your payment transactions and bookings</Subtitle>
                </HeaderLeft>
                <HeaderRight>
                    <ActionButton>
                        <FaFileExport />
                        Export
                    </ActionButton>
                    <ActionButton>
                        <FaFilter />
                        Filter
                    </ActionButton>
                </HeaderRight>
            </Header>

            {/* Stats Overview */}
            <StatsContainer>
                <StatCard>
                    <StatIcon color="#ff8c42">
                        <FaReceipt />
                    </StatIcon>
                    <StatContent>
                        <StatValue>{payments.length}</StatValue>
                        <StatLabel>Total Transactions</StatLabel>
                    </StatContent>
                </StatCard>
                <StatCard>
                    <StatIcon color="#10b981">
                        <FaMoneyBillWave />
                    </StatIcon>
                    <StatContent>
                        <StatValue>৳{formatAmount(totalAmount)}</StatValue>
                        <StatLabel>Total Spent</StatLabel>
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
                        placeholder="Search by ticket name or transaction ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>
            </FiltersContainer>

            {/* Mobile Card View */}
            <MobileContainer>
                {filteredPayments.map((payment, i) => (
                    <TransactionCard key={payment._id}>
                        <CardHeader>
                            <CardNumber>#{i + 1}</CardNumber>
                            <StatusBadge status="completed">
                                <FaCheckCircle /> Completed
                            </StatusBadge>
                        </CardHeader>

                        <CardContent>
                            <TicketSection>
                                <TicketIcon>
                                    <FaTicketAlt />
                                </TicketIcon>
                                <TicketDetails>
                                    <TicketTitle>{payment.ticketName}</TicketTitle>
                                    <TicketId>Amount: ৳{formatAmount(payment.amount)}</TicketId>
                                </TicketDetails>
                            </TicketSection>

                            <InfoGrid>
                                <InfoItem>
                                    <InfoIcon><FaUser /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Email</InfoLabel>
                                        <InfoValue>{payment.email}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon><FaCreditCard /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Transaction ID</InfoLabel>
                                        <InfoValue>{payment.transactionId}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon><FaCalendarAlt /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Date & Time</InfoLabel>
                                        <InfoValue>{formatDate(payment.paidAt)}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon><FaMoneyBillWave /></InfoIcon>
                                    <InfoContent>
                                        <InfoLabel>Amount</InfoLabel>
                                        <InfoValue>৳{formatAmount(payment.amount)}</InfoValue>
                                    </InfoContent>
                                </InfoItem>
                            </InfoGrid>
                        </CardContent>

                        <CardActions>
                            <ViewButton>
                                <FaEye />
                                View Details
                            </ViewButton>
                            <DownloadButton>
                                <FaDownload />
                                Download
                            </DownloadButton>
                        </CardActions>
                    </TransactionCard>
                ))}
            </MobileContainer>

            {filteredPayments.length === 0 && (
                <EmptyState>
                    <EmptyIcon>
                        <FaReceipt />
                    </EmptyIcon>
                    <EmptyTitle>No Transactions Found</EmptyTitle>
                    <EmptySubtitle>
                        {searchTerm 
                            ? 'Try adjusting your search criteria'
                            : 'You haven\'t made any transactions yet'
                        }
                    </EmptySubtitle>
                </EmptyState>
            )}
        </Container>
    );
};

// Styled Components (using RequestedBooking mobile styles)
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
    background: white;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
`;

const MobileContainer = styled.div`
    display: grid;
    gap: 1.5rem;
`;

const TransactionCard = styled.div`
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

const TicketTitle = styled.div`
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
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

const StatusBadge = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    background: #dcfce7;
    color: #166534;
`;

const CardActions = styled.div`
    display: flex;
    gap: 1rem;
`;

const ViewButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #2563eb;
        transform: translateY(-1px);
    }
`;

const DownloadButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #059669;
        transform: translateY(-1px);
    }
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

export default TransactionHistory;

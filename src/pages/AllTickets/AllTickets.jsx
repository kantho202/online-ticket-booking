import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosecure';
import { Link } from 'react-router';
import { LuSearch } from "react-icons/lu";
import styled from 'styled-components';
import Loader from '../../components/Loading/Loading';
import useRole from '../../hook/useRole';
import { 
    FaMapMarkerAlt, 
    FaUsers, 
    FaBus, 
    FaTrain, 
    FaPlane, 
    FaShip,
    FaArrowRight,
    FaCalendarAlt,
    FaClock,
    FaStar,
    FaWifi,
    FaCoffee,
    FaParking,
    FaTv,
    FaSnowflake,
    FaRoute,
    FaFilter,
    FaSort
} from 'react-icons/fa';

const AllTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [transportType, setTransportType] = useState("");
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState("asc");
    const itemsPerPage = 6;
    const skip = (currentPage - 1) * itemsPerPage;

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets', searchText, transportType, currentPage, order, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/sort?status=approved&searchText=${searchText}&transport=${transportType}&limit=${itemsPerPage}&skip=${skip}&sort=${sort}&order=${order}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const transportIcons = {
        Bus: FaBus,
        Train: FaTrain,
        Plane: FaPlane,
        Launch: FaShip
    };

    const perkIcons = {
        AC: FaSnowflake,
        Breakfast: FaCoffee,
        WiFi: FaWifi,
        TV: FaTv,
        Parking: FaParking,
        'Air Conditioning': FaSnowflake,
        'Free WiFi': FaWifi
    };

    const handleSelect = (e) => {
        const sortText = e.target.value;
        setSort(sortText.split("-")[0]);
        setOrder(sortText.split("-")[1]);
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: 'Available', time: 'Flexible' };
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return { date, time };
    };

    const { role } = useRole();

    if (role === 'fraud') {
        return (
            <FraudContainer>
                <FraudCard>
                    <h2>Access Restricted 🚫</h2>
                    <p>Your account is marked as fraud. You are not allowed to view tickets.</p>
                </FraudCard>
            </FraudContainer>
        );
    }

    return (
        <StyledContainer>
            <BackgroundPattern />
            <div className="container" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
                <HeaderSection>
                    <MainTitle>All Available Tickets</MainTitle>
                    <Subtitle>Discover and book your perfect travel experience</Subtitle>
                </HeaderSection>

                <FilterSection>
                    <SearchContainer>
                        <SearchWrapper>
                            <SearchIcon>
                                <LuSearch />
                            </SearchIcon>
                            <SearchInput
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1);
                                }}
                                type="search"
                                placeholder="Search destinations, cities, or ticket names..."
                            />
                            <TransportSelect
                                value={transportType}
                                onChange={(e) => {
                                    setTransportType(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">All Transport</option>
                                <option value="Bus">🚌 Bus</option>
                                <option value="Train">🚂 Train</option>
                                <option value="Plane">✈️ Plane</option>
                                <option value="Launch">🚢 Launch</option>
                            </TransportSelect>
                        </SearchWrapper>
                    </SearchContainer>

                    <SortContainer>
                        <SortIcon>
                            <FaSort />
                        </SortIcon>
                        <SortSelect
                            defaultValue="price-asc"
                            onChange={handleSelect}
                        >
                            <option disabled value="">Sort by price</option>
                            <option value="price-asc">💰 Low to High</option>
                            <option value="price-desc">💎 High to Low</option>
                        </SortSelect>
                    </SortContainer>
                </FilterSection>

                {isLoading ? (
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                ) : tickets.length === 0 ? (
                    <EmptyState>
                        <EmptyIcon>🎫</EmptyIcon>
                        <EmptyTitle>No Tickets Found</EmptyTitle>
                        <EmptySubtitle>Try adjusting your search criteria or filters</EmptySubtitle>
                    </EmptyState>
                ) : (
                    <TicketsGrid>
                        {tickets.map((ticket, index) => {
                            const TransportIcon = transportIcons[ticket.transport] || FaBus;
                            const { date, time } = formatDateTime(ticket.departureDateTime);
                            
                            return (
                                <TicketCard 
                                    key={ticket._id} 
                                    data-aos="fade-up" 
                                    data-aos-duration="800"
                                    data-aos-delay={index * 100}
                                >
                                    <ImageContainer>
                                        <TicketImage src={ticket.image} alt={ticket.ticketTitle} />
                                        <ImageOverlay />
                                        <PriceTag>
                                            <PriceAmount>${ticket.price}</PriceAmount>
                                            <PriceLabel>per person</PriceLabel>
                                        </PriceTag>
                                        {/* <TransportBadge>
                                            <TransportIcon />
                                            {ticket.transport}
                                        </TransportBadge> */}
                                    </ImageContainer>

                                    <CardContent>
                                        <TicketHeader>
                                            <TicketTitle>{ticket.ticketTitle}</TicketTitle>
                                            {/* <RatingContainer>
                                                <FaStar />
                                                <span>4.8</span>
                                            </RatingContainer> */}
                                        </TicketHeader>

                                        <RouteInfo>
                                            <RoutePoint>
                                                <FaMapMarkerAlt />
                                                <RouteText>{ticket.from}</RouteText>
                                            </RoutePoint>
                                            <RouteLine>
                                                <FaRoute />
                                            </RouteLine>
                                            <RoutePoint>
                                                <FaMapMarkerAlt />
                                                <RouteText>{ticket.to}</RouteText>
                                            </RoutePoint>
                                        </RouteInfo>

                                       

                                        <InfoGrid>
                                            <InfoCard>
                                                <InfoIcon>
                                                    <FaUsers />
                                                </InfoIcon>
                                                <InfoContent>
                                                    <InfoLabel>Seats</InfoLabel>
                                                    <InfoValue>{ticket.ticketQuantity}</InfoValue>
                                                </InfoContent>
                                            </InfoCard>

                                            <InfoCard>
                                                <InfoIcon>
                                                    <FaCalendarAlt />
                                                </InfoIcon>
                                                <InfoContent>
                                                    <InfoLabel>Date</InfoLabel>
                                                    <InfoValue>{date}</InfoValue>
                                                </InfoContent>
                                            </InfoCard>

                                            <InfoCard>
                                                <InfoIcon>
                                                    <FaClock />
                                                </InfoIcon>
                                                <InfoContent>
                                                    <InfoLabel>Time</InfoLabel>
                                                    <InfoValue>{time}</InfoValue>
                                                </InfoContent>
                                            </InfoCard>

                                            <InfoCard>
                                                <InfoIcon>
                                                    <TransportIcon />
                                                </InfoIcon>
                                                <InfoContent>
                                                    <InfoLabel>Type</InfoLabel>
                                                    <InfoValue>{ticket.transport}</InfoValue>
                                                </InfoContent>
                                            </InfoCard>
                                        </InfoGrid>
 <TravelerInfo>
                                            <TravelerAvatar>
                                                {ticket.name?.charAt(0)?.toUpperCase() || 'T'}
                                            </TravelerAvatar>
                                            <TravelerDetails>
                                                <TravelerLabel>Organized by</TravelerLabel>
                                                <TravelerName>
                                                    {ticket.name?.length > 12 ? 
                                                        ticket.name : 
                                                        ticket.name || 'Travel Agent'
                                                    }
                                                </TravelerName>
                                            </TravelerDetails>
                                            {/* <VerifiedBadge>✓</VerifiedBadge> */}
                                        </TravelerInfo>
                                        {ticket.perks && ticket.perks.length > 0 && (
                                            <PerksSection>
                                                <PerksTitle>Amenities</PerksTitle>
                                                <PerksContainer>
                                                    {ticket.perks.slice(0, 3).map((perk, index) => {
                                                        const PerkIcon = perkIcons[perk] || FaWifi;
                                                        return (
                                                            <PerkTag key={index}>
                                                                <PerkIcon />
                                                                <span>{perk}</span>
                                                            </PerkTag>
                                                        );
                                                    })}
                                                    {ticket.perks.length > 3 && (
                                                        <PerkTag className="more">
                                                            +{ticket.perks.length - 3}
                                                        </PerkTag>
                                                    )}
                                                </PerksContainer>
                                            </PerksSection>
                                        )}

                                        <ActionSection>
                                            <Link to={`/seeDetails/${ticket._id}`}>
                                                <BookButton>
                                                    <ButtonContent>
                                                        <ButtonText>View Details</ButtonText>
                                                        <ButtonIcon>
                                                            <FaArrowRight />
                                                        </ButtonIcon>
                                                    </ButtonContent>
                                                    <ButtonGlow />
                                                </BookButton>
                                            </Link>
                                        </ActionSection>
                                    </CardContent>
                                </TicketCard>
                            );
                        })}
                    </TicketsGrid>
                )}

                {tickets.length > 0 && (
                    <PaginationContainer>
                        <PaginationButton
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </PaginationButton>
                        <PageIndicator>Page {currentPage}</PageIndicator>
                        <PaginationButton
                            disabled={tickets.length < itemsPerPage}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </PaginationButton>
                    </PaginationContainer>
                )}
            </div>
        </StyledContainer>
    );
};

// Styled Components
const StyledContainer = styled.div`
    min-height: 100vh;
    background: ;
    padding: 4rem 0;
    position: relative;
    overflow: hidden;

    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
        z-index: 2;

        @media (max-width: 768px) {
            padding: 0 1rem;
        }
    }
`;

const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 140, 66, 0.1) 0%, transparent 50%);
    pointer-events: none;
`;

const HeaderSection = styled.div`
    text-align: center;
    margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
    font-size: 3.5rem;
    font-weight: 800;
    color: ;
    margin-bottom: 1rem;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
    line-height: 1.1;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    color: ;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

const FilterSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    background: ;
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1.5rem;
    }
`;

const SearchContainer = styled.div`
    flex: 1;
`;

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    background: ;
    border-radius: 50px;
    padding: 0.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    transition: all 0.3s ease;

    &:focus-within {
        border-color: #ff8c42;
        box-shadow: 0 8px 25px rgba(255, 140, 66, 0.2);
    }
`;

const SearchIcon = styled.div`
    padding: 1rem;
    color: #;
    font-size: 1.2rem;
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    padding: 1rem 0;
    font-size: 1rem;
    background: ;

    &::placeholder {
        color: #9ca3af;
    }
`;

const TransportSelect = styled.select`
    border: none;
    outline: none;
    padding: 1rem;
    background: #;
    border-radius: 25px;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    margin-right: 0.5rem;

    &:focus {
        background: #e2e8f0;
    }
`;

const SortContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    background: ;
    padding: 1rem 1.5rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

const SortIcon = styled.div`
    color: ;
    font-size: 1.1rem;
`;

const SortSelect = styled.select`
    border: none;
    outline: none;
    background: ;
    color: ;
    font-weight: 600;
    cursor: pointer;

    option {
        background: ;
        color: white;
    }
`;

const LoaderContainer = styled.div`
    text-center;
    padding: 4rem 0;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: ;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1.5rem;
`;

const EmptyTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
`;

const EmptySubtitle = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
`;

const TicketsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    align-items: stretch;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const TicketCard = styled.div`
    background: ;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
    }
`;

const ImageContainer = styled.div`
    position: relative;
    height: 200px;
    overflow: hidden;
    flex-shrink: 0;
`;

const TicketImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;

    ${TicketCard}:hover & {
        transform: scale(1.1);
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.3) 70%,
        rgba(0, 0, 0, 0.6) 100%
    );
`;

const PriceTag = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
`;

const PriceAmount = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
`;

const PriceLabel = styled.div`
    font-size: 0.65rem;
    opacity: 0.9;
    margin-top: 0.25rem;
`;

const TransportBadge = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: ;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-transform: capitalize;
`;

const CardContent = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
`;

const TicketHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
`;

const TicketTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 700;
    color: #;
    line-height: 1.3;
    flex: 1;
    min-height: 2.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #fef3c7;
    padding: 0.4rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #92400e;
    flex-shrink: 0;

    svg {
        color: #ffd700;
        font-size: 0.75rem;
    }
`;

const RouteInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
`;

const RoutePoint = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: #;
    flex: 1;
    min-width: 0;

    svg {
        color: #ff8c42;
        font-size: 0.9rem;
        flex-shrink: 0;
    }
`;

const RouteText = styled.span`
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const RouteLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    color: #ff8c42;
    font-size: 0.8rem;
    font-weight: 600;
    flex-shrink: 0;
`;

const TravelerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    min-height: 60px;
`;

const TravelerAvatar = styled.div`
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    flex-shrink: 0;
`;

const TravelerDetails = styled.div`
    flex: 1;
    min-width: 0;
`;

const TravelerLabel = styled.div`
    font-size: 0.6rem;
    color: #9ca3af;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.2rem;
`;

const TravelerName = styled.div`
    font-size: 0.8rem;
    color: #374151;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const VerifiedBadge = styled.div`
    background: #10b981;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 600;
    flex-shrink: 0;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;

const InfoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: ;
    border-radius: 10px;
    border: 2px solid #f1f5f9;
    transition: all 0.3s ease;
    min-height: 55px;

    &:hover {
        border-color: #ff8c42;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
    }
`;

const InfoIcon = styled.div`
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ;
    font-size: 0.8rem;
    box-shadow: 0 3px 10px rgba(255, 140, 66, 0.3);
    flex-shrink: 0;
`;

const InfoContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const InfoLabel = styled.div`
    font-size: 0.6rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.2rem;
`;

const InfoValue = styled.div`
    font-size: 0.75rem;
    color: #374151;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PerksSection = styled.div`
    min-height: 60px;
    display: flex;
    flex-direction: column;
`;

const PerksTitle = styled.h4`
    font-size: 0.75rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const PerksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    flex: 1;
    align-content: flex-start;
`;

const PerkTag = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.6rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 12px;
    font-size: 0.65rem;
    font-weight: 600;
    box-shadow: 0 3px 10px rgba(255, 140, 66, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 140, 66, 0.4);
    }

    &.more {
        background: linear-gradient(135deg, #6b7280, #4b5563);
        box-shadow: 0 3px 10px rgba(107, 114, 128, 0.3);
    }

    svg {
        font-size: 0.7rem;
    }
`;

const ActionSection = styled.div`
    margin-top: auto;
    padding-top: 0.75rem;

    a {
        text-decoration: none;
        width: 100%;
        display: block;
    }
`;

const BookButton = styled.button`
    position: relative;
    width: 100%;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.4s ease;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(255, 140, 66, 0.3);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(255, 140, 66, 0.4);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    position: relative;
    z-index: 2;
`;

const ButtonText = styled.span`
    font-size: 0.95rem;
`;

const ButtonIcon = styled.div`
    font-size: 1rem;
    transition: transform 0.3s ease;

    ${BookButton}:hover & {
        transform: translateX(3px);
    }
`;

const ButtonGlow = styled.div`
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;

    ${BookButton}:hover & {
        left: 100%;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 3rem;
`;

const PaginationButton = styled.button`
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 140, 66, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 140, 66, 0.4);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const PageIndicator = styled.span`
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 12px;
    font-weight: 600;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

const FraudContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const FraudCard = styled.div`
    text-align: center;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 500px;

    h2 {
        font-size: 2rem;
        font-weight: 700;
        color: #ef4444;
        margin-bottom: 1rem;
    }

    p {
        color: white;
        font-size: 1.1rem;
        line-height: 1.6;
    }
`;

export default AllTickets;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import styled from 'styled-components';
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
    FaSnowflake
} from 'react-icons/fa';

const LatestTickets = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: homeTicket = [] } = useQuery({
        queryKey: ['homeTicket'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?status=approved&limit=6');
            return res.data;
        }
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
        Parking: FaParking
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <StyledContainer>
            <BackgroundPattern />
            <div className="container" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
                <HeaderSection>
                    <HeaderBadge>
                        <FaStar />
                        Featured Destinations
                    </HeaderBadge>
                    <MainTitle>Latest Travel Tickets</MainTitle>
                    <Subtitle>Discover amazing travel experiences and book your next adventure with exclusive deals</Subtitle>
                </HeaderSection>

                <TicketsGrid>
                    {homeTicket.map((ticket, index) => (
                        <div key={ticket._id} data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 100}>
                            <TicketCard>
                                <ImageContainer>
                                    <TicketImage
                                        src={ticket.image}
                                        alt={ticket.ticketTitle}
                                    />
                                    <ImageOverlay />
                                    <PriceTag>
                                        <PriceAmount>${ticket.price}</PriceAmount>
                                        <PriceLabel>per person</PriceLabel>
                                    </PriceTag>
                                    <StatusBadge>Available</StatusBadge>
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
                                            <FaArrowRight />
                                        </RouteLine>
                                        <RoutePoint>
                                            <FaMapMarkerAlt />
                                            <RouteText>{ticket.to}</RouteText>
                                        </RoutePoint>
                                    </RouteInfo>

                                    <InfoGrid>
                                        <InfoCard>
                                            <InfoIcon>
                                                {React.createElement(transportIcons[ticket.transport] || FaBus)}
                                            </InfoIcon>
                                            <InfoContent>
                                                <InfoLabel>Transport</InfoLabel>
                                                <InfoValue>{ticket.transport}</InfoValue>
                                            </InfoContent>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoIcon>
                                                <FaUsers />
                                            </InfoIcon>
                                            <InfoContent>
                                                <InfoLabel>Available</InfoLabel>
                                                <InfoValue>{ticket.ticketQuantity} seats</InfoValue>
                                            </InfoContent>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoIcon>
                                                <FaCalendarAlt />
                                            </InfoIcon>
                                            <InfoContent>
                                                <InfoLabel>Date</InfoLabel>
                                                <InfoValue>{formatDate(ticket.departureDateTime)}</InfoValue>
                                            </InfoContent>
                                        </InfoCard>

                                        <InfoCard>
                                            <InfoIcon>
                                                <FaClock />
                                            </InfoIcon>
                                            <InfoContent>
                                                <InfoLabel>Time</InfoLabel>
                                                <InfoValue>{formatTime(ticket.departureDateTime)}</InfoValue>
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
                                                {ticket.name?.length > 15 
                                                    ? ticket.name.slice(0, 15) + '...' 
                                                    : ticket.name || 'Travel Agent'
                                                }
                                            </TravelerName>
                                        </TravelerDetails>
                                    </TravelerInfo>

                                    <PerksSection>
                                        <PerksTitle>Included Amenities</PerksTitle>
                                        <PerksContainer>
                                            {ticket.perks && ticket.perks.length > 0 ? (
                                                <>
                                                    {ticket.perks.slice(0, 3).map((perk, index) => (
                                                        <PerkTag key={index}>
                                                            {React.createElement(perkIcons[perk] || FaWifi)}
                                                            <span>{perk}</span>
                                                        </PerkTag>
                                                    ))}
                                                    {ticket.perks.length > 3 && (
                                                        <PerkTag className="more">
                                                            +{ticket.perks.length - 3} more
                                                        </PerkTag>
                                                    )}
                                                </>
                                            ) : (
                                                <PerkTag className="no-perks">
                                                    <FaWifi />
                                                    <span>Basic Service</span>
                                                </PerkTag>
                                            )}
                                        </PerksContainer>
                                    </PerksSection>

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
                        </div>
                    ))}
                </TicketsGrid>

                {homeTicket.length === 0 && (
                    <EmptyState>
                        <EmptyIcon>🎫</EmptyIcon>
                        <EmptyTitle>No Tickets Available</EmptyTitle>
                        <EmptySubtitle>Check back later for new travel opportunities</EmptySubtitle>
                    </EmptyState>
                )}
            </div>
        </StyledContainer>
    );
};

// Enhanced Styled Components with Equal Height Cards
const StyledContainer = styled.div`
    min-height: 100vh;
    background: ;
    padding: 6rem 0;
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
    margin-bottom: 5rem;
    
    @media (max-width: 768px) {
        margin-bottom: 3rem;
    }
`;

const HeaderBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    color: ;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    svg {
        color: #ffd700;
    }
`;

const MainTitle = styled.h1`
    font-size: 4rem;
    font-weight: 800;
    color: ;
    margin-bottom: 1.5rem;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
    line-height: 1.1;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.3rem;
    color: ;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
    font-weight: 300;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const TicketsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2.5rem;
    align-items: stretch; /* This ensures all cards stretch to the same height */

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    /* Ensure all direct children have equal height */
    > div {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`;

const TicketCard = styled.div`
    background: ;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    height: 100%; /* Ensure full height */

    &:hover {
        transform: translateY(-15px) scale(1.02);
        box-shadow: 0 35px 70px rgba(0, 0, 0, 0.25);
    }
`;

const ImageContainer = styled.div`
    position: relative;
    height: 250px; /* Fixed height for all images */
    overflow: hidden;
    flex-shrink: 0; /* Prevent shrinking */
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
    top: 1.5rem;
    right: 1.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 8px 25px rgba(255, 140, 66, 0.4);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
`;

const PriceAmount = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
`;

const PriceLabel = styled.div`
    font-size: 0.7rem;
    opacity: 0.9;
    margin-top: 0.25rem;
`;

const StatusBadge = styled.div`
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    background: rgba(16, 185, 129, 0.9);
    color: ;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardContent = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    flex: 1; /* Take remaining space */
    gap: 1.5rem; /* Consistent spacing between sections */
`;

const TicketHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
`;

const TicketTitle = styled.h2`
    font-size: 1.4rem;
    font-weight: 700;
    color: #;
    line-height: 1.3;
    flex: 1;
    min-height: 3.5rem; /* Fixed minimum height for titles */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #;
    padding: 0.5rem 0.75rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ff8c42;
    flex-shrink: 0;

    svg {
        color: #ffd700;
        font-size: 0.8rem;
    }
`;

const RouteInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
    background: ;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
`;

const RoutePoint = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #374151;
    flex: 1;
    min-width: 0; /* Allow text truncation */

    svg {
        color: #ff8c42;
        font-size: 1.1rem;
        flex-shrink: 0;
    }
`;

const RouteText = styled.span`
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const RouteLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    color: #ff8c42;
    font-size: 1rem;
    font-weight: 600;
    flex-shrink: 0;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
`;

const InfoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #;
    
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    min-height: 70px; /* Fixed height for consistency */

    &:hover {
        background: #ff8c42;
        // color:#FFFFFF;
        border-color: #fed7aa;
        transform: translateY(-2px);
    }
`;

const InfoIcon = styled.div`
    width: 35px;
    height: 35px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(255, 140, 66, 0.3);
    flex-shrink: 0;
`;

const InfoContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const InfoLabel = styled.div`
    font-size: 0.65rem;
    color: #;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
    font-size: 0.85rem;
    color: #374151;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TravelerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    min-height: 70px; /* Fixed height */
`;

const TravelerAvatar = styled.div`
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    flex-shrink: 0;
`;

const TravelerDetails = styled.div`
    flex: 1;
    min-width: 0;
`;

const TravelerLabel = styled.div`
    font-size: 0.65rem;
    color: #9ca3af;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
`;

const TravelerName = styled.div`
    font-size: 0.9rem;
    color: #374151;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PerksSection = styled.div`
    min-height: 80px; /* Fixed minimum height for perks section */
    display: flex;
    flex-direction: column;
`;

const PerksTitle = styled.h4`
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
`;

const PerksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
    align-content: flex-start;
`;

const PerkTag = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(255, 140, 66, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
    }

    &.more {
        background: linear-gradient(135deg, #6b7280, #4b5563);
        box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
    }

    &.no-perks {
        background: linear-gradient(135deg, #94a3b8, #64748b);
        box-shadow: 0 4px 15px rgba(148, 163, 184, 0.3);
    }

    svg {
        font-size: 0.8rem;
    }
`;

const ActionSection = styled.div`
    margin-top: auto; /* Push to bottom */
    padding-top: 1rem;

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
    padding: 1.25rem 2rem;
    border-radius: 16px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.4s ease;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(255, 140, 66, 0.4);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
    z-index: 2;
`;

const ButtonText = styled.span`
    font-size: 1.1rem;
`;

const ButtonIcon = styled.div`
    font-size: 1.2rem;
    transition: transform 0.3s ease;

    ${BookButton}:hover & {
        transform: translateX(4px);
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

const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 2rem;
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

export default LatestTickets;

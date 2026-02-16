import React from 'react';
import styled from 'styled-components';
import { 
    FaMobileAlt, 
    FaClock, 
    FaMapMarkedAlt, 
    FaHeadset, 
    FaPercent, 
    FaLock 
} from 'react-icons/fa';

const TicketingFeatures = () => {
    const features = [
        {
            icon: <FaMobileAlt />,
            title: "Mobile Friendly",
            description: "Book tickets anytime, anywhere from your mobile device",
            color: "#3b82f6"
        },
        {
            icon: <FaClock />,
            title: "24/7 Availability",
            description: "Access our platform round the clock for instant bookings",
            color: "#10b981"
        },
        {
            icon: <FaMapMarkedAlt />,
            title: "Multiple Routes",
            description: "Wide range of destinations and routes to choose from",
            color: "#f59e0b"
        },
        {
            icon: <FaHeadset />,
            title: "Customer Support",
            description: "Dedicated support team ready to assist you",
            color: "#8b5cf6"
        },
        {
            icon: <FaPercent />,
            title: "Best Prices",
            description: "Competitive pricing with exclusive deals and offers",
            color: "#ec4899"
        },
        {
            icon: <FaLock />,
            title: "Secure Booking",
            description: "Safe and encrypted payment processing",
            color: "#ef4444"
        }
    ];

    return (
        <Container>
            <ContentWrapper>
                <Header>
                    <Title>Why Book Tickets Online?</Title>
                    <Subtitle>Experience hassle-free ticket booking with our advanced features</Subtitle>
                </Header>

                <FeaturesGrid>
                    {features.map((feature, index) => (
                        <FeatureCard key={index}>
                            <IconCircle color={feature.color}>
                                {feature.icon}
                            </IconCircle>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>

                <StatsSection>
                    <StatItem>
                        <StatNumber>10K+</StatNumber>
                        <StatLabel>Happy Customers</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatNumber>50+</StatNumber>
                        <StatLabel>Routes Available</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatNumber>99.9%</StatNumber>
                        <StatLabel>Success Rate</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatNumber>24/7</StatNumber>
                        <StatLabel>Support Available</StatLabel>
                    </StatItem>
                </StatsSection>
            </ContentWrapper>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 4rem 1rem;
    background: white;
    
    @media (max-width: 768px) {
        padding: 3rem 1rem;
    }
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.1rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
    
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const FeatureCard = styled.div`
    padding: 2rem;
    border-radius: 16px;
    background: #f8fafc;
    text-align: center;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    
    &:hover {
        background: white;
        border-color: #ff8c42;
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(255, 140, 66, 0.15);
    }
`;

const IconCircle = styled.div`
    width: 70px;
    height: 70px;
    background: ${props => props.color}20;
    color: ${props => props.color};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin: 0 auto 1.5rem;
    transition: all 0.3s ease;
    
    ${FeatureCard}:hover & {
        transform: scale(1.1) rotate(5deg);
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
    font-size: 0.95rem;
    color: #6b7280;
    line-height: 1.6;
`;

const StatsSection = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(255, 140, 66, 0.3);
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        padding: 2rem 1rem;
    }
`;

const StatItem = styled.div`
    text-align: center;
    color: white;
`;

const StatNumber = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const StatLabel = styled.div`
    font-size: 1rem;
    opacity: 0.95;
    font-weight: 500;
`;

export default TicketingFeatures;

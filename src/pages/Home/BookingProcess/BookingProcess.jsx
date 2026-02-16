import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaTicketAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const BookingProcess = () => {
    const steps = [
        {
            icon: <FaSearch />,
            title: "Search Tickets",
            description: "Browse available tickets for your destination",
            color: "#3b82f6"
        },
        {
            icon: <FaTicketAlt />,
            title: "Select & Book",
            description: "Choose your preferred ticket and booking details",
            color: "#10b981"
        },
        {
            icon: <FaCreditCard />,
            title: "Secure Payment",
            description: "Complete payment with our secure payment gateway",
            color: "#f59e0b"
        },
        {
            icon: <FaCheckCircle />,
            title: "Get Confirmation",
            description: "Receive instant booking confirmation via email",
            color: "#8b5cf6"
        }
    ];

    return (
        <Container>
            <ContentWrapper>
                <Header>
                    <Title>How Online Ticket Booking Works</Title>
                    <Subtitle>Book your tickets in 4 simple steps</Subtitle>
                </Header>

                <StepsGrid>
                    {steps.map((step, index) => (
                        <StepCard key={index}>
                            <StepNumber>{index + 1}</StepNumber>
                            <IconWrapper color={step.color}>
                                {step.icon}
                            </IconWrapper>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                            {index < steps.length - 1 && <Arrow>→</Arrow>}
                        </StepCard>
                    ))}
                </StepsGrid>

                <CTASection>
                    <CTATitle>Ready to Book Your Ticket?</CTATitle>
                    <CTAButton href="/all-tickets">Browse All Tickets</CTAButton>
                </CTASection>
            </ContentWrapper>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 4rem 1rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
    
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
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.1rem;
    color: #6b7280;
`;

const StepsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
    position: relative;
    
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const StepCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }
`;

const StepNumber = styled.div`
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    box-shadow: 0 4px 8px rgba(255, 140, 66, 0.3);
`;

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    background: ${props => props.color}20;
    color: ${props => props.color};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 1.5rem auto 1.5rem;
    transition: all 0.3s ease;
    
    ${StepCard}:hover & {
        transform: scale(1.1);
    }
`;

const StepTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
`;

const StepDescription = styled.p`
    font-size: 0.95rem;
    color: #6b7280;
    line-height: 1.6;
`;

const Arrow = styled.div`
    position: absolute;
    top: 50%;
    right: -2rem;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #ff8c42;
    font-weight: bold;
    
    @media (max-width: 1024px) {
        display: none;
    }
`;

const CTASection = styled.div`
    text-align: center;
    padding: 3rem 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
`;

const CTATitle = styled.h3`
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
`;

const CTAButton = styled.a`
    display: inline-block;
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 140, 66, 0.4);
    }
`;

export default BookingProcess;

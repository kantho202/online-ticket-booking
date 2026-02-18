import React from 'react';
import styled from 'styled-components';
import { 
    FaRocket, 
    FaUsers, 
    FaAward, 
    FaGlobe,
    FaCheckCircle 
} from 'react-icons/fa';

const AboutSection = () => {
    const achievements = [
        { icon: <FaUsers />, number: "10K+", label: "Happy Customers" },
        { icon: <FaGlobe />, number: "50+", label: "Cities Covered" },
        { icon: <FaAward />, number: "5+", label: "Years Experience" },
        { icon: <FaRocket />, number: "99%", label: "Success Rate" }
    ];

    const features = [
        "Easy and quick ticket booking process",
        "Secure payment gateway integration",
        "Real-time ticket availability updates",
        "24/7 customer support service",
        "Mobile-friendly booking platform",
        "Instant booking confirmation"
    ];

    return (
        <Container>
            <ContentWrapper>
                <ContentGrid>
                    {/* Left Side - Image & Stats */}
                    <LeftSection>
                        <ImageWrapper>
                            <MainImage 
                                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop" 
                                alt="Online Ticket Booking"
                            />
                            <FloatingCard>
                                <FloatingIcon>
                                    <FaRocket />
                                </FloatingIcon>
                                <FloatingText>
                                    <FloatingNumber>10K+</FloatingNumber>
                                    <FloatingLabel>Tickets Booked</FloatingLabel>
                                </FloatingText>
                            </FloatingCard>
                        </ImageWrapper>

                        <AchievementsGrid>
                            {achievements.map((item, index) => (
                                <AchievementCard key={index}>
                                    <AchievementIcon>{item.icon}</AchievementIcon>
                                    <AchievementNumber>{item.number}</AchievementNumber>
                                    <AchievementLabel>{item.label}</AchievementLabel>
                                </AchievementCard>
                            ))}
                        </AchievementsGrid>
                    </LeftSection>

                    {/* Right Side - Content */}
                    <RightSection>
                        <Badge>About Us</Badge>
                        <Title>Your Trusted Partner for Online Ticket Booking</Title>
                        <Description>
                            We are a leading online ticket booking platform dedicated to making your travel 
                            planning seamless and hassle-free. With years of experience in the industry, 
                            we provide a reliable and user-friendly platform for booking tickets to various 
                            destinations.
                        </Description>
                        <Description>
                            Our mission is to revolutionize the way people book tickets by offering a 
                            convenient, secure, and efficient booking experience. We partner with trusted 
                            service providers to ensure you get the best deals and quality service.
                        </Description>

                        <FeaturesSection>
                            <FeaturesTitle>Why Choose Our Platform?</FeaturesTitle>
                            <FeaturesList>
                                {features.map((feature, index) => (
                                    <FeatureItem key={index}>
                                        <CheckIcon>
                                            <FaCheckCircle />
                                        </CheckIcon>
                                        <FeatureText>{feature}</FeatureText>
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                        </FeaturesSection>

                        <ButtonGroup>
                            <PrimaryButton href="/all-tickets">Book Now</PrimaryButton>
                            <SecondaryButton href="/contact">Contact Us</SecondaryButton>
                        </ButtonGroup>
                    </RightSection>
                </ContentGrid>
            </ContentWrapper>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 5rem 1rem;
    background: #ffffff;
    
    @media (max-width: 768px) {
        padding: 3rem 1rem;
    }
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const LeftSection = styled.div`
    position: relative;
`;

const ImageWrapper = styled.div`
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const MainImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
    
    @media (max-width: 768px) {
        height: 300px;
    }
`;

const FloatingCard = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: ;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: float 3s ease-in-out infinite;
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;

const FloatingIcon = styled.div`
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
`;

const FloatingText = styled.div``;

const FloatingNumber = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
`;

const FloatingLabel = styled.div`
    font-size: 0.85rem;
    color: #6b7280;
`;

const AchievementsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const AchievementCard = styled.div`
    background: #f8fafc;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
    
    &:hover {
        background: white;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-5px);
    }
`;

const AchievementIcon = styled.div`
    font-size: 1.75rem;
    color: #ff8c42;
    margin-bottom: 0.5rem;
`;

const AchievementNumber = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.25rem;
`;

const AchievementLabel = styled.div`
    font-size: 0.8rem;
    color: #6b7280;
`;

const RightSection = styled.div``;

const Badge = styled.div`
    display: inline-block;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Description = styled.p`
    font-size: 1.05rem;
    color: #6b7280;
    line-height: 1.8;
    margin-bottom: 1.5rem;
`;

const FeaturesSection = styled.div`
    margin: 2rem 0;
`;

const FeaturesTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
`;

const FeaturesList = styled.div`
    display: grid;
    gap: 1rem;
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const CheckIcon = styled.div`
    color: #10b981;
    font-size: 1.25rem;
    flex-shrink: 0;
`;

const FeatureText = styled.span`
    font-size: 1rem;
    color: #4b5563;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    
    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

const PrimaryButton = styled.a`
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
    text-align: center;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 140, 66, 0.4);
    }
`;

const SecondaryButton = styled.a`
    display: inline-block;
    padding: 1rem 2rem;
    background: white;
    color: #ff8c42;
    font-weight: 600;
    border: 2px solid #ff8c42;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    text-align: center;
    
    &:hover {
        background: #ff8c42;
        color: white;
        transform: translateY(-2px);
    }
`;

export default AboutSection;

import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    FaPhone, 
    FaEnvelope, 
    FaMapMarkerAlt, 
    FaClock,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you for contacting us. We will get back to you soon.',
            confirmButtonColor: '#ff8c42'
        });

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: <FaPhone />,
            title: 'Phone',
            details: ['+880 1234-567890', '+880 9876-543210'],
            color: '#10b981'
        },
        {
            icon: <FaEnvelope />,
            title: 'Email',
            details: ['support@ticketbooking.com', 'info@ticketbooking.com'],
            color: '#3b82f6'
        },
        {
            icon: <FaMapMarkerAlt />,
            title: 'Address',
            details: ['123 Main Street', 'Dhaka, Bangladesh'],
            color: '#ef4444'
        },
        {
            icon: <FaClock />,
            title: 'Working Hours',
            details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: 10:00 AM - 4:00 PM'],
            color: '#f59e0b'
        }
    ];

    const socialLinks = [
        { icon: <FaFacebook />, name: 'Facebook', url: '#', color: '#1877f2' },
        { icon: <FaTwitter />, name: 'Twitter', url: '#', color: '#1da1f2' },
        { icon: <FaInstagram />, name: 'Instagram', url: '#', color: '#e4405f' },
        { icon: <FaLinkedin />, name: 'LinkedIn', url: '#', color: '#0077b5' }
    ];

    return (
        <Container>
            <ContentWrapper>
                {/* Header */}
                <Header>
                    <Title>Get In Touch</Title>
                    <Subtitle>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</Subtitle>
                </Header>

                {/* Contact Info Cards */}
                <ContactInfoGrid>
                    {contactInfo.map((info, index) => (
                        <InfoCard key={index}>
                            <IconWrapper color={info.color}>
                                {info.icon}
                            </IconWrapper>
                            <InfoTitle>{info.title}</InfoTitle>
                            {info.details.map((detail, idx) => (
                                <InfoDetail key={idx}>{detail}</InfoDetail>
                            ))}
                        </InfoCard>
                    ))}
                </ContactInfoGrid>

                {/* Contact Form and Map Section */}
                <ContactSection>
                    {/* Contact Form */}
                    <FormSection>
                        <FormTitle>Send Us a Message</FormTitle>
                        <Form onSubmit={handleSubmit}>
                            <FormRow>
                                <FormGroup>
                                    <Label>Your Name *</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email Address *</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </FormGroup>
                            </FormRow>

                            <FormRow>
                                <FormGroup>
                                    <Label>Phone Number</Label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Subject *</Label>
                                    <Input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Enter subject"
                                        required
                                    />
                                </FormGroup>
                            </FormRow>

                            <FormGroup>
                                <Label>Message *</Label>
                                <TextArea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows="6"
                                    required
                                />
                            </FormGroup>

                            <SubmitButton type="submit">
                                Send Message
                            </SubmitButton>
                        </Form>
                    </FormSection>

                    {/* Map Section */}
                    <MapSection>
                        <FormTitle>Find Us Here</FormTitle>
                        <MapContainer>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.25446309999999!3d23.780573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '12px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            />
                        </MapContainer>

                        {/* Social Links */}
                        <SocialSection>
                            <SocialTitle>Follow Us</SocialTitle>
                            <SocialLinks>
                                {socialLinks.map((social, index) => (
                                    <SocialLink 
                                        key={index} 
                                        href={social.url}
                                        color={social.color}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {social.icon}
                                    </SocialLink>
                                ))}
                            </SocialLinks>
                        </SocialSection>
                    </MapSection>
                </ContactSection>
            </ContentWrapper>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 4rem 1rem;
    background: #f8fafc;
    min-height: 100vh;
    
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

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
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
    max-width: 600px;
    margin: 0 auto;
`;

const ContactInfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
    
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const InfoCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }
`;

const IconWrapper = styled.div`
    width: 60px;
    height: 60px;
    background: ${props => props.color}20;
    color: ${props => props.color};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 1rem;
`;

const InfoTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
`;

const InfoDetail = styled.p`
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
`;

const ContactSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const FormSection = styled.div`
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    resize: vertical;
    font-family: inherit;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
`;

const SubmitButton = styled.button`
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 140, 66, 0.4);
    }
`;

const MapSection = styled.div`
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const MapContainer = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 2rem;
`;

const SocialSection = styled.div`
    text-align: center;
`;

const SocialTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const SocialLink = styled.a`
    width: 50px;
    height: 50px;
    background: ${props => props.color}20;
    color: ${props => props.color};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${props => props.color};
        color: white;
        transform: translateY(-3px);
    }
`;

export default Contact;

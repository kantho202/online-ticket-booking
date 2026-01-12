import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loading/Loading';
import { 
    IoTicket, 
    IoCloudUpload, 
    IoCalendar, 
    IoLocation, 
    IoPricetag,
    IoCheckmarkCircle,
    IoInformationCircle
} from 'react-icons/io5';
import { 
    FaUser, 
    FaEnvelope, 
    FaBus, 
    FaTrain, 
    FaPlane, 
    FaShip,
    FaWifi,
    FaCoffee,
    FaParking,
    FaTv,
    FaSnowflake
} from 'react-icons/fa';
import styled from 'styled-components';

const AddTicket = () => {
    const serviceCenter = useLoaderData();
    const regionsDuplicate = serviceCenter.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Add this state

    const perks = [
        { name: "AC", icon: FaSnowflake, label: "Air Conditioning" },
        { name: "Breakfast", icon: FaCoffee, label: "Complimentary Breakfast" },
        { name: "WiFi", icon: FaWifi, label: "Free WiFi" },
        { name: "TV", icon: FaTv, label: "Entertainment System" },
        { name: "Parking", icon: FaParking, label: "Free Parking" }
    ];

    const transportTypes = [
        { value: "Bus", icon: FaBus, label: "Bus" },
        { value: "Train", icon: FaTrain, label: "Train" },
        { value: "Plane", icon: FaPlane, label: "Flight" },
        { value: "Launch", icon: FaShip, label: "Launch/Ferry" }
    ];

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();

    // Fixed image change handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                toast.error('Please select a valid image file (JPG, PNG, GIF, WebP)');
                return;
            }

            // Validate file size (10MB limit)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                toast.error('Image size should be less than 10MB');
                return;
            }

            setSelectedImage(file);
            clearErrors('image'); // Clear any existing image errors

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTicket = async (data) => {
        // Validate image before submission
        if (!selectedImage) {
            toast.error('Please select an image');
            return;
        }

        const result = await Swal.fire({
            title: "Add New Ticket?",
            text: 'Are you sure you want to add this ticket?',
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ff8c42",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Add Ticket!",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;

        setIsSubmitting(true);

        try {
            // Create FormData for image upload
            const formData = new FormData();
            formData.append('image', selectedImage);

            const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            
            // Upload image with better error handling
            const imageResponse = await axios.post(imageAPI_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (imageResponse.data && imageResponse.data.data && imageResponse.data.data.url) {
                const imageUrl = imageResponse.data.data.url;
                
                // Prepare ticket data
                const ticketData = {
                    ...data,
                    image: imageUrl,
                    createAt: new Date(),
                    status: 'pending' // Add default status
                };

                // Remove the file input data since we're using the uploaded URL
                delete ticketData.imageFile;

                console.log('Ticket data to be saved:', ticketData);

                // Save ticket to database
                const saveResponse = await axiosSecure.post('/tickets', ticketData);
                
                if (saveResponse.data) {
                    toast.success('Ticket added successfully!');
                    navigate('/dashboard/myAddedTickets');
                } else {
                    throw new Error('Failed to save ticket data');
                }
            } else {
                throw new Error('Image upload failed - no URL returned');
            }

        } catch (error) {
            console.error('Error adding ticket:', error);
            
            if (error.response) {
                // Server responded with error
                const errorMessage = error.response.data?.message || 'Server error occurred';
                toast.error(`Error: ${errorMessage}`);
            } else if (error.request) {
                // Network error
                toast.error('Network error. Please check your connection.');
            } else {
                // Other error
                toast.error(error.message || 'An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            {/* Header Section */}
            <Header>
                <HeaderIcon>
                    <IoTicket />
                </HeaderIcon>
                <HeaderContent>
                    <Title>Add New Ticket</Title>
                    <Subtitle>Create a new travel ticket for your customers</Subtitle>
                </HeaderContent>
            </Header>

            {/* Form Container */}
            <FormContainer>
                <StyledForm onSubmit={handleSubmit(handleAddTicket)}>
                    {/* Personal Information Section */}
                    <Section>
                        <SectionHeader>
                            <SectionIcon>
                                <FaUser />
                            </SectionIcon>
                            <SectionTitle>Personal Information</SectionTitle>
                        </SectionHeader>
                        
                        <FormGrid>
                            <FormGroup>
                                <Label>
                                    <FaUser />
                                    Full Name
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    readOnly
                                    {...register('name', { required: 'Name is required' })}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <FaEnvelope />
                                    Email Address
                                </Label>
                                <Input
                                    type="email"
                                    defaultValue={user?.email}
                                    readOnly
                                    {...register('email', { required: 'Email is required' })}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                            </FormGroup>
                        </FormGrid>
                    </Section>

                    {/* Ticket Details Section */}
                    <Section>
                        <SectionHeader>
                            <SectionIcon>
                                <IoTicket />
                            </SectionIcon>
                            <SectionTitle>Ticket Details</SectionTitle>
                        </SectionHeader>

                        <FormGrid>
                            <FormGroup className="full-width">
                                <Label>
                                    <IoTicket />
                                    Ticket Title
                                </Label>
                                <Input
                                    type="text"
                                    {...register('ticketTitle', { required: 'Ticket title is required' })}
                                    placeholder="Enter descriptive ticket title"
                                />
                                {errors.ticketTitle && <ErrorMessage>{errors.ticketTitle.message}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <IoPricetag />
                                    Price (৳)
                                </Label>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    {...register('price', { 
                                        required: 'Price is required',
                                        min: { value: 1, message: 'Price must be greater than 0' }
                                    })}
                                    placeholder="Enter ticket price"
                                />
                                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <IoTicket />
                                    Ticket Quantity
                                </Label>
                                <Input
                                    type="number"
                                    min="1"
                                    {...register('ticketQuantity', { 
                                        required: 'Ticket quantity is required',
                                        min: { value: 1, message: 'Quantity must be at least 1' }
                                    })}
                                    placeholder="Available tickets"
                                />
                                {errors.ticketQuantity && <ErrorMessage>{errors.ticketQuantity.message}</ErrorMessage>}
                            </FormGroup>
                        </FormGrid>
                    </Section>

                    {/* Travel Information Section */}
                    <Section>
                        <SectionHeader>
                            <SectionIcon>
                                <IoLocation />
                            </SectionIcon>
                            <SectionTitle>Travel Information</SectionTitle>
                        </SectionHeader>

                        <FormGrid>
                            <FormGroup>
                                <Label>
                                    <IoLocation />
                                    From
                                </Label>
                                <Select
                                    {...register('from', { required: 'Departure location is required' })}
                                >
                                    <option value="">Select departure location</option>
                                    {regions.map((region, i) => (
                                        <option key={i} value={region}>{region}</option>
                                    ))}
                                </Select>
                                {errors.from && <ErrorMessage>{errors.from.message}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <IoLocation />
                                    To
                                </Label>
                                <Select
                                    {...register('to', { required: 'Destination is required' })}
                                >
                                    <option value="">Select destination</option>
                                    {regions.map((region, i) => (
                                        <option key={i} value={region}>{region}</option>
                                    ))}
                                </Select>
                                {errors.to && <ErrorMessage>{errors.to.message}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    <IoCalendar />
                                    Departure Date & Time
                                </Label>
                                <Input
                                    type="datetime-local"
                                    {...register('departureDateTime', { required: 'Departure date and time is required' })}
                                />
                                {errors.departureDateTime && <ErrorMessage>{errors.departureDateTime.message}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Transport Type</Label>
                                <TransportGrid>
                                    {transportTypes.map((transport) => (
                                        <TransportOption key={transport.value}>
                                            <TransportRadio
                                                type="radio"
                                                value={transport.value}
                                                {...register('transport', { required: 'Transport type is required' })}
                                                id={transport.value}
                                            />
                                            <TransportLabel htmlFor={transport.value}>
                                                <transport.icon />
                                                {transport.label}
                                            </TransportLabel>
                                        </TransportOption>
                                    ))}
                                </TransportGrid>
                                {errors.transport && <ErrorMessage>{errors.transport.message}</ErrorMessage>}
                            </FormGroup>
                        </FormGrid>
                    </Section>

                    {/* Image Upload Section - FIXED */}
                    <Section>
                        <SectionHeader>
                            <SectionIcon>
                                <IoCloudUpload />
                            </SectionIcon>
                            <SectionTitle>Ticket Image</SectionTitle>
                        </SectionHeader>

                        <ImageUploadContainer>
                            <ImageUploadArea>
                                {/* Hidden file input */}
                                <HiddenFileInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="image-upload"
                                />
                                
                                <ImageUploadLabel htmlFor="image-upload">
                                    {imagePreview ? (
                                        <ImagePreview>
                                            <img src={imagePreview} alt="Preview" />
                                            <ImageOverlay>
                                                <IoCloudUpload />
                                                <span>Click to change image</span>
                                            </ImageOverlay>
                                        </ImagePreview>
                                    ) : (
                                        <UploadPlaceholder>
                                            <IoCloudUpload />
                                            <UploadText>
                                                <strong>Click to upload</strong> or drag and drop
                                            </UploadText>
                                            <UploadSubtext>PNG, JPG, GIF up to 10MB</UploadSubtext>
                                        </UploadPlaceholder>
                                    )}
                                </ImageUploadLabel>
                            </ImageUploadArea>
                            {!selectedImage && <ErrorMessage>Ticket image is required</ErrorMessage>}
                        </ImageUploadContainer>
                    </Section>

                    {/* Perks Section */}
                    <Section>
                        <SectionHeader>
                            <SectionIcon>
                                <IoCheckmarkCircle />
                            </SectionIcon>
                            <SectionTitle>Available Perks</SectionTitle>
                            <SectionSubtitle>Select the amenities included with this ticket</SectionSubtitle>
                        </SectionHeader>

                        <PerksGrid>
                            {perks.map((perk) => (
                                <PerkOption key={perk.name}>
                                    <PerkCheckbox
                                        type="checkbox"
                                        value={perk.name}
                                        {...register("perks", { required: 'Please select at least one perk' })}
                                        id={perk.name}
                                    />
                                    <PerkLabel htmlFor={perk.name}>
                                        <PerkIcon>
                                            <perk.icon />
                                        </PerkIcon>
                                        <PerkContent>
                                            <PerkName>{perk.name}</PerkName>
                                            <PerkDescription>{perk.label}</PerkDescription>
                                        </PerkContent>
                                    </PerkLabel>
                                </PerkOption>
                            ))}
                        </PerksGrid>
                        {errors.perks && <ErrorMessage>{errors.perks.message}</ErrorMessage>}
                    </Section>

                    {/* Submit Button */}
                    <SubmitSection>
                        <SubmitButton type="submit" disabled={isSubmitting || !selectedImage}>
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner />
                                    Adding Ticket...
                                </>
                            ) : (
                                <>
                                    <IoTicket />
                                    Add Ticket
                                </>
                            )}
                        </SubmitButton>
                        <SubmitNote>
                            <IoInformationCircle />
                            Your ticket will be reviewed before being published
                        </SubmitNote>
                    </SubmitSection>
                </StyledForm>
            </FormContainer>
        </Container>
    );
};

// Add this new styled component for the hidden file input
const HiddenFileInput = styled.input`
    display: none;
`;

// Keep all your existing styled components here...
const Container = styled.div`
    min-height: 100vh;
    background: ;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
    padding: 2rem;
    background: ;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
        padding: 1.5rem;
    }
`;

const HeaderIcon = styled.div`
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
    box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        font-size: 2rem;
    }
`;

const HeaderContent = styled.div`
    flex: 1;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    color: #64748b;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const FormContainer = styled.div`
    background: ;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid #f1f5f9;
    overflow: hidden;
`;

const StyledForm = styled.form`
    padding: 3rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const Section = styled.div`
    margin-bottom: 3rem;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
`;

const SectionIcon = styled.div`
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    box-shadow: 0 4px 15px rgba(255, 140, 66, 0.3);
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #;
    margin: 0;
`;

const SectionSubtitle = styled.p`
    font-size: 0.9rem;
    color: #;
    margin: 0;
    margin-left: auto;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    .full-width {
        grid-column: 1 / -1;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;

    svg {
        color: #ff8c42;
        font-size: 1rem;
    }
`;

const Input = styled.input`
    padding: 1rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        background: ;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }

    &:read-only {
        background: #;
        color: #64748b;
        cursor: not-allowed;
    }

    &::placeholder {
        color: #94a3b8;
    }
`;

const Select = styled.select`
    padding: 1rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        background: ;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }

    option {
        padding: 0.5rem;
    }
`;

const TransportGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
`;

const TransportOption = styled.div`
    position: relative;
`;

const TransportRadio = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked + label {
        background: linear-gradient(135deg, #ff8c42, #ff6b35);
        color: white;
        border-color: #ff8c42;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);
    }
`;

const TransportLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
        border-color: #ff8c42;
        background: ;
    }

    svg {
        font-size: 1.5rem;
    }
`;

const ImageUploadContainer = styled.div`
    margin-top: 1rem;
`;

const ImageUploadArea = styled.div`
    position: relative;
`;

const ImageUploadLabel = styled.label`
    display: block;
    cursor: pointer;
`;

const ImagePreview = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    border: 2px dashed #e2e8f0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: white;
    opacity: 0;
    transition: opacity 0.2s ease;

    ${ImagePreview}:hover & {
        opacity: 1;
    }

    svg {
        font-size: 2rem;
    }
`;

const UploadPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 2rem;
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    background: #;
    transition: all 0.2s ease;

    &:hover {
        border-color: #ff8c42;
        background: ;
    }

    svg {
        font-size: 3rem;
        color: #94a3b8;
    }
`;

const UploadText = styled.div`
    font-size: 1.1rem;
    color: #374151;
    text-align: center;

    strong {
        color: #ff8c42;
    }
`;

const UploadSubtext = styled.div`
    font-size: 0.9rem;
    color: #64748b;
`;

const PerksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const PerkOption = styled.div`
    position: relative;
`;

const PerkCheckbox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked + label {
        background: linear-gradient(135deg, #ff8c42, #ff6b35);
        color: white;
        border-color: #ff8c42;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);

        svg {
            color: ;
        }
    }
`;

const PerkLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #;

    &:hover {
        border-color: #ff8c42;
        background: ;
    }
`;

const PerkIcon = styled.div`
    width: 40px;
    height: 40px;
    background: #e2e8f0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #64748b;
    transition: all 0.2s ease;
`;

const PerkContent = styled.div`
    flex: 1;
`;

const PerkName = styled.div`
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
`;

const PerkDescription = styled.div`
    font-size: 0.8rem;
    color: #64748b;
`;

const ErrorMessage = styled.span`
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &::before {
        content: '⚠';
        font-size: 0.9rem;
    }
`;

const SubmitSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #f1f5f9;
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 3rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(255, 140, 66, 0.4);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    svg {
        font-size: 1.3rem;
    }

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
    }
`;

const LoadingSpinner = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const SubmitNote = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
    text-align: center;

    svg {
        color: #ff8c42;
        font-size: 1rem;
    }
`;

export default AddTicket;

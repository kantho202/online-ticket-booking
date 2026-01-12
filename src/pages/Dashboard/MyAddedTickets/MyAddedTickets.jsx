import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosecure';
import Swal from 'sweetalert2';
import Loader from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
    LuTicketsPlane, 
    // LuEdit, 
    LuTrash2, 
    LuCalendar, 
    LuMapPin, 
    LuUsers, 
    LuDollarSign,
    LuClock,
    LuImage,
    LuX,
    LuCheck,
    // LuAlertCircle
} from 'react-icons/lu';
import { 
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

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ['tickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user?.email}`);
            return res.data;
        }
    });

    const ticketModalRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const perks = [
        { name: "AC", icon: FaSnowflake, label: "Air Conditioning" },
        { name: "Breakfast", icon: FaCoffee, label: "Complimentary Breakfast" },
        { name: "WiFi", icon: FaWifi, label: "Free WiFi" },
        { name: "TV", icon: FaTv, label: "Entertainment System" },
        { name: "Parking", icon: FaParking, label: "Free Parking" }
    ];

    const transportIcons = {
        Bus: FaBus,
        Train: FaTrain,
        Plane: FaPlane,
        Launch: FaShip
    };

    const handleTicketShowModal = (ticket) => {
        setSelectedTicket(ticket);
        setImagePreview(ticket.image);
        
        // Pre-fill form with existing data
        setValue('name', ticket.name);
        setValue('ticketTitle', ticket.ticketTitle);
        setValue('departureDateTime', ticket.departureDateTime);
        setValue('price', ticket.price);
        setValue('email', ticket.email);
        setValue('transport', ticket.transport);
        setValue('ticketQuantity', ticket.ticketQuantity);
        setValue('from', ticket.from);
        setValue('to', ticket.to);
        
        // Set perks checkboxes
        if (ticket.perks) {
            setValue('perks', ticket.perks);
        }
        
        ticketModalRef.current.showModal();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTicketUpdate = async (data) => {
        setIsUpdating(true);
        
        try {
            let imageUrl = selectedTicket.image;

            if (data.image && data.image.length > 0) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`, 
                    formData
                );
                imageUrl = imgRes.data.data.url;
            }

            const updatedTicket = {
                ...data,
                image: imageUrl,
                perks: data.perks || [],
            };

            const res = await axiosSecure.patch(`/tickets/${selectedTicket._id}`, updatedTicket);
            
            if (res.data.modifiedCount > 0) {
                toast.success('Ticket updated successfully!');
                refetch();
                ticketModalRef.current.close();
                reset();
                setImagePreview(null);
            } else {
                toast.info('No changes were made.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Update failed!');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleTicketRemove = (id) => {
        Swal.fire({
            title: "Delete Ticket?",
            text: "You won't be able to revert this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your ticket has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#f59e0b';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <LuCheck />;
            case 'rejected': return <LuX />;
            default: return <LuClock />;
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Container className='p-4 lg:p-8'>
            {/* Header */}
            <Header>
                <HeaderIcon>
                    <LuTicketsPlane />
                </HeaderIcon>
                <HeaderContent>
                    <Title>My Added Tickets</Title>
                    <Subtitle>Manage and track your ticket listings</Subtitle>
                </HeaderContent>
                <StatsCard>
                    <StatsNumber>{tickets.length}</StatsNumber>
                    <StatsLabel>Total Tickets</StatsLabel>
                </StatsCard>
            </Header>

            {/* Tickets Grid */}
            {tickets.length === 0 ? (
                <EmptyState>
                    <EmptyIcon>
                        <LuTicketsPlane />
                    </EmptyIcon>
                    <EmptyTitle>No Tickets Added Yet</EmptyTitle>
                    <EmptySubtitle>Start by adding your first ticket to get bookings</EmptySubtitle>
                </EmptyState>
            ) : (
                <TicketsGrid>
                    {tickets.map(ticket => (
                        <TicketCard key={ticket._id}>
                            <ImageContainer>
                                <TicketImage src={ticket.image} alt={ticket.ticketTitle} />
                                <ImageOverlay />
                                <StatusBadge color={getStatusColor(ticket.status)}>
                                    {getStatusIcon(ticket.status)}
                                    {ticket.status || 'pending'}
                                </StatusBadge>
                                <PriceTag>${ticket.price}</PriceTag>
                            </ImageContainer>

                            <CardContent>
                                <TicketTitle>{ticket.ticketTitle}</TicketTitle>
                                
                                <RouteInfo>
                                    <RouteItem>
                                        <LuMapPin />
                                        <span>{ticket.from}</span>
                                    </RouteItem>
                                    <RouteDivider>→</RouteDivider>
                                    <RouteItem>
                                        <LuMapPin />
                                        <span>{ticket.to}</span>
                                    </RouteItem>
                                </RouteInfo>

                                <InfoGrid>
                                    <InfoItem>
                                        <InfoIcon>
                                            {React.createElement(transportIcons[ticket.transport] || FaBus)}
                                        </InfoIcon>
                                        <InfoText>
                                            <InfoLabel>Transport</InfoLabel>
                                            <InfoValue>{ticket.transport}</InfoValue>
                                        </InfoText>
                                    </InfoItem>
                                    
                                    <InfoItem>
                                        <InfoIcon>
                                            <LuUsers />
                                        </InfoIcon>
                                        <InfoText>
                                            <InfoLabel>Quantity</InfoLabel>
                                            <InfoValue>{ticket.ticketQuantity}</InfoValue>
                                        </InfoText>
                                    </InfoItem>

                                    <InfoItem>
                                        <InfoIcon>
                                            <LuCalendar />
                                        </InfoIcon>
                                        <InfoText>
                                            <InfoLabel>Departure</InfoLabel>
                                            <InfoValue>
                                                {new Date(ticket.departureDateTime).toLocaleDateString()}
                                            </InfoValue>
                                        </InfoText>
                                    </InfoItem>

                                    <InfoItem>
                                        <InfoIcon>
                                            <LuClock />
                                        </InfoIcon>
                                        <InfoText>
                                            <InfoLabel>Time</InfoLabel>
                                            <InfoValue>
                                                {new Date(ticket.departureDateTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </InfoValue>
                                        </InfoText>
                                    </InfoItem>
                                </InfoGrid>

                                {ticket.perks && ticket.perks.length > 0 && (
                                    <PerksContainer>
                                        <PerksTitle>Included Perks</PerksTitle>
                                        <PerksGrid>
                                            {ticket.perks.map((perk, index) => (
                                                <PerkTag key={index}>
                                                    {React.createElement(
                                                        perks.find(p => p.name === perk)?.icon || FaWifi
                                                    )}
                                                    {perk}
                                                </PerkTag>
                                            ))}
                                          
                                        </PerksGrid>
                                    </PerksContainer>
                                )}

                                <ActionButtons>
                                    <UpdateButton
                                        disabled={ticket.status === 'rejected'}
                                        onClick={() => handleTicketShowModal(ticket)}
                                    >
                                        {/* <LuEdit /> */}
                                        Update
                                    </UpdateButton>
                                    <DeleteButton
                                        disabled={ticket.status === 'rejected'}
                                        onClick={() => handleTicketRemove(ticket._id)}
                                    >
                                        <LuTrash2 />
                                        Delete
                                    </DeleteButton>
                                </ActionButtons>
                            </CardContent>
                        </TicketCard>
                    ))}
                </TicketsGrid>
            )}

            {/* Update Modal */}
            {selectedTicket && (
                <Modal ref={ticketModalRef}>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Update Ticket</ModalTitle>
                            <CloseButton onClick={() => ticketModalRef.current.close()}>
                                <LuX />
                            </CloseButton>
                        </ModalHeader>

                        <ModalBody>
                            <UpdateForm onSubmit={handleSubmit(handleTicketUpdate)}>
                                <FormGrid>
                                    {/* Left Column */}
                                    <FormColumn>
                                        <FormGroup>
                                            <Label>Ticket Title</Label>
                                            <Input
                                                type="text"
                                                {...register('ticketTitle', { required: 'Title is required' })}
                                                placeholder="Enter ticket title"
                                            />
                                            {errors.ticketTitle && <ErrorMessage>{errors.ticketTitle.message}</ErrorMessage>}
                                        </FormGroup>

                                        <FormRow>
                                            <FormGroup>
                                                <Label>From</Label>
                                                <Input
                                                    type="text"
                                                    {...register('from', { required: 'From location is required' })}
                                                    placeholder="Departure location"
                                                />
                                                {errors.from && <ErrorMessage>{errors.from.message}</ErrorMessage>}
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>To</Label>
                                                <Input
                                                    type="text"
                                                    {...register('to', { required: 'Destination is required' })}
                                                    placeholder="Destination"
                                                />
                                                {errors.to && <ErrorMessage>{errors.to.message}</ErrorMessage>}
                                            </FormGroup>
                                        </FormRow>

                                        <FormGroup>
                                            <Label>Transport Type</Label>
                                            <Select {...register('transport', { required: 'Transport type is required' })}>
                                                <option value="">Select Transport</option>
                                                <option value="Bus">Bus</option>
                                                <option value="Train">Train</option>
                                                <option value="Plane">Plane</option>
                                                <option value="Launch">Launch</option>
                                            </Select>
                                            {errors.transport && <ErrorMessage>{errors.transport.message}</ErrorMessage>}
                                        </FormGroup>

                                        <FormRow>
                                            <FormGroup>
                                                <Label>Price (৳)</Label>
                                                <Input
                                                    type="number"
                                                    {...register('price', { required: 'Price is required' })}
                                                    placeholder="Ticket price"
                                                />
                                                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Quantity</Label>
                                                <Input
                                                    type="number"
                                                    {...register('ticketQuantity', { required: 'Quantity is required' })}
                                                    placeholder="Available tickets"
                                                />
                                                {errors.ticketQuantity && <ErrorMessage>{errors.ticketQuantity.message}</ErrorMessage>}
                                            </FormGroup>
                                        </FormRow>

                                        <FormGroup>
                                            <Label>Departure Date & Time</Label>
                                            <Input
                                                type="datetime-local"
                                                {...register('departureDateTime', { required: 'Date and time is required' })}
                                            />
                                            {errors.departureDateTime && <ErrorMessage>{errors.departureDateTime.message}</ErrorMessage>}
                                        </FormGroup>
                                    </FormColumn>

                                    {/* Right Column */}
                                    <FormColumn>
                                        <FormGroup>
                                            <Label>Update Image</Label>
                                            <ImageUploadArea>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    {...register('image')}
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                    id="update-image"
                                                />
                                                <ImageUploadLabel htmlFor="update-image">
                                                    {imagePreview ? (
                                                        <ImagePreview>
                                                            <img src={imagePreview} alt="Preview" />
                                                            <ImageOverlayUpdate>
                                                                <LuImage />
                                                                <span>Click to change</span>
                                                            </ImageOverlayUpdate>
                                                        </ImagePreview>
                                                    ) : (
                                                        <UploadPlaceholder>
                                                            <LuImage />
                                                            <span>Click to upload new image</span>
                                                        </UploadPlaceholder>
                                                    )}
                                                </ImageUploadLabel>
                                            </ImageUploadArea>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Available Perks</Label>
                                            <PerksUpdateGrid>
                                                {perks.map((perk) => (
                                                    <PerkCheckboxContainer key={perk.name}>
                                                        <PerkCheckbox
                                                            type="checkbox"
                                                            value={perk.name}
                                                            {...register("perks")}
                                                            id={`update-${perk.name}`}
                                                        />
                                                        <PerkCheckboxLabel htmlFor={`update-${perk.name}`}>
                                                            <perk.icon />
                                                            {perk.name}
                                                        </PerkCheckboxLabel>
                                                    </PerkCheckboxContainer>
                                                ))}
                                            </PerksUpdateGrid>
                                        </FormGroup>
                                    </FormColumn>
                                </FormGrid>

                                <ModalActions>
                                    <CancelButton
                                        type="button"
                                        onClick={() => ticketModalRef.current.close()}
                                    >
                                        Cancel
                                    </CancelButton>
                                    <SubmitButton type="submit" disabled={isUpdating}>
                                        {isUpdating ? (
                                            <>
                                                <LoadingSpinner />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <LuCheck />
                                                Update Ticket
                                            </>
                                        )}
                                    </SubmitButton>
                                </ModalActions>
                            </UpdateForm>
                        </ModalBody>
                    </ModalContent>
                </Modal>
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
    align-items: center;
    gap: 2rem;
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
`;

const HeaderContent = styled.div`
    flex: 1;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Subtitle = styled.p`
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
`;

const StatsCard = styled.div`
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 16px;
    color: white;
    min-width: 120px;
`;

const StatsNumber = styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
`;

const StatsLabel = styled.div`
    font-size: 0.9rem;
    opacity: 0.9;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const EmptyIcon = styled.div`
    width: 100px;
    height: 100px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #94a3b8;
    margin: 0 auto 2rem;
`;

const EmptyTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const EmptySubtitle = styled.p`
    color: #64748b;
    font-size: 1rem;
`;

const TicketsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TicketCard = styled.div`
    background: ;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
`;

const ImageContainer = styled.div`
    position: relative;
    height: 200px;
    overflow: hidden;
`;

const TicketImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${TicketCard}:hover & {
        transform: scale(1.05);
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
        rgba(0, 0, 0, 0.3) 100%
    );
`;

const StatusBadge = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: ${props => props.color};
    color: white;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
    backdrop-filter: blur(10px);
`;

const PriceTag = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.95);
    color: #ff8c42;
    border-radius: 20px;
    font-weight: 700;
    font-size: 1.1rem;
    backdrop-filter: blur(10px);
`;

const CardContent = styled.div`
    padding: 2rem;
`;

const TicketTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: #;
    margin-bottom: 1rem;
`;

const RouteInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #;
    border-radius: 12px;
`;

const RouteItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #374151;

    svg {
        color: #ff8c42;
    }
`;

const RouteDivider = styled.div`
    color: #ff8c42;
    font-weight: 700;
    font-size: 1.2rem;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const InfoIcon = styled.div`
    width: 40px;
    height: 40px;
    background: #fff5f0;
    border: 2px solid #fed7aa;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff8c42;
    font-size: 1.1rem;
`;

const InfoText = styled.div`
    flex: 1;
`;

const InfoLabel = styled.div`
    font-size: 0.7rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
`;

const PerksContainer = styled.div`
    margin-bottom: 1.5rem;
`;

const PerksTitle = styled.h4`
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
`;

const PerksGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const PerkTag = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-radius: 15px;
    font-size: 0.7rem;
    font-weight: 600;

    &.more {
        background: #64748b;
    }

    svg {
        font-size: 0.8rem;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
`;

const UpdateButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

const DeleteButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: ;
    color: #ef4444;
    border: 2px solid #ef4444;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: #ef4444;
        color: white;
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

const Modal = styled.dialog`
    padding: 0;
    border: none;
    border-radius: 20px;
    background: transparent;
    max-width: 90vw;
    max-height: 90vh;
    width: 1000px;

    &::backdrop {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
    }
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
`;

const CloseButton = styled.button`
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;

const ModalBody = styled.div`
    padding: 2rem;
    max-height: 70vh;
    overflow-y: auto;
`;

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
`;

const Select = styled.select`
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.9rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #ff8c42;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }
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
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px dashed #e2e8f0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ImageOverlayUpdate = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
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
`;

const UploadPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 2rem;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    background: #f8fafc;
    color: #64748b;
    transition: all 0.2s ease;

    &:hover {
        border-color: #ff8c42;
        background: white;
    }
`;

const PerksUpdateGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
`;

const PerkCheckboxContainer = styled.div`
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
    }
`;

const PerkCheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.8rem;
    font-weight: 500;

    &:hover {
        border-color: #ff8c42;
        background: #fff5f0;
    }
`;

const ErrorMessage = styled.span`
    color: #ef4444;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &::before {
        content: '⚠';
    }
`;

const ModalActions = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;

const CancelButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: #f1f5f9;
    color: #64748b;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #e2e8f0;
    }
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: ;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(255, 140, 66, 0.3);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const LoadingSpinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default MyAddedTickets;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import Loader from '../../../components/Loading/Loading';
import styled from 'styled-components';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure()
    const { data: advertise = [], isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?isAdvertised=advertise')
            console.log(res)
            return res.data
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <StyledContainer >
                   <div className="container" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800" >
                       <HeaderSection>
                           <h1>Latest Tickets</h1>
                           <p>Discover amazing travel experiences and book your next adventure</p>
                       </HeaderSection>
       
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
                           {advertise.map(ticket => (
                               <div data-aos="fade-up"  data-aos-duration="800">
       
                               <TicketCard key={ticket._id} >
                                   <ImageContainer>
                                       <img
                                           src={ticket.image}
                                           alt={ticket.ticketTitle}
                                       />
                                       <ImageOverlay />
                                       <PriceTag>৳ {ticket.price}</PriceTag>
                                   </ImageContainer>
       
                                   <CardContent>
                                       <TicketTitle>{ticket.ticketTitle}</TicketTitle>
                                       
                                       <InfoGrid>
                                           <InfoItem>
                                               <InfoLabel>Traveler</InfoLabel>
                                               <InfoValue>{ticket.name}</InfoValue>
                                           </InfoItem>
                                           <InfoItem>
                                               <InfoLabel>Transport</InfoLabel>
                                               <InfoValue>{ticket.transport}</InfoValue>
                                           </InfoItem>
                                           <InfoItem>
                                               <InfoLabel>Quantity</InfoLabel>
                                               <InfoValue>{ticket.ticketQuantity}</InfoValue>
                                           </InfoItem>
                                       </InfoGrid>
       
                                       {ticket.perks && ticket.perks.length > 0 && (
                                           <PerksContainer>
                                               {ticket.perks.map((perk, index) => (
                                                    <span
                                                       key={index}
                                                       className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium"
                                                   >
                                                       {perk}
                                                   </span>
                                               ))}
                                               
                                           </PerksContainer>
                                       )}
       
                                       <div>
                                           <Link to={`/seeDetails/${ticket._id}`}>
                                               <button className="learn-more">
                                                       <span className="circle" aria-hidden="true">
                                                           <span className="icon arrow" />
                                                       </span>
                                                       <span className="button-text">See details</span>
                                                   </button>
                                           </Link>
                                       </div>
                                   </CardContent>
                               </TicketCard>
                               </div>
                           ))}
                       </div>
                   </div>
               </StyledContainer>
    );

};

const StyledContainer = styled.div`
    min-height: 100vh;
    background: ;
    padding: 4rem 0;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        pointer-events: none;
    }

    .container {
        // max-width: 1200px;
        margin: 0 auto;
        padding: 1.3rem;
        position: relative;
        z-index: 1;
    }

     button {
   position: relative;
   display: inline-block;
   cursor: pointer;
   outline: none;
   border: 0;
   vertical-align: middle;
   text-decoration: none;
   background: transparent;
   padding: 0;
  
  }

  button.learn-more {
   width: 12rem;
   height: auto;
  }

  button.learn-more .circle {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: relative;
   display: block;
   margin: 0;
   width: 3rem;
   height: 3rem;
   background: orange;
   border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   bottom: 0;
   margin: auto;
   background: #fff;
  }

  button.learn-more .circle .icon.arrow {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   left: 0.625rem;
   width: 1.125rem;
   height: 0.125rem;
   background: none;
  }

  button.learn-more .circle .icon.arrow::before {
   position: absolute;
   content: "";
   top: -0.29rem;
   right: 0.0625rem;
   width: 0.625rem;
   height: 0.625rem;
   border-top: 0.125rem solid #fff;
   border-right: 0.125rem solid #fff;
   transform: rotate(45deg);
  }

  button.learn-more .button-text {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 0.75rem 0;
  
   
   font-weight: 700;
   line-height: 1.6;
   text-align: center;
   
  }

  button:hover .circle {
   width: 90%;
  }

  button:hover .circle .icon.arrow {
   background: #fff;
   transform: translate(1rem, 0);
  }

  button:hover .button-text {
   color: #fff;
  }
`;

const HeaderSection = styled.div`
    text-align: center;
    margin-bottom: 4rem;
    
    h1 {
        font-size: 2.2rem;
        font-weight: 800;
        color: ;
        margin-bottom: 1rem;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        letter-spacing: -0.02em;
        
        @media (max-width: 768px) {
            font-size: 2.5rem;
        }
    }
    
    p {
        font-size: 1.2rem;
        color: ;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
    }
`;

const TicketsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const TicketCard = styled.div`
    background: ;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    
    &:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    }
`;

const ImageContainer = styled.div`
    position: relative;
    height: 250px;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }
    
    &:hover img {
        transform: scale(1.1);
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ;
`;

const PriceTag = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: orange;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: 700;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(238, 90, 36, 0.4);
`;

const CardContent = styled.div`
    padding: 2rem;
`;

const TicketTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1.5rem;
    line-height: 1.3;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
    text-align: center;
    padding: 1rem;
    background: ;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    
    &:hover {
        background:orange ;
        transform: translateY(-2px);
    }
`;

const InfoLabel = styled.div`
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
    font-size: 0.9rem;
    color: #1e293b;
    font-weight: 600;
`;

const PerksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
`;

const ModernButton = styled.button`
    width: 100%;
    background: orange;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(0);
    }
`;
export default Advertisement;
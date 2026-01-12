import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import Loader from '../../../components/Loading/Loading';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    FiDollarSign,
    FiShoppingCart,
    FiPlus,
    FiTrendingUp,
    FiTrendingDown,
    FiCalendar,
    FiDownload,
    FiRefreshCw
} from 'react-icons/fi';
import styled from 'styled-components';

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure()
    const { data: revenue = {}, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['bookings-star'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/summary')
            return res.data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    const statsData = [
        {
            title: 'Total Revenue',
            value: `$${revenue.totalRevenue?.toLocaleString() || 0}`,
            change: '+20%',
            trend: 'up',
            icon: FiDollarSign,
            color: '#ff8c42',
            bgColor: {
                light: '#fff5f0',
                dark: '#3b2a20'
            }
        },
        {
            title: 'Tickets Sold',
            value: revenue.totalTicketSold?.toLocaleString() || 0,
            change: '+15%',
            trend: 'up',
            icon: FiShoppingCart,
            color: '#10b981',
            bgColor: {
                light: '#f0fdf4',
                dark: '#06281a'
            }
        },
        {
            title: 'Tickets Added',
            value: revenue.totalTicketAdded?.toLocaleString() || 0,
            change: '+8%',
            trend: 'up',
            icon: FiPlus,
            color: '#3b82f6',
            bgColor: {
                light: '#eff6ff',
                dark: '#0b1e3a'
            }
        }
    ];

    const chartData = [
        { name: 'Revenue', amount: revenue.totalRevenue || 0, color: '#ff8c42' },
        { name: 'Sold', amount: revenue.totalTicketSold || 0, color: '#10b981' },
        { name: 'Added', amount: revenue.totalTicketAdded || 0, color: '#3b82f6' }
    ];

    const pieData = [
        { name: 'Revenue', value: revenue.totalRevenue || 0, color: '#ff8c42' },
        { name: 'Tickets Sold', value: revenue.totalTicketSold || 0, color: '#10b981' },
        { name: 'Tickets Added', value: revenue.totalTicketAdded || 0, color: '#3b82f6' }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <TooltipContainer>
                    <TooltipLabel>{label}</TooltipLabel>
                    <TooltipValue>
                        {typeof payload[0].value === 'number' && payload[0].dataKey === 'amount' && label === 'Revenue'
                            ? `৳${payload[0].value.toLocaleString()}`
                            : payload[0].value.toLocaleString()
                        }
                    </TooltipValue>
                </TooltipContainer>
            );
        }
        return null;
    };

     const handleRefresh = async () => {
        // await refetch(); // This will refetch the data
       window.location.reload();
    };
    return (
        <Container>
            {/* Header Section */}
            <Header>
                <HeaderLeft>
                    <Title>Revenue Overview</Title>
                    <Subtitle>Track your business performance and growth</Subtitle>
                </HeaderLeft>
                <HeaderRight>
                    {/* <ActionButton  onClick={ refetch}>
                        <FiRefreshCw />
                        Refresh
                    </ActionButton> */}
                     <ActionButton onClick={handleRefresh} disabled={isFetching}>
                <FiRefreshCw className={isFetching ? 'animate-spin' : ''} />
                {isFetching ? 'Refreshing...' : 'Refresh'}
            </ActionButton>
                    <ActionButton>
                        <FiDownload />
                        Export
                    </ActionButton>
                    <DateButton type='date'>
                        <FiCalendar />
                        Last 30 days
                    </DateButton>
                </HeaderRight>
            </Header>

            {/* Stats Cards */}
            <StatsGrid>
                {statsData.map((stat, index) => (
                    <StatsCard key={index} bgColor={stat.bgColor}>
                        <StatsHeader>
                            <StatsIcon color={stat.color}>
                                <stat.icon />
                            </StatsIcon>
                            <TrendIndicator trend={stat.trend}>
                                {stat.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                                {stat.change}
                            </TrendIndicator>
                        </StatsHeader>
                        <StatsValue>{stat.value}</StatsValue>
                        <StatsTitle>{stat.title}</StatsTitle>
                        <StatsProgress>
                            <ProgressBar width="75%" color={stat.color} />
                        </StatsProgress>
                    </StatsCard>
                ))}
            </StatsGrid>

            {/* Charts Section */}
            <ChartsGrid>
                {/* Area Chart */}
                <ChartCard>
                    <ChartHeader>
                        <ChartTitle>Revenue Trend</ChartTitle>
                        <ChartSubtitle>Monthly performance overview</ChartSubtitle>
                    </ChartHeader>
                    <ChartContainer>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff8c42" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ff8c42" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#ff8c42"
                                    strokeWidth={3}
                                    fill="url(#colorGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </ChartCard>

                {/* Bar Chart */}
                <ChartCard>
                    <ChartHeader>
                        <ChartTitle>Performance Metrics</ChartTitle>
                        <ChartSubtitle>Comparative analysis</ChartSubtitle>
                    </ChartHeader>
                    <ChartContainer>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="amount"
                                    fill="#ff8c42"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </ChartCard>
            </ChartsGrid>

            {/* Bottom Section */}
            <BottomGrid>
                {/* Pie Chart */}
                <ChartCard>
                    <ChartHeader>
                        <ChartTitle>Distribution</ChartTitle>
                        <ChartSubtitle>Revenue breakdown</ChartSubtitle>
                    </ChartHeader>
                    <ChartContainer>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    <LegendContainer>
                        {pieData.map((item, index) => (
                            <LegendItem key={index}>
                                <LegendColor color={item.color} />
                                <LegendText>{item.name}</LegendText>
                            </LegendItem>
                        ))}
                    </LegendContainer>
                </ChartCard>

                {/* Summary Card */}
                <SummaryCard>
                    <SummaryHeader>
                        <SummaryTitle>Quick Summary</SummaryTitle>
                        <SummaryIcon>
                            <FiTrendingUp />
                        </SummaryIcon>
                    </SummaryHeader>
                    <SummaryContent>
                        <SummaryItem>
                            <SummaryLabel>Average Revenue</SummaryLabel>
                            <SummaryValue>${Math.round((revenue.totalRevenue || 0) / 30).toLocaleString()}/day</SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>Conversion Rate</SummaryLabel>
                            <SummaryValue>
                                {revenue.totalTicketSold && revenue.totalTicketAdded
                                    ? Math.round((revenue.totalTicketSold / revenue.totalTicketAdded) * 100)
                                    : 0
                                }%
                            </SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>Growth Rate</SummaryLabel>
                            <SummaryValue positive>+15.3%</SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>Total Transactions</SummaryLabel>
                            <SummaryValue>{(revenue.totalTicketSold || 0).toLocaleString()}</SummaryValue>
                        </SummaryItem>
                    </SummaryContent>
                </SummaryCard>
            </BottomGrid>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 2rem;
    background: ;
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
    
    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
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
    color: #;
    font-size: 1.1rem;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: ;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    color: #;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #;
        border-color: #ff8c42;
        color: #ff8c42;
    }
`;

const DateButton = styled(ActionButton)`
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    color: white;
    border-color: transparent;
    
    &:hover {
        background: linear-gradient(135deg, #ff9f59, #ff7849);
        color: white;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
`;

const StatsCard = styled.div`
    background: ${props => props.bgColor};
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
`;

const StatsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const StatsIcon = styled.div`
    width: 60px;
    height: 60px;
    background: ${props => props.color};
    color: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 8px 25px ${props => props.color}40;
`;

const TrendIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.trend === 'up' ? '#10b981' : '#ef4444'};
`;

const StatsValue = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    color: #;
    margin-bottom: 0.5rem;
`;

const StatsTitle = styled.div`
    color: #6b7280;
    font-weight: 500;
    margin-bottom: 1rem;
`;

const StatsProgress = styled.div`
    width: 100%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
`;

const ProgressBar = styled.div`
    width: ${props => props.width};
    height: 100%;
    background: ${props => props.color};
    border-radius: 3px;
    transition: width 1s ease;
`;

const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const BottomGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const ChartCard = styled.div`
    background: ;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
`;

const ChartHeader = styled.div`
    margin-bottom: 2rem;
`;

const ChartTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #;
    margin-bottom: 0.5rem;
`;

const ChartSubtitle = styled.p`
    color: #6b7280;
    font-size: 0.9rem;
`;

const ChartContainer = styled.div`
    width: 100%;
`;

const TooltipContainer = styled.div`
    background: ;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid #e5e7eb;
`;

const TooltipLabel = styled.div`
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
`;

const TooltipValue = styled.div`
    font-size: 1.25rem;
    font-weight: 700;
    color: #ff8c42;
`;

const LegendContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    flex-wrap: wrap;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LegendColor = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color};
`;

const LegendText = styled.span`
    font-size: 0.9rem;
    color: #6b7280;
    font-weight: 500;
`;

const SummaryCard = styled.div`
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 20px;
    padding: 2rem;
    color: white;
`;

const SummaryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const SummaryTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
`;

const SummaryIcon = styled.div`
    font-size: 1.5rem;
    opacity: 0.8;
`;

const SummaryContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    
    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
`;

const SummaryLabel = styled.span`
    opacity: 0.9;
    font-weight: 500;
`;

const SummaryValue = styled.span`
    font-weight: 700;
    font-size: 1.1rem;
    color: ${props => props.positive ? '#10b981' : 'white'};
`;

export default RevenueOverview;

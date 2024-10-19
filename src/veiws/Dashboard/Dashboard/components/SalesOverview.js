import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';


const SalesOverview = () => {

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary =theme.palette.warning.main;
    const third =  theme.palette.secondary.main;
    const fourth = theme.palette.error.main;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary,third,fourth],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['16/08'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: 'Present',
            data: [355, 390, 300, 350, 390],
        },
        {
            name: 'Leave',
            data: [280, 250, 325, 215, 250],
        },
         {
            name: 'Sick Leave',
            data: [355, 390, 300, 350, 390],
        },
        {
            name: 'Absent',
            data: [280, 250, 325, 215, 250],
        },
    ];

    return (

        <DashboardCard title="Attendence Overview" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>March 2023</MenuItem>
                <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;

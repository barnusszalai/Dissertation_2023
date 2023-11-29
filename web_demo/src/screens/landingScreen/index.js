import React from 'react';
import { IconButton, Container, Grid, Button } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState, text, useContext } from 'react'
import SetupScreen from '../setupScreen';

const LandingPage = () => {

    const [selectedButton, setSelectedButton] = useState('')
    const [usingIntervals, setUsingIntervals] = useState(false)
    const [greedySelected, setGreedySelected] = useState(false)

  const handleSATDemoClick = () => {
    setUsingIntervals(false)
    setSelectedButton('sat_demo')
    setGreedySelected(false)
  };

  const handleGreedyClick = () => {
    setUsingIntervals(false)
    setSelectedButton('greedy')
    setGreedySelected(true)
  };

  const handleIntervalDemoClick = () => {
    setUsingIntervals(true)
    setSelectedButton('interval_demo')
    setGreedySelected(false)
  };
  if (!selectedButton) {
    return (
        <Container
        maxWidth="xl"
        sx={{
            paddingTop: "15%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
        <Grid container spacing={4} justifyContent="center">
            <Grid item>
                <IconButton
                    sx={{
                    backgroundColor: '#f28482',
                    '&:hover': {
                        backgroundColor: '#d66a6a',
                    },
                    width: '300px',
                    height: '100px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    }}
                    onClick={handleGreedyClick}
                >
                    <AssessmentIcon fontSize="large" />
                    Greedy Demo
                </IconButton>
            </Grid>
            <Grid item>
            <IconButton
                sx={{
                backgroundColor: '#f28482',
                '&:hover': {
                    backgroundColor: '#d66a6a',
                },
                width: '300px',
                height: '100px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                }}
                onClick={handleSATDemoClick}
            >
                <AssessmentIcon fontSize="large" />
                SAT Demo
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton
                sx={{
                backgroundColor: '#f28482',
                '&:hover': {
                    backgroundColor: '#d66a6a',
                },
                width: '300px',
                height: '100px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                }}
                onClick={handleIntervalDemoClick}
            >
                <TimerIcon fontSize="large" />
                Interval Demo
            </IconButton>
            </Grid>
        </Grid>
        </Container>
    );
    } else  {
        return (
            <div>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        backgroundColor: 'rgb(128, 0, 32)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#f6bd60',
                            color: '#000'
                        },
                    }}
                    onClick={() => setSelectedButton('')}
                    >
                    Go Back
                    </Button>
                <SetupScreen usingIntervals={usingIntervals} greedySelected={greedySelected}/>
            </div>
        )
    }
};

export default LandingPage;

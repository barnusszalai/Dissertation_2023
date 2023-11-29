import React, { useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { WbSunny, Cloud, CloudQueue, CloudOff, FilterDrama, Grain, CloudDownload } from "@mui/icons-material";

const daysOfWeek = [
  { id: 1, name: "Sunday", icon: <WbSunny />, selected: false },
  { id: 2, name: "Monday", icon: <Cloud />, selected: false },
  { id: 3, name: "Tuesday", icon: <CloudQueue />, selected: false },
  { id: 4, name: "Wednesday", icon: <CloudOff />, selected: false },
  { id: 5, name: "Thursday", icon: <FilterDrama />, selected: false },
  { id: 6, name: "Friday", icon: <Grain />, selected: false },
  { id: 7, name: "Saturday", icon: <CloudDownload />, selected: false },
];

const WeekDays = () => {
  const [days, setDays] = useState(daysOfWeek);

  const handleDayClick = (id) => {
    setDays(
      days.map((day) =>
        day.id === id ? { ...day, selected: !day.selected } : day
      )
    );
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      {days.map((day) => (
        <Grid key={day.id} item xs={12} sm={4} md={4}>
          <Paper
            elevation={day.selected ? 4 : 1}
            onClick={() => handleDayClick(day.id)}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: day.selected ? "#1db954" : "background.paper",
              color: day.selected ? "primary.contrastText" : "text.primary",
              cursor: "pointer",
              width: "80%",
              height: 60,
            }}
          >
            {day.icon}
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {day.name}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeekDays;

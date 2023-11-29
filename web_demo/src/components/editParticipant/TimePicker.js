import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TimeSelector = () => {
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [timeSlots, setTimeSlots] = useState([]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime, endTime }]);
  };

  const handleDeleteTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            id="start-time"
            label="Start Time"
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            id="end-time"
            label="End Time"
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Grid>
      </Grid>
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleAddTimeSlot}>
          Add Unavailability
        </Button>
      </Box>
      <Box mt={2}>
        <List>
          {timeSlots.map((slot, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Time Slot ${index + 1}: ${slot.startTime} - ${slot.endTime}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDeleteTimeSlot(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TimeSelector;

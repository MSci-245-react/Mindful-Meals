import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import defaultProfilePic from './profile-pic.jpg';


const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: theme.spacing(4),
  },
  greeting: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
}));

const ProfilePage = (props) => {
  const classes = useStyles();

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [bio, setBio] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
//   const [dietaryRestrictions, setDietaryRestrictions] = useState({
//     lactose: false,
//     'gluten-free': false,
//     vegan: false,
//     vegetarian: false,
//     'nut allergy': false,
//   });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        const response = await fetch('/api/profilePage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName: userName, password: password }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setBio(data.bio || '');
          setDietaryRestrictions(data.dietaryRestrictions || '');
          setSelectedRestrictions(data.dietaryRestrictions ? data.dietaryRestrictions.split(',').map(str => str.trim()) : []);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Profile page failed');
        }
      } catch (error) {
        // setError('An error occurred while signing in');
        console.error('Error signing in:', error);
      }
    };

    fetchData();
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleDietaryRestrictionChange = (event) => {
    const selectedOptions = event.target.value;
    setSelectedRestrictions(selectedOptions);
    setDietaryRestrictions(selectedOptions.join(', '));
  };

  const saveChanges = async () => {
    try {
      const userName = localStorage.getItem('userName');
      const password = localStorage.getItem('password');
      const response = await fetch('/api/saveProfileChanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
          bio: bio,
          dietaryRestrictions: dietaryRestrictions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save changes');
      }
    } catch (error) {
      setError('An error occurred while saving changes');
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Container maxWidth="md" className={classes.profileContainer}>
      <img src={defaultProfilePic} alt="Profile" className={classes.profilePic} style={{ position: 'absolute', top: '60px', right: '80px', width: '300px', height: '300px' }}/>
      <Typography variant="h4" gutterBottom></Typography>
      <Typography variant="h4" gutterBottom>
        Profile Page
      </Typography>
      {userData ? (
        <div>
          <Typography variant="h5" className={classes.greeting} style={{ marginTop: '50px' }}>
            Hi! {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="body1" style={{ marginTop: '50px' }}>Email: {userData.email}</Typography>
          <Typography variant="body1" >Password: *********</Typography>
          <Typography variant="h6" className={classes.bioHeading} style={{ marginTop: '50px' }}>
            Bio
          </Typography>
          <TextField
            label="Bio"
            variant="outlined"
            className={classes.formControl}
            fullWidth
            multiline
            value={bio}
            onChange={handleBioChange}
            inputProps={{ maxLength: 200 }}
            style={{ maxWidth: '500px' }}
          />
          <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: '50px', width: '100%' }}>
            <InputLabel id="dietary-restrictions-label">Dietary Restrictions</InputLabel>
            <Select
              labelId="dietary-restrictions-label"
              id="dietary-restrictions"
              multiple
              value={selectedRestrictions}
              onChange={handleDietaryRestrictionChange}
              label="Dietary Restrictions"
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="lactose">Lactose</MenuItem>
              <MenuItem value="gluten-free">Gluten-free</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="nut allergy">Nut Allergy</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={saveChanges} className={classes.saveButton} style={{ marginTop: '20px' }}>
            Save Changes
          </Button>
        </div>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      {error && <Typography variant="body1">{error}</Typography>}
    </Container>
  );
};

export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
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
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    lactose: false,
    'gluten-free': false,
    vegan: false,
    vegetarian: false,
    'nut allergy': false,
  });

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
          setDietaryRestrictions((prevRestrictions) => ({
            ...prevRestrictions,
            ...data.dietaryRestrictions,
          }));
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Profile page failed');
        }
      } catch (error) {
        setError('An error occurred while signing in');
        console.error('Error signing in:', error);
      }
    };

    fetchData();
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleDietaryRestrictionChange = (event) => {
    setDietaryRestrictions({
      ...dietaryRestrictions,
      [event.target.name]: event.target.checked,
    });
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
          dietaryRestrictions: JSON.stringify(dietaryRestrictions)
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
            <FormControl component="fieldset" className={classes.formControl} style={{ marginTop: '50px' }}>
                <FormLabel component="legend">Dietary Restrictions:</FormLabel>
                <FormGroup style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Object.entries(dietaryRestrictions).map(([restriction, checked]) => (
                        <FormControlLabel
                        key={restriction}
                        control={<Checkbox checked={checked} onChange={handleDietaryRestrictionChange} name={restriction} />}
                        label={restriction}
                        style={{ marginRight: '10px' }}
                        />
                    ))}
                </FormGroup>
            </FormControl>
                <Button variant="contained" color="primary" onClick={saveChanges} className={classes.saveButton} style={{ marginTop: '200px', marginLeft: '-110px'  }}>
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

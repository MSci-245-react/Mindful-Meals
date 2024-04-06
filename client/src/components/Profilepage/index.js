import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions  } from '@material-ui/core';
import defaultProfilePic from './profile-pic.jpg';
import HomePage from '../HomePage';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText'; 

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
  const [allergens, setAllergens] = useState([]); 
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [bio, setBio] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const handleAllergenChange = (event) => {
    setSelectedAllergens(event.target.value);
  }; 
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

  const handleDeleteAccount = async () => {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        const response = await fetch('/api/deleteAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName, 
                password: password,
            }),
        });

        if (response.ok) {
            setSuccessMessage('Account deleted successfully.');
            setTimeout(() => {
              window.location.href = '/SignUp';
            }, 3000);
            const errorData = await response.json();
            setError(errorData.error || 'Failed to delete account');
          }
        } catch (error) {
          setError('An error occurred while deleting account');
          console.error('Error deleting account:', error);
        }
      };

      const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
    

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
      } else {
        setSuccessMessage('Changes saved successfull')
      }
    } catch (error) {
      setError('An error occurred while saving changes');
      console.error('Error saving changes:', error);
    }
    const payload = {
      userName: userName,
      password: password,
      bio: bio,
      dietaryRestrictions: dietaryRestrictions,
      allergens: selectedAllergens.join(','),
  };
  return (
    <Container maxWidth="md" className={classes.profileContainer}>
      {/* ... Existing JSX code for profile pic, greeting, etc. */}

      {/* Bio Field */}
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

      {/* Dietary Restrictions Dropdown */}
      <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }}>
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
          {/* ...map through restrictions and render MenuItems */}
        </Select>
      </FormControl>

      {/* Allergens Checkboxes */}
      <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }}>
        <InputLabel id="allergen-checkbox-label">Allergens</InputLabel>
        <Select
          labelId="allergen-checkbox-label"
          id="allergens"
          multiple
          value={selectedAllergens}
          onChange={handleAllergenChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {availableAllergens.map((allergen) => (
            <MenuItem key={allergen} value={allergen}>
              <Checkbox checked={selectedAllergens.indexOf(allergen) > -1} />
              <ListItemText primary={allergen} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Save and Delete Account Buttons */}
      <Button variant="contained" color="primary" onClick={saveChanges} className={classes.saveButton}>
        Save Changes
      </Button>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog} className={classes.deleteButton}>
        Delete Account
      </Button>

      {/* Delete Account Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Message Display */}
      {error && <Typography variant="body1">{error}</Typography>}
      
      {/* Success Message Display */}
      {successMessage && <Typography variant="body1">{successMessage}</Typography>}
    </Container>
  );
};
};

export default ProfilePage;

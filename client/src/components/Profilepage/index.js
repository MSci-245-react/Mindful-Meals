import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './Profilepage.css';
import defaultProfilePic from './profile-pic.png';

const ProfilePage = ({ firebase }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBioText] = useState('');
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = firebase.auth.currentUser;
        if (user) {
          const response = await fetch(`/api/profilePage?email=${user.email}`);
          if (response.ok) {
            const profileData = await response.json();
            setUserProfile(profileData);
            setBioText(profileData.bio || '');
            setSelectedRestrictions(
              profileData.dietaryRestrictions
                ? profileData.dietaryRestrictions
                  .split(',')
                  .map(str => str.trim())
                : [],
            );
            setSelectedAllergies(
              profileData.allergies
                ? profileData.allergies.split(',').map(str => str.trim())
                : [],
            );
          } else {
            console.error('Failed to fetch user profile:', response.statusText);
          }
        } else {
          console.error('No user signed in.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [firebase.auth.currentUser]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = firebase.auth.currentUser;
        if (user) {
          const response = await fetch(`/api/getUserData`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });

          if (response.ok) {
            const userData = await response.json();
            setUserId(userData.id);
            setUserName(userData.userName);
            console.log('User Data:', userData);
          } else {
            console.error('Failed to fetch user profile:', response.statusText);
          }
        } else {
          console.error('No user signed in.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleBioEdit = () => {
    setEditingBio(true);
  };

  const handleBioSave = async () => {
    try {
      const user = firebase.auth.currentUser;
      const response = await fetch('/api/updateBio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          bio: bio,
        }),
      });
      if (response.ok) {
        setUserProfile(prevState => ({
          ...prevState,
          bio: bio,
        }));
        setEditingBio(false);
        setSuccessMessage('Bio updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 30000);
      } else {
        console.error('Failed to update bio:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating bio:', error.message);
    }
  };

  const handleDietaryRestrictionSave = async () => {
    try {
      const user = firebase.auth.currentUser;
      const response = await fetch('/api/updateDietaryRestrictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          dietaryRestrictions: selectedRestrictions.join(', '),
        }),
      });
      if (response.ok) {
        setSuccessMessage('Dietary restrictions updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 30000); // Set timeout to clear success message after 30 seconds
      } else {
        console.error(
          'Failed to update dietary restrictions:',
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error updating dietary restrictions:', error.message);
    }
  };

  const handleAllergySave = async () => {
    try {
      const user = firebase.auth.currentUser;
      const response = await fetch('/api/updateAllergies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          allergies: selectedAllergies.join(', '),
        }),
      });
      if (response.ok) {
        setSuccessMessage('Allergies updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 30000); // Set timeout to clear success message after 30 seconds
      } else {
        console.error('Failed to update allergies:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating allergies:', error.message);
    }
  };

  const handleBioChange = event => {
    setBioText(event.target.value);
  };

  const toggleSelectedRestriction = restriction => {
    setSelectedRestrictions(prevSelected => {
      if (prevSelected.includes(restriction)) {
        return prevSelected.filter(item => item !== restriction);
      } else {
        return [...prevSelected, restriction];
      }
    });
  };

  const toggleSelectedAllergy = allergy => {
    setSelectedAllergies(prevSelected => {
      if (prevSelected.includes(allergy)) {
        return prevSelected.filter(item => item !== allergy);
      } else {
        return [...prevSelected, allergy];
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>No user profile found</div>;
  }

  const fetchSavedRecipes = async () => {
    try {
      setLoadingRecipes(true);
      const response = await fetch('/api/getSavedRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSavedRecipes(data);
        console.log(data);
      } else {
        console.error('Failed to fetch saved recipes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error.message);
    } finally {
      setLoadingRecipes(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>
        Welcome to Mindful Meals, {userProfile.firstName} {userProfile.lastName}
      </h1>
      <div className="profile-section">
        <img
          src={defaultProfilePic}
          alt="Profile"
          style={{
            position: 'absolute',
            top: '210px',
            right: '250px',
            width: '300px',
            height: '300px',
          }}
        />
      </div>
      <div className="profile-section">
        <button className="show-saved-button" onClick={fetchSavedRecipes}>Show Saved Recipes</button>
      </div>
      <div style={{
        position: 'absolute',
        top: '610px',
        right: '200px',
        width: '300px',
        height: '300px',
      }} >
        {loadingRecipes ? <div>Loading saved recipes...</div> : (
          <>
            <ul>
              {savedRecipes.map((recipe, index) => (
                <li key={index}>{recipe.recipeName}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="profile-section">
        <h2>Email & Password</h2>
        <p>Email: {userProfile.email}</p>
        <p>Password: **********</p>
      </div>

      <div className="profile-section">
        <h2>Bio</h2>
        {editingBio ? (
          <>
            <textarea value={bio} onChange={handleBioChange} />
            <button onClick={handleBioSave}>Save Bio</button>
          </>
        ) : (
          <>
            <p>{userProfile.bio}</p>
            <button onClick={handleBioEdit}>Edit Bio</button>
          </>
        )}
      </div>

      <div className="profile-section">
        <h2>Dietary Restrictions</h2>
        <div>
          <button
            className={
              selectedRestrictions.includes('lactose') ? 'selected' : ''
            }
            onClick={() => toggleSelectedRestriction('lactose')}
          >
            Lactose
          </button>
          <button
            className={
              selectedRestrictions.includes('gluten-free') ? 'selected' : ''
            }
            onClick={() => toggleSelectedRestriction('gluten-free')}
          >
            Gluten-Free
          </button>
          <button
            className={
              selectedRestrictions.includes('vegetarian') ? 'selected' : ''}
            onClick={() => toggleSelectedRestriction('vegetarian')}
          >
            Vegetarian
          </button>
          <button
            className={selectedRestrictions.includes('vegan') ? 'selected' : ''}
            onClick={() => toggleSelectedRestriction('vegan')}
          >
            Vegan
          </button>
        </div>
        <button onClick={handleDietaryRestrictionSave}>
          Save Dietary Restrictions
        </button>
      </div>

      <div className="profile-section">
        <h2>Allergies</h2>
        <div>
          <button
            className={selectedAllergies.includes('peanuts') ? 'selected' : ''}
            onClick={() => toggleSelectedAllergy('peanuts')}
          >
            Peanuts
          </button>
          <button
            className={
              selectedAllergies.includes('shellfish') ? 'selected' : ''
            }
            onClick={() => toggleSelectedAllergy('shellfish')}
          >
            Shellfish
          </button>
          <button
            className={selectedAllergies.includes('soy') ? 'selected' : ''}
            onClick={() => toggleSelectedAllergy('soy')}
          >
            Soy
          </button>
          <button
            className={
              selectedAllergies.includes('tree nuts') ? 'selected' : ''
            }
            onClick={() => toggleSelectedAllergy('tree nuts')}
          >
            Tree Nuts
          </button>
        </div>
        <button onClick={handleAllergySave}>Save Allergies</button>
      </div>

      {
        successMessage && (
          <div className="success-message">{successMessage}</div>
        )
      }
    </div >
  );
};

export default withFirebase(ProfilePage);
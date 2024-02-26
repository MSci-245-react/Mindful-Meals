import React, {useState, useEffect} from 'react';
import './ProfilePage.css'; 
import profilePic from 'client/src/components/Profilepage/profile-pic.jpg';

const ProfilePage = (props) => {
    
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <div className='profile-container'>
            <h1>Profile Page</h1>
                {userData ? (
                    <div className='profile-info'>
                    <div className='profile-pic'>
                        {/* <img src={profilePic} alt="Profile" /> */}
                    </div>
                    <div className='profile-details'>
                        <p className='greeting'>Hi {userData.firstName} {userData.lastName}</p>
                        <p className='email'>Email: {userData.email}</p>
                        <p className='password'>Password: *********</p>
                        <p className='bio'>Bio: {'No bio available'}</p>
                        <p className='dietary-restrictions'>Dietary Restrictions:</p>
                    </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ProfilePage;

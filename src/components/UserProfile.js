import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stage, setStage] = useState(1);
  const [loginData, setLoginData] = useState({ phone: '', password: '' });
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    county: '',
    town: '',
    levelOfEducation: '',
    profession: '',
    maritalStatus: '',
    religion: '',
    ethnicity: '',
    description: '',
    phone: '',
    password: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
      setProfileImage(storedUserData.profileImage);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stage < 4) {
      setStage(stage + 1);
    } else {
      localStorage.setItem('userData', JSON.stringify({ ...userData, profileImage }));
      setIsLoggedIn(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedUserData &&
      storedUserData.phone === loginData.phone &&
      storedUserData.password === loginData.password
    ) {
      setUserData(storedUserData);
      setProfileImage(storedUserData.profileImage);
      setIsLoggedIn(true);
    } else {
      alert('Invalid phone number or password');
    }
  };

  const handleCancel = () => {
    setShowLogin(false); // Go to registration page
    setStage(1);         // Reset to registration stage
    setLoginData({ phone: '', password: '' }); // Reset login data
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setShowLogin(false);
  };

  const goToLogin = () => {
    setShowLogin(true);
    setStage(1);
  };

  return (
    <div className="user-profile My Profile">
      {isLoggedIn ? (
        <div className="profile-content">
          <h1>MY PROFILE</h1> {/* Added heading */}
          <div className="flex-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <div className="profile-section profile-header">
            <div className="profile-image">
              <img src={profileImage || 'default-avatar.png'} alt="User" />
              <p>{userData.name}</p>
            </div>
            <div className="profile-buttons">
              <button>Profile</button>
              <button>Matches</button>
              <button>Requests</button>
            </div>
          </div>
          <div className="profile-section login-details">
            <h2>Login Details</h2>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Password:</strong> {userData.password}</p>
          </div>
          <div className="profile-section user-details">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>County:</strong> {userData.county}</p>
            <p><strong>Town:</strong> {userData.town}</p>
            <p><strong>Level of Education:</strong> {userData.levelOfEducation}</p>
            <p><strong>Profession:</strong> {userData.profession}</p>
            <p><strong>Marital Status:</strong> {userData.maritalStatus}</p>
            <p><strong>Religion:</strong> {userData.religion}</p>
            <p><strong>Ethnicity:</strong> {userData.ethnicity}</p>
            <p><strong>Description:</strong> {userData.description}</p>
          </div>
        </div>
      ) : showLogin ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input name="phone" value={loginData.phone} onChange={handleLoginChange} placeholder="Phone Number" required />
          <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required />
          <button type="submit">Login</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          {stage === 1 && (
            <div>
              <h1>Welcome to our dating service with 6000 potential dating partners!</h1>
              <form onSubmit={handleSubmit}>
                <h2>Registration</h2>
                <input name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
                <input name="age" value={userData.age} onChange={handleChange} placeholder="Age" required />
                <input name="gender" value={userData.gender} onChange={handleChange} placeholder="Gender" required />
                <input name="county" value={userData.county} onChange={handleChange} placeholder="County" required />
                <input name="town" value={userData.town} onChange={handleChange} placeholder="Town" required />
                <button type="submit">Next</button>
                <button type="button" onClick={goToLogin}>Already have an account? Login</button>
              </form>
            </div>
          )}

          {stage === 2 && (
            <form onSubmit={handleSubmit}>
              <h2>Details Registration</h2>
              <input name="levelOfEducation" value={userData.levelOfEducation} onChange={handleChange} placeholder="Level of Education" required />
              <input name="profession" value={userData.profession} onChange={handleChange} placeholder="Profession" required />
              <input name="maritalStatus" value={userData.maritalStatus} onChange={handleChange} placeholder="Marital Status" required />
              <input name="religion" value={userData.religion} onChange={handleChange} placeholder="Religion" required />
              <input name="ethnicity" value={userData.ethnicity} onChange={handleChange} placeholder="Ethnicity" required />
              <button type="submit">Next</button>
            </form>
          )}

          {stage === 3 && (
            <form onSubmit={handleSubmit}>
              <h2>Self Description</h2>
              <textarea name="description" value={userData.description} onChange={handleChange} placeholder="Describe yourself..." required></textarea>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {profileImage && (
                <div className="profile-image-preview">
                  <img src={profileImage} alt="Profile Preview" />
                </div>
              )}
              <button type="submit">Next</button>
            </form>
          )}

          {stage === 4 && (
            <form onSubmit={handleSubmit}>
              <h2>Account Setup</h2>
              <input name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone Number" required />
              <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

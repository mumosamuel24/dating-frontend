import React, { useState } from 'react';

const Register = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stage < 3) {
      setStage(stage + 1);
    } else {
      // Final stage, pass formData to parent component
      onComplete(formData);
    }
  };

  return (
    <div>
      {stage === 1 && (
        <div>
          <h1>Welcome to our dating service with 6000 potential dating partners!</h1>
          <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
            <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
            <input name="county" value={formData.county} onChange={handleChange} placeholder="County" required />
            <input name="town" value={formData.town} onChange={handleChange} placeholder="Town" required />
            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {stage === 2 && (
        <form onSubmit={handleSubmit}>
          <h2>Details Registration</h2>
          <input name="levelOfEducation" value={formData.levelOfEducation} onChange={handleChange} placeholder="Level of Education" required />
          <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" required />
          <input name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} placeholder="Marital Status" required />
          <input name="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" required />
          <input name="ethnicity" value={formData.ethnicity} onChange={handleChange} placeholder="Ethnicity" required />
          <button type="submit">Next</button>
        </form>
      )}

      {stage === 3 && (
        <form onSubmit={handleSubmit}>
          <h2>Self Description</h2>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe yourself..." required></textarea>
          <button type="submit">Next</button>
        </form>
      )}
    </div>
  );
};

export default Register;

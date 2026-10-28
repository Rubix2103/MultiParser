import React, { useState } from 'react';

export default function UserProfile({ name, role, initialStatus = 'Active' }) {
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    setStatus((prev) => (prev === 'Active' ? 'Away' : 'Active'));
  };

  return (
    <div className="user-profile-card">
      <h2>{name}</h2>
      <p className="role">Role: {role}</p>
      <p className={`status ${status.toLowerCase()}`}>Status: {status}</p>
      <button onClick={toggleStatus}>Change Status</button>
    </div>
  );
}


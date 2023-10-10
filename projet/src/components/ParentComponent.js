// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  return (
    
    <div>
      <h1>Parent Component</h1>
      <ChildComponent />
    </div>
  );
}

export default ParentComponent;
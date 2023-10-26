import React from "react";
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div>
      <p>Home</p>
      <button onClick={() => alert('hello22')}>hello</button>

      <hr /> 
      <Link to={'/list'}>to list</Link>
    </div>
  );
};

export default Index;

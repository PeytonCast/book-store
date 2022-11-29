import React from 'react';
import { useLocation } from 'react-router-dom';

function NotFound() {
  let location = useLocation();
  return (
    <div className="card bg-white card-rounded">
      <div className="card-header bg-grey text-center">
        <h1 className='text-dark'>
        404 Cannot find: <code>{location.pathname}</code>
        </h1>
        <p className='text-dark'
        >This route does not exist try checking the spelling and try again.</p>
          <img src='https://th.bing.com/th/id/R.4c6e1767bb855e712fdda263696263db?rik=OnPwko2FOdZnVw&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2ficonsmind%2foutline%2f512%2fError-404Window-icon.png&ehk=CCl1UsnCIwCIg2HzPngeE%2bH0YO3%2fHBasne7GKO%2fqNV0%3d&risl=&pid=ImgRaw&r=0' alt="404"></img>
      </div>
    </div>
  );
}

export default NotFound;

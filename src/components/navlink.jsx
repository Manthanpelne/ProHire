import React from 'react';


const NavLink = ({ href, children }) => {
  const handleClick = (event) => {
    event.preventDefault(); // Prevent default jump behavior
    const targetId = href.startsWith('#') ? href.slice(1) : null; // Extract target ID
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick} // Use the handleClick function
      className='hover:text-blue-600 transition-all duration-200 active:scale-90 dark:hover:text-blue-400'
    >
      {children}
    </a>
  );
};

export default NavLink;
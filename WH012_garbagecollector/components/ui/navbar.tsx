import React from 'react';

const Navbar = () => {
  return (
    <div className='bg-gradient-to-r from-blue-400 to-cyan-500 p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Left section */}
        <div className='flex items-center space-x-4'>
          <span className='text-lg font-bold text-white cursor-pointer'>Home</span>
          <span className='text-lg text-gray-200 cursor-pointer'>Profile</span>
        </div>
        
        {/* Center section (Title) */}
        <div className='text-2xl font-semibold text-white'>
          Title
        </div>
        
        {/* Right section (Optional: Add other components or links here) */}
        {/* <div>
          Add other components or links here
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;

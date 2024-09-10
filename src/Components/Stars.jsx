import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Stars = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const topPersonalities = [
    { gender: 'male', name: 'Person 1', crushCount: 120, rank: 1, img: 'https://i.abcnewsfe.com/a/fd751005-a167-478b-bba2-ccaf61e26bf6/iron-man-rdjr-1-ht-thg-231204_1701712078177_hpMain.jpg' },
    { gender: 'female', name: 'Person 2', crushCount: 98, rank: 2, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeE0-GGDb8Ba6oRZEFSgrgzyqJlYeM4AIS5g&s' },
    { gender: 'male', name: 'Person 3', crushCount: 87, rank: 3, img: 'https://compote.slate.com/images/fd268400-c348-4021-82bb-3d0a1962e257.jpg' },
    { gender: 'female', name: 'Person 4', crushCount: 75, rank: 4, img: 'https://cdn.shopify.com/s/files/1/0182/8937/files/Michael_Fassbender_1024x1024.jpg?v=1482502965' },
    { gender: 'female', name: 'Person 5', crushCount: 64, rank: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2-rZ9sG7rgYajDCmmKOLVNputLtdn00E25A&s' },
    { gender: 'male', name: 'Person 6', crushCount: 52, rank: 6, img: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/487714_v9_bb.jpg' },
  ];

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  // Filter personalities based on selected gender
  const filteredPersonalities = selectedGender
    ? topPersonalities.filter((person) => person.gender === selectedGender)
    : topPersonalities;

  return (
    <div className='h-[84vh] overflow-y-auto'>

      {/* Gender filter */}
      <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
        <InputLabel
          id="gender-select-label"
          sx={{ color: '#ff4458' }} // Custom color for label
        >
          Select Gender
        </InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          value={selectedGender}
          label="Select Gender"
          onChange={handleGenderChange}
          sx={{
            color: '#ffffff', // Text color
            backgroundColor: '#1f1f1f', // Dropdown background
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff4458', // Border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff4458', // Hover border color
            },
            '.MuiSvgIcon-root': {
              color: '#ff4458', // Arrow color
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff4458', // Focused border color
            },
          }}
        >
          <MenuItem value="female">Queens</MenuItem>
          <MenuItem value="male">Kings</MenuItem>
        </Select>
      </FormControl>

      {/* Display filtered personalities */}
      <div className="text-white pb-2 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredPersonalities.map((person, index) => (
            <div key={index} className="profile-holder p-4 bg-gray-900 rounded-lg">
              <div className="image mb-4">
                <img src={person.img} alt={person.name} className="w-full h-24 object-cover rounded-lg" />
              </div>
              <div className="details">
                <div className="numberofpeoplecrushing text-center text-lg font-bold">
                  {person.crushCount} people crushing
                </div>
                <div className="rank text-center text-sm text-gray-400">
                  Rank #{person.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Stars;

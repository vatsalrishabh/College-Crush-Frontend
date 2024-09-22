import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const Stars = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [topPersonalities, setTopPersonalities] = useState([]);

  // Fetch top personalities from the backend
  useEffect(() => {
    const fetchTopPersonalities = async () => {
      try {
        const response = await axios.get(`${BaseUrl}api/questions/topSix`);
        const { topSixMaleLikes, topSixFemaleLikes, topSixMaleCrushes, topSixFemaleCrushes } = response.data;

        // Combine male and female rankings into one array
        const combinedPersonalities = [
          ...topSixMaleLikes.map(person => ({ ...person, gender: 'male', type: 'like' })),
          ...topSixFemaleLikes.map(person => ({ ...person, gender: 'female', type: 'like' })),
          ...topSixMaleCrushes.map(person => ({ ...person, gender: 'male', type: 'crush' })),
          ...topSixFemaleCrushes.map(person => ({ ...person, gender: 'female', type: 'crush' })),
        ];

        // Rank personalities based on likes
        const rankedLikes = combinedPersonalities
          .filter(person => person.type === 'like')
          .sort((a, b) => (b.totalLikes || 0) - (a.totalLikes || 0)) // Sort by totalLikes
          .map((person, index) => ({ ...person, rank: index + 1 })); // Assign rank

        // Rank personalities based on crushes
        const rankedCrushes = combinedPersonalities
          .filter(person => person.type === 'crush')
          .sort((a, b) => (b.totalCrushes || 0) - (a.totalCrushes || 0)) // Sort by totalCrushes
          .map((person, index) => ({ ...person, rank: index + 1 })); // Assign rank

        // Combine both ranked arrays
        setTopPersonalities([...rankedLikes, ...rankedCrushes]);
      } catch (error) {
        console.error('Error fetching top personalities:', error);
      }
    };

    fetchTopPersonalities();
  }, []);

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
            <div
              key={index}
              className={`profile-holder p-4 rounded-lg ${person.type === 'like' ? 'bg-blue-900' : 'bg-red-900'}`}
            >
              <div className="image mb-4">
                <img src={person.dp} alt={person.name} className="w-full h-24 object-cover rounded-lg" />
              </div>
              <div className="details">
                <div className="numberofpeoplecrushing text-center text-lg font-bold">
                  {person.totalLikes || person.totalCrushes} people {person.type === 'like' ? 'liking' : 'crushing'}
                </div>
                <div className="name text-center text-md font-bold">
                  {person.name}
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

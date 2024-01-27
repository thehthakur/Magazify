'use client';
import React,{useState,useEffect} from 'react';

const Magazine_Entry = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/magazine');
        const data = await response.json();
        setMagazines(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <h1>Magazines</h1>
      <ul>
        {magazines.map((magazine) => (
          <li key={magazine._id.$oid}>
            <strong>Name:</strong> {magazine.name},{' '}
            <strong>Avg Readers:</strong> {magazine.avg_no_of_readers},{' '}
            <strong>Genre:</strong> {magazine.genre.join(', ')},{' '}
            <strong>Fees:</strong> {magazine.fees},{' '}
            <strong>Rating:</strong> {magazine.rating},{' '}
            <strong>Deadline:</strong>{' '}
            {new Date(magazine.deadline.$date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Magazine_Entry;

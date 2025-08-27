import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css'; 
import user from '../assets/images/aiuser.png';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', { user_input: userInput });
      console.log('Response:', response.data); // Log the response for debugging
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };
  

  return (
    <div className="chatbot">
      <div className="chatbox">
        <div className="user-input">
          <img src={user} alt="User" className="profile-picture" />
          <input type="text" value={userInput} onChange={handleInputChange} placeholder="Ask for suggestions..." />
          <button onClick={handleSubmit}>Send</button>
        </div>
        <div className="response">
          <p>I'm here for you. Ask me anything, I can share some amazing fits!</p>
          <div className="recommendations">
            {recommendations.map((item, index) => (
              <div key={index} className="recommendation-item">
                <img src={item.image} alt={item.name} />
                <a href={item.link}>{item.name}</a>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

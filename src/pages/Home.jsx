import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authKey = localStorage.getItem("authKey");
    if (!authKey) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

 
   
  return (
    <div>
        <Header/>
       
    </div>
  )
}

export default Home
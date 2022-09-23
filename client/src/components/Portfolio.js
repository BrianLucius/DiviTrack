import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PortfolioTable from './PortfolioTable';
import GetStarted from './GetStarted';
import axios from 'axios';

const Portfolio = () => {
  const [userData, setUserData] = useOutletContext();
  const [portfolioData, setPortfolioData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const _ = require('lodash'); 

  const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 5, // (causes 2500.99 to be printed as $2,501)
  });

  const formatNum = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 5, // (causes 2500.99 to be printed as $2,501)
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/portfolios/user/${userData.loggedInUserId}`)
    .then((portfolio) => {
      if (portfolio.data.data !== undefined) {
        setPortfolioData(portfolio.data.data);
        setLoaded(true);
      }
    })
    .catch((error) => {
        console.log("There was an error: ", error)});
}, [userData.loggedInUserId]);

  return (
    <>
      {loaded && portfolioData.length === 0 ? <GetStarted /> : loaded && <PortfolioTable portfolioData={portfolioData}/>}
    </>
  )
}

export default Portfolio;
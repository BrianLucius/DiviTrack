import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import moment from 'moment';
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

  const divFrequencyText = (value) => {
    switch (value) {
      case 0: 
        return "One-Time";
      case 1: 
        return "Annually";
      case 2: 
        return "Bi-annually";
      case 4: 
        return "Quarterly";
      case 12: 
        return "Monthly";
      }
  }

  return (
    <div className="container mb-5">
          <table className="table table-striped border border-secondary align-middle shadow">
            <thead className="table-primary">
              <tr>
                <th>Symbol</th>
                <th>Company Name</th>
                <th>Shares</th>
                <th>Dividend Frequency</th>
                <th>Last Dividend Date</th>
                <th>Last Dividend</th>
                <th>Next Dividend Date (Expected)</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {loaded &&
                portfolioData.map((investment, index) => {
                  return (
                    <tr key={index}>
                      <td>{investment.symbol.toUpperCase()}</td>
                      <td>{investment.dividendId.company.replace(/\w+/g, _.capitalize)}</td>
                      <td>{formatNum.format(investment.shares)}</td>
                      <td>{divFrequencyText(investment.dividendId.dividendHistory[0].frequency)}</td>
                      <td>{moment(investment.dividendId.dividendHistory[0].pay_date).format('ll')}</td>
                      <td>{formatCurrency.format(investment.dividendId.dividendHistory[0].cash_amount)}</td>
                      <td>{moment(investment.dividendId.dividendHistory[0].pay_date).add(12/investment.dividendId.dividendHistory[0].frequency,'months').format('ll')}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
    </div>

  )
}

export default Portfolio;
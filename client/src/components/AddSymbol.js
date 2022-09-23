import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const AddSymbol = () => {
  const [symbolDetails, setSymbolDetails] = useState({});
  const [symbolLoaded, setSymbolLoaded] = useState(false);
  const [symbolFound, setSymbolFound] = useState(false);
  const [userData, setUserData] = useOutletContext();
  const navigate = useNavigate();
  const finnhub_api_key = process.env.REACT_APP_FINNHUB_API_KEY;
  const polygon_api_key = process.env.REACT_APP_POLYGON_API_KEY;

  const onChangeHandlerSymbol = (e) => {
    setSymbolLoaded(false);
    axios.get(`https://finnhub.io/api/v1/search?q=${e.target.value.toUpperCase()}&token=${finnhub_api_key}`)
    .then(response => {
        const dataSet = response.data.result;
        const ticker = dataSet.filter(ticker => ticker.symbol===e.target.value.toUpperCase());
        if (ticker[0] !== undefined) {
          setSymbolDetails(ticker[0]);
          setSymbolLoaded(true);
          }
        })
    .catch(error => {
        console.log("There was an error: ", error);
        })
  }

  async function handleAddSymbol(e) {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      let formObject = {};
      formData.forEach((value, key) => formObject[key] = (key="symbol" ? value.toLowerCase() : value));
      formObject["userId"] = userData.loggedInUserId;

    try {
      const checkDividend = await axios.get(`http://localhost:8000/api/dividends/symbol/${formObject.symbol.toLowerCase()}`);
      if (checkDividend.data.data.length !== 0) {
        formObject["dividendId"] = checkDividend.data.data[0]._id;
        } else {
          let dividendData = ({});
          const getDividends = await axios.get(`https://api.polygon.io/v3/reference/dividends?ticker=${formObject.symbol.toUpperCase()}&apiKey=${polygon_api_key}`);
          dividendData["symbol"] = formObject.symbol.toLowerCase();
          dividendData["company"] = symbolDetails.description;
          dividendData["dividendHistory"] = getDividends.data.results;
          const newDividend = await axios.post("http://localhost:8000/api/dividends", dividendData);
          formObject["dividendId"] = newDividend.data.data._id;
        }
        await axios.post("http://localhost:8000/api/portfolios", formObject);
        navigate("/home/portfolio");
    } catch(error) { 
      console.log("There was an error: ", error);
      };
  }

  return (
    <Paper
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 440,
        }}
    >
      <Box component="form" noValidate onSubmit={handleAddSymbol} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={6}>
            <Grid item xs={12}>
                <TextField
                onChange={(e)=>{onChangeHandlerSymbol(e)}}
                autoComplete="symbol"
                name="symbol"
                required
                fullWidth
                id="symbol"
                label="Stock Symbol"
                autoFocus
                inputProps={{ style: {textTransform: "uppercase" }}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="shares"
                label="Number of Shares"
                name="shares"
                type="number"
                autoComplete="shares"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                name="acquired"
                label="Date Acquired"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                id="acquired"
                />
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={6} alignItems='center'>
            <Grid item xs={12}>
            <Typography component="h6" variant="h6" >
                Company: {symbolLoaded && symbolDetails.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="h6">
                &nbsp;
                {/* Last Dividend: {symbolDetails.lastDividend} */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="h6">
                &nbsp;
                {/* Last Dividend Date: {symbolDetails.lastDivdendDate} */}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          
        </Grid>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
        Add to Portfolio
        </Button>
      </Box>
    </Paper>
  )
}

export default AddSymbol;
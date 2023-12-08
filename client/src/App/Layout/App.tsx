import { useState } from "react";
import Catalog from "../../Features/catalog/Catalog";
import Header from "./header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../Features/home/HomePage";


function App() {
  const location=useLocation();
  //const [loading, setLoading] = useState(true)

  const [darkMode, setDarkMode] = useState(false); 
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} /> 
      <Container sx={{mt: 4}}>
      <Outlet/>
      </Container>
            
    </ThemeProvider>
  ); 
}

export default App;

// {loading ? <LoadingComponent message="Initialising app..."/>
    //  : location.pathname === '/' ? <HomePage/>
    //  : <Container sx={{mt: 4}}>
    //  <Outlet/>
    //  </Container>
   // }
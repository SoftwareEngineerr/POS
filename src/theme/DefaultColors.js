import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";
import { Main } from './main'
import { customizeSideBar } from './customizeSideBar'


import { Components } from './components'
import { useSelector } from "react-redux";

export const Themefunc = () => {
  const themedata = useSelector((state)=>state.theme);
  const value = JSON.parse(localStorage.getItem('CustomMenu'));

  return createTheme({
    direction: 'ltr',
    palette: {
      // mode: themedata.data == 'white' ? 'light' : 'dark',
      addbutn:{
        data:{
          background: 'lightblue',
          color: 'blue',
          borderRadius: '50%',
          height: "58px",
          position: "fixed",
          right: "63px",
          bottom: "25px",
        }
      },
      primary: {
        // main: themedata.menucolor == '#47a54b' ? '#47a54b' : themedata.menucolor,
        main: value && value.menuItemColor != null ? 
      (value.menuItemColor === '#47a54b' ? '#47a54b' : value.menuItemColor) : 
      "#47a54b",
        // main: value != undefined && value.menuItemColor != null ? value.menuItemColor == '#47a54b' ? '#47a54b' : value.menuItemColor : "#47a54b",
        light: '#ace9f4',
        dark: '#27662a',
        // main: '#ffaf00',
        // light: '#ffaf0036',
        // dark: '#c98b04',
      },
      secondary: {
        main: '#ffaf00',
        light: '#E8F7FF',
        dark: '#23afdb',
      },
      success: {
        main: '#13DEB9',
        light: '#E6FFFA',
        dark: '#02b3a9',
        contrastText: '#ffffff',
      },
      info: {
        main: '#539BFF',
        light: '#EBF3FE',
        dark: '#1682d4',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ff0000',
        light: '#FDEDE8',
        dark: '#f3704d',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#fffc00',
        light: '#FEF5E5',
        dark: '#ae8e59',
        contrastText: '#ffffff',
      },
      purple: {
        A50: '#EBF3FE',
        A100: '#6610f2',
        A200: '#557fb9',
      },
      grey: {
        100: '#F2F6FA',
        200: '#EAEFF4',
        300: '#DFE5EF',
        400: '#7C8FAC',
        500: '#5A6A85',
        600: '#2A3547',
  
      },
      text: {
        primary: '#2A3547' ,
        secondary: '#5A6A85',
      },
      sidemenutext: {
        // primary: themedata.data == 'white' ? '#2A3547' : '#fff',
        // secondary: themedata.data == 'white' ? '#5A6A85':'#ffffff91',
        // background: themedata.data == 'white' ? '#fff':'#000',
        // color: themedata.data == 'white' ? '#000':'#fff',
        primary: value && value.mode !== undefined ? 
         (value.mode === 'white' ? '#2A3547' : '#fff') : 
         '#fff',
         secondary: value && value.mode !== undefined ? 
         (value.mode === 'white' ? '#5A6A85' : '#ffffff91') : 
         '#5A6A85',

        background: value && value.mode !== undefined ? 
                  (value.mode === 'white' ? '#fff' : '#000') : 
                  '#fff',

        color: value && value.mode !== undefined ? 
              (value.mode === 'white' ? '#000' : '#fff') : 
              '#000',

              display: {
                display: value && value.menuSize ? 
                         (value.menuSize === 'none' ? 'none !important' : 'block') : 
                         'block',
            },
            width: value && value.menuSize ? 
                   (value.menuSize === 'none' ? '70px' : '270px') : 
                   '270px',
            // width: themedata.display == 'none' ? '70px' : '270px',
      },
      action: {
        disabledBackground: 'rgba(73,82,88,0.12)',
        hoverOpacity: 0.02,
        hover: '#f6f9fc',
      },
      divider: '#e5eaef',
      Main: Main(),
      Components,
      customizeSideBar,
    },
    typography,
    shadows,
  },
    
  );

}


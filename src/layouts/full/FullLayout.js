import React, { useEffect, useState } from "react";
import { styled, Container, Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';


import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Label from "../../components/xaoasoft/label";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/actions/loginauth";
// import { useSelector } from "react-redux";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const [checker , setChecker] = useState();
  const naviage = useNavigate();
  const [data , setData ] = useState();
  const dispatch = useDispatch()

  // const permission = useSelector((state)=>state.login.permission)
  // useEffect(()=>{
  //   if(permission == true){
  //     setChecker(<Outlet />);
  //   }
  //   else{
  //     return naviage('/login')
  //   }
  // },[permission])

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const veri = useSelector((state) => state.Auth.permission);

  useEffect(()=>{
    setData(1);
    console.log(veri , data)
    if(data == 1){
      if(veri != true){
        naviage('/auth/login')
      }
    }
  },[veri])



// Set the timeout for 20 minutes
function myfunc (){
  alert('function')
  // dispatch(Logout())
}
useEffect(() => {
  const delayedLogout = () => {
    // Dispatch your logout action here
    dispatch(Logout());
  };

  // Set a timeout for 20 minutes (20 minutes * 60 seconds * 1000 milliseconds)
  const timeoutId = setTimeout(delayedLogout, 120 * 60 * 1000);

  // Cleanup the timeout if the component unmounts before the timeout is reached
  return () => clearTimeout(timeoutId);
}, []);


  return (
    <MainWrapper
      className='mainwrapper'
    >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '100% !important',
        }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box id='test1' sx={{ minHeight: 'calc(100vh - 170px)' }}>
{/*           
            {
              checker
            } */}
            {
              veri == true ?
              <Outlet />
              :
              null
            }

          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Label />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;

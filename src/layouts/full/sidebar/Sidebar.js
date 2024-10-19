import { useMediaQuery, Box, Drawer } from '@mui/material';
// import Logo from '../shared/logo/Logo';
import Logo from '../../../components/Logo/Logo';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';

const Sidebar = (props) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  // const style = Theme

  const sidebarWidth = '270px';

  if (lgUp) {
    return (
      <Box
        sx={{
          width: (theme)=>theme.palette.sidemenutext.width, 
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: (theme)=>theme.palette.sidemenutext.width,
              boxSizing: 'border-box',
              background: (theme) => theme.palette.sidemenutext.background
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={3} sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>
              <Logo width="100%" />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
              {/* <Box sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>
                <Upgrade />
              </Box> */}
            </Box>
            
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          background: (theme) => theme.palette.sidemenutext.background
        },
      }}
      >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
      {/* <Upgrade /> */}
    </Drawer>
  );
};

export default Sidebar;

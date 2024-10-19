import React from 'react';
import { Box, Typography, Button } from '@mui/material';
// import img1 from 'src/assets/images/backgrounds/rocket.png';

export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h6" mb={1}>View Video Tutorials</Typography>
                    <Button color="secondary" target="_blank" href="#" variant="contained" aria-label="logout" size="small">
                        Click Here
                    </Button>
                </Box>
                <Box mt={3}>
                    <img alt="Remy Sharp" src='/images/logos/logo.png' width={80} />
                </Box>
            </>
        </Box>
    );
};

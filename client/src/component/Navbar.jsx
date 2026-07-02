import React from 'react'
import { Box, Typography, Link, useTheme } from '@mui/material';


const Navbar = () => {
  const theme = useTheme()
  return (
    <Box 
    width={'100%'}
      p='1rem 6%'
      textAlign={'center'}
      backgroundColor={theme.palette.background.alt}
      sx={{ p: 2, border: '1px dashed grey' }}>
      <Typography variant='h1' color='primary' fontWeight='bold'>
        AI Clone ChatGPT
      </Typography>

      <Link href='/register' p={1}>
        Signup
      </Link>
      <Link href='/login' p={1}>
        SignIn
      </Link >
    </Box>
  )
}

export default Navbar

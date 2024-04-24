import React from 'react'
import { AppBar, Typography, Toolbar, Container } from '@mui/material'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

function Header() {
  return (
    <AppBar position='sticky'>
      <Container maxWidth='lg'>
      <Toolbar>
        <Typography component="h1" variant='h5' fontWeight='bold' flex={1}>
          وبلاگ بوتواستارت
          </Typography>
          <BookOutlinedIcon/>
      </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header

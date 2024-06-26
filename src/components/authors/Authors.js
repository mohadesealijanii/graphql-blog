import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS_INFO } from '../../graphql/queries'
import { Avatar, Divider, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


function Authors() {
  const {loading, data, errors} = useQuery(GET_AUTHORS_INFO)

  if (loading) return <h3>Loading...</h3>
  if (errors) return <h3>Error!</h3>
  
  const {authors, index} = data

  return (
    
      <Grid container sx={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", borderRadius:4}}>
      {authors.map((author) => (
        <React.Fragment key={author.id}>
        <Grid item xs={12}>
          <Link to={`/authors/${author.slug}`} style={{display: 'flex', alignItems: 'center', textDecoration:'none'}}>
          <Avatar src={author.avatar.url}/>
          <Typography component='p' variant='p' color='text.secondary'>{author.name}</Typography>
          </Link>
        </Grid>
        {index !== authors.length - 1 && (
            <Grid item xs={12}>
            <Divider variant='middle'/>
            </Grid>
        )}
      </React.Fragment>
      ))}
      </Grid>
  )
}

export default Authors
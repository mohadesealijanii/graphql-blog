import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../shared/Loader'
import { Avatar, Box, Container, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_POST_INFO } from '../../graphql/queries'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import sanitizeHtml from 'sanitize-html'
import CommentForm from '../comment/CommentForm'
import Comments from '../comment/Comments'

function BlogPage() {
  const {slug} = useParams()
  const navigate = useNavigate()
  const {data, errors, loading} = useQuery(GET_POST_INFO, {
    variables: {slug}

  })

  if (loading) return <Loader/>
  if (errors) return <h3>Error!</h3>
  
  const {post: { title, coverPhoto, author, content }} = data


  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item xs={12} mt={9} display='flex' justifyContent= 'space-between'>
          <Typography component='h2' variant='h4' color='primary' fontWeight={700}>
            {title}
          </Typography>
          <ArrowBackRoundedIcon onClick={() => navigate(-1)}/>
        </Grid>
        <Grid item xs={12} mt={6}>
          <img src={coverPhoto.url} alt={slug} width='100%' style={{borderRadius: 15}}/>
        </Grid>
        <Grid item xs={12} mt={7}>
          <Avatar src={author.avatar.url} sx={{width: 80, height: 80, marginLeft: 2}}/>
        <Box component='div'>
        <Typography component='p' variant='h5' fontWeight={700}>{author.name}</Typography>
        <Typography component='p' variant='p' color='text.secondary'>{author.field}</Typography>
        </Box>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div dangerouslySetInnerHTML={{__html: sanitizeHtml(content.html)}}></div>
        </Grid>
        <Grid item xs={12}>
          <CommentForm slug={slug}/>
        </Grid>
        <Grid>
          <Comments slug={slug}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default BlogPage
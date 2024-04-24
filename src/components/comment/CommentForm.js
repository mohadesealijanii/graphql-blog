import { useMutation } from '@apollo/client'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SEND_COMMENT } from '../../graphql/mutations'

function CommentForm({slug}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")

    const [sendComment, {loading, data}] = useMutation(SEND_COMMENT, {
        variables: {name, email, text, slug},
    } )



    const sendHandler = () => {
        if (name && email && text ) {
            sendComment()
        } else {
            toast.warn("تمام فیلدها را پر کنید!", {
                position: 'top-center'
            })
        }
    }

    if (data) {
        toast.success('کامنت ارسال شد و در انتطار تایید است!', {
            position: 'top-center'
        })
    }

    return (
    <Grid container sx={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', borderRadius: 4, p: 1, mt: 5}}>
        <Grid><Typography component='p' variant='h6' fontWeight={700} color='primary'>ارسال کامنت</Typography></Grid>

        <Grid item xs={12} m={2}>
            <TextField label= 'نام کاربری' variant='outlined' sx={{width: '100%'}} value={name} onChange={(e) => setName(e.target.value)}/>
        </Grid>

        <Grid item xs={12} m={2}>
            <TextField label= 'ایمیل' variant='outlined' sx={{width: '100%'}} value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Grid>

        <Grid item xs={12} m={2}>
            <TextField label= 'کامنت' variant='outlined' sx={{width: '100%'}} value={text} onChange={(e) => setText(e.target.value)} multiline minRows={4}/>
        </Grid>
        <Grid item xs={12} m={2}>
        {loading ? <Button variant='contained' disabled>درحال ارسال . . .</Button> : 
            <Button variant='contained' onClick={sendHandler}>ارسال</Button>}
        </Grid>
        <ToastContainer />
    </Grid>
  )
}

export default CommentForm
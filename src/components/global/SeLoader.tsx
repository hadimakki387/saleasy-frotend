import { CircularProgress, CircularProgressProps } from '@mui/material'
import React from 'react'

function SeLoader({...rest}:CircularProgressProps) {
  return (
    <div>
        <CircularProgress {...rest}/>
    </div>
  )
}

export default SeLoader
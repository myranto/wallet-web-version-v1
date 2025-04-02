import { Button } from '@mui/material'
import React from 'react'
import Loader from '../loader/Loader'

const MButton = ({loading, libelle, width, submit}) => {
    return (
        <>
            {!loading &&
                <Button sx={{ width: width, maxWidth: '100%' }} type="button" fullWidth variant="contained" onClick={submit}>
                    {libelle}
                </Button>
            }
            <Loader onLoad={loading} />
        </>
    )
}

export default MButton
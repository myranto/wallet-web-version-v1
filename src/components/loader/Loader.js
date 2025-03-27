import React from "react";
import {blue} from "@mui/material/colors";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

// composant utilisé pour gerer les requetes longs
export default function Loader({onLoad = false}) {
    return (
        <Box sx={{m: 1, position: 'relative', display: 'flex', alignItems: 'center'}}>
            {onLoad && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: blue[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>
    )
}

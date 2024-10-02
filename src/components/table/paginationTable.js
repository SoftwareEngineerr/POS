import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Description, Edit, PlayArrowOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

const PaginationTable = (props) => {
    const theme = useTheme();
    const style = theme.palette;
    const tablestyle = theme.palette.Main.Inventory;
    
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sendingEditData , setSendingEditData ] = useState();


  
  const url = useSelector((state) => state.Api);
  const [number , setNumber ] = useState(0);
  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);
  const [editOpen , setEditOpen ] = useState(false)
  const [ data , setData ] = useState(props.data); 
  const [ title , setTitle ] = useState(props.title); 
  const [fetchData , setFetchData] = useState(props.fetchData)
  





    useEffect(()=>{
        setData(props.data)
        setTitle(props.title)
        setFetchData(props.fetchData)
        console.log(props.data)
    },[props])

            // pagination started
        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => {
            // alert(newPage)
            setPage(newPage);
            props.page(newPage)
            
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            // alert(parseInt(event.target.value, 10))
            setPage(0);
            props.rowsPerPage(parseInt(event.target.value, 10))
        };
        // debugger

  return (
    <div>
        
        <Box>
                <Typography variant='h2'>
                    Result : {data.result}
                </Typography>
            </Box>
            <br />
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 515 }} aria-label="caption table">
            <TableHead>
            <TableRow  sx={{background: style.primary.main}} id="thead">
                {
                    title.map((item, ind)=>
                    <TableCell key={ind} sx={{color: 'white'}}>
                        {item}
                    </TableCell>

                    )
                }
                    
            </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.butnName && (
                        <TableRow >
                            <TableCell colSpan={8} onClick={props.myfunc}>
                                <Box sx={tablestyle.table.firstrow}>
                                    <Box><Add /></Box>
                                        <Box sx={{margin: '3px'}}>
                                            {props.butnName}
                                        </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )
                }

                {
                 data  && ( data.data.map((item , ind)=>
                        <TableRow>
                            {
                                props.image == 'true' ?
                                <TableCell>
                                    {
                                        item.image && item.image != 'undefined' && (
                                            <Box component="img" src={`${url.imageServer}/${item.image}`} sx={tablestyle.imagestyle} >
                                            </Box>
                                        )
                                    }
                                </TableCell>
                                :
                                null
                            }
                            {fetchData.map((insideitem , ind)=>
                                <TableCell>
                                {item[insideitem]}
                            </TableCell> 
                            )
                            }
                            {
                                props.watch == 'true' ?
                                <TableCell>
                                    <Box
                                     onClick={()=>props.showData(item[props.watchitem])}
                                     sx={{
                                        background: style.primary.main,
                                        color : 'white',
                                        borderRadius: '3px',
                                        display: 'flex',
                                        alignItems:'center',
                                        justifyContent: 'center',
                                        width: '50px',
                                        padding: '4px',
                                    }}
                                     >
                                            <PlayArrowOutlined />

                                    </Box>
                                </TableCell>
                                :
                                null
                            }
                        </TableRow>
                    )
                )
                }


            </TableBody>
        </Table>
        </TableContainer>
        <Box>
        <TablePagination
            component="div"
            count={data.result}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Box>
    </div>
  )
}

PaginationTable.propTypes = {}

export default PaginationTable
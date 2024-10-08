import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination, Typography } from '@mui/material';
import { Add, Delete, Description, Edit } from '@mui/icons-material';
import Modal from './modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PostRequest } from '../../../../redux/actions/PostRequest';
import Editmodal from './editmodal';
import { ShowLoader } from '../../../../redux/actions/loader';
// import { Button } from 'bootstrap';


const CustomTable = (props) => {
  const theme = useTheme();
  const style = theme.palette;
  const tablestyle = theme.palette.Main.Inventory;
  const url = useSelector((state) => state.Api);
  const [number , setNumber ] = useState(0);
  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);
  const [editOpen , setEditOpen ] = useState(false)
  const [ data , setData ] = useState(''); 
  
  const myfunc = () => {
    setOpen(!open)
  }
  const updateinfo = () => {
    myfunc();
    setNumber((number)=>number+1)
  }
  // console.log(style.sidemenutext.secondary)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sendingEditData , setSendingEditData ] = useState();


  console.log(props.data)






            // pagination started
        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => {
            // alert(newPage)
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            // alert(parseInt(event.target.value, 10))
            setPage(0);
        };

        // pagination ended


        useEffect(()=>{
            // console.log('is it changing');
            const myfunc = async()=>{
              dispatch(ShowLoader('1'))
                // If data doesn't exist, fetch it from the API
                const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
                // console.log(url)
                const sendingdata = {
                    totalRecords: rowsPerPage,
                    page: page,
                    filterData: props.data ? props.data : ''
                }
                const res = await axios.post(url.showKhata,{...sendingdata} ,{
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                  }
                });
                if (res.status === 200) {
                  setData(res.data);
                  console.log(res.data)
                  // Store the fetched data in sessionStorage
                  sessionStorage.setItem("Classes", JSON.stringify(res.data.result));
                dispatch(ShowLoader('0'))
                }
            };
            myfunc();
          }, [page , rowsPerPage , number , props.data])


          const DeleteItem = async (getparam) => {
            // alert(getparam)
            await dispatch(PostRequest(url.deleteKhata,  JSON.parse(sessionStorage.getItem("User_Data")).token , {id:getparam}))
            setNumber((number)=>number+1)
          }

          const EditItem = async  (getparam)  => {
                console.log(getparam)
                
                
                setEditOpen(true)
                setSendingEditData({
                    inputs: [
                        {id:getparam?.id},
                        { data: 'Name', type: 'text', value: getparam?.Name , required: true, style: 'max-width: 800px', name: 'Name', feildtype: 'input', lg: 6, md: 6, sm: 12, xs: 12, lang: 'en' },
                        { data: 'Phone', type: 'text', value: getparam?.Phone , required: true, style: 'max-width: 800px', name: 'Phone', feildtype: 'input', lg: 6, md: 6, sm: 12, xs: 12, lang: 'en' },
                        { data: 'IdNo', type: 'text', value: getparam?.IdNo , required: true, name: 'IdNo', feildtype: 'input', lg: 12, md: 12, sm: 12, xs: 12, lang: 'en' },
                        { data: 'Image', type: 'image', value: getparam?.image , required: true, style: 'max-width: 800px', name: 'image', feildtype: 'image', lg: 6, md: 6, sm: 12, xs: 12, lang: 'en' },
                        { data: 'Edit Product', type: 'text', required: true, name: 'Roll', feildtype: 'button', lg: 12, md: 12, sm: 12, xs: 12, lang: 'en' },
                    ],
                })
          }

          const editOpenClose = () => {
            setEditOpen(false)
          }

          const openclose = () => {
            setOpen(false)
          }

       

  return (
    <>
                <Dialog
                    open={open}
                    onClose={openclose}
                    aria-labelledby="responsive-dialog-title"
                    className='dialogCustomSize'
                    >
                    <DialogTitle id="responsive-dialog-title" >
                        Add Person
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box >
                                <Modal myfunc={updateinfo} />
                            </Box>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={openclose}>
                        Cancel
                        </Button>
                    </DialogActions>
                    </Dialog>

                 {/* add product modal ended  */}

                  {/* edit product modal started  */}
               
                    <Dialog
                    open={editOpen}
                    onClose={editOpenClose}
                    aria-labelledby="responsive-dialog-title"
                    className='dialogCustomSize'
                    >
                    <DialogTitle id="responsive-dialog-title" >
                        Update Information
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box >
                                {
                                    sendingEditData && (
                                        <Editmodal data={sendingEditData} myfunc={updateinfo} />
                                    )
                                }
                            </Box>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={editOpenClose}>
                        Cancel
                        </Button>
                    </DialogActions>
                    </Dialog>
                {/* edit product modal ended */}

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
                    ['Image','Name', 'Phone','IdNo','Action'].map((item, ind)=>
                    <TableCell key={ind} sx={{color:style.sidemenutext.color}}>
                        {item}
                    </TableCell>

                    )
                }
                    
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                    <TableCell colSpan={5} onClick={myfunc}>
                        <Box sx={tablestyle.table.firstrow}>
                            <Box><Add /></Box>
                                <Box sx={{margin: '3px'}}>
                                    Add Product
                                </Box>
                        </Box>
                    </TableCell>
                </TableRow>

                {
                  data && ( data.data.map((item , ind)=>
                        <TableRow>
                            <TableCell>
                                {
                                    item.image && item.image != 'undefined' && (
                                        <Box component="img" src={`${url.imageServer}/${item.image}`} sx={tablestyle.imagestyle} >
                                        </Box>
                                    )
                                }
                                {/* <img src={`${url.imageServer}/${item.Image}`} sx={tablestyle.imagestyle} /> */}
                                {/* {`${url.imageServer}/${item.image}`} */}
                            </TableCell>
                            <TableCell>
                                {item.Name}
                            </TableCell>
                            <TableCell>
                                {item.Phone}
                            </TableCell> 
                            <TableCell>
                                {item.IdNo}
                            </TableCell> 
                            <TableCell>
                                <Edit onClick={()=>EditItem(item)} />
                                <Delete onClick={()=>DeleteItem(item.id)} />
                            </TableCell>
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
    </>
  );
}
export default CustomTable;

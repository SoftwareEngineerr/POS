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
import PaginationTable from '../../../../components/table/paginationTable';
// import { Button } from 'bootstrap';


const CustomTable = (props) => {

  const url = useSelector((state) => state.Api);
  const [number , setNumber ] = useState(0);
  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);
  const [editOpen , setEditOpen ] = useState(false)
  const [ data , setData ] = useState(''); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const myfunc = () => {
    setOpen(!open)
  }
  const updateinfo = () => {
    myfunc();
    setNumber((number)=>number+1)
  }

  // console.log(style.sidemenutext.secondary)

        // pagination ended

        const rowsfunc = (e) => {
            setPage(0);
            setRowsPerPage(e)
        }


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
                const res = await axios.post(url.productshow,{...sendingdata} ,{
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
                // setPage(0)
                }
            };
            myfunc();
          }, [props.data , number , page , rowsPerPage])

          const editOpenClose = () => {
            setEditOpen(false)
          }

          const openclose = () => {
            setOpen(false)
          }

          
  return (
    <>

                {/* add product modal  */}
                {/* <Box 
                  sx={{
                    ...tablestyle.modal,
                    display: open ? 'block' : 'none',
                    opacity: open ? 1 : 0,
                  }}
                >
                    <Box sx={tablestyle.modal.modalchild}
                    onMouseout={myfunc}
                    id="myDiv"
                    // ref={divRef}
                    >
                        <Modal myfunc={updateinfo} />
                    </Box>
                </Box> */}
                <Dialog
                    open={open}
                    onClose={openclose}
                    aria-labelledby="responsive-dialog-title"
                    className='dialogCustomSize'
                    >
                    <DialogTitle id="responsive-dialog-title" >
                        Add Product
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

                <PaginationTable 
                 data={data} 
                 title={['Image','Name', 'Expiry' , 'Bar Code','Quantity','Real Price','Sell Price']}
                fetchData={['Name','Expiry','BarCode','Quantity','Real_Price','Sell_Price']}
                myfunc={myfunc}
                image='true'
                page={(e)=>setPage(e)}
                rowsPerPage={(e)=>rowsfunc(e)}
                butnName='Add Product'
                /> 
    </>
  );
}
export default CustomTable;

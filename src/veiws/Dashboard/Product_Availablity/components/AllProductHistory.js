import React , { useEffect, useState }  from 'react'
import { CustomBtn } from '../../../../components/button/button'
import { Box, Grid } from '@mui/material'
import CustomTable from '../../../../components/table/SimpleTable'
import PageContainer from '../../../../components/Container/pageContainer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FullDate } from '../../../../components/Date/FullDate'
import { PostRequest } from '../../../../redux/actions/PostRequest'
import PropTypes from 'prop-types'
import CustomForm from '../../../../components/form/form'
import { Main } from '../../../../constant'
import { ShowLoader } from '../../../../redux/actions/loader'
import ShowProduct from '../../../../components/suggestionInput/showProduct'
import PaginationTable from '../../../../components/table/paginationTable'
import { SHOW_MODAL } from '../../../../redux/actions/showModal/showModal'
import dayjs from 'dayjs'

const AllProductHistory = props => {
    const [data , setData ] = useState(Main().ProductHistory)
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const dispatch = useDispatch();
    const api = useSelector((state) => state.Api);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const [ serverData , setServerData ] = useState()
    const [inputValues, setInputValues] = useState({...initialInputValues ,
        startDate: dayjs().format('YYYY-M-DD'),
        endDate: dayjs().format('YYYY-M-DD'),
     });
    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const loadDate = dayjs(Date.now())
    const [suggestions , setSuggestions] = useState();

    const rowsfunc = (e) => {
        // console.log(e)
        setPage(0);
        setRowsPerPage(e)
        tryFetch(e , undefined)
    }


        const tryFetch = async(param1 , param2) => {
            const sendingdata = {
                totalRecords: param1 ? param1 : rowsPerPage,
                page: param2 ? param2 : page,
                ...inputValues
            }
            console.log(sendingdata)
            dispatch(ShowLoader('1'))
              try {
                  const response = await axios.post(api.all_product_History, sendingdata, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${userToken}`,
                      },
                  });
      
                  if (response.status === 200) {
                    // setServerData(response.data.result);
                    if(response.data.result != []){
                        setServerData((prevValues) => ({
                            ...prevValues,
                            history: response.data,
                        }));
                    }
                dispatch(ShowLoader('0'))

                  }
                  else{
                    console.log(response)
                    //   dispatch(SHOW_MODAL(response.data.message , response.response))

                  }
              } catch (error) {
                  dispatch(ShowLoader('0'))
                  console.log(error.response.data.message);
                //   dispatch(SHOW_MODAL(error.response.data.message, 'nothing'))


              }
        }
      
      
          const fetchData = async (e) => {
            e.preventDefault()
            tryFetch() 
          };
      


    const ChangeDate = (e , name) =>{
        console.log(e , name)
        const converterToDate = new Date(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]:  `${converterToDate.getFullYear()}-${converterToDate.getMonth() + 1}-${converterToDate.getDate()}`
    }));
    // fetchData(e,name)
    }
 
    // Table Data Ended
  return (
    <PageContainer title='Donation' description='Donation'>
       

        <Box mt={3}>
                <form onSubmit={fetchData}>
                    <Grid container>
                    <Grid item  lg={12} md={12} sm={12} xs={12}>
                    {/* <ShowProduct 
                    handleInputChange={suggestionhandleInputChange}
                    Suggestions={suggestions}
                    placeholder='Roll No / Name'
                    name='RollNum'
                    /> */}

                    </Grid>
                        <CustomForm data={data.inputs}  ChangeDate={ChangeDate}  />            
                    </Grid>
                </form>
                <Box mt={2}>

                </Box>
                    {
                        serverData  && (
                            <>
                                {/* <CustomForm data={serverData.veiwDonation} handleInputChange={handleInputChange} /> */}
                                {/* <CustomTable data={serverData.history} /> */}
                                <PaginationTable 
                                data={serverData.history} 
                                title={['Image','Name','Real Price', 'Sell Price' , 'Quantity','Description','Date']}
                                fetchData={['Name','Real Price', 'Sell Price' , 'Quantity','Description','Date']}
                                // myfunc={myfunc}
                                image='true'
                                // page={(e)=>setPage(e)}
                                page={(e)=>tryFetch(undefined,e)}
                                rowsPerPage={(e)=>rowsfunc(e)}
                                // butnName='Add Product'
                                /> 
                            </>
                        )
                    }


        </Box>
    </PageContainer>
  )
}

AllProductHistory.propTypes = {}

export default AllProductHistory
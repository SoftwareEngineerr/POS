import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShowKhata from '../../../components/suggestionInput/showKhata'
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoader } from '../../../redux/actions/loader';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import CustomTable from '../../../components/table/SimpleTable';
import ShowKhataPerson from './component/ShowKhataPerson';
import PaginationTable from '../../../components/table/paginationTable';
import Receipt from '../../../components/pdf/pdf';

const KhataBill = props => {
    const [suggestions , setSuggestions] = useState();
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    const data = useSelector((state)=>state.FETCHPOS.data.response)

    const [inputValues, setInputValues] = useState({});
    const [ image , setImage ] = useState();
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [ serverData , setServerData ] = useState()



    useEffect(() => {
        try {
          dispatch(ShowLoader('1'))
          axios.get(api.khataSuggest, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data.message);
              setSuggestions(res.data.message);
              dispatch(ShowLoader('0'))
            }
          })
          .catch((err) => {
            console.error(err); // Log the error response for debugging
          });
        } catch (err) {
          console.error(err);
        }
      }, []);

      function suggestionhandleInputChange(e) {
        setImage(e.target.Image)
        console.log(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            id: e.target.id,
        }));
        tryFetch(undefined , undefined , e.target.id)
        // const RollNum = { RollNum: e.target.value}
        // fetchstudent(RollNum)   
    }
    useEffect(()=>{
      console.log(data)
      
    },[data])
    
    const rowsfunc = (e) => {
      // console.log(e)
      setPage(0);
      setRowsPerPage(e)
      tryFetch(e , undefined)
  }


      const tryFetch = async(param1 , param2 , param3) => {
          const sendingdata = {
              totalRecords: param1 ? param1 : rowsPerPage,
              page: param2 ? param2 : page,
              id: param3,
              ...inputValues
          }
          console.log(sendingdata)
          dispatch(ShowLoader('1'))
            try {
                const response = await axios.post(api.track_bill, sendingdata, {
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

      const items = [
        { name: 'Item 1', price: 10.0 },
        { name: 'Item 2', price: 15.5 },
      ];
      
      const total = items.reduce((sum, item) => sum + item.price, 0);
    

      const showData = (param) => {
        alert(param)
      }
    
  return (
    <div>
      {
        data && (
          <div>
            {/* <Receipt items={items} total={total} /> */}
              {/* <Receipt items={items} total={total} customerName="John Doe" /> */}
          </div>
        )
      }
        <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <ShowKhata
                handleInputChange={suggestionhandleInputChange}
                Suggestions={suggestions}
                placeholder='Roll No / Name'
                name='RollNum'
                // khataId={inputValues.id}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                {
                    inputValues.id && (
                        <ShowKhataPerson
                        id={inputValues.id}
                        updateinfo={tryFetch}
                        />
                    )
                }
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
               
                {
                        serverData  && (
                            <>
                                {/* <CustomForm data={serverData.veiwDonation} handleInputChange={handleInputChange} /> */}
                                {/* <CustomTable data={serverData.history} /> */}
                                <PaginationTable 
                                data={serverData.history} 
                                title={['Bill Id','Discount','Products', 'Date', 'Total', 'Watch']}
                                fetchData={['Bill Id','Discount','Products', 'Date', 'Total']}
                                // myfunc={myfunc}
                                // image='true'
                                // page={(e)=>setPage(e)}
                                watch='true'
                                watchitem='Bill Id'
                                page={(e)=>tryFetch(undefined,e)}
                                rowsPerPage={(e)=>rowsfunc(e)}
                                showData={showData}
                                // butnName='Add Product'
                                /> 
                            </>
                        )
                    }
            </Grid>
        </Grid>

    </div>
  )
}

KhataBill.propTypes = {}

export default KhataBill
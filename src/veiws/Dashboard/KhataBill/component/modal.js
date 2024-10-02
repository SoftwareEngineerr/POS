import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShowProduct from '../../../../components/suggestionInput/showProduct'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader } from '../../../../redux/actions/loader'
import axios from 'axios'
import { Grid } from '@mui/material'
import BarcodeScanner from '../../../../components/barcodescanner/barcodescranner'
import CalculatorTable from '../../../../components/table/calculatorTable'

const Modal = (props) => {
    const api = useSelector((state)=>state.Api)
    const [suggestions , setSuggestions] = useState();
    const dispatch = useDispatch();
    const [inputValues, setInputValues] = useState({id:''});
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const [data , setData ] = useState([])
    const [ updateQuantity , setUpdateQuantity ] = useState(0)
    const [ update , setUpdate ] = useState(0)


    useEffect(() => {
        try {
          dispatch(ShowLoader('1'))
          axios.get(api.productAvailabilityhints, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data.result);
              setSuggestions(res.data.result);
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
        // setImage(e.target.Image)
        console.log(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            id: e.target.id,
        }));
        // const RollNum = { RollNum: e.target.value}
        fetchData(e.target.id)   
    }
    const fetchData = (id) => {
        // console.log(id)
        
        try {
            dispatch(ShowLoader('1'))
            axios.get(`${api.showQuantity}/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log(data);
                setData((prevValues) => {
                    // Check if the item already exists
                    const exists = prevValues.some(item => item.ProductId === res.data.result.id);
                    // prevValues.map((item , ind)=>{
                    //     console.log(item.defaultQuatity)
                    //     if(item.defaultQuatity == undefined){
                    //         item.defaultQuatity = 1;
                    //     }
                    // })
                    // If it doesn't exist, add the new item; otherwise, return the previous values
                    if (!exists) {
                        return [...prevValues, {...res.data.result , ProductId: res.data.result.id}];
                    }
                    else{
                        
                        prevValues.map((item , ind)=> {
                            if(item.id === res.data.result.id){
                                // item.defaultQuatity = if()
                                setUpdateQuantity(item.id)
                                setUpdate((update)=>update+1)
                            }
                        })
                    }
                
                    return prevValues; // No change if it already exists
                });
                
                dispatch(ShowLoader('0'))
              }
            })
            .catch((err) => {
              console.error(err); // Log the error response for debugging
            });
          } catch (err) {
            console.error(err);
          }
    }
    const updateData = (params) => {
        setData(params)
    }
  return (
    <div>
        <Grid container>
            <Grid lg={12} md={12} sm={12} xs={12}>
                <ShowProduct 
                    handleInputChange={suggestionhandleInputChange}
                    Suggestions={suggestions}
                    placeholder='Roll No / Name'
                    name='RollNum'
                    />
                    {/* <BarcodeScanner /> */}
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12} mt={2}>
                {
                    data != [] && data != undefined && data && data.length !== 0 && (
                        // console.log(data)
                        <CalculatorTable pay="true" updateinfo={props.updateinfo} open={props.open} khataId={props.khataId} data={data} updateData={updateData} updateQuantity={updateQuantity} update={update} />
                    )
                }
            </Grid>
           
        </Grid>
    </div>
  )
}

Modal.propTypes = {}

export default Modal
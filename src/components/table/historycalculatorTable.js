import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';
import { Box, Grid, Typography } from '@mui/material';
import { Delete, DeleteForever, Refresh } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { POS } from '../../redux/actions/pos/pos';
import { CustomBtn } from '../button/button';
import { Input } from '../input/input';
import { PostRequest } from '../../redux/actions/PostRequest';


export default function HistoryCalculatorTable(props) {
  const theme = useTheme();
  const style = theme.palette;
  const [obj , setObj ] = useState();
  const [total , setTotal ] = useState();
  const [discount , setDiscount ] = useState(0);
  const [ update , setUpdate ] = useState()
  const [ updateValue , setUpdateValue ] = useState()
  const api = useSelector((state)=>state.Api)
  const dispatch = useDispatch()
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
  const [returnProductPrice  , setReturnProductPrice ] = useState(0)



//   console.log(props)
  const [data, setData] = useState(() => 
    props.data.map(item => {
      const { Quantity , Sell_Price , Discount , id , ...rest } = item; // Destructure to omit Quantity
      return rest; // Return the rest of the properties
    })
  );
  

  const priceChecker = (item) => {
    //console.log(item)
    if(item != undefined){
        if(item.price != undefined){
        return item.price
        }
        else{
            return item.Sell_Price
        }
    }
    else{
        return null
    }
  }
  const checker = () => {
    if(obj){
        return(obj)
    }
    else{
        return ''
    }
  }
  const propsChecker = () => {
    const ind = props.data.length-1;
    //console.log(props.data.length , props.data.length > 0)
    // //console.log(props.data[props.data.length] < 1 , props.data[ind] )
        if(props.data.length > 0){
            return props.data[ind]
        }
  }
  const checkerparamfunc = () => {
    if(updateValue || updateValue == 0){
        const data = checker();
        const updatedData = data.filter((_, index) => index !== updateValue);
        setUpdateValue(null)
        // const seconddata  = delete data[catchparam];
  //console.log(updatedData)
        return data
    }
    else{
        // return checker()
        const arr = [
            ...checker(),
            ...[propsChecker()]
        ]
       return arr
    }
  }
  const totalfunc = () => {
    console.log(updateValue)

//console.log(checkerparamfunc())
      const recentdata = [
        ...checkerparamfunc(),
        // propsChecker()
      ]
//console.log(recentdata , propsChecker())
      if(recentdata){
        console.log(recentdata)
          setTotal(recentdata.reduce((total, item) => {
            // return total + priceChecker(item); // Accumulate the price
            console.log(priceChecker(item) , item.Quantity)
            if(item.Quantity > 1){
                return total + (priceChecker(item) * item.Quantity); // Accumulate the price
            }
            else{
            return total + priceChecker(item); // Accumulate the price

            }
          }, 0)); // Start with an initial total of 0

      }
      

  }
  
  useEffect(() => {
    setData(props.data.map(item => {
      const { Quantity, Sell_Price ,id, Image , ProductId ,Discount ,  ...rest } = item; // Destructure to omit Quantity
      const payload = {Return:0 , ...rest };
      return payload; // Return the rest of the properties
    }));


    setObj(props.data.map((item , ind) => {
        const myfunc = () => {
            const price = props.data[ind]?.Sell_Price;
            if(obj){
                if(obj[ind]){
                return obj[ind].price
                }
                else{
                    return price
                }
            }
            else{
                return price
            }
        }
        const { Sell_Price  ,  ...rest } = item; // Destructure to omit Quantity
        console.log(item , obj)
        if(obj){
            // if(obj[ind] != undefined){
            //     if(item.id == obj[ind].id){
            //         return obj[ind]
            //     }
            // }
            // else{
                return {
                  ...rest , price:myfunc()
                }; // Return the rest of the properties
            // }
        }
        else{
            return {...rest , price:myfunc()}; // Return the rest of the properties
        }
      }));
      totalfunc()
    }, [props.data , props.updateData ]);

    useEffect(()=>{
  //console.log(props.updateQuantity)
        const find = props.updateQuantity
        if(obj && find){
            const myfunc = () => {
          //console.log(obj);
                for (var x = 0; x < obj.length; x++) {
                    if (obj[x].id === find) {
                        return x;
                    }
                }
                // Optionally return a value if no match is found
                return -1;
            };
            
            const getval = myfunc();
            
            const ind = getval;
      //console.log(getval , ind)
            const value = parseInt(obj[ind].Quantity);
            const max = props.data[ind].Quantity;
            const onePlusQuan = parseInt(obj[ind].Quantity) + 1
            if(value){
          //console.log(max >= value , max , value , onePlusQuan)
                if(max >= value ){
                    setInputValues((prevValues) => ({
                        ...prevValues,
                        // [e.target.name]: value,
                    }));
                    
                    // //console.log(value , props.data[ind].Sell_Price , value * props.data[ind].Sell_Price,)
                    obj[ind].price = onePlusQuan * props.data[ind].Sell_Price
                    obj[ind].Quantity = onePlusQuan
        
                    setTotal(obj.reduce((total, item) => {
                        return total + item.price; // Accumulate the price
                      }, 0)); 
                    // props.data[ind].defaultQuatity = value
                }
                else{
                    setInputValues((prevValues) => ({
                        ...prevValues,
                        // [e.target.name]: max,
                    }));
                    obj[ind].Quantity = max
        
                    obj[ind].price = max * props.data[ind].Sell_Price
                    obj[ind].Quantity = max
        
                    // props.data[ind].defaultQuatity = max
        
                    setTotal(obj.reduce((total, item) => {
                        return total + item.price; // Accumulate the price
                      }, 0)); 
                }
            }

        }

    },[props.update ,  props.updateData])
  
  
  const [inputValues, setInputValues] = useState({});
  function handleInputChange(e , max , ind) {
    // //console.log('change func')`    
        if(max >= e.target.value){    
            setInputValues((prevValues) => ({
                ...prevValues,
                [e.target.name]: e.target.value,
            }));

            // //console.log(e.target.value , props.data[ind].Sell_Price , e.target.value * props.data[ind].Sell_Price,)
            obj[ind].price = e.target.value * props.data[ind].Sell_Price
            obj[ind].Quantity = e.target.value

            setTotal(obj.reduce((total, item) => {
                return total + item.price; // Accumulate the price
              }, 0)); 
              setData((oldValue) => {
                return oldValue.map((item, index) => {
                  if (index === ind) {
                    return {
                      ...item,
                      Return: props.data[ind].Quantity -  e.target.value ,
                    };
                  }
                  return item; // Return the item as is for all other indices
                });
              });
              console.log(ind)
            obj[ind].Return =  props.data[ind].Quantity -  e.target.value 
            // props.data[ind].defaultQuatity = e.target.value
        }
        else{
            setInputValues((prevValues) => ({
                ...prevValues,
                [e.target.name]: e.target.value,
            }));
            e.target.value = max

            obj[ind].price = e.target.value * props.data[ind].Sell_Price
            obj[ind].Quantity = max
            obj[ind].Return =  props.data[ind].Quantity -  e.target.value 


            // props.data[ind].defaultQuatity = max

            setTotal(obj.reduce((total, item) => {
                return total + item.price; // Accumulate the price
              }, 0)); 
        }

     }
     const deleteItem = (getparam) => {
        setData((oldValue) => {
            console.log('Old Value:', oldValue);
            console.log('getparam:', getparam);
            console.log('Updating Quantity:', props.data[getparam]?.Quantity);
            console.log(props.data[getparam]?.Quantity)
            
            return oldValue.map((item, index) => {
                if (index == getparam) {
                    return {
                        ...item,
                        Return: props.data[getparam]?.Quantity,
                    };
                }
                return item;
            });
        });
        obj[getparam].Return =  props.data[getparam]?.Quantity
        setReturnProductPrice(data.reduce((total, item, ind) => {
          // return total + priceChecker(item); // Accumulate the price
          console.log(priceChecker(item) , props.data[ind]?.['Sell_Price'])
          if(item.Return > 0){
              return total + (priceChecker(props.data[ind]) * item.Return); // Accumulate the price
          }
          else{
          return total + priceChecker(props.data[ind]); // Accumulate the price
  
          }
        }, 0)); 
    };
    const RefreshItem = (getparam) => {
      setData((oldValue) => {
          console.log('Old Value:', oldValue);
          console.log('getparam:', getparam);
          console.log('Updating Quantity:', props.data[getparam]?.Quantity);
          
          return oldValue.map((item, index) => {
              if (index === getparam) {
                  console.log(item)
                obj[getparam].Quantity = props.data[getparam]?.Quantity
                  return {
                      ...item,
                      Return: 0,
                  };
              }
              return item;
          });
      });
      setReturnProductPrice(data.reduce((total, item, ind) => {
        // return total + priceChecker(item); // Accumulate the price
        console.log(priceChecker(item) , props.data[ind]?.['Sell_Price'])
        if(item.Return > 0){
            return total - (priceChecker(props.data[ind]) * item.Return); // Accumulate the price
        }
        else{
        return total - priceChecker(props.data[ind]); // Accumulate the price

        }
      }, 0)); 
  };
    
    


    const submitFunc = async(e) => {
        e.preventDefault();
        const data = obj.map((item , ind)=>{
            return { ...item, ProductId:props.data[ind].ProductId , PerPice: props.data[ind].Sell_Price}
        })
        console.log(data)
        dispatch(POS(data))
        const payload = {
            data: data,
            khataId: props.khataId,
            discount: discount,
            total: total,
            items: data.length,
            pay: inputValues.pay,
            bill_id: parseInt(props.bill_id)
        }
        console.log(payload)
        await dispatch(PostRequest(api.return_Bill , userToken , payload))
        await props.update()
        // props.updateinfo()
    }
    const minusMoney = (value, ind) => {
        console.log(value, ind);
        // var value = value;
        // if(value){
        //     value = 0;
        // }
        setObj((prevData) => {
            const updatedData = prevData.map((item, index) => {
                if (index === ind) {
                    return { ...item, Discount: parseInt(value) }; // Update the Discount
                }
                return item; // Return unchanged item
            });
    
            // Calculate the new total discount after updating the state
            const newDiscount = updatedData.reduce((total, item) => {
                return total + item.Discount; // Accumulate the Discount
            }, 0);
    
            // Set the discount based on the updated data
            setDiscount(newDiscount);
    
            return updatedData; // Return the updated array for setObj
        });
    };
    const pay = (e) => {
        if((total - discount) >= e.target.value){
            setInputValues((prevValues) => ({
                ...prevValues,
                pay: parseInt(e.target.value),
            }));

            // //console.log(e.target.value , props.data[ind].Sell_Price , e.target.value * props.data[ind].Sell_Price,)
            // props.data[ind].defaultQuatity = e.target.value
            e.target.style.background = 'white'
        }
        else{
            e.target.value = total - discount
            // e.target.style.border = '1px solid red'
            e.target.style.background = '#ffcccc'
            setInputValues((prevValues) => ({
                ...prevValues,
                pay: parseInt(e.target.value),
            }));
        }
    }

    // alert(props.data[data.length-1])
    // console.log(props.data[data.length-1])
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 515 }} aria-label="caption table">
        <TableHead>
          <TableRow  sx={{background: style.primary.main}} id="thead">
              <TableCell sx={{color:style.sidemenutext.color}}>Image</TableCell>
            {data &&
              Object.keys(data[0]).map((key) => (
                <TableCell key={key} sx={{color:style.sidemenutext.color}}>{key}</TableCell>
              ))}
                <TableCell sx={{color:style.sidemenutext.color}}>Quantity</TableCell>
                {
                  props.Discount ?
                  <TableCell sx={{color:style.sidemenutext.color}}>Discount</TableCell>
                  :
                  null
                }
                <TableCell sx={{color:style.sidemenutext.color}}>Per Pice</TableCell>
                <TableCell sx={{color:style.sidemenutext.color}}>Price</TableCell>
                <TableCell sx={{color:style.sidemenutext.color}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {
          props.data[data.length-1] != undefined &&
          data &&
            data.map((row, ind) => (
              row.Description == 'Total'?
              <TableRow key={ind}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}><b>{value}</b></TableCell>
                ))}
              </TableRow>
              :
              row.Return !=  props.data[ind].Quantity ? 
              <TableRow key={ind}>
              
                  <TableCell>
             {/* { row.Return} */}
             {/* { props.data[ind].Quantity } */}
                    {
                  //console.log(row)
                    }
                    
                            <Box
                            component='img'
                            src={`${api.imageServer}${props.data[ind]?.Image}`}
                            sx={{
                                maxWidth: '50px',
                                maxHeight: '50px'
                            }}
                            >
                            </Box>
                        
                    
                  </TableCell>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                  <TableCell>
                    {/* {//console.log(props.data )} */}
                    <Input
                    // defaultValue={1}
                    type="number"
                    max={row.Quantity}
                    inputProps={{ 
                        max: props.data[ind].Quantity, // Set max limit for the input
                        min: 1 // Optional: set a minimum limit if needed
                      }}
                    onChange={(e)=>handleInputChange(e ,  props.data[ind].Quantity , ind)}
                    value={obj?.[ind].Quantity}
                    sx={{
                        width: '70px'
                    }}
                    />
                  </TableCell>
                  {
                  props.Discount ?
                    <TableCell>
                          <Input
                              type="number"
                              // onChange={(e)=>handleInputChange(e ,  props.data[ind].Quantity , ind)}
                              onChange={(e)=>minusMoney(e.target.value , ind)}
                              defaultValue={0}
                              value={obj?.[ind].Discount}
                              inputProps={{ 
                                  // max: propss.data[ind].Quantity, // Set max limit for the input
                                  min: 0 // Optional: set a minimum limit if needed
                                }}
                          />
                    </TableCell>
                    :
                    null
                  }
                  <TableCell>{props.data?.[ind].Sell_Price}</TableCell>
                  <TableCell>
                    
                    {/* { obj?.[ind].price - obj?.[ind].Discount} */}
                    { obj?.[ind].price }
                  </TableCell>
                  <TableCell>
                    <Delete
                    sx={{color: 'red'}}
                    onClick={()=>deleteItem(ind)}
                    />
                  </TableCell>
              </TableRow>
              :
              null
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant='h3' mt={2}>
                    Items : {data.length}
            </Typography>

        </Grid>
        {
            discount != 0 && (
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant='h3' mt={2}>
                            Discount : {discount}
                    </Typography>

                </Grid>
            )
        }
        <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant='h3' mt={2}>
                    Total : {total}
            </Typography>

        </Grid>
        {
            discount !=0  && (
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant='h3' mt={2}>
                            After Discount : {total - discount}
                    </Typography>

                </Grid>
            )
        }
        {
            props.pay && (
                <Grid lg={8} md={8} sm={12} xs={12}>
                    <Box mt={2}>
                        <Input
                        placeholder="Money To Pay"
                        type="number"
                        onChange={pay}
                        />
                    </Box>
                </Grid>
            )
        }
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant='h3'>
                Return Product Price :- {returnProductPrice}
            </Typography>
        </Grid>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 515 }} aria-label="caption table">
        <TableHead>
          <TableRow  sx={{background: style.primary.main}} id="thead">
              <TableCell sx={{color:style.sidemenutext.color}}>Image</TableCell>
            {data &&
              Object.keys(data[0]).map((key) => (
                <TableCell key={key} sx={{color:style.sidemenutext.color}}>{key}</TableCell>
              ))}
                <TableCell sx={{color:style.sidemenutext.color}}>Quantity</TableCell>
                {
                  props.Discount ?
                  <TableCell sx={{color:style.sidemenutext.color}}>Discount</TableCell>
                  :
                  null
                }
                <TableCell sx={{color:style.sidemenutext.color}}>Per Pice</TableCell>
                <TableCell sx={{color:style.sidemenutext.color}}>Price</TableCell>
                <TableCell sx={{color:style.sidemenutext.color}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {
          props.data[data.length-1] != undefined &&
          data &&
            data.map((row, ind) => (
                row.Return > 0 ?
                
              <TableRow key={ind}>
                  <TableCell>
                    {
                         row.Return < 0
                    }
                    
                            <Box
                            component='img'
                            src={`${api.imageServer}${props.data[ind]?.Image}`}
                            sx={{
                                maxWidth: '50px',
                                maxHeight: '50px'
                            }}
                            >
                            </Box>
                        
                    
                  </TableCell>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                  <TableCell>
                    {/* {//console.log(props.data )} */}
                    {obj?.[ind].Return}
                  </TableCell>
                  {
                  props.Discount ?
                    <TableCell>
                          <Input
                              type="number"
                              // onChange={(e)=>handleInputChange(e ,  props.data[ind].Quantity , ind)}
                              onChange={(e)=>minusMoney(e.target.value , ind)}
                              defaultValue={0}
                              value={obj?.[ind].Discount}
                              inputProps={{ 
                                  // max: propss.data[ind].Quantity, // Set max limit for the input
                                  min: 0 // Optional: set a minimum limit if needed
                                }}
                          />
                    </TableCell>
                    :
                    null
                  }
                  <TableCell>{props.data?.[ind].Sell_Price}</TableCell>
                  <TableCell>
                    
                    {/* { obj?.[ind].price - obj?.[ind].Discount} */}
                    { obj?.[ind].price }
                  </TableCell>
                  <TableCell>
                    <Refresh
                    sx={{color: 'red'}}
                    onClick={()=>RefreshItem(ind)}
                    />
                  </TableCell>
              </TableRow>
              :
              null
            ))}
        </TableBody>
      </Table>
    </TableContainer>

        <Grid item lg={12} md={12} sm={12} xs={12}>
            <form onSubmit={submitFunc}>
                <Box mt={3}>
                    <CustomBtn
                    data="Returns Bill"
                    />

                </Box>

            </form>

        </Grid>

    </Grid>
    </>
  );
}

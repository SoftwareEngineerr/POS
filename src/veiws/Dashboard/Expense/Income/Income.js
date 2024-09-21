import React , { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import CustomForm from '../../../../components/form/form'
import { Main } from '../../../../constant'
import { CustomBtn } from '../../../../components/button/button'
import { Box, Grid, Typography } from '@mui/material'
import CustomTable from '../../../../components/table/SimpleTable'
import PageContainer from '../../../../components/Container/pageContainer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FullDate } from '../../../../components/Date/FullDate'
import { PostRequest } from '../../../../redux/actions/PostRequest'
import { useTheme } from '@emotion/react'
import SalesOverview from '../../Dashboard/components/SalesOverview'
import MonthlyEarnings from '../../Dashboard/components/MonthlyEarnings'
import ProductPerformance from '../../Dashboard/components/ProductPerformance'
import YearlyBreakup from '../../Dashboard/components/YearlyBreakup'

const Income = (props) => {
    const [data , setData ] = useState(Main().Income)
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const dispatch = useDispatch();
    const url = useSelector((state) => state.Api);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const theme = useTheme();
    const style = theme.palette;
    const [ serverData , setServerData ] = useState({
        data:''
    })
    const [inputValues, setInputValues] = useState({...initialInputValues });

      
          const fetchData = async (param1 , param2) => {
            const FromDate = new Date(param1);
            const newdate = `${FromDate.getFullYear()}-${FromDate.getMonth() + 1}-${FromDate.getDate()}`;
            console.log(newdate)
            

            // const payload = {...inputValues , ...Box(param1 ? {[param2]:newdate} : {})}
            const payload = { 
                ...inputValues,
                ...(param1 ? { [param2]: newdate } : {})
            };
            
            console.log(payload)
              try {
                  const response = await axios.post(url.income, payload, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${userToken}`,
                      },
                  });
      
                  if (response.status === 200) {
                    // setServerData(response.data.result);
                    console.log(response.data.result)
                    if(response.data.result != []){
                        console.log(response.data.result.FirstRow)
                        setServerData((prevValues) => ({
                            ...prevValues,
                            data: response.data.result,
                        }));
                    }
                  }
              } catch (error) {
                  console.error(error);
              }
          };
      


    const ChangeDate = (e , name) =>{
        console.log(e , name)
        const converterToDate = new Date(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]:  `${converterToDate.getFullYear()}-${converterToDate.getMonth() + 1}-${converterToDate.getDate()}`
    }));
    fetchData(e,name)
    }
      
        const icomefunc = (Name , Ammount) => {
        return {
            Name , Ammount
        }
    }

    const icomedata =[
        icomefunc('Fess','20000'),
        icomefunc('Fess','20000'),
    ]
  return (
      <PageContainer title={data.title} description={data.description}>


        <Box mt={3}>
                    <Grid container>
                        <CustomForm data={data.inputs}  ChangeDate={ChangeDate}  />            
                    </Grid>
                    {
                        serverData && serverData.data && serverData.data.length != 0 && (
                            <>
                                <YearlyBreakup percentage={serverData.data.SecondRow[0].percentage} getdate={inputValues} data={serverData.data.SecondRow[0]} total={serverData.data.FirstRow[4].Payment}  />
                                {/* <CustomForm data={serverData.veiwDonation} handleInputChange={handleInputChange} /> */}
                                {/* <CustomTable data={serverData.veiwDonation} /> */}
                                <Box mt={2}>
                                    <Typography variant='h4' mb={2}>
                                        Income  عاید
                                    </Typography>
                                    <CustomTable data={serverData.data.FirstRow} />
                                </Box>
                                {/* <Box mt={4}>
                                    <Typography variant='h4'  mb={2}>
                                        Expense  لګښت 
                                    </Typography>
                                    <CustomTable data={[serverData.data.SecondRow]} />
                                </Box>
                                <Box>
                                    <Typography variant='h4'  mt={2}>
                                        <Grid>
                                        <Typography variant='span' mr={1} sx={{color: style.error.main}}>
                                            Total Income    عواید
                                        </Typography>
                                        </Grid>
                                         
                                         <Grid>
                                            <Typography variant='span'  sx={{color: style.primary.main}}>
                                                {
                                                    serverData.data.ThirdRow.Income
                                                }
                                            </Typography>
                                         </Grid>
                                        
                                    </Typography>
                                </Box> */}
                                {/* <YearlyBreakup  /> */}
                            </>
                        )
                    }


        </Box>
            
         
    </PageContainer>
  )
}

Income.propTypes = {}

export default Income





// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { Date } from '../../../../components/Date/Date'
// import { FullDate } from '../../../../components/Date/FullDate'
// import { Box, Grid, Typography } from '@mui/material'
// import PageContainer from '../../../../components/Container/pageContainer'
// import { Main } from '../../../../constant'
// import CustomForm from '../../../../components/form/form'
// import CustomTable from '../../../../components/table/SimpleTable'
// import { useTheme } from '@emotion/react'
// import { useSelector } from 'react-redux'
// import axios from 'axios'

// const Income = props => {
//     const [ data , setData] = useState(Main().Income);
//     const [inputValues, setInputValues] = useState({});
//     const url = useSelector((state) => state.Api);
//     const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
//     const [ serverData , setServerData ] = useState()
    
//     const icomefunc = (Name , Ammount) => {
//         return {
//             Name , Ammount
//         }
//     }

//     const icomedata =[
//         icomefunc('Fess','20000'),
//         icomefunc('Fess','20000'),
//     ]
//     const theme = useTheme();
//     const style = theme.palette;
//     // income

//     const fetchData = async (param1 , param2) => {
//         const FromDate = new Date(param1);
//         const newdate = `${FromDate.getFullYear()}-${FromDate.getMonth() + 1}-${FromDate.getDate()}`;
//         console.log(newdate)
        

//         // const payload = {...inputValues , ...Box(param1 ? {[param2]:newdate} : {})}
//         const payload = { 
//             ...inputValues,
//             ...(param1 ? { [param2]: newdate } : {})
//         };
        
//         console.log(payload)
//           try {
//               const response = await axios.post(url.veiwexpense, payload, {
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authorization': `Bearer ${userToken}`,
//                   },
//               });
  
//               if (response.status === 200) {
//                 // setServerData(response.data.result);
//                 if(response.data.result != []){
//                     setServerData((prevValues) => ({
//                         ...prevValues,
//                         veiwDonation: response.data.result,
//                     }));
//                 }
//               }
//           } catch (error) {
//               console.error(error);
//           }
//       };
  

//       const getDate = (param)=>{
//         return new Date(param)
//       }
// const ChangeDate = (e , name) =>{
//     console.log(e , name)
//     const getdate = e;
//     console.log( getDate())
//         // const converterToDate = new Date(e)
//     //     setInputValues((prevValues) => ({
//     //         ...prevValues,
//     //         // [name]:  `${converterToDate.getFullYear()}-${converterToDate.getMonth() + 1}-${converterToDate.getDate()}`
//     // }));
//     // fetchData(e,name)
//     }
    
//   return (
//     <PageContainer title={data.title} description={data.description}>
//     <Box>
//         <Grid container>
//                 {/* <CustomForm data={data.inputs} ChangeDate={ChangeDate} /> */}
//                 <CustomForm data={data.inputs}  ChangeDate={ChangeDate}  />            

//         </Grid>
//     </Box>
//     <Box mt={2}>
//         <Typography variant='h4' mb={2}>
//             Income :-
//         </Typography>
//         <CustomTable data={icomedata} />
//     </Box>
//     <Box mt={4}>
//         <Typography variant='h4'  mb={2}>
//             OutGoing :-
//         </Typography>
//         <CustomTable data={icomedata} />
//     </Box>
//     <Box>
//         <Typography variant='h4'  mt={2}>
//             <Typography variant='span' mr={1} sx={{color: style.error.main}}>
//                 Grand Total :-
//             </Typography>
//             <Typography variant='span'  sx={{color: style.primary.main}}>
//                 20000
//             </Typography>
//         </Typography>
//     </Box>
//     </PageContainer>
//   )
// }

// Income.propTypes = {}

// export default Income
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import CustomForm from '../../../../components/form/form';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { PostRequest } from '../../../../redux/actions/PostRequest';
import { CustomBtn } from '../../../../components/button/button';

const Staticinputs = () => {
    const [data, setData] = useState([]);
    const url = useSelector((state) => state.Api.webroles);
    const assignroles = useSelector((state) => state.Api.assignroles);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const [getRoles, setGetRoles] = useState();
    const [inputValues, setInputValues] = useState();
    const [ ownRoles , setOwnRoles ] = useState()
    const veiwroles = useSelector((state)=>state.Api.veiwroles)
    const [selectvalue, setSelectvalue] = useState('');
    const dispatch = useDispatch();
    const [ rollNumber,setRollNumber] = useState()
    const [maininputs , setMaininputs] = useState({
    })
    const [ fees,setFees] = useState(false)
    const [ update , setUpdate ] = useState(0);
    const [getAllOptions,  setGetAllOptions] = useState({
        StudentReg: false, StudentReport: false,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                if (response.status === 200) {
                    setGetRoles(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [url, userToken]);

    //console.log(getRoles)
    const teachersuggestionurl = useSelector((state) => state.Api.teachersuggestion);
    const [teachersuggestionres ,setTeachersuggestionres] = useState()

    useEffect(() => {
  
      const teachersuggestion = async () => {
          try {
              const response = await axios.get(teachersuggestionurl, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userToken}`,
                  },
              });
  
              if (response.status === 200) {
                setTeachersuggestionres(response.data.message );
                //   fetchusermessage(inputValues)
  
              }
          } catch (error) {
              console.error(error);
          }
      };
      teachersuggestion()
  }, [url, userToken]);

    

    useEffect(() => {
        const generateData = () => {
            // console.log(studentReg+'--Reg')
            // console.log(studentRep+'--Rep')
            if (getRoles !== undefined) { //webRoles
                const resultData = [];
                // console.log(maininputs)
                resultData.length = 0;
                    //debugger


                    for (let key in getRoles) {
                        if (getRoles.hasOwnProperty(key)) {
                            // console.log(key + ': ' + getRoles[key]);
                            resultData.push(
                                {data:key, feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
                                {data: 'Yes', check: maininputs[key] == undefined || maininputs[key] == false  ? false : true, type: 'radio', name:key, required: true,  feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
                                {data: 'No', check: maininputs[key] == undefined  || maininputs[key] == false ? true : false, type: 'radio', name:key, required: true,  feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},
                                )
                        }
                    }

                setData(resultData);
                setInputValues(maininputs == '' ? resultData
                    .filter(item => item.feildtype !== 'label')
                    .reduce((acc, item) => {
                      acc[item.name] = '0';
                      return acc;
                    }, {})
                  :
                  (oldstate)=>({
                    ...oldstate
                  })
                );
                  
            }
        };

        generateData();
    //  console.log(data)
    }, [getRoles, ownRoles , update]);

    // useEffect(() => {
        const immediatelyfunc = async (getparams) => {
            const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
            
            try {
                const response = await axios.post(veiwroles,getparams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
    
                
                if (response.status === 200) {
                    setOwnRoles(response.data.message);
                    if(response.data.message != undefined){
                        setGetAllOptions();
                        const func = ()=>{
                            const staticdata = response.data.message;
                            if(staticdata != [] ){
                            for (let key in staticdata) {
                                if (staticdata.hasOwnProperty(key)) {
                                    // console.log(key + ': ' + staticdata[key]);
                                    setMaininputs((oldstate)=>({
                                                ...oldstate,
                                                ...{[key]:(staticdata[key] == undefined ) ? 0 : 1},
                                               
                                            })
                                    )
                                    setInputValues((oldstate)=>({
                                        ...oldstate,
                                        ...{[key]:(staticdata[key] == undefined ) ? 0 : 1},
                                       
                                    })
                            )
                                }
                            }
                            
                        }
                        }
                        func()
                            setUpdate((state)=>state+1)
                            // console.log(maininputs)
                    }
                   
                    const getlength = response.data.message;
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        // immediatelyfunc();
    // }, [data]);

    const handleChange = async(event) => {
        setSelectvalue(event.target.value);
        // setInputValues((prevValues) => ({
        //     ...prevValues,
        //     RollNum: event.target.value,
        // }));
         setRollNumber((prevValues) => ({
                ...prevValues,
                RollNum: event.target.value,
            }))
        const RollNum ={RollNum:event.target.value};
        setMaininputs('')
        setInputValues('')
        immediatelyfunc(RollNum)
        // console.log(rollNumber.RollNum)
      };
    function handleRadioChange(e) {
         console.log(e.target.name)
        const checker = e.target.placeholder == 'Yes' ? '1' : '0';
        const checkermain = e.target.placeholder == 'Yes' ? true : false;
        // console.log({[e.target.name]:checkermain})
        const func = () => {
            setMaininputs((oldstate)=>({
                ...oldstate,
                [e.target.name]: checkermain
            }))
        }
        func()
        setUpdate((state)=>state+1)

        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: checker,
        }));
        console.log(inputValues)
    }

    const submitfunc = (event)=>{
        event.preventDefault();
        console.log(inputValues);
        dispatch(PostRequest(`${assignroles}${selectvalue}`,userToken,inputValues))
    }

    return (
        <>
        <form onSubmit={submitfunc} style={{width:'100%'}}>
            <Grid container>
            {
                    teachersuggestionres ?
                    <Grid item lg={12}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Teacher کارمند</InputLabel>
                        <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectvalue}
                        label="Age"
                        onChange={handleChange}
                        >
                            {
                                teachersuggestionres &&(
                                teachersuggestionres.map((item , ind)=>
                                <MenuItem key={ind} value={item.roll}>{item.name}</MenuItem>
                                )
                                )
                            }
                        </Select>
                    </FormControl>
                    </Grid>
                        :
                        null
                }
                {
                    data != [] ?
                    <CustomForm data={data} handleRadioChange={handleRadioChange} />
                    :
                    null
                }
                <Grid item lg={12} md={12} xs={12} sm={12} mt={2}>
                    <CustomBtn data='Save  ثبت' />
                </Grid>
            </Grid>
        </form>

        </>
    );
};

export default Staticinputs;

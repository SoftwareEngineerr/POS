import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../input/input';
import { Box } from '@mui/material';

const SuggestionInput = (props) => {
    const [ focusData , setFocusData ] = useState(null);
    const boxRef = useRef(null);
    const [ FilterData , setFilterData ] = useState();
    console.log(FilterData)
    const [updatedValue, setUpdatedValue] = useState()

    function handleInputChange(e) {
        function isInteger(value) {
            const intValue = parseInt(value);
            return !isNaN(intValue) && intValue.toString() === value.toString();
          }
          function checkKeys(){
            return props.Suggestions.filter(item => 
                item.roll ?
                isInteger(e.target.value) ? item.roll.toString().includes(e.target.value) 
                :
                item.name.toString().toLowerCase().includes(e.target.value.toLowerCase())
                :
                item.name.toString().toLowerCase().includes(e.target.value.toLowerCase())
                )
          }
        setFilterData(checkKeys);
        setUpdatedValue(e.target.value)
        if(props.simple != 'true'){
            // props.handleInputChange(e);
        }
    }
    function getValue(getValue){

        const checker = () => {
            if(getValue.roll != undefined ){
                console.log(getValue.roll)
                let e = {
                    target:{
                        value:getValue.roll,
                        name:props.name
                    }
                };
                
                props.handleInputChange(e);
                    if(getValue.name){
                        if(props.simple == 'true'){
                            props.handleInputChange([props.name , getValue.roll]);
                        }
                        return getValue.roll+ ' , ' + getValue.name+ ' , ' + getValue.Name_P
                    }
                    else{
                       return getValue.roll
                    }
            }
            else{
                return  getValue.name;
            }
        }
        const getcheckedValue = checker();
        
        setUpdatedValue(getcheckedValue)
        setFocusData(false)
    }

    useEffect(() => {
        const handleMouseDown = (event) => {
          // Check if the next active element is outside the box
          if (boxRef.current && !boxRef.current.contains(event.target)) {
            setFocusData(false);
          }
        };
    
        document.addEventListener('mousedown', handleMouseDown);
    
        return () => {
          document.removeEventListener('mousedown', handleMouseDown);
        };
      }, []);

  return (
      <Box sx={{position: 'relative'}}
      
      >
         <Input
            onChange={handleInputChange}
            onFocus={() => setFocusData(true)}
            // onBlur={() => setFocusData(false)}
            sx={{ maxWidth: '556px' }}
            required
            name={props.name}
            placeholder={props.placeholder}
            value={updatedValue}
            autoComplete="off"
            />
               {
                    FilterData && focusData ?
                <Box id="suggestions" sx={{
                    position:'absolute',
                    width: '100%',
                    maxWidth: '556px',
                    boxShadow: '0px 5px 11px 0px #d7d7d7',
                    zIndex: '6',
                    background:'white',
                    maxHeight:'200px',
                    overflowY:'scroll'
                }}
                onBlur={() => setFocusData(false)}
                ref={boxRef}
                >
                    {FilterData.length >= 1 ?
                        
                            FilterData.map((item , ind)=>
                            <Box id='nextDiv'
                                onClick={getValue.bind(this, item) }  onChange={getValue.bind(this, item) }
                                key={ind}
                                 sx={{
                                padding:'10px',
                                zIndex: '6'
                                }} >
                                    {
                                        item.roll
                                        ?
                                        (
                                            item.roll  + ' , ' +  item.name + ' , ' +  item.Name_P

                                        )
                                        :
                                        (
                                            item.name
                                        )
                                    }
                            </Box>
                            )
                        
                        :
                            <Box sx={{
                                 padding:'10px',
                                 zIndex: '6'
                            }}>
                                No Results
                            </Box>
                    }
                </Box>
                :
                null
                }
    </Box>
  )
}

SuggestionInput.propTypes = {}

export default SuggestionInput
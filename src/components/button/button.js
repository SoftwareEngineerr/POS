import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const CustomBtn = (props) => {
  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      fullWidth
      type={props.type ? props.type : 'submit'}
      component={props.link ? Link : 'button'}
      to={props.link}
      sx={props.style || {}}
      title={props.title}
      onClick={props.click}
      disabled= {props.disable}
    >
      {props.data}
    </Button>
  );
};

CustomBtn.propTypes = {
  type: PropTypes.string,
  link: PropTypes.string,
  style: PropTypes.object,  // Ensure that style is expected to be an object
  title: PropTypes.string,
  click: PropTypes.func,
  data: PropTypes.string.isRequired,
};

// Example usage:
// <CustomBtn data="Click me" />

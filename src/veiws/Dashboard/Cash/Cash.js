import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../KhataBill/component/modal'

const Cash = (props) => {
    const [open, setOpen] = useState(false);
  return (
    <div>
        <Modal
            open={()=>setOpen(false)}
            // updateinfo={props.updateinfo}
            closepaymodal={(e)=>console.log(e)}
            updateinfo={(e)=>console.log(e)}
        />
    </div>
  )
}

Cash.propTypes = {}

export default Cash
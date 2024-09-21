import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { Link } from 'react-router-dom'

const ErrorPage = props => {
  return (
    <div className="main">
        <h1>404 Error Page</h1>
            <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p>
            <section className="error-container">
            <span className="four"><span className="screen-reader-text">4</span></span>
            <span className="zero"><span className="screen-reader-text">0</span></span>
            <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
            <Link to="/auth/login" className="more-link">Back to Login</Link>
        </div>
    </div>
  )
}

ErrorPage.propTypes = {}

export default ErrorPage
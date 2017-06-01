/**
 * Created by chotoxautinh on 6/1/17.
 */
import React from 'react';

export default () => (
    <div className="footer">
        <p>
            Love from <img src={process.env.PUBLIC_URL + "/img/logo.jpg"} alt="logo" className="logo"/>
        </p>
    </div>
)
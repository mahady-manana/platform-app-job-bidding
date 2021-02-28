import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Auth from '../../auth/auth.api';

const Dashbord = () => {
const [user, setUser] = useState({})
useEffect(() => {
    let cleanup = false;
    const user_id = Auth.isAuthenticated().user._id;
    const getUser = async () => {
        // const data = await axios.get()
    }
    return () => {
        cleanup = true;
    }
}, [])
return (
<>
<div className='user-dashbord type-freelancer'>
<div className="inner-content">
    <section className="section">
        <div className="inner-section">
            <div className="container">
                <div className="info_warn_promo">
                    <p>Here are some info, warning, promo and more in short line.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="section">
        <div className="inner-section">
            <div className="container">
                <div className="row row_two_col">
                    <div className="col-left col-sm-4">
                        <div className="col-inner">
                            Here some info of user
                        </div>
                    </div>
                    <div className="col-right col-sm-8">
                        <div className="inner-col">
                            <div className="header_job_list">
                                Some header of job list
                            </div>
                            <div className="body_job_list">
                                Here the jobs list display
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</div>
</>
)
}

export default Dashbord;


import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
return (
<div className='footer'>
<section className='main-footer section'>
    <div className='inner-section'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3'>
                    <div className='inner-col'>                        
                        <h3>We are ...</h3>
                        <div className='image-container'>
                            <img src='/images/logo.png' alt='Go Inside' style={{maxHeight : '80px'}}/>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo et distinctio omnis, 
                            perspiciatis labore sequi nemo dolorum molestias commodi cumqu </p>
                    </div>
                </div>
                <div className='col-sm-3'>
                    <div className='inner-col'>
                        <h3>Infos</h3>
                        <ul>
                            <li>
                                <Link to='#'>About us</Link>
                            </li>
                            <li>
                                <Link to='#'>Our Freelancer</Link>
                            </li>
                            <li>
                                <Link to='#'>Our Client</Link>
                            </li>
                            <li>
                                <Link to='#'>FAQ</Link>
                            </li>
                            <li>
                                <Link to='#'>Condition</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-sm-3'>
                    <div className='inner-col'>
                        <h3>Support & Help</h3>
                        <ul>
                            <li>
                                <Link to='#'>Client support</Link>
                            </li>
                            <li>
                                <Link to='#'>Freelancer help</Link>
                            </li>
                            <li>
                                <Link to='#'>Technical support</Link>
                            </li>
                            <li>
                                <Link to='#'>Site issues</Link>
                            </li>
                            <li>
                                <Link to='#'>Private </Link>
                            </li>
                        </ul>                        
                    </div>
                </div>
                <div className='col-sm-3'>
                    <div className='inner-col'>
                        <h3>Contact</h3>
                        <ul>
                            <li>
                                <Link to='#'>World Office</Link>
                            </li>
                            <li>
                                <Link to='#'>Antananarivo - Madagascar</Link>
                            </li>
                            <li>
                                <Link to='#'>Become Legend</Link>
                            </li>
                            <li>
                                <Link to='#'>+261 30 00 00 000</Link>
                            </li>
                            <li>
                                <Link to='#'>rm.mahady03@gmail.com</Link>
                            </li>
                        </ul>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section className='section copyright'>
    <div className='inner-section'>
        <div className='container'>
            <div className='text-copyright'>
                <div className='text-center'>
                 COPYRIGHT 2021 | Go-Inside | Website creation <a href='mailto:rm.mahady@gmail.com'>MAHADY MANANA</a>
                </div>
            </div>
        </div>
    </div>
</section>
</div>
)
}
export default Footer;
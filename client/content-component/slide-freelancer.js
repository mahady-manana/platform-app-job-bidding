import React, {useEffect, useRef, useState} from 'react';

const SlideFreelancer = () => {
const slideWrapper = useRef();

// const widthEl = slideWrapper.current.offsetWidth;
// const itemWidth = window.innerWidth / 6;
// console.log(widthEl/ 4)
 

return (
<>
<div className='mmd-slideshow' id='slidefreelancer'>
    <div className='slide-container'>
        <div className='slide-inner'>
            <div className='slide-items'>
                <div className='slide-wrapper' ref={slideWrapper}>
                    <ul className='items-show' id='slideitems'>
                        <li className='slide-item'>
                            <div className='slide-item-inner'>
                                <div className='images-slide'>
                                    <img src='/images/freelancer-slide.jpg' alt=''/>
                                </div>
                                <div className='slide-content'>
                                    <h3>Told Alcitease</h3>
                                    <p className='job-title'>Developer Reactjs</p>
                                    <p className='rating'>Rating :</p>
                                </div>
                            </div>
                        </li>
                        <li className='slide-item'>
                            <div className='slide-item-inner'>
                                <div className='images-slide'>
                                    <img src='/images/freelancer-slide.jpg' alt=''/>
                                </div>
                                <div className='slide-content'>
                                    <h3>Told Alcitease</h3>
                                    <p className='job-title'>Developer Reactjs</p>
                                    <p className='rating'>Rating :</p>
                                </div>
                            </div>
                        </li>
                        <li className='slide-item'>
                            <div className='slide-item-inner'>
                                <div className='images-slide'>
                                    <img src='/images/freelancer-slide.jpg' alt=''/>
                                </div>
                                <div className='slide-content'>
                                    <h3>Told Alcitease</h3>
                                    <p className='job-title'>Developer Reactjs</p>
                                    <p className='rating'>Rating :</p>
                                </div>
                            </div>
                        </li>
                        <li className='slide-item'>
                            <div className='slide-item-inner'>
                                <div className='images-slide'>
                                    <img src='/images/freelancer-slide.jpg' alt=''/>
                                </div>
                                <div className='slide-content'>
                                    <h3>Told Alcitease</h3>
                                    <p className='job-title'>Developer Reactjs</p>
                                    <p className='rating'>Rating :</p>
                                </div>
                            </div>
                        </li>
                        <li className='slide-item'>
                            <div className='slide-item-inner'>
                                <div className='images-slide'>
                                    <img src='/images/freelancer-slide.jpg' alt=''/>
                                </div>
                                <div className='slide-content'>
                                    <h3>Told Alcitease</h3>
                                    <p className='job-title'>Developer Reactjs</p>
                                    <p className='rating'>Rating :</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='slide-controller'>

            </div>
        </div>
    </div>
</div>
</>
)
}

export default SlideFreelancer;
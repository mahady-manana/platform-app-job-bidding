import React, {useState, useEffect} from "react";

export const Slide = () => {

const [index, setIndex] = useState(1);
// const [dur, setDur] = useState('');

const Prev = (event) => {
    event.preventDefault();
    // setDur('.5s');
    setIndex((prev) => prev === 0 ? 4 :  prev - 1);
};
const Next = (event) => {
    event.preventDefault();
    // setDur('.5s');
    console.log('ok')
    setIndex((prev) => (prev === 4 ? 0 : prev + 1));
};
useEffect(() => {
    const slider = document.getElementById('slider');
    slider.style.transform = `translate(${-index * 100}px,0,0)`
    slider.style.transition = '.5s'
}, [index]);    

return (
<>
<div className='homepage'>
        <section className='section top-section'>
            <div className='inner-section'>
                <div className='container'>
                    <div className="slider-wrapper">
                        <div className='slliders' id='slider'>
                            <div className="slide clone" style={{background: '#000'}}>
                                Slides 4
                            </div>
                            <div className="slide" style={{background: '#f00'}}>
                                Slides 1
                            </div>
                            <div className="slide" style={{background: '#000'}}>
                                Slides 2
                            </div>                            
                            <div className="slide" style={{background: '#f00'}}>
                                Slides 3
                            </div>
                            <div className="slide" style={{background: '#000'}}>
                                Slides 4
                            </div>
                            <div className="slide clone" style={{background: '#f00'}}>
                                Slides 1
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={Prev}>Prev</button>
                        <button onClick={Next}>Next</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</>
)
}
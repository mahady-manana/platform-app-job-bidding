import React from "react";
import SlideFreelancer from "./slide-freelancer";

const Homepage = () => {




return (
<>
<div className='homepage'>
    <div className='entry'>
        <section className='section top-section' style={{background : `url(/images/bghome.jpg)`}}>
            <div className='inner-section' style={{height : '81vh'}}>
                <div className='container'>
                    <div className='text-center'>
                        <h1 className='mc-3'>Go Inside</h1>
                        <h2 className='text-white'>Client-Talent Partnership</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elitn laborum!</p>
                        <button className='btn default-1'>Find Talented Freelancer</button>
                    </div>
                </div>
            </div>
        </section>
        <section className='section'>
            <div className='inner-section show-rond-image'>
                <div className='container image-globe-show'>
                    <div className='image-contaier image-center'>
                        <img src='/images/icon.png' alt='Go inside'/>
                    </div>
                    <div className='image-contaier image image1'>
                        <img src='/images/manolaptop.png' alt='Go inside'/>
                    </div>
                    <div className='image-contaier image image2'>
                        <img src='/images/coffe.png' alt='Go inside'/>
                    </div>
                    <div className='image-contaier image image3'>
                        <img src='/images/wolaptop.png' alt='Go inside'/>
                    </div>
                    <div className='image-contaier image image4'>
                        <img src='/images/woman.png' alt='Go inside'/>
                    </div>
                    <div className='image-contaier image image5'>
                        <img src='/images/woman2.png' alt='Go inside'/>
                    </div>
                    <div className='image-contaier image image6'>
                        <img src='/images/laptop.png' alt='Go inside'/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
</>
)
}
export default Homepage;
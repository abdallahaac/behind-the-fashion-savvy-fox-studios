import React,{ useRef }  from 'react';
import DisplayLink from '../components/DisplayLink';
import "../assets/styles/persona-page.css";
import NormalButton from '../components/NormalButton';
import redoIcon from '../assets/images/redo_icon.svg';
import downloadIcon from '../assets/images/download.svg';
import { useLocation } from 'react-router-dom';
import personaData from '../utils/PersonaData';
import Marquee from 'react-fast-marquee';
import LogoSVG from "../assets/images/logo.svg";
import { toPng } from 'html-to-image';

const PersonaPage = () => {
    const location = useLocation();
    const { personaType } = location.state;
    const personaRightSideRef = useRef(null);

    const {
        personaImage,
        personaName,
        personaDescription,
        pathTitle,
        displayLinkProps,
        displayLinkProps2,
        personaCardImage
    } = personaData[personaType];

    const handleDownload = () => {
        if (personaRightSideRef.current === null) {
            return;
        }

        toPng(personaRightSideRef.current)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${personaName}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.error('Failed to convert HTML to image', err);
            });
    };

    return (
        <div className="persona-container">
            {/* Marquee / Banner */}
			<header className="banner">
                {/* The marquee text */}
                <Marquee
                    gradient={false}
                    speed={30}
                    pauseOnHover={false}
                    className="marquee-center"
                >
                    &nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
                    // BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                    BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                    BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                    BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                    BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                </Marquee>

                {/* The clipped logo */}
                <img
                    src={LogoSVG}
                    alt="Logo"
                    className="superimposed-logo super-landing"
                />
            </header>
            <div className="persona-all">
                <div className="persona-left-side">
                    <div className="left-left">
                        <div className="persona-image-container">
                            <img src={personaImage} alt={personaName} className="persona-image" />
                        </div>
                        <div className="persona-info">
                            <p className="accent-4 brandDesc">YOUR BRAND IS A</p>
                            <h2 className="accent-1">{personaName}</h2>
                            <p className="body-text-medium">{personaDescription}</p>
                        </div>
                        <div className="replay-container">
                            <NormalButton
                                text="Replay Experience"
                                icon={redoIcon}
                                size={{ minWidth: "242px", minHeight: "56px" }}
                                active={true}
                                // disabled={selectedAnswer === null} // Disable if no answer is selected
                                // onClick={handleNext}
                            />
                        </div>
                        
                    </div>
                    
                    <div className = "additional-info ">
                        <div className="title-and-desc">
                            <h2 className="accent-3">{pathTitle}</h2>
                            <p className="body-text-medium">Resources and steps you can take to make an impact on the fashion industry</p>
                        </div>
                        
                        <div className='links-container'>
                            <DisplayLink {...displayLinkProps} />
                            <DisplayLink {...displayLinkProps2} />
                        </div>
                    
                    </div>
                </div>
                <div className="persona-right-side">
                    
                    <div className="persona-card-container" >
                      
                        {/* <img src={personaCardImage} alt={`${personaName} Card`} className="persona-card-image"ref={personaRightSideRef} /> */}

                        <div className="persona-card-to-download" ref={personaRightSideRef}>
                            <div className="persona-image-container" >
                                <img src={personaImage} alt={personaName} className="persona-image" id="download-img"/>
                                
                            </div>
                            
                            <div className="download-title-container">
                                <div className="download-vanguard">
                                    <img src={LogoSVG} alt={personaName} id="download-img"/>
                                </div>
                                <div className="result-text">
                                    <p className="accent-4 ">YOUR BRAND IS A</p>
                                    <h2 className="d-p-name accent-2">{personaName}</h2>
                                </div>
                                

                            </div>
                        </div>
                        <div className="replay-container">
                            <NormalButton
                                text="Save to Device"
                                icon={downloadIcon}
                                size={{ minWidth: "317px", minHeight: "56px" }}
                                active={true}
                                // disabled={selectedAnswer === null} // Disable if no answer is selected
                                onClick={handleDownload}
                                style={{ backgroundColor: 'white', color: 'black' }}
                            />

                        </div>
                        
                        {/* <button onClick={handleDownload} className="download-button">Save to Device</button> */}
                    </div>
                </div>
            </div>

            </div>

            
    );
};

export default PersonaPage;
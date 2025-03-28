import React,{ useRef, useEffect }  from 'react';
import { useNavigate } from "react-router-dom";
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
import HeartsUI from '../components/HeartsUI';
import BudgetBar from '../components/BudgetBar';

import ecoVanguard_pfp from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side.svg";
import wealthVanguard_pfp from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side.svg";
import ethicsVanguard_pfp from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side.svg";
import brand_mark from "../assets/images/FinalPersona/brand_mark.svg";


const PersonaPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("Location State:", location.state);

    const {
        brandName = "MYBRANDNAME",
        hearts = { eco: 5, ethics: 4, wealth: 3 },
        personaType = "ecoWarrior",
    } = location.state || {};

    const { eco, ethics, wealth } = hearts; 
    const personaRightSideRef = useRef(null);

    const {
        personaImage,
        whiteLogo,
        bg,
        personaName,
        personaDescription,
        pathTitle,
        displayLinkProps,
        displayLinkProps2,
        displayLinkProps3,
        displayLinkProps4,
        displayLinkProps5,
        displayLinkProps6,
        displayLinkProps7,
        personaCardImage,
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
    const handlePlayAgain = () => {
        navigate("/room"); // Navigate to /room
    };

    useEffect(() => {
        document.body.style.background = "#515151";
        return () => {
            document.body.style = "";
            document.documentElement.style = "";
        };
    }, []);

    return (
        <div className="persona-container">
            
            <div className="persona-all">
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
                <div className="persona-rs-ls">
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
                            <div className="replay-container" id="replay-exp">
                                <NormalButton
                                    text="Replay Experience"
                                    icon={redoIcon}
                                    size={{ minWidth: "275px", minHeight: "56px" }}
                                    active={true}
                                    onClick={handlePlayAgain}
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
                                <DisplayLink {...displayLinkProps3} />
                                <DisplayLink {...displayLinkProps4} />
                                <DisplayLink {...displayLinkProps5} />
                                <DisplayLink {...displayLinkProps6} />
                                <DisplayLink {...displayLinkProps7} />
                            </div>
                        
                        </div>
                    </div>
                    <div className="persona-right-side">
                        
                        <div className="persona-card-container" >
                        
                            {/* <img src={personaCardImage} alt={`${personaName} Card`} className="persona-card-image"ref={personaRightSideRef} /> */}

                            <div className="persona-card-to-download"
                                ref={personaRightSideRef}
                                style={{
                                    backgroundImage: `url(${bg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                <div className="persona-image-mini-container" >
                                    <img src={whiteLogo} alt={personaName} className="persona-image-mini" id="download-img"/>
                                    
                                </div>
                                
                                <div className="download-title-container">
                      
                                    <div className="result-text">
                                        <p className="body-text-small">
                                            <span className="text-gray">My Brand, </span>
                                            <span className="text-white-bold">{brandName}</span>
                                            <span className="text-gray"> is a</span>
                                        </p>
                                        <h2 className="d-p-name accent-2">{personaName}</h2>
                                        <p className="body-text-medium">{personaDescription}</p>
                                    </div>                                   
                                </div>
                                {/* Render HeartsUI components */}
                                <div className="download-hearts-ui-container">
                                    <div className="download-hearts-ui-row">
                                        <HeartsUI title="ECO VANGUARD" fillNumber={eco} imageSrc={ecoVanguard_pfp} />
                                        <HeartsUI title="WEALTH VANGUARD" fillNumber={wealth} imageSrc={wealthVanguard_pfp} />
                                    </div>
                                    {/* Second row */}
                                    <div className="download-hearts-ui-row">
                                        <HeartsUI title="ETHICS VANGUARD" fillNumber={ethics} imageSrc={ethicsVanguard_pfp} />
                                        <BudgetBar />
                                    </div>
                                </div>
                                <div className="brand-mark-container">
                                    <img
                                        src={brand_mark}
                                        alt="Brand Mark"
                                        className="brand-mark"
                                    />
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
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>

        </div>

            
    );
};

export default PersonaPage;
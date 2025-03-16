import React from 'react';
import DisplayLink from '../components/DisplayLink';
import "../assets/styles/persona-page.css";
import NormalButton from '../components/NormalButton';
import redoIcon from '../assets/images/redo_icon.svg';
import downloadIcon from '../assets/images/download.svg';

const PersonaPage = ({ 
    personaImage, 
    personaName, 
    personaDescription, 
    pathTitle, 
    displayLinkProps, 
    displayLinkProps2,
    personaCardImage 
}) => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = personaCardImage;
        link.download = `${personaName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="persona-container">
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
                    <h2 className="accent-3">{pathTitle}</h2>
                    <p className="body-text-medium">Resources and steps you can take to make an impact on the fashion industry</p>
                    <div className='links-container'>
                        <DisplayLink {...displayLinkProps} />
                        <DisplayLink {...displayLinkProps2} />
                    </div>
                
                </div>
            </div>
            <div className="persona-right-side">
                
                <div className="persona-card-container">
                    <img src={personaCardImage} alt={`${personaName} Card`} className="persona-card-image" />
                    <NormalButton
                        text="Save to Device"
                        icon={downloadIcon}
                        size={{ minWidth: "317px", minHeight: "56px" }}
                        active={true}
                        // disabled={selectedAnswer === null} // Disable if no answer is selected
                        onClick={handleDownload}
                        style={{ backgroundColor: 'white', color: 'black' }}
                />
                    {/* <button onClick={handleDownload} className="download-button">Save to Device</button> */}
                </div>
            </div>
        </div>
    );
};

export default PersonaPage;
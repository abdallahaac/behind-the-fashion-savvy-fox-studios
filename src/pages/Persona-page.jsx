import React, { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayLink from "../components/DisplayLink";
import "../assets/styles/persona-page.css";
import NormalButton from "../components/NormalButton";
import redoIcon from "../assets/images/redo_icon.svg";
import downloadIcon from "../assets/images/download.svg";
import { useLocation } from "react-router-dom";
import personaData from "../utils/PersonaData";
import Marquee from "react-fast-marquee";
import LogoSVG from "../assets/images/logo.svg";
import { toPng } from "html-to-image";
import { FundingContext } from "../utils/FundingContext";
import HeartsUI from "../components/HeartsUI";
import BudgetBar from "../components/BudgetBar";
import emailjs from "emailjs-com"; // Import EmailJS

import ecoVanguard_pfp from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side.svg";
import wealthVanguard_pfp from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side.svg";
import ethicsVanguard_pfp from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side.svg";
import brand_mark from "../assets/images/FinalPersona/brand_mark.svg";

const PersonaPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

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

    const [email, setEmail] = useState(""); // State to store the user's email
    const [isSending, setIsSending] = useState(false); // State to track sending status
    const [emailStatus, setEmailStatus] = useState("");

    const handleDownload = () => {
        if (personaRightSideRef.current === null) {
            return;
        }

        toPng(personaRightSideRef.current)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${personaName}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.error("Failed to convert HTML to image", err);
            });
    };

    const handlePlayAgain = () => {
        setFundingAmount(0);
        navigate("/room"); // Navigate to /room
    };

    const handleSendEmail = async () => {
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (personaRightSideRef.current === null) {
            alert("Failed to generate the image.");
            return;
        }
    
        try {
            setEmailStatus(""); 
            setIsSending(true); // Set sending status to true
    
            // Generate PNG with high resolution
            const dataUrl = await toPng(personaRightSideRef.current, {
                quality: 1.0, // Maximum quality
                pixelRatio: 3.0, // High resolution
            });
    
            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append("file", dataUrl); // Add the base64 image data
            formData.append("upload_preset", "Persona"); // Cloudinary upload preset name
    
            const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/dqanojvgv/image/upload", {
                method: "POST",
                body: formData,
            });
    
            if (!uploadResponse.ok) {
                const errorResponse = await uploadResponse.json();
                console.error("Cloudinary upload error:", errorResponse);
                alert(`Failed to upload image: ${errorResponse.error.message}`);
                return;
            }
    
            const uploadResult = await uploadResponse.json();
            const imageUrl = uploadResult.secure_url; // Get the uploaded image URL
    
    
            // Send the email using EmailJS
            const result = await emailjs.send(
                "service_935mvto", // My EmailJS Service ID
                "template_pkz478y", // My EmailJS Template ID
                {
                    to_email: email, // The recipient's email
                    image_url: imageUrl, // Pass the Cloudinary image URL
                    message: `Here is your persona card! You can view it here: ${imageUrl}`, // Optional message
                },
                "jU2daH-pQuoaSHN3l" // My EmailJS User ID
            );
    
            setEmailStatus("EMAIL SENT SUCCESSFULLY!"); // Update status on success
        } catch (error) {
            console.error("FAILED TO SEND EMAIL:", error);
        } finally {
            setIsSending(false); // Reset sending status
        }
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
                                />
                            </div>
                        </div>
                        <div className="additional-info">
                            <div className="title-and-desc">
                                <h2 className="accent-3">{pathTitle}</h2>
                                <p className="body-text-medium">
                                    Resources and steps you can take to make an impact on the fashion industry
                                </p>
                            </div>
                            <div className="links-container">
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
                        <div className="persona-card-container">
                            <div
                                className="persona-card-to-download"
                                ref={personaRightSideRef}
                                style={{
                                    backgroundImage: `url(${bg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            >
                                <div className="persona-image-mini-container">
                                    <img src={whiteLogo} alt={personaName} className="persona-image-mini" id="download-img" />
                                </div>
                                <div className="download-title-container">
                                    <div className="result-text">
                                        <p className="body-text-medium">
                                            <span className="text-gray">My Brand, </span>
                                            <span className="text-white-bold">{brandName.toUpperCase()}</span>
                                            <span className="text-gray"> is a</span>
                                        </p>
                                        <h2 className="d-p-name accent-2">{personaName}</h2>
                                        <p className="body-text-medium">{personaDescription}</p>
                                    </div>
                                </div>
                                <div className="download-hearts-ui-container">
                                    <div className="download-hearts-ui-row">
                                        <HeartsUI title="ECO VANGUARD" fillNumber={eco} imageSrc={ecoVanguard_pfp} />
                                        <HeartsUI title="WEALTH VANGUARD" fillNumber={wealth} imageSrc={wealthVanguard_pfp} />
                                    </div>
                                    <div className="download-hearts-ui-row">
                                        <HeartsUI title="ETHICS VANGUARD" fillNumber={ethics} imageSrc={ethicsVanguard_pfp} />
                                        <BudgetBar />
                                    </div>
                                </div>
                                <div className="brand-mark-container">
                                    <img src={brand_mark} alt="Brand Mark" className="brand-mark" />
                                </div>
                            </div>
                            {/* <div className="replay-container">
                                <NormalButton
                                    text="Save to Device"
                                    icon={downloadIcon}
                                    size={{ minWidth: "317px", minHeight: "56px" }}
                                    active={true}
                                    onClick={handleDownload}
                                    style={{ backgroundColor: "white", color: "black" }}
                                />
                            </div> */}
                            <div className="email-container">
                                <div className="email-top">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="email-input"
                                    />
                                    <button
                                        onClick={handleSendEmail}
                                        className="send-email-button"
                                        disabled={isSending}
                                    >
                                        {isSending ? "SENDING..." : "SEND"}
                                    </button>
                                </div>
                                
                                {/* Display the email status message */}
                                {emailStatus && (
                                    <p className={`email-status accent-3 ${emailStatus.includes("Failed") ? "error" : "success"}`}>
                                        {emailStatus}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonaPage;
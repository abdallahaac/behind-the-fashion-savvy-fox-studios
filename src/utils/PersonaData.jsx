// Link Images for DisplayLink component
import goodOnYou from "../assets/images/Links/good_on_you.png";
import ecoPfp from "../assets/images/FinalPersona/GreenGuardian.svg";
import moralPfp from "../assets/images/FinalPersona/MoralInnovator.svg";
import cashPfp from "../assets/images/FinalPersona/CashCow.svg";
import w_eco from "../assets/images/FinalPersona/White/GreenGuardian.svg";
import w_moral from "../assets/images/FinalPersona/White/MoralInnovator.svg";
import w_cash from "../assets/images/FinalPersona/White/CashCow.svg";
import bg_eco from "../assets/images/FinalPersona/greenChampionBg.svg";
import bg_moral from "../assets/images/FinalPersona/moralInnovatorBg.svg";
import bg_cash from "../assets/images/FinalPersona/cashCowBg.svg";

import testImg  from "../assets/images/FinalPersona/testGreenChampion.svg";
const personaData = {
    ecoWarrior: {
        personaImage: ecoPfp,
        whiteLogo: w_eco,
        bg: bg_eco,
        personaName: "Green Champion",
        personaDescription: "Your brand prioritizes sustainable business decisions, seeking to minimize waste and carbon footprints. ",
        pathTitle: "THE PATH TO SUSTAINABLE FASHION CONSUMPTION",
        displayLinkProps: {
            height: "192px",
            width: "410px",
            imageSrc: goodOnYou,
            linkImgSize: "160px",
            title: "Use a Fashion Brand Rater",
            link: "https://goodonyou.eco/",
            description: "Quickly search for a brand on Good on You and see it’s rating on the planet, people, and animals"
        },
        displayLinkProps2: {
            height: "192px",
            width: "410px",
            imageSrc: goodOnYou,
            linkImgSize: "160px",
            title: "Use a Fashion Brand Rater",
            link: "https://goodonyou.eco/",
            description: "Quickly search for a brand on Good on You and see it’s rating on the planet, people, and animals"
        },
        personaCardImage: testImg
    },
    moralInnovator: {
        personaImage: moralPfp,
        whiteLogo: w_moral,
        bg: bg_moral,
        personaName: "Moral Innovator",
        personaDescription: "Your brand prioritized ethical decisions that ensured fair wages and proper working conditions for your workers",
        pathTitle: "THE PATH TO GREEN FASHION CONSUMPTION",
        displayLinkProps: {
            height: "192px",
            width: "410px",
            imageSrc: goodOnYou,
            linkImgSize: "160px",
            title: "Learn About Green Practices",
            link: "https://goodonyou.eco/",
            description: "Discover how to implement green practices in your fashion brand."
        },
        displayLinkProps2: {
            height: "192px",
            width: "410px",
            imageSrc: goodOnYou,
            linkImgSize: "160px",
            title: "Use a Fashion Brand Rater",
            link: "https://goodonyou.eco/",
            description: "Quickly search for a brand on Good on You and see it’s rating on the planet, people, and animals"
        },
        personaCardImage: testImg
    },
    // Add more personas as needed
    cashCow: {
        personaImage: cashPfp,
        whiteLogo: w_cash,
        bg: bg_cash,
        personaName: "CA$H COW",
        personaDescription: "Your brand thrives on efficiency and maximizing value, providing the best value for customers while keeping an eye on profit margins. ",
        pathTitle: "THE PATH TO GREEN FASHION CONSUMPTION",
        displayLinkProps: {
            height: "192px",
            width: "410px",
            imageSrc: goodOnYou,
            linkImgSize: "160px",
            title: "Learn About Green Practices",
            link: "https://goodonyou.eco/",
            description: "Discover how to implement green practices in your fashion brand."
        },
        displayLinkProps2: {
            height: "192px",
            width: "410px",
            imageSrc: goodOnYou,
            linkImgSize: "160px",
            title: "Use a Fashion Brand Rater",
            link: "https://goodonyou.eco/",
            description: "Quickly search for a brand on Good on You and see it’s rating on the planet, people, and animals"
        },
        personaCardImage: testImg
    },
};

export default personaData;
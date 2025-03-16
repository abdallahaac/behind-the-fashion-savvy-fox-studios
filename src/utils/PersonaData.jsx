// Link Images for DisplayLink component
import goodOnYou from "../assets/images/Links/good_on_you.png";
import ecoPfp from "../assets/images/FinalPersona/GreenGuardian.svg";
import moralPfp from "../assets/images/FinalPersona/MoralInnovator.svg";
import cashPfp from "../assets/images/FinalPersona/CashCow.svg";

import testImg  from "../assets/images/FinalPersona/testGreenChampion.svg";
const personaData = {
    ecoWarrior: {
        personaImage: ecoPfp,
        personaName: "Eco Warrior",
        personaDescription: "You are dedicated to making environmentally friendly choices.",
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
        personaName: "Moral Innovator",
        personaDescription: "You are a leader in promoting green and sustainable practices.",
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
        personaName: "CA$H COW",
        personaDescription: "You are a leader in promoting green and sustainable practices.",
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
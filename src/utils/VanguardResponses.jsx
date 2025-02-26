// Import images for ecoVanguard
import eco_good from "../assets/images/Vanguards/Vanguard_Eco/Eco_Front_Love.svg";
import eco_neutral from "../assets/images/Vanguards/Vanguard_Eco/Eco_Front_Question.svg";
import eco_bad from "../assets/images/Vanguards/Vanguard_Eco/Eco_Front_Disapprove_ThumbsDown.svg";

// Import images for ethicsVanguard
import ethics_good from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Front_Love.svg";
import ethics_neutral from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Front_Question.svg";
import ethics_bad from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Front_Disapprove_ThumbsDown.svg";


// Import images for wealthVanguard
import wealth_good from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Front_Love.svg";
import wealth_neutral from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Front_Question.svg";
import wealth_bad from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Front_Disapprove_ThumbsDown.svg";

//Import images for the assistant bot 
import BotSvg from "../assets/images/tutorial-bot.svg";
import BotSvg2 from "../assets/images/BOTVG2.svg";
import BotSvg3 from "../assets/images/BOTSVG3.svg";
import BotSvg4 from "../assets/images/botsvg4.svg";

//Extra taken from old file for introduction and allVanguards Text 
import Funding from "../assets/images/funding.svg";
import Eco1 from "../assets/images/eco-1.svg";
import Eco2 from "../assets/images/eco-2.svg";

import Ethics1 from "../assets/images/Ethics-1.svg";

import Cap1 from "../assets/images/cap-1.svg";
import Cap2 from "../assets/images/cap-2.svg";

import { build } from "vite";

const assistantData = [
    {
    title:"ASSISTANT",
    introduction: [
            [
                {
                    description:"Hey there! Welcome to The Vault. I’m your assistant to guide and prepare you for your pitch to the Vanguards.",
                    img_path: BotSvg,
                },
                {
                    description:"As I guide you through each step, the Vanguards will evaluate your brand from every angle—ensure you're making the best choices for its success.",
                    img_path: BotSvg2,
                },
                {
                    description:"As I guide you through each step, the Vanguards will evaluate your brand from every angle—ensure you're making the best choices for its success.",
                    img_path: BotSvg3,
                },
                {
                    description:"Hint! Keep track of the Vanguard's sentiments about your brand and the total funds you've raised by checking the widgets at the top.",
                    img_path: BotSvg4,
                },
            ],
        ]

    }
];
const allVanguards = [
    {
        title:"THE VANGUARDS",
        buildBrand: [
        {
            description:
                "Your Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
            imgPath: Funding,
            funding: true,
        },
        {
            description:
                "Third Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
            image: Funding,
            funding: 100000,
        },
    ]

    }
];

const ecoVanguard = [
    {
        title: "Eco Vanguard",
        introduction: [
            {
                description:
                    "Hi, so glad you’re here! I’m the Vanguard that’s all about the environment...",
                image: Eco1,
            },
            {
                description:
                    "I've seen the destruction caused by greedy corporations. I’m not interested in empty promises of sustainability. Show me a brand that respects the planet and you'll have my attention.",
                image: Eco2,
            },
        ],
        fabricFeedback: {
            good: {
                img_path: eco_good,
                description: "Uses organic cotton and recycled materials effectively.",
                funding: 3000,
                hearts: 1,
            },
            neutral: {
                img_path: eco_neutral,
                description: "Some fabrics are sustainable, but others are not.",
                funding: 1000,
                hearts: 0,
            },
            bad: {
                img_path: eco_bad,
                description: "Relies heavily on synthetic materials with high environmental impact.",
                funding: 0,
                hearts: -2,
            },
        },
        manufacturingFeedback: {
            good: {
                img_path: eco_good,
                description: "Manufactured in facilities that prioritize fair labor practices.",
                funding: 4000,
                hearts: 1,
            },
            neutral: {
                img_path: eco_neutral,
                description: "Some transparency in manufacturing, but improvements are needed.",
                funding: 1500,
                hearts: 0,
            },
            bad: {
                img_path: eco_bad,
                description: "Manufacturing processes are not environmentally friendly.",
                funding: 0,
                hearts: -1,
            },
        },
    },
];

const ethicsVanguard = [
    {
        title: "Ethics Vanguard",
        introduction: [
            {
                description:
                    "Hello, pleasure to meet you! I’m the Ethics Vanguard... let me tell you what matters most to me.",
                img_path: Ethics1,
            },
            {
                description:
                    "Fashion has the power to spark change, but it’s built on the backs of labour and energy. I’m looking for a brand that values their workers. Prove your commitment to fairness, and I’ll help you reach the world. ",
                img_path: Ethics1,
            },
        ],
        collectionFeedback: {
            good: {
                img_path: ethics_good,
                description: "The collection is ethically produced with fair labor practices.",
                funding: 5000,
                hearts: 1,
            },
            neutral: {
                img_path: ethics_neutral,
                description: "The collection has some ethical elements but lacks consistency.",
                funding: 2000,
                hearts: 0,
            },
            bad: {
                img_path: ethics_bad,
                description: "The collection does not align with ethical practices.",
                funding: 0,
                hearts: -2,
            },
        },
        fabricFeedback: {
            good: {
                img_path: ethics_good,
                description: "Uses ethically sourced materials.",
                funding: 3000,
                hearts: 1,
            },
            neutral: {
                img_path: ethics_neutral,
                description: "Some materials are ethically sourced, but others are not.",
                funding: 1000,
                hearts: 0,
            },
            bad: {
                img_path: ethics_bad,
                description: "Relies heavily on unethically sourced materials.",
                funding: 0,
                hearts: -1,
            },
        },
        manufacturingFeedback: {
            good: {
                img_path: ethics_good,
                description: "Manufactured in facilities that prioritize fair labor practices.",
                funding: 4000,
                hearts: 1,
            },
            neutral: {
                img_path: ethics_neutral,
                description: "Some transparency in manufacturing, but improvements are needed.",
                funding: 1500,
                hearts: 0,
            },
            bad: {
                img_path: ethics_bad,
                description: "Manufacturing processes are not ethically sound.",
                funding: 0,
                hearts: -1,
            },
        },
    },
];

const wealthVanguard = [
    {
        title: "Wealth Vanguard",
        introduction: [
            {
                description:
                    "Howdy! I see we have a new applicant to our pitch office. Let me tell you a bit about myself...",
                img_path: Cap1,
            },
            {
                description:
                    "Let me be clear, I'm not here to save or coddle the planet, and I’m not interested in feel-good stories. Show me a brand that can dominate the market and rake in profits, and I’ll give you more money than you could have ever imagined.",
                img_path: Cap2,
            },
        ],
        
        collectionFeedback: {
            good: {
                img_path: wealth_good,
                description: "The collection is highly profitable and well-received.",
                funding: 7000,
                hearts: 1,
            },
            neutral: {
                img_path: wealth_neutral,
                description: "The collection has potential but needs better marketing.",
                funding: 3000,
                hearts: 0,
            },
            bad: {
                img_path: wealth_bad,
                description: "The collection is not profitable.",
                funding: 0,
                hearts: -2,
            },
        },
        fabricFeedback: {
            good: {
                img_path: wealth_good,
                description: "Uses cost-effective and popular materials.",
                funding: 4000,
                hearts: 2,
            },
            neutral: {
                img_path: wealth_neutral,
                description: "Some materials are cost-effective, but others are not.",
                funding: 1500,
                hearts: 0,
            },
            bad: {
                img_path: wealth_bad,
                description: "Relies heavily on expensive and unpopular materials.",
                funding: 0,
                hearts: -2,
            },
        },
        manufacturingFeedback: {
            good: {
                img_path: wealth_good,
                description: "Manufactured in cost-effective facilities.",
                funding: 5000,
                hearts: 1,
            },
            neutral: {
                img_path: wealth_neutral,
                description: "Manufacturing is somewhat cost-effective but can be improved.",
                funding: 2000,
                hearts: 0,
            },
            bad: {
                img_path: wealth_bad,
                description: "Manufacturing processes are not cost-effective.",
                funding: 0,
                hearts: -1,
            },
        },
    },
];

export { allVanguards, assistantData, ecoVanguard, ethicsVanguard, wealthVanguard };
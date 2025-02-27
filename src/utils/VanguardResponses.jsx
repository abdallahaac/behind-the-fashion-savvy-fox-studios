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
        brand: [
        {
            description:
                "Your Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
            img_path: Funding,
        },
        {
            description:
                "Third Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
            img_path: Funding,
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
                img_path: Eco1,
            },
            {
                description:
                    "I've seen the destruction caused by greedy corporations. I’m not interested in empty promises of sustainability. Show me a brand that respects the planet and you'll have my attention.",
                img_path: Eco2,
            },
        ],
        fabricFeedback: {
            good: {
                img_path: eco_good,
                description: "I’ve noticed that your brand uses fabrics that are more sustainable for our planet, and because of that, I’m raising our investment by $70K!",
                funding: 70000,
                hearts: 1,
            },
            neutral: {
                img_path: eco_neutral,
                description: "I’ve noticed the fabrics your brand uses are a mix of synthetic and natural fibers. I think it’s a good start but I want to see more commitment to the environment.",
                funding: 45000,
                hearts: 0,
            },
            bad: {
                img_path: eco_bad,
                description: "I am not liking the heavy use of synthetic fibres. They have a huge environmental impact and will not break down over time.",
                funding: -20000,
                hearts: -2,
            },
        },
        manufacturingFeedback: {
            good: {
                img_path: eco_good,
                description: "I’m impressed at your brand’s manufacturer. Clean energy and reducing waste are top things to consider for sustainability.",
                // funding: 4000,
                hearts: 1,
            },
            neutral: {
                img_path: eco_neutral,
                description: "Although the factory you selected isn’t the worst, there are many opportunities for improvement in adopting sustainable practices.",
                funding: 45000,
                hearts: 0,
            },
            bad: {
                img_path: eco_bad,
                description: "Your factory follows harmful practices that significantly impact the environment. Improving them is crucial to reducing the factory’s carbon footprint and overall ecological damage.",
                funding: -20000,
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
                description: "I like your commitment to paying designers for original work.",
                funding: 120000,
                hearts: 1,
            },
            neutral: {
                img_path: ethics_neutral,
                description: "I see a mix of original and plagiarized designs in your brand. Going forward, I’d like to see more ethical decisions.",
                funding: 50000,
                hearts: 0,
            },
            bad: {
                img_path: ethics_bad,
                description: "It seems like your collection uses a lot of plagiarized work... it makes me hesitant to invest.",
                funding: -10000,
                hearts: -2,
            },
        },
        fabricFeedback: {
            good: {
                img_path: ethics_good,
                description: "The fabrics that you chose for your brand have been sourced with ethical practices in mind. This makes me extremely happy to see!",
                funding: 75000,
                hearts: 2,
            },
            neutral: {
                img_path: ethics_neutral,
                description: "Some of your fabrics have been sourced with ethical practices in mind. This is a good start but more needs to be done.",
                funding: 40000,
                hearts: 0,
            },
            bad: {
                img_path: ethics_bad,
                description: "The fabrics you've chosen are often sourced from places with poor ethical practices, treating workers with little regard for well-being or dignity.",
                funding: -20000,
                hearts: -2,
            },
        },
        manufacturingFeedback: {
            good: {
                img_path: ethics_good,
                description: "I’m glad to see your factory has been regularly audited and follows ethical working standards for their employers.\nHappy Employees = Happy Company!",
                // funding: 4000,
                hearts: 1,
            },
            neutral: {
                img_path: ethics_neutral,
                description: "Well, your factory meets basic ethical working standards. There is room for improvement as striving for higher ethical practices contribute to a more responsible supply chain.",
                funding: 40000,
                hearts: 0,
            },
            bad: {
                img_path: ethics_bad,
                description: "Unfortunately, the factory you’ve chosen has significant issues with ethical practices. These concerns raise serious questions about the treatment of your employees.",
                funding: -20000,
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
                description: "These designs look awesome! I can see lots of people wanting to purchase these!",
                funding: 90000,
                hearts: 1,
            },
            neutral: {
                img_path: wealth_neutral,
                description: "The collection has potential but needs better marketing.",
                funding: 55000,
                hearts: 0,
            },
            bad: {
                img_path: wealth_bad,
                description: "The collection is not profitable.",
                funding: -10000,
                hearts: -2,
            },
        },
        fabricFeedback: {
            good: {
                img_path: wealth_good,
                description: "I like seeing a brand that can balance sustainable fabrics, but still considers cost and profits. I think that there’s lots of potential for growth!",
                funding: 60000,
                hearts: 2,
            },
            neutral: {
                img_path: wealth_neutral,
                description: "Profits profits profits - that’s what I like to see. However, the use of low quality materials may not resonate with consumers ...keep that in mind",
                funding: 20000,
                hearts: 0,
            },
            bad: {
                img_path: wealth_bad,
                description: "All these expensive fabrics...I know for a fact there are cheaper alternatives available. Who cares if these synthetic fabrics are made of oil - it’s coming out of your own pocket!---",
                funding: -20000,
                hearts: -2,
            },
        },
        manufacturingFeedback: {
            good: {
                img_path: wealth_good,
                description: "It’s nice to see your factory is up to standards. Prevents the risk of lawsuits and controversy surrounding your brand.",
                // funding: 5000,
                hearts: 1,
            },
            neutral: {
                img_path: wealth_neutral,
                description: "I know for a fact that there are more cost-effective factories in our world. You could produce the same thing for a fraction of the cost!",
                funding: 20000,
                hearts: 0,
            },
            bad: {
                img_path: wealth_bad,
                description: "Now this factory is RIDDEN with red flags. I’m concerned about potential public controversy if something comes out in the news...",
                funding: -20000,
                hearts: -1,
            },
        },
    },
];

export { allVanguards, assistantData, ecoVanguard, ethicsVanguard, wealthVanguard };
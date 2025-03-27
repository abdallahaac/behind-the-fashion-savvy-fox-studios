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

//Import images for finalPersonas
import wealthPersona from "../assets/images/FinalPersona/CashCow.svg";
import ecoPersona from "../assets/images/FinalPersona/GreenGuardian.svg";
import ethicsPersona from "../assets/images/FinalPersona/MoralInnovator.svg";

import allVanguardsHappy from "../assets/images/Vanguards/allVanguards_happy.svg";
import allVanguardsThumbsUp from "../assets/images/Vanguards/allVanguards_thumbsUp.svg";

//Extra taken from old file for introduction and allVanguards Text
import Funding from "../assets/images/funding.svg";
import Eco1 from "../assets/images/eco-1.svg";
import Eco2 from "../assets/images/eco-2.svg";

import Ethics1 from "../assets/images/Ethics-1.svg";

import Cap1 from "../assets/images/cap-1.svg";
import Cap2 from "../assets/images/cap-2.svg";

const assistantData = [
	{
		title: "ASSISTANT",
		introduction: [
			[
				{
					description:
						"Hey there! Welcome to The Vault. I’m your assistant to guide and prepare you for your pitch to the Vanguards.",
					img_path: BotSvg,
					soundRef: "robotSound1Ref",
				},
				{
					description:
						"As I guide you through each step, the Vanguards will evaluate your brand from every angle—ensure you're making the best choices for its success.",
					img_path: BotSvg2,
				},
				{
					description:
						"The Vanguards will be offering feedback as you make decisions for your brand. Click on their avatar to see what they have to say.",
					img_path: BotSvg3,
				},
				{
					description:
						"Hint! Keep track of the Vanguard's sentiments about your brand and the total funds you've raised by checking the widgets at the top.",
					img_path: BotSvg4,
				},
			],
		],

		finalFeedback: [
			{
				description:
					"And now ... the moment we’ve all been waiting for. It’s time to find out how much The Vanguards are going to invest into your brand",
				img_path: BotSvg,
			},
		],
	},
];
const allVanguards = [
	{
		title: "THE VANGUARDS",
		brand: [
			{
				description:
					"Your brand is looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
				img_path: allVanguardsThumbsUp,
				funding: 100000,
				soundRef: "moneySoundRef",
			},
		],
		finalPersonaEco: [
			[
				{
					assignment:
						"The choices you made have shaped your brand’s identity as:",
					persona_title: "THE GREEN GUARDIAN",
					img_path: ecoPersona,
				},
				{
					description:
						"As we’re sure you’ve figured out, running a business that is profitable, ethical, and good for the planet is a tough balancing act.\n\n You may be wondering...how does any clothing brand navigate these factors successfully?",
					img_path: allVanguardsHappy,
				},
				{
					description:
						"B-Corp certified brands are businesses that have met rigorous standards for social and environmental performance, accountability, and transparency.",
					link: "https://bcorporation.com.au/blog/how-b-corps-are-making-the-future-of-fashion-traceable-and-transparent/",
					img_path: allVanguardsHappy,
				},
				{
					description:
						"As you leave The Vault, be sure to keep into consideration everything that goes into a clothing brand in order to contribute to a better, cleaner planet for all!",
					img_path: allVanguardsThumbsUp,
				},
			],
		],
		finalPersonaEthics: [
			[
				{
					assignment:
						"The choices you made have shaped your brand’s identity as:",
					persona_title: "THE MORAL INNOVATOR",
					img_path: ethicsPersona,
				},
				{
					description:
						"As we’re sure you’ve figured out, running a business that is profitable, ethical, and good for the planet is a tough balancing act.\n\n You may be wondering...how does any clothing brand navigate these factors successfully?",
					img_path: allVanguardsHappy,
				},
				{
					description:
						"B-Corp certified brands are businesses that have met rigorous standards for social and environmental performance, accountability, and transparency.",
					link: "https://bcorporation.com.au/blog/how-b-corps-are-making-the-future-of-fashion-traceable-and-transparent/",
					img_path: allVanguardsHappy,
				},
				{
					description:
						"As you leave The Vault, be sure to keep into consideration everything that goes into a clothing brand in order to contribute to a better, cleaner planet for all!",
					img_path: allVanguardsThumbsUp,
				},
			],
		],
		finalPersonaWealth: [
			[
				{
					assignment:
						"The choices you made have shaped your brand’s identity as:",
					persona_title: "THE CASH COW",
					img_path: wealthPersona,
				},
				{
					description:
						"As we’re sure you’ve figured out, running a business that is profitable, ethical, and good for the planet is a tough balancing act.\n\n You may be wondering...how does any clothing brand navigate these factors successfully?",
					img_path: allVanguardsHappy,
				},
				{
					description:
						"B-Corp certified brands are businesses that have met rigorous standards for social and environmental performance, accountability, and transparency.",
					link: "https://bcorporation.com.au/blog/how-b-corps-are-making-the-future-of-fashion-traceable-and-transparent/",
					img_path: allVanguardsHappy,
				},
				{
					description:
						"As you leave The Vault, be sure to keep into consideration everything that goes into a clothing brand in order to contribute to a better, cleaner planet for all!",
					img_path: allVanguardsThumbsUp,
				},
			],
		],
    finalPersonaVanguardVisionary: [
        [
            {
                assignment:"The choices you made have shaped your brand’s identity as:",
                persona_title:"THE VANGUARD VISIONARY",
                img_path: wealthPersona,
            },
            {
                description:"As we’re sure you’ve figured out, running a business that is profitable, ethical, and good for the planet is a tough balancing act.\n\n You may be wondering...how does any clothing brand navigate these factors successfully?",
                img_path: allVanguardsHappy,
            },
            {
                description:"B-Corp certified brands are businesses that have met rigorous standards for social and environmental performance, accountability, and transparency.",
                link:"https://bcorporation.com.au/blog/how-b-corps-are-making-the-future-of-fashion-traceable-and-transparent/",
                img_path: allVanguardsHappy,
            },
            {
                description:"As you leave The Vault, be sure to keep into consideration everything that goes into a clothing brand in order to contribute to a better, cleaner planet for all!",
                img_path: allVanguardsThumbsUp,
            },
        ],
    ],
	},
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
				description:
					"I’ve noticed that your brand uses fabrics that are more sustainable for our planet, and because of that, I’m raising our investment by $70K!",
				funding: 70000,
				hearts: 1,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: eco_neutral,
				description:
					"I’ve noticed the fabrics your brand uses are a mix of synthetic and natural fibers. I think it’s a good start but I want to see more commitment to the environment.",
				funding: 45000,
				hearts: 0,
				soundRef: "environmentNeutralRef",
			},
			bad: {
				img_path: eco_bad,
				description:
					"I am not liking the heavy use of synthetic fibres. They have a huge environmental impact and will not break down over time.",
				funding: -20000,
				hearts: -2,
				soundRef: "environmentBadRef",
			},
		},
		manufacturingFeedback: {
			good: {
				img_path: eco_good,
				description:
					"I’m impressed at your brand’s manufacturer. Clean energy and reducing waste are top things to consider for sustainability.",
				// funding: 4000,
				hearts: 1,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: eco_neutral,
				description:
					"Although the factory you selected isn’t the worst, there are many opportunities for improvement in adopting sustainable practices.",
				// funding: 45000,
				hearts: 0,
				soundRef: "environmentNeutralRef",
			},
			bad: {
				img_path: eco_bad,
				description:
					"Your factory follows harmful practices that significantly impact the environment. Improving them is crucial to reducing the factory’s carbon footprint and overall ecological damage.",
				// funding: -20000,
				hearts: -1,
				soundRef: "environmentBadRef",
			},
		},
		finalFeedback: {
			good: {
				img_path: eco_good,
				description:
					"I’m impressed by your commitment to a brand that is good for the planet. As such, today I am willing to invest $10 Million into the business!",
				funding: 10000000,
				fundTitle: "$10 MILLION",
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: eco_neutral,
				description:
					"I can see some effort to bring in sustainable practices into your brand. I will start with a $3 Million investment but there needs to be a commitment to improve going forward.",
				funding: 3000000,
				fundTitle: "$3 MILLION",
			},
			bad: {
				img_path: eco_bad,
				description:
					"I have seen a poor commitment to the environment from your brand. Unfortunately, I will pass from investing today.",
				funding: 0,
				fundTitle: "NO INVESTMENT",
				soundRef: "environmentBadRef",
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
				description:
					"I’m loving how your brand chose to prioritize designs that compensate designers properly. I’m going to increase your investment by $120K. ",
				funding: 120000,
				hearts: 1,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: ethics_neutral,
				description:
					"I see a mix of original and plagiarized designs in your brand. Going forward, I’d like to see more ethical decisions.",
				funding: 50000,
				hearts: 0,
				soundRef: "ethicsNeutralRef",
			},
			bad: {
				img_path: ethics_bad,
				description:
					"I don’t like how much stolen work I see in your collection. It’s unethical and risks your brand to legal action. I’m going to reduce our investment by $10K.",
				funding: -10000,
				hearts: -2,
				soundRef: "ethicsBadRef",
			},
		},
		fabricFeedback: {
			good: {
				img_path: ethics_good,
				description:
					"The fabrics that you chose for your brand have been sourced with ethical practices in mind. This makes me extremely happy to see!",
				funding: 75000,
				hearts: 2,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: ethics_neutral,
				description:
					"Some of your fabrics have been sourced with ethical practices in mind. This is a good start but more needs to be done.",
				funding: 40000,
				hearts: 0,
				soundRef: "ethicsNeutralRef",
			},
			bad: {
				img_path: ethics_bad,
				description:
					"The fabrics you've chosen are often sourced from places with poor ethical practices, treating workers with little regard for well-being or dignity.",
				funding: -20000,
				hearts: -2,
				soundRef: "ethicsBadRef",
			},
		},
		manufacturingFeedback: {
			good: {
				img_path: ethics_good,
				description:
					"I’m glad to see your factory has been regularly audited and follows ethical working standards for their employers.\nHappy Employees = Happy Company!",
				// funding: 4000,
				hearts: 1,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: ethics_neutral,
				description:
					"Well, your factory meets basic ethical working standards. There is room for improvement as striving for higher ethical practices contribute to a more responsible supply chain.",
				// funding: 40000,
				hearts: 0,
				soundRef: "ethicsNeutralRef",
			},
			bad: {
				img_path: ethics_bad,
				description:
					"Unfortunately, the factory you’ve chosen has significant issues with ethical practices. These concerns raise serious questions about the treatment of your employees.",
				// funding: -20000,
				hearts: -1,
				soundRef: "ethicsBadRef",
			},
		},
		finalFeedback: {
			good: {
				img_path: ethics_good,
				description:
					"I’ve seen your clear commitment to ethical and fair business practices. I am all in your brand and would like to invest $10 Million.",
				funding: 10000000,
				fundTitle: "$10 MILLION",
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: ethics_neutral,
				description:
					"I see the steps you're taking to incorporate ethical practices into your brand. I'm ready to invest $3 million, but it’s crucial that there is a strong commitment to further improvement.",
				funding: 3000000,
				fundTitle: "$3 MILLION",
			},
			bad: {
				img_path: ethics_bad,
				description:
					"I cannot in good conscience invest in a brand that makes business decisions that are harmful for workers involved. It’s a no from me today.",
				funding: 0,
				fundTitle: "NO INVESTMENT",
				soundRef: "ethicsBadRef",
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
				description:
					"Your cheap designs will allow your collection to be accessible to the public. I’m going to increase your investment by $90K. ",
				funding: 90000,
				hearts: 1,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: wealth_neutral,
				description:
					"The costs of your designs...it’s a good start. You need to think of how these costs get passed onto the consumer. AKA can’t spend too much!",
				funding: 55000,
				hearts: 0,
				soundRef: "wealthNeutralRef",
			},
			bad: {
				img_path: wealth_bad,
				description:
					"These clothes are too costly! Consumer’s aren’t going to be able to afford this. I’m afraid I’ll have to reduce our investment by $10K.",
				funding: -10000,
				hearts: -2,
				soundRef: "wealthBadRef",
			},
		},
		fabricFeedback: {
			good: {
				img_path: wealth_good,
				description:
					"I like seeing a brand that can balance sustainable fabrics, but still considers cost and profits. I think that there’s lots of potential for growth!",
				funding: 60000,
				hearts: 2,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: wealth_neutral,
				description:
					"Profits profits profits - that’s what I like to see. However, the use of low quality materials may not resonate with consumers ...keep that in mind",
				funding: 20000,
				hearts: 0,
				soundRef: "wealthNeutralRef",
			},
			bad: {
				img_path: wealth_bad,
				description:
					"All these expensive fabrics...I know for a fact there are cheaper alternatives available. Who cares if these synthetic fabrics are made of oil - it’s coming out of your own pocket!",
				funding: -20000,
				hearts: -2,
				soundRef: "wealthBadRef",
			},
		},
		manufacturingFeedback: {
			good: {
				img_path: wealth_good,
				description:
					"It’s nice to see your factory is up to standards. Prevents the risk of lawsuits and controversy surrounding your brand.",
				// funding: 5000,
				hearts: 1,
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: wealth_neutral,
				description:
					"I know for a fact that there are more cost-effective factories in our world. You could produce the same thing for a fraction of the cost!",
				//funding: 20000,
				hearts: 0,
				soundRef: "wealthNeutralRef",
			},
			bad: {
				img_path: wealth_bad,
				description:
					"Now this factory is RIDDEN with red flags. I’m concerned about potential public controversy if something comes out in the news...",
				// funding: -20000,
				hearts: -1,
				soundRef: "wealthBadRef",
			},
		},
		finalFeedback: {
			good: {
				img_path: wealth_good,
				description:
					"I see significant potential for profit in your brand. Today, I’d like to invest $3 million into your clothing business.",
				funding: 3000000,
				fundTitle: "$3 MILLION",
				soundRef: "moneySoundRef",
			},
			neutral: {
				img_path: wealth_neutral,
				description:
					"Your brand clearly supports practices that are good for the society and our planet. Clearly, there’s demand for your products from consumers.",
				funding: 1000000,
				fundTitle: "$1 MILLION",
			},
			bad: {
				img_path: wealth_bad,
				description:
					"The brand you created does not optimize profits over all. I don’t see how I will make much money off of your brand, so I will not be supporting you.",
				funding: 0,
				fundTitle: "NO INVESTMENT",
				soundRef: "wealthBadRef",
			},
		},
	},
];

export {
	allVanguards,
	assistantData,
	ecoVanguard,
	ethicsVanguard,
	wealthVanguard,
};

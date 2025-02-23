import BotSvg from "../assets/images/tutorial-bot.svg";
import BotSvg2 from "../assets/images/BOTVG2.svg";
import BotSvg3 from "../assets/images/BOTSVG3.svg";
import BotSvg4 from "../assets/images/botsvg4.svg";

import Eco1 from "../assets/images/eco-1.svg";
import Eco2 from "../assets/images/eco-2.svg";

import Ethics1 from "../assets/images/Ethics-1.svg";

import Cap1 from "../assets/images/cap-1.svg";
import Cap2 from "../assets/images/cap-2.svg";

import Funding from "../assets/images/funding.svg";

const vanguardContents = {
	// Vanguard 0: "Exo"
	0: {
		scenarios: [
			// First activation
			[
				{
					title: "ASSISTANT",
					description:
						"Hey there! Welcome to The Vault. I’m your assistant to guide and prepare you for your pitch to the Vanguards.",
					image: BotSvg,
				},
				{
					title: "ASSISTANT",
					description:
						"As I guide you through each step, the Vanguards will evaluate your brand from every angle—ensure you're making the best choices for its success.",
					image: BotSvg2,
				},
				{
					title: "ASSISTANT",
					description:
						"As I guide you through each step, the Vanguards will evaluate your brand from every angle—ensure you're making the best choices for its success.",
					image: BotSvg3,
				},
				{
					title: "ASSISTANT",
					description:
						"Hint! Keep track of the Vanguard's sentiments about your brand and the total funds you've raised by checking the widgets at the top.",
					image: BotSvg4,
				},
			],
			// Second activation
			[
				{
					title: "THE VANGUARDS",
					description:
						"Your Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
					image: Funding,
					funding: true,
				},
			],
			[
				{
					title: "THE VANGUARDS",
					description:
						"Your Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
					image: BotSvg,
				},
				{
					title: "THE VANGUARDS",
					description:
						"Your Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
					image: BotSvg,
				},
			],
		],
	},

	// Vanguard 1: "Sustainable"
	1: {
		scenarios: [
			[
				{
					title: "ECO VANGUARD",
					description:
						"Hi, so glad you’re here! I’m the Vanguard that’s all about the environment...",
					image: Eco1,
				},
				{
					title: "ECO VANGUARD",
					description:
						"I've seen the destruction caused by greedy corporations. I’m not interested in empty promises of sustainability. Show me a brand that respects the planet and you'll have my attention.",
					image: Eco2,
				},
			],
			[
				{
					title: "SUSTAINABLE (Round 2)",
					description: "Back again? Let’s see if you stayed eco-friendly.",
					image: BotSvg,
				},
			],
		],
	},

	// Vanguard 2: "Another Vanguard"
	2: {
		scenarios: [
			[
				{
					title: "ETHICS VANGUARD",
					description:
						"Hello, pleasure to meet you! I’m the Ethics Vanguard... let me tell you what matters most to me.",
					image: Ethics1,
				},
				{
					title: "ETHICS VANGUARD",
					description:
						"Fashion has the power to spark change, but it’s built on the backs of labour and energy. I’m looking for a brand that values their workers. Prove your commitment to fairness, and I’ll help you reach the world. ",
					image: Ethics1,
				},
			],
			[
				{
					title: "ANOTHER_VANGUARD (Round 2)",
					description: "Second-time dialogue here...",
					image: BotSvg,
				},
			],
		],
	},

	// Vanguard 3: "Capitalist"
	3: {
		scenarios: [
			[
				{
					title: "WEALTH VANGUARD",
					description:
						"Howdy! I see we have a new applicant to our pitch office. Let me tell you a bit about myself...",
					image: Cap1,
				},
				{
					title: "WEALTH VANGUARD",
					description:
						"Let me be clear, I'm not here to save or coddle the planet, and I’m not interested in feel-good stories. Show me a brand that can dominate the market and rake in profits, and I’ll give you more money than you could have ever imagined.",
					image: Cap2,
				},
			],
			[
				{
					title: "CAPITALIST (Round 2)",
					description:
						"Back so soon? We hope your brand’s margins have improved.",
					image: BotSvg,
				},
			],
		],
	},
};

export default vanguardContents;

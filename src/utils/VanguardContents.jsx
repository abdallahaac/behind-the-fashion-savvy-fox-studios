import BotSvg from "../assets/images/tutorial-bot.svg";

const vanguardContents = {
	// Vanguard 0: "Exo"
	0: {
		scenarios: [
			// First activation
			[
				{
					title: "EXO",
					description:
						"Greetings from EXO. We focus on cutting-edge expansions. Let’s see how your brand can scale interplanetary!",
					image: BotSvg,
				},
				{
					title: "EXO",
					description: "Remember: bold moves impress us the most!",
					image: BotSvg,
				},
			],
			// Second activation
			[
				{
					title: "THE VANGUARDS",
					description:
						"Your Brand is Looking interesting...how about this? We'll kickstart things with a $100k grant and you show me what your brand's style looks like!",
					image: BotSvg,
					funding: true,
				},
				{
					title: "EXO",
					description: "Remember: bold moves impress us the most!",
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
					title: "SUSTAINABLE",
					description:
						"Hello, Earth Guardian. We value eco-friendly and ethical brands.",
					image: BotSvg,
				},
				{
					title: "SUSTAINABLE",
					description:
						"Prove your brand won't just talk green— but walk green.",
					image: BotSvg,
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
					title: "ANOTHER_VANGUARD",
					description: "First-time dialogue here...",
					image: BotSvg,
				},
				{
					title: "ANOTHER_VANGUARD",
					description: "First-time dialogue here...",
					image: BotSvg,
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
					title: "CAPITALIST",
					description:
						"Greetings. Our priority is profit. Let's see if your brand can turn a solid ROI.",
					image: BotSvg,
				},
				{
					title: "CAPITALIST",
					description:
						"Don’t forget: revenue growth is the name of the game in our space.",
					image: BotSvg,
				},
				{
					title: "CAPITALIST",
					description:
						"Don’t forget: revenue growth is the name of the game in our space.",
					image: BotSvg,
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

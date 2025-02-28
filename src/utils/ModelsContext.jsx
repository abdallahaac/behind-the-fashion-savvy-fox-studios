import React, { createContext, useContext, useState } from "react";
import botSvg from "../assets/images/tutorial-bot.svg";

const cameraAnimation = {
	first: {
		z: "3.9",
	},
};

const modelsData = {
	CanvasManufacturer: [
		{
			id: 1,
			title: "artisthread textiles",
			cost: "60000",
			ethics: 3,
			sustainability: 3,
			about: {
				locationImage: { botSvg },
				locationTitle: "Located in Europe",
				locationDescription:
					"ArtistThread Textiles is renowned for its exceptional craftsmanship...",
				standardImage: { botSvg },

				standardTitle: "SA8000 Standard",
				standardDescription:
					"A standard that organizations meet to show their commitment to treating workers fairly. ",
				etiImage: { botSvg },
				etiBaseTitle: "ETI Base Code",

				etiBaseDescription:
					"A set of labour standards organizations follow to improve working conditions",
			},
			factoryAudit: {
				fairWageTitle: "Fair Wage & Conditions to Workers",
				fairWageDescription:
					"The factory provides fair wages, safe working conditions, and respect for workers' rights",
				fairWageImage: { botSvg },
				energyEfficiencyTitle: "Energy Efficient ",

				energyEfficiencyDescription:
					"Factory uses renewable energy sources and has low carbon footprints",
				energyImage: { botSvg },

				wasteEfficiencyTitle: "Waste Reduction ",
				wasteEfficiencyDescription:
					"The manufacturer should prioritizes reducing waste through recycling, reusing materials, and implementing zero-waste practices",
				wasteImage: { botSvg },
			},
		},
		{
			id: 2,
			title: "phoenix garments co",
			cost: "20000",
			ethics: 1,
			sustainability: 1,

			about: {
				locationImage: { botSvg },
				locationTitle: "Located in Asia",
				locationDescription:
					"Pheonix Garmets Co. is a major hub for clothing manufacturing...",
				standardImage: { botSvg },

				standardTitle: "Low Transparency into Practices",
				standardDescription:
					"This factory has little to no disclosure into it’s practices...",
				etiImage: false,
				etiBaseTitle: false,

				etiBaseDescription: false,
			},
			factoryAudit: {
				fairWageTitle: "Fast Lead Time",
				fairWageDescription:
					"Garments can be made in large quantities with quick turn-around time...",
				fairWageImage: { botSvg },
				energyEfficiencyTitle: "High Waste Production",
				energyEfficiencyDescription:
					"An inefficient use of resources leads to a large amount of waste being produced...",
				energyImage: { botSvg },

				wasteEfficiencyTitle: "Risk of Sweatshops",
				wasteEfficiencyDescription:
					"Factories with low transparency risk the use of outsourcing their labor...",
				wasteImage: { botSvg },
			},
		},
		{
			id: 3,
			title: "Sundar Apparel Works",
			cost: "78000",
			ethics: 2,
			sustainability: 2,
			about: {
				locationImage: { botSvg },
				locationTitle: "Located in Asia",
				locationDescription:
					"Sundar Apparel Works is a leading manufacturer in Bangladesh...",
				standardImage: { botSvg },

				standardTitle: "SA8000 Standard",
				standardDescription:
					"A standard that organizations meet to show their commitment...",
				etiImage: false,
				etiBaseTitle: false,

				etiBaseDescription: false,
			},
			factoryAudit: {
				fairWageTitle: "Fair Wage & Conditions to Workers",
				fairWageDescription:
					"The factory provides fair wages, safe working conditions, and respect for workers' rights",
				fairWageImage: { botSvg },

				energyEfficiencyTitle: "Waste Reduction",
				energyEfficiencyDescription:
					"The manufacturer should prioritizes reducing waste through recycling...",
				energyImage: { botSvg },

				wasteEfficiencyTitle: "Use of Coal as Energy Source",
				wasteEfficiencyDescription:
					"Coal is the primary source of electricity that is used to power production.",
				wasteImage: { botSvg },
			},
		},
		{
			id: 4,
			title: "Silver oak manufacturing",
			cost: "40000",
			ethics: 2,
			sustainability: 3,
			about: {
				locationImage: { botSvg },
				locationTitle: "Located in North America",
				locationDescription:
					"Silver Oak Manufacturing is known for its balanced approach to sustainability...",
				standardImage: { botSvg },

				standardTitle: "SA8000 Standard",
				standardDescription:
					"A standard that organizations meet to show their commitment...",
				etiImage: { botSvg },
				etiBaseTitle: "ISO 14001",

				etiBaseDescription:
					"A standard for environmental management to minimize environmental impact.",
			},
			factoryAudit: {
				fairWageTitle: "High-Quality Craftsmanship",
				fairWageDescription:
					"The factory maintains strict quality control measures...",
				fairWageImage: { botSvg },

				energyEfficiencyTitle: "Environmentally Responsible",
				energyEfficiencyDescription:
					"Actively reduces its environmental footprint through waste reduction...",
				energyImage: { botSvg },

				wasteEfficiencyTitle: "Limited Production Scale",
				wasteEfficiencyDescription:
					"This factory may struggle with scaling up quickly to meet very large orders.",
				wasteImage: { botSvg },
			},
		},
		{
			id: 5,
			title: "Anadolu Textile Works",
			cost: "36000",
			ethics: 2,
			sustainability: 2,
			about: {
				locationImage: { botSvg },
				locationTitle: "Located in Europe",
				locationDescription:
					"Anadolu Textile Works specializes in garment production, providing a reasonable option...",
				standardImage: { botSvg },

				standardTitle: "OEKO-TEX Standard 100",
				standardDescription:
					"Ensures that the textiles produced are free from harmful chemicals...",
				etiImage: false,
				etiBaseTitle: false,

				etiBaseDescription: false,
			},
			factoryAudit: {
				fairWageTitle: "High-Quality Craftsmanship",
				fairWageDescription:
					"The factory maintains strict quality control measures throughout the production process.",
				fairWageImage: { botSvg },

				energyEfficiencyTitle: "Environmentally Responsible",
				energyEfficiencyDescription:
					"Actively reduces its environmental footprint through waste reduction, energy efficiency...",
				energyImage: { botSvg },

				wasteEfficiencyTitle: "Low Transparency into Practices",
				wasteEfficiencyDescription:
					"This factory has little to no disclosure into it’s practices...",
				wasteImage: { botSvg },
			},
		},
	],

	// 9 new outfits for your CanvasChooseOutfits
	CanvasOutfitsData: [
		{
			id: 1,
			name: "Space Gothic Chromatica",
			cost: 17500,
			originalDesignPct: 80,
			bulletPoints: [
				"80% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Bad for the Environment",
				"Poor Rights & Child Labor",
				"Labor rights violations and child labor are common in cotton production in some countries",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 2, icon: "down" },
				{ index: 3, icon: "down" },
			],
			img_path: "./images/spaceGothic.png",
			ethics: 3,
		},
		{
			id: 2,
			name: "Avant Garde Bloom",
			cost: 20000,
			originalDesignPct: 80,
			bulletPoints: [
				"80% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Innovative Design and Textures",
				"Patented Design",
				"The designer’s unique pattern on the jacket has been patented...",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "up" },
			],
			img_path: "./images/avantGarde.png",
			ethics: 2,
		},
		{
			id: 3,
			name: "Neo y2k shimmer",
			cost: 14000,
			originalDesignPct: 40,
			bulletPoints: [
				"40% Original Design",
				"The design has been heavily influenced by trends seen online",
				"Trending Design on Social Media",
				"Cultural Appropriation",
				"The design borrows from Japanese Kimono garments. Proper research not done",
			],
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			img_path: "./images/neoY2kShimmer.png",
			ethics: 1,
		},
		{
			id: 4,
			name: "Midnight grunge edge",
			cost: 16000,
			originalDesignPct: 85,
			bulletPoints: [
				"85% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Trending Design on Social Media",
				"Infringes on Copyrighted Material",
				"The logo uses the design without permission",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			img_path: "./images/midNightEdge.png",
			ethics: 2.75,
		},
		{
			id: 5,
			name: "SOLARPUNK",
			cost: 15000,
			originalDesignPct: 75,
			bulletPoints: [
				"75% Original Design",
				"This design features original designs while drawing inspiration",
				"Versatile Appeal Across Styles",
				"Trendy but Not Timeless",
				"The design may quickly become outdated as trends change",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			img_path: "./images/solarpunk.png",
			ethics: 1.5,
		},
		{
			id: 6,
			name: "EARTHBOUND NOMAD",
			cost: 17000,
			originalDesignPct: 50,
			bulletPoints: [
				"50% Original Design",
				"Heavily inspired by couture aesthetics",
				"Modern and Culturally Conscious Style",
				"Lacks Personalization",
				"The design's blend of trends may result in a generic look",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			img_path: "./images/earthynomad.png",
			ethics: 1.75,
		},
		{
			id: 7,
			name: "Industrial Luxe",
			cost: 13000,
			originalDesignPct: 10,
			bulletPoints: [
				"10% Original Design",
				"This outfit closely mimics established fashion designs",
				"Affordable Design to Recreate",
				"Copyright Concerns",
				"This outfit risks infringing on intellectual property",
			],
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			img_path: "./images/industrialLuxe.png",
			ethics: 0.25,
		},
		{
			id: 8,
			name: "STREET ROYALE",
			cost: 12500,
			originalDesignPct: 20,
			bulletPoints: [
				"20% Original Design",
				"This outfit closely mimics established fashion designs",
				"Affordable Design to Recreate",
				"Copyright Concerns",
				"This outfit risks infringing on intellectual property",
			],
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			img_path: "./images/plushStreetRoyale.png",
			ethics: 0.5,
		},
		{
			id: 9,
			name: "NEO VINTAGE EDGE",
			cost: 18000,
			originalDesignPct: 85,
			bulletPoints: [
				"85% Original Design",
				"This outfit showcases a high level of creativity...",
				"Niche Design Appeal",
				"Design Reinvention",
				"Merges vintage aesthetics with modern craftsmanship",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "down" },
				{ index: 2, icon: "up" },
			],
			img_path: "./images/neoVintageEdge.png",
			ethics: 2.5,
		},
	],

	// Existing data below:

	EthicallyStrongOptions: [
		{
			id: 1,
			name: "Earthbound Nomad - loose clothing",
			cost: 4300,
			sustainability: 4.9,
			ethics: 1.75,
			popularity: 3.2,
			description: "Affordable and ethical, but less trendy.",
			orig_percentage: 80,
			plag_percentage: 20,
			model: "/models/earthyboundNomad.glb",
			img_path: "./images/earthynomad.png",
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 100, 0],
				scale: 0.6,
			},
			materialParams: {
				metalness: 0,
				roughness: 0.9,
				color: "#ffffff",
			},
		},
	],
	CapitalisticChoices: [
		{
			id: 2,
			name: "Neo-Y2K Shimmer",
			cost: 4400,
			sustainability: 2.1,
			ethics: 1,
			popularity: 5.0,
			description: "Ultra-trendy but ethically low.",
			orig_percentage: 30,
			plag_percentage: 70,
			model: "/models/avantGardeBloom.glb",
			img_path: "./images/avantGarde.png",
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 100, 0],
				scale: 0.6,
			},
			materialParams: {
				metalness: 1.0,
				roughness: 0.2,
				color: "#ffffff",
			},
		},
		{
			id: 3,
			name: "Industrial Luxe",
			cost: 4000,
			sustainability: 1.5,
			ethics: 0.25,
			popularity: 5.0,
			description: "Expensive, low ethics, very popular.",
			orig_percentage: 40,
			plag_percentage: 60,
			model: "/models/industrialLuxe.glb",
			img_path: "./images/industrialLuxe.png",
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 100, 0],
				scale: 0.6,
			},
			materialParams: {
				metalness: 0.8,
				roughness: 0.1,
				color: "#aaaaaa",
			},
		},
		{
			id: 4,
			name: "Plush Street Royale",
			cost: 4500,
			sustainability: 2.8,
			ethics: 0.5,
			popularity: 4.9,
			description: "Capitalistic but somewhat neutral.",
			orig_percentage: 50,
			plag_percentage: 50,
			model: "/models/streetRoyal.glb",
			img_path: "./images/plushStreetRoyale.png",
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 100, 0],
				scale: 0.6,
			},
			materialParams: {
				metalness: 0.5,
				roughness: 0.3,
				color: "#fffeff",
			},
		},
	],
	NeutralChoices: [
		{
			id: 5,
			name: "Midnight Edge Grunge",
			cost: 4300,
			sustainability: 2.5,
			ethics: 2.75,
			popularity: 4.0,
			description: "Trendy with average ethics.",
			orig_percentage: 60,
			plag_percentage: 40,
			model: "/models/kimono.glb",
			img_path: "./images/midNightEdge.png",
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 100, 0],
				scale: 0.6,
			},
			materialParams: {
				metalness: 1,
				roughness: 0.6,
				color: "#ffff",
			},
		},
		{
			id: 6,
			name: "Space Gothic Chromatica",
			cost: 4300,
			sustainability: 4.7,
			ethics: 3,
			popularity: 4.7,
			description: "A balanced option.",
			orig_percentage: 70,
			plag_percentage: 30,
			model: "/models/spaceGothic.glb",
			img_path: "./images/spaceGothic.png",
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 100, 0],
				scale: 0.6,
			},
			materialParams: {
				metalness: 0.5,
				roughness: 0.3,
				color: "#ffffff",
			},
		},
	],
	LogoChoices: [
		{
			id: 1,
			name: "Minimalist Leaf Logo",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-1.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
		},
		{
			id: 2,
			name: "Retro Badge Logo",
			description: "Vintage flair with bold lines and text.",
			model: "/models/logo-02.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [0, 0, 0],
				scale: 0.7,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
		},
		{
			id: 3,
			name: "Futuristic Neon Logo",
			description: "A neon-glow style with sharp edges.",
			model: "/models/logo-03.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [0, 0, 0],
				scale: 0.8,
			},
		},
		{
			id: 4,
			name: "3D Chrome Logo",
			description: "Metallic 3D effect, perfect for luxury brands.",
			model: "/models/logo-04.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [0, Math.PI / 3, 0],
				scale: 2,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
			autoRotateRadius: 0.001,
		},
		{
			id: 5,
			name: "Handwritten Brush Logo",
			description: "A playful script style for a casual brand.",
			model: "/models/logo-05.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [0, 0, 0],
				scale: 1.0,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
		},
	],

	// ================================
	// MAKE SURE each item has a fabricKey
	// so that onFabricSelect(fabric.fabricKey) works
	// ================================
	CottonChoices: [
		{
			id: 1,
			name: "Conventional Cotton",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-1.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 38000,
			cert_icon1: "../assets/images/Certifications/fair-trade.png",
			cert_title1: "Fair Trade Certified",
			cert_description1:
				"Certified as having passed safety tests for harmful substances",
			env_icon: "negative",
			env_title: "Bad for the Environment",
			env_description:
				"Conventional cotton uses up to 25% of all the pesticides used in farming",
			ethics_icon: "negative",
			ethics_title: "Poor Rights & Child Labor",
			ethics_description:
				"Labor rights violations and child labor are common in some countries",
			water_icon: "negative",
			water_title: "High Water Use",
			water_description:
				"~1,320 gallons of water is used to produce one pound of cotton",
			img_path: "../assets/images/Cotton/conventional.svg",
			ethics: 2,
			sustainability: 1.5,
			fabricKey: "conventionalcotton",
		},
		{
			id: 2,
			name: "Organic Cotton",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-02.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 46000,
			cert_icon1: "../assets/images/Certifications/oeko.png",
			cert_title1: "OEKO TEX Standard 100",
			cert_description1:
				"Certifies that textiles are free from harmful chemicals...",
			cert_icon2: "../assets/images/Certifications/fair-trade.png",
			cert_title2: "Fair Trade Certified",
			cert_description2:
				"Certified as having passed safety tests for harmful substances",
			env_title: "Very Uncommon Material",
			env_description: "Only makes up around 1% of global cotton production",
			ethics_title: "Good Working Environment",
			ethics_description:
				"Working conditions are healthier based on the absence of harmful chemicals",
			cost_title: "High Cost",
			cost_description:
				"Due to fair and just production practices, organic cotton costs more to produce",
			img_path: "../assets/images/Cotton/organic_cotton.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "positive",
			cost_icon: "negative",
			ethics: 2.5,
			sustainability: 2,
			fabricKey: "cotton",
		},
		{
			id: 3,
			name: "Polyester",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-03.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 14000,
			env_title: "Harmful for the Environment",
			env_description:
				"Polyester, made from petroleum, contributes to pollution, greenhouse gases...",
			ethics_title: "Poor Labor Conditions",
			ethics_description:
				"Labor often occurs in factories with low wages, long hours...",
			water_title: "High Water Use",
			water_description: "~700 gallons of water is used to produce one pound",
			cost_title: "Low Cost",
			cost_description:
				"Cheap to produce due to synthetic materials, but at a high environmental cost",
			img_path: "../assets/images/Cotton/recycled_cotton.svg",
			env_icon: "negative",
			ethics_icon: "negative",
			water_icon: "negative",
			cost_icon: "positive",
			ethics: 1,
			sustainability: 0,
			fabricKey: "polyster", // matches 'polyster' key in fabricsMap
		},
		{
			id: 4,
			name: "Recycled Cotton",
			description:
				"CHANGE ME: Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-04.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 74000,
			cert_icon1: "../assets/images/Certifications/fsc.svg",
			cert_title1: "FSC",
			cert_description1:
				"Certifies that the bamboo used is from properly managed forests",
			env_title: "Positive Effects for the Environment",
			env_description:
				"A diverse material which can be grown in a variety of climates...",
			ethics_title: "Sustainable & Ethical",
			ethics_description:
				"Bamboo is often harvested by workers under fair labour conditions",
			water_title: "Minimal Water Use",
			water_description:
				"Bamboo requires little to no irrigation, can rely on rainfall",
			cost_title: "High Cost",
			cost_description:
				"Processing raw bamboo into fabric can be expensive compared to synthetics",
			img_path: "../assets/images/Cotton/sustainable_cotton.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "positive",
			cost_icon: "negative",
			ethics: 3,
			sustainability: 3,
			fabricKey: "recycledCotton",
		},
	],
	HeavyChoices: [
		{
			id: 1,
			name: "Acrylic",
			cost: 16000,
			env_title: "Bad for the Environment",
			env_description:
				"Production process is highly volatile. Many harmful chemicals...",
			ethics_title: "Poor Working Conditions",
			ethics_description:
				"Workers regularly experience hazardous conditions due to chemicals",
			additional_cons_title: "Additional Cons",
			additional_cons:
				"Lacks biodegradability, releases microplastics, may cause irritation...",
			img_path: "../assets/images/Heavy_Fabrics/acrylic.svg",
			env_icon: "negative",
			ethics_icon: "negative",
			water_icon: "negative",
			cost_icon: "positive",
			additional_cons_icon: "negative",
			ethics: 1,
			sustainability: 0,

			// ===== Add fabricKey so onFabricSelect() is called =====
			fabricKey: "acrylic",
		},
		{
			id: 2,
			name: "Wool",
			cost: 51000,
			cert_icon1: "../assets/images/Certifications/woolmark.svg",
			cert_title1: "Woolmark",
			cert_description1:
				"Certifies the wool product is pure and meets quality standards...",
			mat_title: "Common Material",
			mat_description:
				"A very popular material known for its softness, warmth, and durability",
			env_title: "Positive Effects for the Environment",
			env_description:
				"Wool is both biodegradable and renewable when sourced properly",
			ethics_title: "Variable Working Conditions",
			ethics_description:
				"Depending on the region, workers and animals may not be treated ethically",
			water_title: "Negative Effects on Climate",
			water_description:
				"Methane emmissions, land degradation, and water usage are not eco-friendly...",
			img_path: "../assets/images/Heavy_Fabrics/wool.svg",
			env_icon: "positive",
			ethics_icon: "neutral",
			water_icon: "negative",
			cost_icon: "negative",
			mat_icon: "positive",
			ethics: 3,
			sustainability: 1.5,
			fabricKey: "wool",
		},
		{
			id: 3,
			name: "Organic Hemp",
			cost: 61000,
			cert_icon1: "../assets/images/Certifications/gots.svg",
			cert_title1: "Global Organic Textile Standard (GOTS)",
			cert_description1:
				"Certifies responsible growing and manufacturing processes...",
			cert_icon2: "../assets/images/Certifications/eti.svg",
			cert_title2: "Ethical Trading Initiative (ETI)",
			cert_description2:
				"Certifies ethical labor practices, including fair wages...",
			water_title: "Environmentally Friendly",
			water_descritption:
				"Production requires small amounts of water, no pesticides",
			ethics_title: "Good Working Conditions",
			ethics_description:
				"Workers are treated fairly and are provided a safe environment",
			env_title: "Environmental Benefits",
			env_description:
				"Hemp absorbs carbon dioxide at a large magnitude per hectare...",
			mat_title: "Emerging Material",
			mat_description:
				"This material is becoming more popular thanks to its sustainability",
			cost_title: "High Cost",
			cost_description: "Organic hemp is costly due to sustainable farming...",
			img_path: "../assets/images/Heavy_Fabrics/organic-hemp.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "positive",
			cost_icon: "negative",
			mat_icon: "positive",
			ethics: 3,
			sustainability: 3,
			fabricKey: "hemp",
		},
		{
			id: 4,
			name: "Polyester-Wool Blend",
			cost: 39000,
			cert_icon1: "../assets/images/Certifications/oeko.png",
			cert_title1: "OEKO TEX Standard 100",
			cert_description1:
				"Certifies that textiles are free from harmful chemicals...",
			env_title: "Varying Sustainability",
			env_description:
				"The blend reduces wool waste but adds polyester’s microplastics...",
			ethics_title: "Partially Ethical",
			ethics_description:
				"Wool can be ethical, but polyester adds microplastic pollution...",
			water_title: "Moderate Water Use",
			water_description:
				"Wool requires a lot of water, while polyester reduces cost but adds pollution.",
			cost_title: "Moderate Cost",
			cost_description:
				"A balance of affordability and quality—polyester lowers cost, wool adds durability.",
			img_path: "../assets/images/Heavy_Fabrics/polyester-wool-blend.svg",
			env_icon: "neutral",
			ethics_icon: "neutral",
			water_icon: "neutral",
			cost_icon: "neutral",
			ethics: 2,
			sustainability: 1,
			fabricKey: "polysterWool",
		},
	],
	SyntheticChoices: [
		{
			id: 1,
			name: "Nylon",
			cost: 15000,
			mat_title: "Common Material",
			mat_description:
				"An extremely common material used in the fashion industry",
			env_title: "Terrible for the Environment",
			env_description:
				"The manufacturing process creates nitrous oxide, a greenhouse gas...",
			ethics_title: "Not Biodegradable",
			ethics_description:
				"Nylon products will last in landfills for hundreds of years",
			water_title: "Resource Intensive",
			water_description:
				"Large quantities of water are used in the manufacturing to cool nylon fibers...",
			img_path: "../assets/images/Heavy_Fabrics/nylon.svg",
			env_icon: "negative",
			ethics_icon: "negative",
			water_icon: "negative",
			mat_icon: "positive",
			ethics: 1,
			sustainability: 0,
			fabricKey: "Nylon", // matches the capital 'Nylon' in fabricsMap
		},
		{
			id: 2,
			name: "Silk",
			cost: 80000,
			cert_title1: "Responsible Silk Standard (RSS)",
			cert_description1:
				"Ensures silk is produced with animal welfare and sustainable practices...",
			env_title: "Eco-Friendly & Biodegradable",
			env_description:
				"Silk is a natural fiber with minimal environmental impact...",
			ethics_title: "Fair & Ethical Production",
			ethics_description:
				"When sourced responsibly, silk production supports fair wages...",
			water_title: "Moderate Water Use",
			water_description:
				"Silk requires water for sericulture, but far less than cotton...",
			cost_title: "High Cost",
			cost_description:
				"Silk is expensive due to labour-intensive harvesting and ethical sourcing...",
			img_path: "../assets/images/Heavy_Fabrics/silk.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "neutral",
			cost_icon: "negative",
			ethics: 3,
			sustainability: 3,
			fabricKey: "silk",
		},
		{
			id: 3,
			name: "Recycled Nylon",
			cost: 37000,
			cert_icon1: "../assets/images/Certifications/grs.svg",
			cert_title1: "Global Recycled Standard (GRS)",
			cert_description1:
				"Certification ensures traceability of materials and promotes the reduction of waste",
			env_title: "Positive Effects for the Environment",
			env_description:
				"Reduces the use of petroleum and overall waste compared to virgin nylon",
			ethics_title: "Negative Effects of Material",
			ethics_description:
				"Recycling nylon uses a lot of energy. Microplastics can be shed when washed",
			mat_title: "Common Material",
			mat_description:
				"Common in outdoor and activewear, offering decent performance with less virgin plastic",
			cost_title: "Moderate Cost",
			cost_description:
				"Recycled nylon can be pricier than virgin nylon due to recycling steps...",
			img_path: "../assets/images/Heavy_Fabrics/recycled-nylon.svg",
			env_icon: "positive",
			mat_icon: "positive",
			ethics_icon: "negative",
			cost_icon: "neutral",
			ethics: 2,
			sustainability: 1,
			fabricKey: "recycledNylon",
		},
		{
			id: 4,
			name: "Recycled Polyester",
			cost: 40000,
			cert_icon1: "../assets/images/Certifications/grs.svg",
			cert_title1: "Global Recycled Standard (GRS)",
			cert_description1:
				"Ensures recycled materials are tracked and waste is reduced",
			env_title: "Better for the Environment",
			env_description:
				"Reduces the use of petroleum compared to virgin polyester",
			sus_title: "Moderate Sustainability",
			sus_description:
				"Helps reduce waste, but still contributes to microplastic pollution",
			ethics_title: "Negative Effects",
			ethics_description:
				"The recycling process uses significant energy and chemicals...",
			cost_title: "Moderate Expense",
			cost_description:
				"Generally cheaper than virgin polyester but has added recycling costs",
			img_path: "../assets/images/Heavy_Fabrics/recycled-polyest.svg",
			env_icon: "positive",
			sus_icon: "neutral",
			ethics_icon: "negative",
			cost_icon: "neutral",
			ethics: 1.5,
			sustainability: 2,
			fabricKey: "recycledPolyster",
		},
	],

	Manufacturers: [
		{
			id: 1,
			name: "ARTTSTHREAD TEXTILES",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-1.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
			cost: 60000,
			location_icon: "../assets/images/Manufacturing/portugal.svg",
			location: "Located in Portugal",
			location_description:
				"Although more expensive, original designs are crucial in the fashion industry...",
			cert_icon1: "../assets/images/Manufacturing/sa8000.svg",
			cert_title1: "SA8000 Standard",
			cert_description1:
				"A standard that organizations meet to show their commitment...",
			cert_icon2: "../assets/images/Manufacturing/eti_base_code.svg",
			cert_title2: "ETI Base Code",
			cert_description2:
				"A set of labour standards organizations follow to improve working conditions",
			mat_title: "Common Material",
			mat_description:
				"A versatile fabric used by many clothing brands and is readily available...",
			env_title: "Bad for the Environment",
			env_description:
				"Conventional cotton uses up to 25% of all the pesticides used in farming",
			ethics_title: "Poor Rights & Child Labor",
			ethics_description:
				"Labor rights violations and child labor are common in cotton production",
			mat_icon: "positive",
			env_icon: "negative",
			ethics_icon: "negative",
			read: false,
			ethics: 1,
			sustainability: 2,
		},
		{
			id: 2,
			name: "FACTORY 2",
			location: "Turkey",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-2.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
			read: false,
			cost: 22000,
		},
		{
			id: 3,
			name: "FACTORY 3",
			location: "Bangladesh",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-3.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			materialParams: {
				metalness: 1,
				roughness: 0,
				color: "#ffffff",
			},
			read: false,
			cost: 36000,
		},
	],
};

const ModelsContext = createContext();

export const ModelsProvider = ({ children }) => {
	const [budget, setBudget] = useState(null);
	const contextValue = {
		...modelsData,
		budget,
		setBudget,
	};
	return (
		<ModelsContext.Provider value={contextValue}>
			{children}
		</ModelsContext.Provider>
	);
};

export const useModels = () => {
	return useContext(ModelsContext);
};

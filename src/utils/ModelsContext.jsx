import React, { createContext, useContext, useState } from "react";

// Optional: This cameraAnimation is from your snippet; keep if still needed
const cameraAnimation = {
	first: {
		z: "3.9",
	},
};

const modelsData = {
	// -------------------------
	// The 9 new outfits for your CanvasChooseOutfits
	// -------------------------
	CanvasOutfitsData: [
		{
			id: 1,
			name: "Space Gothic Chromatica",
			price: 17500, // $17.5K
			originalDesignPct: 80, // for a progress bar
			bulletPoints: [
				"80% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Bad for the Environment",
				"Poor Rights & Child Labor",
				"Labor rights violations and child labor are common in cotton production in some countries",
			],
			// We only want to show bullet #0 (thumbs up),
			// bullet #2 (thumbs down), bullet #3 (thumbs down).
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 2, icon: "down" },
				{ index: 3, icon: "down" },
			],
			// Use the image path from NeutralChoices for Space Gothic Chromatica
			img_path: "./images/spaceGothic.png",
		},
		{
			id: 2,
			name: "Avant Garde Bloom",
			price: 20000,
			originalDesignPct: 80,
			bulletPoints: [
				"80% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Innovative Design and Textures",
				"Patented Design",
				"The designer’s unique pattern on the jacket has been patented...",
			],
			// "thumbs up, thumbs up, thumbs up"
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "up" },
			],
			// Use the image from CapitalisticChoices (id:2) for Avant Garde Bloom
			img_path: "./images/avantGarde.png",
		},
		{
			id: 3,
			name: "Neo y2k shimmer",
			price: 14000,
			originalDesignPct: 40,
			bulletPoints: [
				"40% Original Design",
				"The design has been heavily influenced by trends seen online",
				"Trending Design on Social Media",
				"Cultural Appropriation",
				"The design borrows from Japanese Kimono garments. Proper research not done",
			],
			// "thumbs down, thumbs up, thumbs down"
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			// Assign a new image for Neo y2k shimmer
			img_path: "./images/neoY2kShimmer.png",
		},
		{
			id: 4,
			name: "Midnight grunge edge",
			price: 16000,
			originalDesignPct: 85,
			bulletPoints: [
				"85% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Trending Design on Social Media",
				"Infringes on Copyrighted Material",
				"The logo uses the design without permission",
			],
			// "thumbs up, thumbs up, thumbs down"
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			// Use image from NeutralChoices (id:5) for Midnight grunge edge
			img_path: "./images/midNightEdge.png",
		},
		{
			id: 5,
			name: "SOLARPUNK",
			price: 15000,
			originalDesignPct: 75,
			bulletPoints: [
				"75% Original Design",
				"This design features original designs while drawing inspiration",
				"Versatile Appeal Across Styles",
				"Trendy but Not Timeless",
				"The design may quickly become outdated as trends change",
			],
			// "thumbs up, thumbs up, thumbs down"
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			// Assign a new image for SOLARPUNK
			img_path: "./images/solarpunk.png",
		},
		{
			id: 6,
			name: "EARTHBOUND NOMAD",
			price: 17000,
			originalDesignPct: 50,
			bulletPoints: [
				"50% Original Design",
				"Heavily inspired by couture aesthetics",
				"Modern and Culturally Conscious Style",
				"Lacks Personalization",
				"The design's blend of trends may result in a generic look",
			],
			// "thumbs up, thumbs up, thumbs down"
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			// Use image from EthicallyStrongOptions for EARTHBOUND NOMAD
			img_path: "./images/earthynomad.png",
		},
		{
			id: 7,
			name: "Industrial Luxe",
			price: 13000,
			originalDesignPct: 10,
			bulletPoints: [
				"10% Original Design",
				"This outfit closely mimics established fashion designs",
				"Affordable Design to Recreate",
				"Copyright Concerns",
				"This outfit risks infringing on intellectual property",
			],
			// "thumbs down, thumbs up, thumbs down"
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			// Use image from CapitalisticChoices (id:3) for Industrial Luxe
			img_path: "./images/industrialLuxe.png",
		},
		{
			id: 8,
			name: "STREET ROYALE",
			price: 12500,
			originalDesignPct: 20,
			bulletPoints: [
				"20% Original Design",
				"This outfit closely mimics established fashion designs",
				"Affordable Design to Recreate",
				"Copyright Concerns",
				"This outfit risks infringing on intellectual property",
			],
			// "thumbs down, thumbs up, thumbs down"
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "up" },
				{ index: 2, icon: "down" },
			],
			// Use image from CapitalisticChoices (id:4) for STREET ROYALE
			img_path: "./images/plushStreetRoyale.png",
		},
		{
			id: 9,
			name: "NEO VINTAGE EDGE",
			price: 18000,
			originalDesignPct: 85,
			bulletPoints: [
				"85% Original Design",
				"This outfit showcases a high level of creativity while drawing from trends",
				"Niche Design Appeal",
				"Design Reinvention",
				"Merges vintage aesthetics with modern craftsmanship",
			],
			// "thumbs up, thumbs down, thumbs up"
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "down" },
				{ index: 2, icon: "up" },
			],
			// Assign a new image for NEO VINTAGE EDGE
			img_path: "./images/neoVintageEdge.png",
		},
	],

	// --------------------------
	// Your existing data below remains unchanged.
	// --------------------------
	EthicallyStrongOptions: [
		{
			id: 1,
			name: "Earthbound Nomad - loose clothing",
			budget: 4512333,
			cost: 4300,
			sustainability: 4.9,
			ethics: 4.8,
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
			budget: 47000,
			cost: 4400,
			sustainability: 2.1,
			ethics: 1.8,
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
			budget: 43000,
			cost: 4000,
			sustainability: 1.5,
			ethics: 1.7,
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
			budget: 49000,
			cost: 4500,
			sustainability: 2.8,
			ethics: 3.0,
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
			budget: 46500,
			cost: 4300,
			sustainability: 2.5,
			ethics: 2.8,
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
			budget: 46500,
			cost: 4300,
			sustainability: 4.7,
			ethics: 4.7,
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
				"Certified as having passed safety tests for the prescene of harmful substances",
			env_icon: "negative",
			env_title: "Bad for the Environment",
			env_description:
				"Conventional cotton uses up to 25% of all the pesticides used in farming",
			ethics_icon: "negative",
			ethics_title: "Poor Rights & Child Labor",
			ethics_description:
				"Labor rights violations and child labor are common in cotton production in some countries",
			water_icon: "negative",
			water_title: "High Water Use",
			water_description:
				"~1,320 gallons of water is used to produce one pound of cotton",
			img_path: "../assets/images/Cotton/conventional.svg",
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
				"Certifies that textiles are free from harmful chemicals and are safe for human use",
			cert_icon2: "../assets/images/Certifications/fair-trade.png",
			cert_title2: "Fair Trade Certified",
			cert_description2:
				"Certified as having passed safety tests for the prescene of harmful substances",
			env_title: "Very Uncommon Material",
			env_description: "Only makes up around 1% of global cotton production",
			ethics_title: "Good Working Environment",
			ethics_description:
				"Working conditions are healthier based on the absence of harmful chemicals",
			cost_title: "High Cost",
			cost_description:
				"Due to fair and just production practices, organic cotton costs more ot produce",
			img_path: "../assets/images/Cotton/organic_cotton.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "positive",
			cost_icon: "negative",
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
				"Polyester, made from petroleum, contributes to pollution, greenhouse gases, and sheds microplastics into oceans",
			ethics_title: "Poor Labor Conditions",
			ethics_description:
				"Labor often occurs in factories with low wages, long hours, and unsafe working conditions",
			water_title: "High Water Use",
			water_description:
				"~700 gallons of water is used to produce one pound of polyester",
			cost_title: "Low Cost",
			cost_description:
				"Cheap to produce due to synthetic materials and mass production, but at a high environmental cost",
			img_path: "../assets/images/Cotton/recycled_cotton.svg",
			env_icon: "negative",
			ethics_icon: "negative",
			water_icon: "negative",
			cost_icon: "positive",
		},
		{
			id: 4,
			name: "Bamboo",
			description: "Simple leaf-based design for eco-friendly vibes.",
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
				"Certifies that the bamboo used in production is sourced from properly managed forests or plantations",
			env_title: "Positive Effects for the Environment",
			env_description:
				"A diverse material which can be grown in a variety of climates across the world",
			ethics_title: "Sustainable & Ethical",
			ethics_description:
				"Bamboo is often harvested by workers under fair labour conditions",
			water_title: "Minimal Water Use",
			water_description:
				"Bamboo requires little to no irrigation, and can rely mostly on rainfall",
			cost_title: "High Cost",
			cost_description:
				"Processing raw bamboo into fabric can be expensive compared to synthetic fabrics",
			img_path: "../assets/images/Cotton/sustainable_cotton.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "positive",
			cost_icon: "negative",
		},
	],
	HeavyChoices: [
		{
			id: 1,
			name: "Acrylic",
			model: "/models/logo-1.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 16000,
			env_title: "Bad for the Environment",
			env_description:
				"Production process is highly volatile. Many harmful chemicals are used during manufacturing",
			ethics_title: "Poor Working Conditions",
			ethics_description:
				"Workers regularly experience hazardous conditions due to the chemicals used (acrylonitrile)",
			additional_cons_title: "Additional Cons",
			additional_cons:
				"Lacks biodegradability, releases microplastics, may cause irritation for some individuals",
			img_path: "../assets/images/Heavy_Fabrics/acrylic.svg",
			env_icon: "negative",
			ethics_icon: "negative",
			water_icon: "negative",
			cost_icon: "positive",
			additional_cons_icon: "negative",
		},
		{
			id: 2,
			name: "Wool",
			model: "/models/logo-02.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 51000,
			cert_icon1: "../assets/images/Certifications/woolmark.svg",
			cert_title1: "Woolmark",
			cert_description1:
				"Certifies the wool product is pure and meets quality standards.This certification does not account for sustainability, environment impacts, or animal welfare.",
			mat_title: "Common Material",
			mat_description:
				"A very popular material known for its softness, warmth, and durability",
			env_title: "Positive Effects for the Environment",
			env_description:
				"Wool is both biodegradable and renewale when sourced properly",
			ethics_title: "Variable Working Conditions",
			ethics_description:
				"Depending on the region, workers and animals may not be treated ethically",
			water_title: "Negative Effects on Climate",
			water_description:
				"Methane emmissions, land degradation, and water cusage are not eco-friendly aspects of production and maintenance",
			img_path: "../assets/images/Heavy_Fabrics/wool.svg",
			env_icon: "positive",
			ethics_icon: "neutral",
			water_icon: "negative",
			cost_icon: "negative",
			mat_icon: "positive",
		},
		{
			id: 3,
			name: "Organic Hemp",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-03.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 61000,
			cert_icon1: "../assets/images/Certifications/gots.svg",
			cert_title1: "Global Organic Textile Standard (GOTS)",
			cert_description1:
				"Certifies responsible growing and manufacturing processes with various environmental and social criteria.",
			cert_icon2: "../assets/images/Certifications/eti.svg",
			cert_title2: "Ethical Trading Initiative (ETI)",
			cert_description2:
				"Certifies ethical labor practices, including fair wages, safe working conditions, and respect towards human rights",
			water_title: "Environmentally Friendly",
			water_descritption:
				"Production requires small amounts of water and does not need pesticides to grow",
			ethics_title: "Good Working Conditions",
			ethics_description:
				"Workers are treated fairly and are provided a safe working environment",
			env_title: "Environmental Benefits",
			env_description:
				"Hemp absorbs carbon dioxide at a larger magnitude per hectare compared to other crops",
			mat_title: "Emerging Material",
			mat_description:
				"This material is becoming more popular thanks to its sustainability and durability",
			cost_title: "High Cost",
			cost_description:
				"Organic hemp is costly due to sustainable farming, and lower production volumes, but its durability makes it a long-term investment.",
			img_path: "../assets/images/Heavy_Fabrics/organic-hemp.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "positive",
			cost_icon: "negative",
			mat_icon: "positive",
		},
		{
			id: 4,
			name: "Polyester-Wool Blend",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-04.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 39000,
			cert_icon1: "../assets/images/Certifications/oeko.png",
			cert_title1: "OEKO TEX Standard 100",
			cert_description1:
				"Certifies that textiles are free from harmful chemicals and are safe for human use",
			env_title: "Varying Sustainability",
			env_description:
				"The blend reduces wool waste but adds polyester’s microplastics and fossil fuel impact, making it unsustainable",
			ethics_title: "Partially Ethical",
			ethics_description:
				"Wool can be ethical, but polyester adds microplastic pollution and fossil fuel reliance.",
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
		},
	],
	SyntheticChoices: [
		{
			id: 1,
			name: "Nylon",
			model: "/models/logo-1.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 15000,
			mat_title: "Common Material",
			mat_description:
				"An extremely common material used in the fashion industry",
			env_title: "Terrible for the Environment",
			env_description:
				"The manufacturing process creates nitrous oxide, a greenhouse gas with significantly worse impacts than CO2",
			ethics_title: "Not Biodegradable",
			ethics_description:
				"Nylon products will last in landfills for hundreds of years",
			water_title: "Resource Intensive",
			water_description:
				"Large quantities of water are used in the manufacturing to cool nylon fibers, and it consumes a lot of energy",
			img_path: "../assets/images/Heavy_Fabrics/nylon.svg",
			env_icon: "negative",
			ethics_icon: "negative",
			water_icon: "negative",
			mat_icon: "positive",
		},
		{
			id: 2,
			name: "Silk",
			model: "/models/logo-02.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 80000,
			cert_title1: "Responsible Silk Standard (RSS)",
			cert_description1:
				"Ensures silk is produced with animal welfare and sustainable practices in mind.",
			env_title: "Eco-Friendly & Biodegradable",
			env_description:
				"Silk is a natural fiber with minimal environmental impact, requiring no synthetic chemicals and fully biodegradable.",
			ethics_title: "Fair & Ethical Production",
			ethics_description:
				"When sourced responsibly, silk production supports fair wages and sustainable farming, without exploitation.",
			water_title: "Moderate Water Use",
			water_description:
				"Silk requires water for sericulture, but far less than cotton, making it a more sustainable choice.",
			cost_title: "High Cost",
			cost_description:
				"Silk is expensive due to labour-intensive harvesting and ethical sourcing, but its longevity justifies the price.",
			img_path: "../assets/images/Heavy_Fabrics/silk.svg",
			env_icon: "positive",
			ethics_icon: "positive",
			water_icon: "neutral",
			cost_icon: "negative",
		},
		{
			id: 3,
			name: "Recycled Nylon",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-03.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
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
				"Recycled nylon can be pricier than virgin nylon due to recycling steps, yet more sustainable long-term",
			img_path: "../assets/images/Heavy_Fabrics/recycled-nylon.svg",
			env_icon: "positive",
			mat_icon: "positive",
			ethics_icon: "negative",
			cost_icon: "neutral",
		},
		{
			id: 4,
			name: "Recycled Polyester",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-04.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
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
				"The recycling process uses significant energy and chemicals; microplastics can be released when washing",
			cost_title: "Moderate Expense",
			cost_description:
				"Generally cheaper than virgin polyester but has added recycling costs",
			img_path: "../assets/images/Heavy_Fabrics/recycled-polyest.svg",
			env_icon: "positive",
			sus_icon: "neutral",
			ethics_icon: "negative",
			cost_icon: "neutral",
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
			cost: 130000,
			location_icon: "../assets/images/Manufacturing/portugal.svg",
			location: "Located in Portugal",
			location_description:
				"Although more expensive, original designs are crucial in the fashion industry because they drive innovation, set trends, and define a brand's identity.",
			cert_icon1: "../assets/images/Manufacturing/sa8000.svg",
			cert_title1: "SA8000 Standard",
			cert_description1:
				"A standard that organizations meet to show their commitment to treating workers fairly.",
			cert_icon2: "../assets/images/Manufacturing/eti_base_code.svg",
			cert_title2: "ETI Base Code",
			cert_description2:
				"A set of labour standards organizations follow to improve working conditions",
			mat_title: "Common Material",
			mat_description:
				"A versatile fabric used by many clothing brands and is readily available in the supply chain",
			env_title: "Bad for the Environment",
			env_description:
				"Conventional cotton uses up to 25% of all the pesticides used in farming",
			ethics_title: "Poor Rights & Child Labor",
			ethics_description:
				"Labor rights violations and child labor are common in cotton production in some countries",
			mat_icon: "positive",
			env_icon: "negative",
			ethics_icon: "negative",
			read: false,
		},
		{
			id: 2,
			name: "FACTORY 2",
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
			cost: 130000,
		},
		{
			id: 3,
			name: "FACTORY 3",
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
			cost: 130000,
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

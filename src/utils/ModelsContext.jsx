// src/utils/ModelsContext.jsx

import React, { createContext, useContext, useState } from "react";

// Imported images and SVGs
import botSvg from "../assets/images/tutorial-bot.svg";

import manufacturingEuropePng from "../assets/images/Manufacturing/Europe.png";
import manufacturingSa8000Svg from "../assets/images/Manufacturing/sa8000.svg";
import manufacturingEtiBaseCodeSvg from "../assets/images/Manufacturing/eti_base_code.svg";
import manufacturingWarningSvg from "../assets/images/Manufacturing/warning.svg";
import greenThumbSvg from "../assets/images/green-thumb.svg";
import redThumbSvg from "../assets/images/red-thumb.svg";
import manufacturingAsiaSvg from "../assets/images/Manufacturing/Asia.svg";
import manufacturingISOSvg from "../assets/images/Manufacturing/ISO.svg";
import manufacturingNorthAmericaSvg from "../assets/images/Manufacturing/NorthAmerica.svg";

import certificationSvg from "../assets/images/Certifications/cradle.svg";
import modelPng from "../assets/images/model.png";
import fit1 from "../assets/images/1.png";
import fit2 from "../assets/images/2.png";
import fit3 from "../assets/images/3.png";
import fit4 from "../assets/images/4.png";
import fit5 from "../assets/images/5.png";
import fit6 from "../assets/images/6.png";
import fit7 from "../assets/images/7.png";
import fit8 from "../assets/images/8.png";
import fit9 from "../assets/images/9.png";

import earthynomadPng from "../assets/images/earthynomad.png";
import avantGardePng from "../assets/images/avantGarde.png";
import industrialLuxePng from "../assets/images/industrialLuxe.png";
import plushStreetRoyalePng from "../assets/images/plushStreetRoyale.png";
import midNightEdgePng from "../assets/images/midNightEdge.png";
import spaceGothicPng from "../assets/images/spaceGothic.png";

import fairTradePng from "../assets/images/Certifications/fair-trade.png";
import oekoPng from "../assets/images/Certifications/oeko.png";

import regularCottonJpg from "../assets/images/FabricThumbnails/FabricThumbnail_RegularCotton.jpg";
import organicCottonJpg from "../assets/images/FabricThumbnails/FabricThumbnail_OrganicCotton.jpg";
import polyesterJpg from "../assets/images/FabricThumbnails/FabricThumbnail_Polyester.jpg";
import recycledCottonJpg from "../assets/images/FabricThumbnails/FabricThumbnail_RecycledCotton.jpg";

import acrylicJpg from "../assets/images/FabricThumbnails/FabricThumbnail_Acrylic.jpg";
import woolJpg from "../assets/images/FabricThumbnails/FabricThumbnail_Wool.jpg";
import hempJpg from "../assets/images/FabricThumbnails/FabricThumbnail_Hemp.jpg";
import polyesterWoolJpg from "../assets/images/FabricThumbnails/FabricThumbnail_PolyesterWool.jpg";

import nylonJpg from "../assets/images/FabricThumbnails/FabricThumbnail_Nylon.jpg";
import silkJpg from "../assets/images/FabricThumbnails/FabricThumbnail_Silk.jpg";
import recycledNylonJpg from "../assets/images/FabricThumbnails/FabricThumbnail_RecycledNylon.jpg";
import recycledPolyesterJpg from "../assets/images/FabricThumbnails/FabricThumbnail_RecycledPolyester.jpg";

import woolmarkSvg from "../assets/images/Certifications/woolmark.svg";
import grsSvg from "../assets/images/Certifications/grs.svg";
import etiSvg from "../assets/images/Certifications/eti.svg";

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
			factoryKey: "artisthread", // <-- NEW factoryKey
			about: {
				locationImage: manufacturingEuropePng,
				locationTitle: "Located in Europe",
				locationDescription:
					"ArtistThread Textiles is known for its excellent craftsmanship, skilled team, and sustainable practices. Its European location offers easy access to key markets, making it an ideal production partner.",
				standardImage: manufacturingSa8000Svg,
				standardTitle: "SA8000 Standard",
				standardDescription:
					"A standard that organizations meet to show their commitment to treating workers fairly. ",
				etiImage: manufacturingEtiBaseCodeSvg,
				etiBaseTitle: "ETI Base Code",
				etiBaseDescription:
					"A set of labour standards organizations follow to improve working conditions",
			},
			factoryAudit: {
				fairWageTitle: "Fair Wage & Conditions to Workers",
				fairWageDescription:
					"The factory provides fair wages, safe working conditions, and respect for workers' rights",
				fairWageImage: greenThumbSvg,
				energyEfficiencyTitle: "Energy Efficient ",
				energyEfficiencyDescription:
					"Factory uses renewable energy sources and has low carbon footprints",
				energyImage: greenThumbSvg,
				wasteEfficiencyTitle: "Waste Reduction ",
				wasteEfficiencyDescription:
					"The manufacturer should prioritizes reducing waste through recycling, reusing materials, and implementing zero-waste practices",
				wasteImage: greenThumbSvg,
			},
		},
		{
			id: 2,
			title: "phoenix garments co",
			cost: "20000",
			ethics: 1,
			sustainability: 1,
			factoryKey: "phoenix", // <-- NEW factoryKey

			about: {
				locationImage: manufacturingAsiaSvg,
				locationTitle: "Located in Asia",
				locationDescription:
					"Pheonix Garmets Co. is a major hub in Asia known for cost-effective and large-scale production. It offers quick turnaround times for orders and smaller order quantities, making it ideal for smaller businesses",
				standardImage: manufacturingWarningSvg,
				standardTitle: "Low Transparency into Practices",
				standardDescription:
					"This factory has little to no disclosure into it’s practices. Audits have rarely been conducted and are inconclusive ",
				etiImage: false,
				etiBaseTitle: false,
				etiBaseDescription: false,
			},
			factoryAudit: {
				fairWageTitle: "Fast Lead Time",
				fairWageDescription:
					"Garments can be made in large quantities with quick turn-around time, allowing you to capitalize quickly on trends",
				fairWageImage: greenThumbSvg,
				energyEfficiencyTitle: "High Waste Production",
				energyEfficiencyDescription:
					"An inefficient use of resources leads to a large amount of waste being produced as a byproduct of production.",
				energyImage: redThumbSvg,
				wasteEfficiencyTitle: "Risk of Sweatshops",
				wasteEfficiencyDescription:
					"Factories with low transparency risk the use of outsourcing their labor to sweatshops to ensure low costs ",
				wasteImage: manufacturingWarningSvg,
			},
		},
		{
			id: 3,
			title: "Sundar Apparel Works",
			cost: "78000",
			ethics: 2,
			sustainability: 2,
			factoryKey: "sundar", // <-- NEW factoryKey
			about: {
				locationImage: manufacturingAsiaSvg,
				locationTitle: "Located in Asia",
				locationDescription:
					"Sundar Apparel Works is a leading manufacturer in Asia, recognized for its commitment to cost-effective, large-scale production. The factory places a strong emphasis on sustainability and ethical practices.",
				standardImage: manufacturingSa8000Svg,
				standardTitle: "SA8000 Standard",
				standardDescription:
					"A standard that organizations meet to show their commitment to treating workers fairly. ",
				etiImage: false,
				etiBaseTitle: false,
				etiBaseDescription: false,
			},
			factoryAudit: {
				fairWageTitle: "Fair Wage & Conditions to Workers",
				fairWageDescription:
					"The factory provides fair wages, safe working conditions, and respect for workers' rights",
				fairWageImage: greenThumbSvg,
				energyEfficiencyTitle: "Waste Reduction",
				energyEfficiencyDescription:
					"The manufacturer should prioritizes reducing waste through recycling, reusing materials, and implementing zero-waste practices.",
				energyImage: greenThumbSvg,
				wasteEfficiencyTitle: "Use of Coal as Energy Source",
				wasteEfficiencyDescription:
					"Coal is the primary source of electricity that is used to power production.",
				wasteImage: redThumbSvg,
			},
		},
		{
			id: 4,
			title: "Silver oak manufacturing",
			cost: "40000",
			ethics: 2,
			sustainability: 3,
			factoryKey: "silveroak", // <-- NEW factoryKey
			about: {
				locationImage: manufacturingNorthAmericaSvg,
				locationTitle: "Located in North America",
				locationDescription:
					"Silver Oak Manufacturing is known for its sustainable and ethical production. The factory integrates eco-friendly materials and energy-efficient processes while ensuring fair labor practices.",
				standardImage: manufacturingSa8000Svg,
				standardTitle: "SA8000 Standard",
				standardDescription:
					"A standard that organizations meet to show their commitment to treating workers fairly. ",
				etiImage: manufacturingISOSvg,
				etiBaseTitle: "ISO 14001",
				etiBaseDescription:
					"A standard for environmental management to minimize environmental impact.",
			},
			factoryAudit: {
				fairWageTitle: "High-Quality Craftsmanship",
				fairWageDescription:
					"The factory maintains strict quality control measures throughout the production process.",
				fairWageImage: greenThumbSvg,
				energyEfficiencyTitle: "Environmentally Responsible",
				energyEfficiencyDescription:
					"Actively reduces its environmental footprint through waste reduction, energy efficiency, and sustainable resource management.",
				energyImage: greenThumbSvg,
				wasteEfficiencyTitle: "Limited Production Scale",
				wasteEfficiencyDescription:
					"This factory may struggle with scaling up quickly to meet very large orders.",
				wasteImage: redThumbSvg,
			},
		},
		{
			id: 5,
			title: "Anadolu Textile Works",
			cost: "36000",
			ethics: 2,
			sustainability: 2,
			factoryKey: "anadolu", // <-- NEW factoryKey
			about: {
				locationImage: manufacturingEuropePng,
				locationTitle: "Located in Europe",
				locationDescription:
					"Anadolu Textile Works specializes in garment production, offering a moderately sustainable, competitively priced option, though labor and environmental improvements are needed.",
				standardImage: oekoPng,
				standardTitle: "OEKO-TEX Standard 100",
				standardDescription:
					"Ensures that the textiles produced are free from harmful chemicals, making them safe for consumer use.",
				etiImage: false,
				etiBaseTitle: false,
				etiBaseDescription: false,
			},
			factoryAudit: {
				fairWageTitle: "High-Quality Craftsmanship",
				fairWageDescription:
					"The factory maintains strict quality control measures throughout the production process.",
				fairWageImage: greenThumbSvg,
				energyEfficiencyTitle: "Environmentally Responsible",
				energyEfficiencyDescription:
					"Actively reduces its environmental footprint through waste reduction, energy efficiency, and sustainable resource management.",
				energyImage: greenThumbSvg,
				wasteEfficiencyTitle: "Low Transparency into Practices",
				wasteEfficiencyDescription:
					"This factory has little to no disclosure into it’s practices. Audits have rarely been conducted and are inconclusive ",
				wasteImage: manufacturingWarningSvg,
			},
		},
	],


	// 9 new outfits for your CanvasChooseOutfits
	CanvasOutfitsData: [
		{
			id: 1,
			name: "SPACE GOTHIC CHROMATICA",
			cost: 55000,
			originalDesignPct: 100,
			bulletPoints: [
				"100% Original Design",
				"This outfit showcases a high level of creativity that is both fresh and relevant",
				"Niche Design Appeal",
				"Design Reinvention",
				"This piece merges vintage aesthetics with modern craftsmanship while staying ethically produced",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "down" },
				{ index: 3, icon: "up" },
				{ index: 4, icon: "none" },
			],
			img_path: fit1,
			ethics: 3,
		},
		{
			id: 2,
			name: "AVANT GARDE BLOOM",
			cost: 38000,
			originalDesignPct: 80,
			bulletPoints: [
				"80% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Innovative Design and Textures",
				"Patented Design",
				"The designer’s unique pattern on the jacket has been patented and grants exclusive rights for a certain period",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "up" },
				{ index: 4, icon: "none" },
			],
			img_path: fit2,
			ethics: 2,
		},
		{
			id: 4,
			name: "NEO Y2K SHIMMER",
			cost: 20000,
			originalDesignPct: 30,
			bulletPoints: [
				"30% Original Design",
				"The design has been heavily influenced by trends seen online",
				"Trending Design on Social Media",
				"Cultural Appropriation",
				"The design borrows designs commonly seen in Japanese Kimono garments. Proper research and attribution to the culture has not been done",
			],
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "down" },
				{ index: 4, icon: "none" },
			],
			img_path: fit4,
			ethics: 1,
		},
		{
			id: 3,
			name: "MIDNIGHT GRUNGE EDGE",
			cost: 48000,
			originalDesignPct: 90,
			bulletPoints: [
				"90% Original Design",
				"The designer of the garment has been properly compensated for their innovative work",
				"Trending Design on Social Media",
				"Innovative Use of Materials ",
				"The designer of the garment is known for their innovative use of fabric material",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "up" },
				{ index: 4, icon: "none" },
			],
			img_path: fit3,
			ethics: 2.75,
		},
		{
			id: 5,
			name: "SOLARPUNK",
			cost: 29000,
			originalDesignPct: 75,
			bulletPoints: [
				"75% Original Design",
				"This design features original designs while drawing inspiration",
				"Versatile Appeal Across Styles",
				"Trendy but Not Timeless",
				"The design may quickly become outdated as trends change, reducing its long-term appeal",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "down" },
				{ index: 4, icon: "none" },
			],
			img_path: fit5,
			ethics: 1.5,
		},
		{
			id: 6,
			name: "EARTHBOUND NOMAD",
			cost: 34000,
			originalDesignPct: 50,
			bulletPoints: [
				"50% Original Design",
				"This design is heavily inspired by couture aesthetics while incorporating unique elements",
				"Modern and Culturally Conscious Style",
				"Lacks Personalization",
				"The design's blend of trends may result in a generic look",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "down" },
				{ index: 4, icon: "none" },
			],
			img_path: fit6,
			ethics: 1.75,
		},
		{
			id: 7,
			name: "INDUSTRIAL LUXE",
			cost: 16000,
			originalDesignPct: 10,
			bulletPoints: [
				"10% Original Design",
				"This outfit closely mimics established fashion designs, offering little to no original input",
				"Affordable Design to Recreate",
				"Stolen Design Work",
				"This outfit has been copied from a smaller designer without proper compensation",
			],
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "down" },
				{ index: 4, icon: "none" },
			],
			img_path: fit7,
			ethics: 0.25,
		},
		{
			id: 8,
			name: "STREET ROYALE",
			cost: 17000,
			originalDesignPct: 20,
			bulletPoints: [
				"20% Original Design",
				"This outfit closely mimics established fashion designs, offering little original input",
				"Affordable Design to Recreate",
				"Copyright Concerns",
				"This outfit risks infringing on intellectual property, challenging its originality and legal and ethical standing",
			],
			iconBullets: [
				{ index: 0, icon: "down" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "up" },
				{ index: 3, icon: "down" },
				{ index: 4, icon: "none" },
			],
			img_path: fit8,
			ethics: 0.5,
		},
		{
			id: 9,
			name: "NEO VINTAGE EDGE",
			cost: 45000,
			originalDesignPct: 85,
			bulletPoints: [
				"85% Original Design",
				"This outfit showcases a high level of creativity while drawing inspiration from  trends to ensure appeal from consumers",
				"Niche Design Appeal",
				"Design Reinvention",
				"This piece merges vintage aesthetics with modern craftsmanship",
			],
			iconBullets: [
				{ index: 0, icon: "up" },
				{ index: 1, icon: "none" },
				{ index: 2, icon: "down" },
				{ index: 3, icon: "up" },
				{ index: 4, icon: "none" },
			],
			img_path: fit9,
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
			img_path: earthynomadPng,
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
			img_path: avantGardePng,
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
			img_path: industrialLuxePng,
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
			img_path: plushStreetRoyalePng,
			transform: {
				position: [0, -4, -0.1],
				rotation: [0, 0, 0],
				scale: 0.7,
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
			img_path: midNightEdgePng,
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
			img_path: spaceGothicPng,
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
			name: "Regular Cotton",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/logo-1.glb",
			transform: {
				position: [0, 0, 0],
				rotation: [8, 1, 0],
				scale: 20.0,
			},
			cost: 38000,
			cert_icon1: fairTradePng,
			cert_title1: "Fair Trade Certified (For Some Farms)",
			cert_description1:
				"Certified as having passed safety tests for harmful substances",
			cat1_icon: "positive",
			cat1_title: "Common Material",
			cat1_descripiton:
				"A versatile fabric used by many clothing brands and is readily available in the supply chain",
			cat2_icon: "negative",
			cat2_title: "Bad for the Environment",
			cat2_descripiton:
				"Conventional cotton uses up to 25% of all the pesticides used in farming",
			cat3_icon: "negative",
			cat3_title: "Poor Rights & Child Labor",
			cat3_descripiton:
				"Labor rights violations and child labor are common in some countries",
			cat4_icon: "negative",
			cat4_title: "High Water Use",
			cat4_descripiton:
				"~1,320 gallons of water is used to produce one pound of cotton",
			img_path: regularCottonJpg,
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
			cert_icon1: oekoPng,
			cert_title1: "OEKO TEX Standard 100",
			cert_description1:
				"Certifies that textiles are free from harmful chemicals and are safe for human use",
			cert_icon2: fairTradePng,
			cert_title2: "Fair Trade Certified",
			cert_description2:
				"Certified as having passed safety tests for harmful substances",
			cat1_title: "Better for the Environment ",
			cat1_descripiton:
				"Production uses 91% less water compared to conventional cotton",
			cat2_title: "Good Working Environment",
			cat2_descripiton:
				"Working conditions are healthier based on the absence of harmful chemicals",
			cat3_title: "High Cost",
			cat3_descripiton:
				"Due to fair and just production practices, organic cotton costs more to produce",
			img_path: organicCottonJpg,
			cat1_icon: "positive",
			cat2_icon: "positive",
			cat3_icon: "negative",
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
			cat1_title: "Common Material",
			cat1_descripiton:
				"An extremely common material used in the fashion industry",
			cat2_title: "Terrible for the Environment",
			cat2_descripiton:
				"The manufacturing process creates nitrous oxide, a greenhouse gas which has a significantly worse environmental impact then carbon dioxide",
			cat3_title: "Poor Labor Conditions",
			cat3_descripiton:
				"Labor often occurs in factories with low wages, long hours, and poor pay",
			cat4_title: "Not Biodegradable",
			cat4_descripiton:
				"Polyester is not biodegradable, meaning any product will last in landfills for hundreds of years",
			img_path: polyesterJpg,
			cat1_icon: "positive",
			cat2_icon: "negative",
			cat3_icon: "negative",
			cat4_icon: "negative",
			ethics: 1,
			sustainability: 0,
			fabricKey: "polyster",
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
			cert_icon1: certificationSvg, // left as is if not an image import
			cert_title1: "Cradle to Cradle Certified™",
			cert_description1:
				"Certified material that has been recycled or up-cycled with circular economy in mind",
			cat1_title: "Good for the Environment ",
			cat1_descripiton:
				"Recycled cotton does not require lots of water as it is made from per-consumer waste",
			cat2_title: "Safe Working Conditions",
			cat2_descripiton:
				"Safer than conventional cotton, as there is zero pesticide exposure",
			cat3_title: "Resource Efficient",
			cat3_descripiton:
				"This material process does not require additional cotton farming",
			img_path: recycledCottonJpg,
			cat1_icon: "positive",
			cat2_icon: "positive",
			cat3_icon: "positive",
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
			cat1_title: "Bad for the Environment",
			cat1_descripiton:
				"Production process is highly volatile. Many harmful chemicals are used during manufacturing",
			cat2_title: "Poor Working Conditions",
			cat2_descripiton:
				"Workers regularly experience hazardous conditions due to the chemicals used (acrylonitrile)",
			cat3_title: "Common Material",
			cat3_descripiton:
				"Sees widespread use in the fashion industry. It is known for its soft, wool-like appearance",
			cat4_title: "Additional Cons",
			cat4_descripiton:
				"Lacks biodegradability, releases microplastics, may cause irritation for some individuals",
			img_path: acrylicJpg,
			cat1_icon: "negative",
			cat2_icon: "negative",
			cat3_icon: "positive",
			cat4_icon: "negative",
			ethics: 1,
			sustainability: 0,
			fabricKey: "acrylic",
		},
		{
			id: 2,
			name: "Wool",
			cost: 51000,
			cert_icon1: woolmarkSvg,
			cert_title1: "Woolmark",
			cert_description1:
				"Certifies the wool product is pure and meets quality standards. This certification does not account for sustainability, environment impacts, or animal wellness",
			cat1_title: "Common Material",
			cat1_descripiton:
				"A very popular material known for its softness, warmth, and durability",
			cat2_title: "Positive Effects for the Environment",
			cat2_descripiton:
				"Wool is both biodegradable and renewable when sourced properly",
			cat3_title: "Variable Working Conditions",
			cat3_descripiton:
				"Depending on the region, workers and animals may not be treated ethically",
			cat4_title: "Negative Effects on Climate",
			cat4_descripiton:
				"Methane emissions, land degradation, and water usage are not eco-friendly aspects of production",
			img_path: woolJpg,
			cat1_icon: "positive",
			cat2_icon: "positive",
			cat3_icon: "negative",
			cat4_icon: "negative",
			ethics: 3,
			sustainability: 1.5,
			fabricKey: "wool",
		},
		{
			id: 3,
			name: "Organic Hemp",
			cost: 61000,
			cert_icon1: certificationSvg, // left as is if not imported
			cert_title1: "Global Organic Textile Standard (GOTS)",
			cert_description1:
				"Certifies responsible growing and manufacturing processes with various environmental and social criteria",
			cert_icon2: etiSvg,
			cert_title2: "Ethical Trading Initiative (ETI)",
			cert_description2:
				"Certifies ethical labor practices, including fair wages...",
			cat1_title: "Environmentally Friendly",
			cat1_descripiton:
				"Production requires small amounts of water and does not need pesticides to grow",
			cat2_title: "Good Working Conditions",
			cat2_descripiton:
				"Workers are treated fairly and are provided a safe environment",
			cat3_title: "Environmental Benefits",
			cat3_descripiton:
				"Hemp absorbs carbon dioxide at a larger magnitude per hectare compared to other crops",
			cat4_title: "Emerging Material",
			cat4_descripiton:
				"This material is becoming more popular thanks to its sustainability",
			img_path: hempJpg,
			cat3_icon: "positive",
			cat2_icon: "positive",
			cat1_icon: "positive",
			cat4_icon: "positive",
			ethics: 3,
			sustainability: 3,
			fabricKey: "hemp",
		},
		{
			id: 4,
			name: "Polyester-Wool Blend",
			cost: 39000,
			cat1_title: "Durable Material",
			cat1_descripiton:
				"The polyester in the blend adds strength, making the fabric more durable and resistant to wear and tear compared to pure wool.",
			cat2_title: "Cost-Effective",
			cat2_descripiton:
				"A more affordable option while still maintaining some of wool’s warmth and texture",
			cat3_title: "Bad for the Environment",
			cat3_descripiton:
				"The manufacturing process creates nitrous oxide, a greenhouse gas which has a significantly worse environmental impact then carbon dioxide",
			cat4_title: "Prone to Pilling",
			cat4_descripiton:
				"Polyester blends can be more prone to pilling over time, especially with frequent wear or washing.",
			img_path: polyesterWoolJpg,
			cat1_icon: "positive",
			cat2_icon: "positive",
			cat3_icon: "negative",
			cat4_icon: "negative",
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
			cat1_title: "Common Material",
			cat1_descripiton:
				"An extremely common material used in the fashion industry",
			cat2_title: "Terrible for the Environment",
			cat2_descripiton:
				"The manufacturing process creates nitrous oxide, a greenhouse gas which has a significantly worse environmental impact then carbon dioxide",
			cat3_title: "Not Biodegradable",
			cat3_descripiton:
				"Nylon products will last in landfills for hundreds of years",
			cat4_title: "Resource Intensive",
			cat4_descripiton:
				"Large quantities of water are used during manufacturing to cool nylon fibers. The process also consumes a lot of energy",
			img_path: nylonJpg,
			cat2_icon: "negative",
			cat3_icon: "negative",
			cat4_icon: "negative",
			cat1_icon: "positive",
			ethics: 1,
			sustainability: 0,
			fabricKey: "Nylon",
		},
		{
			id: 2,
			name: "Silk",
			cost: 80000,
			cert_icon1: grsSvg,

			cert_title1: "Responsible Silk Standard (RSS)",
			cert_description1:
				"Ensures silk is produced with animal welfare and sustainable practices",
			cat1_title: "Eco-Friendly & Biodegradable",
			cat1_descripiton:
				"Silk is a natural fiber with minimal environmental impact",
			cat2_title: "Fair & Ethical Production",
			cat2_descripiton:
				"When sourced responsibly, silk production supports fair wages and good working conditions",
			cat3_title: "Efficient Water Use",
			cat3_descripiton:
				"Silk requires water for sericulture, but ethical farming practices ensure water resources are used efficiently",
			img_path: silkJpg,
			cat1_icon: "positive",
			cat2_icon: "positive",
			cat3_icon: "positive",
			ethics: 3,
			sustainability: 3,
			fabricKey: "silk",
		},
		{
			id: 3,
			name: "Recycled Nylon",
			cost: 37000,
			cert_icon1: grsSvg,
			cert_title1: "Global Recycled Standard (GRS)",
			cert_description1:
				"Certification ensures traceability of materials and promotes the reduction of waste",
			cat1_title: "Positive Effects for the Environment",
			cat1_descripiton:
				"Reduces the use of petroleum and overall waste compared to virgin nylon",
			cat2_title: "Negative Effects of Material",
			cat2_descripiton:
				"Recycling nylon uses a lot of energy. Microplastics can be shed when washed",
			cat3_title: "Common Material",
			cat3_descripiton:
				"A common material used in the industry, seen mostly in outdoor and active wear",
			img_path: recycledNylonJpg,
			cat1_icon: "positive",
			cat3_icon: "positive",
			cat2_icon: "negative",
			ethics: 2,
			sustainability: 1,
			fabricKey: "recycledNylon",
		},
		{
			id: 4,
			name: "Recycled Polyester",
			cost: 40000,
			cert_icon1: grsSvg,
			cert_title1: "Global Recycled Standard (GRS)",
			cert_description1:
				"Certification ensures traceability of materials and promotes the reduction of waste",
			cat1_title: "Better for the Environment",
			cat1_descripiton:
				"Reduces the use of petroleum compared to virgin polyester",
			cat2_title: "Not Biodegradable",
			cat2_descripiton:
				"Recycle polyester is still not biodegradable, and will turn into long lasting waste if not further recycled",
			cat3_title: "Negative Effects on the Environment",
			cat3_descripiton:
				"The process of recycling uses an abundance of energy and chemicals. Washing this material can release microplastics ",
			img_path: recycledPolyesterJpg,
			cat1_icon: "positive",
			cat2_icon: "negative",
			cat3_icon: "negative",
			ethics: 1.5,
			sustainability: 2,
			fabricKey: "recycledPolyster",
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

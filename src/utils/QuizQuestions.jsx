const QuizQuestions = [
    {
        question: "Is Nylon a good material for the environment?",
        answers: [
            "Yes, it is made of fibers that are sustainable to produce",
            "No, it is made of chemicals that are not biodegradable",
        ],
        correctAnswer: "No, it is made of chemicals that are not biodegradable",
        reasoning:
            "Nylon products will last in landfills for hundreds of years as it is not biodegradable",
        winAmount: 10000,
        loseAmount: -10000,
    },
    {
        question: "What is a disadvantage of using cotton as a fabric?",
        answers: [
            "It is a cheap material",
            "It releases microplastics",
            "It comsumes high amounts of water",
        ],
        correctAnswer: "It comsumes high amounts of water",
        reasoning:
            "Cotton can use 1,320 gallons of water to produce one pound of fabric",
        winAmount: 10000,
        loseAmount: -10000,
    },
    {
        question:
            "What is the SA8000 Standard Certification that factories can obtain?",
        answers: [
            "Factories have conducted audits at least 8000 times",
            "It reflects the factory's standards for treating workers fairly",
        ],
        correctAnswer:
            "It reflects the factory's standards for treating workers fairly",
        reasoning:
            "SA8000 is a standard that organizations meet to show their commitment to treating workers fairly.",
        winAmount: 30000,
        loseAmount: -30000,
    },
    {
        question: "What are ways factories can become more sustainable?",
        answers: [
            "Use renewable energy sources",
            "Reduce waste produced during manufacturing",
            "Implement sustainable resource management",
            "All of the above",
        ],
        correctAnswer: "All of the above",
        reasoning:
            "Factories that are environmentally responsible take steps to reduce their carbon footprint",
        winAmount: 30000,
        loseAmount: -30000,
    },
];

export default QuizQuestions;
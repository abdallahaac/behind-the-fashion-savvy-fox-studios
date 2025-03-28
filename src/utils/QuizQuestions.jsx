const QuizQuestions = [
    {
        question: "What does the Cradle to Cradle Label certify?",
        answers: [
            "A material has been farmed sustainably",
            "A material has been recycled or upcycled",
            "A material is produced with animal welfare",
        ],
        correctAnswer: "A material has been recycled or upcycled",
        reasoning:
            "Cradle to Cradle Certified materials are recycled or upcycled with a circular economy in mind.",
        winAmount: 10000,
        loseAmount: -10000,
    },
    {
        question: "What is a disadvantage of using cotton as a fabric material?",
        answers: [
            "It is a cheap material",
            "It releases microplastics",
            "It releases pesticides into the environment",
        ],
        correctAnswer: "It releases pesticides into the environment",
        reasoning:
            "Conventional cotton uses up to 25% of all the pesticides used in farming.",
        winAmount: 10000,
        loseAmount: -10000,
    },
    {
        question:
            "What is the SA8000 Standard Certification that factories can obtain?",
        answers: [
            "It shows the factory’s commitment to use clean energy and reduce waste",
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
        question: "What is the ETI Base Code?",
        answers: [
            "A set of labour standards organizations follow to improve working conditions",
            "A set of codes ensuring textiles produced are free from harmful chemicals",
        ],
        correctAnswer: "A set of labour standards organizations follow to improve working conditions",
        reasoning:
            "The ETI Base Code is a set of labour standards organizations follow to improve working conditions.",
        winAmount: 30000,
        loseAmount: -30000,
    },
];

export default QuizQuestions;
const { PrismaClient, QuestionType, subjectType } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  
  const questions = [
    // MCQ Questions
    // Physics
    {
      question_text: "What is the unit of force in the International System of Units (SI)?",
      question_type: QuestionType.MCQ,
      subject: subjectType.physics,
      options: JSON.stringify(["Newton", "Joule", "Watt", "Pascal"]),
      correct_answer: "Newton"
    },
    {
      question_text: "Which law states that for every action, there is an equal and opposite reaction?",
      question_type: QuestionType.MCQ,
      subject: subjectType.physics,
      options: JSON.stringify(["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Universal Gravitation"]),
      correct_answer: "Newton's Third Law"
    },
    {
      question_text: "What is the speed of light in a vacuum?",
      question_type: QuestionType.MCQ,
      subject: subjectType.physics,
      options: JSON.stringify(["299,792 km/s", "150,000 km/s", "300,000 km/s", "3,000 km/s"]),
      correct_answer: "299,792 km/s"
    },
    {
      question_text: "What is the gravitational constant (G) value?",
      question_type: QuestionType.MCQ,
      subject: subjectType.physics,
      options: JSON.stringify(["6.67430×10^−11 m^3 kg^−1 s^−2", "6.674×10^−11 m^3 kg^−1 s^−2", "6.67430×10^−12 m^3 kg^−1 s^−2", "6.674×10^−12 m^3 kg^−1 s^−2"]),
      correct_answer: "6.67430×10^−11 m^3 kg^−1 s^−2"
    },
    {
      question_text: "What does the law of conservation of energy state?",
      question_type: QuestionType.MCQ,
      subject: subjectType.physics,
      options: JSON.stringify(["Energy cannot be created or destroyed", "Energy can be created but not destroyed", "Energy can be destroyed but not created", "Energy can be neither created nor destroyed"]),
      correct_answer: "Energy cannot be created or destroyed"
    },
    {
      question_text: "What is the formula for kinetic energy?",
      question_type: QuestionType.MCQ,
      subject: subjectType.physics,
      options: JSON.stringify(["KE = 1/2 mv^2", "KE = mv^2", "KE = 1/2 m^2v", "KE = mv"]),
      correct_answer: "KE = 1/2 mv^2"
    },

    // Chemistry
    {
      question_text: "What is the chemical symbol for Sodium?",
      question_type: QuestionType.MCQ,
      subject: subjectType.chemistry,
      options: JSON.stringify(["Na", "N", "So", "S"]),
      correct_answer: "Na"
    },
    {
      question_text: "What is the pH of pure water?",
      question_type: QuestionType.MCQ,
      subject: subjectType.chemistry,
      options: JSON.stringify(["7", "14", "0", "3"]),
      correct_answer: "7"
    },
    {
      question_text: "Which of the following is an alkali metal?",
      question_type: QuestionType.MCQ,
      subject: subjectType.chemistry,
      options: JSON.stringify(["Potassium", "Calcium", "Iron", "Gold"]),
      correct_answer: "Potassium"
    },
    {
      question_text: "What type of bond is formed when two atoms share electrons?",
      question_type: QuestionType.MCQ,
      subject: subjectType.chemistry,
      options: JSON.stringify(["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"]),
      correct_answer: "Covalent bond"
    },
    {
      question_text: "What is the molecular formula for glucose?",
      question_type: QuestionType.MCQ,
      subject: subjectType.chemistry,
      options: JSON.stringify(["C6H12O6", "C5H10O5", "C6H14O6", "C6H12O5"]),
      correct_answer: "C6H12O6"
    },

    // Biology
    {
      question_text: "What is the powerhouse of the cell?",
      question_type: QuestionType.MCQ,
      subject: subjectType.biology,
      options: JSON.stringify(["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"]),
      correct_answer: "Mitochondria"
    },
    {
      question_text: "What is the genetic material in humans?",
      question_type: QuestionType.MCQ,
      subject: subjectType.biology,
      options: JSON.stringify(["DNA", "RNA", "Protein", "Carbohydrate"]),
      correct_answer: "DNA"
    },
    {
      question_text: "Which process converts glucose into ATP?",
      question_type: QuestionType.MCQ,
      subject: subjectType.biology,
      options: JSON.stringify(["Cellular Respiration", "Photosynthesis", "Fermentation", "Glycolysis"]),
      correct_answer: "Cellular Respiration"
    },
    {
      question_text: "What is the process by which cells divide to form two identical daughter cells?",
      question_type: QuestionType.MCQ,
      subject: subjectType.biology,
      options: JSON.stringify(["Mitosis", "Meiosis", "Binary Fission", "Cell Differentiation"]),
      correct_answer: "Mitosis"
    },
    {
      question_text: "Which organ in the human body is responsible for pumping blood?",
      question_type: QuestionType.MCQ,
      subject: subjectType.biology,
      options: JSON.stringify(["Heart", "Lung", "Kidney", "Liver"]),
      correct_answer: "Heart"
    },

    // GK
    {
      question_text: "Who is known as the Father of Computers?",
      question_type: QuestionType.MCQ,
      subject: subjectType.GK,
      options: JSON.stringify(["Charles Babbage", "Alan Turing", "Ada Lovelace", "Bill Gates"]),
      correct_answer: "Charles Babbage"
    },
    {
      question_text: "Which planet is known as the Red Planet?",
      question_type: QuestionType.MCQ,
      subject: subjectType.GK,
      options: JSON.stringify(["Mars", "Jupiter", "Saturn", "Venus"]),
      correct_answer: "Mars"
    },
    {
      question_text: "What is the capital of Australia?",
      question_type: QuestionType.MCQ,
      subject: subjectType.GK,
      options: JSON.stringify(["Canberra", "Sydney", "Melbourne", "Brisbane"]),
      correct_answer: "Canberra"
    },
    {
      question_text: "Who wrote 'Romeo and Juliet'?",
      question_type: QuestionType.MCQ,
      subject: subjectType.GK,
      options: JSON.stringify(["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"]),
      correct_answer: "William Shakespeare"
    },
    {
      question_text: "Which element has the chemical symbol 'Au'?",
      question_type: QuestionType.MCQ,
      subject: subjectType.GK,
      options: JSON.stringify(["Gold", "Silver", "Iron", "Copper"]),
      correct_answer: "Gold"
    },

    // Fill-in-the-Blank Questions
    // Physics
    {
      question_text: "The acceleration due to gravity on Earth is approximately ______ m/s^2.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.physics,
      correct_answer: "9.8"
    },
    {
      question_text: "The formula for calculating work done is ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.physics,
      correct_answer: "Work = Force × Distance"
    },
    {
      question_text: "The energy possessed by an object due to its motion is called ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.physics,
      correct_answer: "kinetic energy"
    },
    {
      question_text: "The principle that states that the total energy in an isolated system remains constant is called ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.physics,
      correct_answer: "conservation of energy"
    },

    // Chemistry
    {
      question_text: "The atomic number of Carbon is ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.chemistry,
      correct_answer: "6"
    },
    {
      question_text: "The number of protons in a hydrogen atom is ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.chemistry,
      correct_answer: "1"
    },
    {
      question_text: "A solution with a pH greater than 7 is called ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.chemistry,
      correct_answer: "basic"
    },
    {
      question_text: "The process of a substance changing directly from a solid to a gas is called ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.chemistry,
      correct_answer: "sublimation"
    },

    // Biology
    {
      question_text: "The basic unit of life is the ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.biology,
      correct_answer: "cell"
    },
    {
      question_text: "The process of cell division that results in two identical daughter cells is called ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.biology,
      correct_answer: "mitosis"
    },
    {
      question_text: "The pigment responsible for the green color in plants is called ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.biology,
      correct_answer: "chlorophyll"
    },
    {
      question_text: "The part of the cell where cellular respiration occurs is the ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.biology,
      correct_answer: "mitochondria"
    },

    // GK
    {
      question_text: "The largest ocean on Earth is the ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.GK,
      correct_answer: "Pacific Ocean"
    },
    {
      question_text: "The currency used in Japan is the ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.GK,
      correct_answer: "Yen"
    },
    {
      question_text: "The tallest mountain in the world is ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.GK,
      correct_answer: "Mount Everest"
    },
    {
      question_text: "The largest continent by land area is ______.",
      question_type: QuestionType.FILL_IN_THE_BLANK,
      subject: subjectType.GK,
      correct_answer: "Asia"
    },

    // Descriptive Questions
    // Physics
    {
      question_text: "Explain the concept of Newton's Laws of Motion and provide real-life examples for each law.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.physics,
      correct_answer: JSON.stringify(["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Inertia", "Action and Reaction", "Force and Acceleration"])
    },
    {
      question_text: "Discuss the principles of thermodynamics and their applications in real-world scenarios.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.physics,
      correct_answer: JSON.stringify(["First Law of Thermodynamics", "Second Law of Thermodynamics", "Heat Engines", "Entropy", "Internal Energy", "Heat Transfer"])
    },
    {
      question_text: "Describe the process of projectile motion and factors affecting it.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.physics,
      correct_answer: JSON.stringify(["Trajectory", "Horizontal and Vertical Components", "Acceleration due to Gravity", "Initial Velocity", "Angle of Projection", "Range"])
    },

    // Chemistry
    {
      question_text: "Explain the concept of chemical equilibrium and provide an example of a reversible reaction.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.chemistry,
      correct_answer: JSON.stringify(["Dynamic Equilibrium", "Le Chatelier's Principle", "Reversible Reactions", "Equilibrium Constant", "Example: Haber Process", "Example: Dissolution of Salt"])
    },
    {
      question_text: "Discuss the different types of chemical bonds and their characteristics.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.chemistry,
      correct_answer: JSON.stringify(["Covalent Bond", "Ionic Bond", "Metallic Bond", "Polar and Non-Polar Bonds", "Bond Strength", "Electron Sharing"])
    },
    {
      question_text: "Describe the periodic table's organization and how it helps in predicting element properties.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.chemistry,
      correct_answer: JSON.stringify(["Groups and Periods", "Atomic Number", "Periodic Trends", "Electronegativity", "Reactivity", "Metallic and Non-Metallic Properties"])
    },

    // Biology
    {
      question_text: "Explain the process of photosynthesis and its importance to life on Earth.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.biology,
      correct_answer: JSON.stringify(["Photosynthesis", "Chlorophyll", "Light Reactions", "Calvin Cycle", "Carbon Dioxide and Water", "Production of Oxygen and Glucose"])
    },
    {
      question_text: "Discuss the stages of cell division in meiosis and their significance in genetic diversity.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.biology,
      correct_answer: JSON.stringify(["Meiosis I and II", "Crossing Over", "Genetic Variation", "Homologous Chromosomes", "Gametes Formation", "Reduction Division"])
    },
    {
      question_text: "Describe the human digestive system and its role in nutrient absorption.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.biology,
      correct_answer: JSON.stringify(["Digestive Tract", "Enzymatic Breakdown", "Absorption in Small Intestine", "Role of Stomach", "Nutrient Transport", "Digestive Enzymes"])
    },

    // GK
    {
      question_text: "Analyze the impact of the Renaissance period on art and science.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.GK,
      correct_answer: JSON.stringify(["Artistic Innovation", "Scientific Advancements", "Humanism", "Famous Figures: Leonardo da Vinci, Galileo", "Cultural Flourishing", "Scientific Method"])
    },
    {
      question_text: "Discuss the effects of globalization on modern economies.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.GK,
      correct_answer: JSON.stringify(["Economic Interdependence", "Global Trade", "Technological Advancements", "Cultural Exchange", "Economic Inequality", "Impact on Local Industries"])
    },
    {
      question_text: "Explain the significance of the United Nations in maintaining global peace and security.",
      question_type: QuestionType.DESCRIPTIVE,
      subject: subjectType.GK,
      correct_answer: JSON.stringify(["Peacekeeping Missions", "International Cooperation", "Conflict Resolution", "Human Rights", "Sustainable Development Goals", "Diplomatic Relations"])
    }
  ];

  try {
    // Insert the questions into the database
    await prisma.question.createMany({
      data: questions,
    });
    console.log('Data has been inserted successfully');
  } catch (error) {
    console.error('Error inserting data: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed();

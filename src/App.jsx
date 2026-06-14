import { useState } from "react";
import "./App.css";
import Flashcard from "./components/card";
import zzPlantImage from "./Images/zzplant.png";

const initialCards = [
  {
    question: "Start!",
    answer: "Press the right arrow to start the flashcards",
    difficulty: "easy",
  },
  {
    question: "What indoor plant is the best for purifying air, as tested by NASA?",
    answer: "English Ivy",
    difficulty: "medium",
  },
  {
    question: "What type of plant is this? ",
    answer: "ZZ Plant",
    image: zzPlantImage,
    difficulty: "easy",
  },
  {
    question: "What can you do for plants to improve their ability to photosynthesize?",
    answer: "Dust or clean off the leaves",
    image: "",
    difficulty: "easy",
  },
  {
    question: "If a plant starts to develop yellow spots in the middle of its leaves, what could be the culprit?",
    answer: "Overwatering or fungus infection",
    image: "",
    difficulty: "medium",
  },
  {
    question: "When a plant develops pests, what is the first thing you should do?",
    answer: "Isolate the plant from other plants",
    image: "",
    difficulty: "medium",
  },
  {
    question: "What is an unlikely booster for plant growth?",
    answer: "Music!",
    image: "",
    difficulty: "easy",
  },
  {
    question: "When a plant needs more than 50% humidity, what kind of plant is it?",
    answer: "Tropical",
    image: "",
    difficulty: "medium",
  },
  {
    question: "What plant is known for looking perked up at night but droopy by day?",
    answer: "Prayer Plant or Maranta",
    image: "",
    difficulty: "medium",
  },
  {
    question: "What is it called when plants develop holes or slits in the leaves as they receive more sunlight?",
    answer: "Fenestration",
    image: "",
    difficulty: "hard",
  },
];

const shuffleCards = (cardList) => {
  const randomCards = [...cardList];
  const firstCard = randomCards.shift();

  for (let i = randomCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomCards[i], randomCards[j]] = [randomCards[j], randomCards[i]];
  }

  randomCards.unshift(firstCard);
  return randomCards;
};

const App = () => {
  const [cards] = useState(() => shuffleCards(initialCards));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [seenCards, setSeenCards] = useState([]);

  const handleSwitchCard = () => {
    if (currentCardIndex === cards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    setIsFlipped(false);

  };

  const handleSwitchCardBack = () => {
    if (seenCards.length > 0) {
      const previousCard = seenCards.pop();
      const previousCardIndex = cards.findIndex((card) => card.question === previousCard.question);
      // Let's go back to our previous card
      setCurrentCardIndex(previousCardIndex);
      setIsFlipped(false);
      setSeenCards([...seenCards]);
    }
  };

  return (
    <div className="App">
      <div className="Contents">
        <h3>The Ultimate Plant Parent!</h3>
          <p>How good of a plant parent are you? Test all of your planty knowledge here!</p>
          <p>Number of cards: {cards.length - 1}</p>
        <br></br>
        <div className="card-section">
          <Flashcard
            question={cards[currentCardIndex].question}
            answer={cards[currentCardIndex].answer}
            image={cards[currentCardIndex].image}
            difficulty={cards[currentCardIndex].difficulty}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
        </div>

        <div className="card-actions">
          <button type="button" className="previousCard" onClick={handleSwitchCardBack} disabled={seenCards.length === 0}>
            ⭠
          </button>
          <button type="button" className="nextCard" onClick={handleSwitchCard}>
            ⭢
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
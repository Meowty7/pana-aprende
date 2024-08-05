import React, { useState, useEffect } from 'react';
import RouletteWheel from './RouletteWheel';
import '../styles/popup.css';
import confetti from 'canvas-confetti';

// Define types for props and question options
interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface SelectedNumberProps {
  option: any; // Replace 'any' with the appropriate type for options
  questions: Question[];
}

const SelectedNumber: React.FC<SelectedNumberProps> = ({ option, questions }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const userIdFromQuery = query.get('userId') || null;
    setUserId(userIdFromQuery);
  }, []);

  const handleNumberSelected = (number: number) => {
    setSelectedNumber(number);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value); // Set selected option by value
  };

  const confettiAnimation = () => {
    confetti({ 
      particleCount: 100, 
      spread: 70, 
      origin: { x: 0.5, y: 0.5 } 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(''); // Clear feedback before submission

    // Ensure a valid option is selected
    if (!selectedOption) {
      setFeedback('Please select an option.');
      return;
    }

    // Find the selected option object
    const selectedOptionObj = questions[selectedNumber ? selectedNumber - 1 : 0]?.options.find(opt => opt.text === selectedOption);
    const isCorrect = selectedOptionObj?.isCorrect || false;
    const score = isCorrect ? 10 : 0; // Set score based on correctness

    try {
      const response = await fetch('/api/insert-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          score: score,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('There was an error!', error);
    }

    setFeedback(isCorrect ? '¡Correcto!' : 'Incorrecto, intenta de nuevo.');
    if (isCorrect) confettiAnimation();

    setTimeout(() => {
      window.location.href = '/categorias';
    }, 1500);
  };

  const selectedQuestion:any = selectedNumber ? questions[selectedNumber - 1] : {};

  return (
    <div>
      <RouletteWheel options={option} onNumberSelected={handleNumberSelected} />
      {selectedNumber && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className='text-white'>{selectedQuestion.question}</h2>

            <div className='flex items-center justify-center flex-col mb-3 mt-3'>
              <ul className='text-black flex flex-col'>
                {selectedQuestion.options?.map((opt: HTMLOptionElement, index:number) => (
                  <li key={index}>
                    <div className="bg-gray-100 rounded-md shadow-md p-3 m-1 text-left">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="selectedOption" // Match name to form parameter
                        value={opt.text} // Use option text as value
                        checked={selectedOption === opt.text} // Set checked state
                        onChange={handleOptionChange}
                        className="mr-2 text-left"
                      />
                      <label htmlFor={`option-${index}`} className="text-black">
                        {opt.text}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-600 
              text-white rounded-md shadow-sm 
              hover:bg-blue-700 
              focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2">
              Submit
            </button>

            {feedback && <p className="mt-4 text-lg text-black">{feedback}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedNumber;

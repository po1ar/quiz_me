import { useState } from 'react';
import Textbox from '../components/Textbox';
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "YOUR_API_KEY",
});
const openai = new OpenAIApi(configuration);
export default function Home() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState(['', '', '', '', '','', '']);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleSubmit = async (value) => {
    setLoading(true);
    const prompt = `I am a teacher teaching students who are ${inputs[1]}.
    The class I currently teach is ${inputs[0]}.
    I am giving my students an exam on ${inputs[2]}.
    I need you to give me ${inputs[3]} practice questions that are different than the ones I provided but are similar.
    
    In addition to those questions, please provide step-by-step answers (and how to solve them) for the questions you have stated.
    
    Here are some sample questions that I have given my students previously: ${inputs[4]}.
    
    Please also give it to me in the format:
    Question: *question*
    Answer: *answer*
    `;
    console.log(inputs)
    // how can i change the apiKey to be the inputted one?
    openai.configuration.apiKey = inputs[5];

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
      });
      console.log(response.data.choices[0].message.content);
      const choices = response.data.choices;
      if (choices && choices.length > 0) {
        const text = choices[0].message.content;
        setOutput(text);
        setIsContentLoaded(true);
      } else {
        setOutput('No response from API');
        setIsContentLoaded(true);
      }
    } catch (error) {
      console.log(error);
      setOutput('Error occurred while fetching response from API');
      setIsContentLoaded(true);
    }
    setLoading(false);
  };
  
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleTextboxSubmit = (value) => {
    // add to the array
    const newInputs = [...inputs];
    newInputs[step - 1] = value;
    setInputs(newInputs);
    handleNext();

  };

  function handleGenerateNew() {
    setLoading(true);
    setIsContentLoaded(false);
    setShowAnswers(false);
    handleSubmit();
  }

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };


  const formatQuestions = (output) => {
    const pairs = output.split(/Question \d+:/).slice(1);
    return pairs.map((pair, index) => {
      const [question, answer] = pair.split(/Answer:/);
      return (
        <div key={index}>
          <p><strong>Question {index + 1}:</strong> {question.trim()}</p>
          <br />
        </div>
      );
      
    });
  };

  const formatOutput = (output) => {
    const pairs = output.split(/Question \d+:/).slice(1);
    return pairs.map((pair, index) => {
      const [question, answer] = pair.split(/Answer:/);
      return (
        <div key={index}>
          <p><strong>Question {index + 1}:</strong> {question.trim()}</p>
          {/* how could i check to see i can use .trim() for answer? */}
          <p><strong>Answer:</strong> {answer.trim()}</p>
          <br />
        </div>
      );
    });
  };

  return (
    <div>
    {step == 1 && (
      // how to center this?
      <div>
        <div className = 'title'> Welcome to QuizMe! </div>
        <div className = 'title-explained'>
          A tool to generate your own custom Study Guide, with the power of AI.
        </div>

      </div>
    )}
    <div className = "main-card">
    <div className={`flex flex-col justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {step === 1 && (
          <Textbox id="input1" label="For which class would you like to make a QuizMe Guide?" onSubmit={handleTextboxSubmit} isLast={false} darkMode={darkMode} />
        )}
        {step === 2 && (
          <Textbox id="input2" label="What grade are you in?" onSubmit={handleTextboxSubmit} isLast={false} darkMode={darkMode} />
        )}
        {step === 3 && (
          <Textbox id="input3" label="What topic do you need more practice with?" onSubmit={handleTextboxSubmit} isLast={false} darkMode={darkMode} />
        )}
        {step === 4 && (
          <Textbox id="input4" label="How many questions do you need? (Max 5!)" onSubmit={handleTextboxSubmit} isLast={false} darkMode={darkMode} />
        )}
        {step === 5 && (
          <Textbox id="input5" label="What are some sample questions that you have been given? If you don't have any, enter N/A" onSubmit={handleTextboxSubmit} isLast={false} darkMode={darkMode} style={{width: "800px", height: "200px"}} />
        )}
        {step === 6 && (
          <Textbox id="input6" label="Please enter your OpenAI API Key. " onSubmit={handleTextboxSubmit} isLast={false} darkMode={darkMode} style={{width: "800px", height: "200px"}} />
        )}
        {step === 7 && !isContentLoaded && (
          <Textbox id="input7" label="Would you like to input other information?" onSubmit={handleSubmit} isLast={true} darkMode={darkMode} />
        )}
        {isContentLoaded && (
          <div>
            <div className="output-container">
              <h1 className="text-2xl font-bold">Here are your questions and answers!</h1>
              {showAnswers ? formatOutput(output) : formatQuestions(output)}
              <div className="flex flex-row justify-between items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowAnswers}>Show Answers</button>
                {/* button that refreshes page */}
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded" onClick={location.reload()}>Create New Study Guide</button> */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded" onClick={handleGenerateNew}>Generate New Questions</button>
              </div>
            </div>
            <div className="mt-4">
            </div>
          </div>

        )}
        {loading && (
          <div>Loading...</div>
        )}
      </div>
    </div>
    </div>
  );
  
}  
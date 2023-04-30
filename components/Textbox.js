import { useState } from 'react';

export default function Textbox({ id, label, onSubmit, isLast }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleTextboxSubmit(value);
    // check to make sure that the value is less than or equal to 5 only for the 4th textbox, otherwise, return an error
    // the id is the input1, input2, input3, input4
    // if the id is input4, then check to see if the value is less than or equal to 5
    // if it is, then call the onSubmit function
    // otherwise, return an error
    if (id === 'input4') {
      if (value <= 5) {
        onSubmit(value);
        setValue('');
      } else {
        alert('Please enter a number less than or equal to 5');
      }
    } else {
      onSubmit(value);
      setValue('');
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };
  return (
    <div className="shadow-lg rounded-lg p-6 mb-25">
        <div className="mb-22 font-bold">{label}</div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            id={id}
            type="text"
            className={`px-4 py-4 w-full ${isFocused ? 'border-blue-500' : 'border-gray-300'} 
            focus:outline-none focus:border-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-800 
            dark:text-gray-100`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className={` ${isFocused ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} 
            focus:outline-none focus:bg-blue-500 focus:text-white dark:bg-gray-600 dark:text-gray-200`}
          >
            {isLast ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';

const Result = () => {
  const questionCount = 50;
  const questions = Array.from({ length: questionCount }, (_, index) => `Question ${index + 1}: ...`);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(''));
  const [response, setResponse] = useState('');
  const [validationError, setValidationError] = useState('');
  const [dataList, setDataList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');



  const handleGetRequest = async () => {
    try {
      const response = await fetch('http://localhost:8082/get_test_results', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setDataList(responseData);
      } else {
        console.log('##########inside###Error ');
      }
    } catch (error) {}
  };
  const handleSendAnswers = async () => {
    try {
      // Check if there are any unanswered questions
      if (selectedAnswers.some(answer => !answer)) {
        // If there are unanswered questions, set the validation error
        setValidationError('Please answer all questions before submitting.');
        return;
      }

      // Clear validation error if all questions are answered
      setValidationError('');

      const answersData = {};
      selectedAnswers.forEach((answer, index) => {
        answersData[index + 1] = answer.toUpperCase();
      });

      // Make a POST request to the Python server using fetch
      const response = await fetch('http://localhost:8082', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answersData }),
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Handle the response or update UI accordingly
        setResponse(responseData.result);
        setSuccessMessage('Answers submitted successfully!'); 
        console.log('%%%%%%%%%%%%%', answersData);
        console.log('########inside####if');
      } else {
        // Handle non-successful response (e.g., show an error)
        console.error('Error sending answers:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error sending answers:', error.message);
    }
  };
  const handleClearData = () => {
    setDataList([]);
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-[#3B82F6] pt-5 text-[55px]">WELCOME TO THE AUTOMATIC TEST GRADER SYSTEM</h1>
      </div>
      <div className="">
        <div className="flex flex-col p-5">
          <h1 className="text-start pb-5 text-[30px] font-light">Please input the valid standard answers for the exam!</h1>
          {/* Container for both columns */}
          <div className="flex flex-row">
            <div className="w-1/2  flex flex-row">
              {/* First Column */}
              <div className="pr-4 basis-full">
                <div className="overflow-y-scroll" style={{ height: '400px' }}>
                  {questions.slice(0, 25).map((question, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-xl">{question}</p>
                      <label className="block mt-2 text-lg">
                        Select an answer:
                        <select
                          value={selectedAnswers[index]}
                          onChange={e => {
                            const updatedAnswers = [...selectedAnswers];
                            updatedAnswers[index] = e.target.value;
                            setSelectedAnswers(updatedAnswers);
                          }}
                          className="mt-1 block w-32 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 py-1"
                        >
                          <option value="">Select...</option>
                          <option value="a">Option A</option>
                          <option value="b">Option B</option>
                          <option value="c">Option C</option>
                          <option value="d">Option D</option>
                          <option value="e">Option E</option>
                        </select>
                      </label>
                    </div>
                  ))}
                </div>
                {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
                <div className="flex flex-start pt-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex "
                    onClick={handleSendAnswers}
                  >
                    Submit Answers
                  </button>
                </div>
              </div>

              {/* Second Column */}
              <div className="pr-4 basis-full">
                <div className="overflow-y-scroll" style={{ height: '400px' }}>
                  {questions.slice(25).map((question, index) => (
                    <div key={index + 25} className="mb-4">
                      <p className="text-xl">{question}</p>
                      <label className="block mt-2 text-lg">
                        Select an answer:
                        <select
                          value={selectedAnswers[index + 25]}
                          onChange={e => {
                            const updatedAnswers = [...selectedAnswers];
                            updatedAnswers[index + 25] = e.target.value;
                            setSelectedAnswers(updatedAnswers);
                          }}
                          className="mt-1 block w-32 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 py-1"
                        >
                          <option value="">Select...</option>
                          <option value="a">Option A</option>
                          <option value="b">Option B</option>
                          <option value="c">Option C</option>
                          <option value="d">Option D</option>
                          <option value="e">Option E</option>
                        </select>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-column items-end ml-40">
     
              <div className="flex justify-between mb-4">
                <Button label="Fetch Data"  icon="pi pi-refresh" onClick={handleGetRequest} className="bg-white text-blue-500 pr-4" style={{  outline: 'none', border: 'none' }}>
                  
                </Button>
                <Button label="Clear Data" icon="pi pi-times" onClick={handleClearData} className="bg-white text-blue-500" style={{  outline: 'none', border: 'none' }}>
                 
                </Button>
              </div>
              <DataTable value={dataList}>
                <Column field="name" header="Name"></Column>
                <Column field="multiply_shaded" header="Multiply Shaded"></Column>
                <Column field="wrong" header="Wrong"></Column>
                <Column field="correctly_answered" header="Correctly Answered"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

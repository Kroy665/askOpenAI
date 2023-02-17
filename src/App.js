import React, { useState, useEffect } from 'react';
import RecordButton from './components/RecordButton';
import askOpenAI from './utils/askOpenAI';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const [textDiff, setTextDiff] = useState([]);

  useEffect(() => {
    setIsMicOn(true)
  }, [])

  useEffect(() => {
    async function getAnswer() {

      if (text !== "" && isMicOn === false) {
        console.log("text::", text)

        const speak = (msg) => {
          const sp = new SpeechSynthesisUtterance(msg);
          [sp.voice] = speechSynthesis.getVoices();
          speechSynthesis.speak(sp);
        }

        const answer = await askOpenAI(text);
        console.log("answer::", answer)
        speak(answer)
      }
    }
    getAnswer()
  }, [text, isMicOn])

  return (
    <div className="App">
      <div>
        <RecordButton
          setText={setText}
          setIsMicOn={setIsMicOn}
          isMicOn={isMicOn}
          setTextDiff={setTextDiff}
          textDiff={textDiff}
          text={text}
        />
      </div>
      <button 
        className='voice-circle'
        onClick={() => {
          setIsMicOn(!isMicOn)
        }}
      >
        <div className='voice-circle-inner'>
          {isMicOn && <>
            {textDiff.map((item, index) => {
              return (
                <div key={index} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  // animation: 'pulse 1s infinite'
                  border: '2px solid #f00',
                  borderRadius: '50%',
                  width: `${item * 10 + 30}px`,
                  height: `${item * 10 + 30}px`,
                }}>
                  <div className='voice-circle-dot'>
                  </div>

                </div>
              )
            })}
            <div className='voice-circle-dot'>

            </div>
          </>}
        </div>

      </button>
    </div>
  );
}

export default App;

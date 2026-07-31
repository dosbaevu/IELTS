// pages/test/speaking.jsx
import { useState, useEffect } from 'react';
import { ieltsData } from '../../data/ieltsData';

export default function SpeakingTest() {
  const [part, setPart] = useState(1);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && isRecording) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isRecording]);

  const startPart2Prep = () => {
    setTimer(ieltsData.speaking.part2.prepTimeSec);
    setIsRecording(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex border-b bg-gray-100">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setPart(num)}
              className={`flex-1 py-4 text-center font-bold ${part === num ? 'bg-white text-blue-600 border-t-4 border-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              Part {num}
            </button>
          ))}
        </div>

        <div className="p-8">
          {part === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Introduction & Interview</h2>
              <p className="text-gray-500">Topic: {ieltsData.speaking.part1.topic}</p>
              <ul className="space-y-4 mt-6">
                {ieltsData.speaking.part1.questions.map((q, idx) => (
                  <li key={idx} className="bg-gray-50 p-4 rounded-lg text-lg border-l-4 border-blue-500">{q}</li>
                ))}
              </ul>
            </div>
          )}

          {part === 2 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold">The Cue Card</h2>
              <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-left whitespace-pre-wrap text-lg text-gray-800">
                {ieltsData.speaking.part2.cueCard}
              </div>
              
              <div className="py-8">
                <div className="text-6xl font-mono text-gray-800 mb-4">{timer}s</div>
                <button 
                  onClick={startPart2Prep}
                  className="px-8 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors">
                  {timer > 0 ? 'Recording / Prepping...' : 'Start 1-Minute Prep'}
                </button>
              </div>
            </div>
          )}

          {part === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Two-Way Discussion</h2>
              <p className="text-gray-500">Topic: {ieltsData.speaking.part3.topic}</p>
              <ul className="space-y-4 mt-6">
                {ieltsData.speaking.part3.questions.map((q, idx) => (
                  <li key={idx} className="bg-gray-50 p-4 rounded-lg text-lg border-l-4 border-blue-500">{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

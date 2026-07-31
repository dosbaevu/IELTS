// pages/test/writing.jsx
import { useState } from 'react';
import { ieltsData } from '../../data/ieltsData';

export default function WritingTest() {
  const [activeTask, setActiveTask] = useState('task1');
  const [text, setText] = useState('');
  
  const currentTask = activeTask === 'task1' ? ieltsData.writing.task1[0] : ieltsData.writing.task2[0];
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Academic Writing Practice</h1>
        <div className="space-x-4">
          <button 
            onClick={() => setActiveTask('task1')}
            className={`px-4 py-2 rounded-md font-medium ${activeTask === 'task1' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Task 1
          </button>
          <button 
            onClick={() => setActiveTask('task2')}
            className={`px-4 py-2 rounded-md font-medium ${activeTask === 'task2' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Task 2
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Prompt */}
        <div className="w-1/2 p-8 overflow-y-auto border-r bg-white">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">{currentTask.type}</span>
          <h2 className="text-lg font-medium text-gray-900 mt-2 leading-relaxed">
            {currentTask.prompt}
          </h2>
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
            <p className="font-bold">Instructions:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Spend about {activeTask === 'task1' ? '20' : '40'} minutes on this task.</li>
              <li>Write at least {currentTask.minWords} words.</li>
            </ul>
          </div>
        </div>

        {/* Right: Editor */}
        <div className="w-1/2 p-8 flex flex-col bg-gray-50">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-500">Your Response</span>
            <span className={`text-sm font-bold ${wordCount < currentTask.minWords ? 'text-red-500' : 'text-green-600'}`}>
              {wordCount} / {currentTask.minWords} words
            </span>
          </div>
          <textarea
            className="flex-1 w-full p-4 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
            placeholder="Begin writing here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

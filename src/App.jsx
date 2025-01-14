import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const[question,setQuestion] = useState("")

  const FetchAnswer = async () => {
    const api = import.meta.env.VITE_API_KEY
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });
    // console.log(response['data']['candidates'][0]['content']['parts'][0]['text'])
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
  };
  return (
    <><div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
    <textarea
      onChange={(e) => setQuestion(e.target.value)}
      rows={5}
      cols={50}
      value={question}
      className="p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your question..."
    ></textarea>
    <button
      onClick={FetchAnswer}
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Ask
    </button>
    <pre className="mt-4 p-4 bg-white border border-gray-300 rounded-lg max-w-6xl text-gray-800 whitespace-pre-wrap break-words overflow-auto max-h-80">
  {answer}
</pre>
  </div>
     

    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<"list" | "form">("list");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handlePublish = () => {
    // Bara navigera tillbaka (sparar inget än)
    setCurrentView("list");
    // Rensa fälten
    setUsername("");
    setMessage("");
  };

  const handleAbort= () => {
    setCurrentView("list");
 
    setUsername("");
    setMessage("");
  };

  if (currentView === "form") {
    return (
      <div>
        <input
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Meddelande"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handlePublish}>Publicera</button>
        <button onClick={handleAbort}>Avbryt</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setCurrentView("form")}>Nytt meddelande</button>
    </div>
  );
}

export default App;

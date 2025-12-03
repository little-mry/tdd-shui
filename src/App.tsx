import { useState } from "react";
import "./App.css";
import type { MessageListProp } from "./types/Message";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";

function App() {
  const [currentView, setCurrentView] = useState<"list" | "form">("list");

  const [messages, setMessages] = useState<MessageListProp>([
    {
      id: 1,
      username: "Testsson",
      text: "Test meddelande",
      date: new Date("2024-12-03T10:33:00"),
    },
    {
      id: 2,
      username: "Billy",
      text: "Billys meddelande",
      date: new Date("2024-11-05T10:25:00"),
    },
    {
      id: 3,
      username: "Ulla",
      text: "Ullas meddelande",
      date: new Date("2025-10-05T12:00:00"),
    },
  ]);

  const handleSubmit = (username: string, messageText: string) => {
    const newMessage = {
      id: messages.length + 1,
      username,
      text: messageText,
      date: new Date(),
    };
    setMessages([...messages, newMessage]);

    setCurrentView("list");
  };

  const handleCancel = () => {
    setCurrentView("list");
  };

  if (currentView === "form") {
    return <MessageForm onSubmit={handleSubmit} onCancel={handleCancel} />;
  }

  return (
    <div>
      <button onClick={() => setCurrentView("form")}>Nytt meddelande</button>
      <MessageList messages={messages} />
    </div>
  );
}

export default App;

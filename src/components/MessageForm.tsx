import { useState } from "react";
import type { MessageFormProps } from "../types/Message";

const MessageForm = ({ onSubmit, onCancel }: MessageFormProps) => {
  const [username, setUsername] = useState("");
  const [messageText, setMessageText] = useState("");
  const [errors, setErrors] = useState({ username: "", message: "" });

  const handlePublish = () => {
    const newErrors = { username: "", message: "" };
    if (!username) newErrors.username = "Användarnamn saknas, välj ett användarnamn";
    if (!messageText) newErrors.message = "Meddelande saknas";

    if (newErrors.username || newErrors.message) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(username, messageText);
    setUsername("");
    setMessageText("");
  };

  return (
    <div>
      <input
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setErrors({ ...errors, username: "" });
        }}
      />
      {errors.username && <p>{errors.username}</p>}

      <input
        placeholder="Meddelande"
        value={messageText}
        onChange={(e) => {
          setMessageText(e.target.value);
          setErrors({ ...errors, message: "" });
        }}
      />
      {errors.message && <p>{errors.message}</p>}
      <button onClick={handlePublish}>Publicera</button>
      <button onClick={onCancel}>Avbryt</button>
    </div>
  );
};

export default MessageForm;

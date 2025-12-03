import type { Message } from "../types/Message";

const MessageItem = ({ message }: { message: Message }) => {
  return (
    <section data-testid="message-item">
      <article>{message.text}</article>
      <article>{message.username}</article>
      <article>
        {message.date.toLocaleString("sv-SE", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </article>
    </section>
  );
};

export default MessageItem;

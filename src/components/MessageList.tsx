import type { MessageListProp } from "../types/Message";
import MessageItem from "./MessageItem";

const MessageList = ({ messages }: { messages: MessageListProp }) => {
  if (messages.length === 0) {
    return <p>Du har inga meddelanden att visa</p>;
  }

  const sortedMessages = [...messages].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div>
      {sortedMessages.map((message) => (
        <MessageItem key={message.username} message={message} />
      ))}
    </div>
  );
};

export default MessageList;

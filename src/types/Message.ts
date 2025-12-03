export interface Message {
  id: number;
  username: string;
  text: string;
  date: Date;
}

export type MessageListProp = Message[];

export interface MessageFormProps {
  onSubmit: (username: string, messageText: string) => void;
  onCancel: () => void;
}


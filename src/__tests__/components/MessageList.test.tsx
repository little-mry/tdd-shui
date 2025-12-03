import { render, screen } from "@testing-library/react";
import MessageList from "../../components/MessageList";
import type { MessageListProp } from "../../types/Message";

describe("MessageList", () => {
  const mockMessages: MessageListProp = [
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
  ];

  describe("US2: View all messages", () => {
    it("should show message list", () => {
      render(<MessageList messages={mockMessages} />);

      expect(screen.getByText("Billy")).toBeInTheDocument();
      expect(screen.getByText("Testsson")).toBeInTheDocument();
    });

    it("should sort message list (latest first)", () => {
      render(<MessageList messages={mockMessages} />);

      const messageItems = screen.getAllByTestId('message-item')

      expect(messageItems[0]).toHaveTextContent('Ulla')
      expect(messageItems[1]).toHaveTextContent('Testsson')
      expect(messageItems[2]).toHaveTextContent('Billy')
    });

    it('should show "no messages"-message if list is empty', () => {
      render(<MessageList messages={[]} />);

      expect(screen.getByText(/inga meddelanden/i)).toBeInTheDocument();
    });
  });
});

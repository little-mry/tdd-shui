import { render, screen } from "@testing-library/react";
import MessageList from "../../components/MessageList";

describe("MessageList", () => {
  describe('"US2: View Messages"', () => {
    it('should show "no messages"-message if list is empty', () => {
      render(<MessageList messages={[]} />);

      expect(screen.getByText(/inga meddelanden/i)).toBeInTheDocument();
    });
  });
});

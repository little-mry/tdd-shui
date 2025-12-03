import { render, screen } from "@testing-library/react";
import MessageForm from "../../components/MessageForm";
import userEvent from "@testing-library/user-event";

describe("MessageForm", () => {
  const mockHandleSubmit = vi.fn();
  const mockHandleCancel = vi.fn();
  const renderMessageForm = () => {
    const user = userEvent.setup();
    render(
      <MessageForm onSubmit={mockHandleSubmit} onCancel={mockHandleCancel} />
    );

    return {
      user,
      usernameInput: () => screen.getByPlaceholderText(/namn/i),
      messageInput: () => screen.getByPlaceholderText(/meddelande/i),
      publishBtn: () => screen.getByRole("button", { name: /publicera/i }),
    };
  };

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });
  
    describe("US1: Post message", () => {
      it("should show errors for empty fields", async () => {
        const { user, publishBtn } = renderMessageForm();

        await user.click(publishBtn());

        expect(screen.getByText(/användarnamn saknas/i)).toBeInTheDocument();
        expect(screen.getByText(/meddelande saknas/i)).toBeInTheDocument();
      });

      it("should clear errors when user starts typing", async () => {
        const { user, messageInput, publishBtn } = renderMessageForm();

        await user.click(publishBtn());
        expect(screen.getByText(/meddelande saknas/i)).toBeInTheDocument();

        await user.type(messageInput(), "hej");
        expect(
          screen.queryByText(/meddelande saknas/i)
        ).not.toBeInTheDocument();
      });

      it("should call onSubmit with correct data when form is valid", async () => {
        const { user, usernameInput, messageInput, publishBtn } =
          renderMessageForm();

        await user.type(usernameInput(), "pelle");
        await user.type(messageInput(), "hej");
        await user.click(publishBtn());

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });


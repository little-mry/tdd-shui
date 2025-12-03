import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App - Integration", () => {
  const renderApp = () => {
    const user = userEvent.setup();
    render(<App />);

    return {
      user,
      newMsgBtn: () => screen.getByRole("button", { name: /nytt meddelande/i }),
      publishBtn: () => screen.getByRole("button", { name: /publicera/i }),
      queryPublishBtn: () =>
        screen.queryByRole("button", { name: /publicera/i }),
      usernameInput: () => screen.getByPlaceholderText(/namn/i),
      messageInput: () => screen.getByPlaceholderText(/meddelande/i),
    };
  };

  describe("US3: Navigation", () => {
    it("should show message list view by default", () => {
      const { newMsgBtn, queryPublishBtn } = renderApp();
      expect(newMsgBtn()).toBeInTheDocument();
      expect(queryPublishBtn()).not.toBeInTheDocument();
    });

    it(" should clear input data if user returns from new message-view without posting", async () => {
      const { user, newMsgBtn, usernameInput, messageInput } = renderApp();

      await user.click(newMsgBtn());
      await user.type(usernameInput(), "TestUser");
      await user.type(messageInput(), "Test meddelande");

      const cancelBtn = screen.getByRole("button", { name: /avbryt/i });
      await user.click(cancelBtn);

      await user.click(newMsgBtn());

      const newUsernameInput = screen.getByPlaceholderText(/namn/i);
      expect(newUsernameInput).toHaveValue("");
    });
  });

  describe("US1: Post Message", () => {
    it("US1 + US3: should return to list view, and display new message first in list after posting", async () => {
      const { user, newMsgBtn, usernameInput, messageInput, publishBtn } =
        renderApp();

      await user.click(newMsgBtn());
      await user.type(usernameInput(), "NewUser");
      await user.type(messageInput(), "Senaste meddelandet");
      await user.click(publishBtn());
      const messageItems = screen.getAllByTestId("message-item");

      expect(screen.getByText("NewUser")).toBeInTheDocument();
      expect(screen.getByText("Senaste meddelandet")).toBeInTheDocument();
      expect(messageItems[0]).toHaveTextContent("NewUser");
    });
  });
});

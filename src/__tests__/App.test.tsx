import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
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

    it('should show write form (new message component) then clicking on "new message"-button', async () => {
      const { user, newMsgBtn, publishBtn } = renderApp();
      await user.click(newMsgBtn());
      expect(publishBtn()).toBeInTheDocument();
    });

    it("should return to list view after posting message", async () => {
      const { user, newMsgBtn, publishBtn, queryPublishBtn, usernameInput, messageInput } = renderApp();
      await user.click(newMsgBtn());


      await user.type(usernameInput(), "TestUser");
      await user.type(messageInput(), "Test meddelande");
      await user.click(publishBtn());

      expect(newMsgBtn()).toBeInTheDocument();
      expect(queryPublishBtn()).not.toBeInTheDocument();
    });

    it("should clear input data if user returns from new message-view without posting", async () => {
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
});

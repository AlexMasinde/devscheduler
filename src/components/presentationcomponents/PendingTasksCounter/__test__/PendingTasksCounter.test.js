import { render, screen } from "@testing-library/react";
import PendingTasksCounter from "../PendingTasksCounter";

test("Get props from parent and display", () => {
  render(<PendingTasksCounter count="113" />);
  const showCount = screen.getByText(/113/i);
  expect(showCount).toBeInTheDocument();
  screen.debug(showCount);
});

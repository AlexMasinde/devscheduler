import { render, screen } from "@testing-library/react";
import PendingTasksCounter from "../PendingTasksCounter";

test("Get props from parent and display", () => {
  render(<PendingTasksCounter title="title" count="113" />);
  const showCount = screen.getByText(/113/i);
  const title = screen.getByText(/title/i);
  expect(showCount).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});

import { render, screen } from "../../../utils/test";
import LatestTasks from "../LatestTasks";

jest.mock("../../../firebase", () => ({
  database: {
    tasks: jest.fn(() => ({
      orderBy: jest.fn(),
      limit: jest.fn(),
      onSnapshot: jest.fn(() => Promise.resolve("resolved")),
    })),
  },
}));

describe("Tests for LatestTasks component", () => {
  it("Renders", () => {
    render(<LatestTasks />);
    expect(
      screen.getByRole("heading", { name: "Latest Tasks" })
    ).toBeInTheDocument();
  });
});

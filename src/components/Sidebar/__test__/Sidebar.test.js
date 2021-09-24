import { render, screen } from "../../../utils/test";
import Sidebar from "../Sidebar";

jest.mock("../../../firebase", () => ({}));

describe("Tests for sidebar component", () => {
  it("Renders", () => {
    render(<Sidebar />);
    const headerElement = screen.getByRole("heading", { name: "Categories" });
    const logoElement = screen.getByAltText("schedular home");
    expect(headerElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
  });
});

// import { render, screen } from "../../../utils/test";
// import LatestContainer from "../LatestContainer";

// // jest.mock("../../../firebase", () => ({
// //   database: {
// //     tasks: jest.fn(() => ({
// //       orderBy: jest.fn(() => ({
// //         limit: jest.fn(() => ({
// //           onSnapshot: jest.fn(() => Promise.resolve("resolved")),
// //         })),
// //       })),
// //     })),
// //   },
// // }));

// jest.mock("../../../firebase", () => ({}));

// describe("Unit tests for latestcontainer component", () => {
//   it("Renders", () => {
//     render(<LatestContainer />);
//     expect(
//       screen.getByRole("heading", { name: "Latest Tasks" })
//     ).toBeInTheDocument();
//     expect(
//       screen.getByRole("heading", { name: "Latest Articles" })
//     ).toBeInTheDocument();
//   });
// });

// describe('Unit tests for task list item' , () => {
//     it("Edit activity button launches add activity modal", () => {
//         renderActivityView();
//         const editElement = screen.getByAltText(/edit activity/i);
//         fireEvent.click(editElement);
//         setTimeout(() => {
//           const headerElement = screen.getByRole("heading", {
//             name: "Edit Activity",
//           });
//           const inputElement = screen.getByText(selectedActivity.name);
//           expect(headerElement).toBeInTheDocument();
//           expect(inputElement).toBeInTheDocument();
//         }, 600);
//       });

//       it("Open edit task modal when edit task is clicked", () => {
//         renderActivityView();
//         const editElements = screen.getAllByAltText(/edit task/i);
//         fireEvent.click(editElements[0]);
//         setTimeout(() => {
//           const headerElement = screen.getByRole("heading", { name: "Edit Task" });
//           const buttonElement = screen.getByRole("button", { name: "Update" });
//           expect(buttonElement).toBeInTheDocument();
//           expect(headerElement).toBeInTheDocument();
//         }, 600);
//       });
// })

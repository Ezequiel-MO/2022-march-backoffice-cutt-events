import { render, screen, fireEvent } from "@testing-library/react";
import ClientMasterForm from "../../../../screens/clients/ClientSpecs/ClientMasterForm";
import "@testing-library/jest-dom/extend-expect";

const submitForm = jest.fn();
const client = {
  firstName: "Jonas",
  familyName: "Smith",
  email: "",
  clientCompany: "",
  phone: "",
  quoteLanguage: "",
  country: "",
};

test("ClientMasterForm validation", () => {
  render(<ClientMasterForm submitForm={submitForm} client={client} />);

  const btnSubmit = screen.getByTestId("btn-submit");

  fireEvent.click(btnSubmit);

  expect(submitForm).toHaveBeenCalledTimes(0);
});

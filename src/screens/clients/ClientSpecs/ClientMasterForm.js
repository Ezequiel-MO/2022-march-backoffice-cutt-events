import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";

const ClientMasterForm = ({ submitForm }) => {
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          familyName: "",
          email: "",
          clientCompany: "",
          phone: "",
          quoteLanguage: "",
          country: "",
        }}
        onSubmit={(values) => {
          submitForm(values, "clients");
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          familyName: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          clientCompany: Yup.string().required("Required"),
          phone: Yup.string(),
          quoteLanguage: Yup.string(),
          country: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
            <Form>
              <fieldset className="grid grid-cols-2 gap-2">
                <legend>
                  <h1 className="text-2xl mb-4">Account Manager Details</h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="First Name"
                    name="firstName"
                    placeholder="ex : Jonas ..."
                    type="text"
                  />

                  <TextInput
                    label="Family Name"
                    name="familyName"
                    placeholder="ex : Smith ..."
                    type="text"
                  />

                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="ex : jonas.smith@example.com ..."
                    type="text"
                  />
                  <TextInput
                    label="Phone Nr"
                    name="phone"
                    placeholder="+46 1234 12345 ..."
                    type="text"
                  />
                  <TextInput
                    label="Quote Language"
                    name="quoteLanguage"
                    placeholder="EN"
                    type="text"
                  />

                  <TextInput
                    label="Client Company"
                    name="clientCompany"
                    placeholder="Client Name"
                    type="text"
                  />

                  <TextInput
                    label="Country"
                    name="country"
                    placeholder="ie UK, DK, ES, RO ..."
                    type="text"
                  />

                  <div className="form-group mb-6">
                    <div className="flex space-x-2 justify-center mt-4">
                      <button
                        className="inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        type="submit"
                      >
                        Save and submit
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ClientMasterForm;

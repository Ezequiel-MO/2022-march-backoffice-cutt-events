import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";

const HotelMasterForm = ({ submitForm }) => {
  return (
    <>
      <Formik
        initialValues={{
          code: "",
          accountManager: "",
          groupName: "",
          groupLocation: "",
          arrivalDay: "",
          departureDay: "",
          nrPax: "",
          clientCo: "",
          clientAccManager: "",
        }}
        onSubmit={(values) => {
          submitForm(values, "projects");
        }}
        validationSchema={Yup.object({
          code: Yup.string().required("Required"),
          accountManager: Yup.string().required("Required"),
          groupName: Yup.string().required("Required"),
          groupLocation: Yup.string().required("Required"),
          arrivalDay: Yup.string().required("Required"),
          departureDay: Yup.string().required("Required"),
          nrPax: Yup.number().required("Required"),
          clientCo: Yup.string().required("Required"),
          clientAccManager: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
            <Form>
              <fieldset className="grid grid-cols-2 gap-2">
                <legend>
                  <h1 className="text-2xl mb-4">Base Project</h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="Code"
                    name="code"
                    placeholder="Project Code"
                    type="text"
                  />

                  <TextInput
                    label="Account Manager"
                    name="accountManager"
                    placeholder="Account Manager ..."
                    type="text"
                  />

                  <TextInput
                    label="Group Name"
                    name="groupName"
                    placeholder="ex : Pfizer group ..."
                    type="text"
                  />

                  <TextInput
                    label="Location"
                    name="groupLocation"
                    placeholder="ex : Barcelona ..."
                    type="text"
                  />

                  <div className="flex align-center justify-between mt-4 mb-4">
                    <TextInput
                      label="Arrival Day"
                      name="arrivalDay"
                      className="form-control          
                    block
                    w-1/3
                    px-3
                    py-1.5
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="date"
                    />

                    <TextInput
                      label="Departure Day"
                      name="departureDay"
                      className="form-control     
                    block
                    w-1/3
                    px-3
                    py-1.5
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="date"
                    />
                  </div>
                  <div className="form-group mb-6">
                    <TextInput
                      label="Nr Of Pax"
                      name="nrPax"
                      placeholder="ex : 103 ..."
                      type="number"
                    />
                    <TextInput
                      label="Client Company"
                      name="clientCo"
                      placeholder="ex : Best Events ..."
                      type="text"
                    />
                    <TextInput
                      label="Client Account Manager"
                      name="clientAccManager"
                      placeholder="ex : Jonas Smith"
                      type="text"
                    />
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

export default HotelMasterForm;

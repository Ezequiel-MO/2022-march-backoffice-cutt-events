import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";

const TransferMasterForm = ({ submitForm }) => {
  return (
    <>
      <Formik
        initialValues={{
          city: "",
          company: "",
          transfer_in_out: "",
          dispo_4h: "",
          hextra: "",
          hextra_night: "",
          dispo_5h_out: "",
          dispo_4h_airport: "",
          dispo_4h_night: "",
          transfer_in_out_night: "",
          dispo_6h_night: "",
          vehicleType: "",
          vehicleCapacity: "",
        }}
        onSubmit={(values) => {
          submitForm(values, "transfers");
        }}
        validationSchema={Yup.object({
          city: Yup.string().required("Required"),
          company: Yup.string().required("Required"),
          transfer_in_out: Yup.number().required("Required"),
          dispo_4h: Yup.number().required("Required"),
          hextra: Yup.number().required("Required"),
          hextra_night: Yup.number().required("Required"),
          dispo_5h_out: Yup.number().required("Required"),
          dispo_4h_airport: Yup.number().required("Required"),
          dispo_4h_night: Yup.number().required("Required"),
          transfer_in_out_night: Yup.number().required("Required"),
          dispo_6h_night: Yup.number().required("Required"),
          vehicleType: Yup.string().required("Required"),
          vehicleCapacity: Yup.number().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
            <Form>
              <fieldset className="grid grid-cols-2 gap-4">
                <legend>
                  <h1 className="text-2xl mb-4">Transfer List</h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Ex: Lisboa"
                    type="text"
                  />
                  <TextInput
                    label="Company"
                    name="company"
                    placeholder="Transportation company ..."
                    type="text"
                  />
                  <TextInput
                    label="Transfer in/out"
                    name="transfer_in_out"
                    placeholder="ex : 70"
                    type="number"
                  />
                  <TextInput
                    label="Dispo 4h"
                    name="dispo_4h"
                    placeholder="ex : 220"
                    type="number"
                  />
                  <TextInput
                    label="Hextra"
                    name="hextra"
                    placeholder="ex : 50"
                    type="number"
                  />
                  <TextInput
                    label="Hextra night"
                    name="hextra_night"
                    placeholder="ex : 58"
                    type="number"
                  />

                  <TextInput
                    label="Dispo 5h out"
                    name="dispo_5h_out"
                    placeholder="ex : 260"
                    type="number"
                  />
                </div>

                <div className="form-group mb-6">
                  <TextInput
                    label="Dispo 4h airport"
                    name="dispo_4h_airport"
                    placeholder="ex : 280"
                    type="number"
                  />

                  <TextInput
                    label="Dispo 4h night"
                    name="dispo_4h_night"
                    placeholder="ex : 250"
                    type="number"
                  />

                  <TextInput
                    label="Transfer in/out night"
                    name="transfer_in_out_night"
                    placeholder="ex : 82"
                    type="number"
                  />

                  <TextInput
                    label="Dispo 6h night"
                    name="dispo_6h_night"
                    placeholder="ex : 340"
                    type="number"
                  />

                  <TextInput
                    label="Vehicle type"
                    name="vehicleType"
                    placeholder="ex : Bus"
                    type="text"
                  />

                  <TextInput
                    label="vehicle capacity"
                    name="vehicleCapacity"
                    placeholder="ex : 30"
                    type="text"
                  />
                  <div className="flex space-x-2 justify-center mt-7">
                    <button
                      className="inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      type="submit"
                    >
                      Save and submit
                    </button>
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

export default TransferMasterForm;

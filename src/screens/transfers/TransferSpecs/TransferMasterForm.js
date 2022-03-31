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
          <Form className="form">
            <fieldset>
              <legend>
                <h4>Transfers form</h4>
              </legend>
              <div className="form-inputs">
                <div>
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Ex: Lisboa"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Company"
                    name="company"
                    placeholder="Transportation company ..."
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Transfer in/out"
                    name="transfer_in_out"
                    placeholder="ex : 70"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Dispo 4h"
                    name="dispo_4h"
                    placeholder="ex : 220"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Hextra"
                    name="hextra"
                    placeholder="ex : 50"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Hextra night"
                    name="hextra_night"
                    placeholder="ex : 58"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Dispo 5h out"
                    name="dispo_5h_out"
                    placeholder="ex : 260"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Dispo 4h airport"
                    name="dispo_4h_airport"
                    placeholder="ex : 280"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Dispo 4h night"
                    name="dispo_4h_night"
                    placeholder="ex : 250"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Transfer in/out night"
                    name="transfer_in_out_night"
                    placeholder="ex : 82"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Dispo 6h night"
                    name="dispo_6h_night"
                    placeholder="ex : 340"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Vehicle type"
                    name="vehicleType"
                    placeholder="ex : Bus"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="vehicle capacity"
                    name="vehicleCapacity"
                    placeholder="ex : 30"
                    type="text"
                  />
                </div>
                <div>
                  <button type="submit">Save In DataBase</button>
                </div>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TransferMasterForm;

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
          <Form className="form">
            <fieldset>
              <legend>
                <h4>Base Project</h4>
              </legend>
              <div className="form-inputs">
                <div>
                  <TextInput
                    label="Code"
                    name="code"
                    placeholder="Project Code"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Account Manager"
                    name="accountManager"
                    placeholder="Account Manager ..."
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Group Name"
                    name="groupName"
                    placeholder="ex : Pfizer group ..."
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Location"
                    name="groupLocation"
                    placeholder="ex : Barcelona ..."
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Arrival Day"
                    name="arrivalDay"
                    placeholder="ex : 07-10-2023 ..."
                    type="date"
                  />
                </div>
                <div>
                  <TextInput
                    label="Departure Day"
                    name="departureDay"
                    placeholder="ex : 09-10-2023 ..."
                    type="date"
                  />
                </div>
                <div>
                  <TextInput
                    label="Nr Of Pax"
                    name="nrPax"
                    placeholder="ex : 103 ..."
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Client Company"
                    name="clientCo"
                    placeholder="ex : Best Events ..."
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Client Account Manager"
                    name="clientAccManager"
                    placeholder="ex : Jonas Smith"
                    type="text"
                  />
                </div>
                <div className="hotel-button">
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

export default HotelMasterForm;

import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextField, Autocomplete } from "@mui/material";

import { TextInput } from "../../../UI/inputs/TextInput";
import { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";

const HotelMasterForm = ({ submitForm }) => {
  const [accManagers, setAccManagers] = useState([]);
  const clients = [
    { name: "Mette Insgtrup", value: 1, company: "Better Travel" },
    { name: "Helen Lindgren", value: 2, company: "Ciceron" },
    { name: "Claudia Vasilescu", value: 3, company: "Business Travel" },
  ];

  useEffect(() => {
    // fetch accManagers from db
    const getClients = async () => {
      const response = await baseAPI.get("v1/clients");
      const transformedResponse = response.data.data.data.map((client) => {
        return {
          name: `${client.firstName} ${client.familyName}`,
          value: client._id,
          company: client.clientCompany,
        };
      });
      console.log(transformedResponse);
    };
    getClients();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          code: "",
          accountManager: "",
          clientAccountManager: 1,
          groupName: "",
          groupLocation: "",
          arrivalDay: "",
          departureDay: "",
          nrPax: "",
        }}
        onSubmit={(values) => {
          /*  submitForm(values, "projects");  */
          console.log("values", values);
        }}
        validationSchema={Yup.object({
          code: Yup.string().required("Required"),
          accountManager: Yup.string().required("Required"),
          groupName: Yup.string().required("Required"),
          groupLocation: Yup.string().required("Required"),
          arrivalDay: Yup.string().required("Required"),
          departureDay: Yup.string().required("Required"),
          nrPax: Yup.number().required("Required"),
        })}
      >
        {({ handleChange, values, setFieldValue }) => (
          <div className="grid grid-cols-2 gap-2 px-6 block rounded-lg shadow-lg bg-white">
            <Form>
              <fieldset>
                <legend>
                  <h1 className="text-2xl mb-4">Base Project</h1>
                </legend>
                <div className="form-group">
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <TextInput
                      label="Code"
                      name="code"
                      placeholder="ex : BEM2022001..."
                      className="form-control          
                    block
                    w-2/4
                    px-3
                    py-1.5
                    my-1
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="text"
                    />

                    <TextInput
                      label="Number of Pax"
                      name="nrPax"
                      placeholder="ex : 20..."
                      className="form-control     
                    block
                    w-1/4
                    px-3
                    py-1.5
                    my-1
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="text"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <TextInput
                      label="Arrival Day"
                      name="arrivalDay"
                      className="form-control          
                    block
                    w-1/3
                    px-3
                    py-1.5
                    my-1
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
                    my-1
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
                  <TextInput
                    label="Account Manager"
                    name="accountManager"
                    placeholder="Account Manager ..."
                    type="text"
                  />

                  <Autocomplete
                    id="clientAccountManager"
                    name="clientAccountManager"
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    options={accManagers}
                    groupBy={(option) => option.company}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      console.log("value", value);
                      setFieldValue("clientAccountManager", value?.value || 1);
                    }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Client Account Manager"
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "0.3rem",
                          border: "1px solid #ea5933",
                          "& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor: "#ea5933",
                            },
                          },
                          "& .MuiOutlinedInput-root:focus": {
                            "& > fieldset": {
                              borderColor: "#ea5933",
                            },
                          },
                          "& .MuiFormLabel-root:focus": {
                            color: "#ea5933",
                            fontSize: "1.5rem",
                            marginBottom: "1.5rem",
                          },
                        }}
                        {...params}
                        onChange={handleChange}
                        margin="normal"
                        label=""
                        fullWidth
                        value={values?.clientAccountManager}
                      />
                    )}
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

export default HotelMasterForm;

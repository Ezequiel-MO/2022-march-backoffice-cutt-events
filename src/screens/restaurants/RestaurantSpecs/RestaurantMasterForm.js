import { useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";
import { TextAreaInput } from "../../../UI/inputs/TextAreaInput";
import { Icon } from "@iconify/react";

const RestaurantMasterForm = ({ submitForm }) => {
  const fileInput = useRef();
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          city: "",
          longitude: "",
          latitude: "",
          price: "",
          textContent: "",
        }}
        onSubmit={(values) => {
          submitForm(values, fileInput.current.files, "restaurants");
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          longitude: Yup.number().required("Required"),
          latitude: Yup.number().required("Required"),
          price: Yup.number().required("Required"),
          textContent: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
            <Form>
              <fieldset className="grid grid-cols-2 gap-4">
                <legend>
                  <h1 className="text-2xl mb-4">General Restaurant Data</h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Restaurant Name"
                    type="text"
                  />

                  <TextInput
                    label="Coords Longitude"
                    name="longitude"
                    placeholder="ex : 2.154007"
                    type="number"
                  />
                  <TextInput
                    label="Coords Latitude"
                    name="latitude"
                    placeholder="ex : 41.390205"
                    type="number"
                  />
                  <TextInput
                    label="3-Course Menu Cost"
                    name="price"
                    placeholder="ex : 35"
                    type="number"
                  />
                  <button
                    className="mt-5 block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="submit"
                  >
                    Save and submit
                  </button>
                </div>
                <div className="form-group mb-6">
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Restaurant City"
                    type="text"
                  />
                  <TextAreaInput
                    className="
                     form-control
                     h-52
                     block
                     w-full
                     px-3
                     py-1.5
                     text-base
                     font-normal
                     text-gray-700
                     bg-white bg-clip-padding
                     border border-solid border-gray-300
                     rounded
                     transition
                     ease-in-out
                     mt-4
                     
                     focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none
                   "
                    name="textContent"
                    placeholder="Write a description"
                    type="text"
                  />

                  <div className="flex align-center justify-start">
                    <label htmlFor="file-upload" className="inline-block mx-4">
                      <Icon icon="akar-icons:cloud-upload" width="40" />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      ref={fileInput}
                      name="imageContentUrl"
                      multiple
                    />
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

export default RestaurantMasterForm;

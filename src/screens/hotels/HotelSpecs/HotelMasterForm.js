import { useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";
import { TextAreaInput } from "../../../UI/inputs/TextAreaInput";
import { CheckboxInput } from "../../../UI/inputs/CheckboxInput";
import { Icon } from "@iconify/react";

const HotelMasterForm = ({ submitForm }) => {
  const fileInput = useRef();
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          city: "",
          address: "",
          numberStars: "",
          numberRooms: "",
          checkin_out: "",
          meetingRooms: "",
          wheelChairAccessible: "",
          wifiSpeed: "",
          swimmingPool: "",
          restaurants: "",
          longitude: "",
          latitude: "",
          textContent: "",
          introduction: "",
        }}
        onSubmit={(values) => {
          submitForm(values, fileInput.current.files, "hotels");
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
          numberStars: Yup.number().required("Required"),
          numberRooms: Yup.number().required("Required"),
          checkin_out: Yup.string().required("Required"),
          meetingRooms: Yup.number().required("Required"),
          wheelChairAccessible: Yup.boolean().required("Required"),
          wifiSpeed: Yup.string().required("Required"),
          swimmingPool: Yup.string().required("Required"),
          restaurants: Yup.string().required("Required"),
          longitude: Yup.number().required("Required"),
          latitude: Yup.number().required("Required"),
          introduction: Yup.string(),
          textContent: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
            <Form>
              <fieldset className="grid grid-cols-3 gap-4">
                <legend>
                  <h4>General Hotel data</h4>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="Name"
                    name="name"
                    className="form-control
                      block
                      w-full
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
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Hotel Excelsior - 4star Superior"
                    type="text"
                  />
                  <TextInput
                    label="City"
                    name="city"
                    className="form-control
                      block
                      w-full
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
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="City"
                    type="text"
                  />
                  <TextInput
                    label="Address"
                    name="address"
                    className="form-control
                      block
                      w-full
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
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : c/Pina 57"
                    type="text"
                  />
                  <TextInput
                    label="Category"
                    name="numberStars"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 4"
                    type="number"
                  />
                  <TextInput
                    label="Total Number Of Rooms"
                    name="numberRooms"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 100 rooms"
                    type="number"
                  />
                  <TextInput
                    label="Check-in and Check-out"
                    name="checkin_out"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 12noon/3pm"
                    type="text"
                  />
                </div>
                <div className="form-group mb-6">
                  <TextInput
                    label="Nr Of Meeting Rooms"
                    name="meetingRooms"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 4"
                    type="number"
                  />
                  <TextInput
                    label="Wi-Fi Speed"
                    name="wifiSpeed"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : Available all rooms/common areas"
                    type="text"
                  />
                  <TextInput
                    label="Swimming Pool"
                    name="swimmingPool"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 1x Outdoor/ 1x Indoor"
                    type="text"
                  />
                  <TextInput
                    label="Restaurants"
                    name="restaurants"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 1x Restaurant/ 1x Bar"
                    type="text"
                  />
                  <TextInput
                    label="Coords Longitude"
                    name="longitude"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 2.154007"
                    type="number"
                  />
                  <TextInput
                    label="Coords Latitude"
                    name="latitude"
                    className="form-control
                    block
                    w-full
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex : 41.390205"
                    type="number"
                  />
                </div>
                <div className="form-group">
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
                    my-7
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    name="textContent"
                    placeholder="Write a description"
                    type="text"
                  />
                  <CheckboxInput
                    label="Wheelchair Accessible"
                    name="wheelChairAccessible"
                  />
                  <label htmlFor="file-upload" className="mx-3">
                    <Icon icon="akar-icons:cloud-upload" width="40" />
                    <span>Upload Images</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    ref={fileInput}
                    name="imageContentUrl"
                    multiple
                  />
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    className="inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="submit"
                  >
                    Save In DataBase
                  </button>
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

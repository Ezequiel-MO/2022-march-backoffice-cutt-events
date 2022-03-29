import { useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";
import { TextAreaInput } from "../../../UI/inputs/TextAreaInput";
import { CheckboxInput } from "../../../UI/inputs/CheckboxInput";

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
          <Form className="form">
            <fieldset>
              <legend>
                <h4>General Hotel data</h4>
              </legend>
              <div className="form-inputs">
                <div>
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Hotel Excelsior - 4star Superior"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="City"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Address"
                    name="address"
                    placeholder="ex : c/Pina 57"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Category"
                    name="numberStars"
                    placeholder="ex : 4"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Total Number Of Rooms"
                    name="numberRooms"
                    placeholder="ex : 100 rooms"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Check-in and Check-out"
                    name="checkin_out"
                    placeholder="ex : 12noon/3pm"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Nr Of Meeting Rooms"
                    name="meetingRooms"
                    placeholder="ex : 4"
                    type="number"
                  />
                </div>
                <div>
                  <CheckboxInput
                    label="Wheelchair Accessible"
                    name="wheelChairAccessible"
                  />
                </div>
                <div>
                  <TextInput
                    label="Wi-Fi Speed"
                    name="wifiSpeed"
                    placeholder="ex : Available all rooms/common areas"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Swimming Pool"
                    name="swimmingPool"
                    placeholder="ex : 1x Outdoor/ 1x Indoor"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Restaurants"
                    name="restaurants"
                    placeholder="ex : 1x Restaurant/ 1x Bar"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Coords Longitude"
                    name="longitude"
                    placeholder="ex : 2.154007"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Coords Latitude"
                    name="latitude"
                    placeholder="ex : 41.390205"
                    type="number"
                  />
                </div>
              </div>
              <div className="form-inputs">
                <div>
                  <TextAreaInput
                    className="text-area-input-hotel"
                    name="introduction"
                    placeholder="Write an intro"
                    type="text"
                  />
                </div>
                <div>
                  <TextAreaInput
                    className="text-area-input-hotel"
                    name="textContent"
                    placeholder="Write a description"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    {/*  <Icon icon="akar-icons:cloud-upload" width="40" /> */}
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

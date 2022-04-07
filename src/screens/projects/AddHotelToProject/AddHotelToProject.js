import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../UI/inputs/TextInput";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";
import { useDispatch } from "react-redux";
import { ADD_HOTEL_TO_PROJECT } from "../../../redux/features/CurrentProjectSlice";

const AddHotelToProject = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const addHotelWithPricesToProject = async (values) => {
    try {
      const hotel = await baseAPI.get(`/v1/hotels/${params.hotelId}`);
      const hotelWithPrices = {
        ...hotel.data.data.data,
        price: [values],
      };
      dispatch(ADD_HOTEL_TO_PROJECT(hotelWithPrices));
      await baseAPI.patch(`/v1/hotels/${params.hotelId}`, {
        price: [values],
      });

      toast.success("Hotel Added", toastOptions);
      let moreHotels = prompt("Would you like to add more hotels ?", "yes/no");
      if (moreHotels === "yes") {
        navigate("/hotel/list");
      } else {
        navigate("/project");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>
        Add rates to {location.state.hotelName && location.state.hotelName}
      </h2>
      <Formik
        initialValues={{
          DUInr: "",
          DUIprice: "",
          breakfast: "",
          DoubleRoomNr: "",
          DoubleRoomPrice: "",
          DailyTax: "",
        }}
        onSubmit={(values) => {
          addHotelWithPricesToProject(values);
        }}
        validationSchema={Yup.object({
          DUInr: Yup.number(),
          DUIprice: Yup.number(),
          breakfast: Yup.number(),
          DoubleRoomNr: Yup.number(),
          DoubleRoomPrice: Yup.number(),
          DailyTax: Yup.number(),
        })}
      >
        {(formik) => (
          <Form>
            <fieldset>
              <div>
                <div>
                  <TextInput
                    label="Number of DUIs"
                    name="DUInr"
                    placeholder="Ex. 40"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Rate per DUI"
                    name="DUIprice"
                    placeholder="Rate per night per room"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Breakfast"
                    name="breakfast"
                    placeholder="If included, enter 0"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Number of Double Rooms"
                    name="DoubleRoomNr"
                    placeholder="Number of Double Rooms"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Rate per Double Room"
                    name="DoubleRoomPrice"
                    placeholder="Rate per night per room"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="City Tax"
                    name="DailyTax"
                    placeholder="City Tax p.person per night"
                    type="number"
                  />
                </div>
              </div>

              <div className="button">
                <button type="submit">Add Hotel to Project</button>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddHotelToProject;

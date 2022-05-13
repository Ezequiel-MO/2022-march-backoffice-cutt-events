import * as yup from "yup";

export const restaurantSchema = yup.object().shape({
  restName: yup.string().required("Please enter a restaurant name"),
  city: yup.string().required("Please enter a city"),
  longitude: yup.number().required("Please enter a longitude"),
  latitude: yup.number().required("Please enter a latitude"),
  price: yup.number().required("Please enter a price"),
  textContent: yup.string(),
});

export const restNameSchema = yup.object().shape({
  restName: yup.string().required(),
});

export const restaurantValidations = [
  {
    input: "restName",
    message: "Please insert a restaurant name",
    status: false,
  },
  {
    input: "longitude",
    message: "Please insert the restaurant coords",
    status: false,
  },
  {
    input: "latitude",
    message: "Please insert the restaurant coords",
    status: false,
  },
  { input: "price", message: "Please add menu price", status: false },
  { input: "city", message: "Please add city", status: false },
  { input: "textContent", message: "Please add a description", status: false },
];

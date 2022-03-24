import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://cuttevents.herokuapp.com",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmEwMjJhOThjYzM2MWVkYzE4Y2E5NiIsImlhdCI6MTY0ODEyMTgwNiwiZXhwIjoxNjU1ODk3ODA2fQ.-X73stoUzrJ2zlFlUN-C0jdHpKLDvuYhpbPJ5HEsH-E",
  },
});

export default baseAPI;

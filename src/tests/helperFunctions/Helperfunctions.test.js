import {
  computeTotalDays,
  whichDay,
} from "../../helperFunctions/helperFunctions";

describe("Testing computeTotalDays", () => {
  test("must output the difference between 2 dates", () => {
    const startDate = "2022-04-30";
    const endDate = "2022-05-02";
    const expected = 3;

    const actual = computeTotalDays(startDate, endDate);
    expect(actual).toBe(expected);
  });
});

describe("Testing whichDay", () => {
  test("must return Arrival Day if counter = 1", () => {
    const counter = 1;
    const daydifference = 3;
    const expected = "Arrival Day";
    const actual = whichDay(counter, daydifference);
    expect(actual).toBe(expected);
  });
  test("must return Departure Day if counter = daydifference", () => {
    const counter = 3;
    const daydifference = 3;
    const expected = "Departure Day";
    const actual = whichDay(counter, daydifference);
    expect(actual).toBe(expected);
  });
  test("must return Day 2 if counter is 2", () => {
    const counter = 2;
    const daydifference = 3;
    const expected = "Day 2";
    const actual = whichDay(counter, daydifference);
    expect(actual).toBe(expected);
  });
});

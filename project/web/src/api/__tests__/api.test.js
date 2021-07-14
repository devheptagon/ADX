/* eslint-disable jest/valid-expect */
import { getAbout } from "../api";

describe("api", () => {
  test("getAbout testing", async () => {
    const response = await getAbout();
    expect(response).toBe("this is about");
  });
});

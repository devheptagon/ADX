import { getAdverts } from "../api";

describe("api", () => {
  test("getAdverts", async () => {
    const res = await getAdverts(
      ["Restaurant", "Bar"],
      ["Greater London", "East Midlands"]
    ); //
    console.dir(res.length);
    expect(true);
  });
});

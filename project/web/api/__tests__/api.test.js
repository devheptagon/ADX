import { getAdverts } from "../api";

describe("api", () => {
  test("getAdverts", async () => {
    const res = await getAdverts(["Restaurant"], ["Greater London"]); //
    console.dir(res.length);
    expect(true);
  });
});

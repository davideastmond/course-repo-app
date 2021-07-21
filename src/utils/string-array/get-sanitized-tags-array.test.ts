import { getArrayOfInterestTagsFromString } from "./get-sanitized-tags-array";
test("Sanitizes and returns correct array", () => {
  const input = "do re  Me, abc, 1 2  3,xyz ";
  const result = getArrayOfInterestTagsFromString(input);
  expect(result).toEqual(["do re me", "abc", "1 2 3", "xyz"]);
});

test("Sanitizes and returns correct array - trailing comma", () => {
  const input = "alpha, BETA, gamma, delta,   ";
  const result = getArrayOfInterestTagsFromString(input);
  expect(result).toEqual(["alpha", "beta", "gamma", "delta"]);
});

test("Sanitizes and returns correct array - sing element", () => {
  const input = "Alpha";
  const result = getArrayOfInterestTagsFromString(input);
  expect(result).toEqual(["alpha"]);
});

export {
  assert,
  assertEquals,
} from "https://deno.land/std@0.114.0/testing/asserts.ts";
export { test } from "https://deno.land/x/unitest@v1.0.0-beta.41/mod.ts";
import {
  defineExpect,
  jestExtendedMatcherMap,
  jestMatcherMap,
} from "https://deno.land/x/unitest@v1.0.0-beta.41/mod.ts";

export const expect = defineExpect({
  matcherMap: {
    ...jestMatcherMap,
    ...jestExtendedMatcherMap,
  },
});

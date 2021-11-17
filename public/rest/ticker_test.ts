// deno-lint-ignore-file camelcase
import { fetchTicker } from "./ticker.ts";
import {
  assert,
  isBoolean,
  isDate,
  isNumber,
  isObject,
} from "../../dev_deps.ts";
import { ALL_PAIRS } from "../../constants.ts";
Deno.test({
  name: "fetchTicker",
  fn: async () => {
    const { success, payload } = await fetchTicker({
      book: "btc_usd",
    });

    assert(isBoolean(success));
    assert(isObject(payload));

    const { book, volume, high, last, low, vwap, ask, bid, created_at } =
      payload;

    assert(ALL_PAIRS.includes(book as never));
    assert(isNumber(volume));
    assert(isNumber(high));
    assert(isNumber(last));
    assert(isNumber(low));
    assert(isNumber(vwap));
    assert(isNumber(ask));
    assert(isNumber(bid));
    assert(isDate(created_at));
  },
});

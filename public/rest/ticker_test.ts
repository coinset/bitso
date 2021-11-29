// deno-lint-ignore-file camelcase
import { fetchTicker } from "./ticker.ts";
import { expect, test } from "../../dev_deps.ts";
import { ALL_PAIRS } from "../../constants.ts";

test({
  name: "fetchTicker",
  fn: async () => {
    const { success, payload } = await fetchTicker({
      book: "btc_usd",
    });

    expect(success).toBeBoolean();
    expect(payload).toBeObject();

    const { book, volume, high, last, low, vwap, ask, bid, created_at } =
      payload;

    expect(book).toBeOneOf(ALL_PAIRS);
    expect(volume).toBeNumber();
    expect(high).toBeNumber();
    expect(last).toBeNumber();
    expect(low).toBeNumber();
    expect(vwap).toBeNumber();
    expect(ask).toBeNumber();
    expect(bid).toBeNumber();
    expect(created_at).toBeValidDate();
  },
});

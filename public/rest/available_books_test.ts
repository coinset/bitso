import { fetchAvailableBooks } from "./available_books.ts";
import { expect, test } from "../../dev_deps.ts";
import { ALL_PAIRS } from "../../constants.ts";

test({
  name: "fetchAvailableBooks",
  fn: async () => {
    const { success, payload } = await fetchAvailableBooks();

    expect(success).toBeBoolean();
    expect(payload).toBeArray();

    payload.forEach(({
      book,
      minimum_amount,
      maximum_amount,
      minimum_price,
      maximum_price,
      minimum_value,
      maximum_value,
      tick_size,
      default_chart,
      fees,
    }) => {
      expect(book).toBeOneOf(ALL_PAIRS);
      expect(minimum_amount).toBeNumber();
      expect(maximum_amount).toBeNumber();
      expect(minimum_price).toBeNumber();
      expect(maximum_price).toBeNumber();
      expect(minimum_value).toBeNumber();
      expect(maximum_value).toBeNumber();
      expect(tick_size).toBeNumber();
      expect(default_chart).toBeOneOf(["candle", "depth"]);
      expect(fees).toBeObject();

      // deno-lint-ignore camelcase
      const { flat_rate, structure } = fees;
      expect(flat_rate).toBeObject();

      const { maker, taker } = flat_rate;
      expect(maker).toBeNumber();
      expect(taker).toBeNumber();
      expect(structure).toBeArray();

      structure.forEach(({ maker, taker, volume }) => {
        expect(maker).toBeNumber();
        expect(taker).toBeNumber();
        expect(volume).toBeNumber();
      });
    });
  },
});

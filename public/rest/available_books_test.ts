import { fetchAvailableBooks } from "./available_books.ts";
import { assert, isBoolean, isNumber, isObject } from "../../dev_deps.ts";
import { ALL_PAIRS } from "../../constants.ts";
Deno.test({
  name: "fetchAvailableBooks",
  fn: async () => {
    const { success, payload } = await fetchAvailableBooks();

    assert(isBoolean(success));
    assert(Array.isArray(payload));

    payload.forEach(
      (
        {
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
        },
      ) => {
        assert(ALL_PAIRS.includes(book as never));
        assert(isNumber(minimum_amount));
        assert(isNumber(maximum_amount));
        assert(isNumber(minimum_price));
        assert(isNumber(maximum_price));
        assert(isNumber(minimum_value));
        assert(isNumber(maximum_value));
        assert(isNumber(tick_size));
        assert(["candle", "depth"].includes(default_chart));
        assert(isObject(fees));

        // deno-lint-ignore camelcase
        const { flat_rate, structure } = fees;
        assert(isObject(flat_rate));

        const { maker, taker } = flat_rate;
        assert(isNumber(maker));
        assert(isNumber(taker));
        assert(Array.isArray(structure));

        structure.forEach(({ maker, taker, volume }) => {
          assert(isNumber(maker));
          assert(isNumber(taker));
          assert(isNumber(volume));
        });
      },
    );
  },
});

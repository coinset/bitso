// deno-lint-ignore-file ban-types
import { BASE_URL, fetch } from "../../constants.ts";
import { AVAILABLE_BOOKS } from "./constants.ts";
import { isString } from "https://deno.land/x/isx@v1.0.0-beta.6/mod.ts";
import { BitsoPair } from "../../constants.ts";

type AvailableBooksResponse = {
  success: boolean;
  payload: {
    book: BitsoPair | (string & {});
    minimum_amount: number;
    maximum_amount: number;
    minimum_price: number;
    maximum_price: number;
    minimum_value: number;
    maximum_value: number;
    tick_size: number;
    default_chart: "candle" | "depth" | (string & {});
    fees: {
      flat_rate: { maker: number; taker: number };
      structure: { maker: number; taker: number; volume: number }[];
    };
  }[];
};

async function fetchAvailableBooks(): Promise<AvailableBooksResponse> {
  const url = new URL(AVAILABLE_BOOKS, BASE_URL);
  const res = await fetch(url.toString());

  const text = await res.text();

  return JSON.parse(text, (key, value) => {
    if (
      [
        "minimum_amount",
        "maximum_amount",
        "minimum_price",
        "maximum_price",
        "minimum_value",
        "maximum_value",
        "tick_size",
        "maker",
        "volume",
        "taker",
      ].includes(key) && isString(value)
    ) {
      return Number(value);
    }

    return value;
  });
}

export { fetchAvailableBooks };
export type { AvailableBooksResponse };

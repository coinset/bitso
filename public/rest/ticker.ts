// deno-lint-ignore-file ban-types camelcase
import { BASE_URL, fetch } from "../../constants.ts";
import { TICKER } from "./constants.ts";
import { isString } from "https://deno.land/x/isx@v1.0.0-beta.6/mod.ts";
import { BitsoPair } from "../../constants.ts";
import { parseError } from "../parse.ts";

type TickerOptions = {
  book: BitsoPair | (string & {});
};

type TickerResponse = {
  success: boolean;
  payload: {
    /**
     * Order book symbol
     */
    book: BitsoPair | (string & {});

    /**
     * Last 24 hours volume
     */
    volume: number;

    /**
     * Last 24 hours price high
     */
    high: number;

    /**
     * Last traded price
     */
    last: number;

    /**
     * Last 24 hours price low
     */
    low: number;

    /**
     * Last 24 hours volume weighted average price
     */
    vwap: number;

    /**
     * Lowest sell order
     */
    ask: number;

    /**
     * Highest buy order
     */
    bid: number;

    /**
     * Timestamp at which the ticker was generated
     */
    created_at: Date;
  };
};

/**
 * @throws Error - Network Error, Internal Error
 */
async function fetchTicker(
  { book }: TickerOptions,
): Promise<TickerResponse> {
  const url = new URL(TICKER, BASE_URL);

  url.searchParams.set("book", book);
  const res = await fetch(url.toString());
  const text = await res.text();

  if (!res.ok) {
    const { error } = parseError(text);
    throw Error(error.message);
  }

  return JSON.parse(text, (key, value) => {
    if (
      [
        "volume",
        "high",
        "last",
        "low",
        "vwap",
        "ask",
        "bid",
      ].includes(key) && isString(value)
    ) {
      return Number(value);
    }

    if (key === "created_at" && isString(value)) {
      return new Date(value);
    }

    return value;
  });
}

export { fetchTicker };
export type { TickerOptions, TickerResponse };

export const BASE_URL = "https://api.bitso.com/v3/";

import type {
  aave,
  ars,
  bat,
  bch,
  brl,
  btc,
  chz,
  comp,
  dai,
  eth,
  link,
  ltc,
  mana,
  mxn,
  Pair,
  tusd,
  uni,
  usd,
  usdt,
  xrp,
} from "https://deno.land/x/cc_types@v1.0.0-beta.13/mod.ts";

export type BitsoPair =
  | Pair<eth | xrp | ltc | bch | bat | tusd | mana, btc>
  | Pair<
    | btc
    | eth
    | xrp
    | ltc
    | bch
    | tusd
    | mana
    | bat
    | dai
    | usd,
    mxn
  >
  | Pair<btc, dai>
  | Pair<
    | btc
    | usd
    | eth
    | dai,
    ars
  >
  | Pair<
    | usd
    | btc
    | eth,
    brl
  >
  | Pair<
    | btc
    | xrp
    | eth
    | mana
    | ltc
    | comp
    | link
    | uni
    | aave
    | chz,
    usd
  >
  | Pair<btc, usdt>;

export const ALL_PAIRS: BitsoPair[] = [
  "eth_btc",
  "xrp_btc",
  "ltc_btc",
  "bch_btc",
  "tusd_btc",
  "mana_btc",
  "bat_btc",

  "btc_mxn",
  "eth_mxn",
  "xrp_mxn",
  "ltc_mxn",
  "bch_mxn",
  "tusd_mxn",
  "mana_mxn",
  "bat_mxn",
  "dai_mxn",
  "usd_mxn",

  "btc_dai",

  "btc_ars",
  "usd_ars",
  "eth_ars",
  "dai_ars",

  "usd_brl",
  "btc_brl",
  "eth_brl",

  "btc_usd",
  "xrp_usd",
  "eth_usd",
  "mana_usd",
  "ltc_usd",
  "comp_usd",
  "link_usd",
  "uni_usd",
  "aave_usd",
  "chz_usd",

  "btc_usdt",
];

export const fetch = globalThis.fetch;

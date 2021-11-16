import { fetchAvailableBooks } from "./available_books.ts";

Deno.test({
  name: "fetchAvailableBooks",
  fn: async () => {
    await fetchAvailableBooks();
  },
});

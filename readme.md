# JELPI HIGHSCORE MOD

A quick and simple highscore table for Jelpi, created by integrating the [Lava Joe highscore table](https://github.com/pancelor/pico-8-highscore/tree/main?tab=readme-ov-file). The highscore data storage was moved from memory location `0x5e00` (cart data) to `0x5f80` (GPIO data), enabling external syncing.

A custom JavaScript function periodically syncs the GPIO state to a blob on val.town. While this approach has limitations (basic auth, concurrency issues, etc.), it works well for rapid prototyping.

The backend, written in Deno/Hono, is available [on val.town](https://www.val.town/x/Mal2994/jelpi/code/main.tsx). Due to val.town's size limits, the Pico-8 web export is hosted on GitHub and Cloudflare Pages.

**Key features for Pico-8 developers:**
- Seamlessly switch persistent state from cartdata (256 bytes) to GPIO (128 bytes).
- GPIO data can be processed externally (e.g., via REST APIs) using the `pico8_gpio` variable.
- Enables easy syncing of game state across multiple live Pico-8 instances.

This project does not explore syncing directly from IndexedDB, but that approach should also work. More backend solutions for Pico-8 games are encouraged, despite the limitations encountered here.

See [deploy.txt](deploy.txt) for deployment details. 
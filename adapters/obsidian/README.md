# Black Atom for Obsidian

A theme for [Obsidian](https://obsidian.md/) by Black Atom Industries. Black Atom ships as one
Obsidian theme; 32 themes across seven collections switch as variants within it.

## Available Themes

| Collection   | Variants                                               |
| ------------ | ------------------------------------------------------ |
| **Default**  | dark, dimmed-dark, light, dimmed-light                 |
| **Facility** | dark, dimmed-dark, light, dimmed-light                 |
| **Terra**    | spring, summer, fall, winter (dark/light)              |
| **JPN**      | koyo, sanshoku (dark/light), murasaki-dark, tsuki-dark |
| **Clay**     | dark, light                                            |
| **Minium**   | polymer, viridian (dark/light)                         |
| **Mono**     | dark, dimmed-dark, light, dimmed-light                 |

## Installation

Copy `theme.css` and `manifest.json` into your vault's theme directory:

```bash
mkdir -p "/path/to/vault/.obsidian/themes/Black Atom"
cp theme.css manifest.json "/path/to/vault/.obsidian/themes/Black Atom/"
```

Then in Obsidian: **Settings > Appearance > Theme > Black Atom**.

## Configuration

The theme works out of the box with the **Default Dark** and **Default Light**
variants.

To switch between all available theme variants, install the
[Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin
(recommended):

**Settings > Style Settings > Black Atom :: Variants**

## Development

This adapter uses a pure CSS template approach. Black Atom's core processes Eta templates to
generate per-theme CSS, and a build script assembles them into `theme.css`. You
need [Deno](https://deno.land/) installed.

Edit templates in `themes/` or styles in `styles/`, then run `deno task dev` from the repository
root. The shared watcher generates adapter files and assembles `theme.css`.

To copy each successful rebuild into a development vault, set `OBSIDIAN_DEV_VAULT` in the environment
or in `adapters/obsidian/.env` (see `.env.example`). Copying is opt-in and uses the theme name
**Black Atom Development**.

For a one-off generation of all adapters, including Obsidian assembly, from this directory:

```bash
deno run -A ../../core/src/tasks/generate.ts
```

## License

MIT

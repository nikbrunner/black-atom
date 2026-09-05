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

Edit templates in `themes/`, then build:

```bash
deno task build
```

For live development, set your vault path in `.env` (see `.env.example`) and run
watch mode. This copies the theme into your vault as **Black Atom Development**
on every rebuild:

```bash
cp .env.example .env
# Edit .env with your vault path
deno task dev
```

## License

MIT

# Black Atom tmux Themes

Beautiful tmux color schemes from the Black Atom Industries theme collection.

## Installation

Generate the theme files (requires [Deno](https://deno.land/)):

```bash
deno task generate
```

Then source your preferred theme in your `~/.tmux.conf`:

```bash
source-file /path/to/black-atom/adapters/tmux/themes/clay/black-atom-clay-dark.conf
```

## Available Themes

32 themes across seven collections:

### Default Collection

- `black-atom-default-dark` - Dark
- `black-atom-default-dimmed-dark` - Dimmed Dark
- `black-atom-default-light` - Light
- `black-atom-default-dimmed-light` - Dimmed Light

### Facility Collection

- `black-atom-facility-dark` - Dark
- `black-atom-facility-dimmed-dark` - Dimmed Dark
- `black-atom-facility-light` - Light
- `black-atom-facility-dimmed-light` - Dimmed Light

### Terra Collection

- `black-atom-terra-spring-dark` - Spring Dark
- `black-atom-terra-spring-light` - Spring Light
- `black-atom-terra-summer-dark` - Summer Dark
- `black-atom-terra-summer-light` - Summer Light
- `black-atom-terra-fall-dark` - Fall Dark
- `black-atom-terra-fall-light` - Fall Light
- `black-atom-terra-winter-dark` - Winter Dark
- `black-atom-terra-winter-light` - Winter Light

### JPN Collection

- `black-atom-jpn-koyo-dark` - Koyo Dark
- `black-atom-jpn-koyo-light` - Koyo Light
- `black-atom-jpn-murasaki-dark` - Murasaki Dark
- `black-atom-jpn-tsuki-dark` - Tsuki Dark
- `black-atom-jpn-sanshoku-dark` - Sanshoku Dark
- `black-atom-jpn-sanshoku-light` - Sanshoku Light

### Clay Collection

- `black-atom-clay-dark` - Dark
- `black-atom-clay-light` - Light

### Minium Collection

- `black-atom-minium-polymer-dark` - Polymer Dark
- `black-atom-minium-polymer-light` - Polymer Light
- `black-atom-minium-viridian-dark` - Viridian Dark
- `black-atom-minium-viridian-light` - Viridian Light

### Mono Collection

- `black-atom-mono-dark` - Dark
- `black-atom-mono-light` - Light
- `black-atom-mono-dimmed-dark` - Dimmed Dark
- `black-atom-mono-dimmed-light` - Dimmed Light

## What Gets Themed

The Black Atom tmux themes customize the following elements:

- **Status bar**: Background, foreground, left and right sections
- **Window status**: Active, inactive, activity, and bell states
- **Pane borders**: Active and inactive pane borders
- **Session switcher**: Selection highlighting (mode-style)
- **Messages**: Command messages and prompts
- **Display panes**: Pane number indicators (prefix + q)

## Requirements

- tmux 3.2 or newer (for full feature support)
- A terminal emulator with 256-color or true color support

## Customization

Each collection has its own styling philosophy:

- **JPN**: Balanced with unique accent colors
- **Clay**, **Minium**, **Mono**: Minimal contrast, subtle indicators
- **Facility**: Bold, technical appearance
- **Terra**: Natural, seasonal variations

## Development

Theme files are generated from templates through the Black Atom core CLI. To modify themes:

1. Edit the appropriate template file in `themes/*/collection.template.conf`
2. Run `deno task generate` to regenerate theme files (or `deno task dev` for watch mode)
3. Test the changes in tmux

## License

MIT License - see [LICENSE](LICENSE) file for details.

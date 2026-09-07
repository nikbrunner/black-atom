# Einheitliche Root-Commands für Black Atom

## Ziel

Die üblichen Entwicklerabläufe starten an der Repository-Root über `deno task`. Die Root koordiniert Pakete; jedes Paket besitzt seine eigenen ausführbaren Tasks. Deno und der Cargo-Workspace bleiben bestehen.

Leitprinzip ist die Vereinfachung des Monorepos: Eine eigene Konfiguration oder ein Task bleibt nur für eine tatsächliche Zuständigkeit bestehen. Direkte Aufrufe ersetzen reine Weiterleitungen. Gemeinsam benötigte Abläufe haben eine Implementierung. Interne Präfixe dienen nur den Hilfstasks, die danach noch nötig sind.

## Aktueller Stand

- `deno.json` bündelt bereits Entwicklung, Generierung, Prüfungen und Tests. Ein Root-Build und eine Root-Installation fehlen.
- `scripts/dev.ts` startet Adapter-Watcher, Monitor und Livery über Root-Aliase. Beim Ende eines Prozesses beendet der Runner die Prozessgruppe und meldet Erfolg, auch wenn ein Kind fehlgeschlagen ist.
- `core/src/tasks/dev.ts` beobachtet Themes und Adapter-Templates und regeneriert Ausgaben. Diese Funktion ist weiterhin relevant; der Root-Alias `dev:adapters` ist kein notwendiger Bestandteil ihrer Implementierung.
- `core/src/tasks/monitor.ts` startet Monitor-API und Vite. Der direkte Dev-Task in `core/monitor/deno.json` startet nur Vite.
- `livery/deno.json` besitzt App-Build und macOS-Installation. Die Installation baut zunächst alle konfigurierten Bundles und ersetzt anschließend die App unter `/Applications`. Die CLI wird dabei nicht installiert.
- Der Cargo-Workspace liegt bereits an der Root. Die Root-Prüfung umfasst bislang Deno; Root-Tests umfassen Deno und Rust.

## Vorgeschlagene Befehle

| Root-Task       | Verhalten                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`           | Theme-Watcher, vollständigen Monitor und Livery gemeinsam starten; alle Prozesse mit einem Abbruch beenden.                            |
| `build`         | Auslieferbare Livery-App und CLI bauen. Voraussetzungen und Generierung anhand der tatsächlichen Build-Abhängigkeiten berücksichtigen. |
| `install:macos` | Livery-App und CLI bauen und installieren. Kein Theme anwenden und kein Konfigurations-Setup ausführen.                                |
| `check`         | Deno-Prüfungen und die festgelegten Rust-Format-/Lint-Prüfungen ausführen.                                                             |
| `test`          | Deno- und Rust-Tests ausführen.                                                                                                        |

Generierung ist eine automatisch ausgeführte Voraussetzung von Entwicklung und Build, kein öffentlicher Root-Befehl. Direkte Aufrufe sind internen Hilfstasks vorzuziehen, wenn keine eigenständige Task nötig ist.

Diese Tabelle ist ein Vorschlag zur Review. Besonders der Umfang von `dev`, `build` und `install:macos` ist vor der Umsetzung zu bestätigen. Der Monitor-Build bleibt zunächst eine lokale Paketfunktion; er ist kein Bestandteil der Livery-Auslieferung.

## Zuständigkeiten

Die Root enthält kurze Weiterleitungen und nur dort eigene Orchestrierung, wo mehrere Pakete zusammenarbeiten. Core besitzt Generierung und Watcher. Das Monitor-Paket bietet einen vollständigen lokalen Entwicklungsstart einschließlich seiner benötigten API; die API-Implementierung kann weiter bei Core liegen. Livery besitzt seine App-spezifischen Entwicklungs-, Build- und Installationsschritte. Cargo bleibt für Rust-Pakete zuständig.

Alle bestehenden Tasks werden anhand ihrer Aufrufer eingeordnet: öffentlich, intern oder ungenutzt. Normale Entwicklerbefehle behalten klare Namen wie `dev`, `build` und `test`. Nur von anderen Tasks oder Werkzeugen benötigte Hilfstasks erhalten einheitlich den Präfix `internal:`, beispielsweise `internal:vite:dev`. Der Präfix kennzeichnet die Zielgruppe; er ist keine Zugriffssperre.

Root-Aliase wie `dev:adapters`, `dev:monitor` und `dev:livery` werden entsprechend ihrer tatsächlichen Nutzung ins zuständige Paket verlagert, als interne Hilfstasks gekennzeichnet oder entfernt. Paketlokal sinnvoll direkt nutzbare Befehle bleiben öffentlich. Dazu werden README-Dateien, Hooks, Tauri-Konfiguration und weitere Scripts mitgeprüft. Der Watcher selbst bleibt verfügbar.

Keine zusätzlichen Workspace-Werkzeuge, keine Änderung des Theme-Modells und keine Anpassung generierter Theme-Dateien von Hand. Die vorhandene Hook-Infrastruktur bleibt bestehen; Aufrufer entfernter Tasks und automatische Installations-Hooks werden ausdrücklich angepasst.

Die automatische Installation der normalen CLI durch `.claude/hooks/install-cli.sh` entfällt einschließlich ihrer Aktivierung in `.claude/settings.json` und `.pi/extensions/install-livery-cli/index.ts`. Zugehörige Tests in `core/src/tasks/install-livery-cli.test.ts` werden an den Zielzustand angepasst beziehungsweise zusammen mit ausschließlich dafür bestehendem Code entfernt. Installieren ist ein expliziter Root-Ablauf; Agent-Turns verändern die installierte CLI nicht.

## Umsetzungsschritte

1. **Task-Inventar abschließen.** Sämtliche Deno- und Cargo-Konfigurationen, ausführbare Scripts und ihre Aufrufer erfassen. Pro Task Zweck, Arbeitsverzeichnis, Voraussetzungen, Seiteneffekte und Zielzuständigkeit festhalten. Ungenutzte Scripts nur mit belegter fehlender Nutzung zur Entfernung vorsehen.
2. **Entwicklung durchgängig ordnen.** Paketlokale Starts herstellen und den Root-Start direkt damit verbinden. Hilfstasks mit `internal:` kennzeichnen und sämtliche Aufrufer aktualisieren. Überflüssige Root-Aliase entfernen. Fehlercodes erhalten und ausschließlich die eigenen Kindprozesse zuverlässig beenden.
3. **Build und Installation verbinden.** Paket-Builds über die Root erreichbar machen. Für macOS das tatsächlich benötigte App-Bundle gezielt bauen, damit ein separater DMG-Schritt die lokale Installation nicht unnötig blockiert. App und CLI getrennt behandeln und Teilerfolg bei Installationsfehlern sichtbar melden. Eine bestehende App erst nach erfolgreichem Build ersetzen.
4. **Prüfungen und Dokumentation angleichen.** Root-Prüfungen für beide Sprachen festlegen, ohne Paket-Tests doppelt laufen zu lassen. Root-README als Einstieg und Paket-READMEs für lokale Abläufe aktualisieren. Verweise auf entfernte Tasks bereinigen.

## Abnahme

- Von der Root startet `dev` die bestätigten Prozesse. Ein fehlerhafter Teilprozess ergibt einen Fehlerstatus; nach Abbruch bleiben keine zugehörigen Server zurück.
- Paketlokale Tasks funktionieren aus dem jeweiligen Paketverzeichnis. Der Monitor-Start stellt auch seine API bereit.
- `check`, `test` und `build` funktionieren von der Root mit dem dokumentierten Umfang. Die bereitgestellte Entwicklungs-CLI erhält Argumente unverändert.
- Ein fehlgeschlagener Build verändert keine installierte App. Eine fehlgeschlagene Teilinstallation wird eindeutig gemeldet.
- `install:macos` installiert die bestätigten Artefakte, führt aber kein Setup und kein Apply aus.
- Entfernte Task-Namen haben keine verbliebenen aktiven Aufrufer. Dokumentation und tatsächlich angebotene Tasks stimmen überein.
- Rein interne Hilfstasks tragen durchgängig `internal:`. Öffentliche Paketbefehle sind ohne Kenntnis interner Hilfstasks nutzbar.

## Verifikation und Grenzen

Prozess-Fixtures erhalten ihre benötigten Ausführungsrechte auch bei direkten `deno test -P`-Aufrufen in CI und Pre-Commit; ein funktionierender Root-Wrapper allein genügt nicht. Das Ende eines dauerhaft benötigten Dev-Teilprozesses beendet die übrigen eigenen Prozesse kontrolliert, auch bei Exit-Code 0. Fehlercodes bleiben erhalten. Einmalige erfolgreiche Build-Schritte gelten dagegen nicht als Ende der Dev-Session. Beide Fälle werden getrennt geprüft; ein Wechsel zu parallelen Deno-Tasks darf dieses Verhalten nicht unbeabsichtigt ändern.

Prozesssteuerung, Argumentweitergabe und Fehlerfälle mit kleinen kontrollierten Kindprozessen prüfen. Installationslogik gegen temporäre Ziele testen. Automatisierte Tests und Agent-Ausführungen von Entwicklungsstarts und Livery-Aufrufen verwenden ausschließlich temporäre Fixture-Homes und XDG-Verzeichnisse. Vom Nutzer gestartetes `deno task dev` verwendet dessen geerbte Benutzerumgebung. Die reale macOS-Installation ist ein gesonderter menschlicher Abnahmeschritt; im Rahmen dieser Planung wird nichts installiert.

Vor der Umsetzung die aktuelle offizielle Deno-/Tauri-Dokumentation für konkret gewählte Workspace- und Bundle-Aufrufe prüfen. Bestehende Root-Checks und Tests nach den jeweiligen Änderungen ausführen und etwaige bestehende Fehler getrennt ausweisen.

Root-`check` führt `deno check`, `deno lint`, `deno fmt --check`, `cargo fmt --check` und `cargo clippy --workspace --all-targets -- -D warnings` aus. Benötigte Frontend-Ausgaben werden vor Rust-Prüfungen und Tests automatisch gebaut, entsprechend der Voraussetzung in `.github/workflows/ci.yml`. CI verwendet dieselben Root-Abläufe; der bisherige direkte `vite:build`-Aufrufer wird aktualisiert. Abnahme aus einem Checkout ohne vorhandene Frontend- oder Cargo-Build-Ausgaben: `check`, `test` und `build` funktionieren ohne manuelle Vorbereitung. Generierung darf bei Fehlschlag keinen nachgelagerten Build starten.

## Review

Dieser Auftrag liefert den Plan und seine Plannotator-Review. Änderungen an Scripts oder Konfigurationen beginnen erst nach Freigabe. Dateien bleiben ungestaged; keine Commits im Planungsauftrag.

## Vollständiges Package-Task-Inventar

Jede Zeile benennt den Zielzustand. Bei vollständig gelöschten Dateien ersetzt die Datei-Entscheidung eine Aufzählung ihrer bisherigen Tasks. Für verbleibende Konfigurationen werden die einzelnen Tasks aufgeführt.

### Adapter-Konfigurationen vereinfachen

| Datei                         | Entscheidung                                                                | Funktion künftig                                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `adapters/ghostty/deno.json`  | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/herdr/deno.json`    | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/lazygit/deno.json`  | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/niri/deno.json`     | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/nvim/deno.json`     | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/obsidian/deno.json` | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Core-Generierung mit direkter CSS-Assemblierung; Style-Watching und optionales Vault-Kopieren im gemeinsamen Dev-Ablauf. |
| `adapters/tmux/deno.json`     | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/waybar/deno.json`   | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/wezterm/deno.json`  | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |
| `adapters/zed/deno.json`      | **Löschen**, einschließlich aller Task-Einträge und des Workspace-Eintrags. | Zentrale Generierung und Watcher in Core.                                                                                |

Die neun identischen `deno.json`-Dateien in Ghostty, Herdr, Lazygit, Niri, Neovim, tmux, Waybar, WezTerm und Zed sollen vollständig entfallen. Sie enthalten ausschließlich Weiterleitungen zur Core-Generierung und deren Watch-Modus. Die zugehörigen Einträge im Deno-Workspace werden entfernt. Adapter bleiben Eingabedaten und Templates für Core; ihre `black-atom-adapter.json`-Dateien bleiben erhalten.

Die Generierung und Beobachtung einzelner Adapter bleibt bei Bedarf über die vorhandene Core-Funktion möglich, ohne pro Adapter einen eigenen Deno-Task-Container vorzuhalten. Die folgende Tabelle nennt für jeden Adapter die vollständige Datei-Entfernung.

Auch Obsidians Deno-Konfiguration soll entfallen, sobald ihre verbleibenden Funktionen direkt eingebunden sind. Der bestehende Post-Generate-Hook wird auf den direkten Script-Aufruf umgestellt. Die CSS-Assemblierung bleibt im Adapter. Der separate Build-Wrapper entfällt zugunsten der zentralen Generierung mit genau einem anschließenden Assembly-Schritt. Der zusätzliche Dev-Ablauf beobachtet außerdem Styles und kann das Ergebnis in einen ausdrücklich konfigurierten Entwicklungs-Vault kopieren; diese Fähigkeiten werden im zentralen Entwicklungsablauf berücksichtigt. Das Kopieren bleibt opt-in. Die ausschließlich dafür verwendete dotenv-Abhängigkeit wird am tatsächlichen Aufrufort aufgelöst, ohne allein dafür einen Workspace-Member zu behalten.

Vor der Entfernung werden Arbeitsverzeichnis-Abhängigkeiten, Post-Generate-Aufrufe, Tests und Dokumentationsverweise geprüft. Die Abnahme umfasst die Generierung aller zehn Adapter und den gemeinsamen Watcher ohne Adapter-Workspace-Mitglieder, Änderungen an Obsidian-Styles sowie optionales Kopieren ausschließlich in einen temporären Test-Vault.

### `core/deno.json`

| Task heute                 | Aufruf heute                                                                              | Vorschlag und Zweck                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test`                     | `deno test --allow-all`                                                                   | Bleibt paketlokal; Tests ausführen.                                                                               |
| `schema`                   | `deno run --allow-read --allow-write src/lib/generate-schema.ts && deno fmt .`            | Bleibt paketlokal; Adapterschema erzeugen.                                                                        |
| `cli:compile`              | `deno compile --allow-read --allow-write --allow-env -o black-atom-core src/cli/index.ts` | Entfernung vorgeschlagen: Core-CLI-Binary; tatsächliche Veröffentlichungs-/Nutzungsverträge vor Umsetzung prüfen. |
| `cli:install`              | `cp black-atom-core /usr/local/bin/`                                                      | Entfernung vorgeschlagen: separate Core-CLI-Installation; tatsächliche Nutzung vor Umsetzung prüfen.              |
| `generate`                 | `deno run -A src/tasks/generate.ts`                                                       | Entfällt als manuell benötigter Task; Generator direkt in den abhängigen Ablauf integrieren.                      |
| `dev`                      | `deno run -A src/tasks/dev.ts`                                                            | Bleibt paketlokal; Paketentwicklung starten.                                                                      |
| `monitor`                  | `deno run -A src/tasks/monitor.ts`                                                        | Verlagern: vollständigen Monitor-Start im Monitor-Paket anbieten.                                                 |
| `publish`                  | `deno publish --allow-slow-types`                                                         | Bleibt paketlokal; Core veröffentlichen.                                                                          |
| `test:terminal-colors`     | `bash scripts/test-terminal-colors.sh`                                                    | Bleibt paketlokal; Terminalfarben prüfen.                                                                         |
| `test:terminal-colors:dev` | `deno run -A scripts/test-terminal-colors-dev.ts`                                         | Bleibt paketlokal; Terminalfarben interaktiv prüfen.                                                              |

### `core/monitor/deno.json`

| Task heute | Aufruf heute                 | Vorschlag und Zweck                                  |
| ---------- | ---------------------------- | ---------------------------------------------------- |
| `test`     | `deno test --allow-all`      | Bleibt paketlokal; Tests ausführen.                  |
| `dev`      | `deno run -A npm:vite`       | Ändert sich: Monitor-API und Vite gemeinsam starten. |
| `build`    | `deno run -A npm:vite build` | Bleibt paketlokal; Paket bauen.                      |

### `deno.json`

| Task heute      | Aufruf heute                                  | Vorschlag und Zweck                                                    |
| --------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| `dev`           | `deno run -A scripts/dev.ts`                  | Ändert sich: koordinierter Start einschließlich CLI-Neubau.            |
| `dev:adapters`  | `cd core && deno task dev`                    | Entfällt als öffentlicher Root-Alias; Watcher direkt koordinieren.     |
| `dev:monitor`   | `cd core && deno task monitor`                | Entfällt als Root-Alias; vollständiger lokaler Monitor-Start.          |
| `dev:livery`    | `cd livery && deno task dev`                  | Entfällt als Root-Alias; lokaler Livery-Start bleibt.                  |
| `generate`      | `cd core && deno task generate`               | Entfällt öffentlich; automatisch vor Builds und im Watcher.            |
| `check`         | `deno check && deno lint && deno fmt --check` | Ändert sich: abgestimmte Deno- und Rust-Prüfungen.                     |
| `cli`           | `cargo run -q -p livery-cli --`               | Entfällt: dev ist der einzige Entwicklungs-Task und baut auch die CLI. |
| `test`          | `deno test -P && cargo test`                  | Bleibt: Deno- und Rust-Tests.                                          |
| `install:hooks` | `git config core.hooksPath .githooks`         | Bleibt: explizite Einrichtung der Repository-Hooks.                    |

### `livery/deno.json`

| Task heute            | Aufruf heute                                                                                                                                           | Vorschlag und Zweck                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `cache`               | `deno cache --reload src/`                                                                                                                             | Entfernung vorgeschlagen: manueller Cache-Reload ist kein normaler Paketablauf.                                             |
| `dev`                 | `deno run -A npm:@tauri-apps/cli dev`                                                                                                                  | Bleibt paketlokal; Paketentwicklung starten.                                                                                |
| `airship`             | `deno run -A scripts/airship.ts`                                                                                                                       | Review: Spezial-Launcher, tatsächlichen Nutzen prüfen; kein Root-Einstieg.                                                  |
| `build`               | `deno run -A npm:@tauri-apps/cli build`                                                                                                                | Bleibt paketlokal; Paket bauen.                                                                                             |
| `vite:dev`            | `deno run -A npm:vite --port 1420`                                                                                                                     | Interner Werkzeugaufruf: direkt aufrufen, andernfalls internal:-Präfix. Tauri-/Adapter-Aufrufer gleichzeitig aktualisieren. |
| `vite:build`          | `deno run -A npm:vite build`                                                                                                                           | Interner Werkzeugaufruf: direkt aufrufen, andernfalls internal:-Präfix. Tauri-/Adapter-Aufrufer gleichzeitig aktualisieren. |
| `check`               | `deno check src/`                                                                                                                                      | Bleibt paketlokal; Paket prüfen.                                                                                            |
| `test`                | `deno test -P`                                                                                                                                         | Bleibt paketlokal; Tests ausführen.                                                                                         |
| `test:perf-benchmark` | `cd src-tauri && cargo run --bin perf-benchmark --release`                                                                                             | Bleibt paketlokal; Performance-Benchmark ausführen.                                                                         |
| `install:macos`       | `deno run -A npm:@tauri-apps/cli build && rm -rf /Applications/livery.app && cp -R ../target/release/bundle/macos/livery.app /Applications/livery.app` | Ändert sich: paketlokale App-Installation; Root koordiniert zusätzlich CLI-Installation.                                    |
| `dev:ui`              | `deno run -A npm:vite --port 1430 --open '/dev'`                                                                                                       | Bleibt paketlokal; UI separat entwickeln.                                                                                   |

### `adapters/zed/package.json`

| Task heute | Aufruf heute         | Vorschlag und Zweck                                                                                                                                                        |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | `prettier --write .` | Entfernung vorgeschlagen: Formatierung über die Root. Vorher Dateiabdeckung prüfen; Paketdatei und Prettier-Abhängigkeit nur entfernen, wenn keine andere Nutzung besteht. |

## Cargo-Konfigurationen

Cargo-Manifeste enthalten keine Deno-artige Task-Liste. Sie beschreiben Build-Ziele und Abhängigkeiten und bleiben erhalten.

| Datei                         | Inhalt und Zielzustand                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `Cargo.toml`                  | Bleibt: gemeinsamer Workspace für die drei Rust-Pakete.                                               |
| `livery/cli/Cargo.toml`       | Bleibt: Paket `livery-cli`, Binary `livery`, verwendet `livery_core`. Kein zweites CLI-Produkt nötig. |
| `livery/core/Cargo.toml`      | Bleibt: gemeinsame Domain-Bibliothek für GUI und CLI einschließlich eingebetteter Themes.             |
| `livery/src-tauri/Cargo.toml` | Bleibt: Tauri-GUI, Bibliotheksziel und Performance-Benchmark.                                         |

## Entwicklungs-CLI

`deno task dev` baut die CLI initial und erneut bei Änderungen an CLI, gemeinsamer Rust-Bibliothek, relevanten Manifesten und eingebetteten Theme-Ausgaben. Generierung muss abgeschlossen sein, bevor der darauf aufbauende Rust-Build startet. Schnelle Änderungen werden gebündelt; parallele CLI-Builds werden vermieden. Die Koordination mit dem Tauri-Build darf keine wiederholten unnötigen Builds verursachen.

Der CLI-Watcher beobachtet ausschließlich seine tatsächlichen Eingaben: `livery/cli/**`, `livery/core/**`, die relevanten Cargo-Manifeste und den Cargo-Lockfile sowie die von der gemeinsamen Bibliothek eingebetteten Adapter-Dateien. Build-Ausgaben und temporäre Dateien werden ausgeschlossen. Änderungen ausschließlich an GUI-Komponenten, GUI-CSS, Monitor oder Dokumentation lösen keinen CLI-Build aus. Theme-Quellen durchlaufen zunächst die Generierung; erst deren relevante Ausgaben lösen den CLI-Neubau aus. Abnahme: CLI-Code und eingebettete Themes lösen jeweils einen Build aus, eine reine GUI-Style-Änderung keinen.

Der bestehende Watcher in `core/src/tasks/adapters/watch.ts` ruft bereits nach der Generierung `cargo run ... reapply` auf. Dieser Aufruf wird in den gemeinsamen Ablauf integriert: Generierung → erfolgreicher Neubau → Reapply in derselben geerbten Benutzerumgebung wie Entwicklungs-GUI und Entwicklungs-CLI. Es gibt genau einen Verantwortlichen für diese Folge. Bei Generierungs- oder Buildfehlern wird weder Reapply noch eine veraltete CLI ausgeführt.

Die eingebetteten Dateien benötigen explizite Cargo-Invalidierung in der gemeinsamen Rust-Bibliothek, beispielsweise über ein kleines Build-Script mit `rerun-if-changed` für die eingebetteten Adapter-Verzeichnisse und Einzeldateien. Dies gilt für CLI und GUI. Die Abnahme verändert, ergänzt und löscht jeweils eine eingebettete Datei und prüft den resultierenden CLI-Inhalt und GUI-Katalog ohne manuelles Cargo-Clean. Ein reiner Dateiwatcher ohne nachgewiesene Neukompilierung genügt nicht.

`deno task dev` ist der einzige Entwicklungs-Einstieg an der Root. Paketlokale `dev`-Tasks bleiben für die gezielte Arbeit am jeweiligen Paket verfügbar; an der Root gibt es keine zusätzlichen Dev-Unterbefehle. Er startet GUI, Monitor und die benötigten Watcher und hält auch die Entwicklungs-CLI aktuell. Es gibt keinen zusätzlichen CLI-Dev-Task und keinen zweiten unabhängig gestarteten Build-Ablauf.

Die CLI selbst ist ein aufrufbares Programm, kein dauerhaft laufender Server. Der Dev-Ablauf stellt sie unter einem eindeutigen lokalen Namen `livery-dev` bereit und zeigt ihren konkreten Aufruf an. Der Launcher verwendet das von dev gebaute Binary und dieselbe geerbte Umgebung. Er baut nicht selbst. Während eines Builds oder nach einem Buildfehler meldet er unmittelbar den Zustand und startet kein veraltetes Binary; nach erfolgreichem Build kann der Aufruf wiederholt werden. Dev verwaltet dafür einen kleinen lokalen Bereitschaftszustand und entfernt die Freigabe beim Beenden. Kein zusätzlicher Server, keine Warteschlange und kein eigener IPC-Dienst. Der normale installierte Befehl `livery` bleibt unverändert. Der Dev-Start legt automatisch einen Symlink namens `livery-dev` zum lokalen Launcher in einem bestehenden Benutzer-Bin-Verzeichnis an, das bereits im PATH liegt. Dies ist ausdrücklich freigegeben. Die Shell-Konfiguration bleibt unverändert. Ein fremder vorhandener Befehl wird nicht überschrieben; ein eigener Link wird nachvollziehbar verwaltet. Bei mehreren Worktrees darf eine Session nicht den Link einer anderen unbemerkt übernehmen. Der Launcher verwendet die beim Dev-Start geerbten HOME-, XDG- und Konfigurationseinstellungen auch beim Aufruf aus einem zweiten Terminal. Tests verwenden temporäre Fixture-Homes und Bin-Verzeichnisse. Abnahme: Nach `deno task dev` lässt sich `livery-dev` in einem zweiten Terminal ohne Pfadangabe starten; der installierte Befehl `livery` bleibt unverändert.

Entwicklungs-GUI und Entwicklungs-CLI verwenden dieselbe beim Dev-Start geerbte Benutzer- und Konfigurationsumgebung. Vorhandene Adapter-Konfigurationen bleiben dadurch regulär erkennbar und nutzbar. Gesetzte und nicht gesetzte HOME-/XDG-Einstellungen werden beim zweiten Terminalaufruf konsistent übernommen. Nur Launcher, Bereitschaftszustand und GUI-Watch-Signal liegen in einem temporären Sitzungsverzeichnis; dessen Lebenszyklus wird getestet. Ein Kindprozess kann weder PATH noch Umgebungsvariablen seiner Elternshell ändern.

Sobald eine relevante Eingabeänderung erkannt wird, ist die bisherige CLI nicht mehr freigegeben, bereits während Debounce und Generierung. Erst die vollständig erfolgreiche Folge aus Generierung und Build gibt sie wieder frei. Abnahme: Aufruf während Debounce, Generierung und Kompilierung sowie nach Generierungsfehlern startet niemals das vorherige Binary.

Zusätzliche Abnahme: Änderung an CLI-Code sowie Änderung eines eingebetteten Themes getrennt prüfen. Der nächste Dev-CLI-Aufruf zeigt jeweils den neuen Stand; die installierte CLI bleibt unverändert. Fehlerhafter Quellcode ergibt einen sichtbaren Buildfehler.

## Entwicklungs-GUI sichtbar kennzeichnen

Die über den Entwicklungsablauf gestartete GUI trägt den Fenstertitel `Livery Dev` und zeigt zusätzlich dauerhaft eine eindeutige `Dev`-Kennzeichnung im vorhandenen Header. Beide Kennzeichnungen folgen dem tatsächlichen Entwicklungsmodus und erscheinen nicht in der installierten Release-App.

Abnahme: Installierte GUI und Entwicklungs-GUI gleichzeitig öffnen. Beide Fenster lassen sich ohne Blick auf Terminal, Pfad oder Prozessliste eindeutig unterscheiden. Fenstertitel und Header kennzeichnen die Entwicklungs-GUI gleichzeitig, auch nach einem Reload. Der Release-Build trägt an keiner der beiden Stellen eine Dev-Kennzeichnung.

use super::UpdateResult;

const APP_STR: &str = "system_appearance";

/// Toggle system-wide dark/light mode.
/// macOS: osascript. Linux/GNOME: gsettings. Other platforms: skipped.
pub fn update(appearance: &str) -> UpdateResult {
    update_with_commands(appearance, "osascript", "gsettings")
}

fn update_with_commands(
    appearance: &str,
    macos_command: &str,
    linux_command: &str,
) -> UpdateResult {
    let dark = match appearance {
        "dark" => true,
        "light" => false,
        other => return UpdateResult::error(APP_STR, format!("Unknown appearance: {other}")),
    };

    if cfg!(target_os = "macos") {
        update_macos(dark, macos_command)
    } else if cfg!(target_os = "linux") {
        update_linux(dark, linux_command)
    } else {
        UpdateResult::skipped(APP_STR, "Unsupported platform")
    }
}

fn update_macos(dark: bool, command: &str) -> UpdateResult {
    let script = format!(
        "tell application \"System Events\" to tell appearance preferences to set dark mode to {}",
        dark
    );

    match std::process::Command::new(command)
        .args(["-e", &script])
        .output()
    {
        Ok(output) if output.status.success() => {
            log::info!(
                "Set macOS appearance to {}",
                if dark { "dark" } else { "light" }
            );
            UpdateResult::done(APP_STR)
        }
        Ok(output) => {
            let stderr = String::from_utf8_lossy(&output.stderr);
            UpdateResult::error(APP_STR, format!("osascript failed: {stderr}"))
        }
        Err(e) => UpdateResult::error(APP_STR, format!("Failed to run osascript: {e}")),
    }
}

fn update_linux(dark: bool, command: &str) -> UpdateResult {
    let scheme = if dark { "prefer-dark" } else { "prefer-light" };

    match std::process::Command::new(command)
        .args(["set", "org.gnome.desktop.interface", "color-scheme", scheme])
        .output()
    {
        Ok(output) if output.status.success() => {
            log::info!("Set Linux appearance to {}", scheme);
            UpdateResult::done(APP_STR)
        }
        Ok(output) => {
            let stderr = String::from_utf8_lossy(&output.stderr);
            // gsettings not available likely means not GNOME — skip rather than error
            if stderr.contains("No such schema") || stderr.contains("not found") {
                UpdateResult::skipped(APP_STR, "GNOME settings not available (non-GNOME desktop?)")
            } else {
                UpdateResult::error(APP_STR, format!("gsettings failed: {stderr}"))
            }
        }
        Err(_) => UpdateResult::skipped(APP_STR, "gsettings not found (non-GNOME desktop?)"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::updaters::UpdateStatus;

    #[test]
    fn unknown_appearance_returns_error() {
        let result = update("banana");
        assert_eq!(result.status, UpdateStatus::Error);
        assert!(result.message.unwrap().contains("Unknown appearance"));
    }

    #[cfg(unix)]
    #[test]
    fn appearance_commands_receive_dark_and_light_and_report_failure() {
        use std::os::unix::fs::PermissionsExt;

        let sandbox = tempfile::tempdir().unwrap();
        let command = sandbox.path().join("appearance");
        let log = sandbox.path().join("arguments");
        for exit_code in [0, 1] {
            std::fs::write(
                &command,
                format!(
                    "#!/bin/sh\nprintf '%s\\n' \"$@\" > '{}'\nexit {exit_code}\n",
                    log.display()
                ),
            )
            .unwrap();
            std::fs::set_permissions(&command, std::fs::Permissions::from_mode(0o755)).unwrap();
            let command = command.to_str().unwrap();
            for (dark, expected) in [(true, "true"), (false, "false")] {
                let status = if exit_code == 0 {
                    UpdateStatus::Done
                } else {
                    UpdateStatus::Error
                };
                assert_eq!(update_macos(dark, command).status, status);
                assert_eq!(std::fs::read_to_string(&log).unwrap(), format!(
                    "-e\ntell application \"System Events\" to tell appearance preferences to set dark mode to {expected}\n"
                ));
                assert_eq!(update_linux(dark, command).status, status);
                let scheme = if dark { "prefer-dark" } else { "prefer-light" };
                assert_eq!(
                    std::fs::read_to_string(&log).unwrap(),
                    format!("set\norg.gnome.desktop.interface\ncolor-scheme\n{scheme}\n")
                );
            }
        }
    }
}

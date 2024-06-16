use anyhow::Result;
use chrono::Utc;
use log::LevelFilter;
use serde::{Deserialize, Serialize};

use crate::utils::{help, mdirs};

#[derive(Debug, Clone, Deserialize, Serialize)]
enum DbType {
    Sqlite,
    Postgres,
}

/// ### `rrecai.yaml` schema
#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IRrecai {
    // App data root dir
    pub app_home_dir: Option<String>,
    // App start at...
    pub up_on: Option<usize>,
    // App configuration updated on
    pub update_on: Option<usize>,

    // The name of main winodow
    pub main_window_title: Option<String>,
    // The init page of application to display for user
    pub start_page: Option<String>,
    //not show the window on launch
    pub enable_silent_start: Option<bool>,
    /// can the app auto startup
    pub enable_auto_launch: Option<bool>,
    // hotkey map - format: {func},{key}
    pub hotkeys: Option<Vec<String>>,
    // Whether to automatically check for updates
    pub auto_check_update: Option<bool>,
    /// Is random port enabled
    pub enable_random_port: Option<bool>,

    // i18n
    pub language: Option<String>,
    // `light` or `dark` or `system`
    pub theme_mode: Option<String>,
    // The icon for the Tray
    pub tray_icon: Option<String>,

    // Server address - such as: 127.0.0.1
    pub app_server_url: Option<String>,
    // app listening port for app singleton - such as : 33748
    pub app_singleton_port: Option<u16>,

    /// App log level
    /// silent | error | warn | info | debug | trace
    pub app_log_level: Option<String>,
    // Log cleaning,
    // 0: No cleaning |  1: 7 days | 2: 30 days | 3: 90 days
    pub auto_log_clean: Option<i32>,

    // db type
    pub db_type: Option<DbType>,
    // db path
    pub db_path: Option<String>,
}

impl IRrecai {
    /// Save Rrecai App Config
    pub fn save_file(&self) -> Result<()> {
        help::save_yaml(&mdirs::rrecai_path()?, &self, Some("# Rrecai Config"))
    }

    pub fn template() -> Self {
        let now_usize = Utc::now().timestamp() as usize;
        Self {
            main_window_title: Some("Rrecai".into()),
            language: Some("zh".into()),
            theme_mode: Some("system".into()),
            start_page: Some("/".into()),
            tray_icon: Some("monochrome".into()),
            enable_auto_launch: Some(false),
            enable_silent_start: Some(false),
            enable_random_port: Some(false),
            auto_check_update: Some(true),
            auto_log_clean: Some(3),
            db_type: Some(DbType::Sqlite),
            up_on: Some(now_usize),
            update_on: Some(now_usize),
            ..Self::default()
        }
    }
    /// Attempt to obtain the value of the singleton port before initialization
    pub fn get_singleton_port() -> u16 {
        #[cfg(not(feature = "rrecai-dev"))]
        const SERVER_PORT: u16 = 33748;
        #[cfg(feature = "rrecai-dev")]
        const SERVER_PORT: u16 = 64337;

        match mdirs::rrecai_path().and_then(|path| help::read_yaml::<IRrecai>(&path)) {
            Ok(config) => config.app_singleton_port.unwrap_or(SERVER_PORT),
            Err(_) => SERVER_PORT, // No need to log error
        }
    }

    // Get the log level
    pub fn get_log_level(&self) -> LevelFilter {
        if let Some(level) = self.app_log_level.as_ref() {
            match level.to_lowercase().as_str() {
                "silent" => LevelFilter::Off,
                "error" => LevelFilter::Error,
                "warn" => LevelFilter::Warn,
                "info" => LevelFilter::Info,
                "debug" => LevelFilter::Debug,
                "trace" => LevelFilter::Trace,
                _ => LevelFilter::Info,
            }
        } else {
            LevelFilter::Info
        }
    }
}

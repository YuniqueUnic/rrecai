use std::sync::Arc;

use once_cell::sync::OnceCell;
use parking_lot::Mutex;
use rusqlite::Connection;

use super::{draft::Draft, rrecai::IRrecai};

pub struct AppConfig {
    rrecai_config: Draft<IRrecai>,
    db_config: Arc<Mutex<Connection>>,
}

impl AppConfig {
    pub fn global() -> &'static AppConfig {
        static CONFIG: OnceCell<AppConfig> = OnceCell::new();

        CONFIG.get_or_init(|| AppConfig {
            rrecai_config: todo!(),
            db_config: todo!(),
        })
    }

    pub fn rrecai() -> Draft<IRrecai> {
        Self::global().rrecai_config.clone()
    }

    pub fn database() -> Arc<Mutex<Connection>> {
        Self::global().db_config.clone()
    }
}

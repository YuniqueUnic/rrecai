use anyhow::{Context, Error, Result};
use std::sync::Arc;

use parking_lot::Mutex;
use rusqlite::{params, Connection};

use super::model::ChatSegment;

pub struct DB_Service {
    pub db: Arc<Mutex<Connection>>,
}

impl DB_Service {
    pub fn new() -> Result<Self> {
        let db = Connection::open("chat.db")?;
        let sql = "CREATE TABLE IF NOT EXISTS chathistory
        (
            id          INTEGTER PRIMARY KEY    NOT NULL,
            sender      TEXT                    NOT NULL    DEFAULT system,
            message     TEXT,
            timestamp   DATETIME                            DEFAULT datetime('now','utc'),
            delivered   BOOLEAN                             DEFAULT 0,    
        );";
        let params = params![];
        db.execute(sql, params)?;
        Ok(DB_Service {
            db: Arc::new(Mutex::new(db)),
        })
    }

    pub async fn get_segements_by_sender(&self, sender: &str) -> Result<String> {
        let connection = self.db.lock();
        let sql = "SELECT * FROM chathistory WHERE sender =?1;";
        let params = params![sender];
        connection
            .query_row(sql, params, |row| row.get::<_, String>(0))
            .with_context(|| format!("Fail to get chat segement by the sender: {}", sender))
    }

    pub async fn get_message_by_id(&self, id: u32) -> Result<String> {
        let connection = self.db.lock();
        let sql = "SELECT  message FROM chathistory WHERE id = ?1;";
        let params = params![id];
        connection
            .query_row(sql, params, |row| row.get::<_, String>(0))
            .with_context(|| format!("Fail to get chat message by the id: {}", id))
    }

    pub async fn insert_new_segment(&self, seg: ChatSegment) -> Result<ChatSegment> {
        let connection = self.db.lock(); // Assuming async lock
        let ChatSegment {
            id,
            sender,
            message,
            timestamp,
            delivered,
        } = &seg; // Deconstruct the struct

        let sql = "INSERT INTO chathistory (id, sender, message, timestamp, delivered) VALUES (?1, ?2, ?3, ?4, ?5);";
        let params = params![id, sender, message, timestamp, delivered];
        connection.execute(sql, params).context(format!(
            "Failed to insert new segment into chathistory: {:#?}",
            &seg
        ))?;

        Ok(seg)
    }
}

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatSegment {
    pub id: u32,
    pub sender: String,
    pub message: String,
    pub timestamp: String,
    pub delivered: bool,
}

use anyhow::{bail, Context, Result};
use serde::{Deserialize, Serialize};

const SERVICE_URL: &str = "http://127.0.0.1:33748";

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct ResponseBody {
    pub core_type: Option<String>,
    pub bin_path: String,
    pub config_dir: String,
    pub log_file: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct JsonResponse {
    pub code: u64,
    pub msg: String,
    pub data: Option<ResponseBody>,
}

/// check the windows service status
pub async fn check_service() -> Result<JsonResponse> {
    let url = format!("{SERVICE_URL}/get_rrecai");
    let response = reqwest::ClientBuilder::new()
        .no_proxy()
        .build()?
        .get(url)
        .send()
        .await
        .context("failed to connect to the Rrecai Service")?
        .json::<JsonResponse>()
        .await
        .context("failed to parse the Rrecai Service response")?;

    Ok(response)
}

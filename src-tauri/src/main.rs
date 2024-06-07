// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    borrow::BorrowMut,
    io::Error,
    string,
    sync::{Arc, Mutex},
};

use tauri::{App, Manager, Runtime, State};

#[derive(Default)]
struct AppState {
    name: String,
    counter: Arc<Mutex<i32>>,
}

impl AppState {
    pub fn new(name: &str, counter_init: i32) -> Self {
        Self {
            name: name.into(),
            counter: Arc::new(Mutex::new(counter_init)),
        }
    }

    pub fn set_name(&mut self, name: String) -> Result<(), Error> {
        self.name = name;
        Ok(())
    }

    pub fn get_name(&self) -> String {
        self.name.to_string()
    }
}

trait counter {
    fn get_counter_num(counter: &i32) -> i32 {
        *counter
    }
    fn increase(counter: &mut i32, num: i32) -> Result<i32, Error> {
        *counter += num;
        Ok(*counter)
    }
}

impl counter for AppState {}

fn main() {
    let app_state = AppState::new("reccai", 0);

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![greet, setKV, increase_counter])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("nice to meet you, {}!", name)
}

#[tauri::command]
fn setKV<R: Runtime>(app: tauri::AppHandle<R>) -> Result<(), String> {
    app.app_handle().windows().iter().for_each(|(_, window)| {
        let _ = window.set_title("Name changed");
    });
    // let _ = window.set_title("Name changed");
    Ok(())
}

#[tauri::command]
async fn increase_counter<R: Runtime>(
    increment: i32,
    app_state: State<'_, AppState>,
    app: tauri::AppHandle<R>,
) -> Result<i32, String> {
    let mut counter = app_state.counter.lock().unwrap();
    *counter += increment;
    Ok(*counter)
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cmds;
mod config;
mod core;
mod utils;

use std::error::Error;

use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

fn main() {
    // let app_state = AppState::new("reccai", 0);
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let quit = CustomMenuItem::new("quit".to_string(), "Quit")
        .accelerator("Ctrl+U")
        .disabled();
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    // let mymenu =
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        // .manage(app_state)
        .setup(|app| {
            setup_event_listener(app);

            let docs_window = tauri::WindowBuilder::new(
                app,
                "external", /* the unique window label */
                tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
            )
            .build()?;
            let local_window =
                tauri::WindowBuilder::new(app, "local", tauri::WindowUrl::App("index.html".into()))
                    .build()?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![println_str])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_event_listener(app: &mut tauri::App) -> Result<(), Box<dyn Error>> {
    let main_win = app.get_window("main").unwrap();
    let main_win_clone = main_win.clone();
    let id = main_win.listen("event-from-method", move |e| {
        println!(
            "event-from-method got event from frontend with payload: {:#?}",
            e.payload()
        );
        main_win_clone
            .emit(
                "EventFromSetUp",
                Payload {
                    name: "mainCloneEventFromSetUp".into(),
                    age: 2,
                },
            )
            .unwrap();
        println!("mainCloneEventFromSetUp has sent");
    });
    // main_win.unlisten(id);
    main_win.emit(
        "EventFromSetUp",
        Payload {
            name: "EventFromSetUp".into(),
            age: 2,
        },
    )?;
    println!("EventFromSetUp has sent");
    Ok(())
}

#[tauri::command]
async fn println_str(data: &str) -> Result<(), String> {
    println!("{}", data);
    Ok(())
}

#[derive(Clone, serde::Serialize, Debug)]
struct Payload {
    name: String,
    age: i32,
}

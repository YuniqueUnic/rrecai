// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::{Ok, Result};

use tauri::Manager;

fn main() {
    // let app_state = AppState::new("reccai", 0);

    tauri::Builder::default()
        // .manage(app_state)
        .setup(|app| {
            setup_event_listener(app).unwrap();

            build_new_windows(app)
        })
        .invoke_handler(tauri::generate_handler![println_str])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn build_new_windows(app: &mut tauri::App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let docs_window = tauri::WindowBuilder::new(
        app,
        "external", /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
    )
    .build()?;
    let local_window =
        tauri::WindowBuilder::new(app, "local", tauri::WindowUrl::App("index.html".into()))
            .build()?;
    std::result::Result::Ok(())
}

fn setup_event_listener(app: &mut tauri::App) -> Result<()> {
    let main_win = app.get_window("main").unwrap();
    let main_win_clone = main_win.clone();
    let id = main_win.listen("event-from-method", move |e| {
        println!(
            "event-from-method got event from frontend with payload: {:#?}",
            e.payload()
        );
        main_win_clone
            .emit("EventFromSetUp", "hello, I'm from the listening")
            .unwrap();
        println!("mainCloneEventFromSetUp has sent");
    });
    // main_win.unlisten(id);
    main_win.emit("EventFromSetUp", "EventFromSetUp")?;
    println!("EventFromSetUp has sent");
    Ok(())
}

#[tauri::command]
async fn println_str(data: &str) -> Result<(), String> {
    println!("{}", data);
    std::result::Result::Ok(())
}

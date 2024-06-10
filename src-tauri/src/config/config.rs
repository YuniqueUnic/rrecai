use std::sync::{Arc, Mutex};

use anyhow::Error;

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

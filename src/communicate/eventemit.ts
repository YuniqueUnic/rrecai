import { invoke } from "@tauri-apps/api";
import { emit,listen } from "@tauri-apps/api/event";

const invokeMethodEvent = async (text:string)=>{
  console.log("invokeMethodEvent");
  emit("event-from-method",{message:"Event from page"});
  await invoke("println_str",{data:"data from front"}).then(console.log).catch(console.error);
  // await invoke("init_process",{}).then(console.log).catch(console.error);
}

let unlisten:any =null;

const start_listen = (str:string) => {
  // invoke('init_process');
  emit("event-from-method",{message:"Event from frontend"});
  //防止重复监听
  if (unlisten != null) {
      console.log("already listen");
      return;
  }

  const start_listen = async () => {
      //注意这里的 my-event 名称，要与后端保持一致
      return await listen<string>('EventFromSetUp', (event) => {
          // const { message, timestamp } = event.payload;
          console.log("event:", event.payload);
      });
  };
  unlisten = start_listen();
}

  //停止监听
const  stop_listen = () => {
    console.log("is_listening:", unlisten != null);
    if (unlisten != null) {
        unlisten.then((ok: any) => {
            ok();
            unlisten = null;
            console.log("stop success");
        }).catch((err: any) => {
            console.log("stop fail", err);
        })
    }
}


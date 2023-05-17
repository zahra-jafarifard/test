const { ipcRenderer } = require("electron");

window.errorNotif = {
  showErrorNotification: () => {
    ipcRenderer.invoke("showErrorNotification");
  },
};

window.successNotif = {
  showSuccessNotification: () => {
    ipcRenderer.invoke("showSuccessNotification");
  },
};
window.closeApp = {
  closeApplication: () => {
    ipcRenderer.invoke("closeApp");
  },
};
// window.openTelmis = {
//   openTelmisSite: () => {
//     ipcRenderer.invoke("openTelmisSite");
//   },
// };

import SystemFonts from 'system-font-families';
const systemFonts = new SystemFonts();

const fontList = systemFonts.getFontsSync();
console.log(fontList)

window.addEventListener('load',()=>{
  console.log("loaded");
  new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!',
      fontList: fontList
    }
  })
})

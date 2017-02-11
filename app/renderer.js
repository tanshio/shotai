
import { Chrome } from 'vue-color'

import SystemFonts from './fonts.js';
const systemFonts = new SystemFonts();

import fontkit from 'fontkit'

const fontList = systemFonts.fontList;
console.log(fontList)

let fontFamilies = new Set()

let vue;


const setFont = (font)=>{
  // console.log(font)
  if(typeof font.familyName !== 'object'){

    if (font.name.records.preferredFamily) {

      if(typeof font.name.records.preferredFamily.en === 'string'){
        if (!fontFamilies.has(fontFamilies)) {
          fontFamilies.add(font.name.records.preferredFamily.en)
        }
      }

    }else {
      if (!fontFamilies.has(font.familyName)) {
        fontFamilies.add(font.familyName)
      }

    }
  }
}

const separate = (arr)=>{
  const limit = 1000
  const count = Math.floor((arr.length - 1) / limit)+1
  let tmp = new Array(count)
  tmp.fill(0)

  return tmp.map((item,i) => {
    // console.log(i)
    return arr.slice(i*limit,(i+1)*limit)
  })
}




const createTask = (arr)=>{
  let tmp = []

  arr.forEach((e,i)=>{
    tmp[i] = new Promise(function(resolve, reject) {
      fontkit.open(e,null,(err,font)=>{
        if (err) {
          return
        }
        // console.log(font)
        if (font.fonts) {
          font.fonts.forEach((e)=>{
            setFont(e)
            resolve()
          })
        }else {
          setFont(font)
          resolve()
        }
      })
    })

  })

  return Promise.all(tmp)
}


let fontLists = separate(fontList)

let defaultProps = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}


async function Main(){

  for (var i = 0; i < fontLists.length; i++) {
    await new Promise((resolve)=>{
        createTask(fontLists[i]).then(()=>{
          resolve()
        })
    });

  }

  new Vue({
    el: '#app',
    components: {
      'chrome-picker': Chrome,
    },
    data: {
      message: 'Hello Vue.js!',
      fontList: [...fontFamilies],
      text:"text",
      colors: defaultProps,
      grid: false,
      fontSize: "16",
      unit: "px"
    },
    methods: {
      onChange (val) {
        console.log(val)
        document.documentElement.style.setProperty('--text-color', `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${val.rgba.a})`);
        this.colors = val
      }
    }
  })
}

Main();


// window.addEventListener('load',()=>{
//   console.log("loaded");
// })

if(!self.define){let e,a={};const i=(i,o)=>(i=new URL(i+".js",o).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(o,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let d={};const s=e=>i(e,n),f={module:{uri:n},exports:d,require:s};a[n]=Promise.all(o.map((e=>f[e]||s(e)))).then((e=>(r(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BL6ax3cd.js",revision:null},{url:"assets/index-DmTi1YD9.css",revision:null},{url:"index.html",revision:"6efc75acfce2adcc845ddafa067f7532"},{url:"registerSW.js",revision:"7a8520cff769208419ad06fff2570c95"},{url:"windows11/SmallTile.scale-100.png",revision:"493be077f1365f568c309c3dc491cb80"},{url:"windows11/SmallTile.scale-125.png",revision:"a2f3a259c115bfdc27ad5bffa77e9b40"},{url:"windows11/SmallTile.scale-150.png",revision:"ca398e3cf70156bbd054b47f82fb3591"},{url:"windows11/SmallTile.scale-200.png",revision:"ed744165de5562db4a391396f07c2ade"},{url:"windows11/SmallTile.scale-400.png",revision:"349f575f60da2d86ff2640e442361077"},{url:"windows11/Square150x150Logo.scale-100.png",revision:"12afff981196085fcaaf1194d49ed8c1"},{url:"windows11/Square150x150Logo.scale-125.png",revision:"f49098b73259abedebf5a2e467199bf2"},{url:"windows11/Square150x150Logo.scale-150.png",revision:"8bd2f5b8ad2fd17aa173ece55ac9d92f"},{url:"windows11/Square150x150Logo.scale-200.png",revision:"efffb5b005e292c49596f1944d54f83c"},{url:"windows11/Square150x150Logo.scale-400.png",revision:"7e5428e688607c4be0d2cd27b9bb4066"},{url:"windows11/Wide310x150Logo.scale-100.png",revision:"5c3b057e3a8b4bb836eda07b17ee153f"},{url:"windows11/Wide310x150Logo.scale-125.png",revision:"7abb78f5fe272d2b49969551a6ffa300"},{url:"windows11/Wide310x150Logo.scale-150.png",revision:"396eb87c06cbd3446006f3a529ad2d7e"},{url:"windows11/Wide310x150Logo.scale-200.png",revision:"d2ffb60b86f6b347ec025a2e4ec1a6ac"},{url:"windows11/Wide310x150Logo.scale-400.png",revision:"3302fc1d55f85cbfa9a286f4b8e47421"},{url:"windows11/LargeTile.scale-100.png",revision:"1facd19c7dce9bf9f7ea2d56ed484ff0"},{url:"windows11/LargeTile.scale-125.png",revision:"51bc5144397cdf98a7f3d02988d394f8"},{url:"windows11/LargeTile.scale-150.png",revision:"26eba8a04c8f69d6d27a89e0c415f369"},{url:"windows11/LargeTile.scale-200.png",revision:"0fa2ad769820f94b323967e4abb7a2ea"},{url:"windows11/LargeTile.scale-400.png",revision:"65419e0793f5b2d9d35f9264cc7792ca"},{url:"windows11/Square44x44Logo.scale-100.png",revision:"bd28d32176345302da623df7b3860f34"},{url:"windows11/Square44x44Logo.scale-125.png",revision:"e38649e572950bb8c9e4a0d85f9078e7"},{url:"windows11/Square44x44Logo.scale-150.png",revision:"db5989abbf43c5ac20add49201bcefa0"},{url:"windows11/Square44x44Logo.scale-200.png",revision:"3821cde6f2f6f7d25d8548846eb6570e"},{url:"windows11/Square44x44Logo.scale-400.png",revision:"d7631e3b580968802e41ed79323e56f4"},{url:"windows11/StoreLogo.scale-100.png",revision:"9d656cf99cde83312ea5c0aabc9a617a"},{url:"windows11/StoreLogo.scale-125.png",revision:"b50a912a9d118093c88e051f69f2a493"},{url:"windows11/StoreLogo.scale-150.png",revision:"ae314d9b6e2363dbae48793ce5b081cd"},{url:"windows11/StoreLogo.scale-200.png",revision:"63fe08c4f419c23cc9d74b6c27fde2e9"},{url:"windows11/StoreLogo.scale-400.png",revision:"ab8ac537e6cbdf3829bdf04840ffd743"},{url:"windows11/SplashScreen.scale-100.png",revision:"d2ffb60b86f6b347ec025a2e4ec1a6ac"},{url:"windows11/SplashScreen.scale-125.png",revision:"2246aaf940b66b8a5b2a3722409e3789"},{url:"windows11/SplashScreen.scale-150.png",revision:"fb0cd81a7d5875b6f7207c3a8ff9d110"},{url:"windows11/SplashScreen.scale-200.png",revision:"3302fc1d55f85cbfa9a286f4b8e47421"},{url:"windows11/SplashScreen.scale-400.png",revision:"9fe67f328139e1475d6d8bdec5517111"},{url:"windows11/Square44x44Logo.targetsize-16.png",revision:"4b8ba0e0ded7115f46338d28a2cdb025"},{url:"windows11/Square44x44Logo.targetsize-20.png",revision:"dc4a354c61b95d6facdf471780fa1f9e"},{url:"windows11/Square44x44Logo.targetsize-24.png",revision:"f3f2f21126f7a73cc968ecec38852202"},{url:"windows11/Square44x44Logo.targetsize-30.png",revision:"86cc3c8ea9bcf15ebbddda355eb39b4a"},{url:"windows11/Square44x44Logo.targetsize-32.png",revision:"f7e000fb00742bb01177eb37ef4694a8"},{url:"windows11/Square44x44Logo.targetsize-36.png",revision:"5eb30855fb365024e032048da7102356"},{url:"windows11/Square44x44Logo.targetsize-40.png",revision:"715d3f37e172bfe63df00925f9ba8642"},{url:"windows11/Square44x44Logo.targetsize-44.png",revision:"bd28d32176345302da623df7b3860f34"},{url:"windows11/Square44x44Logo.targetsize-48.png",revision:"699076286f6004e07e448dc21ab68342"},{url:"windows11/Square44x44Logo.targetsize-60.png",revision:"bb7c219f3942cfaaf54752f0a752b1d6"},{url:"windows11/Square44x44Logo.targetsize-64.png",revision:"7df36f0ff0bc1f7b41b4a7de4dcf3721"},{url:"windows11/Square44x44Logo.targetsize-72.png",revision:"8bf45e57b6572293f9af5068caa7e193"},{url:"windows11/Square44x44Logo.targetsize-80.png",revision:"f70d025a087f43cd5d266a815bd146b3"},{url:"windows11/Square44x44Logo.targetsize-96.png",revision:"3d4928d52a15f18d4a51e7c9b2fcee29"},{url:"windows11/Square44x44Logo.targetsize-256.png",revision:"a3cb9d58cf2e499d44b56dfb157e6f95"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"4b8ba0e0ded7115f46338d28a2cdb025"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"dc4a354c61b95d6facdf471780fa1f9e"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"f3f2f21126f7a73cc968ecec38852202"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"86cc3c8ea9bcf15ebbddda355eb39b4a"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"f7e000fb00742bb01177eb37ef4694a8"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"5eb30855fb365024e032048da7102356"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"715d3f37e172bfe63df00925f9ba8642"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"bd28d32176345302da623df7b3860f34"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"699076286f6004e07e448dc21ab68342"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"bb7c219f3942cfaaf54752f0a752b1d6"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"7df36f0ff0bc1f7b41b4a7de4dcf3721"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"8bf45e57b6572293f9af5068caa7e193"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"f70d025a087f43cd5d266a815bd146b3"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"3d4928d52a15f18d4a51e7c9b2fcee29"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"a3cb9d58cf2e499d44b56dfb157e6f95"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"4b8ba0e0ded7115f46338d28a2cdb025"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"dc4a354c61b95d6facdf471780fa1f9e"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"f3f2f21126f7a73cc968ecec38852202"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"86cc3c8ea9bcf15ebbddda355eb39b4a"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"f7e000fb00742bb01177eb37ef4694a8"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"5eb30855fb365024e032048da7102356"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"715d3f37e172bfe63df00925f9ba8642"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"bd28d32176345302da623df7b3860f34"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"699076286f6004e07e448dc21ab68342"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"bb7c219f3942cfaaf54752f0a752b1d6"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"7df36f0ff0bc1f7b41b4a7de4dcf3721"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"8bf45e57b6572293f9af5068caa7e193"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"f70d025a087f43cd5d266a815bd146b3"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"3d4928d52a15f18d4a51e7c9b2fcee29"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"a3cb9d58cf2e499d44b56dfb157e6f95"},{url:"android/android-launchericon-512-512.png",revision:"dc14ce829ee2c721560458440d76db1a"},{url:"android/android-launchericon-192-192.png",revision:"359d3a4d8640b3c893dbaa246b3a35af"},{url:"android/android-launchericon-144-144.png",revision:"f188ea5a710a664c5d5243683b0f9692"},{url:"android/android-launchericon-96-96.png",revision:"419763397c6707457833b17219c385de"},{url:"android/android-launchericon-72-72.png",revision:"d52cfaa804d25117b416f6088b24140b"},{url:"android/android-launchericon-48-48.png",revision:"9cf465085bc5a15a96e75fff46ee586e"},{url:"ios/16.png",revision:"870c86ecb7f2559223b3e722de79ab2e"},{url:"ios/20.png",revision:"610a2711c4cb7c02166e16a8de92117c"},{url:"ios/29.png",revision:"beba8398212466a8f36ae1e0533fff52"},{url:"ios/32.png",revision:"d495de5a6dac7cbb5410aaa684aae1f4"},{url:"ios/40.png",revision:"92ae26132afdeb63aca26f8d20f58f9b"},{url:"ios/50.png",revision:"9d656cf99cde83312ea5c0aabc9a617a"},{url:"ios/57.png",revision:"dbb18b21a8275c5f3bea8dd98fb34d19"},{url:"ios/58.png",revision:"44dd5837e991785ade2b597bac3c4641"},{url:"ios/60.png",revision:"683bbac6c840397a4b1b5528ec64015c"},{url:"ios/64.png",revision:"0e27a882ee5cb9d86c90ad63bc9eae1e"},{url:"ios/72.png",revision:"d52cfaa804d25117b416f6088b24140b"},{url:"ios/76.png",revision:"c40b0df58245e8822201da0697262ddc"},{url:"ios/80.png",revision:"633b26af5cc8588ada7149a2fdfb36a2"},{url:"ios/87.png",revision:"9c855671a627058d9dc32014aae5dcf5"},{url:"ios/100.png",revision:"63fe08c4f419c23cc9d74b6c27fde2e9"},{url:"ios/114.png",revision:"fbc23c8a7bd298128f4a988eb6b04451"},{url:"ios/120.png",revision:"37dd68557a3f0e9e15ea58a41e2275a2"},{url:"ios/128.png",revision:"4509d7c673685a0b4dce8498d68cfa5a"},{url:"ios/144.png",revision:"f188ea5a710a664c5d5243683b0f9692"},{url:"ios/152.png",revision:"32241266d89cc356c3959052074837fc"},{url:"ios/167.png",revision:"3e045379ff62ed7fdac47f4db51e79f5"},{url:"ios/180.png",revision:"897ae8a7beb5f8e797cf33af3334c076"},{url:"ios/192.png",revision:"359d3a4d8640b3c893dbaa246b3a35af"},{url:"ios/256.png",revision:"50fb9ba1ad11bc26f6038396d4df4a8c"},{url:"ios/512.png",revision:"dc14ce829ee2c721560458440d76db1a"},{url:"ios/1024.png",revision:"37e43486e9542722ba0a8adc7466e8ee"},{url:"manifest.webmanifest",revision:"69c0f4fc8e407b0db63baa32c83addb4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

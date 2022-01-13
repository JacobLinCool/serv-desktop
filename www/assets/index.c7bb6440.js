!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&n(e)})).observe(document,{childList:!0,subtree:!0})}function n(e){if(e.ep)return;e.ep=!0;const n=function(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?n.credentials="include":"anonymous"===e.crossorigin?n.credentials="omit":n.credentials="same-origin",n}(e);fetch(e.href,n)}}();function e(e){return new Promise((n=>setTimeout(n,e)))}async function n(n,t,o=50,a=0,l=40){for(let r=0;r<t.length;r++)await e(o+Math.random()*a)," "===t[r]&&await e(l),n.innerHTML+=t[r]}!async function(){const t=new Promise((e=>{const n=document.createElement("script");n.src="https://unpkg.com/shiki",n.onload=e,document.body.appendChild(n)})).then((()=>shiki.getHighlighter({theme:"nord",langs:["javascript"]}))),o=async function(e){return(await e).codeToHtml('// basics.js\nJacobLinCool.name = "林振可"\nJacobLinCool.birth = [2003, null, null]\nJacobLinCool.aliases = ["JacobLinCool", "Jacob Lin"]\nJacobLinCool.hometown = "台北市"\nJacobLinCool.living = [\n    {\n        name: "台北市",\n        current: true,\n    },\n]\nJacobLinCool.languages = ["zh_TW", "en_US"]\n// PS: 至少可以用英文寫程式\n',"js")}(t),a=async function(e){return(await e).codeToHtml('// education.js\nJacobLinCool.education = [\n    {\n        name: "國立臺灣師範大學",\n        major: "資訊工程學系",\n        degree: "學士 (BS)",\n        start: [2021, null, null],\n        graduated: false,\n        current: true,\n    },\n    {\n        name: "國立臺灣師範大學附屬高級中學",\n        start: [2018, 9, null],\n        end: [2021, 6, null],\n        graduated: true,\n        class: 1481,\n    },\n    {\n        name: "臺北市立金華國民中學",\n        start: [2015, 9, null],\n        end: [2018, 6, null],\n        graduated: true,\n    },\n    {\n        name: "臺北市大安區新生國民小學",\n        start: [2009, 9, null],\n        end: [2015, 6, null],\n        graduated: true,\n    },\n]\n',"js")}(t),l=async function(e){return(await e).codeToHtml('// contact.js\nJacobLinCool.contact = {\n    email: "jacoblincool@gmail.com",\n    website: "https://jacob.pages.dev/",\n    social: {\n        facebook: "https://www.facebook.com/jacob.lin.cool",\n        instagram: "https://www.instagram.com/jacoblincool",\n        twitter: "https://twitter.com/JacobLinCool",\n        github: "https://github.com/JacobLinCool",\n        telegram: "https://t.me/jacoblincool",\n    },\n}\n',"js")}(t),r=async function(e){return(await e).codeToHtml('// skill.js\nJacobLinCool.skill = [\n    {\n        name: "JavaScript",\n        level: "basics",\n        type: "programming_language",\n    },\n    {\n        name: "C++",\n        level: "basics",\n        type: "programming_language",\n    },\n    {\n        name: "Visual Basic 6",\n        level: "almost_forgotten",\n        type: "programming_language",\n    },\n    {\n        name: "Python",\n        level: "learning",\n        type: "programming_language",\n    },\n    {\n        name: "Go",\n        level: "learning",\n        type: "programming_language",\n    },\n    {\n        name: "Node.js",\n        level: "basics",\n        type: "programming_tools",\n    },\n    {\n        name: "TypeScript",\n        level: "basics",\n        type: "programming_tools",\n    },\n    {\n        name: "Qt (C++)",\n        level: "forgotten",\n        type: "programming_tools",\n    },\n    {\n        name: "Electron",\n        level: "some_experiences",\n        type: "programming_tools",\n    },\n    {\n        name: "Vue",\n        level: "some_experiences",\n        type: "programming_tools",\n    },\n]\n',"js")}(t),i=document.querySelector("#console"),c=i.querySelector("span"),s=document.querySelector("#background");await e(1e3),await n(c,'const JacobLinCool = require("JacobLinCool")',50,30),await e(500),i.style.top="40px",await e(1300);for(;c.innerHTML.length>0;)await e(20),c.innerHTML=c.innerHTML.slice(0,-1);await e(500),await n(c,"JacobLinCool",30),await e(100),c.style.fontSize="2.2rem",await e(100),i.style.padding="12px",await e(600),c.style.fontSize="1.9rem",await e(100),i.style.padding="8px",await e(500),c.style.transform="rotate(5deg)",await e(500),c.style.transform="rotate(0deg)",await e(400),i.style.background="#eceff400",i.style.color="#2e3440",(async()=>{s.classList.add("active2"),await e(500),s.classList.add("active1")})(),document.querySelector("#about").innerHTML=await o,document.querySelector("#about").style.display="block",await e(20),document.querySelector("#about").style.opacity="1",document.querySelector("#about").style.transform="translateY(0)",await e(500),document.querySelector("#contact").innerHTML=await l,document.querySelector("#contact").style.display="block",await e(20),document.querySelector("#contact").style.opacity="1",document.querySelector("#contact").style.transform="translateY(0)",await e(500),document.querySelector("#education").innerHTML=await a,document.querySelector("#education").style.display="block",await e(20),document.querySelector("#education").style.opacity="1",document.querySelector("#education").style.transform="translateY(0)",await e(500),document.querySelector("#skill").innerHTML=await r,document.querySelector("#skill").style.display="block",await e(20),document.querySelector("#skill").style.opacity="1",document.querySelector("#skill").style.transform="translateY(0)",await e(500),document.querySelector("#copyright").style.display="block",await e(20),document.querySelector("#copyright").style.opacity="1",await e(500)}();

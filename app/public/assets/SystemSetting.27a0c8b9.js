import{q as F,D as w,g as E}from"./ant-design-vue.f3cea403.js";import{_ as h}from"./Card.0f515d6a.js";import{s as m,R as u}from"./index.76eb39cb.js";import{d as D,K as k,L as C,f as s,Q as o,A as e,M as l,N as p}from"./@vue.f0dd5f4e.js";import{F as P}from"./@ant-design.7151a3c8.js";import"./@babel.75b79d9b.js";import"./regenerator-runtime.83f8288d.js";import"./array-tree-filter.28ee0a5d.js";import"./omit.js.0925d6dc.js";import"./lodash-es.ba98d3f1.js";import"./moment.08a7f518.js";import"./warning.ca82f8e0.js";import"./resize-observer-polyfill.8deb1e21.js";import"./async-validator.1fa0d626.js";import"./scroll-into-view-if-needed.c68eec67.js";import"./compute-scroll-into-view.6058b3be.js";import"./dom-align.f1b5d360.js";import"./vue-types.6e6d84ba.js";import"./mark-ui.80cd89aa.js";import"./vue-router.51efbbda.js";import"./@ctrl.2e36ce53.js";const x={class:"path"},B={class:"space-10 flex ai-center"},$={class:"space-10 flex ai-center"},ee=D({setup(A){const c=require("path"),n=m.system,{shell:r}=require("electron"),f=u.app.call("getAppPath"),_=u.app.call("getPath","exe"),b=c.resolve(c.join(n.path.userData,"./config.json"));function v(d){m.system.path[d]=u.dialog.call("showOpenDialogSync",{properties:["openDirectory"],multiSelections:!1,defaultPath:m.system.path[d]}).pop()}return(d,t)=>{const y=F,i=w,j=E,g=P;return k(),C("div",null,[s(h,{bordered:!1,color:"blue",title:"\u7CFB\u7EDF\u8BBE\u7F6E"},{body:o(()=>[s(j,{column:1,labelStyle:{fontWeight:"bold"}},{default:o(()=>[s(i,{label:"\u7A97\u53E3\u7F6E\u9876"},{default:o(()=>[s(y,{checked:e(n).win.isAlwaysOnTop,"onUpdate:checked":t[0]||(t[0]=a=>e(n).win.isAlwaysOnTop=a),onChange:t[1]||(t[1]=a=>e(u).win.call("setAlwaysOnTop",e(n).win.isAlwaysOnTop))},null,8,["checked"])]),_:1})]),_:1})]),_:1}),s(h,{bordered:!1,color:"blue",title:"\u8DEF\u5F84\u8BBE\u7F6E"},{body:o(()=>[s(j,{column:1,labelStyle:{fontWeight:"bold"}},{default:o(()=>[s(i,{label:"\u8F6F\u4EF6\u8DEF\u5F84"},{default:o(()=>[l("span",{class:"path",onClick:t[2]||(t[2]=a=>e(r).openPath(e(f)))},p(e(f)),1)]),_:1}),s(i,{label:"\u53EF\u6267\u884C\u6587\u4EF6"},{default:o(()=>[l("span",{class:"path",onClick:t[3]||(t[3]=a=>e(r).showItemInFolder(e(_)))},p(e(_)),1)]),_:1}),s(i,{label:"\u914D\u7F6E\u6587\u4EF6",onClick:t[4]||(t[4]=a=>e(r).showItemInFolder(e(b)))},{default:o(()=>[l("span",x,p(e(b)),1)]),_:1}),s(i,{label:"\u7528\u6237\u6570\u636E"},{default:o(()=>[l("div",B,[l("span",{class:"path",onClick:t[5]||(t[5]=a=>e(r).openPath(e(n).path.userData))},p(e(n).path.userData),1),s(g,{onClick:t[6]||(t[6]=a=>v("userData"))})])]),_:1}),s(i,{label:"\u65E5\u5FD7\u5B58\u50A8"},{default:o(()=>[l("div",$,[l("span",{class:"path",onClick:t[7]||(t[7]=a=>e(r).openPath(e(n).path.logs))},p(e(n).path.logs),1),s(g,{onClick:t[8]||(t[8]=a=>v("logs"))})])]),_:1})]),_:1})]),_:1})])}}});export{ee as default};
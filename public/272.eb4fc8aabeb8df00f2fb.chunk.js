"use strict";(this.webpackChunktweb=this.webpackChunktweb||[]).push([[272],{6272:(e,t,c)=>{c.d(t,{u:()=>s});var o=c(4727);const n=new Map;let r=0;const l=(e,t,c="")=>{c=t.country_code+c,r=Math.max(r,c.length),n.set(c,{country:e,code:t})};function s(e){e=e||"",n.size||o.default.countriesList.forEach((e=>{e.country_codes.forEach((t=>{t.prefixes?t.prefixes.forEach((c=>{l(e,t,c)})):l(e,t)}))}));let t,c=e.replace(/\D/g,""),s=c.slice(0,r);for(let e=s.length-1;e>=0&&(t=n.get(s.slice(0,e+1)),!t);--e);if(!t)return{formatted:c,country:void 0,code:void 0,leftPattern:""};const a=t.country,h=t.code.patterns||[],i=c.slice(t.code.country_code.length);let d="",u=0,f="";for(let e=h.length-1;e>=0;--e){d=h[e];const t=d.replace(/ /g,"");let c=0;for(let e=0,o=Math.min(i.length,t.length);e<o;++e){if(i[e]!==t[e]&&"X"!==t[e]){c=0;break}++c}c>u&&(u=c,f=d)}d=f||d,d=d.replace(/\d/g,"X"),d=t.code.country_code+" "+d,d.split("").forEach(((e,t)=>{" "===e&&" "!==c[t]&&c.length>t&&(c=c.slice(0,t)+" "+c.slice(t))}));let g=d&&d.length>c.length?d.slice(c.length):"";return g&&(g=g.replace(/X/g,"‒")),{formatted:c,country:a,code:t.code,leftPattern:g}}}}]);
//# sourceMappingURL=272.eb4fc8aabeb8df00f2fb.chunk.js.map
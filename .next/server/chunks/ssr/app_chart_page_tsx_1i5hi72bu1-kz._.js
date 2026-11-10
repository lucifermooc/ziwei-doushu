module.exports=[17534,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(52628),e=a.i(17001),f=a.i(46271),g=a.i(62036);let h=[{key:"overview",label:"命格"},{key:"love",label:"感情"},{key:"career",label:"事业"},{key:"wealth",label:"财运"},{key:"health",label:"健康"},{key:"personality",label:"性格"}],i={overview:`请生成命格总览，按以下结构输出：

**【命格定性】**
用一句话概括这个命盘的核心格局与命主气质。

**【主星解读】**
命宫主星的核心特质，引用倪海厦原话或观点。

**【三方四正】**
财、官、迁三宫的联动分析及整体格局。

**【当前大限】**
当下大限运势方向与最值得关注的事项。

**【优势与注意】**
命盘天赋优势，以及需要注意的风险或功课。`,love:`请深度分析感情婚姻运，按以下结构输出：

**【感情格局】**
一句话定性感情命格。

**【夫妻宫分析】**
夫妻宫主星、四化，以及倪海厦体系的具体解读。

**【三方联动】**
相关宫位对感情的影响。

**【当前大限感情运】**
当下10年感情走向与关键节点。

**【实际建议】**
具体可行的感情建议。`,career:`请深度分析事业运，按以下结构输出：

**【事业格局】**
一句话定性事业命格，宜任职或宜创业。

**【官禄宫分析】**
官禄宫主星、四化，以及倪师对这种配置的判断。

**【财帛宫联动】**
财运与事业的关系，财路来源分析。

**【当前大限事业运】**
当下10年事业走向。

**【实际建议】**
适合的方向、行业与策略。`,wealth:`请深度分析财运，按以下结构输出：

**【财运格局】**
一句话定性财运模式，是主动财还是被动财。

**【财帛宫分析】**
财帛宫主星、四化，财富来源与流动模式。

**【田宅宫（财库）】**
积蓄能力与不动产运势分析。

**【当前大限财运】**
当下财运走向与注意事项。

**【理财建议】**
具体的财务建议。`,health:`请分析健康运势，按以下结构输出：

**【疾厄宫主星】**
疾厄宫星曜与健康含义。

**【主要风险】**
结合倪海厦子午流注理论，分析主要健康隐患与需关注的部位。

**【大限健康走势】**
当下健康趋势与关键时间段。

**【预防建议】**
具体注意事项与养生方向。`,personality:`请深度解析性格特质，按以下结构输出：

**【命宫主星性格】**
命宫主星的核心性格特质，引用倪师原话。

**【三方性格综合】**
财、官、迁三宫对性格的影响，全貌描绘。

**【人际关系模式】**
与他人互动方式、待人处世风格。

**【优势与人生课题】**
天赋优势，以及需要面对的人生功课。`},j={命宫:"自我、性格、先天格局",兄弟宫:"兄弟关系、合伙人",夫妻宫:"感情关系、婚姻状态",子女宫:"子女缘分、下属关系",财帛宫:"财运来源、收入方式",疾厄宫:"身体健康、意外",迁移宫:"外出机遇、人际格局",交友宫:"朋友圈、贵人、小人",官禄宫:"事业成就、社会地位",田宅宫:"不动产、家庭环境",福德宫:"精神享受、内心福分",父母宫:"父母关系、文书契约"};function k({text:a,streaming:c}){let d=a.split("\n");return(0,b.jsxs)("div",{className:"space-y-0.5",children:[d.map((a,c)=>{let d=a.match(/^\*\*【(.+?)】\*\*$/);if(d)return(0,b.jsx)("div",{className:"pt-3 pb-0.5 first:pt-0",children:(0,b.jsxs)("span",{className:"text-[11px] font-semibold tracking-wide",style:{color:"var(--t-gold)"},children:["【",d[1],"】"]})},c);if(""===a.trim())return(0,b.jsx)("div",{className:"h-1"},c);let e=a.split(/\*\*(.+?)\*\*/);return(0,b.jsx)("div",{className:"text-[11px] leading-relaxed",style:{color:"var(--t-text2)"},children:e.map((a,c)=>c%2==0?a:(0,b.jsx)("strong",{className:"font-medium",style:{color:"var(--t-text)"},children:a},c))},c)}),c&&(0,b.jsx)("span",{className:"inline-block w-1.5 h-3 ml-0.5 animate-pulse rounded-sm align-middle",style:{background:"var(--t-gold)",opacity:.6}})]})}function l({chart:a,selectedPalace:d,selectedSiHua:e}){let[m,n]=(0,c.useState)([]),[o,p]=(0,c.useState)(""),[q,r]=(0,c.useState)(!1),[s,t]=(0,c.useState)("overview"),u=(0,c.useRef)([]),v=(0,c.useRef)(!1),w=(0,c.useRef)(!1),x=(0,c.useRef)(void 0),y=(0,c.useRef)(void 0),z=(0,c.useRef)(null);(0,c.useEffect)(()=>{u.current=m},[m]),(0,c.useEffect)(()=>{v.current=q},[q]),(0,c.useEffect)(()=>{z.current&&(z.current.scrollTop=z.current.scrollHeight)},[m]),(0,c.useEffect)(()=>{w.current||(w.current=!0,B(i.overview,!0))},[]),(0,c.useEffect)(()=>{if(!d||d.branch===x.current)return;x.current=d.branch;let a=d.stars.filter(a=>"major"===a.type),b=a.length>0?a.map(a=>`${a.name}${a.siHua?"化"+a.siHua:""}`).join("、"):"空宫（借对宫）",c=j[d.name]??"";B(`请重点分析【${d.name}】（主管：${c}），该宫主星为${b}，按以下结构输出：

**【宫位定性】**
${d.name}在命盘中的意义，以及这种星曜配置的整体判断。

**【主星解读】**
主星在此宫的倪海厦体系解读，引用具体观点。

**【三方四正联动】**
三方四正宫位对此宫的影响。

**【实际建议】**
基于此宫的具体建议。`,!0)},[d]),(0,c.useEffect)(()=>{if(!e)return;let b=`${e.starName}-${e.siHua}-${e.view}`;if(b===y.current)return;y.current=b;let c=a.palaces.find(a=>a.stars.some(a=>a.name===e.starName)),d=c?.name??"未知宫位",f="daxian"===e.view?"大限":"流年";B(`请分析【${f}${e.starName}化${e.siHua}】的飞化影响，按以下结构输出：

**【化${e.siHua}基本含义】**
化${e.siHua}在倪海厦体系中的核心含义，以及${e.starName}化${e.siHua}的特殊含义。

**【落宫影响】**
${e.starName}化${e.siHua}落在【${d}】，该宫主管的领域受到何种影响，倪师如何解读。

**【三方四正飞化路径】**
化${e.siHua}入${d}后，对其三方四正（对宫、两个三合宫）的联动影响。

**【当前运势影响】**
在${f}时间维度下，此化${e.siHua}对命主近期运势的具体影响。

**【实际建议】**
基于此四化的具体可操作建议。`,!0)},[e]);let A=async b=>{try{let c=await fetch("/api/interpret",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chart:a,messages:b})});if(404===c.status)throw Error("api-missing");if(!c.ok)throw Error("请求失败");if(!c.body)throw Error("无响应流");let d=c.body.getReader(),e=new TextDecoder,f="";for(n(a=>[...a,{role:"assistant",content:""}]);;){let{done:a,value:b}=await d.read();if(a)break;for(let a of e.decode(b,{stream:!0}).split("\n")){if(!a.startsWith("data: "))continue;let b=a.slice(6);if("[DONE]"===b)break;try{let a=JSON.parse(b).delta?.text??"";f+=a,n(a=>{let b=[...a];return b[b.length-1]={role:"assistant",content:f},b})}catch{}}}}catch(b){let a=b instanceof Error&&"api-missing"===b.message;n(b=>[...b,{role:"assistant",content:a?"开源版不含 AI 解读接口（/api/interpret），需要你自己实现后才能用，详见 README「快速开始」。排盘本身不需要任何 API Key。":"解读失败，请稍后重试。"}])}finally{r(!1),v.current=!1}},B=(a,b=!1)=>{if(!a.trim()||v.current)return;v.current=!0,r(!0);let c={role:"user",content:a,hidden:b},d=[...u.current,c].map(a=>({role:a.role,content:a.content}));n(a=>[...a,c]),p(""),A(d)},C=()=>{B(o)};return(0,b.jsxs)("div",{className:"flex flex-col h-full rounded-xl overflow-hidden card-glass",children:[(0,b.jsx)("div",{className:"flex-shrink-0 px-2 pt-2.5 pb-2",style:{borderBottom:"1px solid var(--t-border)"},children:(0,b.jsx)("div",{className:"grid grid-cols-6 gap-1",children:h.map(a=>{let c=s===a.key;return(0,b.jsx)("button",{onClick:()=>{var b;return b=a.key,void(!v.current&&(t(b),B(i[b],!0)))},disabled:q,className:"py-1.5 text-[10px] font-medium rounded-lg transition-all duration-150 disabled:opacity-40",style:{background:c?"rgba(212,168,67,0.12)":"transparent",border:`1px solid ${c?"rgba(212,168,67,0.3)":"var(--t-border)"}`,color:c?"var(--t-gold)":"var(--t-faint)"},children:a.label},a.key)})})}),(0,b.jsxs)("div",{ref:z,className:"flex-1 overflow-y-auto p-4 space-y-4 min-h-0",children:[0===m.length&&(0,b.jsxs)("div",{className:"flex flex-col items-center justify-center h-full text-center",children:[(0,b.jsx)("div",{className:"text-4xl mb-3",style:{color:"var(--t-gold)",opacity:.1},children:"✦"}),(0,b.jsx)("p",{className:"text-[10px] animate-pulse",style:{color:"var(--t-faint)"},children:"命格解读生成中…"})]}),(0,b.jsx)(g.f,{initial:!1,children:m.map((a,c)=>{if("user"===a.role&&a.hidden)return null;if("user"===a.role)return(0,b.jsx)(f.f.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},className:"flex justify-end",children:(0,b.jsx)("div",{className:"max-w-[85%] rounded-xl px-3 py-2 text-[11px]",style:{background:"rgba(212,168,67,0.08)",border:"1px solid rgba(212,168,67,0.18)",color:"var(--t-gold)"},children:a.content})},c);let d=c===m.length-1;return(0,b.jsxs)(f.f.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},children:[(0,b.jsxs)("div",{className:"text-[9px] tracking-widest mb-2 flex items-center gap-1.5",style:{color:"var(--t-faint)"},children:[(0,b.jsx)("span",{style:{color:"var(--t-gold)",opacity:.4},children:"✦"}),"命理解读"]}),(0,b.jsx)(k,{text:a.content,streaming:q&&d})]},c)})})]}),(0,b.jsx)("div",{className:"flex-shrink-0 px-3 pb-3 pt-2",style:{borderTop:"1px solid var(--t-border)"},children:(0,b.jsxs)("div",{className:"flex gap-2",children:[(0,b.jsx)("input",{type:"text",value:o,onChange:a=>p(a.target.value),onKeyDown:a=>"Enter"===a.key&&!a.shiftKey&&C(),placeholder:"继续追问，如：今年适合换工作吗？",disabled:q,className:"flex-1 rounded-lg px-3 py-2 text-[11px] focus:outline-none transition-colors",style:{background:"var(--t-card)",border:"1px solid var(--t-border)",color:"var(--t-text)"}}),(0,b.jsx)("button",{onClick:C,disabled:q||!o.trim(),className:"px-3 py-2 rounded-lg text-[11px] font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed",style:{background:"rgba(212,168,67,0.15)",border:"1px solid rgba(212,168,67,0.25)",color:"var(--t-gold)"},children:q?"…":"追问"})]})})]})}var m=a.i(81654),n=a.i(3443);a.s(["default",0,function(){let[a,f]=(0,c.useState)(null),[g,h]=(0,c.useState)(null),[i,j]=(0,c.useState)("mingpan"),[k,o]=(0,c.useState)(()=>new Date().getFullYear());return a?(0,b.jsxs)("main",{style:{maxWidth:1280,margin:"0 auto",padding:"24px 16px"},children:[(0,b.jsx)("button",{type:"button",onClick:()=>{f(null),h(null)},style:{marginBottom:16,padding:"6px 14px",cursor:"pointer",border:"1px solid #ccc",borderRadius:8,background:"transparent"},children:"← 重新起盘"}),(0,b.jsx)(m.U,{chart:a,view:i,liunianYear:k,onViewChange:j,onYearChange:o}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]",style:{gap:20,marginTop:16,alignItems:"start"},children:[(0,b.jsx)(e.f,{chart:a,onPalaceSelect:h}),(0,b.jsx)(l,{chart:a,selectedPalace:g})]})]}):(0,b.jsxs)("main",{style:{maxWidth:720,margin:"0 auto",padding:"48px 20px"},children:[(0,b.jsx)("h1",{style:{fontSize:28,fontWeight:700,marginBottom:8},children:"紫微斗数排盘"}),(0,b.jsxs)("p",{style:{color:"#888",marginBottom:32,fontSize:14,lineHeight:1.7},children:["输入出生年月日时，开源排盘引擎即时生成命盘。",(0,b.jsx)("br",{}),"（本页为引擎 Demo，完整商业版界面不在开源范围；排盘内核完全开放。）"]}),(0,b.jsx)(d.f,{onSubmit:a=>f((0,n.f)(a))})]})}],17534)}];

//# sourceMappingURL=app_chart_page_tsx_1i5hi72bu1-kz._.js.map
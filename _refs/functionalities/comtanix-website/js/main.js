/* EDIT THESE DETAILS */
const CONFIG={
 whatsapp:"923001234567",            // country code + number, no + or spaces
 whatsappShow:"+92 300 1234567",
 formEndpoint:"",                      // optional: your own form/upload URL (e.g. Formspree) so CVs arrive by email. Leave empty to apply through WhatsApp
 email:"info@yourcompany.com",careersEmail:"careers@yourcompany.com",
 socials:{Facebook:"https://www.facebook.com/",LinkedIn:"https://www.linkedin.com/",Instagram:"https://www.instagram.com/",YouTube:"https://www.youtube.com/",X:"https://x.com/"},
 address:"Your office address, City, Pakistan",
 mapQuery:"Comtanix office",          // text Google Maps will search
 hours:"Monday to Saturday, 10:00 AM to 6:00 PM",
 officeTz:"Asia/Karachi",
 officePhoto:""                        // paste a photo link/data URI here to replace the illustration
};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const wa=(t)=>"https://wa.me/"+CONFIG.whatsapp+(t?"?text="+encodeURIComponent(t):"");
$$("[data-wa]").forEach(a=>{a.href=wa("Hello Comtanix, I would like to know about jobs.");a.target="_blank";a.rel="noopener"});
$("#waNum").textContent=CONFIG.whatsappShow;$("#addr").textContent=CONFIG.address;$("#hours").textContent=CONFIG.hours;
$("#dir").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(CONFIG.mapQuery+" "+CONFIG.address);
$("#yr").textContent=new Date().getFullYear();
$$(".office-slot").forEach(s=>{
 if(CONFIG.officePhoto){const i=new Image();i.src=CONFIG.officePhoto;i.alt="Comtanix office";s.replaceWith(i)}
 else s.innerHTML=$("#officeSvg").innerHTML;
});
/* routing */
function route(){
 const [pg,sub]=(location.hash.replace("#/","")||"home").split("/");
 const p=$(".page#"+pg)?pg:"home";
 $$(".page").forEach(e=>e.classList.toggle("on",e.id===p));
 $$("nav a[data-p]").forEach(a=>a.dataset.p===p?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
 $("#nav").classList.remove("open");$("#menu").setAttribute("aria-expanded","false");
 const t=sub&&document.getElementById("s-"+sub);
 t?t.scrollIntoView():window.scrollTo(0,0);
 document.title=(p==="home"?"Comtanix":p[0].toUpperCase()+p.slice(1)+" | Comtanix")+" | BPO and IT Careers";
}
const SERVICES=[
["dev","💻","Software Development","Web and mobile apps built and maintained by dedicated teams.",["Web apps","Mobile apps","Maintenance"]],
["qa","✅","Software Quality and Testing","Manual and automated testing so every release ships with confidence.",["Manual QA","Automation","Release checks"]],
["it","🛠️","IT Support and Administration","Help desk and systems administration for daily operations.",["Tier 1 and 2","Systems admin","Onboarding"]],
["care","🎧","Customer Care","Friendly, trained agents for voice, chat and email support.",["Voice","Chat","Email"]],
["back","🗂️","Back Office and Data Processing","Accurate, secure handling of documents, orders and records.",["Data entry","Claims","Order processing"]],
["fin","📊","Finance and Accounting","Bookkeeping, invoicing and reporting by trained accountants.",["Bookkeeping","Invoicing","Reporting"]],
["sales","📣","Sales and Marketing Support","Lead research, outreach support and campaign operations.",["Lead research","Campaigns","CRM updates"]]];
$("#svcMenu").innerHTML=SERVICES.map(x=>`<a href="#/services/${x[0]}">${x[2]}</a>`).join("");
$("#fSvc").innerHTML=SERVICES.map(x=>`<a href="#/services/${x[0]}">${x[2]}</a>`).join("");
$("#svcHome").innerHTML=SERVICES.map(x=>`<a class="card svc" href="#/services/${x[0]}"><div class="ico">${x[1]}</div><h3>${x[2]}</h3><p>${x[3]}</p><span class="more">Learn more</span></a>`).join("");
$("#svcList").innerHTML=SERVICES.map(x=>`<article class="card" id="s-${x[0]}"><div class="ico">${x[1]}</div><h3>${x[2]}</h3><p>${x[3]}</p><div>${x[4].map(t=>`<span class="tag">${t}</span>`).join("")}</div></article>`).join("");
$("#collage").innerHTML=[["🤝","Teamwork"],["🎓","Learning"],["🏏","Sports day"],["🍽️","Team lunch"],["🏆","Awards"],["🎉","Celebrations"]].map(x=>`<div><span>${x[0]}</span>${x[1]}</div>`).join("");
$("#tPhone").textContent=CONFIG.whatsappShow;$("#tPhone").href="tel:+"+CONFIG.whatsapp;
$("#tMail").textContent=CONFIG.email;$("#tMail").href="mailto:"+CONFIG.email;$("#tAddr").textContent=CONFIG.address;
$("#fMail").textContent=CONFIG.email;$("#fMail").href="mailto:"+CONFIG.email;$("#fCar").textContent=CONFIG.careersEmail;$("#fCar").href="mailto:"+CONFIG.careersEmail;

const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
 const el=e.target,n=+el.dataset.n,sf=el.dataset.s||"";
 if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
 const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1200);el.textContent=Math.round(n*k)+sf;if(k<1)requestAnimationFrame(f)})(t0)}));
$$(".num").forEach(e=>io.observe(e));
const ICONS={
Facebook:'<path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z"/>',
LinkedIn:'<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
Instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3"/>',
YouTube:'<path fill-rule="evenodd" d="M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4zm4 4.5v5l4.5-2.5z"/>',
X:'<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/>'};
const SOC=Object.entries(CONFIG.socials).filter(e=>e[1]).map(e=>`<a href="${e[1]}" target="_blank" rel="noopener" aria-label="${e[0]}" title="${e[0]}"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">${ICONS[e[0]]||""}</svg></a>`).join("");
["#soc","#soc2","#soc3"].forEach(i=>{const el=$(i);if(el)el.innerHTML=SOC});
/* testimonials: SAMPLE quotes, replace with real employee feedback */
const TESTI=[
["AK","Ayesha K.","Customer Support Agent","I joined as a fresher. The paid training gave me confidence to talk to US customers from week one."],
["HR","Hamza R.","Technical Support","My team leader coaches me every week. I was promoted to senior agent within a year."],
["SM","Sara M.","Web Developer","Good equipment, a friendly team and real chances to learn new technologies."],
["UF","Usman F.","Team Leader","Comtanix promotes from within. I started as an agent and now lead a team of my own."],
["NZ","Noor Z.","Back Office Executive","Clear targets, fair reviews and a supportive team. I always know where I stand."]];
const TCARD=TESTI.map(t=>`<div class="card quote"><div class="stars" role="img" aria-label="5 out of 5">★★★★★</div><q>${t[3]}</q><div class="who"><div class="av">${t[0]}</div><div><b>${t[1]}</b><span>${t[2]}</span></div></div></div>`).join("");
$("#tSlide").innerHTML=TCARD;$("#tGrid").innerHTML=TCARD;
const smooth=matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth";
$("#tPrev").onclick=()=>$("#tSlide").scrollBy({left:-360,behavior:smooth});
$("#tNext").onclick=()=>$("#tSlide").scrollBy({left:360,behavior:smooth});
addEventListener("hashchange",route);route();
$("#menu").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)};
$$("[data-role]").forEach(a=>a.addEventListener("click",()=>{$("#role").value=a.dataset.role}));
/* clocks */
function tick(){
 const now=new Date();
 $$("[data-tz]").forEach(e=>{const tz=e.dataset.tz==="OFFICE"?CONFIG.officeTz:e.dataset.tz;
  try{e.textContent=now.toLocaleTimeString("en-US",{timeZone:tz,hour:"numeric",minute:"2-digit"})}catch(x){}});
 try{
  const p=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hour:"numeric",hour12:false,weekday:"short"}).formatToParts(now);
  const h=+p.find(x=>x.type==="hour").value%24,d=p.find(x=>x.type==="weekday").value;
  const open=!["Sat","Sun"].includes(d)&&h>=9&&h<17;
  $("#dot").className="dot"+(open?" live":"");
  $("#stat").textContent=open?"US business hours now. Our teams are live.":"Outside US business hours. Night shifts are running.";
 }catch(x){}
}
tick();setInterval(tick,30000);
/* apply form */
$("#form").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target),cv=f.get("cv"),err=$("#cvErr"),has=!!(cv&&cv.name);err.textContent="";
 if(has){
  if(!/\.(pdf|docx?)$/i.test(cv.name)){err.textContent="Please choose a PDF or Word file.";return}
  if(cv.size>5*1024*1024){err.textContent="Your CV is larger than 5 MB. Please choose a smaller file.";return}
 }
 if(CONFIG.formEndpoint){
  try{const r=await fetch(CONFIG.formEndpoint,{method:"POST",body:f,headers:{Accept:"application/json"}});
   if(r.ok){$("#sent").textContent="Application received. Our team will contact you soon.";e.target.reset();return}}catch(x){}
 }
 const t=`Job application - Comtanix\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nPosition: ${f.get("role")}\nExperience: ${f.get("exp")}`+(f.get("msg")?`\nNote: ${f.get("msg")}`:"")+(has?`\nCV: ${cv.name} (sending it in this chat)`:"");
 window.open(wa(t),"_blank","noopener");
 $("#sent").textContent=has?`WhatsApp opened. Press send, then tap the paperclip, choose Document and pick "${cv.name}" to send your CV.`:"WhatsApp opened with your application. Press send there to finish.";
});

const C="basket-app-v2",LIB="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all([c.addAll(A),fetch(new Request(LIB,{mode:"no-cors"})).then(r=>c.put(LIB,r)).catch(()=>{})])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Bibliothèque Supabase : cache d'abord (pour démarrer hors connexion). Pages de l'application : réseau d'abord, cache en secours.
// Les requêtes vers Supabase (données, comptes, images) ne sont jamais interceptées.
self.addEventListener("fetch",e=>{const r=e.request;
 if(r.method!=="GET")return;
 if(r.url===LIB){e.respondWith(caches.match(LIB).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(LIB,cp));return res})));return}
 if(new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});

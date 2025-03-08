const CACHE_NAME = " convertidor de temperatura-v1";

self.addEventListener('install',event =>{
    event.waitUntil((async()=>{
        const cache = await cache.open(CACHE_NAME);
        cache.addsAll([
            './',
            //'./index.html',
            './js/converter.js',
            './css/style.css'
        ]);
    }))();
});

self.addEventListener('fetch',event=>{
    event.respondwith((async()=>{
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if(cachedResponse){
            return cachedResponse;
        }else{
            try{
                const fetchResponse = await fetch(event.request);
                cache.put(event.request,fetchResponse.clone());
                return fetchResponse;
            }catch(e){
                //Hubo problema de red de datos.
            }
        }
    })());
})
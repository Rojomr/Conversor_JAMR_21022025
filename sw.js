const CACHE_NAME = "convertidor-de-temperatura-v1";

self.addEventListener('install', event => {
    // Usamos event.waitUntil para asegurarnos de que el Service Worker se instale correctamente
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './',
                './js/converter.js',
                './css/style.css'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Si hay una respuesta en caché, la devolvemos
            if (cachedResponse) {
                return cachedResponse;
            }

            // Si no está en caché, hacemos la solicitud de red
            return fetch(event.request).then(fetchResponse => {
                // Almacenamos la respuesta en caché y la devolvemos
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }).catch(() => {
                // Si ocurre un error en la red, devolvemos un mensaje alternativo
                return new Response('No se puede acceder a la red.');
            });
        })
    );
});

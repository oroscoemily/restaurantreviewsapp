console.log("Service Worker is registered!");

const cacheFiles = [
  '/',
  '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

const version = 'v1';

self.addEventListener('install', function(evt){
	evt.waitUntil(
		caches.open('v1').then(function(cache) {
      	return cache.addAll(cacheFiles);
    }));
});
/*https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker*/

self.addEventListener('fetch', function(evt){
	console.log(evt.request.url);
	evt.respondWith(
		caches.match(evt.request.url).then(function(response){
            if (response){
                console.log("Found " + evt.reponse);
                return response

            } else{
                console.log(evt.response + " not found. Fetching...");
                return fetch(evt.request.url)
                .then(function(response){
                    const cloneResponse = response.clone()
                    caches.open('v1').then(function(cache) {
                        return cache.put(evt.request, cloneResponse);
                })
                    return reponse
            })   
		
                .catch(function(err){
                    console.log(err)
                })
            }
	}));
});

/*https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/*/

self.addEventListener('activate', evt => {
  console.log('V1 now ready to handle fetches!');
});

/*https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle*/











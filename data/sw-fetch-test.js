/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var CACHE_NAME = 'cache-test';

var installList = [
  '/echo/test-1',
  '/echo/test-2'
];

self.addEventListener('install', function(event) {
  console.log('SW: Install event');
  // self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(installList);
      }).
      then(() => {
        console.log('SW: All cached');
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('SW: activate event');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(cachedResponse) {
      console.log('sw-fetch-test: Handling cache / no cache response');
      if (cachedResponse) {
        return cachedResponse.text();
      }

      return 'from-network-placeholder';
    })
    .then((responseText) => {
      console.log('sw-fetch-test: Responding with: ' + responseText + '-sw');
      return new Response(responseText + '-sw');
    })
  );
});

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

// This is a test and we want descriptions to be useful, if this
// breaks the max-length, it's ok.

/* eslint-disable max-len */

window.chai.should();

var CACHE_NAME_1 = 'cache-test-1';
var CACHE_NAME_2 = 'cache-test-2';

describe('Service Worker Test', function() {
  this.timeout(5000);

  beforeEach(function(done) {
    Promise.all([
      SWTestHelper.unregisterAllRegistrations(),
      SWTestHelper.clearAllCaches()
    ])
    .then(() => {
      var iframeList = document.querySelectorAll('.js-test-iframe');
      for (var i = 0; i < iframeList.length; i++) {
        iframeList[i].parentElement.removeChild(iframeList[i]);
      }
    })
    .then(() => {
      console.log('\n\n----\n\n');
      done();
    }).catch(done);
  });

  after(function(done) {
    Promise.all([
      SWTestHelper.unregisterAllRegistrations(),
      SWTestHelper.clearAllCaches()
    ])
    .then(() => {
      var iframeList = document.querySelectorAll('.js-test-iframe');
      for (var i = 0; i < iframeList.length; i++) {
        iframeList[i].parentElement.removeChild(iframeList[i]);
      }
    })
    .then(() => done()).catch(done);
  });

  describe('Generic / Basic SW Tests', () => {
    it('should be able to support service workers (SW)', function() {
      var isSupported = ('serviceWorker' in navigator);
      isSupported.should.equal(true);
    });

    it('should register a sw', function(done) {
      SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/1/3', {})
      .then(() => {
        done();
      })
      .catch(() => {
        done(new Error('Unable to register a SW.'));
      });
    });
  });

  // These tests install two different service workers and compares the resulting
  // cached assets.
  // The main things being toyed with in each test are:
  //    1.) no-file-cache vs file-cache - this means the files cached during
  //        install return no cache headers or a year long cache header.
  //        This allows to see how the HTTP cache affects tests.
  //    2.) no-file-rev vs file-rev - this allows you to see how the change the
  //        file name affects freshness.
  describe('Asset Changing Tests. This focuses file names and cache headers', () => {
    it('should update cached assets with same file names and no cache headers.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/1/3')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/2/3');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_2);
        })
        .then((cachedAssets) => {
          var cachedAssetsKeys = Object.keys(cachedAssets);
          for (var i = 0; i < cachedAssetsKeys.length; i++) {
            var key = cachedAssetsKeys[i];
            if (!firstCachedAssets[key]) {
              // Nothing to compare so latest cached asset must be unique
              continue;
            }

            if (cachedAssets[key] === firstCachedAssets[key]) {
              throw new Error('Two results match in text');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });

    it('should update cached assets with revisioned file names and no cache headers.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/no-file-cache/file-rev/1/3')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/no-file-cache/file-rev/2/3');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_2);
        })
        .then((cachedAssets) => {
          var cachedAssetsKeys = Object.keys(cachedAssets);
          for (var i = 0; i < cachedAssetsKeys.length; i++) {
            var key = cachedAssetsKeys[i];
            if (!firstCachedAssets[key]) {
              // Nothing to compare so latest cached asset must be unique
              continue;
            }

            console.log('Comparing: ' + key);

            if (cachedAssets[key] === firstCachedAssets[key]) {
              throw new Error('Two results match in text');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });

    it('should update cached assets with same file names and cache headers.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/file-cache/no-file-rev/1/3')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/file-cache/no-file-rev/2/3');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_2);
        })
        .then((cachedAssets) => {
          var cachedAssetsKeys = Object.keys(cachedAssets);
          for (var i = 0; i < cachedAssetsKeys.length; i++) {
            var key = cachedAssetsKeys[i];
            if (!firstCachedAssets[key]) {
              // Nothing to compare so latest cached asset must be unique
              continue;
            }

            if (cachedAssets[key] === firstCachedAssets[key]) {
              throw new Error('Two results match in text');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });

    it('should update cached assets with revisioned file names and cache headers.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/file-cache/file-rev/1/3')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/file-cache/file-rev/2/3');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_2);
        })
        .then((cachedAssets) => {
          var cachedAssetsKeys = Object.keys(cachedAssets);
          for (var i = 0; i < cachedAssetsKeys.length; i++) {
            var key = cachedAssetsKeys[i];
            if (!firstCachedAssets[key]) {
              // Nothing to compare so latest cached asset must be unique
              continue;
            }

            if (cachedAssets[key] === firstCachedAssets[key]) {
              throw new Error('Two results match in text');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });
  });

  describe('Cached Assets Tests', () => {
    it('should manage one cache with one file, updating to a new value. No cache or file rev.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/1/1/1')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/1/1/2');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          var firstCacheKeys = Object.keys(firstCachedAssets);
          var cachedKeys = Object.keys(cachedAssets);
          if (firstCacheKeys.length !== cachedKeys.length) {
            throw new Error('The number of cached assets aren\'t the same');
          }

          for (var i = 0; i < cachedKeys.length; i++) {
            if (cachedAssets[cachedKeys[i]] ===
            firstCachedAssets[cachedKeys[i]]) {
              throw new Error('The values are the same when they should ' +
                'be unique');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });

    it('should manage one cache with one file, updating to a new value. Cache headers, no file rev.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/file-cache/no-file-rev/1/1/1')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/file-cache/no-file-rev/1/1/2');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          var firstCacheKeys = Object.keys(firstCachedAssets);
          var cachedKeys = Object.keys(cachedAssets);
          if (firstCacheKeys.length !== cachedKeys.length) {
            throw new Error('The number of cached assets aren\'t the same');
          }

          for (var i = 0; i < cachedKeys.length; i++) {
            if (cachedAssets[cachedKeys[i]] ===
            firstCachedAssets[cachedKeys[i]]) {
              throw new Error('The values are the same when they should ' +
                'be unique');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });

    it('should manage one cache with one file, updating to a new value. No cache headers, with file revisioning.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/no-file-cache/file-rev/1/1/1')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/no-file-cache/file-rev/1/1/2');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          var firstCacheKeys = Object.keys(firstCachedAssets);
          var cachedKeys = Object.keys(cachedAssets);
          if (firstCacheKeys.length !== cachedKeys.length) {
            throw new Error('The number of cached assets has increased when it shouldn\'t have');
          }

          for (var i = 0; i < cachedKeys.length; i++) {
            if (cachedAssets[cachedKeys[i]] ===
            firstCachedAssets[cachedKeys[i]]) {
              throw new Error('The values are the same when they should ' +
                'be unique');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });

    it('should manage one cache with one file, updating to a new value. With cache headers and file revisioning.', function(done) {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw/file-cache/file-rev/1/1/1')
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw/file-cache/file-rev/1/1/2');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
        })
        .then((cachedAssets) => {
          var firstCacheKeys = Object.keys(firstCachedAssets);
          var cachedKeys = Object.keys(cachedAssets);
          if (firstCacheKeys.length !== cachedKeys.length) {
            throw new Error('The number of cached assets has increased when it shouldn\'t have');
          }

          for (var i = 0; i < cachedKeys.length; i++) {
            if (cachedAssets[cachedKeys[i]] ===
            firstCachedAssets[cachedKeys[i]]) {
              throw new Error('The values are the same when they should ' +
                'be unique');
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });
  });

  describe('Smart Upgrades', () => {
    // At the moment this requires a range of things to be defined
    // but at the moment this explains the goal.
    it('should check that files can remain the same, be updated by file revision and be removed / added between sw\'s', (done) => {
      var firstCachedAssets = [];
      SWTestHelper.installSW('/sw-upgrade-test-1.js')
        .then(() => {
          return SWTestHelper.getAllCachedAssets('cache-test');
        })
        .then((cachedAssets) => {
          firstCachedAssets = cachedAssets;
          return SWTestHelper.installSW('/sw-upgrade-test-2.js');
        })
        .then(() => {
          return SWTestHelper.getAllCachedAssets('cache-test');
        })
        .then((cachedAssets) => {
          var firstCacheKeys = Object.keys(firstCachedAssets);
          for (var i = 0; i < firstCacheKeys.length; i++) {
            var firstCacheKey = firstCacheKeys[i];
            if (firstCacheKey.indexOf('/file/shared') >= 0) {
              if (firstCachedAssets[firstCacheKey] !==
                cachedAssets[firstCacheKey]) {
                throw new Error('/file/shared should not change');
              }
            } else if (firstCacheKey.indexOf('/file/upgrade') >= 0) {
              if (firstCachedAssets[firstCacheKey] ===
                cachedAssets[firstCacheKey]) {
                throw new Error('/file/upgrade should have changed values');
              }
            } else if (firstCacheKey.indexOf('/file/remove') >= 0) {
              if (typeof(cachedAssets[firstCacheKey]) !== 'undefined') {
                throw new Error('/file/remove should not be in the cache since it\'s not included in the second sw');
              }
            }

            delete cachedAssets[firstCacheKey];
          }

          var remainingKeys = Object.keys(cachedAssets);
          for (i = 0; i < remainingKeys.length; i++) {
            if (remainingKeys[i].indexOf('/file/new') < 0) {
              throw new Error('Found a cached asset other than new: ' +
                remainingKeys[i]);
            }
          }
        })
        .then(() => {
          done();
        }).catch((err) => {
          done(err);
        });
    });
  });

  describe('Test fetch behaviour', () => {
    it('should have two cached assets', (done) => {
      SWTestHelper.activateSW('/sw-fetch-test.js')
        .then(() => {
          return SWTestHelper.getAllCachedAssets('cache-test');
        })
        .then((cachedAssets) => {
          Object.keys(cachedAssets).should.have.length(2);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    // These tests should be fixed once the above test case is fixed.
    // Current you can't test multiple activated sw from a single page
    it('should return cached echo response 1 with -sw on the end', (done) => {
      SWTestHelper.createNewIframe()
        .then((iframe) => {
          return SWTestHelper.activateSW('/sw-fetch-test.js')
            .then(() => {
              return iframe.contentWindow.fetch('/echo/test-1');
            });
        })
        .then((response) => {
          return response.text();
        })
        .then((responseText) => {
          responseText.should.equal('test-1-sw');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should return cached echo response 2', (done) => {
      SWTestHelper.createNewIframe()
        .then((iframe) => {
          return SWTestHelper.activateSW('/sw-fetch-test.js')
            .then(() => {
              return iframe.contentWindow
                .fetch('/echo/test-2');
            });
        })
        .then((response) => {
          return response.text();
        })
        .then((responseText) => {
          console.log(responseText);
          responseText.should.equal('test-2-sw');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should return a response to indicate it would come from the network for same origin url', (done) => {
      SWTestHelper.createNewIframe()
        .then((iframe) => {
          return SWTestHelper.activateSW('/sw-fetch-test.js')
            .then(() => {
              return iframe.contentWindow
                .fetch('/url-from-network');
            });
        })
        .then((response) => {
          return response.text();
        })
        .then((responseText) => {
          responseText.should.equal('from-network-placeholder-sw');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should return a response to indicate it would come from the network for remote origin url', (done) => {
      SWTestHelper.createNewIframe()
        .then((iframe) => {
          return SWTestHelper.activateSW('/sw-fetch-test.js')
            .then(() => {
              return iframe.contentWindow
                .fetch('https://google.com/');
            });
        })
        .then((response) => {
          return response.text();
        })
        .then((responseText) => {
          responseText.should.equal('from-network-placeholder-sw');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

# Service Worker Unit Testing

This is a sample project demonstrating (and to a certain extent) exploring
how you could unit test a service worker using [mocha](https://mochajs.org/)
and [chai](http://chaijs.com/).

## Introduction

This is the result of a day of seeing what scenarios you could test for in
your service worker as well as what kind of set up would aid this.

It's likely this will change over time to document more edge cases and better
practices for testing.

## Pre-requisites

To run this sample you'll need the following:

- [Node + NPM](https://nodejs.org/en/)
- [Bower](http://bower.io/)

## Getting Started

To run the tests run the following commands

    npm install && bower install
    node app.js

Then open a browser with service worker support and go to
[http://localhost:3851/](http://localhost:3851/).

At the moment this is only tested in Chrome.

License
-------

Copyright 2015 Google, Inc.

Licensed to the Apache Software Foundation (ASF) under one or more contributor
license agreements.  See the NOTICE file distributed with this work for
additional information regarding copyright ownership.  The ASF licenses this
file to you under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License.  You may obtain a copy of
the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
License for the specific language governing permissions and limitations under
the License.

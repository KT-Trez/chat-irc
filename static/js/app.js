"use strict";
import start from './templates/start.js'

window.addEventListener('DOMContentLoaded', async () => {
  console.log('Loaded: app.js');

  start.mount();
});
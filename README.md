# Chat IRC
Internet Relay Chat (IRC) that uses Long-Polling to listen for messages.

# Usage
1. Type in your nickname `ex.: John Smith`
2. The chat will start automatically after entering and confirming the nickname
3. Message others and have fun

Chat supports commands, type in `/help` to see the list.

# How to run
1. Install one of the 16.x versions of Node.js
2. Install dependencies with `npm install`
3. Start server with `npm run start`
4. At default, app runs at http://localhost:3000

# Optional config
Default app's port can be changed with env variable `PORT` or [directly in file](./server.js).
```js
const port = process.env.PORT || 3000;
```

# Scripts
- `npm run start` - starts the web server required to use the app
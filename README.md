# Block'd Game

Simple game application. <br/>
Destroy equal blocks group and get scores.
Game over when there is no equal blocks group on the board.

[You can check the game right here!](https://rawgit.com/katesmr/BlockDGame/master/index.html)


# Usage

Run server to start play. <br/>
For example python server. <br/>
Python 2:
```
python -m SimpleHTTPServer <port>
```
Python 3:
```
python3 -m http.server <port>
```

In browser url:
```
http://localhost:<port>/index.html
```
If you edited code you will must build changes.
Go to root directory and build:
```
npm run build
```
For run all tests go to root directory and run command:
```
npm test
```
For run single file test add full path to file:
```
npm test test/test.NAME.js
``` 


# Dependencies

Before run application you must install all dependencies (dependencies in package.json).
Run command from main directory:
```
npm install
```

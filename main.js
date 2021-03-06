var fs       = require ('fs');
var readLine = require ('readline');

var Trie     = require ('./trie');
var Board    = require('./board');

// Main
var trie = new Trie ();

var rd = readLine.createInterface (
    {
        input: fs.createReadStream ('/Users/blakedietz/Dropbox/code/spell-tower-solver/test-dict.txt'),
        output: process.stdout,
        terminal: false
    });

//rd.on ('line', function (line)
//{
//    trie.addWord.call (trie, line);
//    console.log (trie.checkIfWord.call (trie, line));
//});

var board = new Board(3, 3);
board.printBoard();
var fs       = require ('fs'),
    readline = require ('readline');



function TrieNode()
{
    this.isLeaf = true;
    this.isWord = false;
    this.nodes  = {};
}

TrieNode.prototype.leaf         = leaf;
TrieNode.prototype.word         = word;
TrieNode.prototype.addCharacter = addCharacter;
TrieNode.prototype.getChild     = getChild;

function Trie()
{
    this.nodes = new TrieNode();
}

Trie.prototype.addWord     = addWord;
Trie.prototype.validPrefix = validPrefix;
Trie.prototype.checkIfWord = checkIfWord;

(function Main()
{
    var trie = new Trie();

    var rd = readline.createInterface (
        {
            input    : fs.createReadStream ('/Users/blakedietz/Dropbox/code/spell-tower-solver/spell-tower-solver/packages/system/server/test-dict.txt'),
            output   : process.stdout,
            terminal : false
        });

    rd.on ('line', function(line)
    {
        trie.addWord.call(trie, line);
        console.log(trie.checkIfWord.call(trie, line));
    });

})();

// Trie
function addWord(word)
{
    var currentNode = this.nodes;
    var wordLength  = word.length;

    for (var i = 0; i < wordLength; i++)
    {
        var atEndOfWord = ((word.length - 1) == i);
        currentNode     = currentNode.addCharacter(word[i].toLowerCase(), atEndOfWord);
    }
}

/**
 * @param {string} prefixString
 */
function validPrefix(prefixString)
{
    var currentNode    = this.nodes;

    var prefixLength   = prefixString.length;
    var isAValidPrefix = true;

    for(var i = 0; i < prefixLength; i++)
    {
        if (!(currentNode = currentNode.getChild(prefixString[i])))
        {
            isAValidPrefix = false;
            break;
        }
    }

    return isAValidPrefix;
}

function checkIfWord(word)
{
    var currentNode = this.nodes;

    var wordLength  = word.length;
    var isValid     = true;
    var isAWord     = false;

    for(var i = 0; i < wordLength; i++)
    {
        if (!(currentNode = currentNode.getChild(word[i])))
        {
            isValid = false;
            break;
        }
    }

    if (isValid)
    {
        isAWord = currentNode.word();
    }

    return isAWord;
}

// Trie Node

// Accessors
/**
 *
 * @param leaf
 * @returns {*}
 */
function leaf(leaf)
{
    if (!arguments.length) return this.isLeaf;

    this.isLeaf = leaf;
    return this;
}

/**
 *
 * @param {boolean} word
 * @returns {boolean}
 */
function word(word)
{
    if (!arguments.length) return this.isWord;

    this.isWord = word;
}

// Helpers
/**
 *
 * @param {string}  character
 * @param {boolean} isEndOfWord
 * @returns {*}
 */
function addCharacter(character, isEndOfWord)
{
    //If the character isn't in the nodes then add it.
    if (!(character in this.nodes))
    {
        // Add the new node
        this.nodes[character] = new TrieNode();
        if (isEndOfWord)
        {
            this.nodes[character].word(isEndOfWord);
        }

        // At this point the current node has children so it is no longer a leaf.
        this.leaf(false);
    }

    return this.nodes[character];
}

/**
 *
 * @param character
 * @returns {*}
 */
function getChild(character)
{
    if (character in this.nodes)
    {
        return this.nodes[character];
    }

    return null;
}
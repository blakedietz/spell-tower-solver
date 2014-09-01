var TrieNode = require ('./trie-node')

function Trie ()
{
    this.nodes = new TrieNode ();
}

Trie.prototype.addWord = addWord;
Trie.prototype.validPrefix = validPrefix;
Trie.prototype.checkIfWord = checkIfWord;

module.exports = Trie;

// Trie
function addWord (word)
{
    var currentNode = this.nodes;
    var wordLength = word.length;

    for (var i = 0; i < wordLength; i++)
    {
        var atEndOfWord = ((word.length - 1) == i);
        currentNode = currentNode.addCharacter (word[i].toLowerCase (), atEndOfWord);
    }
}

/**
 * @param {string} prefixString
 */
function validPrefix (prefixString)
{
    var currentNode = this.nodes;

    var prefixLength = prefixString.length;
    var isAValidPrefix = true;

    for (var i = 0; i < prefixLength; i++)
    {
        if (!(currentNode = currentNode.getChild (prefixString[i])))
        {
            isAValidPrefix = false;
            break;
        }
    }

    return isAValidPrefix;
}

function checkIfWord (word)
{
    var currentNode = this.nodes;

    var wordLength = word.length;
    var isValid = true;
    var isAWord = false;

    for (var i = 0; i < wordLength; i++)
    {
        if (!(currentNode = currentNode.getChild (word[i])))
        {
            isValid = false;
            break;
        }
    }

    if (isValid)
    {
        isAWord = currentNode.word ();
    }

    return isAWord;
}
// Trie Node
function TrieNode ()
{
    this.isLeaf = true;
    this.isWord = false;
    this.nodes  = {};
}

TrieNode.prototype.leaf         = leaf;
TrieNode.prototype.word         = word;
TrieNode.prototype.addCharacter = addCharacter;
TrieNode.prototype.getChild     = getChild;

module.exports = TrieNode;

// Accessors
/**
 *
 * @param leaf
 * @returns {*}
 */
function leaf (leaf)
{
    if (!arguments.length)
    {
        return this.isLeaf;
    }

    this.isLeaf = leaf;
    return this;
}

/**
 *
 * @param {boolean} word
 * @returns {boolean}
 */
function word (word)
{
    if (!arguments.length)
    {
        return this.isWord;
    }

    this.isWord = word;
}

// Helpers
/**
 *
 * @param {string}  character
 * @param {boolean} isEndOfWord
 * @returns {*}
 */
function addCharacter (character, isEndOfWord)
{
    //If the character isn't in the nodes then add it.
    if (!(character in this.nodes))
    {
        // Add the new node
        this.nodes[character] = new TrieNode ();
        if (isEndOfWord)
        {
            this.nodes[character].word (isEndOfWord);
        }

        // At this point the current node has children so it is no longer a leaf.
        this.leaf (false);
    }

    return this.nodes[character];
}

/**
 *
 * @param character
 * @returns {*}
 */
function getChild (character)
{
    if (character in this.nodes)
    {
        return this.nodes[character];
    }

    return null;
}

function Tile (column, row, type, letter)
{
    this.column    = column;
    this.row       = row;
    this._type     = type;
    this._letter   = letter ? letter : null;

    /**
     * @type {boolean}
     * @private
     */
    this._isMarked = false;
}

Tile.prototype.type     = tileType;
Tile.prototype.letter   = letter;
Tile.prototype.toString = toString;
Tile.prototype.equal    = equal;

module.exports = Tile;

// Public
function letter(letter)
{
    if (!arguments.length) return this._letter;

    this._letter = letter;

    return this;
}

function tileType(type)
{
    if (!arguments.length) return this._type;

    this._type = type;

    return this;
};

function marked(isMarked)
{
    if (!arguments.length) return this._isMarked;
    this._isMarked = isMarked;

    return this;
}

/**
 * @returns {string}
 */
function toString()
{
    var myRepresentation = '';
    myRepresentation    += '[ ' + this._letter + (this._isMarked ? '*' : ' ') + ' ]';

    return myRepresentation;
}

/**
 * @param {Tile} tile
 * @returns {boolean}
 */
function equal(tile)
{
    return this.column == tile.column && this.row == tile.row;
}
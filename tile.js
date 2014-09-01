function Tile (column, row, type, letter)
{
    this.column  = column;
    this.row     = row;
    this._type   = type;
    this._letter = letter ? letter : null;
}

Tile.prototype.type   = tileType;
Tile.prototype.letter = letter;

module.exports = Tile;

function letter(letter)
{
    if (!arguments.length) return this._letter;

    this._letter = letter;
}

function tileType(type)
{
    if (!arguments.length) return this._type;

    this._type = type;
};

function Pixel(x, y) {
    this.x = x;
    this.y = y;
    this.calculateEnergy = function(image) {
        return calculateEnergy(this.x, this.y, image);
    };
}

function calculateEnergy(x, y, image) {
    return Infinity;
}

module.exports = {
    Pixel: Pixel,
    calculateEnergy: calculateEnergy
};

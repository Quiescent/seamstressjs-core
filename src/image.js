module.exports = Image;

function Image(image) {
    this.image = image;
    this.energyMap = function() {
        return energyMap(this.image);
    };
    this.toImage = function(target) {
        return toImage(this.image, target);
    };
    this.carve = function(target) {
        return carve(this.image, target);
    };
};

function energyMap(image) {
    return image;
}

function toImage(image, target) {
    return image;
}

function carve(image, target) {
    return new Image(image);
}

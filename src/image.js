function createImage(image) {
    return {
        image : image,
        energyMap : function() {
            return energyMap(image);
        },
        toImage : function(target) {
            return toImage(image, target);
        },
        carve : function(target) {
            return carve(image, target);
        }
    };
};

function energyMap(image) {
    return image;
}

function toImage(image, target) {
    return image;
}

function carve(image, target) {
    return createImage(image);
}

module.exports = createImage;

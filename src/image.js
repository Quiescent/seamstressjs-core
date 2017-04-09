function createImage(image) {
  return {
    image: image,
    energyMap: function () {
      return energyMap(this);
    },

    toImage: function (target) {
      return toImage(image, target);
    },

    carve: function (target) {
      return carve(image, target);
    },

    width: function () {
      return image.length;
    },

    height: function () {
      if (!image[0]) return 0;
      return image[0].length;
    }
  };
};

function energyMap(self) {
  const energyMap = [];
  const height = self.height();
  const width = self.width();
  for (var row = 0; row != height; ++row) {
    let newEnergyRow = [];
    for (var column = 0; column != width; ++column) {
      const pixel = self.getPixel(row, column);
      const energy = pixel.calculateEnergy(self);
      newEnergyRow.push(energy);
    }

    energyMap.push(newEnergyRow);
  }

  return energyMap;
}

function toImage(image, target) {
  return image;
}

function carve(image, target) {
  return createImage(image);
}

module.exports = createImage;

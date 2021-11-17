module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    }
  });

  return Product;
};
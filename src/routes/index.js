const fs = require('fs');
const path = require('path');
const basename  = path.basename(__filename);

const routes = fs.readdirSync(__dirname)
.filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename);
})
.map((file) => {
    return require(path.join(__dirname, file));
});

module.exports = routes;
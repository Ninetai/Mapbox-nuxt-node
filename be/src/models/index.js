const fs        = require('fs')
const Sequelize = require('sequelize')
const env       = process.env.NODE_ENV || 'development'
const config    = require(__dirname + '/../config/config.json')[env]
const path      = require('path')
const basename  = path.basename(module.filename)
const db        = {}

console.log(config)
let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

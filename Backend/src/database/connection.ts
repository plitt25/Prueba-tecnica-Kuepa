import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('kuepa_classroom_api','root','admin',{
    host: 'localhost',
    dialect: 'mysql'
})
export default sequelize
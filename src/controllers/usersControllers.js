const knex = require('../database/migrations/knex/index')
const bcrypt = require('bcryptjs')
const AppError = require('../utils/AppError')


class UsersControllers {

    async deleteUsers(req, res) {
        await knex("users").delete()
        res.json()
    }

    async updatePassword (req, res){
        const {id} = req.query
        const {
            oldPassword,
            newPassword
        } = req.body 

        
        const actualPassword = await knex('users')
        .select('password', 'id')
        .where({id})
        .first()

        if(!actualPassword){
            console.log(actualPassword)
            throw new AppError('nao existe')
        }
        console.log(actualPassword.password)
        console.log(oldPassword)

        const checkedPassword = await bcrypt.compare(oldPassword, actualPassword.password )

        if(checkedPassword) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 8)
            const user_id = await knex("users")
            .where({id})
            .update({password : hashedNewPassword})

            res.send({user_id})
        } else throw new AppError('a senha antiga está inválida')
    }
    async createUser(request, response){
        const {
            name,
            email,
            biography,
        } = request.body
        let {password} = request.body
        
        const emailExists = await knex('users')
        .where({email}).first()
        console.log(emailExists)
        if(!emailExists){
            const hashedPassword = await bcrypt.hash(password, 8)
            password = hashedPassword
            const user_id = await knex("users").insert({
                name,
                email ,
                password,
                biography
            })
    
            response.json(user_id)
        } else { 
            throw new AppError('email cadastrado')

        }

        
    }
}
module.exports = UsersControllers
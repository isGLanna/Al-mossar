import bcrypt from 'bcrypt'
import User from '../models/user'
import { Enterprise } from '../models/enterprise';
import sequelize from '../models/'

/* Verificações:
  - empresa existe
  - usuário já existe em uma mesma empresa (email and id_enterprise)
  - dominio válido
  - tamanho do nome e sobrenome ([16], [48])
  - tamanho da senha ([6 - 16)]
*/

export const authenticateRegister = async(
  name: string, 
  surname: string, 
  email: string, 
  password: string, 
  id_enterprise: number,
  start_of_contract: Date,
  role: string) => {

    // Verificação se a empresa existe
    const enterprise = await Enterprise.findOne({ where: {id: id_enterprise}})
    if (!enterprise) {
      return { success: false, message: 'Empresa não encontrada' };
    }

    // Verifica se o email já existe
    const existingUser = await User.findOne({ where: {email: email, id_enterprise: id_enterprise}})
    if (existingUser){
      return { success: false, message: 'Usuário já existe' };
    }

    // Verifica se o dominio é válido
    const domains = ['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com']
    const domainUser = email.split('@')[1]
    if (!domains.includes(domainUser)){
      return { success: false, message: 'Dominio inválido' };
    }

  // Verifica se o nome/sobrenome está fora do tamanho proposto ou vazio
    if (name.length > 16 || !name || surname.length > 48 || !surname)
      return { success: false, message: 'Nome ou sobrenome forado padrão' };

    // Verifica se a senha está fora do tamanho proposto
    if (password.length > 16 || password.length < 4)
      return { success: false, message: 'Senha fora do padrão' };

    const user = { 
      name, 
      surname, 
      email, 
      password, 
      id_enterprise,
      start_of_contract, // Convertendo Date para "YYYY-MM-DD"
      role 
    };

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await User.create({
        name,
        surname,
        email,
        password: hashedPassword,
        id_enterprise,
        start_of_contract,
        role
      })

      console.log('usuário criado com sucesso')

      return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err}
    }
  }
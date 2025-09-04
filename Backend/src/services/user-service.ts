import { PhotoManager } from '../repositories/user-photo'
import sequelize from '../repositories'
import { QueryTypes } from 'sequelize'

export class User {
  
  static async getUserPhoto(token: string) {
    try {
      let idResult = await sequelize.query<{ id: number }> (
        `SELECT id FROM client WHERE token = :token`,
        {
          replacements: { token },
          type: QueryTypes.SELECT
        }
      )

      if (idResult.length > 0) {
        const data = await PhotoManager.getUserPhoto(idResult[0].id, 'client')
        if(data.photo){
          return data.photo
        }
      }

      idResult = await sequelize.query<{ id: number}> (
        `SELECT id FROM employee WHERE token = :token`,
        {
          replacements: { token },
          type: QueryTypes.SELECT
        }
      )

      if(idResult.length > 0) {
        const data = await PhotoManager.getUserPhoto(idResult[0].id, 'employee')
        if(data.photo){
          return data.photo
        }
      }

      return {photo: null}

    }catch(error) {
      return { status: 500}
    }
  }
}
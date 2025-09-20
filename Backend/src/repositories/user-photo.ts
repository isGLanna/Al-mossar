import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function getEmployeePhoto (employeeId: number){
  try{
    const photoPath = path.join(__dirname, '../../uploads/employee', `${employeeId}.webp`)


    if (!fs.existsSync(photoPath)){
      return {
        exists: false,
      }
    }

    const protoBuffer = fs.readFileSync(photoPath)
    const base64 = protoBuffer.toString('base64')
    const dataUrl = `data:image/webp;base64,${base64}`

    console.log('Daqui não tá passando', dataUrl)

    return {
      exists: true,
      photo: dataUrl
    }
  } catch(err){
    return {
      exists: false,
      message: 'Erro inesperado ao carregar foto'
    }
  }
}

export class PhotoManager {

  static async getUserPhoto(id: number, user: string) {
    try {
      let photoPath

      if(user === 'client') {
          photoPath = path.join(__dirname, '../../uploads/client', `client${id}.webp`)
      } else if (user === 'employee') {
        photoPath = path.join(__dirname, '../../uploads/employee', `${id}.webp`)
      } else {
        return { photo: null}
      }

      const protoBuffer = fs.readFileSync(photoPath)
      const base64 = protoBuffer.toString('base64')
      const dataUrl = `data:image/webp;base64,${base64}`

      return { photo: dataUrl }

    } catch(error) {
      return { photo: null }
    }
  }
}
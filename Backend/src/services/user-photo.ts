import { EmployeeImage } from '../repositories/user/employee-image'
import { ClientImage } from '../repositories/user/client-image'

export async function getUserPhoto(userId: number, userType: 'employee' | 'client') {
  try {
    let photoRecord: any = null

    if (userType === 'employee') {
      photoRecord = await EmployeeImage.findOne({
        where: { employeeId: userId },
        attributes: ['image'],
      })
    } else if (userType === 'client') {
      photoRecord = await ClientImage.findOne({
        where: { clientId: userId },
        attributes: ['image'],
      })
    } else {
      throw new Error(`Tipo de usuário inválido: ${userType}`)
    }

    if (!photoRecord) {
      return { exists: false }
    }

    const imageData = photoRecord.getDataValue('image')

    if (!imageData) {
      return { exists: false }
    }

    const base64 = imageData.toString('base64')
    const dataUrl = `data:image/webp;base64,${base64}`

    return {
      exists: true,
      photo: dataUrl,
    }
  } catch (err) {
    console.error(`Erro ao buscar foto do ${userType}:`, err)
    return {
      exists: false,
      message: `Erro inesperado ao carregar foto do ${userType}.`,
    }
  }
}

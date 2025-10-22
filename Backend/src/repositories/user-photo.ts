import { EmployeeImage } from './user/employee-image'

export async function getEmployeePhoto(employeeId: number) {
  try {
    const photoRecord = await EmployeeImage.findOne({
      where: { employee_id: employeeId },
      attributes: ['image'],
    })

    if (!photoRecord) {
      return { exists: false }
    }

    const imageData = photoRecord.getDataValue('image')

    const dataUrl = `data:image/webp;base64,${imageData}`

    return {
      exists: true,
      photo: dataUrl,
    }
  } catch (err) {
    console.error('Erro ao buscar foto do funcionário:', err)
    return {
      exists: false,
      message: 'Erro inesperado ao carregar foto do banco de dados.',
    }
  }
}

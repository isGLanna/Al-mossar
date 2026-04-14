import { Request, Response } from 'express'
import { RegisterEntityService } from '../services/register-entity-service'
import { createEnterpriseSchema, registerUserSchema } from '../validations/auth.schemas'
import { AppError } from '../utils/app-error'
import { ZodError } from 'zod'


export class RegisterEntity {
  constructor(private service: RegisterEntityService){}

  async registerEnterprise(req: Request, res: Response){
    const data = createEnterpriseSchema.parse(req.body)

    const result = await this.service.createEnterprise(data)

    res.status(201).json(result)
  }

  async registerUser (req: Request, res: Response) {
    const data = registerUserSchema.parse(req.body)

    const result = await this.service.registerUser(data);

    res.status(201).json(result)
  }

  async tokenLogin(req: Request, res: Response){
    const authHeader = req.headers['authorization']

    if(!authHeader) throw new AppError('Token não fornecido', 401)

    const token = authHeader.split(' ')[1]

    const profile = await this.service.getProfileByToken(token)

    res.status(200).json(profile)
  }
}
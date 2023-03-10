import { Request, Response } from "express"
import { listUsersService } from "../../services/user/listUsers.service"



export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService()
    return res.json(users)
}
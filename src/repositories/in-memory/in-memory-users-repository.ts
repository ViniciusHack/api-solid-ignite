import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";



export class InMemoryUsersRepository implements UsersRepository {
  public items:User[] = [];

  async create({ email, password_hash, name}: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name,
      email,
      password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(user => user.email === email)

    if(!user) {
      return null
    }

    return user
  }
  async findById(id: string) {
    const user = this.items.find(user => user.id === id)

    if(!user) {
      return null
    }

    return user
  }

}
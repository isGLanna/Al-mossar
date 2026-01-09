

export class MessageEntity {
  id: number
  text: string
  userName: string
  isUser: boolean
  photo: string | null

  timestamp: number
  read: boolean

  async getMessages() void { return; }
}
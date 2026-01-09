
// Algum dia tem que implementar isso
export class MessageEntity {
  id: number
  text: string
  userName: string

  timestamp: number
  read: boolean

  constructor(
    id: number,
    text: string,
    userName: string,
    timestamp: number,
    read: boolean
  ) {
    this.id = id
    this.text = text
    this.userName = userName
    this.timestamp = timestamp
    this.read = read
  }
  
  async getMessages(): Promise<void> { 
    return; 
  }
}
import { useState } from 'react'
import { IoIosPeople } from "react-icons/io"
import { HiMiniMinus } from "react-icons/hi2";
import { Avatar } from "../../atomos/avatar/avatar"
import "./chat.scss"

interface ChatProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface Message {
  id: number
  text: string
  isUser: boolean
  photo: string | null
}

export function Chat({ isOpen, setIsOpen }: ChatProps) {
  // provisório
  const [isUserMessage, setIsUserMessage] = useState<boolean>(false)

  const messages: Message[] = [
    { id: 1, text: "Olá! Seja bem-vindo ao suporte 😊", isUser: false, photo: null },
    { id: 2, text: "Oi! Eu queria saber o horário de funcionamento.", isUser: true, photo: null  },
    { id: 3, text: "Claro! Estamos abertos das 10h às 22h todos os dias.", isUser: false, photo: null  },
    { id: 4, text: "Perfeito, obrigado!", isUser: true, photo: null  },
  ]

  return (
      <div className="chat-container">
          <header>
              <button> <IoIosPeople size={30} /> </button>
              <button onClick={() => setIsOpen(false)}> <HiMiniMinus size={30} /> </button>
          </header>

          <section className="message-area">
            {messages.map((message) => (
                <article className="message">
                    <div className={`avatar-container ${message.isUser ? "my" : ""}`}>
                      {!message.isUser && (<Avatar photo={message.photo}/>)}
                        <div className="message-content">
                          <span className="sender-name font-semibold">Giordano Lanna</span>
                          <span className="timestamp">11:50</span>
                          <p className="message-text">{message.text}</p>
                        </div>
                      {message.isUser && (<Avatar photo={message.photo}/>)}
                    </div>
                </article>
            ))}
          </section>

          <div className="input-chat">
              <input type="text" name="" id="" className="text-input"/>
              <button className="send-button"></button>
          </div>
      </div>
  )
}
import { Chat } from "../../organismos/chat/chat.tsx"
import { UserStateContext } from "../../../context/user-login-context.tsx"
import { BsChatRightTextFill } from "react-icons/bs";
import { useState, useContext } from "react"
import "./chat-icon.scss"
import "../button.scss"

export function ChatIcon() {
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false)
  const { login, client } = useContext(UserStateContext)
  const [newMessages, setNewMessages] = useState<number>(1)

  if (login && !client) {
    return (
      <>
        <button className={`chat-icon ${isOpenChat ? "minimize-icon" : "maximize-icon"}`} onClick={() => setIsOpenChat(prev => !prev)}>
          <BsChatRightTextFill size={25}/>

          {newMessages > 0 && (
            <span className="notification-badge">
              {newMessages}
            </span>
          )}
        </button>
        <div className={`chat ${isOpenChat ? 'open' : 'closed'}`}>
          <Chat isOpen={isOpenChat} setIsOpen={setIsOpenChat}/>
        </div>
      </>
    )
  }
}
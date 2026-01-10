import { FaCircleUser } from "react-icons/fa6"

interface Avatar {
  photo?: string | null
}

export function Avatar({photo}: Avatar) {
  return(
    <figure>
      {photo ? (
        <img src={photo} alt="imagem de perfil do usuário"/>) :
        <FaCircleUser size={30}/>
      }
    </figure>
  )
}
import {TfiWrite, FaTrashArrowUp, IoMdAddCircleOutline, FaArrowRightLong} from "../../icons"

interface MenuFooterProps {
  newDish: {
    id: number
    name: string
    description: string
    meal_type: string} | null
  setNewDish(dish: MenuFooterProps["newDish"] | null): void
  deleted: boolean
  setDeleted(deleted: boolean): void
}

export function MenuFooter({newDish, setNewDish, deleted, setDeleted}: MenuFooterProps) {
  return (
    <footer className="menu-footer">
      <TfiWrite cursor={"pointer"} />
      <button
        aria-label="Adicionar prato"
        onClick={() =>
          newDish
            ? setNewDish(null)
            : setNewDish({ id: 0, name: "", description: "", meal_type: "cafe_manha" })
        }
      >
        <IoMdAddCircleOutline
          cursor={"pointer"}
          size={25}
          onClick={() =>  newDish ? setNewDish(null)  : setNewDish({ id: 0, name: "", description: "", meal_type: "cafe_manha" })}/>
      </button>
      <FaTrashArrowUp cursor={"pointer"} onClick={() => setDeleted(!deleted)} />
    </footer>
  )
}
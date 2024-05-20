import { AiOutlineUser } from "react-icons/ai"
import { Button } from "../Button/Button"

export const Header = () => {
  return (
    <header className="flex justify-end">
      <nav>
        <ul className="flex items-baseline gap-4">
          <li>
            <AiOutlineUser />
          </li>
          <li>
            <Button>Log out</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

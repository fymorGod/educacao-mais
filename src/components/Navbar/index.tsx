import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export function Navbar() {
  const { logout } = useContext(AuthContext);
  const handleSubmit = () => {
    logout();
  };
  return (
    <div className="w-full h-16 bg-dark-purple relative">
      <div className="absolute right-5 pt-5 text-white">
        <ul className="flex">
          <li className="pr-2">
            <IoMdPerson />
          </li>
          <li className="pr-2">
            <MdOutlineNotifications />
          </li>
          <li className="pr-2">
            <IoMdExit
              onClick={() => handleSubmit()}
              className="cursor-pointer"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

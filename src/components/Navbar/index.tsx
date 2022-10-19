import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import logo from "../../assets/logo.png";
export function Navbar() {
  const { logout } = useContext(AuthContext);
  const handleSubmit = () => {
    logout();
  };
  return (
    <div className="w-full h-16 bg-dark-purple relative">
          <div className="p-4">
            <a href="/home">
              <img
                src={logo}
                alt="logo maisEducaÃ§ÃĢo"
                className={`cursor-pointer duration-500 w-40`}
              />
            </a>
          </div>
          <div className="absolute top-5 right-5 text-white ">
            <ul className="flex">
              <li className="pr-2">
                <IoMdPerson />
              </li>
              <li className="pr-2">
                <MdOutlineNotifications />
              </li>
              <li className="pr-2">
                <IoMdExit />
              </li>
            </ul>
          </div>
        </div>
  );
}

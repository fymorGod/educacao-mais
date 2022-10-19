import { Sidebar } from "../../components/Sidebar";
import banner from "../../assets/banner.png";
import { PerfilData } from "../../components/DadosPerfil";
import { Navbar } from "../../components/Navbar";

export function Home() {
  return (
    <div className="flex w-full h-screen font-sans bg-dark-theme">
      <Sidebar />
      <main className=" text-2xl font-semibold flex-1 bg-dark-theme">
        <div className="flex flex-col">
          <Navbar />
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="pt-5">
                <div className="px-5">
                  <img src={banner} alt="" />
                </div>
              </div>

              <PerfilData />
            </div>
            <div className="flex bg-125">
              {/* aqui vai o calendario */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


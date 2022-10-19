import { useState, useEffect, useContext } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { app } from "../../api/app";
import { TabsDisciplinas } from "../../components/TabsDisciplinas";

type Disciplina = {
  id: string;
  name: string;
};
 
export function OverviewDisciplinas() {
  const { idSerie, idDisciplina } = useParams();
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [disc, setDisc] = useState<Disciplina>();
  const [nameHook, setNameHook] = useState("Aulas");
  const [conteudoArray, setConteudoArray] = useState([]);

    //   pegar o nome da disciplina
  useEffect(() => {
   if(idDisciplina){
    try {
      const getData = async () => {
        const response = await app.get(`/disciplinas/${idDisciplina}`);
          setDisc(response.data.disciplina.name)
      };
      getData();
    } catch (error) {
      console.log("Error: ", error)
    }
   }
  }, [idDisciplina]);

  useEffect(() => {
    try {
    if ( user.user ) { 
      async function getConteudos() {
        const response = await app.get(
          `/escolas/users/professores/${user.user}/conteudos`
        );
        setConteudoArray(response.data["conteudos"]);
      } 
      getConteudos();
    }
  } catch (error) {
    console.log("Error: ", error)
  }
  }, [user.user]);

  function EditarConteudo() {
    navigate(`/editar-disciplinas-${nameHook}/${idDisciplina}`);
  }

  function CriarConteudo() {
    navigate(`/criar-disciplinas-${nameHook}/${idDisciplina}`);
  }

  function HandleVerificar(nameHook: string) {
    if (nameHook == "Aulas") {
      if (!conteudoArray) {
        return (
          <p className="text-[#fff] text-center font-rubik text-[14px] font-medium">
            Nenhuma aula cadastrada
          </p>
        );
      } else {
        return conteudoArray?.map((conteudo) => {
          return (
            <button
              key={conteudo.id}
              className=" mt-2 bg-[#4263EB] rounded-lg px-4"
              onClick={EditarConteudo}
            >
              <div
                key={conteudo.id}
                className="w-[250px] h-[120px] flex justify-center items-center"
              >
                <p className="text-white">{conteudo?.name}</p>
              </div>
            </button>
          );
        });
      }
     
    } else if (nameHook == "Atividades") {
      return (
        <p className="text-[#333] text-center font-rubik text-[14px] font-semibold">
          Nenhuma atividade cadastrada
        </p>
      );
    } else {
      return (
        <p className="text-[#333] text-[14px] text-center font-rubik font-semibold">
          Nenhum material cadastrado
        </p>
      );
    }
  }

  return (
    <div className="flex w-full min-screen font-sans bg-dark-theme">
      <Sidebar />
      <main className="text-2xl font-semibold flex-1 bg-dark-theme ">
        <Navbar />
        <div className="flex pt-6 flex-row justify-between">
          <div className="w-full">
            <div className="w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12">
              <div className="flex flex-row relative">
                <TabsDisciplinas setNameHook={setNameHook} nameDisciplina={disc} />
                <button
                  className="absolute right-10 top-5 bg-[#4263EB] rounded-lg px-4"
                  onClick={() => EditarConteudo()}
                >
                  <p className="text-[16px] text-[#ffffff] font-semibold">
                    Editar Conteudo
                  </p>
                </button>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center py-8 border-dashed border-b-2 border-[#4263EB] text-[16px]">
                  <div className="w-[500px] flex flex-col justify-center items-center">
                    {HandleVerificar(nameHook)}
                  </div>
                </div>
                  <div className="w-[250px] mt-10">
                    <button className="w-full h-[45px] rounded-md text-sm text-white bg-[#4263EB]" onClick={() => CriarConteudo()}>Criar um novo conteúdo</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

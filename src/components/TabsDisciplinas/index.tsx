import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../api/app";

type TabsProps = {
    nameHook?: string;
    setNameHook: (value: string) => void;
    nameDisciplina: string;
}
type Disciplinas = {
    id: string;
    name: string;
}
export function TabsDisciplinas({setNameHook, nameDisciplina}: TabsProps) {
  const { idDisciplina } = useParams();
  const [disc, setDisc] = useState<Disciplinas>();
  const [clicked, setClicked] = useState(0);

  const handleClicked = (id: number, name: string) => {
    setClicked(id);
    setNameHook(name);
    // navigate(`/editar-disciplinas-${nameHook}/${rotaId}`);
  };

  const tabs = [
    { id: 1, label: "Aulas" },
    { id: 2, label: "Atividades" },
    { id: 3, label: "Materiais" },
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${idDisciplina}`);
      setDisc(response.data.disciplina);
    };
    getData();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#3B5BDB] to-[#BAC8FD] rounded-t-lg">
      <div className="flex flex-row py-5 px-5 justify-between relative">
        <p className="text-[#FFFFFF] text-[20px] font-rubik">{disc ? disc?.name : nameDisciplina}</p>
        <div className="flex flex-row absolute bottom-0 left-36 font-roboto text-[14px] ">
          {tabs.map((item, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => handleClicked(index, item.label)}
                  className={`rounded-t-lg px-8 hover:bg-[#FFFFFF] ${[
                    index === clicked ? "bg-[#FFFFFF]" : "bg-[#BAC8FD] ",
                  ]}`}
                >
                  <p className="text-[#4263EB]">{item.label}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

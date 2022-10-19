import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../api/app";

type TabsProps = {
    nameDisciplina: string;
    idRefs:string;
    label: string;
}
type Disciplinas = {
    id: string;
    name: string;
}

export function SuperTabs({ nameDisciplina, idRefs, label}: TabsProps) {
  const [disc, setDisc] = useState<Disciplinas>();
  const [clicked, setClicked] = useState(label);
  const navigate = useNavigate();

  const handleClicked = (id: string, label: string) => {
    setClicked(id);
    navigate(`/criar-disciplinas-${label}/${idRefs}`);
  };
  const tabs = [
    { id: 1, label: "Aulas" },
    { id: 2, label: "Atividades" },
    { id: 3, label: "Materiais" },
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${idRefs}`);
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
                  onClick={() => handleClicked(index.toString(), item.label)}
                  className={`rounded-t-lg px-8 hover:bg-[#FFFFFF] ${[
                    index == parseInt(clicked) ? "bg-[#FFFFFF]" : "bg-[#BAC8FD] ",
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

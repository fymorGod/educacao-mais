import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../../assets/logo.png";
import { app } from "../../api/app";
import { useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import EyesCloked from "../../assets/hidden.png";
import EyesOpen from "../../assets/view.png";
import { ItemNewEdit } from "../../components/ItemDrop";
import { SuperTabs } from "../../components/SuperTabs";
import { Navbar } from "../../components/Navbar";
import { RenderConteudos } from "../../components/RenderConteudos";

type Disciplina = {
  id: string;
  name: string;
};

export function CriarAtividades() {
  const [arrayIds, setArrayIds] = useState<string[]>([])
  const { id } = useParams();
  const [aula, setAula] = useState([]);
  const [ready, setReady] = useState(true);
  const [text, setText] = useState("");
  const [ clicked, setClicked ] = useState(true)
  const [ clicked2, setClicked2 ] = useState(true)
  const [nameHook, setNameHook] = useState("Atividades");
  const [disc, setDisc] = useState<Disciplina>();
  const [label, setLabel] = useState(1)

  const addIdArray = (index:any) => {
    setArrayIds([
      ...arrayIds, index
    ]);
    console.log(arrayIds)
  }

  const removeIdArray = (idArr:any) => {
    setArrayIds(arrayIds.filter(index => index !== idArr))
    console.log(arrayIds)
  }


  useEffect(() => {
    if(id){
      try {
        const getData = async () => {
          const response = await app.get(`/disciplinas/${id}`);
          setDisc(response.data.disciplina.name)
          console.log(response.data.disciplina.name)
       };
       getData();
     } catch (error) {
       console.log("Error: ", error)
     }
    }
   }, [id]);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        `/atividadesByDisciplina/${id}`
      );
      setAula(response.data["atividades"]);
      console.log(response.data);
    };
    getData();
  }, []);

  function switchEyes() {
    setClicked(!clicked)
  }
  function switchEyesGlobal(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setClicked2(!clicked2)
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      setReady(true);
    }
  }, []);

  async function AddAula() {
    try {
      await app.post("/conteudos", {
        name: text,
        id_disciplina: "0edbbd06-e902-4714-a18e-ddd4dc82ddeb",
        created_by: "a8b56ba5-8dbb-4d51-ba74-e0c4f717081f",
        array_aulas: lista,
        array_atividades: [],
        id_bimestre: idBimestre        
      });
      document.location.reload()
      alert("Conteudo cadastrado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  }
  const lista = [];
  
  function handleInput(id: number) {
    lista.push(id);
  }

  function handleInput2(id: number) {
    lista.pop(id);
  }

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = aula;
    var dragItem =
    newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
      );
      newBoardData[parseInt(re.destination.droppableId)].items.splice(
        re.destination.index,
        0,
        dragItem
        );
        
        if (re.source.droppableId == 0 && re.destination.droppableId == 1) {    
          //changeIdList(dragItem.id)
          addIdArray(dragItem.id);
        } else if (re.source.droppableId == 1 && re.destination.droppableId == 0) {
          //handleInput2(dragItem.id);
          removeIdArray(dragItem.id)
        } return null

  };

  return (
    <div className="flex w-full h-full font-sans bg-dark-theme ">
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6 ">
       <Navbar />
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row">
            {ready && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-row">
                  {aula.map((board, bIndex) => {
                    return (
                      <div key={board.name}>
                        <Droppable droppableId={bIndex.toString()}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={`
                          ${
                            board.name == "atividades"
                              ? "bg-dark-purple p-3 w-[300px] h-full select-none"
                              : "0"
                          }
                          ${
                            board.name == "atividades_conteudo"
                              ? `h-[800px] mt-6 w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12 scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#EDF2FF]-300 overflow-y-scroll`
                              : "0"
                          }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="text-[22px] text-[#FFFFFF] font-roboto mt-4 mb-4 ">
                                  <p>
                                    {board.name == "atividades" ? `V??deo Aulas` : ""}
                                  </p>
                                  {
                                    board.name == "atividades" && <button className="w-[250px] text-[16px] font-poppins font-semibold h-[40px] rounded-md mt-2 bg-white text-zinc-800">Criar Atividade</button> 
                                  }
                                </div>
                                {board.name === "atividades_conteudo" ? (
                                  <div className="w-full relative">
                                    <div>
                                     <SuperTabs label={`${label}`} nameDisciplina={`${disc}`} idRefs={id} />
                                      <div className="w-[180px] flex justify-between items-center flex-row absolute top-5 right-5">
                                        <button className="py-[2px] px-[15px] text-[14px] bg-[#FFFFFF] rounded-md">
                                          Cancelar
                                        </button>
                                        <button
                                          className="text-white text-[14px] py-[2px] px-[15px] bg-[#3B5BDB] rounded-md"
                                          type="submit"
                                          onClick={() => AddAula()}
                                        >
                                          Salvar
                                        </button>
                                      </div>
                                    </div>
                                    <div className="flex flex-col p-8 w-full ">
                                      <div className="flex flex-row justify-between">
                                        <input placeholder="T??tulo do conte??do"
                                          className="bg-[#EDF2FF] rounded-lg border-none text-[16px] text-[#131313] font-roboto mb-4 p-1 pl-4 w-1/3 outline-none placeholder:text-[14px] font-light"
                                          type="texte"
                                          onChange={(e) =>
                                            setText(e.target.value)
                                          }
                                        />
                                        {
                                          clicked2 ?
                                        <button className="w-[25px] h-[25px]" onClick={switchEyesGlobal}>
                                          <img className="w-[25px] h-[25px]" src={EyesOpen} alt="" />
                                        </button>
                                        : <button onClick={switchEyesGlobal} className="w-[25px] h-[25px]">
                                            <img className="w-[25px] h-[25px]" src={EyesCloked} alt="" />
                                          </button>
                                        }
                                      </div>
                                      {board.items.length == 0 && (
                                        <div className="bg-[#EDF2FF] h-[150px] rounded-lg mb-4 p-1 pl-4 flex items-center justify-center">
                                          <p className="text-center text-[#707070] text-[18px] font-roboto">
                                            Nenhuma aula cadastrada
                                          </p>
                                        </div>
                                      )}

                                      {board.name == "atividades_conteudo"
                                        ? board.items.length > 0 &&
                                          board.items.map((item, iIndex) => {
                                            return (
                                              <div className="bg-[#EDF2FF] rounded-lg p-4">
                                                <div className="flex flex-row items-center">
                                                  <div className="w-1/3 flex items-center">
                                                    <MenuIcon className="text-[#4263EB] active:text-[#263B4A] opacity-1 mb-8 mr-1" />
                                                    <ItemNewEdit
                                                      key={item.id}
                                                      data={item}
                                                      index={iIndex}
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="text-[#343434] text-[16px] font-semibold">
                                                      {item.title}
                                                    </p>                                                    
                                                  </div>
                                                  <div>
                                                    {clicked ? <button className="w-[25px] h-[25px] ml-4" onClick={()=> switchEyes()}><img src={EyesOpen} alt="" className="w-[25px] h-[25px]" /></button> 
                                                    : <button className="w-[25px] h-[25px] ml-4" onClick={()=>switchEyes()}><img className="w-[25px] h-[25px]" src={EyesCloked} alt="" /></button>}
                                                    
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })
                                        : ""}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>

                              {board.name == "atividades"
                                ? board.items.length > 0 &&
                                  board.items.map((item, iIndex) => {
                                    return (
                                      <div className="flex flex-row items-center">
                                        <MenuIcon className="text-[#FFFFFF] active:text-[#263B4A] opacity-1 mb-8 mr-1" />
                                        <ItemNewEdit
                                          key={item.id}
                                          data={item}
                                          index={iIndex}
                                        />
                                      </div>
                                    );
                                  })
                                : ""}

                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}
                </div>
              </DragDropContext>
            )}
          </div>
          {/* Aqui vai a lateral onde tem as aulas criadas pelo professor */}
          <RenderConteudos />
        </div>
      </main>
    </div>
  );
}

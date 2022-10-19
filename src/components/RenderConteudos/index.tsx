import { useEffect, useState } from "react";
import { app } from "../../api/app";

export function RenderConteudos() {
  const [conteudoArray, setConteudoArray] = useState([]);

  useEffect(() => {
    async function getConteudos() {
      const response = await app.get(
        "/escolas/users/professores/a8b56ba5-8dbb-4d51-ba74-e0c4f717081f/conteudos"
      );
      setConteudoArray(response.data["conteudos"]);
      //   console.log(response.data);
    }

    getConteudos();
  }, []);

  return (
    <div className="w-80">
      <div className="h-screen flex flex-col pt-6 bg-dark-purple shadow-md shaow-[#333] ">
        <div className="flex justify-between items-center flex-col">
          <h2 className="text-gray-500 text-[20px]"> </h2>
          <div className="w-full p-4 ">
            <p className="text-[22px] text-white font-roboto">Conteúdos</p>
            {conteudoArray.map((item) => (
              <div
                className="h-50 bg-white px-4 mt-4 mx-1 rounded-lg p-1 hover:bg-[#EDF2FF]"
                key={item.id}
              >
                <p className="text-[18px] text-dark-purple font-roboto cursor-pointer">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

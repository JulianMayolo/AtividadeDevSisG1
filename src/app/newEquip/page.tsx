"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import axios from "axios";
import api from "../../services/api";

//Interface do conjunto de dados a serem cadastrados
interface IFormDataEquip {
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: Date;
    status: boolean;
}

export default function NewEquip() {
    const router = useRouter();
    const [formDataEquip, setFormDataEquip] = useState<IFormDataEquip>({
        tipo: "",
        marca: "",
        modelo: "",
        numero_serie: "",
        status: true,
        data_aquisicao: new Date(),
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target.type);

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormDataEquip((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
            }));
        } else {
            setFormDataEquip((prevFormData) => ({
                ...prevFormData, //mantém todos os outros dados intactos
                [name]: value, //altera o dado que está sendo modificado
                // por exemplo, ficaria assim: [name]: value --> cpf: 12
            }));
        }
    };

    const formatBirthDate = (dateString: string): string => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const makePostRequest = async () => {
        try {
            const formattedDataAquisicao = formatBirthDate(formDataEquip.data_aquisicao.toString());

            console.log(formDataEquip, formattedDataAquisicao);

            const response = await api.post("/equipamentos", {
                ...formDataEquip,
                data_aquisicao: formattedDataAquisicao,
            });

            console.log("Dados enviados com sucesso!");
            console.log("Resposta:", response.data);
            router.push("/");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center my-8">
            <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-green-700 rounded-md border-white border-2 border-spacing-2">
                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Tipo</label>
                    <input
                        type="text"
                        name="tipo"
                        value={formDataEquip.tipo}
                        onChange={handleChange}
                        placeholder="Tipo"
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Marca</label>
                    <input
                        type="text"
                        name="marca"
                        value={formDataEquip.marca}
                        onChange={handleChange}
                        placeholder="Marca"
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Modelo</label>
                    <input
                        type="text"
                        name="modelo"
                        value={formDataEquip.modelo}
                        onChange={handleChange}
                        placeholder="Modelo"
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Data de aquisicao</label>
                    <input
                        type="date"
                        name="data_aquisicao"
                        value={formDataEquip.data_aquisicao.toString()}
                        onChange={handleChange}
                        placeholder="Data de aquisição"
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Número série</label>
                    <input
                        type="text"
                        name="numero_serie"
                        value={formDataEquip.numero_serie}
                        onChange={handleChange}
                        placeholder="Número série"
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Disponível</label>
                    <input
                        type="checkbox"
                        name="Disponivel?"
                        checked={formDataEquip.status}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
                    <button
                        type="button"
                        onClick={makePostRequest}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cadastrar equipamento
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

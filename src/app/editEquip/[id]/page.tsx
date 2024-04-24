"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

interface IPostParams extends Params {
    id: number;
}

interface IEquip {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: Date;
    status: boolean;
}

export default function EditEquip() {
    const router = useRouter();
    const params: IPostParams = useParams();
    const { id } = params;
    const [equip, setEquip] = useState<IEquip>({
        id: 0,
        tipo: "",
        marca: "",
        modelo: "",
        numero_serie: "",
        data_aquisicao: new Date(),
        status: true,
    });

    useEffect(() => {
        const fetchEquip = async () => {
            try {
                console.log(id);
                const response = await api.get(`/equipamentos/${id}`);
                const equipData: IEquip = response.data;

                const formattedEquipDate = new Date(equipData.data_aquisicao)

                setEquip({ ...equipData, data_aquisicao: formattedEquipDate });
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };

        if (id) {
            fetchEquip();
        }
    }, [id]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setEquip((prevEquip) => ({
                ...prevEquip,
                [name]: checked,
            }));
        } else {
            setEquip((prevEquip) => ({
                ...prevEquip,
                [name]: value,
            }));
        }
    };

    const formatEquipDate = (dateString: string): string => {
        const [year, month, day] = dateString.split("-");
        return `${day} -${month} -${year}`;
    };

    const handleUpdateEquip = async () => {
        try {
            const formattedEquipDate = formatEquipDate(equip.data_aquisicao.toString());

            const response = await api.put(`/equipamentos/${id}`, {
                ...equip,
                birth_date: formattedEquipDate,
            });

            console.log("Dados atualizados com sucesso!");
            console.log("Resposta:", response.data);
            router.push("/");
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center my-8">
            <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Tipo</label>
                    <input
                        type="text"
                        name="tipo"
                        value={equip.tipo}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Marca</label>
                    <input
                        type="text"
                        name="marca"
                        value={equip.marca}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Modelo</label>
                    <input
                        type="text"
                        name="modelo"
                        value={equip.modelo}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Numero de série</label>
                    <input
                        type="text"
                        name="numero_serie"
                        value={equip.numero_serie}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Data de Aquisição</label>
                    <input
                        type="date"
                        name="data_aquisicao"
                        value={equip.data_aquisicao.toString()}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Disponivel?</label>
                    <input
                        type="checkbox"
                        name="sisponivel"
                        checked={equip.status}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
                    <button
                        type="button"
                        onClick={handleUpdateEquip}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Atualizar equipamento
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
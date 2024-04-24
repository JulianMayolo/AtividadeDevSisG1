"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";

// Definição da interface IUserParams para tipagem dos parâmetros da rota
interface IEquipParams extends Params {
    id: string;
}

// Definição da interface IUser para tipagem dos dados do usuário
interface IEquip {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: Date;
    status: boolean;
}

export default function EquipDetails() {
    const router = useRouter();
    // Captura dos parâmetros da rota
    const params: IEquipParams = useParams();
    const { id } = params;
    // Estado para armazenar os dados do usuário
    const [equip, setEquip] = useState<IEquip | null>(null);

    // Efeito para buscar os dados do usuário ao carregar o componente
    useEffect(() => {
        const fetchEquip = async () => {
            try {
                console.log("IDDDDDDD", id)
                // Requisição para obter os dados do usuário com o ID fornecido
                const response = await api.get(`/equipamentos/${id}`);
                setEquip(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };

        // Verifica se o ID está definido e chama a função fetchUser
        if (id) {
            fetchEquip();
        }
    }, [id]);

    // Função para voltar para a página anterior
    const handleGoBack = () => {
        router.back();
    };

    // Renderização condicional dos detalhes do usuário ou mensagem de carregamento
    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Detalhes do Equipamento
            </h1>
            {equip ? (
                // Renderização dos detalhes do usuário se os dados estiverem disponíveis
                <div className="bg-green-600 rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
                    <h2 className="font-bold text-xl text-black text-center uppercase mb-2">
                        ID do equipamento: {equip.id}
                    </h2>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Tipo:</strong> {equip.tipo}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Modelo:</strong> {equip.modelo}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Marca:</strong> {equip.marca}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Numero de série:</strong> {equip.numero_serie}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Status:</strong> {equip.status ? "DISPONIVEL" : "EM USO"}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Data aquisição:</strong> {equip.data_aquisicao.toString()}
                    </p>
                </div>
            ) : (
                // Mensagem de carregamento enquanto os dados do usuário estão sendo buscados
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        Carregando...
                    </p>
                </div>
            )}
            {/* Botão para voltar para a página anterior */}
            <div className="flex justify-center">
                <button
                    onClick={handleGoBack}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}

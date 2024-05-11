"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";

// Definição da interface IUser para tipagem dos dados do usuário
interface IEquip {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  data_aquisicao: Date;
  status: number;
}

// Função assíncrona para buscar os usuários da API
async function fetchEquip(): Promise<any> { // Tratar o retorno, não retornar ANY
  const result = await api.get("/equipamentos");
  return result.data;
}

export default function Home() {
  // Estados para armazenar os usuários, o estado de carregamento e os usuários filtrados
  const [loading, setLoading] = useState<boolean>(true);
  /*
    Validar a lógica de utilizar esses dois states para a armazenamento geral e filtrado,
    cada vez que é atualizado o valor dos dois - um depois do outro -, o componente
    é recarregado 2 vezes (não tem problema recarregar 2 vezes, mas uma é melhor que 2)
  */
  const [equip, setEquip] = useState<IEquip[]>([]);
  const [filteredEquip, setFilteredEquip] = useState<IEquip[]>([]);
  // Estado para armazenar o termo de busca do filtro por nome
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Efeito para carregar os usuários quando o componente é montado
  useEffect(() => {
    const getEquip = async () => {
      const equipData = await fetchEquip();
      // Atualiza os estados de usuários e usuários filtrados
      setEquip(equipData);
      setFilteredEquip(equipData);
      setLoading(false);
    };
    getEquip();
  }, []);

  // Função para lidar com a exclusão de um usuário
  const handleDeleteEquip = async (equipId: number) => {
    try {
      await api.delete(`/equipamentos/${equipId}`);
      // Atualiza a lista de usuários após a exclusão
      setEquip(equip.filter((equip) => equip.id !== equipId));
      setFilteredEquip(filteredEquip.filter((equip) => equip.id !== equipId));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Função para filtrar 
  const handleSearch = () => {
    const filtered = equip.filter((equip) =>
      equip.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquip(filtered);
  };

  // Renderização condicional enquanto os usuários estão sendo carregados
  if (loading) {
    return (
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
      </main>
    );
  }

  // Renderização da página de usuários
  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Equipamento</h1>
      {/* Formulário de filtro por nome */}
      <div className="flex mb-8 mt-8 justify-end items-center">
        <input
          type="text"
          placeholder="Filtrar por tipo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>
      {/* Lista de usuários renderizada */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Verificação se existem usuários a serem exibidos */}
        {filteredEquip.length > 0 ? (
          // Mapeamento e renderização dos usuários filtrados
          filteredEquip.map((equip: IEquip) => {
            return (
              <div
                key={equip.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
              >
                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Tipo equipamento */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {equip.tipo}
                  </h2>
                </div>

                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Marca equipamento */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {equip.marca}
                  </h2>
                </div>


                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Modelo equipamento */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {equip.modelo}
                  </h2>
                </div>


                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Número serie equipamento */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {equip.numero_serie}
                  </h2>
                </div>


                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* ID equipamento */}
                  <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ID: {equip.id}
                  </span>
                  <span className="inline-block w-[50%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {equip.marca ? "DISPONIVEL" : "EM USO"}
                  </span>
                </div>
                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Botões de ação para exclusão, edição e detalhes */}
                  <button
                    onClick={() => handleDeleteEquip(equip.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Excluir
                  </button>
                  <Link href={`/editEquip/${equip.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                      Editar
                    </button>
                  </Link>
                  <Link href={`/detailEquip/${equip.id}`}>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                      Detalhes
                    </button>
                  </Link>
                </div>
              </div>

            );
          })
        ) : (
          // Mensagem de nenhum equipamento encontrado
          <h1>Nenhum usuário encontrado!</h1>
        )}
      </section>
    </main>
  );
}

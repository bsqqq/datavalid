export type PfBasicaFacialResponse = {
    cpf_disponivel: true,
    nome: false,
    nome_similaridade: number,
    data_nascimento: false,
    situacao_cpf: true,
    sexo: false,
    nacionalidade: true,
    cnh_disponivel: true,
    cnh: {
      nome: false,
      nome_similaridade: number,
      numero_registro: false,
      categoria: false,
      codigo_situacao: true,
      registro_nacional_estrangeiro: false,
      data_ultima_emissao: false,
      data_primeira_habilitacao: false,
      data_validade: false,
      possui_impedimento: false,
      observacoes: false,
      observacoes_similaridade: 0
    },
    filiacao: {
      nome_mae: false,
      nome_mae_similaridade: number,
      nome_pai: false,
      nome_pai_similaridade: number
    },
    documento: {
      tipo: true,
      numero: false,
      numero_similaridade: number,
      orgao_expedidor: true,
      uf_expedidor: false
    },
    endereco: {
      logradouro: false,
      logradouro_similaridade: number,
      complemento: false,
      complemento_similaridade: number,
      numero: false,
      numero_similaridade: number,
      bairro: false,
      bairro_similaridade: number,
      cep: false,
      municipio: false,
      municipio_similaridade: number,
      uf: false
    },
    biometria_face?: {
      disponivel: true,
      probabilidade: string,
      similaridade: number
    }
}
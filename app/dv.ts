import axios from 'axios'

export default axios.create({
    baseURL: "https://gateway.apiserpro.serpro.gov.br/datavalid-demonstracao/v3",
    headers: {
        Authorization: "Bearer 06aef429-a981-3ec5-a1f8-71d38d86481e"
    },
})
import { AxiosError, AxiosResponse } from 'axios'
import dv from '../dv'
import { PfBasicaFacialResponse } from '../types/index'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import pool from '../database'

export function status(_: Request, res: Response) {
    res.send("<h1>Olá mundo! Server nodejs com typescript!!</h1>")
}

export async function dvStatus(_: Request, res: Response) {
    try {
        const resposta = await dv.get("/status")
        res.send(`<h1>status: ${resposta.status}</h1>`)

    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

export async function dvPfBasica(req: Request, res: Response) {
    try {
        const { key, answer } = req.body
        const resposta: AxiosResponse<PfBasicaFacialResponse> = await dv.post("/validate/pf-basica", { key, answer })
        res.send(resposta.data.cpf_disponivel ? { msg: "Usuário existe na base", dados: resposta.data } : { msg: "Usuário NÃO existe na base" })
    } catch (error) {
        error instanceof AxiosError
            ? res.status(400).send(error.response?.data)
            : (function () { res.status(400).send(error); console.log(error) })()

        // const knownError = error as AxiosError
        // res.status(Number(knownError.response?.status)).send(knownError.response?.data)
    }
}

export async function dvPfFacial(req: Request, res: Response) {
    try {
        const { username, password, email, key, answer } = req.body
        const { nome } = answer
        const resposta: AxiosResponse<PfBasicaFacialResponse> = await dv.post("/validate/pf-facial", { key, answer })
        const duplicate = await pool.query("select exists(select 1 from public.users where username = $1)", [username])

        if (Object.values([nome, username, password, email]).some(val => !val)) {
            return res.status(422).send({ msg: `algum valor está em branco!` })
        } else if (duplicate.rows[0].exists) {
            return res.status(409).send({ msg: `usuário ${username} já existe! tente outro nome de usuário.` })
        }

        const hashedPassw = bcrypt.hashSync(password, 10)
        const creationTime = new Date().toISOString()
        if (Number(resposta.data.biometria_face?.similaridade) >= 0.85 && resposta.data.nome_similaridade == 1) {
            await pool.query(
                "INSERT INTO public.users(name, email, username,\
                               password, create_time) \
                              VALUES ($1, $2, $3, \
                              $4, $5::timestamp with time zone);",
                [nome, email, username, hashedPassw, creationTime]
            );
            res.send({ msg: "registrado com sucesso!" })
        } else
            res.send({ msg: "similaridade da face ou do nome baixa demais para cadastro..." })


    } catch (error) {
        error instanceof AxiosError
            ? res.status(400).send(error.response?.data)
            : (function () { res.status(400).send(error); console.log(error) })()

        // res.send(error as AxiosError)

        // const knownError = error as AxiosError
        // res.status(Number(knownError.response?.status)).send(knownError.response?.data)
    }
}

export async function comparePW(req: Request, res: Response) {
    try {
        const { password, username } = req.body
        const query = await pool.query("select password from public.users where username = $1;", [username])
        bcrypt.compareSync(password, query.rows[0].password) ? res.send({ msg: "as senhas coincidem" }) : res.send({ msg: "as senhas NÃO coincidem" })
    } catch (error) {
        res.send(error)
    }

}
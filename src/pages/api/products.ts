import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../database.json"


export default function handler(req:NextApiRequest, res:NextApiResponse) {

    res.status(200).json(products) //no json vai ter a database. Vai devolver uma resposta com todos os produtos contidos na database

}
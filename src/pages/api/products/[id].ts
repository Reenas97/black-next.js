//rota para um produto especifico

import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../../database.json"

export default function handler(req: NextApiRequest, res:NextApiResponse){
                //no objeto query pode-se extrair qualquer parametro estabelecido na rota
    const { id } = req.query //obtem o id da url 
    
    const product = products.find(prod => prod.id === Number(id))//verifica se esse produto esta no array
    
    res.status(200).json(product) //devolve o produto
}
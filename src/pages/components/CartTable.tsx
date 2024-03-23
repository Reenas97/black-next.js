// src/components/CartTable.tsx

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../../hooks/useCart";
import { ProductType } from "../../services/products";

type CartEntry = {
  product: ProductType
  quantity: number
}

const CartTableRow = (props: {
  entry: CartEntry
}) => {
  const { addProduct, removeProduct } = useCart()

  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col xs={4} md={2} lg={1}>
            <Image
              src={props.entry.product.imageUrl}
              alt={props.entry.product.name}
              height={500}
              width={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </Col>
          <Col xs={8} md={10} lg={11}>
            {props.entry.product.name}
          </Col>
        </Row>
      </td>
      <td>R$ {props.entry.product.price}</td>
      <td>{props.entry.quantity}</td>
      <td>R$ {(props.entry.product.price * props.entry.quantity)}</td>
      <td>
        <Button
          color="primary"
          size="sm"
          onClick={() => addProduct(props.entry.product)}
        >
          +
        </Button>
        {' '}
        <Button
          color="danger"
          size="sm"
          onClick={() => removeProduct(props.entry.product.id)}
        >
          –
        </Button>
      </td>
    </tr>
  )
}

export default function CartTable() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([])
  const { cart } = useCart()

  useEffect(() => { //converter o array de varios produtos para o formato que esta no cart entry. Pegar todos os produtos iguais, juntar em um item só e ter a quantidade
                        //com o reduce tranforma o array
    const entriesList = cart.reduce((list, product) => {
                        //para cada um dos indices que encontrar onde o produto tiver o id correspondente, retorna a lista.
      const entryIndex = list.findIndex(entry => entry.product.id === product.id)

      if (entryIndex === -1) { //caso o item ainda não esteja no carrinho, cria um novo item com a quantidade um
        return [
          ...list,
          {
            product,
            quantity: 1
          }
        ]
      }

      list[entryIndex].quantity++ //caso o indice seja encontrado, pega a posição onde ele esta e incrementa a quantidade
      return list

    }, [] as CartEntry[])

    entriesList.sort((a, b) => a.product.id - b.product.id) //deixa ordenado de acordo com o id
    setCartEntries(entriesList) //atualiza o state

  }, [cart]) // a cada mudança no carrinho, isso precisa refletir no carrinho

  return (
    <Table responsive className="align-middle" style={{ minWidth: '32rem' }}>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Qtd.</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
		{cartEntries.map(entry => <CartTableRow key={entry.product.id} entry={entry} />)}
      </tbody>
    </Table>
  )
}
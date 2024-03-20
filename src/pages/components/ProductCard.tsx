import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { Button, Card, CardBody, CardSubtitle } from "reactstrap"

import SuccessToast from "./SuccessToast"
import { ProductType } from "@/services/products"

type ProductCardProps = {
    product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const { id, name, imageUrl, price } = product
  
    return (
        <>
            <Card>
                <Link href={`/products/${id}`}>
                                                                                {/* elementos height e width s]ao usados para saber quais são as proproções da imagem. São obrigatorio */}  
                    <Image className="card-img-top" src={imageUrl} alt={product.name} width={600} height={500} style={{width: "100%", height: "auto"}} priority />
                </Link>

                <CardBody>
                    <Link className="card-title text-decoration-none" href={`/products/${id}`}>
                      <h5 style={{ cursor: 'pointer' }}>
                        {name}
                      </h5>
                    </Link>

                    <CardSubtitle className="mb-3 text-muted" tag="h6">
                      R$ {price}
                    </CardSubtitle>

                    <Button
                      color="dark"
                      className="pb-2"
                      block
                      onClick={() => {
                        setToastIsOpen(true)
                        setTimeout(() => setToastIsOpen(false), 1000 * 3)
                      }}
                    >
                      Adicionar ao Carrinho
                    </Button>
                
                  </CardBody>
                </Card>
                
            <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} /> {/* cada vez que clicar no botão de adicionar ao carrinho, vai abrir o Toast e depois fechar o toast */}
        </>
    )
  }
  
  export default ProductCard

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductType } from "../services/products";

type CartContextType = {
  cart: ProductType[]
  addProduct: (product: ProductType) => void
  removeProduct: (productId: number) => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export const CartContextProvider = (props: {
    children?: ReactNode
}) =>{
    const [cart, setCart] = useState<ProductType[]>([])

    useEffect(() => {
      const storedCart = localStorage.getItem('shopping-cart') //verifica o carrinho que está armazenado no localStorage

      if (storedCart) {
        setCart(JSON.parse(storedCart)) //se tiver algo no localSotrage seta o que tem lá
      }
    }, [])

    const addProduct = (product: ProductType) => { //recebe o produto
      const updatedCart = [...cart, product] 
      localStorage.setItem('shopping-cart', JSON.stringify(updatedCart)) //inclui no array
      setCart(updatedCart)
    }
    
    const removeProduct = (productId: number) => {
        const productIndex = cart.findIndex(product => product.id === productId) //encontra o indice do produto a ser removido

        if (productIndex !== -1) { //se o indice existir, remove do carrinho
          const updatedCart = [...cart]
          updatedCart.splice(productIndex, 1)
          localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
          setCart(updatedCart)
        }
    }

    return (
        <CartContext.Provider
          value={{ cart, addProduct, removeProduct }} //devolve o contexto com os valores asserem utilizados
        >
          {props.children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext) //sempre que chamar o hook, o contexto já vai estar disponivel

//deixamos o contexto disponivel no _app para ficar disponivel globalmente
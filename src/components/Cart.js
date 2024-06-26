import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Button, StyledCart } from "../styles/components"
import priceFormat from "../utils/priceFormat"
import { CartContext } from "../context"

export default function Cart() {
  const { cart } = useContext(CartContext)
  const [total, setTotal] = useState(0)
  const [stripe, setStripe] = useState()

  const getTotal = () => {
    setTotal(
      cart.reduce((acc, current) => acc + current.price * current.quantity, 0)
    )
  }

  useEffect(() => {
      setStripe(
        window.Stripe(process.env.STRIPE_PK)
      )
      getTotal()
  }, [])

  const handleSubmit = async e => {
    console.log('xxx KABUMMM');

    console.log('xxx process.env.SUCCESS_REDIRECT-->: ', process.env.SUCCESS_REDIRECT);
    console.log('xxx process.env.CANCEL_REDIRECT-->: ', process.env.CANCEL_REDIRECT);

    console.log('xxx stripe.redirectToCheckout-->: ', stripe.redirectToCheckout);
    e.preventDefault()

    const { error } = await stripe.redirectToCheckout({
      items: cart.map(({ sku, quantity }) => ({ sku, quantity })),
      mode: "payment",
      successUrl: process.env.SUCCESS_REDIRECT,
      cancelUrl: process.env.CANCEL_REDIRECT,
    })
    if (error) {
      throw error
    }
  }

  // const handleSubmit = async e => {

  //   console.log('xxx KABUMMM');

  //   console.log('xxx stripe.redirectToCheckout-->: ', stripe.redirectToCheckout);

  //   e.preventDefault()

  //   let prod = cart.map(({ id, quantity }) => ({ price: id, quantity: quantity }))

  //   const { error } = await stripe.redirectToCheckout({
  //     lineItems: prod,
  //     mode: "payment",
  //     successUrl: process.env.SUCCESS_REDIRECT,
  //     cancelUrl: process.env.CANCEL_REDIRECT,
  //   })
  //   if (error) {
  //     throw error
  //   }
  // }

  return (
    <StyledCart>
      <h2>Carrito de compras</h2>
      <table>
        <tbody>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
          {cart.map(swag => (
            <tr key={swag.sku}>
              <td>
                <img src={swag.metadata.img} alt={swag.name} /> {swag.name}
              </td>
              <td>USD {priceFormat(swag.price)}</td>
              <td>{swag.quantity}</td>
              <td>{priceFormat(swag.quantity * swag.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <div>
          <h3>Subtotal: </h3>
          <small>USD {priceFormat(total)}</small>
          {/* <small>Total</small> */}
        </div>
        <div>
          <Link to="/">
            <Button type="outline">Volver</Button>
          </Link>
          <Button onClick={handleSubmit} disabled={cart.length === 0}>
            Comprar
          </Button>
        </div>
      </nav>
    </StyledCart>
  )
}

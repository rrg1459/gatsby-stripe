import React from "react"
import { SEO } from "../components"
import { Button } from "../styles/components"
import { Link } from "gatsby"

export default () => {
  return (
    <>
      <SEO title="Compra cancelada" />
      <div>
        <h2>Compra Cancelada</h2>
        <Link to="/">
          <Button>Volver al Catálogo</Button>
        </Link>
      </div>
    </>
  )
}

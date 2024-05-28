import React from "react"
import { Link } from "gatsby"

import { Jumbo, SEO, Products } from "../components"

// import styled from 'styled-components';

export const query = graphql`
  query GET_DATA {
    allSite {
      edges {
        node {
          siteMetadata {
            description
          }
        }
      }
    }
    allStripeSku {
      edges {
        node {
          id
          price
          product {
            name
            metadata {
              description
              img
              wear
            }
          }
        }
      }
    }
  }
`

const IndexPage = ({data}) => {
  
  console.log('xxx data-->: ', data);

  return (
  <Link>
    <SEO title="Home" />
    <Jumbo
        description={data.allSite.edges[0].node.siteMetadata.description}
      />
      <Products products={data.allStripeSku.edges} />

    <br />
    
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/gracias/">Gracias</Link>
  </Link>
)}

export default IndexPage

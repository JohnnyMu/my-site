import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
// import { Img } from "../components/Img"
import Img from "gatsby-image"
import React, { useEffect } from "react"

export default function StuffTemplate({ data }) {
  const { stuff } = data
  const { frontmatter, body } = stuff
  const { name, degree, slug, university, title, photo } = frontmatter
  const { img } = photo
  useEffect(() => {
    console.log(name, degree, slug, photo, img, body)
  })
  return (
    <>
      <Img fluid={img.sharp.fluid} style={{ width: 100 }} />
      <p>{name}</p>
      <p>{degree}</p>
      <p>{university}</p>
      <p>{title}</p>
      <MDXRenderer>{body}</MDXRenderer>
      {/*<MDXRenderer>{body}</MDXRenderer>*/}
    </>
  )
}
export const query = graphql`
  fragment adjacent on Mdx {
    frontmatter {
      title
      name
      degree
      university
      ...photo
      slug
    }
    body
  }
  query($slug: String!) {
    stuff: mdx(frontmatter: { slug: { eq: $slug } }) {
      ...adjacent
    }
  }
`

import { graphql } from "gatsby"

export const query = graphql`
  fragment sharpSrc on File {
    sharp: childImageSharp {
      fixed(width: 100) {
        ...GatsbyImageSharpFixed
      }
      fluid(maxWidth: 850) {
        ...GatsbyImageSharpFluid
      }
    }
    alt: name
    src: publicURL
  }
  fragment photo on MdxFrontmatter {
    photo {
      img {
        ...sharpSrc
      }
    }
  }
`

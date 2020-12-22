import { graphql } from "gatsby"

export const query = graphql`

  fragment stuff on Mdx {
    frontmatter {
      postType
      stuffType
      ...photo
      name
      title
      slug
      degree
      university
      research
      address
      email
    }
    timeToRead
    excerpt(pruneLength: 200)
    body
  }
`
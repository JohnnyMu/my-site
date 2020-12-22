const path = require(`path`)
// const fs = require(`fs`).promises
// const ExifReader = require(`exifreader`)
// const childProcess = require(`child_process`)
// const svgToMiniDataURI = require(`mini-svg-data-uri`)
// const SVGO = require(`svgo`)
const StuffTemplate =path.resolve(`./src/templates/stuff.js`)

const query = `
  {
    stuff: allMdx(
      filter: { fileAbsolutePath: { regex: "/stuff/" } }
    ) {
      nodes {
        frontmatter {
          slug
        }
      }
    }
    news: allMdx(
      filter: { fileAbsolutePath: { regex: "/news/" } }
    ) {
      nodes {
        frontmatter {
          slug
        }
      }
    }
  }
`
exports.createPages = async ({ graphql, actions }) => {
  const response = await graphql(query)
  if (response.errors) throw new Error(response.errors)
  const { stuff } = response.data

  stuff.nodes.forEach(stuff => {
    const { slug } = stuff.frontmatter
    if (slug) {
      actions.createPage({
        path: slug,
        component: StuffTemplate,
        context: { slug },
      })
    }
  })
}

exports.onCreateNode = async ({ node, actions }) => {
  // if (node.dir && node.dir.includes(`content/photos`) && node.ext === `.jpg`) {
  //   const buffer = await fs.readFile(node.absolutePath)
  //   const tags = ExifReader.load(buffer)
  //   const meta = {
  //     lat: tags.GPSLatitude.description,
  //     lng: tags.GPSLongitude.description,
  //     caption: tags.Headline.description,
  //   }
  //   actions.createNodeField({ node, name: `meta`, value: meta })
  // }
  if (
    node.internal.type === `Mdx` &&
    node.fileAbsolutePath.includes(`content/stuff`)
  ) {
    node.frontmatter.slug = `/stuff` + node.frontmatter.slug
  }
}
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
  })
}

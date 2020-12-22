import Image from 'gatsby-image'
import styled from 'styled-components'

export const Img = styled(Image).attrs(
  p => !p.fluid && p.src && { as: `img`, src: p.src }
)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
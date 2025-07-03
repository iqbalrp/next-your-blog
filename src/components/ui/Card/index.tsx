import type { ReactNode, FC } from "react"
import CardBase from "./Card"
import Content from "./Content"
import Block from "./Block"
import Author from "./Footer/Author"
import Meta from "./Footer/Meta"

type CardProps = {
  children: ReactNode
  showTopBorder?: boolean
  showBottomBorder?: boolean
}

type CardComponent = FC<CardProps> & {
  Content: typeof Content
  Block: typeof Block
  Footer: {
    Author: typeof Author
    Meta: typeof Meta
  }
}

const Card = Object.assign(CardBase, {
  Content,
  Block,
  Footer: { Author, Meta },
}) as CardComponent

export default Card

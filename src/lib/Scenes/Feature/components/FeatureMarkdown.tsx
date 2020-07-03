import { Sans } from "@artsy/palette"
import { defaultRules, renderMarkdown } from "lib/utils/renderMarkdown"
import React from "react"
import { Text } from "react-native"
import SimpleMarkdown from "simple-markdown"

export const FeatureMarkdown: React.FC<{ content: string; sansProps?: Partial<React.ComponentProps<typeof Sans>> }> = ({
  content,
  sansProps,
}) => {
  const rendered = renderMarkdown(content, {
    ...defaultRules(false, {
      paragraph: {
        match: SimpleMarkdown.blockRegex(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)/),
        react: (node, output, state) => {
          return (
            <Sans size="3" key={state.key} {...sansProps}>
              {output(node.content, state)}
            </Sans>
          )
        },
      },
    }),
  })

  if (Array.isArray(rendered)) {
    while (rendered.length && rendered[rendered.length - 1] && rendered[rendered.length - 1].type === Text) {
      rendered.pop()
    }
  }

  return rendered
}

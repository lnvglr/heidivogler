import MarkdownIt from 'markdown-it'
export const useMarkdown = (string: string) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true
  })
  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultRender =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    // If you are sure other plugins can't add `target` - drop check below
    const aIndex = tokens[idx].attrIndex('target')

    // if (aIndex < 0) {
    //   tokens[idx].attrPush(['target', '_blank']) // add new attribute
    // } else {
    //   tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
    // }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self)
  }
  return md.render(string)
}

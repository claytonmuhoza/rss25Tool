export const convertLeMondeRssToRss25SB = (sourceXml: string): string => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(sourceXml, 'application/xml')

  const ns = 'http://univ.fr/rss25'
  const feed = document.implementation.createDocument(ns, 'feed', null)
  const root = feed.documentElement

  root.setAttribute('lang', 'fr')
  root.setAttribute('version', '25')

  const channel = xmlDoc.querySelector('channel')
  const getText = (tag: string) => channel?.querySelector(tag)?.textContent || ''

  const appendTextElement = (name: string, value: string) => {
    const el = feed.createElementNS(ns, name)
    el.textContent = value
    root.appendChild(el)
  }

  appendTextElement('title', getText('title').slice(0, 128))
  appendTextElement('pubDate', new Date(getText('pubDate')).toISOString())
  appendTextElement('copyright', getText('copyright')?.slice(0, 128))

  const atomLink = channel?.querySelector('atom\\:link') as Element
  const link = feed.createElementNS(ns, 'link')
  link.setAttribute('href', atomLink?.getAttribute('href') || getText('link'))
  link.setAttribute('rel', 'self')
  link.setAttribute('type', 'application/atom+xml')
  root.appendChild(link)

  const items = Array.from(channel?.querySelectorAll('item') || []).slice(0, 10)

  for (const item of items) {
    const itemNode = feed.createElementNS(ns, 'item')

    const textNode = (tag: string) => item.querySelector(tag)?.textContent?.trim() || ''

    const add = (name: string, text: string) => {
      const el = feed.createElementNS(ns, name)
      el.textContent = text
      itemNode.appendChild(el)
    }

    add('guid', textNode('guid'))
    add('title', textNode('title').slice(0, 128))

    const category = feed.createElementNS(ns, 'category')
    category.setAttribute('term', 'Sciences')
    itemNode.appendChild(category)

    const dateRaw = textNode('pubDate') || textNode('updated')
    const date = new Date(dateRaw).toISOString()
    const dateTag = item.querySelector('updated') ? 'updated' : 'published'
    add(dateTag, date)
    const mediaNs = 'http://search.yahoo.com/mrss/'
    const media = item.getElementsByTagNameNS(mediaNs,'content')[0]
    console.log('io',media)
    if (media) {
      console.log('ok')
      const img = feed.createElementNS(ns, 'image')
      const url = media.getAttribute('url') || ''
      img.setAttribute('href', url)
      img.setAttribute('alt', media.getElementsByTagNameNS(mediaNs, 'description')[0]?.textContent?.slice(0, 128) || 'Image')
      img.setAttribute('type', url.endsWith('.png') ? 'png' : url.endsWith('.jpeg') ? 'jpeg' : 'jpg')
      itemNode.appendChild(img)
    }

    const content = feed.createElementNS(ns, 'content')
    content.textContent = textNode('description').slice(0, 500)
    content.setAttribute('type', 'text')
    itemNode.appendChild(content)

    const author = feed.createElementNS(ns, 'author')
    const name = feed.createElementNS(ns, 'name')
    name.textContent = 'Auteur inconnu'
    author.appendChild(name)
    itemNode.appendChild(author)

    root.appendChild(itemNode)
  }

  const serializer = new XMLSerializer()
  return serializer.serializeToString(feed)
}

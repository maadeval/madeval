import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'

export default async (req, res) => {
  const { title, tagImage } = req.query

  if (!title || !tagImage) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  const [fontExtraBold, fontRegular] = await Promise.all([
    fetch('https://madeval.dev/fonts/inter-bold.woff2').then((res) =>
      res.arrayBuffer()
    ),
    fetch('https://madeval.dev/fonts/inter-regular.woff2').then((res) =>
      res.arrayBuffer()
    ),
  ])

  const opts = {
    background: '#171717',
    fitTo: {
      mode: 'width',
      value: 2400,
    },
  }

  const markup = html`<div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#0f1e29',
  }}
>
  <div
    style={{
      display: 'flex',
    }}
  >
  style={{
    position: 'absolute',
    top: '-4rem',
    right: '2rem',
    width: '320',
    height: '320',
    opacity: '.2',
  }}
  />
    <div>
    </div>
  </div>
  <p style={{
    color: '#f8f8f8',
    fontSize: '24px',
    marginLeft: '2rem',
  }}>madeval.dev/</p>
  <div
    style={{
      display: 'flex',
      fontSize: 60,
      fontStyle: 'normal',
      color: '#f8f8f8',
      textAlign: 'left',
      marginLeft: '2rem',
      whiteSpace: 'pre-wrap',
    }}
  >
    <b>${title}</b>
  </div>
</div>
  `

  console.log({ markup })

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        data: fontRegular,
        format: 'woff2',
        family: 'Inter',
        weight: 400,
        style: 'normal',
      },
      {
        data: fontExtraBold,
        format: 'woff2',
        family: 'Inter',
        weight: 700,
        style: 'normal',
      },
    ],
  })

  console.log({ svg })

  const resvg = new Resvg(svg, opts)

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  console.log('pngBuffer', { pngBuffer })

  res.setHeader('Content-Type', 'image/png')
  res.status(200).send(pngBuffer)
}

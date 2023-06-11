import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'

const baseURL = 'https://madeval.dev'
const interRegularPath = '/fonts/inter-regular.woff2'
const interBoldPath = '/fonts/inter-bold.woff2'

export default async (req, res) => {
  const { title, tagImage } = req.query

  if (!title || !tagImage) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  const opts = {
    background: '#171717',
    fitTo: {
      mode: 'width',
      value: 2400,
    },
  }

  const [regularInterFont, boldInterFont] = await Promise.all([
    fetch(`${baseURL}${interRegularPath}`).then((res) => res.arrayBuffer()),
    fetch(`${baseURL}${interBoldPath}`).then((res) => res.arrayBuffer()),
  ])

  const markup = html`
  <div
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
  <img width="320" height="320" src="https://madeval.dev/${tagImage}.svg"
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

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: regularInterFont,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: boldInterFont,
        weight: 700,
        style: 'normal',
      },
    ],
  })

  const resvg = new Resvg(svg, opts)

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  res.setHeader('Content-Type', 'image/png')
  res.status(200).send(pngBuffer)
}

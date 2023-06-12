import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'

export default async (req, res) => {
  const { title, tagImage } = req.query

  if (!title || !tagImage) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  const [fontExtraBold, fontRegular] = await Promise.all([
    fetch('https://madeval.dev/fonts/Inter-Bold.ttf').then((res) =>
      res.arrayBuffer()
    ),
    fetch('https://madeval.dev/fonts/Inter-Medium.ttf').then((res) =>
      res.arrayBuffer()
    ),
  ])

  const opts = {
    background: '#0f1e29',
    fitTo: {
      mode: 'width',
      value: 2400,
    },
  }

  const markup = html`<div
    style="height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #0f1e29;"
  >
    <img
      width="420"
      height="420"
      src="https://madeval.dev/${tagImage}.svg"
      style="
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2rem;
    opacity: .2;
  "
    />
    <p
      style="
color: #f8f8f8;
fontSize: 24px;
marginLeft: 2rem;
"
    >
      madeval.dev/
    </p>
    <article
      style="
display: flex;
fontSize: 60;
fontStyle: normal;
color: #f8f8f8;
textAlign: left;
marginLeft: 2rem;
whiteSpace: pre-wrap;
"
    >
      <b>${title}</b>
    </article>
  </div> `

  console.log(markup.props.style)

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fontRegular,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: fontExtraBold,
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

import { Composition, Still } from 'remotion'
import { Intro } from './Intro.jsx'
import { BlogHero } from './BlogHero.jsx'

export const Root = () => (
  <>
    <Composition id="Intro" component={Intro} durationInFrames={360} fps={30} width={1920} height={1080} />
    <Still id="BlogHero" component={BlogHero} width={1600} height={800} />
  </>
)

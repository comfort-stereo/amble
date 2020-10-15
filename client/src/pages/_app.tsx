import { AppProps } from "next/dist/next-server/lib/router/router"
import { Root } from "../components/root"

function App({ Component, pageProps }: AppProps) {
  return (
    <Root>
      <Component {...pageProps} />
    </Root>
  )
}

export default App

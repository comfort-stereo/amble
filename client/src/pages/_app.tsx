import { AppPropsType } from "next/dist/next-server/lib/utils"

const App = ({ Component, pageProps }: AppPropsType) => {
  return <Component {...pageProps} />
}

export default App

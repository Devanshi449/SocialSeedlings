import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import  {store} from "../store/index"
import Headers from '@/Components/Headers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Headers>
        <Component {...pageProps} />
      </Headers>
    </Provider>
  );
}

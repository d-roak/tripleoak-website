import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderComponent from "../components/Header/header"
import FooterComponent from "../components/Footer/footer"
import CookieConsent from '../components/CookieConsent'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <HeaderComponent />
    <Component {...pageProps} />
    <FooterComponent />
    <CookieConsent />
  </>
}

export default MyApp

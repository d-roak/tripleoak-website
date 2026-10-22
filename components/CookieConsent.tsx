import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'tripleoak-analytics-consent'

type Consent = 'granted' | 'denied' | 'unset'

export default function CookieConsent() {
	const [consent, setConsent] = useState<Consent | null>(null)

	useEffect(() => {
		const savedConsent = window.localStorage.getItem(CONSENT_KEY)
		setConsent(savedConsent === 'granted' || savedConsent === 'denied' ? savedConsent : 'unset')
	}, [])

	const saveConsent = (granted: boolean) => {
		const savedConsent: Consent = granted ? 'granted' : 'denied'
		window.localStorage.setItem(CONSENT_KEY, savedConsent)
		setConsent(savedConsent)
	}

	if (consent === null) {
		return null
	}

	return (
		<>
			{consent === 'granted' && (
				<>
					<Script src="https://www.googletagmanager.com/gtag/js?id=G-RF5JKX0Q3W" strategy="afterInteractive" />
					<Script id="google-analytics" strategy="afterInteractive">
						{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RF5JKX0Q3W');`}
					</Script>
				</>
			)}
			{consent === 'unset' && (
				<section
					aria-label="Cookie consent"
					className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl border border-gray-300 bg-[#ede7dd] p-4 text-sm text-gray-700 shadow-lg"
				>
					<p>
						We use analytics cookies to understand site use. Read our <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.
					</p>
					<div className="mt-3 flex gap-3">
						<button className="border border-gray-500 px-3 py-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700" onClick={() => saveConsent(false)} type="button">
							Reject
						</button>
						<button className="bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700" onClick={() => saveConsent(true)} type="button">
							Accept
						</button>
					</div>
				</section>
			)}
		</>
	)
}

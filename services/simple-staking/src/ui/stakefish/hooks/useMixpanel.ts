// 'use client'

// import { usePathname } from 'next/navigation'
// import { useEffect } from 'react'

// import { Mixpanel } from 'utils/mixpanel'

// import { useWallet } from './useWallet'

// export function useMixpanelIdentify() {
//   const { activeAccount, activeChainId } = useWallet()
//   useEffect(() => {
//     if (activeAccount) Mixpanel.identify(`${activeAccount}_${activeChainId}`)
//     else Mixpanel.reset()
//   }, [activeAccount, activeChainId])
// }

// export function useMixpanelPageTracker() {
//   const pathname = usePathname()
//   useEffect(() => {
//     if (pathname) Mixpanel.track_pageview()
//   }, [pathname])
// }

import type { ReactNode } from 'react'
import SideNavigation from './SideNavigation'
import MobileTabBar from './MobileTabBar'

type ResponsiveShellProps = {
  children?: ReactNode
  tabBar?: ReactNode
}

export function ResponsiveShell({ children, tabBar }: ResponsiveShellProps) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Fixed left sidebar */}
      <SideNavigation />

      {/* Fixed top bar; full width on mobile, offset on ≥640px */}
      <header className="fixed left-0 sm:left-[250px] right-0 top-0 z-10 h-16 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="hidden h-10 w-60 items-center rounded-lg border border-zinc-300 px-3 text-sm text-zinc-700 sm:flex">
              Acme Inc
            </div>
            <div className="h-10 w-10 rounded-full bg-zinc-200" />
          </div>
        </div>
      </header>

      {/* Main content area offset by topbar; adds sidebar offset on ≥640px and room for mobile tabbar */}
      <main className="min-h-screen bg-zinc-100 pt-16 pl-0 sm:pl-[250px] pb-24 sm:pb-0">
        <div className="px-4 py-6 sm:px-6 xl:px-8">
          <div className="h-full w-full rounded-lg bg-zinc-200/50 p-4 sm:p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Bottom mobile tab bar */}
      {tabBar ?? <MobileTabBar />}
    </div>
  )
}

export function BreakpointIndicator() {
  return (
    <div className="fixed right-3 top-[80px] z-50 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
      <span className="inline sm:hidden">base</span>
      <span className="hidden sm:inline xl:hidden">sm ≥ 720</span>
      <span className="hidden xl:inline 2xl:hidden">xl ≥ 1280</span>
      <span className="hidden 2xl:inline">2xl ≥ 1536</span>
    </div>
  )
}

export default ResponsiveShell



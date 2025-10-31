//
import { useState } from 'react'
import ResponsiveShell, { BreakpointIndicator } from './components/ResponsiveShell'
import MobileTabBar from './components/MobileTabBar'
import MobileTabBarV2 from './components/MobileTabBarV2'
import MobileTabBarV3 from './components/MobileTabBarV3'

function App() {
  const [activeOption, setActiveOption] = useState<1 | 2 | 3 | 4>(1)
  const tabBar = activeOption === 2 ? <MobileTabBarV2 /> : activeOption === 3 ? <MobileTabBarV3 /> : <MobileTabBar />
  return (
    <ResponsiveShell tabBar={tabBar}>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setActiveOption(1)} className={`rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium ${activeOption === 1 ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-800 hover:bg-zinc-50'}`}>Option 1</button>
        <button onClick={() => setActiveOption(2)} className={`rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium ${activeOption === 2 ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-800 hover:bg-zinc-50'}`}>Option 2</button>
        <button onClick={() => setActiveOption(3)} className={`rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium ${activeOption === 3 ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-800 hover:bg-zinc-50'}`}>Option 3</button>
        <button onClick={() => setActiveOption(4)} className={`rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium ${activeOption === 4 ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-800 hover:bg-zinc-50'}`}>Option 4</button>
      </div>
      <BreakpointIndicator />
    </ResponsiveShell>
  )
}

export default App

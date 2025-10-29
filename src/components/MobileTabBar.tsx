import { useState } from 'react'
import IconImg from './IconImg'
import type { HTMLAttributes } from 'react'

type TabKey = 'home' | 'cards' | 'transactions' | 'accounting' | 'more'
type MobileTabBarProps = HTMLAttributes<HTMLDivElement> & {
  activeKey?: TabKey
  onChange?: (key: TabKey) => void
}

// Assets from the Figma session (local dev server)
const iconHome = "http://localhost:3845/assets/5dab63793026ff4855adfb63f7d47d718654927e.svg"
const iconCards = "http://localhost:3845/assets/38fde6c0df6be5218926a9e48e2235640ed33e0c.svg"
const iconTransactions = "http://localhost:3845/assets/0c42f2ab7088db017e55b013adfde0ca76eff4d3.svg"
const iconAccounting = "http://localhost:3845/assets/9195f31ceda11e2f072bd580880ac1a8e613da6c.svg"
const iconMore = "http://localhost:3845/assets/d6301b839ee281d474dd19ae4bc83e57c5290b63.svg"

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: iconHome },
  { key: 'cards', label: 'Cards', icon: iconCards },
  { key: 'transactions', label: 'Transactions', icon: iconTransactions },
  { key: 'accounting', label: 'Accounting', icon: iconAccounting },
  { key: 'more', label: 'More', icon: iconMore },
]

export default function MobileTabBar({ className = '', activeKey, onChange, ...rest }: MobileTabBarProps) {
  const [internalActive, setInternalActive] = useState<TabKey>('home')
  const [expanded, setExpanded] = useState(false)
  const currentKey = activeKey ?? internalActive
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === currentKey))

  const setActive = (key: TabKey) => {
    if (activeKey === undefined) setInternalActive(key)
    onChange?.(key)
    setExpanded(key === 'more')
  }
  return (
    <div
      className={`sm:hidden fixed bottom-3 left-4 right-4 z-20 ${className}`}
      {...rest}
    >
      <nav
        className="relative bg-white flex-1 overflow-hidden shadow-[0px_-5px_13px_rgba(79,74,114,0.05),0px_34px_10px_rgba(74,73,80,0.02),0px_22px_9px_rgba(74,73,80,0.02),0px_12px_7px_rgba(74,73,80,0.04),0px_5px_5px_rgba(74,73,80,0.05),0px_1px_3px_rgba(74,73,80,0.09)]"
        style={{
          height: expanded ? 522 : 65,
          borderRadius: 32,
          padding: expanded ? 24 : 4,
          transition: 'height 600ms cubic-bezier(0.22,1,0.36,1), padding 600ms cubic-bezier(0.22,1,0.36,1)'
        }}
      >
        {/* Animated highlight pill */}
        {!expanded && (
          <div
            className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-[44px] bg-zinc-100 will-change-transform"
            style={{
              width: `calc((100% - 8px) / ${tabs.length})`,
              transform: `translateX(${activeIndex * 100}%)`,
              transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)'
            }}
            aria-hidden
          />
        )}
        <ul className={`relative z-10 ${expanded ? 'hidden' : 'grid h-full grid-cols-5'}`}>
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex
            return (
              <li key={tab.key} className="flex h-full w-full items-center justify-center">
                <button
                  type="button"
                  className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-[44px]"
                  aria-pressed={isActive}
                  onClick={() => setActive(tab.key)}
                >
                  <IconImg alt="" src={tab.icon} className="h-5 w-5" />
                  <span className={`text-[12px] ${isActive ? 'text-black' : 'text-zinc-700'}`}>{tab.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
        {/* Expanded menu */}
        <div
          className={`absolute inset-0 p-6 ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ transition: expanded ? 'opacity 300ms ease 150ms' : 'opacity 150ms ease-out' }}
        >
          <ExpandedMenu onSelect={(key) => setActive(key)} onClose={() => setExpanded(false)} />
        </div>
      </nav>
    </div>
  )
}

type ExpandedMenuProps = {
  onSelect: (key: TabKey) => void
  onClose: () => void
}

function ExpandedMenu({ onSelect, onClose }: ExpandedMenuProps) {
  type MenuItem = { key: string; label: string; icon: string; mapsTo?: TabKey }
  const menuItems: MenuItem[] = [
    { key: 'home', label: 'Home', icon: iconHome, mapsTo: 'home' },
    { key: 'cards', label: 'Cards', icon: iconCards, mapsTo: 'cards' },
    { key: 'transactions', label: 'Transactions', icon: iconTransactions, mapsTo: 'transactions' },
    { key: 'company', label: 'Company', icon: iconAccounting },
    { key: 'accounting', label: 'Accounting', icon: iconAccounting, mapsTo: 'accounting' },
    { key: 'integrations', label: 'Integrations', icon: iconAccounting },
    { key: 'settings', label: 'Settings', icon: iconAccounting },
  ]
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ul className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className="flex h-12 w-full items-center gap-2 rounded-[12px] px-4 text-left hover:bg-zinc-100"
              onClick={() => (item.mapsTo ? onSelect(item.mapsTo) : onClose())}
            >
              <IconImg alt="" src={item.icon} className="h-5 w-5 opacity-80" />
              <span className="text-[12px] text-zinc-800">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="flex h-12 w-full items-center gap-2 rounded-[12px] px-4 text-left"
        onClick={onClose}
      >
        <IconImg alt="" src={iconMore} className="h-5 w-5 opacity-80" />
        <span className="text-[12px] text-zinc-700">Show less</span>
      </button>
    </div>
  )
}



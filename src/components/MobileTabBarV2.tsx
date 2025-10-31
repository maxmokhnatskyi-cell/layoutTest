import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import IconImg from './IconImg'

type TabKey = 'home' | 'cards' | 'transactions' | 'more'

type MobileTabBarV2Props = HTMLAttributes<HTMLDivElement> & {
  activeKey?: TabKey
  onChange?: (key: TabKey) => void
}

const iconHome = "http://localhost:3845/assets/5dab63793026ff4855adfb63f7d47d718654927e.svg"
const iconCards = "http://localhost:3845/assets/38fde6c0df6be5218926a9e48e2235640ed33e0c.svg"
const iconTransactions = "http://localhost:3845/assets/0c42f2ab7088db017e55b013adfde0ca76eff4d3.svg"
const iconMore = "http://localhost:3845/assets/d6301b839ee281d474dd19ae4bc83e57c5290b63.svg"

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: iconHome },
  { key: 'cards', label: 'Cards', icon: iconCards },
  { key: 'transactions', label: 'Transactions', icon: iconTransactions },
  { key: 'more', label: 'More', icon: iconMore },
]

export default function MobileTabBarV2({ className = '', activeKey, onChange, ...rest }: MobileTabBarV2Props) {
  const [internalActive, setInternalActive] = useState<TabKey>('home')
  const currentKey = activeKey ?? internalActive
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === currentKey))
  const [expanded, setExpanded] = useState(false)

  const setActive = (key: TabKey) => {
    if (activeKey === undefined) setInternalActive(key)
    onChange?.(key)
    setExpanded(key === 'more')
  }

  return (
    <div className={`sm:hidden fixed bottom-3 left-8 right-8 z-20 ${className}`} {...rest}>
      <nav
        className="relative backdrop-blur-md bg-[rgba(250,250,250,0.7)] border border-white flex-1 overflow-hidden"
        style={{
          height: expanded ? 498 : 56,
          borderRadius: 30,
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

        <ul className={`relative z-10 ${expanded ? 'hidden' : 'grid h-full grid-cols-4'}`}>
          {tabs.map((tab) => {
            const isActive = tab.key === currentKey
            return (
              <li key={tab.key} className="flex h-full w-full items-center justify-center">
                <button
                  type="button"
                  onClick={() => setActive(tab.key)}
                  aria-pressed={isActive}
                  className="flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-[44px]"
                >
                  <IconImg
                    alt=""
                    src={tab.icon}
                    className="h-5 w-5"
                    style={{
                      color: isActive ? '#00786f' : '#393939',
                      filter: isActive
                        ? 'brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(458%) hue-rotate(130deg) brightness(92%) contrast(100%)'
                        : 'grayscale(100%) opacity(0.7)',
                    }}
                  />
                  <span className={`text-[12px] ${isActive ? 'text-[#00786f]' : 'text-[#393939]'}`}>{tab.label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Expanded menu overlay */}
        <div
          className={`absolute inset-0 p-6 ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ transition: expanded ? 'opacity 300ms ease 150ms' : 'opacity 150ms ease-out' }}
        >
          <ExpandedMenuV2 onSelect={(key) => setActive(key)} onClose={() => setExpanded(false)} />
        </div>
      </nav>
    </div>
  )
}


type ExpandedMenuV2Props = {
  onSelect: (key: TabKey) => void
  onClose: () => void
}

function ExpandedMenuV2({ onSelect, onClose }: ExpandedMenuV2Props) {
  type MenuItem = { key: string; label: string; icon: string; mapsTo?: TabKey }
  const menuItems: MenuItem[] = [
    { key: 'home', label: 'Home', icon: iconHome, mapsTo: 'home' },
    { key: 'cards', label: 'Cards', icon: iconCards, mapsTo: 'cards' },
    { key: 'transactions', label: 'Transactions', icon: iconTransactions, mapsTo: 'transactions' },
    { key: 'company', label: 'Company', icon: iconMore },
    { key: 'accounting', label: 'Accounting', icon: iconMore, mapsTo: 'more' },
    { key: 'integrations', label: 'Integrations', icon: iconMore },
    { key: 'settings', label: 'Settings', icon: iconMore },
  ]
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ul className="flex flex-col gap-1">
        {menuItems.map((item, idx) => (
          <li key={item.key}>
            <button
              type="button"
              className={`flex h-12 w-full items-center gap-2 rounded-[12px] px-4 text-left ${idx === 0 ? 'bg-[#f6f6f6]' : 'hover:bg-zinc-100'}`}
              onClick={() => (item.mapsTo ? onSelect(item.mapsTo) : onClose())}
            >
              <span className="h-5 w-5 rounded-[6px]" style={{ backgroundColor: idx === 0 ? '#00786f' : 'grey' }} />
              <span className={`text-[12px] ${idx === 0 ? 'text-[#00786f]' : 'text-[#393939]'}`}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="flex h-12 w-full items-center gap-2 rounded-[12px] px-4 text-left" onClick={onClose}>
        <span className="h-5 w-5 rounded-[6px]" style={{ backgroundColor: 'grey' }} />
        <span className="text-[12px] text-[#393939]">Show less</span>
      </button>
    </div>
  )
}

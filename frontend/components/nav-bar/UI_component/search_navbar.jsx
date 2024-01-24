'use client'
import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

function SearchNavBar({ data }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const params = useParams()
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  const onClick = ({ id, type }) => {
    console.log(
      '🚀 ~ file: search_navbar.jsx:30 ~ onClick ~ id, type:',
      id,
      type
    )
    setOpen(false)
  }
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 items-center flex rounded-md gap-x-2 w-[250px] bg-white transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600
        dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-mute px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">Ctrl</span> + K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all customers, products and orders" />
        <CommandList>
          <CommandEmpty>No Results Found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null
            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ icon, name, id }) => {
                  return (
                    <CommandItem
                      className="cursor-pointer"
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchNavBar

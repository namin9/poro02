export default function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }
  return (
    <button onClick={toggle} className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
      🌓
    </button>
  )
}

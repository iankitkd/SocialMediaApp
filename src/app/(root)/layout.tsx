import BottomNav from "@/components/layout/BottomNav"
import SideNav from "@/components/layout/SideNav"
import TopBar from "@/components/layout/TopBar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex h-screen md:w-3xl lg:w-6xl xl:w-7xl mx-auto">
        <aside className="hidden md:flex flex-col h-screen md:w-20 lg:w-64 px-4 py-4 border-r">
          <SideNav />
        </aside>
        <main className="flex-1 pb-16 md:pb-0 pt-10 md:pt-0 overflow-y-auto">{children}</main>
      </div>
      <TopBar/>
      <BottomNav />
    </>
  )
}

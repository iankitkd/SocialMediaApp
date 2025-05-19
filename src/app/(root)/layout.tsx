import BottomNav from "@/components/layout/BottomNav"
import SideNav from "@/components/layout/SideNav"
import TopBar from "@/components/layout/TopBar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <TopBar/>
      <div className="flex flex-1 pt-10 pb-16 md:p-0 md:w-3xl lg:w-6xl xl:w-7xl mx-auto overflow-hidden">
        <aside className="hidden md:flex flex-col h-screen md:w-20 lg:w-64 px-4 py-4 border-r">
          <SideNav />
        </aside>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}

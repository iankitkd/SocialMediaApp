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
      <div className="flex min-h-screen md:w-3xl lg:w-6xl xl:w-7xl mx-auto">
        <SideNav />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
      </div>
      <TopBar/>
      <BottomNav />
    </>
  )
}

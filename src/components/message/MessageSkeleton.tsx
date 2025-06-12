
export default function MessageSkeleton() {
  return (
    <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex ${i%2 == 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`w-44 md:w-56 h-14  rounded-lg flex flex-col bg-card animate-pulse
                    ${ i%2 == 0  ? 'rounded-tr-none' : 'rounded-tl-none'}`}
                >
                </div>
            </div>
        ))}
    </div>
  )
}

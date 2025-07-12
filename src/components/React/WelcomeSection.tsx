"use client" 

interface WelcomeSectionProps {
  currentTime: Date
  greeting: string
}

export function WelcomeSection({ currentTime, greeting }: WelcomeSectionProps) { 

  return (
    <div className="lg:col-span-2">
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">{greeting}!</h2>
        <p className="text-white/80 text-lg">
          {currentTime.toLocaleDateString("ja-JP" , {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="text-3xl font-mono text-white/90 mt-2 animate-pulse">
          {currentTime.toLocaleTimeString("ja-JP" , {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  )
}

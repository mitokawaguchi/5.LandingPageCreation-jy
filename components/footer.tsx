"use client"

export function Footer() {
  return (
    <footer className="bg-card py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mit Tech Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors underline-animate">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors underline-animate">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

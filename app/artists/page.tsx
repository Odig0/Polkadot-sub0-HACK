import Header from '@/components/header'
import Footer from '@/components/footer'
import ArtistCard from '@/components/artist-card'
import { mockArtists } from '@/lib/mock-data'

export default function ArtistsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">Featured Artists</h1>
            <p className="text-xl text-muted-foreground">
              Discover talented creators and bid on exclusive opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

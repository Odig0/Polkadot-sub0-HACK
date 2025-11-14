export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900 border-t-2 border-purple-400/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Platform</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Artists</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Auctions</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Community</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Discord</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Twitter</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Legal</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Terms</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors font-medium">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Built On</h4>
            <p className="text-purple-200 text-sm font-medium">Polkadot & Kusama</p>
          </div>
        </div>
        <div className="border-t border-purple-400/30 pt-8 text-center text-purple-300">
          <p className="font-medium">&copy; 2025 ArtBid. Fair auctions for artists.</p>
        </div>
      </div>
    </footer>
  )
}

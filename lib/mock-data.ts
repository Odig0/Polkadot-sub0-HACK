import { Artist, Bid } from './types'

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Luna Echo',
    avatar: '🎵',
    category: 'Music',
    description: 'Electronic music producer creating immersive soundscapes. Tickets to exclusive listening events.',
    activeAuction: 3,
  },
  {
    id: '2',
    name: 'Aria Canvas',
    avatar: '🎨',
    category: 'Visual Arts',
    description: 'Digital artist specializing in abstract and surreal compositions. Limited edition NFT collections.',
    activeAuction: 5,
  },
  {
    id: '3',
    name: 'Rory Lights',
    avatar: '🎬',
    category: 'Cinema',
    description: 'Filmmaker and visual storyteller. Early access to new film projects and behind-the-scenes content.',
    activeAuction: 2,
  },
  {
    id: '4',
    name: 'Jazz Flow',
    avatar: '🎷',
    category: 'Music',
    description: 'Jazz improvisation artist. VIP tickets to live performances and studio jam sessions.',
    activeAuction: 4,
  },
  {
    id: '5',
    name: 'Pixel Dreams',
    avatar: '🎮',
    category: 'Digital Design',
    description: 'Game art designer and character illustrator. Exclusive asset packs and design workshops.',
    activeAuction: 6,
  },
  {
    id: '6',
    name: 'Voice of Stars',
    avatar: '🎤',
    category: 'Spoken Word',
    description: 'Poet and spoken word artist. Poetry collections and intimate performance tickets.',
    activeAuction: 3,
  },
]

export const mockBids: Bid[] = [
  { id: 1, rank: 1, bidder: 'cryptofan_001', amount: 2500, isWinner: true },
  { id: 2, rank: 2, bidder: 'artcollector_99', amount: 2400, isWinner: true },
  { id: 3, rank: 3, bidder: 'moonbeam_whale', amount: 2300, isWinner: true },
  { id: 4, rank: 4, bidder: 'polkadot_fan', amount: 2200, isWinner: true },
  { id: 5, rank: 5, bidder: 'nft_investor', amount: 2100, isWinner: true },
  { id: 6, rank: 6, bidder: 'creative_bid', amount: 2000, isWinner: true },
  { id: 7, rank: 7, bidder: 'blockchain_dad', amount: 1950, isWinner: true },
  { id: 8, rank: 8, bidder: 'kusama_kid', amount: 1900, isWinner: true },
  { id: 9, rank: 9, bidder: 'bidder_supreme', amount: 1850, isWinner: true },
  { id: 10, rank: 10, bidder: 'last_winner', amount: 1800, isWinner: true },
  { id: 11, rank: 11, bidder: 'almost_there', amount: 1750, isWinner: false },
  { id: 12, rank: 12, bidder: 'so_close_99', amount: 1700, isWinner: false },
  { id: 13, rank: 13, bidder: 'next_time', amount: 1650, isWinner: false },
]

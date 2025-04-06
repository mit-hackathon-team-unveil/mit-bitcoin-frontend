export const mockCategories = [
  {
    id: "Business",
    name: "Business",
    description: "Decentralized Finance news and updates",
    icon: "💰",
  },
  {
    id: "Politics",
    name: "Politics",
    description: "Non-Fungible Token projects and marketplace updates",
    icon: "🖼️",
  },
  {
    id: "Entertainment",
    name: "Entertainment",
    description: "Decentralized Autonomous Organizations governance and proposals",
    icon: "🎥",
  },
  {
    id: "Sports",
    name: "Sports",
    description: "Decentralized Autonomous Organizations governance and proposals",
    icon: "🏈",
  },
  {
    id: "Technology",
    name: "Technology",
    description: "Decentralized Autonomous Organizations governance and proposals",
    icon: "💻",
  },
  {
    id: "Miscellaneous",
    name: "Miscellaneous",
    description: "Decentralized Autonomous Organizations governance and proposals",
    icon: "🏛️",
  },
]

export const mockArticles = [
  {
    id: "article-1",
    title: "New DeFi Protocol Reaches $1B TVL in Just 48 Hours",
    content: `
      <p>A new DeFi protocol has taken the crypto world by storm, reaching $1 billion in Total Value Locked (TVL) within just 48 hours of its launch.</p>
      
      <p>The protocol, named "FlashYield," offers innovative yield farming strategies that have attracted liquidity providers from across the ecosystem. Experts are calling it one of the fastest-growing DeFi projects in history.</p>
      
      <p>"We've never seen adoption at this pace before," said crypto analyst Maria Chen. "The unique tokenomics and the team's reputation have created the perfect storm for this launch."</p>
      
      <p>FlashYield's native token, $FLASH, has also seen remarkable price action, surging from an initial price of $0.10 to over $2.50 in the same timeframe.</p>
      
      <p>However, some industry veterans urge caution. "Fast growth is exciting, but it also comes with risks. Users should do their own research and only invest what they can afford to lose," warned DeFi researcher Alex Johnson.</p>
      
      <p>The protocol's audit reports have been published, showing no critical vulnerabilities, but as with any new DeFi project, smart contract risks remain.</p>
    `,
    categoryId: "defi",
    author: "0x1234567890abcdef1234567890abcdef12345678",
    authorName: "CryptoInsider",
    createdAt: "2025-04-05T10:30:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    votes: 42,
    userVotes: [],
  },
  {
    id: "article-2",
    title: "Bored Ape Yacht Club Launches New NFT Collection",
    content: `
      <p>Yuga Labs, the company behind the popular Bored Ape Yacht Club (BAYC) NFT collection, has announced a new series of NFTs that will expand the BAYC ecosystem.</p>
      
      <p>The new collection, titled "Mutant Ape Arcade Club," features pixel art versions of the famous apes in various retro gaming scenarios. Each NFT will grant holders access to exclusive arcade-style games being developed by Yuga Labs.</p>
      
      <p>"We're combining nostalgia for classic gaming with the innovation of Web3," said a Yuga Labs spokesperson. "This collection bridges multiple generations of digital culture."</p>
      
      <p>The mint is scheduled for next month, with 10,000 NFTs available at a price of 1 ETH each. BAYC and MAYC holders will receive priority access and a discount.</p>
      
      <p>The announcement has already caused a stir in the NFT community, with floor prices for existing BAYC NFTs rising by approximately 15% following the news.</p>
      
      <p>Critics, however, question whether the market can sustain another high-profile NFT launch amid the current market conditions.</p>
    `,
    categoryId: "nft",
    author: "0xabcdef1234567890abcdef1234567890abcdef12",
    authorName: "NFTEnthusiast",
    createdAt: "2023-04-14T15:45:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    votes: 38,
    userVotes: [],
  },
  {
    id: "article-3",
    title: "MakerDAO Votes to Diversify $500M Treasury into Traditional Assets",
    content: `
      <p>In a groundbreaking move that bridges traditional finance and DeFi, MakerDAO has voted to diversify $500 million of its treasury into traditional financial assets.</p>
      
      <p>The proposal, which passed with 80% approval from MKR token holders, will allocate funds to US Treasury bonds and corporate debt through a regulated asset manager.</p>
      
      <p>"This represents a new chapter for DAOs," said a MakerDAO representative. "We're demonstrating that decentralized governance can make sophisticated financial decisions that rival traditional institutions."</p>
      
      <p>The decision comes after months of debate within the community about how to best manage the protocol's growing treasury, which has swelled due to the success of the DAI stablecoin.</p>
      
      <p>Some community members expressed concerns about regulatory implications and centralization risks, but the majority view was that diversification would strengthen the protocol's financial position.</p>
      
      <p>The implementation will be phased, with the first $100 million being allocated in the coming weeks.</p>
    `,
    categoryId: "dao",
    author: "0x7890abcdef1234567890abcdef1234567890abcd",
    authorName: "DAOexpert",
    createdAt: "2023-04-13T09:15:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    votes: 29,
    userVotes: [],
  },
  {
    id: "article-4",
    title: "Ethereum Layer 2 Solutions See Record Adoption as Gas Fees Spike",
    content: `
      <p>Ethereum Layer 2 scaling solutions have seen unprecedented adoption over the past week as gas fees on the Ethereum mainnet reached new highs.</p>
      
      <p>Arbitrum and Optimism, two leading optimistic rollup solutions, have reported a combined 300% increase in Total Value Locked (TVL) and daily active users.</p>
      
      <p>"Users are finally understanding the benefits of L2s," said Ethereum researcher Tim Beiko. "You get the security of Ethereum with a fraction of the cost."</p>
      
      <p>The surge in gas fees, which briefly touched 200 gwei for standard transactions, has been attributed to a combination of NFT launches, DeFi activity, and increased on-chain trading.</p>
      
      <p>Major DeFi protocols have responded by accelerating their L2 deployment plans. Uniswap, Aave, and Compound have all announced expanded support for multiple L2 networks in the coming months.</p>
      
      <p>Ethereum co-founder Vitalik Buterin commented on the development, calling it "a natural evolution of the ecosystem" and reiterating that L2s are the path forward for Ethereum scalability in the short to medium term.</p>
    `,
    categoryId: "defi",
    author: "0xdef1234567890abcdef1234567890abcdef123456",
    authorName: "L2Enthusiast",
    createdAt: "2023-04-12T14:20:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    votes: 35,
    userVotes: [],
  },
  {
    id: "article-5",
    title: "Virtual Land in the Metaverse: The Next Real Estate Boom?",
    content: `
      <p>Virtual real estate in metaverse platforms is experiencing a surge in both prices and transaction volume, leading some to call it the next frontier in digital assets.</p>
      
      <p>Parcels in popular platforms like Decentraland and The Sandbox have sold for hundreds of thousands of dollars, with some high-profile sales exceeding $2 million.</p>
      
      <p>"Location matters in the metaverse just as it does in the physical world," explained metaverse consultant Sarah Williams. "Proximity to high-traffic areas, popular brands, or celebrities drives value."</p>
      
      <p>Major brands including Adidas, Samsung, and JP Morgan have purchased virtual land to establish a presence in these digital worlds, seeing it as an opportunity to connect with tech-savvy consumers.</p>
      
      <p>Investment firms specializing in metaverse real estate have also emerged, pooling capital to acquire, develop, and lease virtual properties.</p>
      
      <p>Critics, however, question the long-term value proposition. "The supply of virtual land is theoretically infinite," noted economist Paul Kramer. "Any platform can create more land or new platforms can emerge, potentially diluting value."</p>
      
      <p>Despite the skepticism, transaction volume continues to grow, with Q1 2023 seeing a 40% increase compared to the previous quarter.</p>
    `,
    categoryId: "nft",
    author: "0x567890abcdef1234567890abcdef1234567890ab",
    authorName: "MetaverseTrader",
    createdAt: "2023-04-11T11:05:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    votes: 27,
    userVotes: [],
  },
  {
    id: "article-6",
    title: "Uniswap DAO Proposes $10M Developer Grant Program",
    content: `
      <p>The Uniswap DAO has put forward a proposal to establish a $10 million grant program aimed at supporting developers building on the Uniswap protocol.</p>
      
      <p>The program would fund projects in several categories, including user interface improvements, new trading features, analytics tools, and cross-chain implementations.</p>
      
      <p>"Developer ecosystem growth is critical for Uniswap's long-term success," stated the proposal. "This grant program will accelerate innovation and help Uniswap maintain its position as the leading DEX."</p>
      
      <p>Grants would range from $10,000 to $250,000 depending on project scope and team experience. A committee of five members, elected by UNI token holders, would oversee the allocation of funds.</p>
      
      <p>The proposal has received strong initial support, with several influential community members and major token holders expressing their backing.</p>
      
      <p>If approved, this would be one of the largest developer grant programs in the DeFi space, reflecting Uniswap's substantial treasury and commitment to ecosystem development.</p>
      
      <p>Voting is scheduled to begin next week and will remain open for seven days.</p>
    `,
    categoryId: "dao",
    author: "0x90abcdef1234567890abcdef1234567890abcdef",
    authorName: "DeFiDeveloper",
    createdAt: "2023-04-10T16:30:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    votes: 31,
    userVotes: [],
  },
]

export const getUserArticles = (walletAddress) => {
  return mockArticles.filter((article) => article.author === walletAddress)
}

export const getUserVotes = (walletAddress) => {
  const userVotes = []

  mockArticles.forEach((article) => {
    const userVote = article.userVotes.find((vote) => vote.walletAddress === walletAddress)
    if (userVote) {
      userVotes.push({
        articleId: article.id,
        articleTitle: article.title,
        voteType: userVote.voteType,
      })
    }
  })

  return userVotes
}
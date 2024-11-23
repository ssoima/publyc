export interface Article {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    date: string;
  }
  
  export const mockArticles: Article[] = [
    {
      id: 1,
      title: "The Future of AI",
      excerpt: "Exploring the latest developments in artificial intelligence and how it's shaping our world. From machine learning to neural networks...",
      imageUrl: "/article-images/ai.jpg",
      date: "2024-03-20"
    },
    {
      id: 2,
      title: "Web3 Revolution",
      excerpt: "Understanding the decentralized web and how blockchain technology is transforming digital ownership and interactions...",
      imageUrl: "/article-images/web3.jpg",
      date: "2024-03-19"
    }
  ];
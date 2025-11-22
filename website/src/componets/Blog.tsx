import React, { useState, useEffect } from 'react';
import {
  Input,
  Pagination,
  Tag,
  Spin,
  Empty,
  Select,
  Tooltip,
  message,
  Card,
  Typography,
} from 'antd';
import {
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { FiZap, FiArrowRight } from 'react-icons/fi';

const { Option } = Select;
const { Title, Paragraph } = Typography;

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  thumbnail: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  url: string;
  likes: number;
  comments: number;
  readingTime: number;
  isFeatured?: boolean;
}

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Internet Connectivity in Kenya',
    excerpt:
      'Discover how Blackie Networks is revolutionizing affordable and reliable internet services with innovative bundles and seamless connectivity across regions.',
    category: 'Technology',
    tags: ['Internet', 'Innovation', 'Kenya'],
    thumbnail: 'https://source.unsplash.com/featured/?internet,technology',
    date: '2025-05-20',
    author: {
      name: 'Kwame Ochieng',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Tech enthusiast and writer passionate about connectivity.',
    },
    url: '/blog/future-of-internet-connectivity',
    likes: 152,
    comments: 32,
    readingTime: 6,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'How to Maximize Your Home Wi-Fi Performance',
    excerpt:
      'Learn simple tips and tricks to improve your home Wi-Fi experience using Blackie Networks\' solutions and troubleshoot common issues.',
    category: 'Tips & Tricks',
    tags: ['Wi-Fi', 'Router', 'Home Network'],
    thumbnail: 'https://source.unsplash.com/featured/?wifi,router',
    date: '2025-05-10',
    author: {
      name: 'Amina Wanjiku',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Network engineer sharing practical guides for everyday users.',
    },
    url: '/blog/maximize-home-wifi',
    likes: 97,
    comments: 14,
    readingTime: 4,
  },
  {
    id: 3,
    title: 'Understanding Internet Bundles: What You Need to Know',
    excerpt:
      'Internet bundles can be confusing. Here\'s a straightforward guide to choosing the right one for you, balancing cost, speed, and data limits.',
    category: 'Guides',
    tags: ['Internet', 'Bundles', 'Guides'],
    thumbnail: 'https://source.unsplash.com/featured/?internet,bundles',
    date: '2025-04-28',
    author: {
      name: 'Fatima Adisa',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Content writer with expertise in telecom industry trends.',
    },
    url: '/blog/internet-bundles-guide',
    likes: 128,
    comments: 27,
    readingTime: 5,
  },
  {
    id: 4,
    title: '5G Technology: What It Means for East Africa',
    excerpt:
      'Explore the potential of 5G networks in transforming digital infrastructure across East Africa and how businesses can prepare for this technological leap.',
    category: 'Technology',
    tags: ['5G', 'Technology', 'East Africa', 'Innovation'],
    thumbnail: 'https://source.unsplash.com/featured/?5g,technology',
    date: '2025-04-15',
    author: {
      name: 'David Mwangi',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Telecommunications expert focusing on emerging technologies in Africa.',
    },
    url: '/blog/5g-technology-east-africa',
    likes: 203,
    comments: 45,
    readingTime: 7,
    isFeatured: true,
  },
  {
    id: 5,
    title: 'Securing Your Home Network: Essential Tips',
    excerpt:
      'Protect your family\'s digital privacy with these essential home network security practices. Learn how to safeguard your Wi-Fi and connected devices.',
    category: 'Tips & Tricks',
    tags: ['Security', 'Wi-Fi', 'Privacy', 'Network'],
    thumbnail: 'https://source.unsplash.com/featured/?security,network',
    date: '2025-04-05',
    author: {
      name: 'Grace Akinyi',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      bio: 'Cybersecurity specialist helping families stay safe online.',
    },
    url: '/blog/home-network-security',
    likes: 156,
    comments: 38,
    readingTime: 6,
  },
  {
    id: 6,
    title: 'Remote Work: Internet Requirements for Productivity',
    excerpt:
      'Discover the optimal internet speeds and connection requirements for effective remote work. Learn how to optimize your home office setup for maximum productivity.',
    category: 'Guides',
    tags: ['Remote Work', 'Productivity', 'Internet Speed', 'Work from Home'],
    thumbnail: 'https://source.unsplash.com/featured/?remote,work',
    date: '2025-03-25',
    author: {
      name: 'Oluwaseun Adebayo',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: 'Productivity consultant specializing in remote work solutions.',
    },
    url: '/blog/remote-work-internet-requirements',
    likes: 189,
    comments: 52,
    readingTime: 5,
  },
  {
    id: 7,
    title: 'Fiber vs. Wireless: Choosing the Right Connection',
    excerpt:
      'Compare fiber optic and wireless internet connections to find the best option for your home or business needs in Kenya.',
    category: 'Guides',
    tags: ['Fiber', 'Wireless', 'Internet', 'Comparison'],
    thumbnail: 'https://source.unsplash.com/featured/?fiber,optic',
    date: '2025-03-18',
    author: {
      name: 'James Kipchoge',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Network infrastructure consultant with 15 years of experience.',
    },
    url: '/blog/fiber-vs-wireless',
    likes: 142,
    comments: 29,
    readingTime: 6,
  },
  {
    id: 8,
    title: 'Smart Home Devices: Network Setup Guide',
    excerpt:
      'Learn how to properly configure your home network to support multiple smart devices, from security cameras to voice assistants.',
    category: 'Tips & Tricks',
    tags: ['Smart Home', 'IoT', 'Network Setup', 'Automation'],
    thumbnail: 'https://source.unsplash.com/featured/?smart,home',
    date: '2025-03-10',
    author: {
      name: 'Zainab Hassan',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      bio: 'Smart home technology expert and automation enthusiast.',
    },
    url: '/blog/smart-home-network-setup',
    likes: 98,
    comments: 21,
    readingTime: 4,
  },
  {
    id: 9,
    title: 'Internet Connectivity in Rural Kenya: Challenges and Solutions',
    excerpt:
      'Understanding the unique challenges of providing reliable internet access in rural areas and the innovative solutions being implemented across Kenya.',
    category: 'Technology',
    tags: ['Rural Connectivity', 'Kenya', 'Infrastructure', 'Digital Divide'],
    thumbnail: 'https://source.unsplash.com/featured/?rural,kenya',
    date: '2025-03-02',
    author: {
      name: 'Peter Kamau',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: 'Rural connectivity advocate working to bridge the digital divide.',
    },
    url: '/blog/rural-connectivity-kenya',
    likes: 167,
    comments: 41,
    readingTime: 8,
  },
  {
    id: 10,
    title: 'Gaming Online: Internet Speed Requirements',
    excerpt:
      'Find out what internet speeds you need for smooth online gaming, from casual mobile games to competitive esports, and how to reduce lag.',
    category: 'Guides',
    tags: ['Gaming', 'Internet Speed', 'Latency', 'Online Gaming'],
    thumbnail: 'https://source.unsplash.com/featured/?gaming,computer',
    date: '2025-02-22',
    author: {
      name: 'Michael Ochieng',
      avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
      bio: 'Gaming enthusiast and network performance specialist.',
    },
    url: '/blog/gaming-internet-requirements',
    likes: 134,
    comments: 33,
    readingTime: 5,
  },
  {
    id: 11,
    title: 'Streaming Services: Bandwidth Management Tips',
    excerpt:
      'Learn how to manage your internet bandwidth when multiple family members are streaming content simultaneously without experiencing buffering.',
    category: 'Tips & Tricks',
    tags: ['Streaming', 'Bandwidth', 'Netflix', 'YouTube'],
    thumbnail: 'https://source.unsplash.com/featured/?streaming,media',
    date: '2025-02-15',
    author: {
      name: 'Sarah Muthoni',
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
      bio: 'Digital media consultant helping families optimize their streaming experience.',
    },
    url: '/blog/streaming-bandwidth-management',
    likes: 111,
    comments: 26,
    readingTime: 4,
  },
  {
    id: 12,
    title: 'Business Internet Solutions: What Your Company Needs',
    excerpt:
      'A comprehensive guide to choosing the right internet solution for your business, including considerations for reliability, speed, and support.',
    category: 'Guides',
    tags: ['Business', 'Enterprise', 'Internet Solutions', 'B2B'],
    thumbnail: 'https://source.unsplash.com/featured/?business,office',
    date: '2025-02-08',
    author: {
      name: 'Daniel Otieno',
      avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
      bio: 'Business technology consultant specializing in enterprise connectivity.',
    },
    url: '/blog/business-internet-solutions',
    likes: 178,
    comments: 47,
    readingTime: 7,
  },
];

const categories = ['All', 'Technology', 'Tips & Tricks', 'Guides'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Popular', value: 'popular' },
];

const Blog: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const postsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return 0;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const featuredPosts = posts.filter((post) => post.isFeatured);

  const handleLikeToggle = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
      message.info('You unliked the post');
    } else {
      setLikedPosts((prev) => [...prev, postId]);
      message.success('You liked the post');
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        marginTop: '80px',
        padding: '80px 20px',
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Animated background grid */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '100%' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '50px',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 600 }}>
              <FiZap style={{ display: 'inline', marginRight: 8 }} />
              Tech Insights & News
            </span>
          </motion.div>

          <Title
            level={1}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Blackie Networks Blog
          </Title>
          <Paragraph style={{ color: '#cbd5e1', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
            Stay updated with the latest in network infrastructure, IT solutions, and technology trends
          </Paragraph>
        </motion.div>

        {/* Search, Category & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '60px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <Input
              placeholder="Search blog posts..."
              prefix={<SearchOutlined style={{ color: '#00f0ff' }} />}
              allowClear
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              size="large"
              style={{
                maxWidth: '500px',
                flex: '1',
                minWidth: '250px',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
              className="glass"
            />

            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              size="large"
              className="glass"
              style={{
                minWidth: 180,
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
            >
              {sortOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  Sort by: {option.label}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <Tag
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '8px 20px',
                  fontSize: '0.95rem',
                  borderRadius: '50px',
                  border: selectedCategory === cat 
                    ? '2px solid #00f0ff' 
                    : '1px solid rgba(0, 240, 255, 0.3)',
                  background: selectedCategory === cat
                    ? 'rgba(0, 240, 255, 0.2)'
                    : 'rgba(0, 240, 255, 0.1)',
                  color: selectedCategory === cat ? '#00f0ff' : '#cbd5e1',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                  }
                }}
              >
                {cat}
              </Tag>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '80px', width: '100%' }}
          >
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <Title
                level={2}
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <FireOutlined style={{ marginRight: '12px', color: '#ff006e' }} />
                Featured Posts
              </Title>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {featuredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -10 }}
                  style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(5, 8, 16, 0.95) 0%, transparent 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px',
                        zIndex: 10,
                      }}
                    >
                      <Tag
                        style={{
                          background: 'linear-gradient(135deg, #ff006e 0%, #7c3aed 100%)',
                          border: 'none',
                          color: 'white',
                          fontWeight: 700,
                          marginBottom: '12px',
                        }}
                      >
                        <FireOutlined /> Featured
                      </Tag>
                      <Title
                        level={4}
                        style={{
                          color: '#00f0ff',
                          marginBottom: '8px',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                        }}
                      >
                        {post.title}
                      </Title>
                      <Paragraph
                        style={{
                          color: '#cbd5e1',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          marginBottom: '16px',
                        }}
                      >
                        {post.excerpt}
                      </Paragraph>
                      <a
                        href={post.url}
                        style={{
                          color: '#00f0ff',
                          textDecoration: 'none',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#00ff88';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#00f0ff';
                        }}
                      >
                        Read More <FiArrowRight />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Blog Posts List */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
            <Spin size="large" style={{ color: '#00f0ff' }} />
          </div>
        ) : currentPosts.length === 0 ? (
          <Empty
            description={<span style={{ color: '#cbd5e1' }}>No blog posts found.</span>}
            style={{ padding: '80px 20px' }}
          />
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
              {currentPosts.map((post, idx) => {
                const isLiked = likedPosts.includes(post.id);

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -10 }}
                  >
                    <Card
                      className="glass"
                      hoverable
                      style={{
                        height: '100%',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        background: 'rgba(10, 14, 39, 0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      bodyStyle={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          width="400"
                          height="240"
                          loading="lazy"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                          }}
                        >
                          {post.tags.slice(0, 2).map((tag) => (
                            <Tag
                              key={tag}
                              style={{
                                background: 'rgba(0, 240, 255, 0.2)',
                                border: '1px solid rgba(0, 240, 255, 0.4)',
                                color: '#00f0ff',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setSelectedCategory(tag);
                                setCurrentPage(1);
                                setSearchTerm('');
                              }}
                            >
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      </div>

                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Title
                          level={4}
                          style={{
                            color: '#00f0ff',
                            marginBottom: '12px',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            lineHeight: 1.4,
                          }}
                        >
                          {post.title}
                        </Title>
                        <Paragraph
                          style={{
                            color: '#cbd5e1',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            marginBottom: '20px',
                            flex: 1,
                          }}
                        >
                          {post.excerpt}
                        </Paragraph>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid rgba(0, 240, 255, 0.2)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '2px solid rgba(0, 240, 255, 0.3)',
                              }}
                              loading="lazy"
                            />
                            <div>
                              <div style={{ color: '#00f0ff', fontSize: '0.875rem', fontWeight: 600 }}>
                                {post.author.name}
                              </div>
                              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                                {new Date(post.date).toLocaleDateString()} • {post.readingTime} min
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
                              <button
                                onClick={() => handleLikeToggle(post.id)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: isLiked ? '#ff006e' : '#94a3b8',
                                  fontSize: '18px',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (!isLiked) {
                                    e.currentTarget.style.color = '#ff006e';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isLiked) {
                                    e.currentTarget.style.color = '#94a3b8';
                                  }
                                }}
                              >
                                {isLiked ? <HeartFilled /> : <HeartOutlined />}
                              </button>
                            </Tooltip>
                            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                              {post.likes}
                            </span>
                            <Tooltip title="Comments">
                              <span style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CommentOutlined /> {post.comments}
                              </span>
                            </Tooltip>
                          </div>
                        </div>

                        <a
                          href={post.url}
                          style={{
                            color: '#00f0ff',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#00ff88';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#00f0ff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          Read More <FiArrowRight />
                        </a>
                      </div>
                    </Card>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Pagination */}
        {sortedPosts.length > postsPerPage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
            <Pagination
              current={currentPage}
              pageSize={postsPerPage}
              total={sortedPosts.length}
              onChange={onPageChange}
              showSizeChanger={false}
              responsive
              showQuickJumper
              style={{
                color: '#e2e8f0',
              }}
              itemRender={(page, type, originalElement) => {
                if (type === 'page') {
                  return (
                    <span
                      style={{
                        color: page === currentPage ? '#00f0ff' : '#cbd5e1',
                        background: page === currentPage ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                        border: page === currentPage ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(0, 240, 255, 0.2)',
                        borderRadius: '8px',
                        padding: '4px 12px',
                      }}
                    >
                      {page}
                    </span>
                  );
                }
                return originalElement;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

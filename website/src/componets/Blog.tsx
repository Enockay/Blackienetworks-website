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
  Switch,
} from 'antd';
import {
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  CommentOutlined,
} from '@ant-design/icons';

const { Option } = Select;

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
  readingTime: number; // in minutes
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
      name: 'John Doe',
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
      'Learn simple tips and tricks to improve your home Wi-Fi experience using Blackie Networks’ solutions and troubleshoot common issues.',
    category: 'Tips & Tricks',
    tags: ['Wi-Fi', 'Router', 'Home Network'],
    thumbnail: 'https://source.unsplash.com/featured/?wifi,router',
    date: '2025-05-10',
    author: {
      name: 'Jane Smith',
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
      'Internet bundles can be confusing. Here’s a straightforward guide to choosing the right one for you, balancing cost, speed, and data limits.',
    category: 'Guides',
    tags: ['Internet', 'Bundles', 'Guides'],
    thumbnail: 'https://source.unsplash.com/featured/?internet,bundles',
    date: '2025-04-28',
    author: {
      name: 'Emily Carter',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Content writer with expertise in telecom industry trends.',
    },
    url: '/blog/internet-bundles-guide',
    likes: 128,
    comments: 27,
    readingTime: 5,
  },
  // Add more posts...
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
  const [darkMode, setDarkMode] = useState(false);

  const postsPerPage = 3;

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1200);
  }, []);

  // Filter posts based on search & category
  const filteredPosts = posts.filter((post) => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Sort posts
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

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Separate featured posts
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
      className={`max-w-7xl mx-auto px-6 py-16 min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-extrabold">Blackie Networks Blog</h1>

        <Switch
          checkedChildren="🌙 Dark"
          unCheckedChildren="☀️ Light"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      {/* Search, Category & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <Input
          placeholder="Search blog posts..."
          prefix={<SearchOutlined />}
          allowClear
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          size="large"
          className="max-w-md shadow-md"
          bordered={false}
          style={{ backgroundColor: darkMode ? '#1f2937' : '#fff' }}
        />

        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => (
            <Tag
              key={cat}
              color={selectedCategory === cat ? 'blue' : darkMode ? 'default' : undefined}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`cursor-pointer select-none px-4 py-2 text-base ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } rounded-lg`}
            >
              {cat}
            </Tag>
          ))}
        </div>

        <Select
          defaultValue="newest"
          onChange={(value) => setSortBy(value)}
          style={{ minWidth: 160 }}
          size="large"
          bordered={false}
          className={`shadow-md rounded-lg ${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
          }`}
        >
          {sortOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              Sort by: {option.label}
            </Option>
          ))}
        </Select>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section
          aria-label="Featured blog posts"
          className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className={`relative group rounded-lg overflow-hidden shadow-2xl hover:shadow-4xl transition-shadow duration-300 cursor-pointer ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <Tag color="gold" className="mb-2">
                  Featured
                </Tag>
                <h3 className="text-2xl font-bold">{post.title}</h3>
                <p className="line-clamp-2 mt-1 text-sm">{post.excerpt}</p>
                <a
                  href={post.url}
                  className="inline-block mt-3 font-semibold underline hover:text-yellow-400"
                >
                  Read More &rarr;
                </a>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Blog Posts List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : currentPosts.length === 0 ? (
        <Empty
          description="No blog posts found."
          className="py-20"
          image={darkMode ? Empty.PRESENTED_IMAGE_SIMPLE : undefined}
        />
      ) : (
        <section
          aria-label="Blog posts list"
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {currentPosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);

            return (
              <article
                key={post.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.03]`}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <Tag
                          key={tag}
                          color="blue"
                          className={`text-sm cursor-pointer`}
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

                    <h2
                      className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100"
                      tabIndex={0}
                    >
                      {post.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                        loading="lazy"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {post.author.name}
                        </span>
                        <span className="text-xs italic line-clamp-1">
                          {post.author.bio}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <time dateTime={post.date} title={new Date(post.date).toLocaleString()}>
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                      <span>{post.readingTime} min read</span>
                      <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
                        <button
                          onClick={() => handleLikeToggle(post.id)}
                          aria-pressed={isLiked}
                          aria-label={`${isLiked ? 'Unlike' : 'Like'} post titled ${post.title}`}
                          className={`text-xl focus:outline-none ${
                            isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          {isLiked ? <HeartFilled /> : <HeartOutlined />}
                        </button>
                      </Tooltip>
                      <Tooltip title="Comments">
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <CommentOutlined />
                          {post.comments}
                        </span>
                      </Tooltip>
                      <Tooltip title="Share">
                        <button
                          onClick={() =>
                            message.info('Sharing functionality coming soon!')
                          }
                          className="text-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 focus:outline-none"
                          aria-label={`Share post titled ${post.title}`}
                        >
                          <ShareAltOutlined />
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <a
                    href={post.url}
                    className="mt-5 inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More &rarr;
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* Pagination */}
      {sortedPosts.length > postsPerPage && (
        <div className="flex justify-center mt-12">
          <Pagination
            current={currentPage}
            pageSize={postsPerPage}
            total={sortedPosts.length}
            onChange={onPageChange}
            showSizeChanger={false}
            responsive
            showQuickJumper
            className={darkMode ? 'ant-pagination-dark' : ''}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;

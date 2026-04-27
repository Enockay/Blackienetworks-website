import React, { useState, useEffect } from 'react';
import { Select, Pagination, message } from 'antd';
import { SEO } from './SEO';
import { motion } from 'framer-motion';
import {
  FiZap, FiArrowRight, FiSearch, FiHeart, FiMessageSquare,
  FiClock, FiCalendar, FiTrendingUp, FiBookOpen,
} from 'react-icons/fi';

import fw      from '../assets/FireWall.jpg';
import cloud   from '../assets/on-premise-vs-cloud.jpg';
import signs   from '../assets/5-Critical-Signs.jpg';
import net1    from '../assets/networking1.jpg';
import net2    from '../assets/networking2.jpg';
import net3    from '../assets/networking3.jpg';
import sw1     from '../assets/softwareCompany1.jpeg';
import sw2     from '../assets/softwareCompany2.jpg';
import sw3     from '../assets/softwareCompany3.jpg';
import bg      from '../assets/background.jpg';
import enockP  from '../assets/enock.jpeg';
import piusP   from '../assets/pius.png';
import timP    from '../assets/timothy .jpg';
import larryP  from '../assets/larry.jpg';

/* ── types ── */
interface Post {
  id:          number;
  title:       string;
  excerpt:     string;
  category:    string;
  tags:        string[];
  image:       string;
  date:        string;
  author:      { name: string; avatar: string };
  url:         string;
  likes:       number;
  comments:    number;
  readMin:     number;
  featured?:   boolean;
}

const posts: Post[] = [
  { id: 1,  title: 'The Future of Internet Connectivity in Kenya',          excerpt: 'How Blackie Networks is revolutionising affordable, reliable internet services across campuses and towns with innovative infrastructure.',                           category: 'Technology',    tags: ['Internet', 'Kenya'],        image: net1, date: '2025-05-20', author: { name: 'Enock Mwema',   avatar: enockP }, url: '/blog/future-internet-kenya',         likes: 152, comments: 32, readMin: 6, featured: true  },
  { id: 2,  title: '5G Technology: What It Means for East Africa',          excerpt: 'The potential of 5G networks in transforming digital infrastructure across East Africa — and how businesses can prepare for the leap.',                               category: 'Technology',    tags: ['5G', 'East Africa'],        image: net2, date: '2025-04-15', author: { name: 'Timothy Kuria', avatar: timP   }, url: '/blog/5g-east-africa',                likes: 203, comments: 45, readMin: 7, featured: true  },
  { id: 3,  title: 'On-Premise vs Cloud: Choosing for Your Organisation',   excerpt: "A practical breakdown of when to keep infrastructure in-house versus moving to cloud — with cost, control and compliance considerations for Kenyan businesses.",     category: 'Guides',        tags: ['Cloud', 'Infrastructure'],  image: cloud, date: '2025-04-28', author: { name: 'Pius Musomi',   avatar: piusP  }, url: '/blog/on-premise-vs-cloud',           likes: 128, comments: 27, readMin: 8  },
  { id: 4,  title: 'Securing Your Network: 5 Critical Signs You Are at Risk', excerpt: 'Indicators that your network has security gaps — and practical steps to harden firewalls, segment VLANs, and lock down remote access.',                           category: 'Tips & Tricks', tags: ['Security', 'Firewall'],     image: signs, date: '2025-04-05', author: { name: 'Enock Mwema',   avatar: enockP }, url: '/blog/network-security-signs',        likes: 156, comments: 38, readMin: 6  },
  { id: 5,  title: 'MikroTik QoS: Bandwidth Management for Campus Networks', excerpt: 'Step-by-step guide to configuring Quality of Service on MikroTik routers so high-priority traffic always gets the bandwidth it needs.',                             category: 'Guides',        tags: ['MikroTik', 'QoS'],          image: net3, date: '2025-03-18', author: { name: 'Timothy Kuria', avatar: timP   }, url: '/blog/mikrotik-qos-guide',            likes: 142, comments: 29, readMin: 7  },
  { id: 6,  title: 'Building a Campus Wi-Fi Network: End-to-End Walkthrough', excerpt: 'From site survey and structured cabling to hotspot setup and billing integration — a complete guide to deploying campus-grade Wi-Fi.',                             category: 'Guides',        tags: ['Wi-Fi', 'Campus'],          image: fw,   date: '2025-03-02', author: { name: 'Timothy Kuria', avatar: timP   }, url: '/blog/campus-wifi-walkthrough',       likes: 167, comments: 41, readMin: 10 },
  { id: 7,  title: 'AI Tools for Small Businesses in Kenya',                 excerpt: 'Practical AI assistants and automations that Kenyan SMEs can deploy today — from WhatsApp chatbots to automated reporting dashboards.',                               category: 'Technology',    tags: ['AI', 'SME'],                image: sw1,  date: '2025-02-22', author: { name: 'Pius Musomi',   avatar: piusP  }, url: '/blog/ai-tools-kenyan-smes',          likes: 134, comments: 33, readMin: 5  },
  { id: 8,  title: 'Remote Work: Internet Setup for Maximum Productivity',   excerpt: 'The connection speeds, VPN setup and backup options that remote teams in Kenya need to stay productive — even on unreliable links.',                                  category: 'Tips & Tricks', tags: ['Remote Work', 'VPN'],       image: sw2,  date: '2025-02-15', author: { name: 'Larry',          avatar: larryP }, url: '/blog/remote-work-setup',             likes: 111, comments: 26, readMin: 5  },
  { id: 9,  title: 'ISP Billing Systems: Features That Actually Matter',     excerpt: 'What to look for in an ISP billing platform — from Radius integration and voucher management to automated reconciliation and customer self-service.',                  category: 'Guides',        tags: ['Billing', 'ISP'],           image: sw3,  date: '2025-02-08', author: { name: 'Enock Mwema',   avatar: enockP }, url: '/blog/isp-billing-features',          likes: 178, comments: 47, readMin: 6  },
  { id: 10, title: 'Fibre vs Wireless: Which Is Right for Your Business?',   excerpt: 'Comparing fibre optic and wireless internet for Kenyan businesses — costs, reliability, scalability and when each makes sense.',                                     category: 'Guides',        tags: ['Fibre', 'Wireless'],        image: bg,   date: '2025-01-25', author: { name: 'Timothy Kuria', avatar: timP   }, url: '/blog/fibre-vs-wireless',             likes: 142, comments: 29, readMin: 6  },
  { id: 11, title: 'Cloud Hosting: AWS vs DigitalOcean for Kenyan Startups', excerpt: 'A cost and performance comparison of the two most popular cloud platforms for Kenyan developers — with advice on picking the right region.',                        category: 'Technology',    tags: ['AWS', 'Cloud'],             image: net1, date: '2025-01-10', author: { name: 'Pius Musomi',   avatar: piusP  }, url: '/blog/aws-vs-digitalocean-kenya',    likes: 189, comments: 52, readMin: 7  },
  { id: 12, title: 'Firewall Best Practices for Kenyan Businesses',          excerpt: 'Practical firewall configuration advice — port filtering, intrusion detection, zone-based policies and monitoring that stops real threats.',                           category: 'Tips & Tricks', tags: ['Firewall', 'Security'],     image: fw,   date: '2024-12-18', author: { name: 'Enock Mwema',   avatar: enockP }, url: '/blog/firewall-best-practices',       likes: 98,  comments: 21, readMin: 5  },
];

const CATS = ['All', 'Technology', 'Tips & Tricks', 'Guides'];
const SORTS = [{ label: 'Newest',        value: 'newest'  },
               { label: 'Most Popular',  value: 'popular' },
               { label: 'Oldest',        value: 'oldest'  }];
const PER_PAGE = 6;

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });

const catColor: Record<string, { bg: string; color: string }> = {
  'Technology':    { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  'Tips & Tricks': { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
  'Guides':        { bg: 'rgba(139,92,246,0.1)',  color: '#8b5cf6' },
};

/* ── component ── */
const Blog: React.FC = () => {
  const [search,    setSearch]    = useState('');
  const [cat,       setCat]       = useState('All');
  const [sort,      setSort]      = useState('newest');
  const [page,      setPage]      = useState(1);
  const [liked,     setLiked]     = useState<number[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = posts
    .filter(p => (cat === 'All' || p.category === cat) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
       p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
       p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))))
    .sort((a, b) => sort === 'newest'  ? new Date(b.date).getTime() - new Date(a.date).getTime()
                  : sort === 'oldest'  ? new Date(a.date).getTime() - new Date(b.date).getTime()
                  : b.likes - a.likes);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featured  = posts.filter(p => p.featured);

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    message.success(liked.includes(id) ? 'Removed like' : 'Post liked!');
  };

  return (
    <>
      <SEO
        title="IT Blog — Network, Cloud, Security & Software Tips for Kenya | Blackie Networks"
        description="Expert IT articles and guides for Kenyan businesses: network security, MikroTik setup, cloud infrastructure, campus Wi-Fi best practices, software development tips and more."
        keywords="IT blog Kenya, network security Kenya, MikroTik tips Kenya, cloud infrastructure Kenya, software development Kenya, campus WiFi guide, IT tips Kenya, Blackie Networks blog"
        url="/blog"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]}
      />
      {/* ════ DARK HERO BAND ════ */}
      <div style={{
        background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 55%, #0f1e38 100%)',
        paddingTop: 120, paddingBottom: 72, paddingLeft: 24, paddingRight: 24,
        borderBottom: '1px solid rgba(59,130,246,0.12)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #2563eb 30%, #3b82f6 50%, #2563eb 70%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="section-eyebrow" style={{ margin: '0 auto 24px', display: 'inline-flex' }}>
            <FiZap size={11} /> Tech Insights & Guides · Blackie Networks
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: '#f1f5f9' }}>
            The{' '}
            <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Blackie Networks
            </span>
            {' '}Blog
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 36px' }}>
            Network infrastructure, cloud, software and IT guides — written by the engineers who build real systems in Kenya.
          </motion.p>

          {/* stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: '8px 32px', justifyContent: 'center', flexWrap: 'wrap', fontSize: 13 }}>
            {[['12', 'Articles'], ['4', 'Engineers', ], ['3', 'Categories']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>{n}</div>
                <div style={{ color: '#64748b', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════ SEARCH + FILTER BAR ════ */}
      <div style={{ background: '#0c1a30', borderBottom: '1px solid rgba(59,130,246,0.12)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          {/* search */}
          <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 400 }}>
            <FiSearch size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              placeholder="Search articles..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{
                width: '100%', paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, color: '#e2e8f0', fontSize: 14, outline: 'none',
              }}
            />
          </div>

          {/* category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button key={c}
                onClick={() => { setCat(c); setPage(1); }}
                style={{
                  padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  border: cat === c ? '1.5px solid rgba(59,130,246,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  background: cat === c ? 'rgba(37,99,235,0.18)' : 'transparent',
                  color: cat === c ? '#60a5fa' : '#94a3b8',
                  transition: 'all 0.2s',
                }}
              >{c}</button>
            ))}
          </div>

          {/* sort */}
          <Select value={sort} onChange={v => { setSort(v); setPage(1); }} size="small"
            options={SORTS} style={{ width: 160 }} />
        </div>
      </div>

      {/* ════ FEATURED POSTS ════ */}
      {featured.length > 0 && cat === 'All' && !search && (
        <div style={{ background: 'var(--bg-surface)', padding: '64px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex' }}><FiTrendingUp size={11} /> Featured</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
              {featured.map((p, i) => (
                <motion.a key={p.id} href={p.url}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ textDecoration: 'none', borderRadius: 16, overflow: 'hidden', display: 'block', position: 'relative' }}
                >
                  <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,13,30,0.92) 0%, rgba(6,13,30,0.2) 55%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: 'rgba(249,115,22,0.9)', color: '#fff' }}>Featured</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.4)', color: '#94a3b8' }}>{p.category}</span>
                      </div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h2>
                      <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 12 }}>{p.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={p.author.avatar} alt={p.author.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(59,130,246,0.4)' }} />
                        <span style={{ fontSize: 12, color: '#64748b' }}>{p.author.name}</span>
                        <span style={{ fontSize: 12, color: '#475569', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <FiClock size={11} /> {p.readMin} min
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════ ALL POSTS GRID ════ */}
      <div style={{ background: 'var(--bg-base)', padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex' }}><FiBookOpen size={11} /> All Articles</div>
            <span style={{ fontSize: 13, color: '#94a3b8', marginLeft: 4 }}>{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}</span>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(37,99,235,0.2)', borderTop: '3px solid #3b82f6', animation: 'spin 0.8s linear infinite' }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : paginated.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
              <FiSearch size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: '1rem' }}>No articles match your search.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {paginated.map((p, i) => {
                const isLiked = liked.includes(p.id);
                const cc = catColor[p.category] ?? { bg: 'rgba(37,99,235,0.1)', color: '#3b82f6' };
                return (
                  <motion.article key={p.id}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="card-dark" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                  >
                    {/* image */}
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#0a1628' }}>
                      <img src={p.image} alt={p.title} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                      <div style={{ position: 'absolute', top: 12, left: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: cc.bg, color: cc.color, border: `1px solid ${cc.color}30` }}>
                          {p.category}
                        </span>
                      </div>
                    </div>

                    {/* body */}
                    <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                        {p.tags.slice(0, 2).map(t => (
                          <span key={t} className="tag tag-blue" style={{ fontSize: 10 }}>{t}</span>
                        ))}
                      </div>

                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 8 }}>{p.title}</h3>
                      <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>{p.excerpt}</p>

                      {/* meta */}
                      <div style={{ borderTop: '1px solid rgba(37,99,235,0.08)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={p.author.avatar} alt={p.author.name} loading="lazy"
                          style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1.5px solid rgba(37,99,235,0.2)' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.author.name}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><FiCalendar size={10} />{fmtDate(p.date)}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><FiClock size={10} />{p.readMin} min</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
                          <button onClick={() => toggleLike(p.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: isLiked ? '#ef4444' : '#94a3b8', transition: 'color 0.2s' }}>
                            <FiHeart size={13} style={{ fill: isLiked ? '#ef4444' : 'none', stroke: isLiked ? '#ef4444' : '#94a3b8' }} />
                            {p.likes + (isLiked ? 1 : 0)}
                          </button>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8' }}>
                            <FiMessageSquare size={12} />{p.comments}
                          </span>
                        </div>
                      </div>

                      <a href={p.url} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 13, fontWeight: 600, color: '#2563eb', textDecoration: 'none', transition: 'gap 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px'; }}>
                        Read article <FiArrowRight size={13} />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* pagination */}
          {filtered.length > PER_PAGE && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 52 }}>
              <Pagination
                current={page} pageSize={PER_PAGE} total={filtered.length}
                onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                showSizeChanger={false} showQuickJumper responsive
              />
            </div>
          )}
        </div>
      </div>

      {/* ════ CTA BAND ════ */}
      <div style={{ background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 100%)', padding: '64px 24px', borderTop: '1px solid rgba(59,130,246,0.12)', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 16 }}><FiZap size={11} /> Need IT advice?</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Talk to an engineer directly
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 28 }}>
            Skip the blog and get a free 30-minute IT audit tailored to your specific setup.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contactus" className="btn-cta" style={{ height: 46, padding: '0 28px', fontSize: 14 }}>
              Book Free Audit <FiArrowRight size={14} />
            </a>
            <a href="https://wa.me/254796869402" target="_blank" rel="noreferrer"
              style={{ height: 46, padding: '0 22px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              💬 WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;

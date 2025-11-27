import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { products } from './ProductsPage';
import { SEO } from './SEO';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div
        style={{
          minHeight: '100vh',
          padding: '120px 20px 80px',
          background:
            'linear-gradient(135deg, rgba(5, 8, 16, 0.96) 0%, rgba(10, 14, 39, 0.96) 100%)',
        }}
      >
        <div
          className="max-w-4xl mx-auto"
          style={{ textAlign: 'center', color: '#e5e7eb' }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Product not found</h1>
          <p style={{ marginBottom: 24, color: '#9ca3af' }}>
            The product you are looking for may have moved or no longer exists.
          </p>
          <Link
            to="/Products"
            style={{
              color: '#00f0ff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Back to all products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuote = () => {
    navigate('/booking', { state: { selectedService: product.title } });
  };

  return (
    <>
      <SEO
        title={`${product.title} – Blackie Networks Product`}
        description={product.description}
        url={`/Products/${product.slug}`}
      />
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          padding: '110px 20px 80px',
          background:
            'linear-gradient(135deg, rgba(5, 8, 16, 0.96) 0%, rgba(10, 14, 39, 0.96) 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 10% 10%, rgba(0, 240, 255, 0.14) 0%, transparent 55%),
              radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.16) 0%, transparent 55%)
            `,
            pointerEvents: 'none',
          }}
        />

        <div
          className="max-w-6xl mx-auto"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(148, 163, 184, 0.6)',
              background: 'rgba(15, 23, 42, 0.85)',
              color: '#e5e7eb',
              fontSize: 13,
              marginBottom: 26,
              cursor: 'pointer',
            }}
          >
            <FiArrowLeft size={16} />
            Back
          </button>

          <div
            style={{
              display: 'grid',
              gap: 32,
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              alignItems: 'center',
            }}
          >
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                style={{
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#7dd3fc',
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Blackie Networks product
              </p>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.7rem)',
                  fontWeight: 900,
                  marginBottom: 10,
                  background:
                    'linear-gradient(135deg, #00f0ff 0%, #0066ff 40%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {product.title}
              </h1>
              <p
                style={{
                  color: '#7dd3fc',
                  fontSize: '0.98rem',
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {product.tagline}
              </p>
              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '0.98rem',
                  lineHeight: 1.8,
                  marginBottom: 22,
                }}
              >
                {product.description}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.1fr)',
                  gap: 8,
                  marginBottom: 22,
                }}
              >
                {product.highlights.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '8px 0',
                    }}
                  >
                    <FiCheckCircle
                      size={18}
                      color="#22c55e"
                      style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#e5e7eb',
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleQuote}
                  style={{
                    padding: '12px 26px',
                    borderRadius: 999,
                    border: 'none',
                    background:
                      'linear-gradient(135deg, #00f0ff 0%, #0066ff 45%, #7c3aed 100%)',
                    color: '#020617',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 14px 40px rgba(56, 189, 248, 0.6)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  Ask for Quote
                  <FiArrowRight size={18} />
                </motion.button>

                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#9ca3af',
                  }}
                >
                  No commitment – we respond with a tailored proposal.
                </span>
              </div>
            </motion.div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                boxShadow: '0 22px 60px rgba(15, 23, 42, 0.9)',
              }}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9) contrast(1.05)',
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8 }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 0% 0%, rgba(15, 23, 42, 0.4), transparent 55%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 18,
                  left: 18,
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: 'rgba(15, 23, 42, 0.92)',
                  border: '1px solid rgba(148, 163, 184, 0.7)',
                  color: '#e5e7eb',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background:
                      'radial-gradient(circle at 30% 0%, #22c55e, #16a34a)',
                    boxShadow: '0 0 12px rgba(34, 197, 94, 0.9)',
                  }}
                />
                In production with clients
              </div>
            </motion.div>
          </div>

          {/* Link back to all products */}
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <Link
              to="/Products"
              style={{
                color: '#a5b4fc',
                fontSize: '0.86rem',
                textDecoration: 'none',
              }}
            >
              ← View all products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;



import React, { useState } from 'react';
import { 
  Coffee, 
  UtensilsCrossed, 
  Cake, 
  Sun, 
  IceCream, 
  Soup, 
  Check, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Clock,
  Calendar
} from 'lucide-react';
import { GENUSS_CATEGORIES, CAFE_INFO } from '../data/cafeData';
import { GenussCategory } from '../types';

export const GenussLounge: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeGallerySrc, setActiveGallerySrc] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const activeCategory: GenussCategory = GENUSS_CATEGORIES[activeIndex];

  const handleSelectCategory = (index: number) => {
    if (index === activeIndex) return;
    setIsAnimating(true);
    setActiveGallerySrc(null); // Reset custom gallery image
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 180);
  };

  const handleStep = (direction: number) => {
    let next = activeIndex + direction;
    if (next < 0) next = GENUSS_CATEGORIES.length - 1;
    if (next >= GENUSS_CATEGORIES.length) next = 0;
    handleSelectCategory(next);
  };

  // Helper to render dynamic Lucide icon
  const renderCategoryIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'coffee':
        return <Coffee size={size} />;
      case 'sandwich':
        return <UtensilsCrossed size={size} />;
      case 'cake':
        return <Cake size={size} />;
      case 'sun':
        return <Sun size={size} />;
      case 'iceCream':
        return <IceCream size={size} />;
      case 'soup':
        return <Soup size={size} />;
      default:
        return <Sparkles size={size} />;
    }
  };

  const displayImageSrc = activeGallerySrc || activeCategory.image;

  return (
    <section id="genuss" className="genuss-section">
      <div className="container">
        
        {/* Section Intro Header */}
        <div className="section-header-center">
          <h2 className="section-title-large">
            Unser <span className="gold-gradient-text">Genussangebot</span> für Sie
          </h2>

          <p className="section-subtitle-text">
            Von handgerösteten Kaffeespezialitäten und traditionellen Chlebíčky bis hin zu meisterhafter böhmischer Backkunst, unwiderstehlichem Eis und herzhaftem Mittagstisch.
          </p>
        </div>

        {/* 1. Floating Category Dock */}
        <nav className="genuss-dock-nav" aria-label="Genussspezialitäten Kategorien">
          {GENUSS_CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(idx)}
                className={`genuss-dock-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                <span className="dock-btn-icon">{renderCategoryIcon(cat.iconName, 16)}</span>
                <span className="dock-btn-label">{cat.label}</span>
                {isActive && <span className="dock-btn-dot" />}
              </button>
            );
          })}
        </nav>

        {/* 2. Central Cinematic Stage */}
        <div className="genuss-cinematic-stage">
          
          {/* Media Column (Left) */}
          <div className="stage-media-col">
            
            {/* 1. Dedicated Unobstructed Photo Viewport */}
            <div className="stage-photo-frame">
              <div className={`stage-img-wrapper ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <img
                  key={displayImageSrc}
                  src={displayImageSrc}
                  alt={activeCategory.galleryImages?.find(g => g.src === displayImageSrc)?.label || activeCategory.title}
                  className="stage-main-img"
                  onError={(e) => {
                    // Fallback for asset paths if needed
                    const target = e.currentTarget;
                    if (target.src.includes('/images/index/')) {
                      target.src = target.src.replace('/images/index/', '/index/');
                    }
                  }}
                />
              </div>
            </div>

            {/* Mini Gallery fotoleiste for Categories with multiple photos */}
            {activeCategory.galleryImages && activeCategory.galleryImages.length > 0 && (
              <div className="stage-gallery-bar">
                <div className="gallery-bar-header">
                  <span className="gallery-bar-label">
                    {activeCategory.galleryLabel || 'Spezialitäten entdecken:'}
                  </span>
                  {displayImageSrc && (
                    <span className="gallery-active-caption">
                      {activeCategory.galleryImages.find(g => g.src === displayImageSrc)?.label || ''}
                    </span>
                  )}
                </div>
                <div className="gallery-thumb-row">
                  {activeCategory.galleryImages.map((gItem, gIdx) => {
                    const isSelected = displayImageSrc === gItem.src;
                    return (
                      <button
                        key={gIdx}
                        onClick={() => setActiveGallerySrc(gItem.src)}
                        className={`gallery-thumb-btn ${isSelected ? 'active' : ''}`}
                        title={gItem.label}
                        aria-label={gItem.label}
                      >
                        <img 
                          src={gItem.src} 
                          alt={gItem.label} 
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.includes('/images/index/')) {
                              target.src = target.src.replace('/images/index/', '/index/');
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Tags */}
            <div className="stage-tags-bottom">
              {activeCategory.tags.slice(0, 4).map((tag, tIdx) => (
                <span key={tIdx} className="stage-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Column (Right) */}
          <div className="stage-content-col">
            <div className={`stage-copy-wrapper ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              
              {/* Category Step Indicator */}
              <div className="stage-eyebrow-row">
                <span className="stage-eyebrow-text">{activeCategory.eyebrow}</span>
                <div className="stage-dots-stepper">
                  {GENUSS_CATEGORIES.map((_, dotIdx) => (
                    <span 
                      key={dotIdx} 
                      className={`step-dot ${dotIdx === activeIndex ? 'active' : ''}`} 
                      onClick={() => handleSelectCategory(dotIdx)}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h3 className="stage-heading">
                {activeCategory.title}
              </h3>

              {/* Description */}
              <p className="stage-description">
                {activeCategory.desc}
              </p>

              {/* Signature Quote Callout */}
              {activeCategory.quote && (
                <div className="stage-quote-callout">
                  <div className="quote-callout-text">{activeCategory.quote}</div>
                </div>
              )}

              {/* Feature Checklist */}
              <div className="stage-features-list">
                {activeCategory.features.map((feat, fIdx) => (
                  <div key={fIdx} className="stage-feature-item">
                    <div className="feature-check-icon">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Special Time or Season Notice Badge */}
              {activeCategory.specialNotice && (
                <div className={`stage-notice-box ${activeCategory.specialNotice.type === 'alert' ? 'notice-alert' : 'notice-gold'}`}>
                  {activeCategory.specialNotice.type === 'alert' ? (
                    <Calendar size={16} className="notice-icon" />
                  ) : (
                    <Clock size={16} className="notice-icon" />
                  )}
                  <span>{activeCategory.specialNotice.text}</span>
                </div>
              )}

            </div>

            {/* Bottom Actions Row */}
            <div className="stage-actions-row">
              <div className="stage-actions-left">
                <a 
                  href={`tel:${CAFE_INFO.contact.phone}`} 
                  className="btn-primary stage-cta-btn"
                  title="Tisch telefonisch anfragen"
                >
                  <Phone size={15} />
                  <span>Tisch anfragen: {CAFE_INFO.contact.phoneDisplay}</span>
                </a>
              </div>

              {/* Stepper Arrow Navigation */}
              <div className="stage-nav-arrows">
                <button 
                  onClick={() => handleStep(-1)} 
                  className="stage-arrow-btn" 
                  aria-label="Vorherige Genusskategorie"
                  title="Vorherige Spezialität"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="stage-counter">
                  {activeIndex + 1} / {GENUSS_CATEGORIES.length}
                </span>
                <button 
                  onClick={() => handleStep(1)} 
                  className="stage-arrow-btn" 
                  aria-label="Nächste Genusskategorie"
                  title="Nächste Spezialität"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import { useMemo } from 'react';
import type { Slide } from '@/lib/types/slides';
import { useSlideBackgroundStyle } from '@/lib/hooks/use-slide-background-style';
import { ThumbnailElement } from './ThumbnailElement';

interface ThumbnailSlideProps {
  /** Slide data */
  readonly slide: Slide;
  /** Thumbnail width */
  readonly size: number;
  /** Viewport width base (default 1000px) */
  readonly viewportSize: number;
  /** Viewport aspect ratio (default 0.5625 i.e. 16:9) */
  readonly viewportRatio: number;
  /** Whether visible (for lazy loading optimization) */
  readonly visible?: boolean;
}

/**
 * Thumbnail slide component
 *
 * Renders a thumbnail preview of a single slide
 * Uses CSS transform scale to resize the entire view for better performance
 */
export function ThumbnailSlide({
  slide,
  size,
  viewportSize = 1000,
  viewportRatio = 0.5625,
  visible = true,
}: ThumbnailSlideProps) {
  // Get background style
  const { backgroundStyle } = useSlideBackgroundStyle(slide.background);

  if (!visible) {
    return (
      <div className="thumbnail-slide bg-white overflow-hidden select-none w-full h-full flex items-center justify-center relative">
        <div className="placeholder text-gray-400 text-sm">Loading... ...</div>
      </div>
    );
  }

  // We use direct scale transform based on provided size prop to ensure wide compatibility.
  return (
    <div
      className="thumbnail-slide bg-white overflow-hidden select-none relative"
      style={{
        width: `${size}px`,
        height: `${size * viewportRatio}px`,
      }}
    >
      <div
        className="elements origin-top-left absolute inset-0"
        style={{
          width: `${viewportSize}px`,
          height: `${viewportSize * viewportRatio}px`,
          transform: `scale(${size / viewportSize})`,
        }}
      >
        {/* Background */}
        <div className="background w-full h-full bg-center absolute" style={backgroundStyle} />

        {/* Render all elements */}
        {slide.elements.map((element, index) => (
          <ThumbnailElement key={element.id} elementInfo={element} elementIndex={index + 1} />
        ))}
      </div>
    </div>
  );
}

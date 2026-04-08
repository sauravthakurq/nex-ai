import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn('flex items-center justify-center max-w-full', className)}>
      <img
        src="/logo-hh.png"
        alt="Synapse AI Logo"
        width={500}
        height={130}
        className={cn(
          'object-contain transition-transform duration-300 ease-in-out hover:scale-[1.02]',
          compact
            ? 'w-[160px] h-auto sm:w-[200px] object-contain'
            : 'w-[280px] sm:w-[360px] md:w-[480px] lg:w-[500px] h-auto max-w-full object-contain',
        )}
        fetchPriority="high"
      />
    </div>
  );
}

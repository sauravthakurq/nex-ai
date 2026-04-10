'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

const Popover = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  const { open, onOpenChange } = props;

  React.useEffect(() => {
    if (!open) return;

    let isPopping = false;
    const handlePopState = (e: PopStateEvent) => {
      isPopping = true;
      e.preventDefault();
      onOpenChange?.(false);
    };

    window.history.pushState({ popoverOpen: true }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (!isPopping && window.history.state?.popoverOpen) {
        window.history.back();
      }
    };
  }, [open, onOpenChange]);

  return <PopoverPrimitive.Root {...props} />;
};

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={16}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

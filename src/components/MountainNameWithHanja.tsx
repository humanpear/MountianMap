import { getMountainHanja } from '../data/mountainHanja';
import { cn } from '../lib/classNames';
import type { Mountain } from '../types';

type MountainNameWithHanjaProps = {
  mountain: Mountain;
  className?: string;
  nameClassName?: string;
  hanjaClassName?: string;
};

export function MountainNameWithHanja({
  mountain,
  className,
  nameClassName,
  hanjaClassName
}: MountainNameWithHanjaProps) {
  const hanjaName = getMountainHanja(mountain.id);

  return (
    <span className={cn('inline-flex min-w-0 items-baseline gap-[0.24em]', className)}>
      <span className={cn('min-w-0', nameClassName)}>{mountain.name}</span>
      {hanjaName ? <span className={cn('shrink-0 font-black', hanjaClassName)}>{hanjaName}</span> : null}
    </span>
  );
}

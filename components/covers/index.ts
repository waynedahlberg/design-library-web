import type { ComponentType } from 'react';
import { FittsLawCover } from '@/components/covers/FittsLawCover';
import { HicksLawCover } from '@/components/covers/HicksLawCover';
import { MillersLawCover } from '@/components/covers/MillersLawCover';

export interface CoverProps {
  className?: string;
}

export const coverRegistry: Record<
  string,
  ComponentType<CoverProps>
> = {
  'fitts-law': FittsLawCover,
  'hicks-law': HicksLawCover,
  'millers-law': MillersLawCover,
};

export function getCoverComponent(
  key?: string,
): ComponentType<CoverProps> | null {
  if (!key) return null;
  return coverRegistry[key] ?? null;
}

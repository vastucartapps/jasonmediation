import { PEPTIDE_COMPOUNDS } from './compounds';
import { RESEARCH_CATEGORIES } from './categories';
import { SUPPLIER_PROFILES } from './suppliers';
import { FORMAT_PROFILES } from './formats';
import { PeptideCompound, ResearchCategory, SupplierProfile } from '../types';

export * from './compounds';
export * from './categories';
export * from './suppliers';
export * from './formats';

export function getAllCompounds(): PeptideCompound[] {
  return PEPTIDE_COMPOUNDS;
}

export function getCompoundBySlug(slug: string): PeptideCompound | undefined {
  return PEPTIDE_COMPOUNDS.find((c) => c.slug === slug);
}

export function getCompoundsByCategory(categorySlug: string): PeptideCompound[] {
  return PEPTIDE_COMPOUNDS.filter((c) => c.categorySlug === categorySlug);
}

export function getAllCategories(): ResearchCategory[] {
  return RESEARCH_CATEGORIES;
}

export function getCategoryBySlug(slug: string): ResearchCategory | undefined {
  return RESEARCH_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getSupplierProfile(id: string): SupplierProfile | undefined {
  return SUPPLIER_PROFILES[id];
}

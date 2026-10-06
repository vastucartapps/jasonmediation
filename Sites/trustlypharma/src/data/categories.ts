import { ResearchCategory } from '../types';

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  {
    slug: 'tissue-repair-recovery',
    name: 'Tissue Repair & Angiogenesis',
    headline: 'Preclinical Cellular Migration & Extracellular Matrix Remodeling',
    description: 'Systematic analysis of synthetic peptide sequences investigated in cellular motility, vascular endothelial growth factor (VEGF) transcription, and collagen fibrillogenesis.',
    signalingFocus: 'FAK-Paxillin pathway activation, VEGFR2 autophosphorylation, eNOS expression, actin cytoskeletal reorganization.',
    featuredCompoundSlugs: ['bpc-157', 'tb-500', 'kpv'],
  },
  {
    slug: 'neuropeptides-cognition',
    name: 'Neuropeptides & CNS Signaling',
    headline: 'Neurotrophic Factor Expression & Monoamine Neurotransmission',
    description: 'Academic reference profiles for synthetic peptide fragments investigated for their interactions with brain-derived neurotrophic factor (BDNF), melanocortin receptors, and GABAergic modulation.',
    signalingFocus: 'BDNF/TrkB axis upregulation, serotonin turnover regulation, enkephalinase inhibition, neurovascular preservation.',
    featuredCompoundSlugs: ['semax', 'selank', 'epithalon'],
  },
  {
    slug: 'growth-hormone-secretagogues',
    name: 'Growth Hormone Secretagogues & GHRH',
    headline: 'Pituitary Somatotroph Receptors & Ghrelin Signaling Pathways',
    description: 'Structural and kinetic profiling of synthetic peptides designed to selectively stimulate pulsatile endogenous growth hormone secretion via pituitary receptor pathways.',
    signalingFocus: 'GHSR-1a receptor agonism, GHRH receptor selectivity, downstream IGF-1 transcription without prolactin perturbation.',
    featuredCompoundSlugs: ['cjc-1295', 'ipamorelin', 'tesamorelin', 'sermorelin'],
  },
  {
    slug: 'metabolic-regulation',
    name: 'Metabolic & Incretin Signaling',
    headline: 'Dual and Triple Incretin Receptor Co-Agonism Kinetics',
    description: 'Analytical catalog of synthetic peptides targeting GLP-1, GIP, and glucagon receptor complexes to investigate cellular glucose homeostasis and lipid oxidation pathways.',
    signalingFocus: 'GLP-1R / GIPR allosteric modulation, cAMP pathway signaling, insulinotropic beta-cell sensitivity, lipolytic cascades.',
    featuredCompoundSlugs: ['tirzepatide', 'semaglutide', 'retatrutide', 'aod-9604'],
  },
  {
    slug: 'dermal-extracellular-matrix',
    name: 'Dermal & Extracellular Matrix',
    headline: 'Copper Chelation & Fibroblast Procollagen Biosynthesis',
    description: 'Comparative technical examination of peptide complexes studied for their modulation of matrix metalloproteinases (MMPs), decorin synthesis, and glycosaminoglycan accumulation.',
    signalingFocus: 'Copper (Cu2+) coordinate bonding, TGF-beta pathway stimulation, MMP-1/MMP-2 balance regulation, dermal fibroblast proliferation.',
    featuredCompoundSlugs: ['ghk-cu', 'snap-8'],
  },
];

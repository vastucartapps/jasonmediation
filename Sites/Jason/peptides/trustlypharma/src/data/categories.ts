import { ResearchCategory } from '../types';

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  {
    slug: 'tissue-repair-recovery',
    name: 'Tissue Repair & Angiogenesis',
    headline: 'Preclinical Cellular Migration & Extracellular Matrix Remodeling',
    description: 'Systematic analysis of synthetic peptide sequences investigated in cellular motility, vascular endothelial growth factor (VEGF) transcription, and collagen fibrillogenesis.',
    signalingFocus: 'FAK-Paxillin pathway activation, VEGFR2 autophosphorylation, eNOS expression, actin cytoskeletal reorganization.',
    featuredCompoundSlugs: ['bpc-157', 'tb-500'],
  },
  {
    slug: 'neuropeptides-cognition',
    name: 'Neuropeptides & CNS Signaling',
    headline: 'Neurotrophic Factor Expression & Monoamine Neurotransmission',
    description: 'Academic reference profiles for synthetic peptide fragments investigated for their interactions with brain-derived neurotrophic factor (BDNF), melanocortin receptors, and GABAergic modulation.',
    signalingFocus: 'BDNF/TrkB axis upregulation, serotonin turnover regulation, enkephalinase inhibition, neurovascular preservation.',
    featuredCompoundSlugs: ['semax', 'selank'],
  },
  {
    slug: 'growth-hormone-secretagogues',
    name: 'Growth Hormone Secretagogues & GHRH',
    headline: 'Pituitary Somatotroph Receptors & Ghrelin Signaling Pathways',
    description: 'Structural and kinetic profiling of synthetic peptides designed to selectively stimulate pulsatile endogenous growth hormone secretion via pituitary receptor pathways.',
    signalingFocus: 'GHSR-1a receptor agonism, GHRH receptor selectivity, downstream IGF-1 transcription without prolactin perturbation.',
    featuredCompoundSlugs: ['cjc-1295', 'ipamorelin'],
  },
  {
    slug: 'metabolic-regulation',
    name: 'Metabolic & Incretin Signaling',
    headline: 'Incretin Receptor Co-Agonism & Lipolytic Pathways',
    description: 'Analytical catalog of synthetic peptides targeting GLP-1, GIP, and beta-3 adrenergic receptors to investigate cellular glucose homeostasis and lipid oxidation cascades.',
    signalingFocus: 'GLP-1R / GIPR modulation, cAMP signaling, hormone-sensitive lipase stimulation, adipose beta-3 receptor agonism.',
    featuredCompoundSlugs: ['aod-9604'],
  },
  {
    slug: 'dermal-extracellular-matrix',
    name: 'Dermal & Extracellular Matrix',
    headline: 'Copper Chelation & Fibroblast Procollagen Biosynthesis',
    description: 'Comparative technical examination of peptide complexes studied for their modulation of matrix metalloproteinases (MMPs), decorin synthesis, and glycosaminoglycan accumulation.',
    signalingFocus: 'Copper (Cu2+) coordinate bonding, TGF-beta pathway stimulation, MMP-1/MMP-2 balance regulation, dermal fibroblast proliferation.',
    featuredCompoundSlugs: ['ghk-cu'],
  },
  {
    slug: 'cellular-longevity-mitochondrial',
    name: 'Cellular Longevity & Mitochondrial Axis',
    headline: 'Telomerase Transcription & Electron Transport Modulation',
    description: 'Preclinical investigation of peptides studied for telomere protection, mitochondrial biogenesis, AMPK activation, and protection against reactive oxygen species (ROS).',
    signalingFocus: 'Telomerase reverse transcriptase (TERT) activation, cardiolipin stabilization, mitochondrial ATP synthesis, epigenetic age regulation.',
    featuredCompoundSlugs: ['epithalon', 'mots-c'],
  },
];

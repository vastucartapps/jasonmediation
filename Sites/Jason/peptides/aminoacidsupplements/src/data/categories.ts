import { ResearchCategory } from '../types';

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  {
    slug: 'tissue-repair-recovery',
    name: 'Tissue Repair & Angiogenesis',
    headline: 'UK Laboratory Investigation into Cellular Migration & Microvascular Integrity',
    description:
      'Rigorous biochemical analysis of synthetic peptide fragments investigated in focal adhesion kinase (FAK) phosphorylation, vascular endothelial growth factor receptor 2 (VEGFR2) upregulation, and extracellular matrix fibrillogenesis across British in vitro models.',
    signalingFocus: 'FAK-Paxillin cascade phosphorylation, VEGFR2 transcription, eNOS modulation, actin cytoskeletal remodeling.',
    featuredCompoundSlugs: ['bpc-157', 'tb-500'],
  },
  {
    slug: 'neuropeptides-cognition',
    name: 'Neuropeptides & CNS Signaling',
    headline: 'Pre-Clinical Neurotrophic Expression & Central Synaptic Modulation',
    description:
      'Reference monographs documenting synthetic heptapeptides and regulatory fragments evaluated for neuroprotective signaling, brain-derived neurotrophic factor (BDNF) transcription, and monoaminergic receptor interactions in neurological assay systems.',
    signalingFocus: 'BDNF/TrkB axis upregulation, monoamine neurotransmitter turnover, endogenous enkephalinase inhibition, neurovascular preservation.',
    featuredCompoundSlugs: ['semax', 'selank'],
  },
  {
    slug: 'growth-hormone-secretagogues',
    name: 'Growth Hormone Secretagogues & GHRH',
    headline: 'Anterior Pituitary Somatotroph Receptors & Pulsatile Endocrine Cascades',
    description:
      'Analytical biochemical profiles for synthetic growth hormone secretagogue receptor (GHSR-1a) agonists and growth hormone-releasing hormone (GHRH) analogues evaluated for selective pituitary signaling and downstream IGF-1 transcription.',
    signalingFocus: 'GHSR-1a selective receptor binding, GHRH receptor signal transduction, pulsatile somatotroph release, minimal endocrine off-target elevation.',
    featuredCompoundSlugs: ['cjc-1295', 'ipamorelin'],
  },
  {
    slug: 'metabolic-regulation',
    name: 'Metabolic & Incretin Signaling',
    headline: 'Dual Incretin Receptor Co-Agonism & Lipolytic Energy Dynamics',
    description:
      'Biochemical reference dossiers for synthetic unimolecular co-agonists and lipolytic peptide sequences investigated in GLP-1, GIP, and beta-3 adrenergic receptor pathways controlling cellular energy homeostasis.',
    signalingFocus: 'GLP-1R / GIPR co-agonism, cellular cAMP cascades, hormone-sensitive lipase (HSL) activation, mitochondrial lipid oxidation.',
    featuredCompoundSlugs: ['aod-9604', 'tirzepatide', 'semaglutide'],
  },
  {
    slug: 'dermal-extracellular-matrix',
    name: 'Dermal & Extracellular Matrix',
    headline: 'Copper Chelation Dynamics & Fibroblast Procollagen Remodeling',
    description:
      'Analytical laboratory profiles of copper-binding tripeptides studied for coordinate complex formation, matrix metalloproteinase (MMP) homeostasis, decorin synthesis, and dermal fibroblast motility.',
    signalingFocus: 'Copper (Cu2+) coordination geometry, TGF-beta signaling modulation, procollagen Type I and III transcription, MMP regulation.',
    featuredCompoundSlugs: ['ghk-cu'],
  },
  {
    slug: 'cellular-longevity-mitochondrial',
    name: 'Cellular Longevity & Mitochondrial Axis',
    headline: 'Telomeric Chromatin Architecture & Mitochondrial-Derived Bioenergetics',
    description:
      'Investigative profiles of synthetic tetrapeptides and mitochondrial open reading frame-derived peptides analyzed for telomerase catalytic subunit (hTERT) activation, cardiolipin preservation, and cellular ROS mitigation.',
    signalingFocus: 'TERT gene promoter activation, AMPK phosphorylation, complex I/IV electron chain stabilization, cellular stress resistance.',
    featuredCompoundSlugs: ['epithalon', 'mots-c'],
  },
];

export function getAllCategories(): ResearchCategory[] {
  return RESEARCH_CATEGORIES;
}

export function getCategoryBySlug(slug: string): ResearchCategory | undefined {
  return RESEARCH_CATEGORIES.find((cat) => cat.slug === slug);
}

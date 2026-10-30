import { DeliveryFormatType } from '../types';

export interface FormatProfile {
  id: DeliveryFormatType;
  label: string;
  chemicalState: string;
  laboratoryHandling: string;
  storageRequirement: string;
  reconstitutionNeeded: boolean;
  description: string;
  badgeColor: string;
}

export const FORMAT_PROFILES: Record<DeliveryFormatType, FormatProfile> = {
  vial: {
    id: 'vial',
    label: 'Lyophilized Powder Vial',
    chemicalState: 'Freeze-dried crystalline cake / amorphous matrix',
    laboratoryHandling: 'Requires aseptic reconstitution with sterile bacteriostatic water (0.9% benzyl alcohol) or USP sterile water.',
    storageRequirement: '-20°C for extended stability; 2°C to 8°C post-reconstitution',
    reconstitutionNeeded: true,
    description: 'Gold-standard analytical preparation ensuring maximum shelf stability and molecular integrity prior to experimental protocol initiation.',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40',
  },
  pen: {
    id: 'pen',
    label: 'Pre-Mixed Reconstituted Pen',
    chemicalState: 'Pre-solubilized aqueous sterile solution in cartridge',
    laboratoryHandling: 'Ready-to-use research device with calibrated multidose micro-dial mechanism for precise volumetric delivery.',
    storageRequirement: 'Continuous cold-chain refrigeration at 2°C to 8°C; avoid freezing',
    reconstitutionNeeded: false,
    description: 'Calibrated laboratory dispenser eliminating manual solvent reconstitution calculations and minimizing procedural measurement error.',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
  },
  spray: {
    id: 'spray',
    label: 'Metered Intranasal Spray',
    chemicalState: 'Buffered aqueous or isotonic saline solution in metered atomizer',
    laboratoryHandling: 'Aseptic nasal actuator delivering consistent 0.1 mL volumetric spray plume per actuation across mucous membrane models.',
    storageRequirement: '2°C to 8°C refrigerated; protect from ultraviolet light exposure',
    reconstitutionNeeded: false,
    description: 'Non-invasive mucosal delivery formulation designed for blood-brain barrier bypass and neurotrophic peptide uptake studies.',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/40',
  },
  stack: {
    id: 'stack',
    label: 'Synergistic Research Stack',
    chemicalState: 'Dual or triple compound blend (co-lyophilized or multi-vial system)',
    laboratoryHandling: 'Requires synchronized reconstitution protocols to evaluate complementary biological signaling pathways.',
    storageRequirement: '-20°C desiccated; 2°C to 8°C refrigerated once hydrated',
    reconstitutionNeeded: true,
    description: 'Multi-target compound pairings formulated to investigate receptor crosstalk, simultaneous cascade activation, and synergistic biological response kinetics.',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/40',
  },
};

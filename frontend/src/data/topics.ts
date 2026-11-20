export interface Topic {
  id: string;
  subject: 'physique' | 'chimie';
  title: string;
  keywords: string[];
  formula: string;
  units: string[];
  reformulation: string;
  simplified: string;
  dialect: { tem: string; kabye: string; ewe: string };
  example: string;
  phonetic: string;
}

export const TOPICS: Topic[] = [
  {
    id: 'loi-ohm',
    subject: 'physique',
    title: 'Loi d\u2019Ohm',
    keywords: ['ohm', 'tension', 'courant', 'resistance', 'électricité', 'electricite'],
    formula: 'U = R × I',
    units: ['U : tension en volts (V)', 'R : résistance en ohms (Ω)', 'I : intensité en ampères (A)'],
    reformulation: 'La tension aux bornes d\u2019un dipôle résistif est proportionnelle à l\u2019intensité qui le traverse.',
    simplified: 'Plus on pousse fort (tension), plus le courant passe. Plus le fil résiste, moins il passe.',
    dialect: {
      tem: 'Na sâa-sâa, courant bɛ tɔ́; na résistance bɛ yɛ́ enda, courant bɛ tɔ́ ntɔ.',
      kabye: 'Tɔ́ɔ́ nɛ́ɛ́ wɛ́ɛ́ ɖɔ, electricité ɖɔ́ɖɔ́ ɖɔ.',
      ewe: 'Ne woxɔ ŋu ɖe edzi, electricité ɖoa ŋu; ne resistance lolo, electricité ƒoa ŋu.',
    },
    example: 'Comme le château d\u2019eau de Sokodé : plus la pression de l\u2019eau est forte, plus le robinet laisse couler. Un tuyau très étroit (grande résistance) laisse passer moins d\u2019eau.',
    phonetic: 'U égale R fois I',
  },
  {
    id: 'poids-masse',
    subject: 'physique',
    title: 'Poids et masse',
    keywords: ['poids', 'masse', 'gravité', 'gravite', 'newton'],
    formula: 'P = m × g',
    units: ['P : poids en newtons (N)', 'm : masse en kilogrammes (kg)', 'g : intensité de la pesanteur ≈ 9,8 N/kg'],
    reformulation: 'Le poids est la force d\u2019attraction de la Terre sur un objet ; il dépend de la masse.',
    simplified: 'La masse, c\u2019est la quantité de matière. Le poids, c\u2019est la force avec laquelle la Terre la tire vers le bas.',
    dialect: {
      tem: 'Poids bɛ yɛ́ force ni Earth bɛ ɖɔ́ ɖ\u00e9; masse bɛ yɛ́ kpɛ́ɛ́ ni wɔ́.',
      kabye: 'Poids la yɔ́ force Ɛ́ɛ́ɛ́ fɛ́ɛ́ ɖɔ́ɖɔ́; masse la yɔ́ matière lɛ.',
      ewe: 'Poids nye force si Anyigba ɖoa ŋu; masse nye nu si le ame si.',
    },
    example: 'Un sac de maïs de 50 kg au marché pèse environ 490 N sur Terre : sa masse ne change pas, mais son poids serait différent sur la Lune.',
    phonetic: 'P égale m fois g',
  },
  {
    id: 'oxydoreduction',
    subject: 'chimie',
    title: 'Oxydoréduction',
    keywords: ['oxydation', 'réduction', 'reduction', 'électron', 'electron', 'redox'],
    formula: 'Ox + n e⁻ ⇌ Red',
    units: ['Ox : forme oxydée', 'Red : forme réduite', 'n : nombre d\u2019électrons échangés'],
    reformulation: 'Une oxydation est une perte d\u2019électrons ; une réduction est un gain d\u2019électrons.',
    simplified: 'Oxyder, c\u2019est donner des électrons. Réduire, c\u2019est en recevoir.',
    dialect: {
      tem: 'Oxydation bɛ yɛ́ électrons ɖɔ́; réduction bɛ yɛ́ électrons kpɛ́.',
      kabye: 'Oxydation la yɔ́ électrons wɛ́ɛ́; réduction la yɔ́ électrons yɛ́ɛ́.',
      ewe: 'Oxydation nye électrons na; réduction nye électrons xɔ.',
    },
    example: 'Le fer d\u2019une vieille charrue du village qui rouille subit une oxydation : il perd des électrons au contact de l\u2019air humide.',
    phonetic: 'Ox plus n e moins égale Red',
  },
  {
    id: 'quantite-matiere',
    subject: 'chimie',
    title: 'Quantité de matière',
    keywords: ['mole', 'quantité', 'quantite', 'masse molaire', 'matière'],
    formula: 'n = m / M',
    units: ['n : quantité de matière en moles (mol)', 'm : masse en grammes (g)', 'M : masse molaire en g/mol'],
    reformulation: 'La quantité de matière est le nombre de moles d\u2019un échantillon, obtenu en divisant sa masse par sa masse molaire.',
    simplified: 'Une mole, c\u2019est un paquet de particules. Pour compter les moles, on divise la masse par le poids d\u2019un paquet.',
    dialect: {
      tem: 'Quantité bɛ yɛ́ moles kɛ́ɛ́; na masse bɛ ɖɔ́ masse molaire ni.',
      kabye: 'Quantité la yɔ́ moles pɛ́ɛ́; masse la ɖɔ́ masse molaire.',
      ewe: 'Quantité nye moles ƒe nyuie; masse ɖoa ŋu masse molaire.',
    },
    example: 'Au marché, on compte les œufs par douzaine : une douzaine est un paquet, comme une mole est un paquet de particules.',
    phonetic: 'n égale m sur M',
  },
  {
    id: 'acide-base',
    subject: 'chimie',
    title: 'Réaction acide-base',
    keywords: ['acide', 'base', 'ph', 'neutralisation', 'titrage'],
    formula: 'H⁺ + OH⁻ → H₂O',
    units: ['pH entre 0 et 14', 'pH < 7 : acide', 'pH > 7 : basique'],
    reformulation: 'Une réaction acide-base est un transfert de protons H⁺ entre un acide et une base.',
    simplified: 'Un acide donne des H⁺, une base les capte. Ensemble, ils se neutralisent.',
    dialect: {
      tem: 'Acide bɛ yɛ́ H⁺ ɖɔ́; base bɛ H⁺ kpɛ́ɛ́.',
      kabye: 'Acide la yɔ́ H⁺ wɛ́ɛ́; base la H⁺ yɛ́ɛ́.',
      ewe: 'Acide nye H⁺ na; base xɔa H⁺ ŋu.',
    },
    example: 'Le citron ou le vinaigre d\u2019oseille dans la sauce est acide ; le savon ou la cendre de bois est basique.',
    phonetic: 'H plus plus O H moins égale H deux O',
  },
];

export function findTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}

export function matchTopic(question: string): Topic | undefined {
  const q = question.toLowerCase();
  return TOPICS.find((t) => t.keywords.some((k) => q.includes(k)) || q.includes(t.title.toLowerCase()));
}

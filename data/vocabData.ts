// data/vocabData.ts

import vocabQuizzes from "../assets/vocab_quizzes.json";

// TypeScript types (si tu es en .js tu peux enlever les types)
export type VocabItem = {
  id: string;
  french: string;      // traduction FR
  reading: string;     // lecture kana
  kanji: string | null;
};

export type VocabPack = {
  packNumber: number;     // 1,2,3,...
  title: string;          // "Vocab – Pack 01 (...)"
  moduleNumber: number;   // 2,3,4...
  items: VocabItem[];
};

export type ModuleDef = {
  moduleNumber: number;        // 2,3,4...
  label: string;               // "Module 2"
  packNumbers: number[];       // [1,2,3,4,5]
  packs: VocabPack[];          // objets complets
};

// -----------------------------
// 1. mapping pack → module
// -----------------------------
const MODULE_MAP: { [packNumber: number]: number } = {};

// helper pour remplir plus lisiblement
function mapRangeToModule(start: number, end: number, moduleNumber: number) {
  for (let p = start; p <= end; p++) {
    MODULE_MAP[p] = moduleNumber;
  }
}

// d'après ta répartition :
mapRangeToModule(1, 5, 2);    // module 2 = pack 1-5
mapRangeToModule(6, 10, 3);   // module 3 = pack 6-10
mapRangeToModule(11, 13, 4);  // module 4 = pack 11-13
mapRangeToModule(14, 18, 5);  // module 5 = pack 14-18
mapRangeToModule(19, 23, 6);  // module 6 = pack 19-23
mapRangeToModule(24, 28, 7);  // module 7 = pack 24-28
mapRangeToModule(29, 32, 8);  // module 8 = pack 29-32
mapRangeToModule(33, 36, 9);  // module 9 = pack 33-36
mapRangeToModule(37, 42, 10); // module10 = pack 37-42

// -----------------------------
// 2. Construire les packs normalisés
//    à partir de vocab_quizzes.json
// -----------------------------

// ATTENTION : on suppose que vocab_quizzes.json est un tableau
// comme [{id:"...", title:"Vocab – Pack 01 (...)", items:[...]}]

const ALL_PACKS: VocabPack[] = vocabQuizzes.map((rawPack: any, index: number) => {
  const packNumber = index + 1; // pack1 = premier dans le JSON
  const moduleNumber = MODULE_MAP[packNumber] ?? null;

  return {
    packNumber,
    title: rawPack.title,
    moduleNumber,
    items: rawPack.items.map((it: any) => ({
      id: it.id,
      french: it.french,
      reading: it.reading,
      kanji: it.kanji ?? null,
    })),
  };
});

// -----------------------------
// 3. Construire les modules
// -----------------------------
const MODULE_NUMBERS = [2,3,4,5,6,7,8,9,10];

const MODULES: ModuleDef[] = MODULE_NUMBERS.map((moduleNumber) => {
  const packsForThisModule = ALL_PACKS.filter(
    (p) => p.moduleNumber === moduleNumber
  );

  return {
    moduleNumber,
    label: `Module ${moduleNumber}`,
    packNumbers: packsForThisModule.map((p) => p.packNumber),
    packs: packsForThisModule,
  };
});

export { ALL_PACKS, MODULES };

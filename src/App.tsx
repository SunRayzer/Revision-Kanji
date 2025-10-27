// @ts-nocheck
import React, { useMemo, useState, useEffect, useRef } from "react";
import vocabQuizzes from "./assets/vocab_quizzes.json";

/** ================== Données JLPT N5 (kanji) ================== */
const DATA = [
  { id: "人", meaningFR: "personne; humain", meaningEN: "person; human", onyomi: ["ジン","ニン"], kunyomi: ["ひと"], aSavoir: ["ひと"] },
  { id: "子", meaningFR: "enfant", meaningEN: "child", onyomi: ["シ","ツ","ス"], kunyomi: ["こ"], aSavoir: ["こ"] },
  { id: "女", meaningFR: "femme; fille; féminin", meaningEN: "woman", onyomi: ["ジョ","ニョ","ニョウ"], kunyomi: ["おんな","め"], aSavoir: ["おんな"] },
  { id: "男", meaningFR: "homme; garçon; masculin", meaningEN: "man", onyomi: ["ダン","ナン"], kunyomi: ["おとこ"], aSavoir: ["おとこ"] },
  { id: "一", meaningFR: "un", meaningEN: "one", onyomi: ["イチ","イツ"], kunyomi: ["ひと","ひとつ"], aSavoir: ["いち"] },
  { id: "二", meaningFR: "deux", meaningEN: "two", onyomi: ["ニ","ジ"], kunyomi: ["ふた","ふたつ","ふたたび"], aSavoir: ["に"] },
  { id: "三", meaningFR: "trois", meaningEN: "three", onyomi: ["サン","ソウ"], kunyomi: ["み","みっつ","みつ"], aSavoir: ["さん"] },
  { id: "四", meaningFR: "quatre", meaningEN: "four", onyomi: ["シ"], kunyomi: ["よ","よっつ","よん"], aSavoir: ["し","よん"] },
  { id: "五", meaningFR: "cinq", meaningEN: "five", onyomi: ["ゴ"], kunyomi: ["いつ","いっつ"], aSavoir: ["ご"] },
  { id: "六", meaningFR: "six", meaningEN: "six", onyomi: ["ロク","リク"], kunyomi: ["む","むっつ"], aSavoir: ["ろく"] },
  { id: "七", meaningFR: "sept", meaningEN: "seven", onyomi: ["シチ"], kunyomi: ["なな","ななつ","なの"], aSavoir: ["なな","しち"] },
  { id: "八", meaningFR: "huit", meaningEN: "eight", onyomi: ["ハチ"], kunyomi: ["や","やっつ","やつ","よう"], aSavoir: ["はち"] },
  { id: "九", meaningFR: "neuf", meaningEN: "nine", onyomi: ["キュウ","ク"], kunyomi: ["ここの","ここのつ"], aSavoir: ["きゅう"] },
  { id: "十", meaningFR: "dix", meaningEN: "ten", onyomi: ["ジュウ"], kunyomi: ["とお","と"], aSavoir: ["じゅう"] },
  { id: "百", meaningFR: "cent", meaningEN: "hundred", onyomi: ["ヒャク","ビャク"], kunyomi: ["もも"], aSavoir: ["ひゃく"] },
  { id: "千", meaningFR: "mille", meaningEN: "thousand", onyomi: ["セン"], kunyomi: ["ち"], aSavoir: ["せん"] },
  { id: "万", meaningFR: "dix mille", meaningEN: "ten thousand", onyomi: ["マン","バン"], kunyomi: ["よろず"], aSavoir: ["いちまん"] },
  { id: "名", meaningFR: "nom; célèbre: fameux", meaningEN: "name", onyomi: ["メイ","ミョウ"], kunyomi: ["な"], aSavoir: ["なまえ"] },
  { id: "時", meaningFR: "temps; heure", meaningEN: "time; hour", onyomi: ["ジ"], kunyomi: ["とき"], aSavoir: ["じ"] },
  { id: "分", meaningFR: "minute; partager; diviser; comprendre; partie", meaningEN: "minute; part; divide", onyomi: ["ブン","フン","プン"], kunyomi: ["わける","わかる"], aSavoir: ["ふん","ぷん"] },
  { id: "日", meaningFR: "jour; soleil", meaningEN: "day; sun", onyomi: ["ニチ","ジツ","ニ"], kunyomi: ["ひ","か","び"], aSavoir: ["ひ","にち"] }, 
  { id: "月", meaningFR: "lune; mois", meaningEN: "moon; Monday", onyomi: ["ゲツ","ガツ"], kunyomi: ["つき"], aSavoir: ["げつ"] },
  { id: "年", meaningFR: "année; an; âge", meaningEN: "year", onyomi: ["ネン"], kunyomi: ["とし"], aSavoir: ["ねん"] },
  { id: "今", meaningFR: "maintenant", meaningEN: "now", onyomi: ["コン"], kunyomi: ["いま"], aSavoir: ["いま"] },
  { id: "円", meaningFR: "yen; cercle", meaningEN: "yen; circle", onyomi: ["エン"], kunyomi: ["まるい"], aSavoir: ["えん"] },
  { id: "火", meaningFR: "feu", meaningEN: "fire; Tuesday", onyomi: ["カ"], kunyomi: ["ひ"], aSavoir: ["ひ"] },
  { id: "水", meaningFR: "eau", meaningEN: "water; Wednesday", onyomi: ["スイ"], kunyomi: ["みず"], aSavoir: ["みず"] },
  { id: "木", meaningFR: "arbre; bois", meaningEN: "tree; wood", onyomi: ["モク"], kunyomi: ["き"], aSavoir: ["き"] },
  { id: "金", meaningFR: "or; argent (monnaie); métal", meaningEN: "gold; money; Friday", onyomi: ["キン","コン"], kunyomi: ["かね"], aSavoir: ["かね"] },
  { id: "土", meaningFR: "terre; sol; terrain", meaningEN: "earth; Saturday", onyomi: ["ド","ト"], kunyomi: ["つち"], aSavoir: ["つち"] },
  { id: "半", meaningFR: "moitier; milieu; demi", meaningEN: "", onyomi: ["ハン"], kunyomi: ["なかば"], aSavoir: ["はん"] },
  { id: "何", meaningFR: "quoi; que; quel, quelle", meaningEN: "what", onyomi: ["カ"], kunyomi: ["なに","なん"], aSavoir: ["なに","なん"] },
  { id: "行", meaningFR: "aller; ligne; organiser", meaningEN: "to go; line", onyomi: ["コウ","ギョウ","アン"], kunyomi: ["いく","ゆく","おこなう"], aSavoir: ["いく"] },
  { id: "来", meaningFR: "venir; suivant", meaningEN: "to come", onyomi: ["ライ"], kunyomi: ["くる","きます","きたす"], aSavoir: ["くる"] },
  { id: "母", meaningFR: "mère; maman", meaningEN: "mother", onyomi: ["ボ"], kunyomi: ["はは"], aSavoir: ["はは"] },
  { id: "父", meaningFR: "père; papa", meaningEN: "father", onyomi: ["フ"], kunyomi: ["ちち"], aSavoir: ["ちち"] },
  { id: "食", meaningFR: "manger; nourriture", meaningEN: "to eat; food", onyomi: ["ショク","ジキ"], kunyomi: ["たべる","くう"], aSavoir: ["たべる"] },
  { id: "飲", meaningFR: "boire; boisson; avaler", meaningEN: "to drink", onyomi: ["イン","オン"], kunyomi: ["のむ"], aSavoir: ["のむ"] },
  { id: "前", meaningFR: "avant; devant", meaningEN: "before; in front", onyomi: ["ゼン"], kunyomi: ["まえ"], aSavoir: ["まえ"] },
  { id: "後", meaningFR: "après; derrière", meaningEN: "after; behind", onyomi: ["ゴ","コウ"], kunyomi: ["あと","うしろ","のち","おくれる"], aSavoir: ["あと"] },
  { id: "友", meaningFR: "ami", meaningEN: "friend", onyomi: ["ユウ"], kunyomi: ["とも"], aSavoir: ["とも"] },
  { id: "毎", meaningFR: "chaque; tous les", meaningEN: "every", onyomi: ["マイ"], kunyomi: ["ごと"], aSavoir: ["まい"] },
  { id: "左", meaningFR: "gauche", meaningEN: "left", onyomi: ["サ","シャ"], kunyomi: ["ひだり"], aSavoir: ["ひだり"] },
  { id: "右", meaningFR: "droite", meaningEN: "right", onyomi: ["ウ","ユウ"], kunyomi: ["みぎ"], aSavoir: ["みぎ"] },
  { id: "上", meaningFR: "au-dessus; monter; lever; grimper; haut", meaningEN: "above; up", onyomi: ["ジョウ","ショウ","シャン"], kunyomi: ["うえ","あげる","あがる","のぼる","うわ"], aSavoir: ["うえ"] },
  { id: "下", meaningFR: "en-dessous; descendre; baisser; bas", meaningEN: "below; down", onyomi: ["カ","ゲ"], kunyomi: ["した","さげる","さがる"], aSavoir: ["した"] },
  { id: "中", meaningFR: "milieu; intérieur; dans; dedans; centre; moyenne", meaningEN: "middle; inside", onyomi: ["チュウ","ジュウ"], kunyomi: ["なか","うち","あたる"], aSavoir: ["なか"] },
  { id: "外", meaningFR: "extérieur; dehors", meaningEN: "", onyomi: ["ガイ","ゲ"], kunyomi: ["そと","ほか","はずす","はずれる"], aSavoir: ["そと"] },
  { id: "国", meaningFR: "pays; patrie", meaningEN: "", onyomi: ["コク","ゴク"], kunyomi: ["くに"], aSavoir: ["くに"] },
  { id: "語", meaningFR: "mot; langue; raconter; language", meaningEN: "", onyomi: ["ゴ"], kunyomi: ["かたる","かたらい"], aSavoir: ["ご"] },
  { id: "高", meaningFR: "haut; cher; élevé", meaningEN: "high; expensive", onyomi: ["コウ"], kunyomi: ["たかい","たか","たかまる","たかめる"], aSavoir: ["たかい"] },
  { id: "安", meaningFR: "calme; bon marché; tranquilité; sûr; peu cher", meaningEN: "", onyomi: ["アン"], kunyomi: ["やすい"], aSavoir: ["やすい"] },
  { id: "会", meaningFR: "réunion; rencontrer; association; parti", meaningEN: "", onyomi: ["カイ"], kunyomi: ["あう"], aSavoir: ["あう"] },
  { id: "見", meaningFR: "voir; regarder; montrer", meaningEN: "to see", onyomi: ["ケン"], kunyomi: ["みる","みえる","みせる"], aSavoir: ["みる"] },
  { id: "大", meaningFR: "grand", meaningEN: "big", onyomi: ["ダイ","タイ"], kunyomi: ["おおきい","おおいに"], aSavoir: ["おおきい"] },
  { id: "小", meaningFR: "petit", meaningEN: "small", onyomi: ["ショウ"], kunyomi: ["ちいさい","こ"], aSavoir: ["ちいさい"] },
  { id: "聞", meaningFR: "entendre; écouter; demander", meaningEN: "hear; listen; ask", onyomi: ["ブン","モン"], kunyomi: ["きく","きこえる"], aSavoir: ["きく"] },
  { id: "読", meaningFR: "lire", meaningEN: "to read", onyomi: ["ドク","トク","トウ"], kunyomi: ["よむ"], aSavoir: ["よむ"] },
  { id: "新", meaningFR: "nouveau; neuf; frais", meaningEN: "new", onyomi: ["シン"], kunyomi: ["あたらしい","あらた"], aSavoir: ["あたらしい"] },
  { id: "古", meaningFR: "ancien; vieux", meaningEN: "old", onyomi: ["コ"], kunyomi: ["ふるい"], aSavoir: ["ふるい"] },
  { id: "学", meaningFR: "étudier; études; apprendre; sciense", meaningEN: "study; learn", onyomi: ["ガク"], kunyomi: ["まなぶ"], aSavoir: ["まなぶ"] },
  { id: "話", meaningFR: "parler; histoire; dire", meaningEN: "to speak; story", onyomi: ["ワ"], kunyomi: ["はなす","はなし"], aSavoir: ["はなす","はなし"] },
  { id: "買", meaningFR: "acheter", meaningEN: "to buy", onyomi: ["バイ"], kunyomi: ["かう"], aSavoir: ["かう"] },
  { id: "午", meaningFR: "midi", meaningEN: "noon", onyomi: ["ゴ"], kunyomi: [,"うま"], aSavoir: ["ご"] },
  { id: "書", meaningFR: "écrire; écrit", meaningEN: "to write; writing", onyomi: ["ショ"], kunyomi: ["かく"], aSavoir: ["かく"] },
  { id: "校", meaningFR: "école", meaningEN: "school", onyomi: ["コウ"], kunyomi: [,"めん"], aSavoir: ["がっこう"] },
  { id: "本", meaningFR: "livre; origine; essentiel; réalité", meaningEN: "", onyomi: ["ホン"], kunyomi: ["おと"], aSavoir: ["ほん"] },
  { id: "駅", meaningFR: "gare; station", meaningEN: "station", onyomi: ["エキ"], kunyomi: [], aSavoir: ["えき"] },
  { id: "週", meaningFR: "semaine", meaningEN: "", onyomi: ["シュウ"], kunyomi: ["しゅう"], aSavoir: ["しゅう"] },
  { id: "車", meaningFR: "voiture; véhicule; roue", meaningEN: "car", onyomi: ["シャ"], kunyomi: ["くるま"], aSavoir: ["くるま"] },
  { id: "店", meaningFR: "magasin; boutique; échoppe; établissement", meaningEN: "shop", onyomi: ["テン"], kunyomi: ["みせ"], aSavoir: ["みせ"] },
  { id: "休", meaningFR: "repos, congé", meaningEN: "", onyomi: ["キュウ"], kunyomi: ["やすみ","やすむ","やすめる"], aSavoir: ["やすみ","やすむ"] },
  { id: "山", meaningFR: "montagne", meaningEN: "mountain", onyomi: ["サン","ザン","セン"], kunyomi: ["やま"], aSavoir: ["やま"] },
  { id: "川", meaningFR: "rivière; fleuve", meaningEN: "river", onyomi: ["セン"], kunyomi: ["かわ"], aSavoir: ["かわ"] },
  { id: "言", meaningFR: "dire; mot", meaningEN: "to say; word", onyomi: ["ゲン","ゴン"], kunyomi: ["いう","こと"], aSavoir: ["いう"] },
  { id: "生", meaningFR: "vie; naître; cru; vivre; authentique", meaningEN: "life; to be born; raw", onyomi: ["セイ","ショウ",""], kunyomi: ["うまれる","うむ","おう","いきる","いかす","いける","き","なま","はえる","はやす"], aSavoir: ["せんせい"] },
  { id: "多", meaningFR: "nombreux; beaucoup", meaningEN: "many", onyomi: ["タ"], kunyomi: ["おおい"], aSavoir: ["おおい"] },
  { id: "少", meaningFR: "peu; peu nombreux", meaningEN: "few; little", onyomi: ["ショウ"], kunyomi: ["すくない","すこし"], aSavoir: ["すこし"] },
  { id: "入", meaningFR: "entrer; insérer", meaningEN: "to enter", onyomi: ["ニュウ","ジュ"], kunyomi: ["はいる","いれる","いる"], aSavoir: ["はいる"] },
  { id: "出", meaningFR: "sortir; envoyer; présence; quitter; partir", meaningEN: "to go out", onyomi: ["シュツ","スイ"], kunyomi: ["でる","だす","でかける","いでる"], aSavoir: ["でる"] },
  { id: "空", meaningFR: "ciel; vide; se vider; creux; se libérer", meaningEN: "sky; empty", onyomi: ["クウ"], kunyomi: ["そら","から","あく","すく","あける"], aSavoir: ["そら"] },
  { id: "花", meaningFR: "fleur", meaningEN: "flower", onyomi: ["カ"], kunyomi: ["はな"], aSavoir: ["はな"] },
  { id: "手", meaningFR: "main", meaningEN: "", onyomi: ["シュ"], kunyomi: ["て"], aSavoir: ["て"] },
  { id: "足", meaningFR: "pied; jambe; ajouter", meaningEN: "", onyomi: ["ソク"], kunyomi: ["あし","たりる","たす","たる"], aSavoir: ["あし"] },
  { id: "長", meaningFR: "long; chef", meaningEN: "long; leader", onyomi: ["チョウ"], kunyomi: ["ながい"], aSavoir: [""] },
  { id: "先", meaningFR: "avant; précédent", meaningEN: "before; previous", onyomi: ["セン"], kunyomi: ["さき"], aSavoir: [""] },
  { id: "間", meaningFR: "intervalle; entre", meaningEN: "interval; between", onyomi: ["カン","ケン"], kunyomi: ["あいだ","ま"], aSavoir: [""] },
  { id: "北", meaningFR: "nord", meaningEN: "north", onyomi: ["ホク"], kunyomi: ["きた"], aSavoir: [""] },
  { id: "南", meaningFR: "sud", meaningEN: "south", onyomi: ["ナン"], kunyomi: ["みなみ"], aSavoir: [""] },
  { id: "東", meaningFR: "est", meaningEN: "east", onyomi: ["トウ"], kunyomi: ["ひがし"], aSavoir: [""] },
  { id: "西", meaningFR: "ouest", meaningEN: "west", onyomi: ["セイ","サイ"], kunyomi: ["にし"], aSavoir: [""] },
  { id: "売", meaningFR: "vendre", meaningEN: "to sell", onyomi: ["バイ"], kunyomi: ["うる"], aSavoir: [""]　},
  { id: "道", meaningFR: "route; chemin", meaningEN: "road; way", onyomi: ["ドウ"], kunyomi: ["みち"], aSavoir: [""] },
  { id: "田", meaningFR: "rizière; champ", meaningEN: "rice field", onyomi: ["デン"], kunyomi: ["た"], aSavoir: [""] },
  { id: "町", meaningFR: "ville; quartier", meaningEN: "town", onyomi: ["チョウ"], kunyomi: ["まち"], aSavoir: [""] },
  { id: "村", meaningFR: "village", meaningEN: "village", onyomi: ["ソン"], kunyomi: ["むら"], aSavoir: [""] },
  { id: "天", meaningFR: "ciel; paradis", meaningEN: "heaven; sky", onyomi: ["テン"], kunyomi: [], aSavoir: [""] },
  { id: "気", meaningFR: "esprit; air; humeur", meaningEN: "spirit; air", onyomi: ["キ"], kunyomi: [], aSavoir: [""] },
  { id: "雨", meaningFR: "pluie", meaningEN: "rain", onyomi: ["ウ"], kunyomi: ["あめ"], aSavoir: [""] },
  { id: "雪", meaningFR: "neige", meaningEN: "snow", onyomi: ["セツ"], kunyomi: ["ゆき"], aSavoir: [""] },
  { id: "草", meaningFR: "herbe", meaningEN: "grass", onyomi: ["ソウ"], kunyomi: ["くさ"], aSavoir: [""] },
  { id: "森", meaningFR: "forêt", meaningEN: "forest", onyomi: ["シン"], kunyomi: ["もり"], aSavoir: [""] },
  { id: "林", meaningFR: "bois; bosquet", meaningEN: "grove", onyomi: ["リン"], kunyomi: ["はやし"], aSavoir: [""] },
  { id: "石", meaningFR: "pierre", meaningEN: "stone", onyomi: ["セキ"], kunyomi: ["いし"], aSavoir: [""] },
  { id: "社", meaningFR: "sanctuaire; société", meaningEN: "shrine; company", onyomi: ["シャ"], kunyomi: [], aSavoir: ["しゃかい"] },
  { id: "白", meaningFR: "blanc", meaningEN: "white", onyomi: ["ハク","ビャク"], kunyomi: ["しろ","しろい"], aSavoir: [""] },
  { id: "目", meaningFR: "œil; oeil", meaningEN: "eye", onyomi: ["モク"], kunyomi: ["め"], aSavoir: [""] },
  { id: "口", meaningFR: "bouche", meaningEN: "mouth", onyomi: ["コウ","ク"], kunyomi: ["くち"], aSavoir: [""] },
  { id: "耳", meaningFR: "oreille", meaningEN: "ear", onyomi: ["ジ"], kunyomi: ["みみ"], aSavoir: [""] },
  { id: "力", meaningFR: "force; pouvoir", meaningEN: "power; strength", onyomi: ["リョク","リキ"], kunyomi: ["ちから"], aSavoir: [""] },
  { id: "電", meaningFR: "électricité", meaningEN: "electricity", onyomi: ["デン"], kunyomi: [], aSavoir: [""] },
  { id: "魚", meaningFR: "poisson", meaningEN: "fish", onyomi: ["ギョ"], kunyomi: ["さかな"], aSavoir: [""] },
  { id: "犬", meaningFR: "chien", meaningEN: "dog", onyomi: ["ケン"], kunyomi: ["いぬ"], aSavoir: [""] },
  { id: "立", meaningFR: "se lever; être debout; se dresser", meaningEN: "", onyomi: ["リツ"], kunyomi: ["た"], aSavoir: [""] },

];


// ================== Données vocabulaire (modules / packs) ==================



// 1. Associer les packs à leur module
const MODULE_MAP: Record<number, number> = {};

function mapRangeToModule(start: number, end: number, moduleNumber: number) {
  for (let p = start; p <= end; p++) {
    MODULE_MAP[p] = moduleNumber;
  }
}

// Répartition que tu m'as donnée :
mapRangeToModule(1, 5, 2);    // Module 2 = packs 1-5
mapRangeToModule(6, 10, 3);   // Module 3 = packs 6-10
mapRangeToModule(11, 13, 4);  // Module 4 = packs 11-13
mapRangeToModule(14, 18, 5);  // Module 5 = packs 14-18
mapRangeToModule(19, 23, 6);  // Module 6 = packs 19-23
mapRangeToModule(24, 28, 7);  // Module 7 = packs 24-28
mapRangeToModule(29, 32, 8);  // Module 8 = packs 29-32
mapRangeToModule(33, 36, 9);  // Module 9 = packs 33-36
mapRangeToModule(37, 42, 10); // Module 10 = packs 37-42

// 2. Construire la liste de tous les packs à partir du JSON
//    vocabQuizzes doit déjà être importé tout en haut :
/*
   import vocabQuizzes from "./assets/vocab_quizzes.json";
*/
const ALL_PACKS = vocabQuizzes.map((rawPack: any, index: number) => {
  const packNumber = index + 1; // pack 1 = premier dans le JSON
  return {
    packNumber,
    title: rawPack.title,
    moduleNumber: MODULE_MAP[packNumber],
    items: rawPack.items, // [{ id, french, reading, kanji }]
  };
});

// 3. Construire les modules avec leurs packs
const MODULE_NUMBERS = [2,3,4,5,6,7,8,9,10];

const MODULES = MODULE_NUMBERS.map((num) => {
  const packs = ALL_PACKS.filter((p) => p.moduleNumber === num);
  return {
    moduleNumber: num,
    label: `Module ${num}`,
    packs, // chaque pack = { packNumber, title, items[...] }
  };
});

function VocabSection({
  onExit,
  selectedModules,
  setSelectedModules,
  selectedPacks,
  setSelectedPacks,
}: {
  onExit: () => void;
  selectedModules: number[];
  setSelectedModules: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPacks: number[];
  setSelectedPacks: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  // subPage contrôle où on est :
  const [subPage, setSubPage] = React.useState<"modules" | "packs" | "words">("modules");

  // module affiché actuellement
  const [moduleView, setModuleView] = React.useState<any>(null);

  // pack affiché en détail
  const [packView, setPackView] = React.useState<any>(null);

  // ⚠️ SUPPRIMER ces 2 lignes dans ta version :
  // const [selectedModules, setSelectedModules] = React.useState<number[]>([]);
  // const [selectedPacks, setSelectedPacks] = React.useState<number[]>([]);
  // --> maintenant ils viennent des props, donc on ne les redéclare pas ici.

  // --- helpers sélection ------------------------

  function toggleModule(moduleNumber: number) {
    setSelectedModules((prev) =>
      prev.includes(moduleNumber)
        ? prev.filter((m) => m !== moduleNumber)
        : [...prev, moduleNumber]
    );
  }

  function togglePack(packNumber: number) {
    setSelectedPacks((prev) =>
      prev.includes(packNumber)
        ? prev.filter((p) => p !== packNumber)
        : [...prev, packNumber]
    );
  }

  // retourne tous les numéros de packs appartenant aux modules sélectionnés
  function getPackNumbersFromSelectedModules() {
    const packsFromModules: number[] = [];
    MODULES.forEach((m) => {
      if (selectedModules.includes(m.moduleNumber)) {
        m.packs.forEach((p: any) => {
          packsFromModules.push(p.packNumber);
        });
      }
    });
    return packsFromModules;
  }

  // packs finaux utilisés pour le quiz :
  // - si au moins 1 pack est coché => on prend uniquement ceux-là
  // - sinon => on prend tous les packs des modules cochés
  function getChosenPackNumbersForQuiz() {
    if (selectedPacks.length > 0) {
      return [...new Set(selectedPacks)];
    }
    const fromModules = getPackNumbersFromSelectedModules();
    return [...new Set(fromModules)];
  }

  // compter le nombre total de mots qui vont être utilisés dans le quiz
  function getChosenWordCount() {
    const chosenPackNumbers = getChosenPackNumbersForQuiz();
    let count = 0;
    ALL_PACKS.forEach((pack: any) => {
      if (chosenPackNumbers.includes(pack.packNumber)) {
        count += pack.items.length;
      }
    });
    return count;
  }

  // lancer le quiz vocabulaire
  // (pour l'instant on n'a pas encore fait l'écran quiz vocab
  // donc je fais juste un alert() avec les packs choisis)
  function handleStartQuiz() {
    const chosenPackNumbers = getChosenPackNumbersForQuiz();
    if (chosenPackNumbers.length === 0) {
      alert("Sélectionne au moins un module ou un pack 👍");
      return;
    }

    alert(
      "Quiz lancé avec packs : " +
        chosenPackNumbers.join(", ") +
        "\nNombre total de mots : " +
        getChosenWordCount()
    );

    // ICI plus tard :
    // -> setRoute("vocabQuiz")
    // -> tu passes chosenPackNumbers au composant quiz
  }

  // -------------------------------------------------
  // 1) PAGE : LISTE DES MODULES
  // -------------------------------------------------
  if (subPage === "modules") {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">📘 Modules de vocabulaire</div>
          <div className="text-sm text-gray-600">
            Coche un ou plusieurs modules, ou ouvre un module pour choisir des packs.
          </div>
        </div>

        <div className="grid gap-4">
          {MODULES.map((mod) => {
            const isChecked = selectedModules.includes(mod.moduleNumber);

            return (
              <div
                key={mod.moduleNumber}
                className="rounded-xl border bg-white shadow-sm p-4 flex flex-col gap-3"
              >
                {/* ligne module + checkbox */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-pink-500"
                    checked={isChecked}
                    onChange={() => toggleModule(mod.moduleNumber)}
                  />

                  <div className="flex-1">
                    <div className="text-lg font-semibold flex items-center gap-2">
                      <span>{mod.label}</span>
                      <span className="text-xs text-gray-500 font-normal">
                        ({mod.packs.length} packs)
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {mod.packs.reduce(
                        (n: number, p: any) => n + p.items.length,
                        0
                      )}{" "}
                      mots
                    </div>
                  </div>
                </label>

                {/* bouton pour aller voir le détail des packs */}
                <div className="flex justify-end">
                  <button
                    className="px-3 py-1.5 text-sm rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold"
                    onClick={() => {
                      setModuleView(mod);
                      setSubPage("packs");
                    }}
                  >
                    Voir les packs →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Barre d'action quiz */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="text-sm text-gray-600">
            {getChosenPackNumbersForQuiz().length > 0
              ? `${getChosenPackNumbersForQuiz().length} pack(s) sélectionné(s) • ${getChosenWordCount()} mots`
              : "Aucune sélection pour l'instant"}
          </div>

          <button
            onClick={handleStartQuiz}
            className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold disabled:opacity-30"
            disabled={getChosenPackNumbersForQuiz().length === 0}
          >
            Lancer le quiz vocabulaire
          </button>

          <button
            onClick={onExit}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← Retour menu principal
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  // 2) PAGE : PACKS DANS UN MODULE
  // -------------------------------------------------
  if (subPage === "packs" && moduleView) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">
            {moduleView.label}
          </div>
          <div className="text-sm text-gray-600">
            Coche les packs que tu veux inclure dans le quiz.
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Astuce : si tu coches au moins un pack, ce seront SEULEMENT ces packs-là qui seront utilisés (les modules cochés seront ignorés).
          </div>
        </div>

        <div className="grid gap-4">
          {moduleView.packs.map((pack: any) => {
            const isChecked = selectedPacks.includes(pack.packNumber);
            return (
              <div
                key={pack.packNumber}
                className="rounded-xl border bg-white shadow-sm p-4 flex flex-col gap-3"
              >
                {/* ligne pack + checkbox */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-pink-500"
                    checked={isChecked}
                    onChange={() => togglePack(pack.packNumber)}
                  />

                  <div className="flex-1">
                    <div className="text-base font-semibold flex items-center gap-2">
                      <span>Pack {pack.packNumber}</span>
                      <span className="text-xs text-gray-500 font-normal">
                        ({pack.items.length} mots)
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {pack.title.replace(/^Vocab\s*–\s*/, "")}
                    </div>
                  </div>
                </label>

                {/* bouton pour lire les mots du pack */}
                <div className="flex justify-end">
                  <button
                    className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
                    onClick={() => {
                      setPackView(pack);
                      setSubPage("words");
                    }}
                  >
                    Voir les mots →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Barre d'action quiz */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="text-sm text-gray-600">
            {getChosenPackNumbersForQuiz().length > 0
              ? `${getChosenPackNumbersForQuiz().length} pack(s) sélectionné(s) • ${getChosenWordCount()} mots`
              : "Aucune sélection pour l'instant"}
          </div>

          <button
            onClick={handleStartQuiz}
            className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold disabled:opacity-30"
            disabled={getChosenPackNumbersForQuiz().length === 0}
          >
            Lancer le quiz vocabulaire
          </button>

          <div className="flex flex-col items-center gap-2 text-sm">
            <button
              onClick={() => setSubPage("modules")}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              ← Retour modules
            </button>
            <button
              onClick={onExit}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Menu principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  // 3) PAGE : LISTE DES MOTS D’UN PACK
  // -------------------------------------------------
  if (subPage === "words" && packView) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-xl font-bold mb-1">
            {packView.title.replace(/^Vocab\s*–\s*/, "")}
          </div>
          <div className="text-sm text-gray-600">
            {packView.items.length} mots
          </div>
          <div className="text-xs text-gray-400 mt-1">
            (On affiche seulement la traduction FR)
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm divide-y">
          {packView.items.map((it: any) => (
            <div
              key={it.id}
              className="p-3 text-base font-medium text-gray-900"
            >
              {it.french}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <button
            onClick={() => setSubPage("packs")}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          >
            ← Retour packs
          </button>

          <button
            onClick={onExit}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            Menu principal
          </button>
        </div>
      </div>
    );
  }

  // fallback
  return null;
}




// --------------------
// STYLES
// --------------------



/** Pool de lectures (pour génèr. de distracteurs) */
const READING_POOL = Array.from(new Set(DATA.flatMap(k => [...(k.kunyomi||[]), ...(k.onyomi||[])])));

/** ================== Utils ================== */
const unique = (arr) => Array.from(new Set(arr));
const splitFR = (s) => (s||"").split(/[;、,]/).map(t=>t.trim()).filter(Boolean);
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const stripAccents = (s) => (s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const normalize = (s) => stripAccents(s).trim().toLowerCase();
const VOCAB_WORDS = ALL_PACKS.flatMap((pack: any) => pack.items);

/** Kana -> rōmaji (Hepburn simplifié) */
function kanaToRomaji(input){
  if (!input) return "";
  const map = {
    "あ":"a","い":"i","う":"u","え":"e","お":"o","ア":"a","イ":"i","ウ":"u","エ":"e","オ":"o",
    "か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko","カ":"ka","キ":"ki","ク":"ku","ケ":"ke","コ":"ko",
    "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so","サ":"sa","シ":"shi","ス":"su","セ":"se","ソ":"so",
    "た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to","タ":"ta","チ":"chi","ツ":"tsu","テ":"te","ト":"to",
    "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no","ナ":"na","ニ":"ni","ヌ":"nu","ネ":"ne","ノ":"no",
    "は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho","ハ":"ha","ヒ":"hi","フ":"fu","ヘ":"he","ホ":"ho",
    "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","マ":"ma","ミ":"mi","ム":"mu","メ":"me","モ":"mo",
    "や":"ya","ゆ":"yu","よ":"yo","ヤ":"ya","ユ":"yu","ヨ":"yo",
    "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","ラ":"ra","リ":"ri","ル":"ru","レ":"re","ロ":"ro",
    "わ":"wa","を":"o","ワ":"wa","ヲ":"o","ん":"n","ン":"n",
    "が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","ガ":"ga","ギ":"gi","グ":"gu","ゲ":"ge","ゴ":"go",
    "ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo","ザ":"za","ジ":"ji","ズ":"zu","ゼ":"ze","ゾ":"zo",
    "だ":"da","ぢ":"ji","づ":"zu","で":"de","ど":"do","ダ":"da","ヂ":"ji","ヅ":"zu","デ":"de","ド":"do",
    "ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo","バ":"ba","ビ":"bi","ブ":"bu","ベ":"be","ボ":"bo",
    "ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po","パ":"pa","ピ":"pi","プ":"pu","ペ":"pe","ポ":"po",
    "ゃ":"ya","ゅ":"yu","ょ":"yo","ャ":"ya","ュ":"yu","ョ":"yo",
    "ぁ":"a","ぃ":"i","ぅ":"u","ぇ":"e","ぉ":"o","ァ":"a","ィ":"i","ゥ":"u","ェ":"e","ォ":"o",
    "っ":"*","ッ":"*","ー":"-"
  };
  const duo = {
    "きゃ":"kya","きゅ":"kyu","きょ":"kyo","しゃ":"sha","しゅ":"shu","しょ":"sho",
    "ちゃ":"cha","ちゅ":"chu","ちょ":"cho","にゃ":"nya","にゅ":"nyu","にょ":"nyo",
    "ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","みゃ":"mya","みゅ":"myu","みょ":"myo",
    "りゃ":"rya","りゅ":"ryu","りょ":"ryo","ぎゃ":"gya","ぎゅ":"gyu","ぎょ":"gyo",
    "じゃ":"ja","じゅ":"ju","じょ":"jo","びゃ":"bya","びゅ":"byu","びょ":"byo",
    "ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo",
    "キャ":"kya","キュ":"kyu","キョ":"kyo","シャ":"sha","シュ":"shu","ショ":"sho",
    "チャ":"cha","チュ":"chu","チョ":"cho","ニャ":"nya","ニュ":"nyu","ニョ":"nyo",
    "ヒャ":"hya","ヒュ":"hyu","ヒョ":"hyo","ミャ":"mya","ミュ":"myu","ミョ":"myo",
    "リャ":"rya","リュ":"ryu","リョ":"ryo","ギャ":"gya","ギュ":"gyu","ギョ":"gyo",
    "ジャ":"ja","ジュ":"ju","ジョ":"jo","ビャ":"bya","ビュ":"byu","ビョ":"byo",
    "ピャ":"pya","ピュ":"pyu","ピョ":"pyo"
  };
  const chars = Array.from(input);
  let out = "";
  for (let i=0;i<chars.length;i++){
    const ch = chars[i];
    const next = chars[i+1] ?? "";
    const pair = ch + next;
    if (duo[pair]) { out += duo[pair]; i++; continue; }
    if (ch === "っ" || ch === "ッ") {
      const romaNext = map[next] || "";
      if (romaNext) {
        const c = romaNext[0];
        if (/[bcdfghjklmnpqrstvwxyz]/.test(c)) out += c;
      }
      continue;
    }
    if (ch === "ー") { const m = out.match(/[aiueo]$/); if (m) out += m[0]; continue; }
    const roma = map[ch];
    out += roma ? roma : ch;
  }
  return out;
}

/** ======= Helpers pour kana & rōmaji ======= */
const isKana = (s) => /[\u3040-\u309F\u30A0-\u30FF]/.test(s);
const kataToHira = (s) =>
  Array.from(s).map(ch => {
    const code = ch.charCodeAt(0);
    return (code >= 0x30A1 && code <= 0x30F6) ? String.fromCharCode(code - 0x60) : ch;
  }).join("");
const normalizeKana = (s) => kataToHira(s).replace(/\s+/g, "").trim();

/** Normalisation rōmaji */
const norm = (s) => (s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

/** Sépare lectures par type — en rōmaji */
function getRomajiReadingsByType(k) {
  const kun = Array.from(new Set((k.kunyomi ?? []).filter(Boolean).map(kanaToRomaji).map(norm)));
  const on  = Array.from(new Set((k.onyomi  ?? []).filter(Boolean).map(kanaToRomaji).map(norm)));
  return { kun, on };
}

/** Sépare lectures par type — kana (hiragana) + rōmaji */
function getReadingsBothByType(k) {
  const kunKana = Array.from(new Set((k.kunyomi ?? []).filter(Boolean).map(normalizeKana)));
  const onKana  = Array.from(new Set((k.onyomi  ?? []).filter(Boolean).map(normalizeKana)));
  const kunRoma = Array.from(new Set(kunKana.map(x => norm(kanaToRomaji(x)))));
  const onRoma  = Array.from(new Set(onKana.map(x => norm(kanaToRomaji(x)))));
  return { kunKana, onKana, kunRoma, onRoma };
}

/** Pastilles colorées : KUN = bleu, ON = orange */
function ReadingChips({ kun = [], on = [], className = "" }) {
  return (
    <span className={`inline-flex flex-wrap gap-2 ${className}`}>
      {kun.map((r) => (
        <span key={`kun-${r}`} className="px-2 py-1 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">
          {r}
        </span>
      ))}
      {on.map((r) => (
        <span key={`on-${r}`} className="px-2 py-1 rounded-full border text-xs border-orange-300 bg-orange-50 text-orange-700">
          {r}
        </span>
      ))}
    </span>
  );
}

/** ================== Génération QCM ================== */
function padToFour(base, pool) {
  const out = [...base];
  let i = 0;
  while (out.length < 4 && i < pool.length) { if (!out.includes(pool[i])) out.push(pool[i]); i++; }
  while (out.length < 4) out.push("?");
  return out.slice(0,4);
}

function makeGeneralQuestions(fromKanji) {
  return fromKanji.flatMap(k => {
    const frTokens = splitFR(k.meaningFR);
    const correctFR = frTokens.length ? shuffle(frTokens)[0] : k.meaningFR;
    const otherFR = unique(fromKanji.filter(x=>x.id!==k.id).flatMap(x=>splitFR(x.meaningFR))).filter(m=>!frTokens.includes(m));
    const q1Choices = padToFour([correctFR, ...shuffle(otherFR).slice(0,3)], otherFR);

    const validRead = unique([...(k.kunyomi||[]), ...(k.onyomi||[])]);
    const correctRead = validRead.length ? shuffle(validRead)[0] : "?";
    const otherRead = unique(fromKanji.filter(x=>x.id!==k.id).flatMap(x=>[...(x.kunyomi||[]), ...(x.onyomi||[])])).filter(r=>r!==correctRead && !validRead.includes(r));
    const pool = unique([...otherRead, ...READING_POOL.filter(r=>r!==correctRead)]);
    const q2Choices = padToFour([correctRead, ...shuffle(pool).slice(0,3)], pool);

    return [
      { type: "fr",   prompt: `Quel est le sens de ${k.id} ? / ${k.id} の意味は？`,  choices: shuffle(q1Choices), correctValue: correctFR },
      { type: "read", prompt: `Lecture de ${k.id} ? / ${k.id} の読みは？`, choices: shuffle(q2Choices), correctValue: correctRead }
    ];
  });
}

function makeTradToKanjiQuestions(fromKanji) {
  return fromKanji.map(k => {
    const frTokens = splitFR(k.meaningFR);
    const promptFR = frTokens.length ? shuffle(frTokens)[0] : k.meaningFR;
    const others = unique(fromKanji.filter(x=>x.id!==k.id).map(x=>x.id));
    const choices = padToFour([k.id, ...shuffle(others).slice(0,3)], others);
    return { prompt: `Quel kanji correspond à "${promptFR}" ?`, choices: shuffle(choices), correctValue: k.id };
  });
}

/** ================== Sélecteur Kanji (avec lectures colorées) ================== */
function AllSelectable({ selectedIds, setSelectedIds }) {
  const toggle = id => { const next = new Set(selectedIds); next.has(id)?next.delete(id):next.add(id); setSelectedIds(next); };
  const selectAll = () => setSelectedIds(new Set(DATA.map(k=>k.id)));
  const clearAll = () => setSelectedIds(new Set());
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Sélectionne les kanji à réviser</div>
        <div className="flex gap-2 text-sm">
          <button onClick={selectAll} className="px-2 py-1 rounded bg-pink-200">Tout sélectionner</button>
          <button onClick={clearAll} className="px-2 py-1 rounded bg-gray-100">Effacer</button>
          <span className="px-2 py-1 rounded bg-gray-50">Sélection: {selectedIds.size}</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {DATA.map(k => {
          const kunKana = (k.kunyomi ?? []).map(normalizeKana);
          const onKana  = (k.onyomi  ?? []).map(normalizeKana);
          return (
            <label key={k.id} className={`p-3 rounded-xl border cursor-pointer ${selectedIds.has(k.id)?"bg-pink-100 border-pink-300":"bg-white hover:bg-gray-50"}`}>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" checked={selectedIds.has(k.id)} onChange={()=>toggle(k.id)} />
                <span className="text-xl font-bold mr-2">{k.id}</span>
                <span className="text-gray-600 text-sm">{k.meaningFR}</span>
              </div>
              {(kunKana.length>0 || onKana.length>0) && (
                <div className="mt-2">
                  <ReadingChips kun={kunKana} on={onKana} />
                </div>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}



/** ================== Quiz Kanji → Traduction (UNE seule bonne réponse suffit) ================== */
function QuizKanjiTrad({ picked, onBack, title }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | hit | miss | complete
  const autoNext = useRef(null);
  const results = useRef([]);

  const inputRef = useRef(null);
  useEffect(() => {
    if (started && !finished) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [started, finished, idx, status]);

  const normalizeFR = (s) => stripAccents(s).toLowerCase().replace(/\s+/g," ").trim();

  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setStatus("idle");
    results.current = [];
    setFinished(false);
    setStarted(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null;
    const k = order[idx];
    const prettyTokens = splitFR(k.meaningFR);                           // affichage (avec accents)
    const expected = Array.from(new Set(prettyTokens.map(normalizeFR))); // clés de comparaison
    return { id: k.id, expected, pretty: prettyTokens };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  const goNext = (ok, accepted) => {
    if (!currentQ) return;
    results.current.push({
      id: currentQ.id,
      ok,
      user: input,
      accepted,
      expected: currentQ.expected,
      pretty: currentQ.pretty,
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const val = normalizeFR(input);
    if (!val) return;

    const ok = currentQ.expected.includes(val);

    if (ok) {
      setStatus("hit");
      if (autoNext.current) clearTimeout(autoNext.current);
      autoNext.current = setTimeout(() => goNext(true, val), 500); // 0.5s
    } else {
      setStatus("miss");
      setInput("");
    }
  };

  const skip = () => goNext(false);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (
          <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">
            Score: {results.current.filter(r=>r.ok).length}/{results.current.length}
          </span>
        )}
      </div>

      {!started ? (
        <button
          onClick={start}
          disabled={picked.length===0}
          className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}
        >
          Commencer le {title}
        </button>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>
          <div className="text-6xl sm:text-7xl font-extrabold tracking-wide select-none">
            {currentQ?.id}
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400'
              : status==='hit' ? 'border-green-500'
              : ''
            }`}
            placeholder="Tape une traduction en français puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
            disabled={status==='hit'}
          />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || status==='hit'}
              className={`flex-1 p-3 rounded-xl text-white ${input.trim() && status!=='hit' ? 'bg-pink-400' : 'bg-gray-300'}`}
            >
              Valider
            </button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Incorrect. Réessaie ou clique sur “Suivant”.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Correct !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i) => (
            <div key={i} className="p-3 rounded-xl bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">{r.id}</div>
                <div className={r.ok ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {r.ok ? "Correct" : "Faux"}
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Ta réponse :</span> {r.user || "—"}
              </div>
              <div className="text-sm text-blue-600">
                Traductions acceptées : {r.pretty.join(", ")}
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** ================== Quiz Kanji → Lecture (kana OU rōmaji, récap KUN/ON en kana) ================== */
/** ================== Quiz Kanji → Lecture (uniquement aSavoir) ================== */
function QuizKanjiLecture({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // 1 question = 1 kanji → entrer TOUTES les lectures de aSavoir (kana OU rōmaji)
  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss" | "complete">("idle");

  // on stocke les réponses correctes trouvées sous forme de "clé" = rōmaji normalisé
  const [found, setFound] = useState<Set<string>>(new Set());
  const foundRef = useRef<Set<string>>(new Set());

  const autoNext = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useRef<
    Array<{
      id: string;
      expectedRoma: string[];  // romaji normalisés attendus (référence de comparaison)
      expectedKana: string[];  // mêmes lectures en kana (hiragana) pour affichage
      found: string[];         // romaji normalisés réellement trouvés
    }>
  >([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { foundRef.current = found; }, [found]);

  useEffect(() => {
    if (started && !finished) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [started, finished, idx, status]);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  // Helpers locaux (si déjà en utils, tu peux supprimer ces définitions et utiliser celles des utils)
  const onlyASavoirKana = (k: any) =>
    Array.from(new Set((k.aSavoir ?? []).filter(Boolean).map((x: string) => normalizeKana(x))));

  const buildOrder = (pool: any[]) => {
    // garde seulement les kanji qui ont aSavoir non vide
    const list = pool.filter(k => Array.isArray(k.aSavoir) && k.aSavoir.length > 0);
    return [...list].sort(() => Math.random() - 0.5);
  };

  const start = () => {
    const qs = buildOrder(picked);
    setOrder(qs);
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFound(new Set());
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as null | {
      id: string;
      expectedRoma: string[];
      expectedKana: string[];
    };
    const k = order[idx];

    // UNIQUEMENT aSavoir
    const expectedKana = onlyASavoirKana(k);
    const expectedRoma = Array.from(
      new Set(expectedKana.map((kana: string) => norm(kanaToRomaji(kana))))
    );

    return { id: k.id, expectedRoma, expectedKana };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;

    results.current.push({
      id: currentQ.id,
      expectedRoma: currentQ.expectedRoma,
      expectedKana: currentQ.expectedKana,
      found: Array.from(foundRef.current),
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setFound(new Set());
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const raw = input.trim();
    if (!raw) return;

    // Clé de comparaison = romaji normalisé
    let key: string | null = null;

    if (isKana(raw)) {
      const hira = normalizeKana(raw);
      // n'accepte en kana que si la lecture est bien dans aSavoir (kana)
      const matchKana = currentQ.expectedKana.includes(hira);
      if (matchKana) key = norm(kanaToRomaji(hira));
    } else {
      // romaji saisi
      key = norm(raw);
    }

    if (!key) { setStatus("miss"); setInput(""); return; }

    const ok = currentQ.expectedRoma.includes(key);
    const already = (foundRef.current).has(key);

    if (ok && !already) {
      const nxt = new Set(foundRef.current); nxt.add(key);
      setFound(nxt);
      setInput("");
      setStatus("hit");

      if (nxt.size === currentQ.expectedRoma.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500); // 0.5s
      }
    } else {
      setStatus("miss");
      setInput("");
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (<span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Quiz terminé</span>)}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length===0}
            className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Objectif : pour le <b>kanji affiché</b>, tape <b>toutes</b> les lectures de la liste <code>aSavoir</code> (en <b>kana</b> ou <b>rōmaji</b>), puis Entrée à chaque fois.
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          <div className="text-6xl sm:text-7xl font-extrabold tracking-wide select-none">
            {currentQ?.id ?? "—"}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Trouvées {found.size}/{currentQ?.expectedRoma.length ?? 0}
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            placeholder="Écris une lecture (kana OU rōmaji), puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()? "bg-pink-400":"bg-gray-300"}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Non attendu ou déjà saisi.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les lectures aSavoir trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.found);
            const missKana = r.expectedKana.filter(k => !foundSet.has(norm(kanaToRomaji(k))));
            const totalFound = foundSet.size;
            const totalExp = r.expectedRoma.length;

            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500 mr-1">Kanji :</span>
                    <span className="text-xl font-bold">{r.id}</span>
                  </div>
                  <div className={(missKana.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Lectures attendues (aSavoir, kana) :</span>{" "}
                  {r.expectedKana.map(k => (
                    <span key={k} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{k}</span>
                  ))}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Trouvées (romaji normalisés) :</span>{" "}
                  {r.found.length>0 ? r.found.map(rr => (
                    <span key={rr} className="inline-block mx-1 px-2 py-0.5 rounded-full bg-green-100 border border-green-300 text-xs">{rr}</span>
                  )) : "—"}
                </div>

                {missKana.length>0 && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">Manquantes :</span>{" "}
                    {missKana.map(k => (
                      <span key={k} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-red-300 bg-red-50 text-red-700">{k}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** ================== Quiz Traduction → Lecture (kana OU rōmaji, récap KUN/ON en kana) ================== */
/** ================== Quiz Traduction → Lecture (uniquement aSavoir) ================== */
function QuizTradLecture({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // 1 question = 1 kanji → on affiche la/les traductions FR, l’utilisateur donne TOUTES les lectures de aSavoir
  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss" | "complete">("idle");
  const [found, setFound] = useState<Set<string>>(new Set());      // clés romaji normalisées déjà trouvées
  const foundRef = useRef<Set<string>>(new Set());

  const autoNext = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useRef<Array<{
    id: string;
    meaningPretty: string[];
    expectedRoma: string[];  // romaji normalisés (référence)
    expectedKana: string[];  // kana (hiragana) pour affichage
    found: string[];         // romaji normalisés trouvés
  }>>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { foundRef.current = found; }, [found]);
  useEffect(() => {
    if (started && !finished) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [started, finished, idx, status]);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  // --------- helpers locaux : utilisent tes utils globaux ----------
  const buildOrder = (pool: any[]) => {
    // Ne garder que les kanji avec aSavoir non vide
    const withASavoir = pool.filter(k => Array.isArray(k.aSavoir) && k.aSavoir.length > 0);
    // Mélanger
    return [...withASavoir].sort(() => Math.random() - 0.5);
  };

  const start = () => {
    const qs = buildOrder(picked);
    setOrder(qs);
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFound(new Set());
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as null | {
      id: string;
      meaningPretty: string[];
      expectedRoma: string[];
      expectedKana: string[];
    };
    const k = order[idx];

    const meaningPretty = Array.from(
      new Set((k.meaningFR || "").split(/[;,、]/).map((s: string) => s.trim()).filter(Boolean))
    );

    // UNIQUEMENT aSavoir
    const expectedKana = Array.from(
      new Set((k.aSavoir ?? []).filter(Boolean).map((x: string) => normalizeKana(x)))
    );
    const expectedRoma = Array.from(
      new Set(expectedKana.map((kana: string) => norm(kanaToRomaji(kana))))
    );

    return { id: k.id, meaningPretty, expectedRoma, expectedKana };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;

    results.current.push({
      id: currentQ.id,
      meaningPretty: currentQ.meaningPretty,
      expectedRoma: currentQ.expectedRoma,
      expectedKana: currentQ.expectedKana,
      found: Array.from(foundRef.current),
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setFound(new Set());
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const raw = input.trim();
    if (!raw) return;

    // Clé de comparaison = romaji normalisé
    let key: string | null = null;

    if (isKana(raw)) {
      const hira = normalizeKana(raw);
      // n'accepte que si la lecture est bien dans aSavoir (kana)
      const matchKana = currentQ.expectedKana.includes(hira);
      if (matchKana) key = norm(kanaToRomaji(hira));
    } else {
      key = norm(raw);
    }

    if (!key) { setStatus("miss"); setInput(""); return; }

    const ok = currentQ.expectedRoma.includes(key);
    const already = (foundRef.current).has(key);

    if (ok && !already) {
      const nxt = new Set(foundRef.current); nxt.add(key);
      setFound(nxt);
      setInput("");
      setStatus("hit");

      if (nxt.size === currentQ.expectedRoma.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500); // 0.5s
      }
    } else {
      setStatus("miss");
      setInput("");
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (<span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Quiz terminé</span>)}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length===0}
            className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Objectif : tape <b>les</b> lectures de la liste <code>"à savoir"</code> (en <b>kana</b> ou en <b>rōmaji</b>), puis Entrée.
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Traduction(s) :</div>
            <div className="text-2xl font-semibold">{currentQ?.meaningPretty.join(" ／ ")}</div>
            <div className="text-xs text-gray-500 mt-1">
              Trouvées {found.size}/{currentQ?.expectedRoma.length ?? 0}
            </div>
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            placeholder="Écris une lecture (kana OU rōmaji), puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()? "bg-pink-400":"bg-gray-300"}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Non attendu ou déjà saisi.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les lectures trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.found);
            const missKana = r.expectedKana.filter(k => !foundSet.has(norm(kanaToRomaji(k))));
            const totalFound = foundSet.size;
            const totalExp = r.expectedRoma.length;

            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500 mr-1">Traductions :</span>
                    <span className="text-gray-800">{r.meaningPretty.join(" ／ ")}</span>
                  </div>
                  <div className={(missKana.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Lectures attendues (aSavoir, kana) :</span>{" "}
                  {r.expectedKana.map(k => <span key={k} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{k}</span>)}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Trouvées :</span>{" "}
                  {r.found.length>0 ? r.found.map(rr => <span key={rr} className="inline-block mx-1 px-2 py-0.5 rounded-full bg-green-100 border border-green-300 text-xs">{rr}</span>) : "—"}
                </div>

                {missKana.length>0 && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">Manquantes :</span>{" "}
                    {missKana.map(k => <span key={k} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-red-300 bg-red-50 text-red-700">{k}</span>)}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** ================== Quiz Traduction → Dessin/Saisie Kanji (IME 手書き ou frappe) ================== */
function DrawingPad({ onChangeStroke }: { onChangeStroke?: () => void }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = cvs.getBoundingClientRect();
    cvs.width = Math.max(1, Math.floor(rect.width * dpr));
    cvs.height = Math.max(1, Math.floor(rect.height * dpr));
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#111827";
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const cvs = canvasRef.current!;
    const rect = cvs.getBoundingClientRect();
    if ("touches" in e && e.touches[0]) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    const me = e as React.MouseEvent;
    return { x: me.clientX - rect.left, y: me.clientY - rect.top };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
    if (onChangeStroke) onChangeStroke();
  };
  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const end = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    e.preventDefault();
    setDrawing(false);
  };

  const clear = () => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-xs text-gray-500 mb-1">
        Espace d’entraînement (non utilisé pour la validation)
      </div>
      <div className="border rounded-xl bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-48 touch-none"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
      <div className="mt-2 text-right">
        <button onClick={clear} className="px-3 py-1 rounded bg-gray-100">
          Effacer
        </button>
      </div>
    </div>
  );
}

function QuizDrawKanji({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss">("idle");
  const autoNext = useRef<number | null>(null);
  const results = useRef<
    { id: string; ok: boolean; user: string; meaning: string }[]
  >([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (started && !finished) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
    return;
  }, [started, finished, idx, status]);

  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setStatus("idle");
    results.current = [];
    setFinished(false);
    setStarted(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as
      | { id: string; meaningFRTokens: string[]; meaningFull: string }
      | null;
    const k = order[idx];
    const fr = splitFR(k.meaningFR);
    return { id: k.id as string, meaningFRTokens: fr, meaningFull: k.meaningFR as string };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  useEffect(() => {
    return () => {
      if (autoNext.current) window.clearTimeout(autoNext.current);
    };
  }, []);

  const goNext = (ok: boolean) => {
    if (!currentQ) return;
    results.current.push({
      id: currentQ.id,
      ok,
      user: input.trim(),
      meaning: currentQ.meaningFull,
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const val = input.trim();
    if (!val) return;

    // On valide si le premier caractère non blanc est exactement le kanji attendu
    const firstChar = Array.from(val).find((ch) => /\S/.test(ch));
    const ok = firstChar === currentQ.id;

    if (ok) {
      setStatus("hit");
      if (autoNext.current) window.clearTimeout(autoNext.current);
      autoNext.current = window.setTimeout(() => goNext(true), 500); // 0.5s
    } else {
      setStatus("miss");
      // Laisse corriger sans vider
    }
  };

  const skip = () => goNext(false);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">
          ← Retour
        </button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">
          {picked.length} sélectionnés
        </span>
        {finished && (
          <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">
            Score: {results.current.filter((r) => r.ok).length}/{results.current.length}
          </span>
        )}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length === 0}
            className={`w-full p-3 rounded-xl text-white ${
              picked.length > 0 ? "bg-pink-400" : "bg-gray-300"
            }`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Astuce Téléphone : Active le clavier japonais et sélectionne le mode <b>手書き</b> pour dessiner
            le kanji
          </div>
          <div className="text-sm text-gray-600">
            Astuce Windows PC : Active le clavier japonais et sélectionne le <b>Pavé IME</b> pour dessiner le kanji
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">
            Question {idx + 1} / {total}
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Traduction(s) :</div>
            <div className="text-2xl font-semibold">
              {currentQ?.meaningFRTokens.join(" ／ ")}
            </div>
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            inputMode="text"
            className={`w-full max-w-md p-3 rounded-xl border text-3xl tracking-wider text-center ${
              status === "miss" ? "border-red-400" : status === "hit" ? "border-green-500" : ""
            }`}
            style={{
              fontFamily:
                '"Hiragino Mincho ProN","Yu Mincho","Yu Gothic","Hiragino Kaku Gothic ProN","Noto Serif JP","Noto Sans JP",system-ui,sans-serif',
            }}
            placeholder="Dessine/tape le kanji ici puis Entrée"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <DrawingPad onChangeStroke={() => {}} />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || status === "hit"}
              className={`flex-1 p-3 rounded-xl text-white ${
                input.trim() && status !== "hit" ? "bg-pink-400" : "bg-gray-300"
              }`}
            >
              Valider
            </button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">
              Suivant
            </button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {Math.max(0, total - idx - 1)}</span>
          </div>

          {status === "miss" && (
            <div className="text-sm text-red-600">Ce caractère ne correspond pas. Corrige et réessaie.</div>
          )}
          {status === "hit" && <div className="text-sm text-green-600">Correct !</div>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r, i) => (
            <div key={i} className="p-3 rounded-xl bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">{r.meaning}</div>
                <div className={r.ok ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {r.ok ? "Correct" : "Faux"}
                </div>
              </div>
              <div className="text-2xl">
                <span className="text-gray-500 mr-2">Saisi :</span> {r.user || "—"}
              </div>
              <div className="text-2xl">
                <span className="text-gray-500 mr-2">Attendu :</span> {r.id}
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">
              Recommencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** ================== Quiz Lecture KUN → Dessin/Saisie Kanji (multi-kanji si KUN partagé) ================== */
/** ================== Quiz Lecture → Kanji (uniquement aSavoir) ================== */
function QuizKunToDraw({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // 1 question = 1 lecture (kana) → N kanji attendus
  const [order, setOrder] = useState<{ reading: string; expectedIds: string[] }[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss" | "complete">("idle");
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set()); // kanji déjà saisis pour la lecture courante
  const foundIdsRef = useRef<Set<string>>(new Set());

  const autoNext = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useRef<Array<{reading:string; expectedIds:string[]; foundIds:string[]}>>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { foundIdsRef.current = foundIds; }, [foundIds]);
  useEffect(() => {
    if (started && !finished) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [started, finished, idx, status]);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  // --------- helpers locaux ----------
  const isKana = (s: string) => /[\u3040-\u309F\u30A0-\u30FF]/.test((s||"").trim());
  const kataToHira = (s: string) =>
    Array.from(s).map(ch => {
      const code = ch.charCodeAt(0);
      return (code >= 0x30A1 && code <= 0x30F6) ? String.fromCharCode(code - 0x60) : ch;
    }).join("");
  const normalizeKana = (s: string) => kataToHira(s).replace(/\s+/g, "").trim();

  // Utilise UNIQUEMENT aSavoir ; si vide → pas de question pour ce kanji
  const readingsForASavoir = (k: any) =>
    Array.from(new Set((k.aSavoir ?? []).filter(Boolean).map(normalizeKana)));

  // Construit les questions : 1 lecture → liste des kanji qui la portent
  const buildQuestions = (pool: any[]) => {
    const byReading = new Map<string, Set<string>>();
    pool.forEach(k => {
      const readings = readingsForASavoir(k); // <= UNIQUEMENT aSavoir
      readings.forEach(r => {
        if (!byReading.has(r)) byReading.set(r, new Set());
        byReading.get(r)!.add(k.id);
      });
    });
    const questions = Array.from(byReading.entries())
      .map(([reading, set]) => ({ reading, expectedIds: Array.from(set) }))
      .filter(q => q.expectedIds.length > 0);
    return [...questions].sort(() => Math.random() - 0.5);
  };

  const start = () => {
    const qs = buildQuestions(picked);
    setOrder(qs);
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFoundIds(new Set());
    results.current = [];
    setFinished(false);
    setStarted(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as { reading: string; expectedIds: string[] } | null;
    return order[idx];
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;
    results.current.push({
      reading: currentQ.reading,
      expectedIds: currentQ.expectedIds,
      foundIds: Array.from(foundIdsRef.current),
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setFoundIds(new Set());
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const raw = input.trim();
    if (!raw) return;

    // Premier caractère non-blanc saisi → doit être un kanji attendu
    const firstChar = Array.from(raw).find(ch => /\S/.test(ch)) ?? "";
    const isExpected = currentQ.expectedIds.includes(firstChar);
    const already = foundIdsRef.current.has(firstChar);

    if (isExpected && !already) {
      const nxt = new Set(foundIdsRef.current); nxt.add(firstChar);
      setFoundIds(nxt);
      setStatus("hit");
      setInput(""); // prêt pour le suivant

      if (nxt.size === currentQ.expectedIds.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500); // 0.5s
      }
    } else {
      setStatus("miss");
      // on laisse l'input tel quel pour corriger si besoin
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (<span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Quiz terminé</span>)}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length===0}
            className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Objectif : pour une <b>lecture</b> (kana) de la liste <code>aSavoir</code>, saisis <b>tous les kanji</b> correspondants (IME <b>手書き</b> ou frappe), puis Entrée à chaque kanji.
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Lecture (à savoir) :</div>
            <div className="text-3xl font-extrabold tracking-wide select-none">
              {currentQ?.reading || "—"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Attendus : {foundIds.size}/{currentQ?.expectedIds.length ?? 0}
            </div>
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            inputMode="text"
            className={`w-full max-w-md p-3 rounded-xl border text-3xl tracking-wider text-center ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            style={{ fontFamily: `"Hiragino Mincho ProN","Yu Mincho","Yu Gothic","Hiragino Kaku Gothic ProN","Noto Serif JP","Noto Sans JP",system-ui,sans-serif` }}
            placeholder="Saisis un kanji correspondant puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          {/* (optionnel) petit espace pour lister ce qui a été trouvé */}
          <div className="flex flex-wrap gap-2 max-w-md">
            {Array.from(foundIds).map(k => (
              <span key={k} className="px-2 py-1 rounded-full bg-green-100 border border-green-300 text-lg">{k}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || status==='complete'}
              className={`flex-1 p-3 rounded-xl text-white ${input.trim() && status!=='complete' ? 'bg-pink-400' : 'bg-gray-300'}`}
            >
              Valider
            </button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Pas attendu, déjà saisi, ou caractère invalide.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien — continue.</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Tous les kanji pour cette lecture ont été saisis !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>    
          {(() => {
  const totalQuestions = results.current.length;
  const totalGood = results.current.reduce((acc, r) => {
    const foundSet = new Set(r.foundIds);
    const ok = r.expectedIds.every(id => foundSet.has(id));
    return acc + (ok ? 1 : 0);
  }, 0);
  return (
    <div className="p-3 rounded-xl bg-pink-50 text-center font-semibold text-gray-800">
      Score global : {totalGood}/{totalQuestions}
    </div>
  );
})()}
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.foundIds);
            const miss = r.expectedIds.filter(id => !foundSet.has(id));
            const totalFound = foundSet.size;
            const totalExp = r.expectedIds.length;

            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500 mr-1">Lecture :</span>
                    <span className="px-2 py-1 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{r.reading}</span>
                  </div>
                  <div className={(miss.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Trouvés :</span>{" "}
                  {totalFound>0 ? r.foundIds.map(id=>(
                    <span key={id} className="inline-block mx-1 text-lg">{id}</span>
                  )) : "—"}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Attendues :</span>{" "}
                  {r.expectedIds.map(id=>(
                    <span key={id} className="inline-block mx-1 text-lg">{id}</span>
                  ))}
                </div>

                {miss.length>0 && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">Manquantes :</span>{" "}
                    {miss.map(id=>(
                      <span key={id} className="inline-block mx-1 text-lg">{id}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}


function normalizeAnswer(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[\sー\-]/g, "")
    .replace(/ou/g, "o")
    .replace(/uu/g, "u")
    .replace(/ou/g, "o")
    .replace(/nn/g, "n")
    .trim();
}

function getAcceptedReadingsForItem(item: any) {
  const readings = [];

  if (item.reading) readings.push(normalizeAnswer(item.reading));

  // Si le mot a plusieurs lectures séparées par des / ou 、 les découper
  if (item.readings) {
    item.readings.forEach((r: string) =>
      readings.push(normalizeAnswer(r))
    );
  }

  return Array.from(new Set(readings)); // retire les doublons
}


// Retourne la liste des packs qu'on doit utiliser pour le quiz vocabulaire,
// en respectant la règle : si des packs sont cochés → on ignore les modules
function getChosenPackNumbersForQuizFromSelection(
  selectedModules: number[],
  selectedPacks: number[]
) {
  // si l'utilisateur a choisi des packs précis → priorité à ça
  if (selectedPacks.length > 0) {
    return Array.from(new Set(selectedPacks));
  }

  // sinon on prend tous les packs associés aux modules sélectionnés
  const packsFromModules: number[] = [];
  MODULES.forEach((m) => {
    if (selectedModules.includes(m.moduleNumber)) {
      m.packs.forEach((p: any) => {
        packsFromModules.push(p.packNumber);
      });
    }
  });

  return Array.from(new Set(packsFromModules));
}

// Construit la liste de mots à partir d'une liste de numéros de packs
function buildWordPoolFromPackNumbers(packNumbers: number[]) {
  const pool: any[] = [];
  ALL_PACKS.forEach((pack: any) => {
    if (packNumbers.includes(pack.packNumber)) {
      // ajoute chaque mot de ce pack
      pack.items.forEach((it: any) => {
        pool.push(it);
      });
    }
  });
  return pool;
}

// Fabrique la liste de mots QUI SERONT QUIZZÉS
function getActiveVocabPool(
  selectedModules: number[],
  selectedPacks: number[]
) {
  const chosenPackNumbers = getChosenPackNumbersForQuizFromSelection(
    selectedModules,
    selectedPacks
  );
  return buildWordPoolFromPackNumbers(chosenPackNumbers);
}




/** ================== QUIZ VOCABULAIRE ================== */

/** ================== QUIZ VOC TRAD/LECTURE ================== */

function QuizVocabTraductionLecture({
  onExit,
  selectedModules,
  selectedPacks,
}: {
  onExit: () => void;
  selectedModules: number[];
  selectedPacks: number[];
}) {
  // pool des mots à interroger (en fonction de la sélection actuelle)
  const [pool, setPool] = React.useState<any[]>([]);

  // mot courant
  const [current, setCurrent] = React.useState<any>(null);

  // réponse utilisateur
  const [input, setInput] = React.useState("");
  const [checked, setChecked] = React.useState<null | "good" | "bad">(null);

  // Recalcule le pool à l'ouverture du quiz (ou quand sélection change)
  React.useEffect(() => {
    const newPool = getActiveVocabPool(selectedModules, selectedPacks);

    // si aucun mot dans la sélection => fallback sur tout le vocab
    const finalPool =
      newPool.length > 0
        ? newPool
        : ALL_PACKS.flatMap((p: any) => p.items);

    setPool(finalPool);
  }, [selectedModules, selectedPacks]);

  // Quand le pool est prêt ou a changé, on choisit un mot
  React.useEffect(() => {
    if (pool.length > 0) {
      pickRandomWord(pool);
    } else {
      setCurrent(null);
    }
  }, [pool]);

  function pickRandomWord(source: any[] = pool) {
    if (!source || source.length === 0) {
      setCurrent(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * source.length);
    const word = source[randomIndex];
    setCurrent(word);
    setInput("");
    setChecked(null);
  }

  if (!current) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">
          Il n'y a pas de vocabulaire sélectionné.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          (Va dans l’onglet “Vocabulaire” et coche un module ou des packs)
        </p>
        <button
          onClick={onExit}
          className="mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
        >
          ← Retour
        </button>
      </div>
    );
  }

  // lectures acceptées pour ce mot
  const accepted = getAcceptedReadingsForItem(current);

  function checkAnswer() {
    const user = normalizeAnswer(input);
    if (!user) return;

    if (accepted.includes(user)) {
      setChecked("good");
    } else {
      setChecked("bad");
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-xl font-bold text-pink-600 mb-1">
          Traduction → Lecture
        </div>
        <div className="text-sm text-gray-600">
          Écris la lecture japonaise (kana ou rōmaji)
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {pool.length} mots dans le quiz
        </div>
      </div>

      {/* MOT COURANT */}
      <div className="mb-6 p-4 rounded-xl bg-white shadow border text-center">
        <div className="text-gray-500 text-sm mb-1">Traduction :</div>
        <div className="text-2xl font-semibold">{current.french}</div>
      </div>

      {/* INPUT RÉPONSE */}
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (checked === null) {
              checkAnswer();
            } else {
              pickRandomWord();
            }
          }
        }}
        placeholder="écris la lecture..."
        className="w-full border rounded-lg px-3 py-2 text-lg outline-none focus:ring-2 focus:ring-pink-400"
      />

      {/* ACTIONS + FEEDBACK */}
      <div className="mt-4 flex flex-col items-center gap-3">

        <div className="flex flex-col sm:flex-row gap-2">
          {checked === null && (
            <button
              onClick={checkAnswer}
              className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold text-center"
            >
              Valider
            </button>
          )}

          {/* bouton Suivant toujours actif */}
          <button
            onClick={() => pickRandomWord()}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-center"
          >
            Suivant →
          </button>
        </div>

        {checked === "good" && (
          <div className="text-green-600 font-semibold">
            ✔ Correct !
          </div>
        )}

        {checked === "bad" && (
          <div className="text-red-600 font-semibold">
            ✘ Faux
          </div>
        )}
      </div>

      {/* QUITTER */}
      <div className="mt-8 text-center">
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
        >
          ← Retour
        </button>
      </div>
    </div>
  );
}


/** ================== QUIZ COMPLET ================== */


/** ================== Quiz Traduction → Lecture (KUN + ON, complet) ================== */
function QuizTradLectureComplete({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // 1 question = 1 kanji → afficher les traductions FR ; saisir TOUTES les lectures (KUN + ON)
  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss" | "complete">("idle");

  // on mémorise ce qui est trouvé en rōmaji normalisé (clé)
  const [found, setFound] = useState<Set<string>>(new Set());
  const foundRef = useRef<Set<string>>(new Set());

  const autoNext = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useRef<Array<{
    id: string;
    meaningPretty: string[];
    expectedRoma: string[];  // toutes lectures en romaji normalisés (référence)
    expectedKana: string[];  // mêmes lectures en kana (hiragana) pour affichage
    found: string[];         // romaji normalisés réellement trouvés
    kunKana: string[];       // pour récap par couleur (bleu)
    onKana: string[];        // pour récap par couleur (orange)
  }>>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { foundRef.current = found; }, [found]);

  useEffect(() => {
    if (started && !finished) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [started, finished, idx, status]);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  // Helpers locaux simples (si tu as déjà ces helpers globaux, tu peux enlever ces définitions)
  const isKanaLocal = (s: string) => /[\u3040-\u309F\u30A0-\u30FF]/.test((s||"").trim());
  const kataToHira = (s: string) =>
    Array.from(s).map(ch => {
      const code = ch.charCodeAt(0);
      return (code >= 0x30A1 && code <= 0x30F6) ? String.fromCharCode(code - 0x60) : ch;
    }).join("");
  const normalizeKanaLocal = (s: string) => kataToHira(s).replace(/\s+/g, "").trim();

  const splitFR = (s: string) =>
    (s || "").split(/[;、,]/).map(t=>t.trim()).filter(Boolean);

  const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

  const buildOrder = (pool: any[]) => {
    // garde les kanji qui ont au moins une lecture (kunyomi ou onyomi)
    const list = pool.filter(k =>
      (Array.isArray(k.kunyomi) && k.kunyomi.length) ||
      (Array.isArray(k.onyomi)  && k.onyomi.length)
    );
    return [...list].sort(() => Math.random() - 0.5);
  };

  const start = () => {
    const qs = buildOrder(picked);
    setOrder(qs);
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFound(new Set());
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as null | {
      id: string;
      meaningPretty: string[];
      expectedRoma: string[];
      expectedKana: string[];
      kunKana: string[];
      onKana: string[];
    };
    const k = order[idx];

    const meaningPretty = unique(splitFR(k.meaningFR));
    const kunKana = unique((k.kunyomi ?? []).filter(Boolean).map((x: string) => normalizeKanaLocal(x)));
    const onKana  = unique((k.onyomi  ?? []).filter(Boolean).map((x: string) => normalizeKanaLocal(x)));
    const expectedKana = unique([...kunKana, ...onKana]);

    const expectedRoma = unique(expectedKana.map((kana: string) => norm(kanaToRomaji(kana))));

    return { id: k.id, meaningPretty, expectedRoma, expectedKana, kunKana, onKana };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;

    results.current.push({
      id: currentQ.id,
      meaningPretty: currentQ.meaningPretty,
      expectedRoma: currentQ.expectedRoma,
      expectedKana: currentQ.expectedKana,
      found: Array.from(foundRef.current),
      kunKana: currentQ.kunKana,
      onKana: currentQ.onKana,
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setFound(new Set());
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const raw = input.trim();
    if (!raw) return;

    let key: string | null = null; // romaji normalisé

    if (isKanaLocal(raw)) {
      const hira = normalizeKanaLocal(raw);
      // en mode “complet”, on accepte kana s’il est dans KUN+ON
      const matchKana = currentQ.expectedKana.includes(hira);
      if (matchKana) key = norm(kanaToRomaji(hira));
    } else {
      key = norm(raw);
    }

    if (!key) { setStatus("miss"); setInput(""); return; }

    const ok = currentQ.expectedRoma.includes(key);
    const already = (foundRef.current).has(key);

    if (ok && !already) {
      const nxt = new Set(foundRef.current); nxt.add(key);
      setFound(nxt);
      setInput("");
      setStatus("hit");

      if (nxt.size === currentQ.expectedRoma.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500); // 0.5s
      }
    } else {
      setStatus("miss");
      setInput("");
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (<span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Quiz terminé</span>)}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length===0}
            className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-500":"bg-gray-300"}`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Objectif : tape <b>toutes</b> les lectures (en <b>kana</b> ou en <b>rōmaji</b>) pour la traduction affichée, puis Entrée à chaque lecture.
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          <div className="text-6xl sm:text-7xl font-extrabold tracking-wide select-none">{currentQ?.id ?? "—"}</div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Traduction(s) :</div>
            <div className="text-2xl font-semibold">{currentQ?.meaningPretty.join(" ／ ")}</div>
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Trouvées {found.size}/{currentQ?.expectedRoma.length ?? 0}
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            placeholder="Écris une lecture (kana OU rōmaji), puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()? "bg-pink-500":"bg-gray-300"}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Non attendu ou déjà saisi.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les lectures trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.found);
            const missKana = r.expectedKana.filter(k => !foundSet.has(norm(kanaToRomaji(k))));
            const totalFound = foundSet.size;
            const totalExp = r.expectedRoma.length;

            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500 mr-1">Kanji :</span>
                    <span className="text-xl font-bold">{r.id}</span>
                  </div>
                  <div className={(missKana.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Lectures KUN (kana) :</span>{" "}
                  {r.kunKana.length ? r.kunKana.map(k => (
                    <span key={`kun-${k}`} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{k}</span>
                  )) : "—"}
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Lectures ON (kana) :</span>{" "}
                  {r.onKana.length ? r.onKana.map(k => (
                    <span key={`on-${k}`} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-orange-300 bg-orange-50 text-orange-700">{k}</span>
                  )) : "—"}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Trouvées (romaji normalisés) :</span>{" "}
                  {r.found.length>0 ? r.found.map(rr => (
                    <span key={rr} className="inline-block mx-1 px-2 py-0.5 rounded-full bg-green-100 border border-green-300 text-xs">{rr}</span>
                  )) : "—"}
                </div>

                {missKana.length>0 && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">Manquantes :</span>{" "}
                    {missKana.map(k => (
                      <span key={k} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-red-300 bg-red-50 text-red-700">{k}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}


/** ================== Quiz Kanji → Lecture (KUN + ON, complet) ================== */
function QuizKanjiLectureComplete({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss" | "complete">("idle");

  const [found, setFound] = useState<Set<string>>(new Set()); // clés en rōmaji normalisé
  const foundRef = useRef<Set<string>>(new Set());

  const autoNext = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useRef<Array<{
    id: string;
    expectedRoma: string[];
    expectedKana: string[];
    kunKana: string[];
    onKana: string[];
    found: string[];
  }>>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { foundRef.current = found; }, [found]);
  useEffect(() => { if (started && !finished) { const t = setTimeout(()=>inputRef.current?.focus(), 0); return () => clearTimeout(t); } }, [started, finished, idx, status]);
  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  // Helpers locaux légers (si tu as déjà les mêmes en utils, remplace-les par tes imports)
  const isKanaLocal = (s: string) => /[\u3040-\u309F\u30A0-\u30FF]/.test((s||"").trim());
  const kataToHira = (s: string) =>
    Array.from(s).map(ch => {
      const code = ch.charCodeAt(0);
      return (code >= 0x30A1 && code <= 0x30F6) ? String.fromCharCode(code - 0x60) : ch;
    }).join("");
  const normalizeKanaLocal = (s: string) => kataToHira(s).replace(/\s+/g, "").trim();
  const uniqueLocal = <T,>(arr: T[]) => Array.from(new Set(arr));

  const buildOrder = (pool: any[]) => {
    const list = pool.filter(k =>
      (Array.isArray(k.kunyomi) && k.kunyomi.length) ||
      (Array.isArray(k.onyomi)  && k.onyomi.length)
    );
    return [...list].sort(() => Math.random() - 0.5);
  };

  const start = () => {
    const qs = buildOrder(picked);
    setOrder(qs);
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFound(new Set());
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as null | {
      id: string;
      expectedRoma: string[];
      expectedKana: string[];
      kunKana: string[];
      onKana: string[];
    };
    const k = order[idx];

    const kunKana = uniqueLocal((k.kunyomi ?? []).filter(Boolean).map((x: string) => normalizeKanaLocal(x)));
    const onKana  = uniqueLocal((k.onyomi  ?? []).filter(Boolean).map((x: string) => normalizeKanaLocal(x)));
    const expectedKana = uniqueLocal([...kunKana, ...onKana]);
    const expectedRoma = uniqueLocal(expectedKana.map((kana: string) => norm(kanaToRomaji(kana))));

    return { id: k.id, expectedRoma, expectedKana, kunKana, onKana };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;
    results.current.push({
      id: currentQ.id,
      expectedRoma: currentQ.expectedRoma,
      expectedKana: currentQ.expectedKana,
      kunKana: currentQ.kunKana,
      onKana: currentQ.onKana,
      found: Array.from(foundRef.current),
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setFound(new Set());
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const raw = input.trim();
    if (!raw) return;

    let key: string | null = null; // romaji normalisé
    if (isKanaLocal(raw)) {
      const hira = normalizeKanaLocal(raw);
      const matchKana = currentQ.expectedKana.includes(hira);
      if (matchKana) key = norm(kanaToRomaji(hira));
    } else {
      key = norm(raw);
    }

    if (!key) { setStatus("miss"); setInput(""); return; }

    const ok = currentQ.expectedRoma.includes(key);
    const already = foundRef.current.has(key);

    if (ok && !already) {
      const nxt = new Set(foundRef.current); nxt.add(key);
      setFound(nxt);
      setInput("");
      setStatus("hit");

      if (nxt.size === currentQ.expectedRoma.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500);
      }
    } else {
      setStatus("miss");
      setInput("");
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (<span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Quiz terminé</span>)}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length===0}
            className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-500":"bg-gray-300"}`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Objectif : pour le <b>kanji affiché</b>, tape <b>toutes</b> les lectures <b>KUN + ON</b> (en <b>kana</b> ou en <b>rōmaji</b>), puis Entrée à chaque lecture.
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          <div className="text-6xl sm:text-7xl font-extrabold tracking-wide select-none">
            {currentQ?.id ?? "—"}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Trouvées {found.size}/{currentQ?.expectedRoma.length ?? 0}
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            placeholder="Écris une lecture (kana OU rōmaji), puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()? "bg-pink-500":"bg-gray-300"}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Non attendu ou déjà saisi.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les lectures trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.found);
            const missKana = r.expectedKana.filter(k => !foundSet.has(norm(kanaToRomaji(k))));
            const totalFound = foundSet.size;
            const totalExp = r.expectedRoma.length;

            return (
              <div key={i} className="p-3 rounded-2xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500 mr-1">Kanji :</span>
                    <span className="text-xl font-bold">{r.id}</span>
                  </div>
                  <div className={(missKana.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Lectures KUN (kana) :</span>{" "}
                  {r.kunKana.length ? r.kunKana.map(k => (
                    <span key={`kun-${k}`} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{k}</span>
                  )) : "—"}
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Lectures ON (kana) :</span>{" "}
                  {r.onKana.length ? r.onKana.map(k => (
                    <span key={`on-${k}`} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-orange-300 bg-orange-50 text-orange-700">{k}</span>
                  )) : "—"}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Trouvées (romaji normalisés) :</span>{" "}
                  {r.found.length>0 ? r.found.map(rr => (
                    <span key={rr} className="inline-block mx-1 px-2 py-0.5 rounded-full bg-green-100 border border-green-300 text-xs">{rr}</span>
                  )) : "—"}
                </div>

                {missKana.length>0 && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">Manquantes :</span>{" "}
                    {missKana.map(k => (
                      <span key={k} className="inline-block mx-1 px-2 py-0.5 rounded-full border text-xs border-red-300 bg-red-50 text-red-700">{k}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** ================== Quiz Lecture → Kanji (KUN + ON, complet) ================== */
function QuizLectureKanjiComplete({
  picked,
  onBack,
  title,
}: {
  picked: any[];
  onBack: () => void;
  title: string;
}) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // 1 question = 1 lecture (kana) → N kanji attendus
  const [order, setOrder] = useState<{ reading: string; expectedIds: string[] }[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "hit" | "miss" | "complete">("idle");
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());
  const foundIdsRef = useRef<Set<string>>(new Set());

  const autoNext = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useRef<Array<{ reading: string; expectedIds: string[]; foundIds: string[] }>>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { foundIdsRef.current = foundIds; }, [foundIds]);
  useEffect(() => { if (started && !finished) { const t = setTimeout(()=>inputRef.current?.focus(), 0); return () => clearTimeout(t); } }, [started, finished, idx, status]);
  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  // Helpers locaux (si tu as déjà ces utils globaux, tu peux enlever ces définitions)
  const isKanaLocal = (s: string) => /[\u3040-\u309F\u30A0-\u30FF]/.test((s||"").trim());
  const kataToHira = (s: string) =>
    Array.from(s).map(ch => {
      const code = ch.charCodeAt(0);
      return (code >= 0x30A1 && code <= 0x30F6) ? String.fromCharCode(code - 0x60) : ch;
    }).join("");
  const normalizeKanaLocal = (s: string) => kataToHira(s).replace(/\s+/g, "").trim();

  const uniqueLocal = <T,>(arr: T[]) => Array.from(new Set(arr));
  const shuffleLocal = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  // Construit: lecture kana (KUN+ON) → set de kanji ayant cette lecture parmi "picked"
  const buildQuestions = (pool: any[]) => {
    const byReading = new Map<string, Set<string>>();
    pool.forEach(k => {
      const kuns = uniqueLocal((k.kunyomi ?? []).filter(Boolean).map((x: string) => normalizeKanaLocal(x)));
      const ons  = uniqueLocal((k.onyomi  ?? []).filter(Boolean).map((x: string) => normalizeKanaLocal(x)));
      const all  = uniqueLocal([...kuns, ...ons]);
      all.forEach(r => {
        if (!byReading.has(r)) byReading.set(r, new Set());
        byReading.get(r)!.add(k.id);
      });
    });
    return shuffleLocal(
      Array.from(byReading.entries())
        .map(([reading, set]) => ({ reading, expectedIds: Array.from(set) }))
        .filter(q => q.expectedIds.length > 0)
    );
  };

  const start = () => {
    const qs = buildQuestions(picked);
    setOrder(qs);
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFoundIds(new Set());
    results.current = [];
    setFinished(false);
    setStarted(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null as { reading: string; expectedIds: string[] } | null;
    return order[idx];
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;
    results.current.push({
      reading: currentQ.reading,
      expectedIds: currentQ.expectedIds,
      foundIds: Array.from(foundIdsRef.current),
    });
    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setStatus("idle");
      setFoundIds(new Set());
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const raw = input.trim();
    if (!raw) return;

    // On lit 1 caractère kanji (premier non-espace)
    const firstChar = Array.from(raw).find(ch => /\S/.test(ch)) ?? "";
    const isExpected = currentQ.expectedIds.includes(firstChar);
    const already = foundIdsRef.current.has(firstChar);

    if (isExpected && !already) {
      const nxt = new Set(foundIdsRef.current); nxt.add(firstChar);
      setFoundIds(nxt);
      setStatus("hit");
      setInput("");

      if (nxt.size === currentQ.expectedIds.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500); // 0.5s
      }
    } else {
      setStatus("miss");
      // on laisse l’input pour corriger, ou vide si tu préfères:
      // setInput("");
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {finished && (<span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Quiz terminé</span>)}
      </div>

      {!started ? (
        <div className="space-y-3">
          <button
            onClick={start}
            disabled={picked.length===0}
            className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-500":"bg-gray-300"}`}
          >
            Commencer le {title}
          </button>
          <div className="text-sm text-gray-600">
            Objectif : pour une <b>lecture</b> (kana) affichée, saisis <b>tous les kanji</b> qui portent cette lecture (KUN ou ON) parmi ta sélection. Tape un kanji et appuie sur Entrée.
          </div>
        </div>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-5 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Lecture (kana) :</div>
            <div className="text-3xl font-extrabold tracking-wide select-none">{currentQ?.reading || "—"}</div>
            <div className="text-xs text-gray-500 mt-1">
              Attendus : {foundIds.size}/{currentQ?.expectedIds.length ?? 0}
            </div>
          </div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            inputMode="text"
            className={`w-full max-w-md p-3 rounded-xl border text-3xl tracking-wider text-center ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            style={{ fontFamily: `"Hiragino Mincho ProN","Yu Mincho","Yu Gothic","Hiragino Kaku Gothic ProN","Noto Serif JP","Noto Sans JP",system-ui,sans-serif` }}
            placeholder="Saisis un kanji correspondant puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="flex flex-wrap gap-2 max-w-md">
            {Array.from(foundIds).map(k => (
              <span key={k} className="px-2 py-1 rounded-full bg-green-100 border border-green-300 text-lg">{k}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || status==='complete'}
              className={`flex-1 p-3 rounded-xl text-white ${input.trim() && status!=='complete' ? 'bg-pink-500' : 'bg-gray-300'}`}
            >
              Valider
            </button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Pas attendu, déjà saisi, ou caractère invalide.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien — continue.</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Tous les kanji pour cette lecture ont été saisis !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.foundIds);
            const miss = r.expectedIds.filter(id => !foundSet.has(id));
            const totalFound = foundSet.size;
            const totalExp = r.expectedIds.length;

            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="text-gray-500 mr-1">Lecture :</span>
                    <span className="px-2 py-1 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{r.reading}</span>
                  </div>
                  <div className={(miss.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>

                <div className="text-sm mb-1">
                  <span className="text-gray-500">Trouvés :</span>{" "}
                  {r.foundIds.length>0 ? r.foundIds.map(id=>(
                    <span key={id} className="inline-block mx-1 text-lg">{id}</span>
                  )) : "—"}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Attendues :</span>{" "}
                  {r.expectedIds.map(id=>(
                    <span key={id} className="inline-block mx-1 text-lg">{id}</span>
                  ))}
                </div>

                {miss.length>0 && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">Manquantes :</span>{" "}
                    {miss.map(id=>(
                      <span key={id} className="inline-block mx-1 text-lg">{id}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button onClick={start} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** ================== Menu Quiz Kanji / Vocabulaire ================== */

/** ================== Menu type de Quiz (Kanji | Vocabulaire) ================== */
function QuizTypeMenu({ setQuizSection }: { setQuizSection: (s:'kanji'|'vocab')=>void }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="text-lg font-semibold mb-2">Choisis le type de quiz</div>
      <button onClick={()=>setQuizSection('kanji')} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Kanji
      </button>
      <button onClick={()=>setQuizSection('vocab')} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Vocabulaire
      </button>
    </div>
  );
}

/** ================== Sous-menu Vocabulaire (placeholder) ================== */
function QuizVocabMenu({
  onStartTraductionLecture,
  onBackToTypes,
}: {
  onStartTraductionLecture: () => void;
  onBackToTypes: () => void;
}) {
  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-2xl shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onBackToTypes}
          className="px-3 py-1 rounded bg-gray-100 text-sm"
        >
          ← Types
        </button>
        <div className="font-semibold text-lg">Quiz Vocabulaire</div>
      </div>

      <button
        onClick={onStartTraductionLecture}
        className="w-full p-3 rounded-xl text-white bg-pink-500 hover:bg-pink-600 font-semibold text-center"
      >
        Traduction / Lecture
      </button>
    </div>
  );
}




/** ================== Menu Quiz Kanji ================== */
function QuizMenu({ setQuizMode, onBackToTypes }:{
  setQuizMode: (m: any)=>void;
  onBackToTypes: ()=>void;
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBackToTypes} className="px-3 py-1 rounded bg-gray-100">← Types</button>
        <span className="font-semibold">Quiz Kanji</span>
      </div>
      <div className="text-lg font-semibold mb-2">Choisis un type de quiz</div>
        <p className="text-sm text-gray-600">Ici, tu pourras lancer des parcours de révision en “version essentielle”. 
        (Il faudra alors rentrer les Lectures et Kanjis présent dans la partie "à savoir" des fiches Kanji) </p>
      <button onClick={()=>setQuizMode("tradLecture")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Traduction / Lecture</button>
      <button onClick={()=>setQuizMode("drawKanji")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Traduction / Saisie Kanji</button>
      <button onClick={()=>setQuizMode("kanjiTrad")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Kanji / Traduction</button>
      <button onClick={()=>setQuizMode("kanjiLecture")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Kanji / Lecture</button>
      <button onClick={()=>setQuizMode("kunToDraw")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Lecture / Kanji </button>

    </div>
  );
}

/** ================== Menu Quiz Complet ================== */

/** ====== Menu type pour QUIZ COMPLET (Kanji | Vocabulaire) ====== */
function QuizAllTypeMenu({
  setQuizAllSection,
}: {
  setQuizAllSection: (s: 'kanji' | 'vocab') => void;
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="text-lg font-semibold mb-2">Quiz Complet</div>
      <p className="text-sm text-gray-600 mb-1">Choisis le type</p>
      <button onClick={() => setQuizAllSection('kanji')}className="w-full p-3 rounded-xl text-white bg-pink-400">Kanji</button>
      <button onClick={() => setQuizAllSection('vocab')}className="w-full p-3 rounded-xl text-white bg-pink-400">Vocabulaire</button>
    </div>
  );
}

/** ====== Sous-menu VOCAB pour QUIZ COMPLET (placeholder) ====== */
function VocabAllMenu({ onBackToTypes }: { onBackToTypes: () => void }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBackToTypes} className="px-3 py-1 rounded bg-gray-100">← Types</button>
        <span className="font-semibold">Vocabulaire — Quiz Complet</span>
      </div>
      <p className="text-sm text-gray-600">
        Ici on listera les “quiz complet” de vocabulaire depuis ta nouvelle base (fichiers que tu m’enverras).
      </p>
      <button disabled className="w-full p-3 rounded-xl text-white bg-gray-300 cursor-not-allowed">
        (à venir) Vocab — Quiz Complet 1
      </button>
    </div>
  );
}


function QuizCompletMenu({
  setQuizAllMode,
  onBackToTypes,
}: {
  setQuizAllMode: (m: any) => void;
  onBackToTypes: () => void;
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBackToTypes} className="px-3 py-1 rounded bg-gray-100">← Types</button>
        <span className="font-semibold">Quiz Complet — Kanji</span>
      </div>
      <div className="text-lg font-semibold mb-2">Choisis un type de quiz</div>
            <p className="text-sm text-gray-600">
        Ici, tu pourras lancer des parcours de révision en “version complète”. 
        (Il faudra alors rentrer toutes les Lectures et Kanjis demandés)
      </p>
      <button onClick={()=>setQuizAllMode("tradLectureComplete")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Traduction / Lecture</button>
      <button onClick={()=>setQuizAllMode("KanjiLectureComplete")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Kanji / Lecture</button>
      <button onClick={()=>setQuizAllMode("LectureKanjiComplete")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Lecture / Kanji</button>


    </div>
  );
}




 
/** ================== App ================== */
export default function App() {
  const [route, setRoute] = useState("select");
  const [quizMode, setQuizMode] = useState(null);
  const [quizAllMode, setQuizAllMode] = useState<string|null>(null);
  const [quizSection, setQuizSection] = useState<'kanji'|'vocab'|null>(null);
  const [quizAllSection, setQuizAllSection] = useState<'kanji'|'vocab'|null>(null);
  const [quizVocabMode, setQuizVocabMode] = useState<string | null>(null);
  const [selectedVocabModules, setSelectedVocabModules] = useState<number[]>(() => {
  try {
    const raw = window.localStorage.getItem("selectedVocabModules");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
  });

  const [selectedVocabPacks, setSelectedVocabPacks] = useState<number[]>(() => {
  try {
    const raw = window.localStorage.getItem("selectedVocabPacks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
  });

React.useEffect(() => {
  try {
    window.localStorage.setItem(
      "selectedVocabModules",
      JSON.stringify(selectedVocabModules)
    );
  } catch {}
}, [selectedVocabModules]);

React.useEffect(() => {
  try {
    window.localStorage.setItem(
      "selectedVocabPacks",
      JSON.stringify(selectedVocabPacks)
    );
  } catch {}
}, [selectedVocabPacks]);

  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const raw = localStorage.getItem("jlpt_selected_ids");
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length>0) return new Set(arr);
      }
    } catch {}
    return new Set(DATA.map(k=>k.id)); // par défaut: tout sélectionné
  });

  useEffect(() => {
    try { localStorage.setItem("jlpt_selected_ids", JSON.stringify(Array.from(selectedIds))); } catch {}
  }, [selectedIds]);

  const picked = useMemo(() => DATA.filter(k=>selectedIds.has(k.id)), [selectedIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-pink-50/80 border-b">
        <div className="max-w-5xl mx-auto p-3 flex items-center gap-3">
          <span className="text-2xl font-extrabold">Révisions Kanji (JLPT N5)</span>
          <div className="ml-auto flex gap-2">
            <button onClick={()=>{ setRoute("select"); setQuizMode(null); }} className="px-3 py-1 rounded-lg hover:bg-pink-100">Kanji</button>
            <button onClick={()=>{ setRoute("quiz"); setQuizSection(null); setQuizMode(null); setQuizVocabMode(null);}} className="px-3 py-1 rounded-lg hover:bg-pink-100">Quiz</button>
            <button onClick={()=>{ setRoute("quizAll"); setQuizAllSection(null); setQuizAllMode(null); }} className="px-3 py-1 rounded-lg hover:bg-pink-100">Quiz Complet</button>
            <button onClick={()=>{ setRoute("vocab"); }} className="px-3 py-1 rounded-lg hover:bg-pink-100 text-pink-600 font-semibold">Vocabulaire</button>

          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-4">
        {route === "select" && (
          <AllSelectable selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        )}

        {/* 3.2 — Écran 2a : sous-menu KANJI (comme avant) */}
        {route === "quiz" && quizSection === "kanji" && !quizMode && (
          <QuizMenu setQuizMode={setQuizMode} onBackToTypes={() => setQuizSection(null)} />
        )}

        {route === "vocab" && (
        <VocabSection
    onExit={() => setRoute("select")}
    selectedModules={selectedVocabModules}
    setSelectedModules={setSelectedVocabModules}
    selectedPacks={selectedVocabPacks}
    setSelectedPacks={setSelectedVocabPacks}
  />
)}

        {/* 3.1 — Écran 1 : choix du type de quiz */}
        {route === "quiz" && quizSection === null && (
          <QuizTypeMenu setQuizSection={setQuizSection} />
        )}

        {route === "quiz" && quizMode === "tradLecture" && (
          <QuizTradLecture picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Traduction → Lecture" />
        )}



        
        {route === "quiz" && quizMode === "drawKanji" && (
          <QuizDrawKanji picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Traduction → Saisie Kanji" />
        )}

        {route === "quiz" && quizMode === "kanjiTrad" && (
          <QuizKanjiTrad picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Kanji → Traduction" />
        )}

        {route === "quiz" && quizMode === "kanjiLecture" && (
          <QuizKanjiLecture picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Kanji → Lecture" />
        )}

        {route === "quiz" && quizMode === "kunToDraw" && (
          <QuizKunToDraw picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Lecture → Saisie du Kanji" />
        )}

    
{route === "quiz" && quizSection === "vocab" && quizVocabMode === null && (
  <QuizVocabMenu
    onBackToTypes={() => {
      setQuizSection(null);      // ← retourne au choix Kanji / Vocabulaire
      setQuizVocabMode(null);
    }}
    onStartTraductionLecture={() => {
      setQuizVocabMode("tradLecture");  // ← lance le quiz Traduction / Lecture
    }}
  />
)}

{route === "quiz" && quizSection === "vocab" && quizVocabMode === "tradLecture" && (
  <QuizVocabTraductionLecture
    onExit={() => {
      setQuizVocabMode(null);
    }}
    selectedModules={selectedVocabModules}
    selectedPacks={selectedVocabPacks}
  />
)}



        {/* 3.1 — Écran 1 : choix du type (Kanji | Vocab) */}
        {route === "quizAll" && quizAllSection === null && (
          <QuizAllTypeMenu setQuizAllSection={setQuizAllSection} />
        )}    

        {/* 3.2 — Écran 2a : sous-menu KANJI (tes anciens modes “complets”) */}
        {route === "quizAll" && quizAllSection === "kanji" && !quizAllMode && (
          <QuizCompletMenu setQuizAllMode={setQuizAllMode} onBackToTypes={() => setQuizAllSection(null)} />
        )}

        {/* 3.3 — Écran 2b : sous-menu VOCAB (placeholder) */}
        {route === "quizAll" && quizAllSection === "vocab" && (
          <VocabAllMenu onBackToTypes={() => setQuizAllSection(null)} />
        )}

        {route === "quizAll" && quizAllMode === "tradLectureComplete" && (
         <QuizTradLectureComplete picked={picked} onBack={() => setQuizAllMode(null)} title="Quiz Complet — Traduction → Lecture" />
        )}

        {route === "quizAll" && quizAllMode === "KanjiLectureComplete" && (
         <QuizKanjiLectureComplete picked={picked} onBack={() => setQuizAllMode(null)} title="Quiz Complet — Kanji → Lecture" />
        )}

        {route === "quizAll" && quizAllMode === "LectureKanjiComplete" && (
         <QuizLectureKanjiComplete picked={picked} onBack={() => setQuizAllMode(null)} title="Quiz Complet — Kanji → Lecture" />
        )}








      </main>
    </div>
  );
}

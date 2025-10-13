// @ts-nocheck
import React, { useMemo, useState, useEffect, useRef } from "react";

{ id: "子", meaningFR: "enfant", meaningEN: "child", onyomi: ["シ","ツ","ス"], kunyomi: ["こ"], aSavoir: ["ご"] },
{ id: "女", meaningFR: "femme; fille; féminin", meaningEN: "woman", onyomi: ["ジョ","ニョ","ニョウ"], kunyomi: ["おんな","め"], aSavoir: ["おんな"] },
{ id: "男", meaningFR: "homme; garçon; masculin", meaningEN: "man", onyomi: ["ダン","ナン"], kunyomi: ["おとこ"], aSavoir: ["おとこ"] },
{ id: "一", meaningFR: "un", meaningEN: "one", onyomi: ["イチ","イツ"], kunyomi: ["ひと","ひとつ"], aSavoir: ["いち"] },
{ id: "二", meaningFR: "deux", meaningEN: "two", onyomi: ["ニ","ジ"], kunyomi: ["ふた","ふたつ"], aSavoir: ["に"] },
{ id: "三", meaningFR: "trois", meaningEN: "three", onyomi: ["サン","ソウ"], kunyomi: ["み","みっつ","みつ"], aSavoir: ["さん"] },
{ id: "四", meaningFR: "quatre", meaningEN: "four", onyomi: ["シ"], kunyomi: ["よ","よっつ","よん"], aSavoir: ["し","よん"] },
{ id: "五", meaningFR: "cinq", meaningEN: "five", onyomi: ["ゴ"], kunyomi: ["いつ","いつつ"], aSavoir: ["ご"] },
{ id: "六", meaningFR: "six", meaningEN: "six", onyomi: ["ロク"], kunyomi: ["む","むっつ","むい"], aSavoir: ["ろく"] },
{ id: "七", meaningFR: "sept", meaningEN: "seven", onyomi: ["シチ"], kunyomi: ["なな","ななつ","なの"], aSavoir: ["なな","しち"] },
{ id: "八", meaningFR: "huit", meaningEN: "eight", onyomi: ["ハチ"], kunyomi: ["や","やっつ","よう"], aSavoir: ["はち"] },
{ id: "九", meaningFR: "neuf", meaningEN: "nine", onyomi: ["キュウ","ク"], kunyomi: ["ここの","ここのつ"], aSavoir: ["きゅう"] },
{ id: "十", meaningFR: "dix", meaningEN: "ten", onyomi: ["ジュウ","ジッ"], kunyomi: ["とお","と"], aSavoir: ["じゅう"] },
{ id: "百", meaningFR: "cent", meaningEN: "hundred", onyomi: ["ヒャク"], kunyomi: [], aSavoir: ["ひゃく"] },
{ id: "千", meaningFR: "mille", meaningEN: "thousand", onyomi: ["セン"], kunyomi: [], aSavoir: ["せん"] },
{ id: "万", meaningFR: "dix mille", meaningEN: "ten thousand", onyomi: ["マン","バン"], kunyomi: [], aSavoir: ["いちまん"] },
{ id: "名", meaningFR: "nom; célèbre: fameux", meaningEN: "name", onyomi: ["メイ","ミョウ"], kunyomi: ["な"], aSavoir: ["なまえ"] },
{ id: "時", meaningFR: "temps; heure", meaningEN: "time; hour", onyomi: ["ジ"], kunyomi: ["とき"], aSavoir: ["じ"] },
{ id: "分", meaningFR: "minute; partager; diviser; comprendre; partie", meaningEN: "minute; part; divide", onyomi: ["ブン","フン","ブ"], kunyomi: ["わける","わかる"], aSavoir: ["ふん","ぷん"] },
{ id: "日", meaningFR: "jour; soleil", meaningEN: "day; sun", onyomi: ["ニチ","ジツ"], kunyomi: ["ひ","か"], aSavoir: ["ひ","にち"] }, 
{ id: "月", meaningFR: "lune; mois", meaningEN: "moon; Monday", onyomi: ["ゲツ","ガツ"], kunyomi: ["つき"], aSavoir: ["げつ"] },
{ id: "年", meaningFR: "année; an; âge", meaningEN: "year", onyomi: ["ネン"], kunyomi: ["とし"], aSavoir: ["ねん"] },
{ id: "今", meaningFR: "maintenant", meaningEN: "now", onyomi: ["コン"], kunyomi: ["いま"], aSavoir: ["いま"] },
{ id: "円", meaningFR: "yen; cercle", meaningEN: "yen; circle", onyomi: ["エン"], kunyomi: ["まるい"], aSavoir: ["えん"] },
{ id: "火", meaningFR: "feu", meaningEN: "fire; Tuesday", onyomi: ["カ"], kunyomi: ["ひ"], aSavoir: ["ひ"] },
{ id: "水", meaningFR: "eau", meaningEN: "water; Wednesday", onyomi: ["スイ"], kunyomi: ["みず"], aSavoir: ["みず"] },
{ id: "木", meaningFR: "arbre; bois", meaningEN: "tree; wood", onyomi: ["モク","ボク"], kunyomi: ["き","こ"], aSavoir: ["き"] },
{ id: "金", meaningFR: "or; argent (monnaie); métal", meaningEN: "gold; money; Friday", onyomi: ["キン","コン"], kunyomi: ["かね"], aSavoir: ["かね"] },
{ id: "土", meaningFR: "terre; sol; terrain", meaningEN: "earth; Saturday", onyomi: ["ド","ト"], kunyomi: ["つち"], aSavoir: ["つち"] },
{ id: "半", meaningFR: "moitier; milieu; demi", meaningEN: "", onyomi: ["ハン"], kunyomi: ["なか"], aSavoir: ["はん"] },
{ id: "何", meaningFR: "quoi; que; quel, quelle", meaningEN: "what", onyomi: ["カ"], kunyomi: ["なに","なん"], aSavoir: ["なに","なん"] },
{ id: "行", meaningFR: "aller; ligne; organiser", meaningEN: "to go; line", onyomi: ["コウ","ギョウ","アン"], kunyomi: ["いく","ゆく","おこなう"], aSavoir: ["いく"] },
{ id: "来", meaningFR: "venir; suivant", meaningEN: "to come", onyomi: ["ライ"], kunyomi: ["くる","きます","こない"], aSavoir: ["くる"] },
{ id: "母", meaningFR: "mère; maman", meaningEN: "mother", onyomi: ["ボ"], kunyomi: ["はは"], aSavoir: ["はは"] },
{ id: "父", meaningFR: "père; papa", meaningEN: "father", onyomi: ["フ"], kunyomi: ["ちち"], aSavoir: ["ちち"] },
{ id: "食", meaningFR: "manger; nourriture", meaningEN: "to eat; food", onyomi: ["ショク"], kunyomi: ["たべる","くう"], aSavoir: ["たべる"] },
{ id: "飲", meaningFR: "boire; boisson; avaler", meaningEN: "to drink", onyomi: ["イン"], kunyomi: ["のむ"], aSavoir: ["のむ"] },
{ id: "前", meaningFR: "avant; devant", meaningEN: "before; in front", onyomi: ["ゼン"], kunyomi: ["まえ"], aSavoir: ["まえ"] },
{ id: "後", meaningFR: "après; derrière", meaningEN: "after; behind", onyomi: ["ゴ","コウ"], kunyomi: ["あと","うしろ","のち"], aSavoir: ["あと"] },
{ id: "友", meaningFR: "ami", meaningEN: "friend", onyomi: ["ユウ"], kunyomi: ["とも"], aSavoir: ["とも"] },
{ id: "毎", meaningFR: "chaque; tous les", meaningEN: "every", onyomi: ["マイ"], kunyomi: [], aSavoir: ["まい"] },
{ id: "左", meaningFR: "gauche", meaningEN: "left", onyomi: ["サ"], kunyomi: ["ひだり"], aSavoir: ["ひだり"] },
{ id: "右", meaningFR: "droite", meaningEN: "right", onyomi: ["ウ","ユウ"], kunyomi: ["みぎ"], aSavoir: ["みぎ"] },
{ id: "上", meaningFR: "au-dessus; monter; lever; grimper; haut", meaningEN: "above; up", onyomi: ["ジョウ"], kunyomi: ["うえ","あげる","あがる","のぼる"], aSavoir: ["うえ"] },
{ id: "下", meaningFR: "en-dessous; descendre; baisser; bas", meaningEN: "below; down", onyomi: ["カ","ゲ"], kunyomi: ["した","さげる","さがる","くだる"], aSavoir: ["した"] },
{ id: "中", meaningFR: "milieu; intérieur; dans; dedans; centre; moyenne", meaningEN: "middle; inside", onyomi: ["チュウ"], kunyomi: ["なか"], aSavoir: ["なか"] },
{ id: "外", meaningFR: "extérieur; dehors", meaningEN: "", onyomi: ["ガイ","ゲ"], kunyomi: ["そと","ほか","はず"], aSavoir: ["そと"] },
{ id: "国", meaningFR: "pays; patrie", meaningEN: "", onyomi: ["コク"], kunyomi: ["くに"], aSavoir: ["くに"] },
{ id: "語", meaningFR: "mot; langue; raconter; language", meaningEN: "", onyomi: ["ゴ"], kunyomi: ["かた"], aSavoir: ["ご"] },
{ id: "高", meaningFR: "haut; cher; élevé", meaningEN: "high; expensive", onyomi: ["コウ"], kunyomi: ["たかい","たか"], aSavoir: ["たかい"] },
{ id: "安", meaningFR: "calme; bon marché; tranquilité; sûr; peu cher", meaningEN: "", onyomi: ["アン"], kunyomi: ["やす"], aSavoir: ["やすい"] },
{ id: "会", meaningFR: "réunion; rencontrer; association; parti", meaningEN: "", onyomi: ["カイ","エ"], kunyomi: ["あ"], aSavoir: ["あう"] },
{ id: "見", meaningFR: "voir; regarder; montrer", meaningEN: "to see", onyomi: ["ケン"], kunyomi: ["みる","みえる","みせる"], aSavoir: ["みる"] },
{ id: "大", meaningFR: "grand", meaningEN: "big", onyomi: ["ダイ","タイ"], kunyomi: ["おおきい"], aSavoir: ["おおきい"] },
{ id: "小", meaningFR: "petit", meaningEN: "small", onyomi: ["ショウ"], kunyomi: ["ちいさい","こ","お"], aSavoir: ["ちいさい"] },
{ id: "聞", meaningFR: "entendre; écouter; demander", meaningEN: "hear; listen; ask", onyomi: ["ブン","モン"], kunyomi: ["きく","きこえる"], aSavoir: ["きく"] },
{ id: "読", meaningFR: "lire", meaningEN: "to read", onyomi: ["ドク"], kunyomi: ["よむ"], aSavoir: ["よま"] },
{ id: "新", meaningFR: "nouveau; neuf; frais", meaningEN: "new", onyomi: ["シン"], kunyomi: ["あたらしい","あらた"], aSavoir: ["あたらしい"] },
{ id: "古", meaningFR: "ancien; vieux", meaningEN: "old", onyomi: ["コ"], kunyomi: ["ふるい"], aSavoir: ["ふるい"] },
{ id: "学", meaningFR: "étudier; études; apprendre; sciense", meaningEN: "study; learn", onyomi: ["ガク"], kunyomi: ["まなぶ"], aSavoir: ["まなぶ"] },
{ id: "話", meaningFR: "parler; histoire; dire", meaningEN: "to speak; story", onyomi: ["ワ"], kunyomi: ["はなす","はなし"], aSavoir: ["はなす","はなし"] },
{ id: "買", meaningFR: "acheter", meaningEN: "to buy", onyomi: ["バイ"], kunyomi: ["かう"], aSavoir: ["かう"] },
{ id: "午", meaningFR: "midi", meaningEN: "noon", onyomi: ["ゴ"], kunyomi: [], aSavoir: ["ご"] },
{ id: "書", meaningFR: "écrire; écrit", meaningEN: "to write; writing", onyomi: ["ショ"], kunyomi: ["かく"], aSavoir: ["かく"] },
{ id: "校", meaningFR: "école", meaningEN: "school", onyomi: ["コウ"], kunyomi: [], aSavoir: ["がっこう"] },
{ id: "本", meaningFR: "livre; origine; essentiel; réalité", meaningEN: "", onyomi: ["ホン"], kunyomi: ["おと"], aSavoir: ["ほん"] },
{ id: "駅", meaningFR: "gare; station", meaningEN: "station", onyomi: ["エキ"], kunyomi: [], aSavoir: ["えき"] },
{ id: "週", meaningFR: "semaine", meaningEN: "", onyomi: ["シュウ"], kunyomi: [], aSavoir: ["しゅう"] },
{ id: "車", meaningFR: "voiture; véhicule; roue", meaningEN: "car", onyomi: ["シャ"], kunyomi: ["くるま"], aSavoir: ["くるま"] },
{ id: "店", meaningFR: "magasin; boutique; échoppe; établissement", meaningEN: "shop", onyomi: ["テン"], kunyomi: ["みせ"], aSavoir: ["ませ"] },
{ id: "休", meaningFR: "repos, congé", meaningEN: "", onyomi: ["キュウ"], kunyomi: ["やす"], aSavoir: ["やすみ","やすむ"] },
{ id: "山", meaningFR: "montagne", meaningEN: "mountain", onyomi: ["サン","ザン","セン"], kunyomi: ["やま"], aSavoir: ["やま"] },
{ id: "川", meaningFR: "rivière; fleuve", meaningEN: "river", onyomi: ["セン"], kunyomi: ["かわ"], aSavoir: ["かわ"] },
{ id: "言", meaningFR: "dire; mot", meaningEN: "to say; word", onyomi: ["ゲン","ゴン"], kunyomi: ["いう","こと"], aSavoir: ["いう"] },
{ id: "生", meaningFR: "vie; naître; cru; vivre; authentique", meaningEN: "life; to be born; raw", onyomi: ["セイ","ショウ"], kunyomi: ["いきる","うまれる","なま"], aSavoir: [""] },
{ id: "多", meaningFR: "nombreux; beaucoup", meaningEN: "many", onyomi: ["タ"], kunyomi: ["おおい"], aSavoir: ["おおい"] },
{ id: "少", meaningFR: "peu; peu nombreux", meaningEN: "few; little", onyomi: ["ショウ"], kunyomi: ["すくない","すこし"], aSavoir: ["すこし"] },
{ id: "入", meaningFR: "entrer; insérer", meaningEN: "to enter", onyomi: ["ニュウ"], kunyomi: ["はいる","いれる"], aSavoir: ["はいる"] },
{ id: "出", meaningFR: "sortir; envoyer; présence; quitter; partir", meaningEN: "to go out", onyomi: ["シュツ"], kunyomi: ["でる","だす"], aSavoir: ["でる"] },
{ id: "空", meaningFR: "ciel; vide; se vider; creux; se libérer", meaningEN: "sky; empty", onyomi: ["クウ"], kunyomi: ["そら","から"], aSavoir: ["そら"] },
{ id: "花", meaningFR: "fleur", meaningEN: "flower", onyomi: ["カ"], kunyomi: ["はな"], aSavoir: ["はな"] },
{ id: "手", meaningFR: "main", meaningEN: "", onyomi: ["シュ","ズ"], kunyomi: ["て","た"], aSavoir: ["て"] },
{ id: "足", meaningFR: "pied; jambe; ajouter", meaningEN: "", onyomi: ["ソク"], kunyomi: ["あし","た"], aSavoir: ["あし"] },
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
{ id: "社", meaningFR: "sanctuaire; société", meaningEN: "shrine; company", onyomi: ["シャ"], kunyomi: [], aSavoir: [""] },
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

/* =========================================================================
   Utils communs
============================================================================ */
type QuizScope = "essential" | "complete";

function toHiragana(s: string) {
  return Array.from(s).map(ch => {
    const c = ch.charCodeAt(0);
    return (c >= 0x30A1 && c <= 0x30F6) ? String.fromCharCode(c - 0x60) : ch;
  }).join("");
}
function isKatakanaChar(ch: string) {
  const c = ch.charCodeAt(0);
  return c >= 0x30A1 && c <= 0x30F6;
}
function isKana(s: string) {
  return Array.from(s).every(ch => {
    const c = ch.charCodeAt(0);
    // hiragana
    if (c >= 0x3041 && c <= 0x309F) return true;
    // katakana
    if (c >= 0x30A1 && c <= 0x30FF) return true;
    // chōonpu ー
    if (c === 0x30FC) return true;
    // ponctuation japonaise ?
    return false;
  });
}
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
const splitFR = (s: string) => s.split(/[;、,]/).map(t=>t.trim()).filter(Boolean);
function normalizeFree(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
}

/* —— kana → romaji (basique et suffisant pour N5) —— */
const ROMA_MAP: Record<string,string> = {
  きゃ:"kya", きゅ:"kyu", きょ:"kyo", しゃ:"sha", しゅ:"shu", しょ:"sho",
  ちゃ:"cha", ちゅ:"chu", ちょ:"cho", にゃ:"nya", にゅ:"nyu", にょ:"nyo",
  ひゃ:"hya", ひゅ:"hyu", ひょ:"hyo", みゃ:"mya", みゅ:"myu", みょ:"myo",
  りゃ:"rya", りゅ:"ryu", りょ:"ryo", ぎゃ:"gya", ぎゅ:"gyu", ぎょ:"gyo",
  じゃ:"ja",  じゅ:"ju",  じょ:"jo",  びゃ:"bya", びゅ:"byu", びょ:"byo",
  ぴゃ:"pya", ぴゅ:"pyu", ぴょ:"pyo",
  し:"shi", ち:"chi", つ:"tsu", ふ:"fu", じ:"ji",
  あ:"a", い:"i", う:"u", え:"e", お:"o",
  か:"ka", き:"ki", く:"ku", け:"ke", こ:"ko",
  さ:"sa", す:"su", せ:"se", そ:"so",
  た:"ta", て:"te", と:"to",
  な:"na", に:"ni", ぬ:"nu", ね:"ne", の:"no",
  は:"ha", ひ:"hi", へ:"he", ほ:"ho",
  ま:"ma", み:"mi", む:"mu", め:"me", も:"mo",
  や:"ya", ゆ:"yu", よ:"yo",
  ら:"ra", り:"ri", る:"ru", れ:"re", ろ:"ro",
  わ:"wa", を:"o", ん:"n",
  が:"ga", ぎ:"gi", ぐ:"gu", げ:"ge", ご:"go",
  ざ:"za", ず:"zu", ぜ:"ze", ぞ:"zo",
  だ:"da", づ:"zu", で:"de", ど:"do",
  ば:"ba", び:"bi", ぶ:"bu", べ:"be", ぼ:"bo",
  ぱ:"pa", ぴ:"pi", ぷ:"pu", ぺ:"pe", ぽ:"po",
};
function kanaToRomaji(hiraOrKata: string): string {
  const h = toHiragana(hiraOrKata);
  const keys = Object.keys(ROMA_MAP).sort((a,b)=>b.length-a.length);
  let out = h;
  for (const k of keys) out = out.split(k).join(ROMA_MAP[k]);
  return out;
}
function normalizeKana(s: string) { return toHiragana(s).trim(); }
function normRomaji(s: string) { return normalizeFree(s); }
/* Compare réponse (kana ou romaji) à une lecture attendue (kana) */
function matchesReading(user: string, expectedKana: string) {
  const expH = normalizeKana(expectedKana);
  if (isKana(user)) {
    return normalizeKana(user) === expH;
  }
  return normRomaji(user) === normRomaji(kanaToRomaji(expH));
}

/* =========================================================================
   Portée Essentiel / Complet
============================================================================ */
function readingsFor(k: KanjiItem, scope: QuizScope): string[] {
  if (scope === "essential") {
    // UNIQUEMENT aSavoir — si vide/absent: ignorer ce kanji pour ce quiz
    return (k.aSavoir ?? []).filter(Boolean);
  }
  // Complet = KUN + ON
  const kun = k.kunyomi ?? [];
  const on  = k.onyomi ?? [];
  return Array.from(new Set([...kun, ...on])).filter(Boolean);
}
function readingsForGrouping(k: KanjiItem, scope: QuizScope): string[] {
  return readingsFor(k, scope);
}

/* =========================================================================
   Petit composant d’affichage KUN/ON en couleurs
============================================================================ */
function ReadingChips({ kun = [], on = [] }: { kun?: string[]; on?: string[] }) {
  return (
    <span className="inline-flex flex-wrap gap-1 align-middle">
      {kun.map((r, i) => (
        <span key={`kun-${i}`} className="px-2 py-0.5 rounded-full border text-xs border-blue-300 bg-blue-50 text-blue-700">{r}</span>
      ))}
      {on.map((r, i) => (
        <span key={`on-${i}`} className="px-2 py-0.5 rounded-full border text-xs border-orange-300 bg-orange-50 text-orange-700">{r}</span>
      ))}
    </span>
  );
}

/* =========================================================================
   Sélection des kanji (persistée)
============================================================================ */
function AllSelectable({
  selectedIds,
  setSelectedIds
}: { selectedIds: Set<string>; setSelectedIds: (s: Set<string>) => void; }) {
  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };
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
        {DATA.map(k => (
          <label key={k.id} className={`p-3 rounded-xl border cursor-pointer ${selectedIds.has(k.id)?"bg-pink-100 border-pink-300":"bg-white"}`}>
            <input type="checkbox" className="mr-2" checked={selectedIds.has(k.id)} onChange={()=>toggle(k.id)} />
            <span className="text-xl font-bold mr-2">{k.id}</span>
            <span className="text-gray-600 text-sm">{k.meaningFR}</span>
            <div className="mt-1 space-x-2 text-sm">
              {k.kunyomi?.length ? <ReadingChips kun={k.kunyomi} /> : null}
              {k.onyomi?.length ? <ReadingChips on={k.onyomi} /> : null}
              {k.aSavoir?.length ? (
                <span className="px-2 py-0.5 rounded-full border text-xs border-pink-300 bg-pink-50 text-pink-700">
                  À savoir: {k.aSavoir.join("、")}
                </span>
              ) : null}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   Sous-menu de portée
============================================================================ */
function ScopePicker({
  title,
  onPick,
  onCancel,
}: {
  title: string;
  onPick: (scope: QuizScope) => void;
  onCancel: () => void;
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-600">Choisis la portée :</div>
      <div className="grid sm:grid-cols-2 gap-2">
        <button onClick={()=>onPick("essential")} className="p-3 rounded-xl text-white bg-pink-500">Essentiel (lecture “à savoir”)</button>
        <button onClick={()=>onPick("complete")} className="p-3 rounded-xl text-white bg-gray-800">Complet (toutes les lectures)</button>
      </div>
      <button onClick={onCancel} className="px-3 py-2 rounded-lg bg-gray-100">← Retour</button>
    </div>
  );
}

/* =========================================================================
   Menu Quiz
============================================================================ */
function QuizMenu({
  setQuizMode,
  setPendingQuiz
}: {
  setQuizMode: (k: string | null) => void;
  setPendingQuiz: (k: { key: string; title: string } | null) => void;
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="text-lg font-semibold mb-2">Choisis un type de quiz</div>

      {/* Ceux sans sous-menu */}
      <button onClick={()=>setQuizMode("general")} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Général QCM
      </button>
      <button onClick={()=>setQuizMode("tradToKanji")} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Traduction/Kanji QCM
      </button>
      <button onClick={()=>setQuizMode("kanjiTrad")} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Kanji/Traduction (saisie)
      </button>
      <button onClick={()=>setQuizMode("drawKanji")} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Traduction/Saisie Kanji
      </button>

      {/* Ceux avec sous-menu (Essentiel/Complet) */}
      <button onClick={()=>setPendingQuiz({ key:"tradLecture", title:"Quiz Traduction → Lecture" })} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Traduction/Lecture
      </button>
      <button onClick={()=>setPendingQuiz({ key:"kanjiLecture", title:"Quiz Kanji → Lecture" })} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Kanji/Lecture
      </button>
      <button onClick={()=>setPendingQuiz({ key:"kunToDraw", title:"Quiz Lecture → Kanji (dessin/saisie)" })} className="w-full p-3 rounded-xl text-white bg-pink-400">
        Quiz Lecture/Kanji (dessin/saisie)
      </button>
    </div>
  );
}

/* =========================================================================
   Quiz 1 — Kanji → Lecture (kana ou rōmaji)
============================================================================ */
function QuizKanjiLecture({
  picked, onBack, title, readingScope
}: { picked: KanjiItem[]; onBack:()=>void; title:string; readingScope: QuizScope }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<KanjiItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle"|"hit"|"miss"|"complete">("idle");
  const [found, setFound] = useState<Set<string>>(new Set());

  const results = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement|null>(null);
  useEffect(() => { if (started && !finished) { const t = setTimeout(()=>inputRef.current?.focus(),0); return ()=>clearTimeout(t); } }, [started, finished, idx, status]);

  const current = useMemo(()=> order[idx], [order, idx]);
  const expectedKana = useMemo(()=> readingsFor(current ?? {}, readingScope), [current, readingScope]);
  const kunKana = useMemo(()=> (current?.kunyomi ?? []).map(normalizeKana), [current]);
  const onKana  = useMemo(()=> (current?.onyomi  ?? []), [current]); // ON déjà katakana
  const expectedKeys = useMemo(()=> expectedKana.map(k=>normRomaji(kanaToRomaji(k))), [expectedKana]);

  const autoNext = useRef<any>(null);
  useEffect(()=>()=>{ if(autoNext.current) clearTimeout(autoNext.current); },[]);

  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFound(new Set());
    setFinished(false);
    results.current = [];
    setStarted(true);
  };

  const handleSubmit = () => {
    if (!current) return;
    const raw = input.trim();
    if (!raw) return;

    // clé de comparaison = rōmaji normalisé
    let key: string | null = null;
    if (isKana(raw)) {
      const hira = normalizeKana(raw);
      const inScope = expectedKana.includes(hira) || expectedKana.includes(toHiragana(hira));
      if (inScope) key = normRomaji(kanaToRomaji(hira));
    } else {
      key = normRomaji(raw);
    }

    if (!key) { setStatus("miss"); setInput(""); return; }

    const ok = expectedKeys.includes(key);
    const already = found.has(key);

    if (ok && !already) {
      const nxt = new Set(found); nxt.add(key);
      setFound(nxt); setInput(""); setStatus("hit");
      if (nxt.size === expectedKeys.length) {
        setStatus("complete");
        autoNext.current = setTimeout(()=>goNext(), 500);
      }
    } else {
      setStatus("miss"); setInput("");
    }
  };

  const goNext = () => {
    if (!current) return;
    const foundKanaKun = kunKana.filter(k => found.has(normRomaji(kanaToRomaji(k))));
    const foundKanaOn  = onKana .filter(k => found.has(normRomaji(kanaToRomaji(k))));
    const missKun = kunKana.filter(k => !found.has(normRomaji(kanaToRomaji(k))));
    const missOn  = onKana .filter(k => !found.has(normRomaji(kanaToRomaji(k))));

    results.current.push({
      id: current.id,
      foundKun: foundKanaKun,
      foundOn:  foundKanaOn,
      expKun:   kunKana,
      expOn:    onKana,
      missKun,
      missOn,
    });

    if (idx+1 < order.length) {
      setIdx(idx+1); setFound(new Set()); setStatus("idle"); setInput("");
    } else {
      setFinished(true);
    }
  };
  const skip = () => goNext();

  const total = order.length;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0} className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>Commencer</button>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>
          <div className="text-6xl font-extrabold">{current?.id}</div>
          <div className="text-sm text-gray-600">Trouvées : {found.size}/{expectedKeys.length}</div>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${status==='miss'?'border-red-400':status==='hit'?'border-green-500':''}`}
            placeholder="Lecture (kana ou rōmaji) puis Entrée"
            value={input}
            onChange={e=>{ setInput(e.target.value); if(status!=='idle') setStatus('idle'); }}
            onKeyDown={e=>{ if(e.key==='Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />
          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()?'bg-pink-400':'bg-gray-300'}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
          </div>
          {status==='miss' && <div className="text-sm text-red-600">Incorrect ou déjà donné.</div>}
          {status==='hit' && <div className="text-sm text-green-600">Bien !</div>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const totalExp = r.expKun.length + r.expOn.length;
            const totalFound = r.foundKun.length + r.foundOn.length;
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{r.id}</div>
                  <div className={totalFound===totalExp ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>
                <div className="text-sm mb-1"><span className="text-gray-500">Trouvées :</span> <ReadingChips kun={r.foundKun} on={r.foundOn} /></div>
                <div className="text-sm mb-1"><span className="text-gray-500">Attendues :</span> <ReadingChips kun={r.expKun} on={r.expOn} /></div>
                {(r.missKun.length>0 || r.missOn.length>0) && (
                  <div className="text-sm"><span className="text-gray-500">Manquantes :</span> <ReadingChips kun={r.missKun} on={r.missOn} /></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   Quiz 2 — Traduction → Lecture (kana ou rōmaji)
============================================================================ */
function QuizTradLecture({
  picked, onBack, title, readingScope
}: { picked: KanjiItem[]; onBack:()=>void; title:string; readingScope: QuizScope }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<KanjiItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle"|"hit"|"miss"|"complete">("idle");
  const [foundKeys, setFoundKeys] = useState<Set<string>>(new Set());

  const results = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement|null>(null);
  useEffect(() => { if (started && !finished) { const t = setTimeout(()=>inputRef.current?.focus(),0); return ()=>clearTimeout(t); } }, [started, finished, idx, status]);

  const current = useMemo(()=> order[idx], [order, idx]);
  const prompt = useMemo(()=> current ? splitFR(current.meaningFR).join(" / ") : "", [current]);

  const expKana = useMemo(()=> readingsFor(current ?? {}, readingScope), [current, readingScope]);
  const expKunKana = useMemo(()=> (current?.kunyomi ?? []).map(normalizeKana), [current]);
  const expOnKana  = useMemo(()=> (current?.onyomi  ?? []), [current]);
  const expKeys = useMemo(()=> expKana.map(k=>normRomaji(kanaToRomaji(k))), [expKana]);

  const autoNext = useRef<any>(null);
  useEffect(()=>()=>{ if(autoNext.current) clearTimeout(autoNext.current); },[]);

  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFoundKeys(new Set());
    setFinished(false);
    results.current = [];
    setStarted(true);
  };

  const total = order.length;

  const handleSubmit = () => {
    if (!current) return;
    const raw = input.trim();
    if (!raw) return;

    // clé de comparaison = rōmaji normalisé
    let key: string | null = null;
    if (isKana(raw)) {
      const hira = normalizeKana(raw);
      const inScope = expKana.includes(hira);
      if (inScope) key = normRomaji(kanaToRomaji(hira));
    } else {
      key = normRomaji(raw);
    }
    if (!key) { setStatus("miss"); setInput(""); return; }

    const ok = expKeys.includes(key);
    const already = foundKeys.has(key);
    if (ok && !already) {
      const nxt = new Set(foundKeys); nxt.add(key);
      setFoundKeys(nxt); setInput(""); setStatus("hit");
      if (nxt.size === expKeys.length) {
        setStatus("complete");
        autoNext.current = setTimeout(()=>goNext(), 500);
      }
    } else {
      setStatus("miss"); setInput("");
    }
  };

  const goNext = () => {
    if (!current) return;
    const foundKun = expKunKana.filter(k => foundKeys.has(normRomaji(kanaToRomaji(k))));
    const foundOn  = expOnKana .filter(k => foundKeys.has(normRomaji(kanaToRomaji(k))));
    const missKun  = expKunKana.filter(k => !foundKeys.has(normRomaji(kanaToRomaji(k))));
    const missOn   = expOnKana .filter(k => !foundKeys.has(normRomaji(kanaToRomaji(k))));

    results.current.push({
      id: current.id,
      prompt,
      foundKun, foundOn,
      expKun: expKunKana, expOn: expOnKana,
      missKun, missOn,
    });

    if (idx+1 < order.length) {
      setIdx(idx+1); setFoundKeys(new Set()); setStatus("idle"); setInput("");
    } else {
      setFinished(true);
    }
  };

  const skip = () => goNext();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0} className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>Commencer</button>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>
          <div className="text-lg text-gray-800">Traduction : <b>{prompt}</b></div>
          <div className="text-sm text-gray-600">Trouvées : {foundKeys.size}/{expKeys.length}</div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${status==='miss'?'border-red-400':status==='hit'?'border-green-500':''}`}
            placeholder="Lecture (kana ou rōmaji) puis Entrée"
            value={input}
            onChange={e=>{ setInput(e.target.value); if(status!=='idle') setStatus('idle'); }}
            onKeyDown={e=>{ if(e.key==='Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()?'bg-pink-400':'bg-gray-300'}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
          </div>

          {status==='miss' && <div className="text-sm text-red-600">Incorrect, déjà donné, ou hors portée.</div>}
          {status==='hit' && <div className="text-sm text-green-600">Bonne lecture !</div>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const totalExp = r.expKun.length + r.expOn.length;
            const totalFound = r.foundKun.length + r.foundOn.length;
            return (
              <div key={i} className="p-3 rounded-2xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{r.id}</div>
                  <div className={totalFound===totalExp ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {totalFound}/{totalExp}
                  </div>
                </div>
                <div className="text-sm mb-1"><span className="text-gray-500">Sens :</span> {r.prompt}</div>
                <div className="text-sm mb-1"><span className="text-gray-500">Trouvées :</span> <ReadingChips kun={r.foundKun} on={r.foundOn} /></div>
                <div className="text-sm mb-1"><span className="text-gray-500">Attendues :</span> <ReadingChips kun={r.expKun} on={r.expOn} /></div>
                {(r.missKun.length>0 || r.missOn.length>0) && (
                  <div className="text-sm"><span className="text-gray-500">Manquantes :</span> <ReadingChips kun={r.missKun} on={r.missOn} /></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   Quiz 3 — Lecture → Kanji (dessin/saisie)
============================================================================ */
function DrawingPad({ onChangeStroke }: { onChangeStroke?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    const ctx = canvasRef.current!.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
    onChangeStroke?.();
  };
  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d");
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
      <div className="text-xs text-gray-500 mb-1">Espace d’entraînement (non utilisé pour la validation)</div>
      <div className="border rounded-xl bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-48 touch-none"
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
        />
      </div>
      <div className="mt-2 text-right">
        <button onClick={clear} className="px-3 py-1 rounded bg-gray-100">Effacer</button>
      </div>
    </div>
  );
}

function QuizKunToDraw({
  picked, onBack, title, readingScope
}: { picked: KanjiItem[]; onBack:()=>void; title:string; readingScope: QuizScope }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<{ reading: string; expectedIds: string[] }[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle"|"hit"|"miss"|"complete">("idle");
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());

  const results = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement|null>(null);
  useEffect(() => { if (started && !finished) { const t = setTimeout(()=>inputRef.current?.focus(),0); return ()=>clearTimeout(t); } }, [started, finished, idx, status]);

  const buildQuestions = (pool: KanjiItem[], scope: QuizScope) => {
    const byReading = new Map<string, Set<string>>();
    pool.forEach(k => {
      const rds = readingsForGrouping(k, scope); // Essentiel: aSavoir ; Complet: KUN+ON
      rds.forEach(r => {
        if (!byReading.has(r)) byReading.set(r, new Set());
        byReading.get(r)!.add(k.id);
      });
    });
    return Array.from(byReading.entries()).map(([reading,set]) => ({
      reading, expectedIds: Array.from(set)
    })).filter(q=>q.expectedIds.length>0);
  };

  const start = () => {
    setOrder(shuffle(buildQuestions(picked, readingScope)));
    setIdx(0);
    setInput("");
    setStatus("idle");
    setFoundIds(new Set());
    setFinished(false);
    results.current = [];
    setStarted(true);
  };

  const current = useMemo(()=> order[idx], [order, idx]);

  const handleSubmit = () => {
    if (!current) return;
    const raw = input.trim();
    if (!raw) return;
    const firstKanji = Array.from(raw).find(ch => /\S/.test(ch)) ?? "";
    const ok = current.expectedIds.includes(firstKanji) && !foundIds.has(firstKanji);

    if (ok) {
      const nxt = new Set(foundIds); nxt.add(firstKanji);
      setFoundIds(nxt); setInput(""); setStatus("hit");
      if (nxt.size === current.expectedIds.length) {
        setStatus("complete");
        setTimeout(()=>goNext(), 500);
      }
    } else {
      setStatus("miss");
    }
  };

  const goNext = () => {
    if (!current) return;
    results.current.push({
      reading: current.reading,
      expectedIds: current.expectedIds,
      foundIds: Array.from(foundIds),
    });
    if (idx+1 < order.length) {
      setIdx(idx+1); setFoundIds(new Set()); setStatus("idle"); setInput("");
    } else {
      setFinished(true);
    }
  };
  const skip = () => goNext();

  const total = order.length;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0} className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>Commencer</button>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>
          <div className="text-lg text-gray-800">Lecture :</div>
          <div className="text-2xl font-bold">{current?.reading}</div>
          <div className="text-sm text-gray-600">Trouvés : {foundIds.size}/{current?.expectedIds.length ?? 0}</div>

          <input
            ref={inputRef}
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-3xl text-center ${status==='miss'?'border-red-400':status==='hit'?'border-green-500':''}`}
            placeholder="Tape/dessine le kanji correspondant puis Entrée"
            value={input}
            onChange={e=>{ setInput(e.target.value); if(status!=='idle') setStatus('idle'); }}
            onKeyDown={e=>{ if(e.key==='Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <DrawingPad onChangeStroke={()=>{}} />

          <div className="flex flex-wrap gap-2 max-w-md">
            {Array.from(foundIds).map((k,i)=>(
              <span key={i} className="px-2 py-1 rounded-full bg-green-100 border border-green-300 text-lg">{k}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim() || status==='complete'} className={`flex-1 p-3 rounded-xl text-white ${input.trim() && status!=='complete'?'bg-pink-400':'bg-gray-300'}`}>Valider</button>
            <button onClick={skip} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
          </div>

          {status==='miss' && <div className="text-sm text-red-600">Pas attendu, déjà saisi, ou caractère invalide.</div>}
          {status==='hit' && <div className="text-sm text-green-600">Bien — continue.</div>}
          {status==='complete' && <div className="text-sm text-green-600">Tous trouvés !</div>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const miss = r.expectedIds.filter((id:string) => !r.foundIds.includes(id));
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm"><span className="text-gray-500">Lecture :</span> {r.reading}</div>
                  <div className={(miss.length===0) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {r.foundIds.length}/{r.expectedIds.length}
                  </div>
                </div>
                <div className="text-sm"><span className="text-gray-500">Trouvés :</span> {r.foundIds.join("、") || "—"}</div>
                <div className="text-sm"><span className="text-gray-500">Attendues :</span> {r.expectedIds.join("、")}</div>
                {miss.length>0 && <div className="text-sm"><span className="text-gray-500">Manquants :</span> {miss.join("、")}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   Placeholders des autres quiz (tu conserves tes versions si déjà codées)
============================================================================ */
function QuizGeneral({ picked, onBack, title }: { picked: KanjiItem[]; onBack:()=>void; title:string }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100 mb-2">← Retour</button>
      <div className="font-semibold mb-2">{title}</div>
      <div>Quiz Général QCM — garde ta version complète si tu l’avais déjà.</div>
    </div>
  );
}
function QuizTradToKanjiQCM({ picked, onBack, title }: { picked: KanjiItem[]; onBack:()=>void; title:string }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100 mb-2">← Retour</button>
      <div className="font-semibold mb-2">{title}</div>
      <div>Quiz Traduction/Kanji QCM — garde ta version si tu l’avais déjà.</div>
    </div>
  );
}
function QuizKanjiTradText({ picked, onBack, title }: { picked: KanjiItem[]; onBack:()=>void; title:string }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100 mb-2">← Retour</button>
      <div className="font-semibold mb-2">{title}</div>
      <div>Quiz Kanji/Traduction (saisie) — garde ta version si tu l’avais déjà.</div>
    </div>
  );
}
function QuizDrawKanjiFromFR({ picked, onBack, title }: { picked: KanjiItem[]; onBack:()=>void; title:string }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100 mb-2">← Retour</button>
      <div className="font-semibold mb-2">{title}</div>
      <div>Quiz Traduction/Saisie Kanji — garde ta version si tu l’avais déjà.</div>
    </div>
  );
}

/* =========================================================================
   APP
============================================================================ */
export default function App() {
  const [route, setRoute] = useState<"select"|"quiz">("select");
  const [quizMode, setQuizMode] = useState<string|null>(null);

  // Sous-menu Essentiel/Complet
  const [quizScope, setQuizScope] = useState<QuizScope>("complete");
  const [pendingQuiz, setPendingQuiz] = useState<{ key: string; title: string } | null>(null);

  // Sélection persistée
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem("jlpt_selected_ids");
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return new Set(arr);
      }
    } catch {}
    return new Set(DATA.map(k=>k.id));
  });
  useEffect(() => {
    try { localStorage.setItem("jlpt_selected_ids", JSON.stringify(Array.from(selectedIds))); } catch {}
  }, [selectedIds]);

  const picked = useMemo(() => DATA.filter(k=>selectedIds.has(k.id)), [selectedIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-pink-50/80 border-b">
        <div className="max-w-5xl mx-auto p-3 flex items-center gap-3">
          <span className="text-2xl font-extrabold">Révisions Kanji JLPT N5</span>
          <div className="ml-auto flex gap-2">
            <button onClick={()=>{ setRoute("select"); setQuizMode(null); setPendingQuiz(null); }} className="px-3 py-1 rounded-lg hover:bg-pink-100">Kanji</button>
            <button onClick={()=>{ setRoute("quiz"); setQuizMode(null); setPendingQuiz(null); }} className="px-3 py-1 rounded-lg hover:bg-pink-100">Quiz</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-4">
        {route === "select" && (
          <AllSelectable selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        )}

        {route === "quiz" && !quizMode && !pendingQuiz && (
          <QuizMenu setQuizMode={setQuizMode} setPendingQuiz={setPendingQuiz} />
        )}

        {route === "quiz" && pendingQuiz && !quizMode && (
          <ScopePicker
            title={pendingQuiz.title}
            onPick={(scope) => { setQuizScope(scope); setQuizMode(pendingQuiz.key); setPendingQuiz(null); }}
            onCancel={() => setPendingQuiz(null)}
          />
        )}

        {/* Routes quiz */}
        {route === "quiz" && quizMode === "general" && (
          <QuizGeneral picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Général QCM" />
        )}
        {route === "quiz" && quizMode === "tradToKanji" && (
          <QuizTradToKanjiQCM picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Traduction/Kanji QCM" />
        )}
        {route === "quiz" && quizMode === "kanjiTrad" && (
          <QuizKanjiTradText picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Kanji/Traduction (saisie)" />
        )}

        {/* 3 quiz avec portée Essentiel/Complet */}
        {route === "quiz" && quizMode === "kanjiLecture" && (
          <QuizKanjiLecture picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Kanji → Lecture" readingScope={quizScope} />
        )}
        {route === "quiz" && quizMode === "tradLecture" && (
          <QuizTradLecture picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Traduction → Lecture" readingScope={quizScope} />
        )}
        {route === "quiz" && quizMode === "kunToDraw" && (
          <QuizKunToDraw picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Lecture → Kanji (dessin/saisie)" readingScope={quizScope} />
        )}
      </main>
    </div>
  );
}

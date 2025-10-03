// @ts-nocheck
import React, { useMemo, useState, useEffect, useRef } from "react";

/** ================== Données JLPT N5 (kanji) ================== */
const DATA = [
  { id: "日", meaningFR: "jour; soleil", meaningEN: "day; sun", onyomi: ["ニチ","ジツ"], kunyomi: ["ひ","か"] },
  { id: "一", meaningFR: "un", meaningEN: "one", onyomi: ["イチ","イツ"], kunyomi: ["ひと","ひとつ"] },
  { id: "二", meaningFR: "deux", meaningEN: "two", onyomi: ["ニ"], kunyomi: ["ふた","ふたつ"] },
  { id: "三", meaningFR: "trois", meaningEN: "three", onyomi: ["サン"], kunyomi: ["み","みっつ"] },
  { id: "四", meaningFR: "quatre", meaningEN: "four", onyomi: ["シ"], kunyomi: ["よ","よっつ","よん"] },
  { id: "五", meaningFR: "cinq", meaningEN: "five", onyomi: ["ゴ"], kunyomi: ["いつ","いつつ"] },
  { id: "六", meaningFR: "six", meaningEN: "six", onyomi: ["ロク"], kunyomi: ["む","むっつ","むい"] },
  { id: "七", meaningFR: "sept", meaningEN: "seven", onyomi: ["シチ"], kunyomi: ["なな","ななつ","なの"] },
  { id: "八", meaningFR: "huit", meaningEN: "eight", onyomi: ["ハチ"], kunyomi: ["や","やっつ","よう"] },
  { id: "九", meaningFR: "neuf", meaningEN: "nine", onyomi: ["キュウ","ク"], kunyomi: ["ここの","ここのつ"] },
  { id: "十", meaningFR: "dix", meaningEN: "ten", onyomi: ["ジュウ","ジッ"], kunyomi: ["とお","と"] },
  { id: "百", meaningFR: "cent", meaningEN: "hundred", onyomi: ["ヒャク"], kunyomi: [] },
  { id: "千", meaningFR: "mille", meaningEN: "thousand", onyomi: ["セン"], kunyomi: [] },
  { id: "万", meaningFR: "dix mille", meaningEN: "ten thousand", onyomi: ["マン","バン"], kunyomi: [] },
  { id: "円", meaningFR: "yen; cercle", meaningEN: "yen; circle", onyomi: ["エン"], kunyomi: ["まるい"] },
  { id: "人", meaningFR: "personne; humain", meaningEN: "person; human", onyomi: ["ジン","ニン"], kunyomi: ["ひと"] },
  { id: "子", meaningFR: "enfant", meaningEN: "child", onyomi: ["シ"], kunyomi: ["こ"] },
  { id: "女", meaningFR: "femme", meaningEN: "woman", onyomi: ["ジョ","ニョ"], kunyomi: ["おんな","め"] },
  { id: "男", meaningFR: "homme", meaningEN: "man", onyomi: ["ダン","ナン"], kunyomi: ["おとこ"] },
  { id: "上", meaningFR: "au-dessus; monter", meaningEN: "above; up", onyomi: ["ジョウ"], kunyomi: ["うえ","あげる","あがる","のぼる"] },
  { id: "下", meaningFR: "en dessous; descendre", meaningEN: "below; down", onyomi: ["カ","ゲ"], kunyomi: ["した","さげる","さがる","くだる"] },
  { id: "中", meaningFR: "milieu; intérieur", meaningEN: "middle; inside", onyomi: ["チュウ"], kunyomi: ["なか"] },
  { id: "大", meaningFR: "grand", meaningEN: "big", onyomi: ["ダイ","タイ"], kunyomi: ["おおきい"] },
  { id: "小", meaningFR: "petit", meaningEN: "small", onyomi: ["ショウ"], kunyomi: ["ちいさい","こ","お"] },
  { id: "長", meaningFR: "long; chef", meaningEN: "long; leader", onyomi: ["チョウ"], kunyomi: ["ながい"] },
  { id: "高", meaningFR: "haut; cher", meaningEN: "high; expensive", onyomi: ["コウ"], kunyomi: ["たかい","たか"] },
  { id: "学", meaningFR: "études; apprendre", meaningEN: "study; learn", onyomi: ["ガク"], kunyomi: ["まなぶ"] },
  { id: "校", meaningFR: "école", meaningEN: "school", onyomi: ["コウ"], kunyomi: [] },
  { id: "先", meaningFR: "avant; précédent", meaningEN: "before; previous", onyomi: ["セン"], kunyomi: ["さき"] },
  { id: "生", meaningFR: "vie; naître; cru", meaningEN: "life; to be born; raw", onyomi: ["セイ","ショウ"], kunyomi: ["いきる","うまれる","なま"] },
  { id: "年", meaningFR: "année", meaningEN: "year", onyomi: ["ネン"], kunyomi: ["とし"] },
  { id: "時", meaningFR: "temps; heure", meaningEN: "time; hour", onyomi: ["ジ"], kunyomi: ["とき"] },
  { id: "間", meaningFR: "intervalle; entre", meaningEN: "interval; between", onyomi: ["カン","ケン"], kunyomi: ["あいだ","ま"] },
  { id: "分", meaningFR: "minute; part; diviser", meaningEN: "minute; part; divide", onyomi: ["ブン","フン","ブ"], kunyomi: ["わける","わかる"] },
  { id: "前", meaningFR: "avant; devant", meaningEN: "before; in front", onyomi: ["ゼン"], kunyomi: ["まえ"] },
  { id: "後", meaningFR: "après; derrière", meaningEN: "after; behind", onyomi: ["ゴ","コウ"], kunyomi: ["あと","うしろ","のち"] },
  { id: "北", meaningFR: "nord", meaningEN: "north", onyomi: ["ホク"], kunyomi: ["きた"] },
  { id: "南", meaningFR: "sud", meaningEN: "south", onyomi: ["ナン"], kunyomi: ["みなみ"] },
  { id: "東", meaningFR: "est", meaningEN: "east", onyomi: ["トウ"], kunyomi: ["ひがし"] },
  { id: "西", meaningFR: "ouest", meaningEN: "west", onyomi: ["セイ","サイ"], kunyomi: ["にし"] },
  { id: "左", meaningFR: "gauche", meaningEN: "left", onyomi: ["サ"], kunyomi: ["ひだり"] },
  { id: "右", meaningFR: "droite", meaningEN: "right", onyomi: ["ウ","ユウ"], kunyomi: ["みぎ"] },
  { id: "出", meaningFR: "sortir", meaningEN: "to go out", onyomi: ["シュツ"], kunyomi: ["でる","だす"] },
  { id: "入", meaningFR: "entrer", meaningEN: "to enter", onyomi: ["ニュウ"], kunyomi: ["はいる","いれる"] },
  { id: "行", meaningFR: "aller; ligne", meaningEN: "to go; line", onyomi: ["コウ","ギョウ","アン"], kunyomi: ["いく","ゆく","おこなう"] },
  { id: "来", meaningFR: "venir", meaningEN: "to come", onyomi: ["ライ"], kunyomi: ["くる","きます","こない"] },
  { id: "見", meaningFR: "voir", meaningEN: "to see", onyomi: ["ケン"], kunyomi: ["みる","みえる","みせる"] },
  { id: "言", meaningFR: "dire; mot", meaningEN: "to say; word", onyomi: ["ゲン","ゴン"], kunyomi: ["いう","こと"] },
  { id: "話", meaningFR: "parler; histoire", meaningEN: "to speak; story", onyomi: ["ワ"], kunyomi: ["はなす","はなし"] },
  { id: "聞", meaningFR: "entendre; écouter; demander", meaningEN: "hear; listen; ask", onyomi: ["ブン","モン"], kunyomi: ["きく","きこえる"] },
  { id: "書", meaningFR: "écrire; écrit", meaningEN: "to write; writing", onyomi: ["ショ"], kunyomi: ["かく"] },
  { id: "読", meaningFR: "lire", meaningEN: "to read", onyomi: ["ドク"], kunyomi: ["よむ"] },
  { id: "食", meaningFR: "manger; nourriture", meaningEN: "to eat; food", onyomi: ["ショク"], kunyomi: ["たべる","くう"] },
  { id: "飲", meaningFR: "boire", meaningEN: "to drink", onyomi: ["イン"], kunyomi: ["のむ"] },
  { id: "買", meaningFR: "acheter", meaningEN: "to buy", onyomi: ["バイ"], kunyomi: ["かう"] },
  { id: "売", meaningFR: "vendre", meaningEN: "to sell", onyomi: ["バイ"], kunyomi: ["うる"] },
  { id: "店", meaningFR: "magasin", meaningEN: "shop", onyomi: ["テン"], kunyomi: ["みせ"] },
  { id: "車", meaningFR: "voiture", meaningEN: "car", onyomi: ["シャ"], kunyomi: ["くるま"] },
  { id: "駅", meaningFR: "gare", meaningEN: "station", onyomi: ["エキ"], kunyomi: [] },
  { id: "道", meaningFR: "route; chemin", meaningEN: "road; way", onyomi: ["ドウ"], kunyomi: ["みち"] },
  { id: "山", meaningFR: "montagne", meaningEN: "mountain", onyomi: ["サン"], kunyomi: ["やま"] },
  { id: "川", meaningFR: "rivière", meaningEN: "river", onyomi: ["セン"], kunyomi: ["かわ"] },
  { id: "田", meaningFR: "rizière; champ", meaningEN: "rice field", onyomi: ["デン"], kunyomi: ["た"] },
  { id: "町", meaningFR: "ville; quartier", meaningEN: "town", onyomi: ["チョウ"], kunyomi: ["まち"] },
  { id: "村", meaningFR: "village", meaningEN: "village", onyomi: ["ソン"], kunyomi: ["むら"] },
  { id: "空", meaningFR: "ciel; vide", meaningEN: "sky; empty", onyomi: ["クウ"], kunyomi: ["そら","から"] },
  { id: "天", meaningFR: "ciel; paradis", meaningEN: "heaven; sky", onyomi: ["テン"], kunyomi: [] },
  { id: "気", meaningFR: "esprit; air; humeur", meaningEN: "spirit; air", onyomi: ["キ"], kunyomi: [] },
  { id: "雨", meaningFR: "pluie", meaningEN: "rain", onyomi: ["ウ"], kunyomi: ["あめ"] },
  { id: "雪", meaningFR: "neige", meaningEN: "snow", onyomi: ["セツ"], kunyomi: ["ゆき"] },
  { id: "風", meaningFR: "vent", meaningEN: "wind", onyomi: ["フウ","フ"], kunyomi: ["かぜ"] },
  { id: "花", meaningFR: "fleur", meaningEN: "flower", onyomi: ["カ"], kunyomi: ["はな"] },
  { id: "草", meaningFR: "herbe", meaningEN: "grass", onyomi: ["ソウ"], kunyomi: ["くさ"] },
  { id: "木", meaningFR: "arbre; bois", meaningEN: "tree; wood", onyomi: ["モク","ボク"], kunyomi: ["き","こ"] },
  { id: "森", meaningFR: "forêt (dense)", meaningEN: "forest", onyomi: ["シン"], kunyomi: ["もり"] },
  { id: "林", meaningFR: "bois (petite forêt)", meaningEN: "grove", onyomi: ["リン"], kunyomi: ["はやし"] },
  { id: "石", meaningFR: "pierre", meaningEN: "stone", onyomi: ["セキ"], kunyomi: ["いし"] },
  { id: "金", meaningFR: "or; argent (monnaie); vendredi", meaningEN: "gold; money; Friday", onyomi: ["キン","コン"], kunyomi: ["かね"] },
  { id: "土", meaningFR: "terre; sol; samedi", meaningEN: "earth; Saturday", onyomi: ["ド","ト"], kunyomi: ["つち"] },
  { id: "水", meaningFR: "eau; mercredi", meaningEN: "water; Wednesday", onyomi: ["スイ"], kunyomi: ["みず"] },
  { id: "火", meaningFR: "feu; mardi", meaningEN: "fire; Tuesday", onyomi: ["カ"], kunyomi: ["ひ"] },
  { id: "月", meaningFR: "lune; mois; lundi", meaningEN: "moon; Monday", onyomi: ["ゲツ","ガツ"], kunyomi: ["つき"] },
  { id: "今", meaningFR: "maintenant", meaningEN: "now", onyomi: ["コン"], kunyomi: ["いま"] },
  { id: "午", meaningFR: "midi", meaningEN: "noon", onyomi: ["ゴ"], kunyomi: [] },
  { id: "名", meaningFR: "nom", meaningEN: "name", onyomi: ["メイ","ミョウ"], kunyomi: ["な"] },
  { id: "友", meaningFR: "ami", meaningEN: "friend", onyomi: ["ユウ"], kunyomi: ["とも"] },
  { id: "父", meaningFR: "père", meaningEN: "father", onyomi: ["フ"], kunyomi: ["ちち"] },
  { id: "母", meaningFR: "mère", meaningEN: "mother", onyomi: ["ボ"], kunyomi: ["はは"] },
  { id: "兄", meaningFR: "grand frère", meaningEN: "older brother", onyomi: ["ケイ","キョウ"], kunyomi: ["あに"] },
  { id: "姉", meaningFR: "grande sœur", meaningEN: "older sister", onyomi: ["シ"], kunyomi: ["あね"] },
  { id: "弟", meaningFR: "petit frère", meaningEN: "younger brother", onyomi: ["テイ","ダイ"], kunyomi: ["おとうと"] },
  { id: "妹", meaningFR: "petite sœur", meaningEN: "younger sister", onyomi: ["マイ"], kunyomi: ["いもうと"] },
  { id: "家", meaningFR: "maison; famille", meaningEN: "house; family", onyomi: ["カ"], kunyomi: ["いえ","うち"] },
  { id: "社", meaningFR: "sanctuaire; société", meaningEN: "shrine; company", onyomi: ["シャ"], kunyomi: [] },
  { id: "毎", meaningFR: "chaque", meaningEN: "every", onyomi: ["マイ"], kunyomi: [] },
  { id: "白", meaningFR: "blanc", meaningEN: "white", onyomi: ["ハク","ビャク"], kunyomi: ["しろ","しろい"] },
  { id: "黒", meaningFR: "noir", meaningEN: "black", onyomi: ["コク"], kunyomi: ["くろ","くろい"] },
  { id: "赤", meaningFR: "rouge", meaningEN: "red", onyomi: ["セキ"], kunyomi: ["あか","あかい"] },
  { id: "青", meaningFR: "bleu; vert (feux)", meaningEN: "blue/green (traffic)", onyomi: ["セイ"], kunyomi: ["あお","あおい"] },
  { id: "黄", meaningFR: "jaune", meaningEN: "yellow", onyomi: ["オウ"], kunyomi: ["き","きいろ"] },
  { id: "多", meaningFR: "nombreux", meaningEN: "many", onyomi: ["タ"], kunyomi: ["おおい"] },
  { id: "少", meaningFR: "peu; peu nombreux", meaningEN: "few; little", onyomi: ["ショウ"], kunyomi: ["すくない","すこし"] },
  { id: "新", meaningFR: "nouveau", meaningEN: "new", onyomi: ["シン"], kunyomi: ["あたらしい","あらた"] },
  { id: "古", meaningFR: "ancien; vieux", meaningEN: "old", onyomi: ["コ"], kunyomi: ["ふるい"] },
  { id: "早", meaningFR: "tôt; rapide", meaningEN: "early; fast", onyomi: ["ソウ"], kunyomi: ["はやい"] },
  { id: "明", meaningFR: "clair; lumineux", meaningEN: "bright", onyomi: ["メイ","ミョウ"], kunyomi: ["あかるい"] },
  { id: "夜", meaningFR: "nuit", meaningEN: "night", onyomi: ["ヤ"], kunyomi: ["よる","よ"] },
  { id: "朝", meaningFR: "matin", meaningEN: "morning", onyomi: ["チョウ"], kunyomi: ["あさ"] },
  { id: "昼", meaningFR: "midi; journée", meaningEN: "noon; daytime", onyomi: ["チュウ"], kunyomi: ["ひる"] },
  { id: "夕", meaningFR: "soir", meaningEN: "evening", onyomi: ["セキ"], kunyomi: ["ゆう"] },
  { id: "目", meaningFR: "œil", meaningEN: "eye", onyomi: ["モク"], kunyomi: ["め"] },
  { id: "口", meaningFR: "bouche", meaningEN: "mouth", onyomi: ["コウ","ク"], kunyomi: ["くち"] },
  { id: "耳", meaningFR: "oreille", meaningEN: "ear", onyomi: ["ジ"], kunyomi: ["みみ"] },
  { id: "頭", meaningFR: "tête", meaningEN: "head", onyomi: ["トウ","ズ"], kunyomi: ["あたま"] },
  { id: "体", meaningFR: "corps", meaningEN: "body", onyomi: ["タイ"], kunyomi: ["からだ"] },
  { id: "心", meaningFR: "cœur; esprit", meaningEN: "heart; mind", onyomi: ["シン"], kunyomi: ["こころ"] },
  { id: "力", meaningFR: "force; pouvoir", meaningEN: "power; strength", onyomi: ["リョク","リキ"], kunyomi: ["ちから"] },
  { id: "雲", meaningFR: "nuage", meaningEN: "cloud", onyomi: ["ウン"], kunyomi: ["くも"] },
  { id: "電", meaningFR: "électricité", meaningEN: "electricity", onyomi: ["デン"], kunyomi: [] },
  { id: "虫", meaningFR: "insecte", meaningEN: "insect", onyomi: ["チュウ"], kunyomi: ["むし"] },
  { id: "魚", meaningFR: "poisson", meaningEN: "fish", onyomi: ["ギョ"], kunyomi: ["さかな"] },
  { id: "鳥", meaningFR: "oiseau", meaningEN: "bird", onyomi: ["チョウ"], kunyomi: ["とり"] },
  { id: "牛", meaningFR: "vache; bœuf", meaningEN: "cow; ox", onyomi: ["ギュウ"], kunyomi: ["うし"] },
  { id: "馬", meaningFR: "cheval", meaningEN: "horse", onyomi: ["バ"], kunyomi: ["うま"] },
  { id: "犬", meaningFR: "chien", meaningEN: "dog", onyomi: ["ケン"], kunyomi: ["いぬ"] },
  { id: "海", meaningFR: "mer", meaningEN: "sea", onyomi: ["カイ"], kunyomi: ["うみ"] },
  { id: "島", meaningFR: "île", meaningEN: "island", onyomi: ["トウ"], kunyomi: ["しま"] },
  { id: "京", meaningFR: "capitale (Kyō)", meaningEN: "capital (Kyō)", onyomi: ["キョウ"], kunyomi: [] },
  { id: "何", meaningFR: "quoi", meaningEN: "what", onyomi: ["カ"], kunyomi: ["なに","なん"] },
];

/** Pool de lectures (pour générer des distracteurs) */
const READING_POOL = Array.from(new Set(DATA.flatMap(k => [...(k.kunyomi||[]), ...(k.onyomi||[])])));

/** ================== Utils ================== */
const unique = (arr) => Array.from(new Set(arr));
const splitFR = (s) => (s||"").split(/[;、,]/).map(t=>t.trim()).filter(Boolean);
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const stripAccents = (s) => (s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const normalize = (s) => stripAccents(s).trim().toLowerCase();

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

/** Outils QCM */
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

/** ================== Composants ================== */

function AllSelectable({ selectedIds, setSelectedIds }) {
  const toggle = id => { 
    const next = new Set(selectedIds); 
    next.has(id)?next.delete(id):next.add(id); 
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
          </label>
        ))}
      </div>
    </div>
  );
}

/** Quiz Général */
function QuizGeneral({ picked, onBack, title }) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => (started ? makeGeneralQuestions(picked) : []), [picked, started, seed]);
  const allAnswered = answers.length>0 && answers.every(a=>a>=0);
  const score = answers.filter((a,i)=> questions[i] && questions[i].choices[a] === questions[i].correctValue).length;

  const start = () => { setStarted(true); setSeed(s=>s+1); const q = makeGeneralQuestions(picked); setAnswers(Array(q.length).fill(-1)); setChecked(false); };
  const validate = () => setChecked(true);
  const restart = () => { setSeed(s=>s+1); const q = makeGeneralQuestions(picked); setAnswers(Array(q.length).fill(-1)); setChecked(false); };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {started && checked && <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Score: {score}/{questions.length}</span>}
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0} className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>Commencer le {title}</button>
      ) : (
        <div className="space-y-3">
          {questions.map((q, qi) => (
            <div key={qi} className="p-3 rounded-xl bg-gray-50">
              <div className="flex justify-between items-center mb-2 font-medium">
                <span>{q.prompt}</span>
                {checked && (
                  <span className={(answers[qi] >=0 && q.choices[answers[qi]] === q.correctValue) ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {(answers[qi] >=0 && q.choices[answers[qi]] === q.correctValue) ? "Correct" : "Faux"}
                  </span>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {q.choices.map((c, ci) => {
                  const isCorrect = c === q.correctValue;
                  const isChosen = answers[qi] === ci;
                  let extraClass = "";
                  if (checked) {
                    if (isCorrect) extraClass = "bg-pink-400 text-white";
                    else if (isChosen) extraClass = "bg-red-200";
                    else extraClass = "bg-white";
                  } else {
                    extraClass = isChosen ? "bg-pink-200" : "bg-white";
                  }
                  return (
                    <button
                      key={ci}
                      className={`p-2 rounded-lg border ${extraClass}`}
                      onClick={() => !checked && setAnswers(a => a.map((v,i)=> i===qi?ci:v))}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              {checked && <div className="mt-1 text-xs text-blue-600">Réponse correcte: {q.correctValue}</div>}
            </div>
          ))}

          {!checked ? (
            <button disabled={!allAnswered} onClick={validate} className={`mt-3 w-full p-3 rounded-xl text-white ${allAnswered?"bg-pink-400":"bg-gray-300"}`}>Valider</button>
          ) : (
            <div className="mt-3 flex gap-2">
              <button onClick={restart} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer (nouvelles propositions)</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Quiz Traduction → Kanji (QCM) */
function QuizTradToKanji({ picked, onBack, title }) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => (started ? makeTradToKanjiQuestions(picked) : []), [picked, started, seed]);
  const allAnswered = answers.length>0 && answers.every(a=>a>=0);
  const score = answers.filter((a,i)=> questions[i] && questions[i].choices[a] === questions[i].correctValue).length;

  const start = () => { setStarted(true); setSeed(s=>s+1); const q = makeTradToKanjiQuestions(picked); setAnswers(Array(q.length).fill(-1)); setChecked(false); };
  const validate = () => setChecked(true);
  const restart = () => { setSeed(s=>s+1); const q = makeTradToKanjiQuestions(picked); setAnswers(Array(q.length).fill(-1)); setChecked(false); };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
        {started && checked && <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">Score: {score}/{questions.length}</span>}
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0} className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>Commencer le {title}</button>
      ) : (
        <div className="space-y-3">
          {questions.map((q, qi) => (
            <div key={qi} className="p-3 rounded-xl bg-gray-50">
              <div className="mb-2 font-medium">{q.prompt}</div>
              <div className="grid sm:grid-cols-4 gap-2">
                {q.choices.map((c, ci) => {
                  const isCorrect = c === q.correctValue;
                  const isChosen = answers[qi] === ci;
                  let extraClass = "";
                  if (checked) {
                    if (isCorrect) extraClass = "bg-pink-400 text-white";
                    else if (isChosen) extraClass = "bg-red-200";
                    else extraClass = "bg-white";
                  } else {
                    extraClass = isChosen ? "bg-pink-200" : "bg-white";
                  }
                  return (
                    <button
                      key={ci}
                      className={`p-3 rounded-lg border text-2xl ${extraClass}`}
                      onClick={() => !checked && setAnswers(a => a.map((v,i)=> i===qi?ci:v))}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              {checked && <div className="mt-1 text-xs text-blue-600">Réponse correcte: {q.correctValue}</div>}
            </div>
          ))}

          {!checked ? (
            <button disabled={!allAnswered} onClick={validate} className={`mt-3 w-full p-3 rounded-xl text-white ${allAnswered?"bg-pink-400":"bg-gray-300"}`}>Valider</button>
          ) : (
            <div className="mt-3 flex gap-2">
              <button onClick={restart} className="flex-1 p-3 rounded-xl bg-gray-100">Recommencer (nouvelles propositions)</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Quiz Kanji → Traduction (toutes les traductions, récap correct) */
function QuizKanjiTrad({ picked, onBack, title }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [found, setFound] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"idle"|"hit"|"miss"|"complete">("idle");
  const autoNext = useRef<any>(null);

  // 👉 nouveau : ref qui suit "found" pour éviter les valeurs obsolètes
  const foundRef = useRef<Set<string>>(new Set());
  useEffect(() => { foundRef.current = found; }, [found]);

  // Si tu as déjà stripAccents et splitFR plus haut, on réutilise :
  const normalizeFR = (s: string) =>
    (stripAccents(s) ?? "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  // On stocke les résultats dans un ref (comme avant)
  const results = useRef<Array<{
    id: string;
    expected: string[];         // attendus (normalisés)
    pretty: string[];           // attendus "lisibles" (non normalisés)
    found: string[];            // trouvés (normalisés)
  }>>([]);

  // Démarrer
  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setFound(new Set());
    setStatus("idle");
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  // Question courante
  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null;
    const k = order[idx];
    const prettyTokens = splitFR(k.meaningFR);                 // ex: ["jour", "soleil"]
    const expectedNorm = Array.from(new Set(prettyTokens.map(normalizeFR))).filter(Boolean);
    return { id: k.id, expected: expectedNorm, pretty: prettyTokens };
  }, [started, idx, order]);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  const goNext = () => {
    if (!currentQ) return;

    // 🔒 Toujours lire la version LA PLUS RÉCENTE de found ici
    const foundNow = Array.from(foundRef.current);

    // Enregistre un snapshot cohérent pour le récap
    results.current.push({
      id: currentQ.id,
      expected: currentQ.expected,
      pretty: currentQ.pretty,
      found: foundNow,
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setFound(new Set());
      setStatus("idle");
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const val = normalizeFR(input);
    if (!val) return;

    const isExpected = currentQ.expected.includes(val);
    const already = foundRef.current.has(val);

    if (isExpected && !already) {
      const nxt = new Set(foundRef.current);
      nxt.add(val);
      setFound(nxt);                   // met à jour le state
      setInput("");
      setStatus("hit");

      // tout trouvé -> auto next après 1s
      if (nxt.size === currentQ.expected.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500);
      }
    } else {
      setStatus("miss");               // mauvais ou doublon
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
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
          <div className="text-6xl sm:text-7xl font-extrabold tracking-wide select-none">{currentQ?.id}</div>

          <input
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            placeholder="Entre une traduction en français puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />

          <div className="text-sm text-gray-700">
            Trouvées {found.size}/{currentQ?.expected.length ?? 0}
          </div>

          <div className="flex flex-wrap gap-2 max-w-md">
            {Array.from(found).map((f) => (
              <span key={f} className="px-2 py-1 rounded-full bg-green-100 border border-green-300 text-xs">
                {f}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className={`flex-1 p-3 rounded-xl text-white ${input.trim() ? "bg-pink-400" : "bg-gray-300"}`}
            >
              Valider
            </button>
            <button
              onClick={goNext}
              className="px-4 py-3 rounded-xl bg-gray-100"
              title="Passer au kanji suivant"
            >
              Suivant
            </button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Pas attendu ou déjà donné.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les traductions trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i) => {
            const foundSet = new Set(r.found);
            const missing = r.expected.filter(x => !foundSet.has(x));
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{r.id}</div>
                  <div className={missing.length===0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {r.expected.length - missing.length}/{r.expected.length}
                  </div>
                </div>
                <div className="text-sm"><span className="text-gray-500">Trouvées :</span> {r.found.join(", ") || "—"}</div>
                <div className="text-sm text-blue-600">Attendues : {r.pretty.join(", ")}</div>
                {missing.length>0 && (<div className="text-sm text-blue-700">Manquantes : {missing.join(", ")}</div>)}
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

/** Quiz Kanji → Lecture (toutes les lectures en rōmaji) */
function QuizKanjiLecture({ picked, onBack, title }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [found, setFound] = useState(new Set());
  const [status, setStatus] = useState("idle");
  const autoNext = useRef(null);
  const results = useRef([]);

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null;
    const k = order[idx];
    const readings = unique([...(k.kunyomi||[]), ...(k.onyomi||[])]);
    const expected = unique(
      readings
        .filter(Boolean)
        .map(r => normalize(kanaToRomaji(r)))
        .filter(Boolean)
    );
    return { id: k.id, expected };
  }, [started, idx, order]);

  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setFound(new Set());
    setStatus("idle");
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  const goNext = () => {
    if (!currentQ) return;
    results.current.push({ id: currentQ.id, expected: currentQ.expected, found: Array.from(found) });
    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setFound(new Set());
      setStatus("idle");
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const val = normalize(input);
    if (!val) return;
    const ok = currentQ.expected.includes(val);
    if (ok && !found.has(val)) {
      const nxt = new Set(found); nxt.add(val); setFound(nxt); setInput(""); setStatus("hit");
      if (nxt.size === currentQ.expected.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, (500));
      }
    } else {
      setStatus("miss");
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0} className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>Commencer le {title}</button>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>
          <div className="text-6xl sm:text-7xl font-extrabold tracking-wide select-none">{currentQ?.id}</div>
          <input
            autoFocus
            type="text"
            className="w-full max-w-md p-3 rounded-xl border text-lg"
            placeholder="Écris une lecture en rōmaji puis Entrée (ex: hi, nichi, tsuki)"
            value={input}
            onChange={e => { setInput(e.target.value); if(status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />
          <div className="text-sm text-gray-700">Trouvées {found.size}/{currentQ?.expected.length ?? 0}</div>
          <div className="flex flex-wrap gap-2 max-w-md">
            {Array.from(found).map(r => (
              <span key={r} className="px-2 py-1 rounded-full bg-green-100 border border-green-300 text-xs">{r}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim() ? "bg-pink-400" : "bg-gray-300"}`}>Valider</button>
            <button onClick={goNext} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>
          {status==='miss' && (<div className="text-sm text-red-600">Ce rōmaji n'est pas attendu ou déjà saisi.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les lectures trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.found);
            const missing = r.expected.filter(x=>!foundSet.has(x));
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{r.id}</div>
                  <div className={missing.length===0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {r.expected.length - missing.length}/{r.expected.length}
                  </div>
                </div>
                <div className="text-sm"><span className="text-gray-500">Trouvées :</span> {r.found.join(", ") || "—"}</div>
                <div className="text-sm text-blue-600">Attendues : {r.expected.join(", ")}</div>
                {missing.length>0 && (<div className="text-sm text-blue-700">Manquantes : {missing.join(", ")}</div>)}
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

/** Quiz Traduction → Lecture (toutes les lectures en rōmaji) — corrigé récap 3/3 */
function QuizTradLecture({ picked, onBack, title }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [found, setFound] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"idle"|"hit"|"miss"|"complete">("idle");

  const autoNext = useRef<any>(null);
  const results = useRef<Array<{ id:string; meaningPretty:string[]; expected:string[]; found:string[] }>>([]);

  // 👉 NEW: ref qui suit la dernière valeur de "found" (évite les valeurs obsolètes après setTimeout)
  const foundRef = useRef<Set<string>>(new Set());
  useEffect(() => { foundRef.current = found; }, [found]);

  // Normalisation romaji (déjà dans ton fichier, sinon garde celle-ci)
  const norm = (s:string) =>
    (s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

  const currentQ = useMemo(() => {
    if (!started || idx >= order.length) return null;
    const k = order[idx];

    // Affichage des traductions FR (jolis labels)
    const meaningPretty = splitFR(k.meaningFR);

    // Lectures attendues en romaji normalisé
    const readings = unique([...(k.kunyomi||[]), ...(k.onyomi||[])]);
    const expected = unique(
      readings
        .filter(Boolean)
        .map(r => norm(kanaToRomaji(r)))
        .filter(Boolean)
    );

    return { id: k.id, meaningPretty, expected };
  }, [started, idx, order]);

  const start = () => {
    setOrder(shuffle(picked));
    setIdx(0);
    setInput("");
    setFound(new Set());
    setStatus("idle");
    results.current = [];
    setFinished(false);
    setStarted(true);
  };

  useEffect(() => () => { if (autoNext.current) clearTimeout(autoNext.current); }, []);

  const total = order.length;
  const remaining = Math.max(0, total - idx - 1);

  const goNext = () => {
    if (!currentQ) return;

    // ✅ On lit la dernière version de found via foundRef:
    const foundNow = Array.from(foundRef.current);

    // Enregistrer un snapshot cohérent pour le récap
    results.current.push({
      id: currentQ.id,
      meaningPretty: currentQ.meaningPretty,
      expected: currentQ.expected,
      found: foundNow,
    });

    if (idx + 1 < total) {
      setIdx(idx + 1);
      setInput("");
      setFound(new Set());
      setStatus("idle");
    } else {
      setFinished(true);
      setStatus("complete");
    }
  };

  const handleSubmit = () => {
    if (!currentQ) return;
    const val = norm(input);
    if (!val) return;

    const ok = currentQ.expected.includes(val);
    const already = foundRef.current.has(val);

    if (ok && !already) {
      const nxt = new Set(foundRef.current);
      nxt.add(val);
      setFound(nxt);
      setInput("");
      setStatus("hit");

      // tout trouvé → passage auto en 0.5s
      if (nxt.size === currentQ.expected.length) {
        setStatus("complete");
        if (autoNext.current) clearTimeout(autoNext.current);
        autoNext.current = setTimeout(goNext, 500);
      }
    } else {
      setStatus("miss");    // mauvais ou doublon
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">← Retour</button>
        <span className="font-semibold">{title}</span>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-200/70">{picked.length} sélectionnés</span>
      </div>

      {!started ? (
        <button onClick={start} disabled={picked.length===0}
          className={`w-full p-3 rounded-xl text-white ${picked.length>0?"bg-pink-400":"bg-gray-300"}`}>
          Commencer le {title}
        </button>
      ) : !finished ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="text-sm text-gray-600">Question {idx+1} / {total}</div>

          {/* Prompt: traductions FR */}
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Traduction(s) :</div>
            <div className="text-2xl font-semibold">
              {currentQ?.meaningPretty.join(" ／ ")}
            </div>
          </div>

          <input
            autoFocus
            type="text"
            className={`w-full max-w-md p-3 rounded-xl border text-lg ${
              status==='miss' ? 'border-red-400' : status==='hit' ? 'border-green-500' : ''
            }`}
            placeholder="Écris une lecture en rōmaji (ex: hi, nichi, tsuki) puis Entrée"
            value={input}
            onChange={e => { setInput(e.target.value); if (status!=='idle') setStatus('idle'); }}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
          />
          <div className="text-sm text-gray-700">Trouvées {found.size}/{currentQ?.expected.length ?? 0}</div>

          <div className="flex flex-wrap gap-2 max-w-md">
            {Array.from(found).map(r => (
              <span key={r} className="px-2 py-1 rounded-full bg-green-100 border border-green-300 text-xs">{r}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <button onClick={handleSubmit} disabled={!input.trim()} className={`flex-1 p-3 rounded-xl text-white ${input.trim()? "bg-pink-400":"bg-gray-300"}`}>Valider</button>
            <button onClick={goNext} className="px-4 py-3 rounded-xl bg-gray-100">Suivant</button>
            <span className="px-3 py-3 text-sm text-gray-500">Restants: {remaining}</span>
          </div>

          {status==='miss' && (<div className="text-sm text-red-600">Ce rōmaji n'est pas attendu ou déjà saisi.</div>)}
          {status==='hit' && (<div className="text-sm text-green-600">Bien ! Continue…</div>)}
          {status==='complete' && (<div className="text-sm text-green-600">Toutes les lectures trouvées !</div>)}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gray-50 font-semibold">Récapitulatif</div>
          {results.current.map((r,i)=>{
            const foundSet = new Set(r.found);
            const missing = r.expected.filter(x=>!foundSet.has(x));
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">{r.meaningPretty.join(" ／ ")}</div>
                  <div className={missing.length===0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {r.expected.length - missing.length}/{r.expected.length}
                  </div>
                </div>
                <div className="text-sm"><span className="text-gray-500">Trouvées :</span> {r.found.join(", ") || "—"}</div>
                <div className="text-sm text-blue-600">Attendues : {r.expected.join(", ")}</div>
                {missing.length>0 && (<div className="text-sm text-blue-700">Manquantes : {missing.join(", ")}</div>)}
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


/** Menu Quiz */
function QuizMenu({ setQuizMode }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-3">
      <div className="text-lg font-semibold mb-2">Choisis un type de quiz</div>
      <button onClick={()=>setQuizMode("general")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Général</button>
      <button onClick={()=>setQuizMode("tradToKanji")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Traduction/Kanji</button>
      <button onClick={()=>setQuizMode("tradLecture")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Traduction/Lecture</button>
      <button onClick={()=>setQuizMode("kanjiTrad")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Kanji/Traduction</button>
      <button onClick={()=>setQuizMode("kanjiLecture")} className="w-full p-3 rounded-xl text-white bg-pink-400">Quiz Kanji/Lecture</button>
    </div>
  );
}

/** ================== App ================== */
export default function App() {
  const [route, setRoute] = useState("select");
  const [quizMode, setQuizMode] = useState(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    try {
    const raw = localStorage.getItem("jlpt_selected_ids");
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return new Set(arr);
    }
  } catch {}
  return new Set(DATA.map(k => k.id));
});

  useEffect(() => { try {
    const raw = localStorage.getItem("jlpt_selected_ids");
    if (raw) { const arr = JSON.parse(raw); if (Array.isArray(arr) && arr.length>0) setSelectedIds(new Set(arr)); }
  } catch {} }, []);

  useEffect(() => {
     try { localStorage.setItem(
      "jlpt_selected_ids",
      JSON.stringify(Array.from(selectedIds))
    ); 
  } catch {} }, 
  [selectedIds]);

  const picked = useMemo(() => DATA.filter(k=>selectedIds.has(k.id)), [selectedIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-pink-50/80 border-b">
        <div className="max-w-5xl mx-auto p-3 flex items-center gap-3">
          <span className="text-2xl font-extrabold">Révisions Kanji (JLPT N5)</span>
          <div className="ml-auto flex gap-2">
            <button onClick={()=>{ setRoute("select"); setQuizMode(null); }} className="px-3 py-1 rounded-lg hover:bg-pink-100">Kanji</button>
            <button onClick={()=>{ setRoute("quiz"); setQuizMode(null); }} className="px-3 py-1 rounded-lg hover:bg-pink-100">Quiz</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-4">
        {route === "select" && (
          <AllSelectable selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        )}

        {route === "quiz" && !quizMode && (
          <QuizMenu setQuizMode={setQuizMode} />
        )}

        {route === "quiz" && quizMode === "general" && (
          <QuizGeneral picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Général" />
        )}

        {route === "quiz" && quizMode === "tradToKanji" && (
          <QuizTradToKanji picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Traduction → Kanji" />
        )}

        {route === "quiz" && quizMode === "tradLecture" && (
          <QuizTradLecture picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Traduction → Lecture (rōmaji)" />
        )}

        {route === "quiz" && quizMode === "kanjiTrad" && (
          <QuizKanjiTrad picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Kanji → Traduction" />
        )}

        {route === "quiz" && quizMode === "kanjiLecture" && (
          <QuizKanjiLecture picked={picked} onBack={()=>setQuizMode(null)} title="Quiz Kanji → Lecture (rōmaji)" />
        )}
      </main>
    </div>
  );
}
/* Filament — piece names.
 *
 * One Italian word per artwork. Every pair carries two names: the
 * Edition half and the Twin half, chosen as counterparts on an axis
 * that belongs to that pair's palette. Morandi runs vessel → breath,
 * Montefeltro runs fortress → opening, Murano runs furnace → finished
 * glass, and so on. Read a pair left-to-right and you get the whole
 * gesture of the palette in two words.
 *
 * Shape: tokenId → [editionName, twinName].
 *
 * This file is the single source of truth for names. The on-chain
 * metadata generator reads the same object (both halves of pair N
 * share pair_id N but carry their own `name`), so a rename here is a
 * rename everywhere — do not fork this list into the token JSON.
 *
 * All 500 names are unique across the edition, and none collides with
 * a palette name (no piece is called Ombra, Terra, Fresco, ...) so a
 * name can never be mistaken for a trait value.
 */
// prettier-ignore
const FILAMENT_NAMES = {
  /* Morandi (1–14) — vessel → breath. Still-life solids against the
     air around them; the Twin is always the thing you can't hold. */
  1:  ["Brocca",      "Fiato"],
  2:  ["Boccale",     "Velo"],
  3:  ["Ciotola",     "Bruma"],
  4:  ["Vaso",        "Foschia"],
  5:  ["Scatola",     "Pulviscolo"],
  6:  ["Bottiglia",   "Chiarore"],
  7:  ["Tazza",       "Respiro"],
  8:  ["Anfora",      "Sospiro"],
  9:  ["Coppa",       "Nebbia"],
  10: ["Barattolo",   "Vapore"],
  11: ["Fiasco",      "Fumo"],
  12: ["Orcio",       "Spiro"],
  13: ["Alzata",      "Penombra"],
  14: ["Mensola",     "Riflesso"],

  /* Montefeltro (15–26) — fortress → opening. The Urbino wall and the
     gap in it that lets the light through. */
  15: ["Torrione",    "Feritoia"],
  16: ["Bastione",    "Loggia"],
  17: ["Merlo",       "Balcone"],
  18: ["Rocca",       "Varco"],
  19: ["Cortile",     "Spiraglio"],
  20: ["Muraglia",    "Soglia"],
  21: ["Contrafforte","Arcata"],
  22: ["Torretta",    "Abbaino"],
  23: ["Fossato",     "Ponte"],
  24: ["Cinta",       "Portale"],
  25: ["Pilastro",    "Lucernario"],
  26: ["Bugnato",     "Finestrella"],

  /* Carpaccio (27–44) — ceremony → water. Venetian crimson on the
     procession side, the lagoon that reflects it on the Twin side. */
  27: ["Stendardo",   "Laguna"],
  28: ["Gonfalone",   "Riva"],
  29: ["Corteo",      "Scia"],
  30: ["Porpora",     "Marea"],
  31: ["Damasco",     "Risacca"],
  32: ["Broccato",    "Canale"],
  33: ["Vessillo",    "Specchio"],
  34: ["Livrea",      "Bacino"],
  35: ["Manto",       "Onda"],
  36: ["Baldacchino", "Corrente"],
  37: ["Seta",        "Schiuma"],
  38: ["Insegna",     "Riverbero"],
  39: ["Ceralacca",   "Fondale"],
  40: ["Cinabro",     "Deriva"],
  41: ["Scarlatto",   "Salsedine"],
  42: ["Velluto",     "Bonaccia"],
  43: ["Ricamo",      "Frangente"],
  44: ["Cordone",     "Approdo"],

  /* Appennino (45–59) — ridge → valley. Every Edition name is
     something you stand on, every Twin something you stand in. */
  45: ["Crinale",     "Vallone"],
  46: ["Vetta",       "Conca"],
  47: ["Dorsale",     "Gola"],
  48: ["Sperone",     "Radura"],
  49: ["Cima",        "Piana"],
  50: ["Costone",     "Forra"],
  51: ["Guglia",      "Sella"],
  52: ["Roccia",      "Pascolo"],
  53: ["Ghiaione",    "Sorgente"],
  54: ["Massiccio",   "Valico"],
  55: ["Pietraia",    "Faggeta"],
  56: ["Balza",       "Alpeggio"],
  57: ["Cengia",      "Vallata"],
  58: ["Pinnacolo",   "Fondovalle"],
  59: ["Scarpata",    "Greto"],

  /* Notturno (60–66) — night → first light. The shortest palette, and
     the only one where the axis is literally time. */
  60: ["Mezzanotte",  "Aurora"],
  61: ["Buio",        "Barlume"],
  62: ["Tenebra",     "Albore"],
  63: ["Nottola",     "Allodola"],
  64: ["Plenilunio",  "Mattutino"],
  65: ["Veglia",      "Risveglio"],
  66: ["Astro",       "Rugiada"],

  /* Piero (67–74) — measure → light. Piero della Francesca built with
     a compass and then flooded it; the pair splits those two acts. */
  67: ["Prospettiva", "Aureola"],
  68: ["Compasso",    "Bagliore"],
  69: ["Squadra",     "Nimbo"],
  70: ["Piombino",    "Splendore"],
  71: ["Volume",      "Trasparenza"],
  72: ["Sinopia",     "Incarnato"],
  73: ["Modulo",      "Alone"],
  74: ["Simmetria",   "Controluce"],

  /* Marche (75–84) — field → sea. The region runs hills straight into
     the Adriatic; the pair is one name from each side of that drive. */
  75: ["Collina",     "Scogliera"],
  76: ["Podere",      "Battigia"],
  77: ["Filare",      "Molo"],
  78: ["Grano",       "Sale"],
  79: ["Aia",         "Duna"],
  80: ["Solco",       "Boa"],
  81: ["Vigneto",     "Faro"],
  82: ["Uliveto",     "Vela"],
  83: ["Stoppia",     "Conchiglia"],
  84: ["Casolare",    "Scoglio"],

  /* Pesaro (85–102) — harbour → open water. Rossini's town, so the
     Twins pick up tempo marks and winds where the sense allows. */
  85: ["Porto",       "Largo"],
  86: ["Darsena",     "Altura"],
  87: ["Banchina",    "Orizzonte"],
  88: ["Gomena",      "Rotta"],
  89: ["Ancora",      "Andante"],
  90: ["Bitta",       "Traversata"],
  91: ["Fanale",      "Miraggio"],
  92: ["Pontile",     "Maestrale"],
  93: ["Sartiame",    "Libeccio"],
  94: ["Chiglia",     "Scirocco"],
  95: ["Timone",      "Grecale"],
  96: ["Prua",        "Poppa"],
  97: ["Alberatura",  "Tramontana"],
  98: ["Stiva",       "Coperta"],
  99: ["Ormeggio",    "Rada"],
  100:["Scalo",       "Sestante"],
  101:["Cala",        "Bussola"],
  102:["Lanterna",    "Astrolabio"],

  /* Foglio (103–122) — paper → leaf. Both halves of the word foglio,
     split down the middle: the sheet and the thing it was named for. */
  103:["Pagina",      "Fronda"],
  104:["Quaderno",    "Germoglio"],
  105:["Inchiostro",  "Linfa"],
  106:["Pergamena",   "Corteccia"],
  107:["Carta",       "Ramoscello"],
  108:["Filigrana",   "Nervatura"],
  109:["Piega",       "Picciolo"],
  110:["Margine",     "Radice"],
  111:["Postilla",    "Gemma"],
  112:["Rigo",        "Stelo"],
  113:["Frontespizio","Chioma"],
  114:["Legatura",    "Viticcio"],
  115:["Segnalibro",  "Petalo"],
  116:["Cartiglio",   "Baccello"],
  117:["Manoscritto", "Seme"],
  118:["Codice",      "Innesto"],
  119:["Vergatura",   "Venatura"],
  120:["Bozza",       "Pollone"],
  121:["Cancellatura","Verzura"],
  122:["Timbro",      "Talea"],

  /* Raffaello (123–136) — drawing → colour. Edition names come off the
     cartoon and the chalk, Twins out of the pigment jar. */
  123:["Cartone",     "Velatura"],
  124:["Sanguigna",   "Rosato"],
  125:["Spolvero",    "Sfumato"],
  126:["Contorno",    "Impasto"],
  127:["Schizzo",     "Lacca"],
  128:["Tratto",      "Tinta"],
  129:["Stilo",       "Guazzo"],
  130:["Modello",     "Vermiglio"],
  131:["Studio",      "Oltremare"],
  132:["Panneggio",   "Minio"],
  133:["Disegno",     "Cangiante"],
  134:["Bozzetto",    "Amaranto"],
  135:["Profilo",     "Garanza"],
  136:["Contrapposto","Biacca"],

  /* Lucente (137–149) — gleam → what dulls it. The one palette whose
     Twin is a subtraction rather than a counterpart. */
  137:["Luccichio",   "Patina"],
  138:["Scintilla",   "Fuliggine"],
  139:["Lucciola",    "Cenere"],
  140:["Balenio",     "Ruggine"],
  141:["Lustro",      "Verderame"],
  142:["Iride",       "Appannatura"],
  143:["Fulgore",     "Ossido"],
  144:["Raggiera",    "Sordina"],
  145:["Abbaglio",    "Grigiore"],
  146:["Sfavillio",   "Torbido"],
  147:["Lampo",       "Bruno"],
  148:["Guizzo",      "Smorzato"],
  149:["Fiammella",   "Tizzone"],

  /* Fresco (150–163) — wall → pigment. Edition names are the plaster
     and the tools; Twins are what goes on while it's still wet. */
  150:["Intonaco",    "Pigmento"],
  151:["Calce",       "Malachite"],
  152:["Arriccio",    "Lapislazzuli"],
  153:["Giornata",    "Pennellata"],
  154:["Muro",        "Colatura"],
  155:["Tonachino",   "Cinabrese"],
  156:["Ponteggio",   "Verdaccio"],
  157:["Cazzuola",    "Bolo"],
  158:["Frattazzo",   "Azzurrite"],
  159:["Nicchia",     "Ocra"],
  160:["Lunetta",     "Chiaroscuro"],
  161:["Volta",       "Grisaglia"],
  162:["Zoccolo",     "Bistro"],
  163:["Cornice",     "Vernice"],

  /* Terra (164–178) — ground → what comes out of it. */
  164:["Argilla",     "Semina"],
  165:["Zolla",       "Raccolto"],
  166:["Creta",       "Spiga"],
  167:["Tufo",        "Covone"],
  168:["Marna",       "Maggese"],
  169:["Limo",        "Aratura"],
  170:["Sabbia",      "Erpice"],
  171:["Ghiaia",      "Vendemmia"],
  172:["Terriccio",   "Fienile"],
  173:["Polvere",     "Aratro"],
  174:["Fango",       "Semenza"],
  175:["Terracotta",  "Frutteto"],
  176:["Mattone",     "Orto"],
  177:["Gesso",       "Fioritura"],
  178:["Sasso",       "Ginestra"],

  /* Ombra (179–193) — the dark place → the small light in it. Never
     daylight on the Twin side: always a flame someone had to carry. */
  179:["Sagoma",      "Lucerna"],
  180:["Eclissi",     "Candela"],
  181:["Cripta",      "Torcia"],
  182:["Androne",     "Lampada"],
  183:["Sottoportico","Fiaccola"],
  184:["Vicolo",      "Candelabro"],
  185:["Antro",       "Lume"],
  186:["Grotta",      "Falò"],
  187:["Cantina",     "Braciere"],
  188:["Cunicolo",    "Miccia"],
  189:["Anfratto",    "Stoppino"],
  190:["Voragine",    "Vampa"],
  191:["Sotterraneo", "Focolare"],
  192:["Nascondiglio","Cerino"],
  193:["Velario",     "Ribalta"],

  /* Glaciale (194–208) — held → released. Ice on the Edition side,
     the same water moving again on the Twin. */
  194:["Ghiaccio",    "Disgelo"],
  195:["Brina",       "Ruscello"],
  196:["Gelo",        "Goccia"],
  197:["Nevaio",      "Torrente"],
  198:["Cristallo",   "Zampillo"],
  199:["Galaverna",   "Polla"],
  200:["Seracco",     "Rivolo"],
  201:["Banchisa",    "Piena"],
  202:["Nevischio",   "Pioggia"],
  203:["Ghiacciolo",  "Stillicidio"],
  204:["Crepaccio",   "Guado"],
  205:["Coltre",      "Sorgiva"],
  206:["Tormenta",    "Sereno"],
  207:["Gelicidio",   "Fontanile"],
  208:["Slavina",     "Riflusso"],

  /* Tramonto (209–228) — the going down → what answers it. Starts as
     dusk against dawn, then turns into colour: every Twin from 216 on
     is the warmer half of the same fading. */
  209:["Crepuscolo",  "Alba"],
  210:["Vespro",      "Mattino"],
  211:["Imbrunire",   "Levata"],
  212:["Occaso",      "Oriente"],
  213:["Ponente",     "Levante"],
  214:["Sera",        "Diana"],
  215:["Rossore",     "Fiamma"],
  216:["Brace",       "Favilla"],
  217:["Rubino",      "Ambra"],
  218:["Granata",     "Corallo"],
  219:["Melograno",   "Zafferano"],
  220:["Rame",        "Oro"],
  221:["Cotto",       "Miele"],
  222:["Vinaccia",    "Albicocca"],
  223:["Prugna",      "Pesca"],
  224:["Mora",        "Arancio"],
  225:["Ametista",    "Citrino"],
  226:["Indaco",      "Zolfo"],
  227:["Malva",       "Croco"],
  228:["Lilla",       "Girasole"],

  /* Murano (229–250) — furnace → finished glass. The largest palette
     closes the edition, so the last pair closes the whole thing:
     Sigillo, the seal pressed into the hot glass, and Congedo, leave
     taken. */
  229:["Fornace",     "Calice"],
  230:["Crogiolo",    "Ampolla"],
  231:["Canna",       "Bolla"],
  232:["Soffio",      "Perla"],
  233:["Colata",      "Sfera"],
  234:["Pontello",    "Lampadario"],
  235:["Fusione",     "Lastra"],
  236:["Tempra",      "Lente"],
  237:["Molatura",    "Prisma"],
  238:["Battuto",     "Piatto"],
  239:["Incalmo",     "Bicchiere"],
  240:["Murrina",     "Tessera"],
  241:["Reticello",   "Lattimo"],
  242:["Avventurina", "Opalina"],
  243:["Sommerso",    "Boccia"],
  244:["Pulegoso",    "Smalto"],
  245:["Ricottura",   "Pendaglio"],
  246:["Stampo",      "Vetrata"],
  247:["Soffiatura",  "Rosone"],
  248:["Tenaglia",    "Fiala"],
  249:["Cesello",     "Diadema"],
  250:["Sigillo",     "Congedo"],
};

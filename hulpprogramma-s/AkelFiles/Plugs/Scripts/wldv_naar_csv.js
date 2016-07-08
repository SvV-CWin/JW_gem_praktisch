var folder = AkelPad.GetAkelDir();

AkelPad.TextReplace(0, "\\x{2013}", "-", 0x00280005, true);
	//vervangt vreemde streepjes door gewone streepjes
AkelPad.TextReplace(0, "^ +", "", 0x00280005, true);
	//verwijdert spaties aan het begin van elke regel

AkelPad.TextReplace(0, "^Leven en dienen als christenen: werkboek voor vergaderingen(.*)^Leven en dienen als christenen: werkboek voor vergaderingen,?", "Leven en dienen als christenen: werkboek voor vergaderingen,", 0x00280005, false)
AkelPad.TextReplace(0, "^Leven en dienen als christenen: werkboek voor vergaderingen(.*)^Leven en dienen als christenen: werkboek voor vergaderingen,?", "Leven en dienen als christenen: werkboek voor vergaderingen,", 0x00280005, false)

AkelPad.SetSel(AkelPad.TextFind(0, "(?<=werkboek voor vergaderingen, )", 0x00280005), AkelPad.TextFind(0, "[0-9] [A-Z]", 0x00280005) + 1);
var maand = AkelPad.GetSelText(0);

AkelPad.TextReplace(0, "^([0-9]{1,2})(-[0-9]{1,2} ?)([a-zA-Z]+)\\n([^\\n]+)\\n(.*?)(SCHATTEN UIT GODS WOORD)\\n", "â"+maand+"\\nù\\1\\2\\3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\\1 \\3\\nùGELUID:\\nùPODIUM:\\nùREINIGING:\\n\\nùVRIJDAG \\nùLOOPMICRO L:\\nùLOOPMICRO R:\\nùVOORZITTER:\\n\\5\\nù\\6;\\4\\n", 0x00280005, true);
	//markeert het begin van elke datumregel in de vorm {dag-dag maand} met 'â'
	//zet voor elke datumregel de maand van de wldv
	//plaatst ver achter elke datumregel: "<eerste dag van de week> <maand>"
	//plaatst "GELUID:\nPODIUM:\nREINIGING:\n\nVRIJDAG\nLOOPMICRO L:\nLOOPMICRO R:\nVOORZITTER:" na datumregel
	//markeert het begin van elke regel met "SCHATTEN UIT GODS WOORD" en elke regel met het Bijbelleesgedeelte met 'ù';
	//verplaatst het Bijbelleesgedeelte naast "SCHATTEN UIT GODS WOORD"
AkelPad.TextReplace(0, "^([0-9]{1,2}) ?([a-zA-Z]+) ?- ?([0-9]{1,2} ?[a-zA-Z]+)\\n([^\\n]+)\\n(.*?)(SCHATTEN UIT GODS WOORD)\\n", "â"+maand+"\\nù\\1 \\2 - \\3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\\1 \\2\\nùGELUID:\\nùPODIUM:\\nùREINIGING:\\n\\nùVRIJDAG \\nùLOOPMICRO L:\\nùLOOPMICRO R:\\nùVOORZITTER:\\n\\5\\nù\\6;\\4\\n", 0x00280005, true);
	//doet hetzelfde voor datumregels in de vorm {dag maand-dag maand}
AkelPad.TextReplace(0, "(.*)", "ô\\1ô", 0x00280005, true);
	//markeert het begin van en het einde van het document met 'ô'
AkelPad.TextReplace(0, "^(Lied [0-9]{1,3}) en gebed[^\\n]*\\n", "\\1\\nùGEBED:û\\n", 0x00280005, true);
	//markeert het einde van elke "Lied 000 en gebed" regel met 'û' en splitst het gebed van het lied met een nieuwe regel
AkelPad.TextReplace(0, "ô[^â]*â", "â", 0x00280005, true);
	//verwijdert wat voor de eerste datum staat
AkelPad.TextReplace(0, "û[^û]+ô", "û\\n\\nùZONDAG \\nùVOORZITTER:\\nùLOOPMICRO L:\\nùLOOPMICRO R:\\nùTHEMA LEZING:\\nùSPREKER:\\nùGEMEENTE VAN SPREKER:\\nùWACHTTOREN-LEZER:", 0x00280005, true);
	//verwijdert wat na de laatste "Lied 000 en gebed" staat en vervangt deze door "\nZONDAG\n<wat nodig is voor de zondagvergadering\n\n"
AkelPad.TextReplace(0, "û[^âù]+â", "û\\n\\nùZONDAG \\nùVOORZITTER:\\nùLOOPMICRO L:\\nùLOOPMICRO R:\\nùTHEMA LEZING:\\nùSPREKER:\\nùGEMEENTE VAN SPREKER:\\nùWACHTTOREN-LEZER:\\n\\n\\nâ", 0x00280005, true);
	//verwijdert de extra info tussen de weken en vervangt deze door "\nZONDAG\n<wat nodig is voor de zondagvergadering\n\n"
AkelPad.TextReplace(0, "û", "", 0x00200005, true);
	//verwijdert 'û'
AkelPad.TextReplace(0, "â", "ù", 0x00200005, true);
	//verandert 'â' in 'ù'
AkelPad.TextReplace(0, "^(Lied [0-9]{1,3})", "ù\\1", 0x00280005, true);
	//markeert het begin van elke "Lied 000" regel met 'ù'
AkelPad.TextReplace(0, "^LEG JE TOE OP DE VELDDIENST", "\\nùLEG JE TOE OP DE VELDDIENST", 0x00280005, true);
	//markeert het begin van een cruciale regel met 'ù'
AkelPad.TextReplace(0, "^LEVEN ALS CHRISTENEN\\n", "\\nùLEVEN ALS CHRISTENEN;", 0x00280005, true);
	//markeert het begin van een cruciale regel met 'ù'
AkelPad.TextReplace(0, "[(]([0-9]+) ?min[.]? of korter[)]", "(< \\1 min.)", 0x00280005, true);
	//zet _"(00 min. of korter)"_ om in _"(< 00 min.)"_
AkelPad.TextReplace(0, "^gemeentebijbelstudie[^\\n]+([(]<? ?[0-9]+ ?min[.]?[^\\n]*[)]): {0,1}+([^\\n]+)", "ùGemeentebijbelstudie;\\2;\\1", 0x00280001, true);
	//markeert het begin van elke regel met 'ù', splitst de duur en het materiaal van "Gemeentebijbelstudie" en wisselt duur en materiaal van plaats
AkelPad.TextReplace(0, "^bijbellezen[^\\n]+([(]<? ?[0-9]+ ?min[.]?[^\\n]*[)]): {0,1}+([^\\n]+)", "ùBijbellezen;\\2;\\1", 0x00280001, true);
	//markeert het begin van elke regel met 'ù', splitst de duur en het materiaal van "Bijbellezen" en wisselt duur en materiaal van plaats
AkelPad.TextReplace(0, "^([^\\n]+) ([(]<? ?[0-9]+ ?min[.]?)[^\\n]*", "ù\\1;\\2)", 0x00280005, true);
	//markeert het begin van elke regel die _"(00 min."_ of _"(< 00 min."_ bevat met 'ù', splitst deze duur met ';' en verwijdert wat na de duur staat
AkelPad.TextReplace(0, "^ùeerste gesprek[^\\n]*;[(]", "ùEerste gesprek;(", 0x00280001, true);
AkelPad.TextReplace(0, "^ùnabezoek[^\\n]*;[(]", "ùNabezoek;(", 0x00280001, true);
AkelPad.TextReplace(0, "^ùbijbelstudie[^\\n]*;[(]", "ùBijbelstudie;(", 0x00280001, true);
	//verwijdert in de regel wat (als dat vooraan staat) tussen 'ùeerste gesprek', 'ùnabezoek', 'ùbijbelstudie' staat en ';('
AkelPad.TextReplace(0, "^[^ù\\n][^\\n]+\\n", "", 0x00280005, true);
	//verwijdert elke regel die aan het begin niet gemarkeerd is met 'ù'
AkelPad.TextReplace(0, "ù", "", 0x00200005, true);
AkelPad.TextReplace(0, "GENESIS", "Genesis", 0x00200005, true);
AkelPad.TextReplace(0, "EXODUS", "Exodus", 0x00200005, true);
AkelPad.TextReplace(0, "LEVITICUS", "Leviticus", 0x00200005, true);
AkelPad.TextReplace(0, "NUMERI", "numeri", 0x00200005, true);
AkelPad.TextReplace(0, "DEUTERONOMIUM", "deuteronomium", 0x00200005, true);
AkelPad.TextReplace(0, "JOZUA", "jozua", 0x00200005, true);
AkelPad.TextReplace(0, "RECHTERS", "rechters", 0x00200005, true);
AkelPad.TextReplace(0, "RUTH", "ruth", 0x00200005, true);
AkelPad.TextReplace(0, "1 SAMUËL", "1 Samuël", 0x00200005, true);
AkelPad.TextReplace(0, "2 SAMUËL", "2 Samuël", 0x00200005, true);
AkelPad.TextReplace(0, "1 KONINGEN", "1 Koningen", 0x00200005, true);
AkelPad.TextReplace(0, "2 KONINGEN", "2 Koningen", 0x00200005, true);
AkelPad.TextReplace(0, "1 KRONIEKEN", "1 Kronieken", 0x00200005, true);
AkelPad.TextReplace(0, "2 KRONIEKEN", "2 Kronieken", 0x00200005, true);
AkelPad.TextReplace(0, "EZRA", "Ezra", 0x00200005, true);
AkelPad.TextReplace(0, "NEHEMIA", "Nehemia", 0x00200005, true);
AkelPad.TextReplace(0, "ESTHER", "Esther", 0x00200005, true);
AkelPad.TextReplace(0, "JOB", "Job", 0x00200005, true);
AkelPad.TextReplace(0, "PSALM", "Psalm", 0x00200005, true);
AkelPad.TextReplace(0, "SPREUKEN", "Spreuken", 0x00200005, true);
AkelPad.TextReplace(0, "PREDIKER", "Prediker", 0x00200005, true);
AkelPad.TextReplace(0, "HOOGLIED", "Hooglied", 0x00200005, true);
AkelPad.TextReplace(0, "JESAJA", "Jesaja", 0x00200005, true);
AkelPad.TextReplace(0, "JEREMIA", "Jeremia", 0x00200005, true);
AkelPad.TextReplace(0, "KLAAGLIEDEREN", "Klaagliederen", 0x00200005, true);
AkelPad.TextReplace(0, "EZECHIËL", "Ezechiël", 0x00200005, true);
AkelPad.TextReplace(0, "DANIËL", "Daniël", 0x00200005, true);
AkelPad.TextReplace(0, "HOSEA", "Hosea", 0x00200005, true);
AkelPad.TextReplace(0, "JOËL", "Joël", 0x00200005, true);
AkelPad.TextReplace(0, "AMOS", "Amos", 0x00200005, true);
AkelPad.TextReplace(0, "OBADJA", "Obadja", 0x00200005, true);
AkelPad.TextReplace(0, "JONA", "Jona", 0x00200005, true);
AkelPad.TextReplace(0, "MICHA", "Micha", 0x00200005, true);
AkelPad.TextReplace(0, "NAHUM", "Nahum", 0x00200005, true);
AkelPad.TextReplace(0, "HABAKUK", "Habakuk", 0x00200005, true);
AkelPad.TextReplace(0, "ZEFANJA", "Zefanja", 0x00200005, true);
AkelPad.TextReplace(0, "HAGGAÏ", "Haggaï", 0x00200005, true);
AkelPad.TextReplace(0, "ZACHARIA", "Zacharia", 0x00200005, true);
AkelPad.TextReplace(0, "MALEACHI", "Maleachi", 0x00200005, true);
AkelPad.TextReplace(0, "MATTHEÜS", "Mattheüs", 0x00200005, true);
AkelPad.TextReplace(0, "MARKUS", "Markus", 0x00200005, true);
AkelPad.TextReplace(0, "LUKAS", "Lukas", 0x00200005, true);
AkelPad.TextReplace(0, "JOHANNES", "Johannes", 0x00200005, true);
AkelPad.TextReplace(0, "HANDELINGEN", "Handelingen", 0x00200005, true);
AkelPad.TextReplace(0, "ROMEINEN", "Romeinen", 0x00200005, true);
AkelPad.TextReplace(0, "1 KORINTHIËRS", "1 Korinthiërs", 0x00200005, true);
AkelPad.TextReplace(0, "2 KORINTHIËRS", "2 Korinthiërs", 0x00200005, true);
AkelPad.TextReplace(0, "GALATEN", "Galaten", 0x00200005, true);
AkelPad.TextReplace(0, "EFEZIËRS", "Efeziërs", 0x00200005, true);
AkelPad.TextReplace(0, "FILIPPENZEN", "Filippenzen", 0x00200005, true);
AkelPad.TextReplace(0, "KOLOSSENZEN", "Kolossenzen", 0x00200005, true);
AkelPad.TextReplace(0, "1 THESSALONICENZEN", "1 Thessalonicenzen", 0x00200005, true);
AkelPad.TextReplace(0, "2 THESSALONICENZEN", "2 Thessalonicenzen", 0x00200005, true);
AkelPad.TextReplace(0, "1 TIMOTHEÜS", "1 Timotheüs", 0x00200005, true);
AkelPad.TextReplace(0, "2 TIMOTHEÜS", "2 Timotheüs", 0x00200005, true);
AkelPad.TextReplace(0, "TITUS", "Titus", 0x00200005, true);
AkelPad.TextReplace(0, "FILEMON", "Filemon", 0x00200005, true);
AkelPad.TextReplace(0, "HEBREEËN", "Hebreeën", 0x00200005, true);
AkelPad.TextReplace(0, "JAKOBUS", "Jakobus", 0x00200005, true);
AkelPad.TextReplace(0, "1 PETRUS", "1 Petrus", 0x00200005, true);
AkelPad.TextReplace(0, "2 PETRUS", "2 Petrus", 0x00200005, true);
AkelPad.TextReplace(0, "1 JOHANNES", "1 Johannes", 0x00200005, true);
AkelPad.TextReplace(0, "2 JOHANNES", "2 Johannes", 0x00200005, true);
AkelPad.TextReplace(0, "3 JOHANNES", "3 Johannes", 0x00200005, true);
AkelPad.TextReplace(0, "JUDAS", "Judas", 0x00200005, true);
AkelPad.TextReplace(0, "OPENBARING", "Openbaring", 0x00200005, true);
AkelPad.TextReplace(0, "Ge( [0-9]+)", "Genesis\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ex( [0-9]+)", "Exodus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Le( [0-9]+)", "Leviticus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Nu( [0-9]+)", "Numeri\\1", 0x00280005, true);
AkelPad.TextReplace(0, "De( [0-9]+)", "Deuteronomium\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Joz( [0-9]+)", "Jozua\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Re( [0-9]+)", "Rechters\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ru( [0-9]+)", "Ruth\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Sa( [0-9]+)", "1 Samuël\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Sa( [0-9]+)", "2 Samuël\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Kon( [0-9]+)", "1 Koningen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Kon( [0-9]+)", "2 Koningen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Kr( [0-9]+)", "1 Kronieken\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Kr( [0-9]+)", "2 Kronieken\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ezr( [0-9]+)", "Ezra\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ne( [0-9]+)", "Nehemia\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Es( [0-9]+)", "Esther\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Job( [0-9]+)", "Job\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ps( [0-9]+)", "Psalm\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Sp( [0-9]+)", "Spreuken\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Pr( [0-9]+)", "Prediker\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Hgl( [0-9]+)", "Hooglied\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Jes( [0-9]+)", "Jesaja\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Jer( [0-9]+)", "Jeremia\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Klg( [0-9]+)", "Klaagliederen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ez( [0-9]+)", "Ezechiël\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Da( [0-9]+)", "Daniël\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ho( [0-9]+)", "Hosea\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Joë( [0-9]+)", "Joël\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Am( [0-9]+)", "Amos\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ob( [0-9]+)", "Obadja\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Jon( [0-9]+)", "Jona\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Mi( [0-9]+)", "Micha\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Na( [0-9]+)", "Nahum\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Hab( [0-9]+)", "Habakuk\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ze( [0-9]+)", "Zefanja\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Hag( [0-9]+)", "Haggaï\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Za( [0-9]+)", "Zacharia\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Mal( [0-9]+)", "Maleachi\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Mt( [0-9]+)", "Mattheüs\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Mr( [0-9]+)", "Markus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Lu( [0-9]+)", "Lukas\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Jo( [0-9]+)", "Johannes\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Han( [0-9]+)", "Handelingen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ro( [0-9]+)", "Romeinen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Kor( [0-9]+)", "1 Korinthiërs\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Kor( [0-9]+)", "2 Korinthiërs\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ga( [0-9]+)", "Galaten\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ef( [0-9]+)", "Efeziërs\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Fil( [0-9]+)", "Filippenzen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Kol( [0-9]+)", "Kolossenzen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Th( [0-9]+)", "1 Thessalonicenzen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Th( [0-9]+)", "2 Thessalonicenzen\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Ti( [0-9]+)", "1 Timotheüs\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Ti( [0-9]+)", "2 Timotheüs\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Tit( [0-9]+)", "Titus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Flm( [0-9]+)", "Filemon\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Heb( [0-9]+)", "Hebreeën\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Jak( [0-9]+)", "Jakobus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Pe( [0-9]+)", "1 Petrus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Pe( [0-9]+)", "2 Petrus\\1", 0x00280005, true);
AkelPad.TextReplace(0, "1Jo( [0-9]+)", "1 Johannes\\1", 0x00280005, true);
AkelPad.TextReplace(0, "2Jo( [0-9]+)", "2 Johannes\\1", 0x00280005, true);
AkelPad.TextReplace(0, "3Jo( [0-9]+)", "3 Johannes\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Ju( [0-9]+)", "Judas\\1", 0x00280005, true);
AkelPad.TextReplace(0, "Opb( [0-9]+)", "Openbaring\\1", 0x00280005, true);

AkelPad.SaveFile(0, folder+"\\..\\WLDV verwerken\\programmaties\\verwerkte gegevens\\wldv.csv");
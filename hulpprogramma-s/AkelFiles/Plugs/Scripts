AkelPad.TextReplace(0, "^ ?([^\\n]+\\n)[^\\n]+\\n ?LIEDEREN: ?([0-9]+), ?([0-9]+)", "ùLied \\2\\nù\\1ùLied \\3 en gebed\\n", 0x00280005, true);
AkelPad.TextReplace(0, "^[^ù][^\\n]*\\n", "", 0x00280005, true);
AkelPad.TextReplace(0, "ù", "", 0x00200005, true);
AkelPad.SetSel(0, -1);
var nieuw = AkelPad.GetSelText(0);
AkelPad.SaveFile(0, "X:\\temp_w.txt");

var folder = AkelPad.GetAkelDir();
AkelPad.WriteFile(folder+"\\..\\WLDV verwerken\\W besprekingen.csv", nieuw, -1, 65001, false, 2);

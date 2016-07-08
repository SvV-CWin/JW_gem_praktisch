@ECHO OFF

for %%i in (*.epub) do set oldWLDV=%%i
if %oldWLDV:~8,2% EQU 12 (
set /A WLDVdate=%oldWLDV:~4,6%-11+100
) else (
set /A WLDVdate=%oldWLDV:~4,6%+1
)
"..\hulpprogramma's\DownloadFile.exe" "http://www.jw.org/apps/TRGCHlZRQVNYVrXF?issue=%WLDVdate%&output=html&pub=mwb&fileformat=EPUB&alllangs=0&langwritten=O&txtCMSLang=O" "mwb_%WLDVdate%.epub"
"..\hulpprogramma's\DownloadFile.exe" "http://www.jw.org/apps/TRGCHlZRQVNYVrXF?issue=%WLDVdate%&output=html&pub=mwb&fileformat=PDF&alllangs=0&langwritten=O&txtCMSLang=O" "%WLDVdate%.pdf"
ECHO(
ECHO Het nieuwe epub bestand zou nu gedownloaded moeten zijn
ECHO(
pause
move "%oldWLDV%" "archief\%oldWLDV%"
set oldWLDV=

"..\hulpprogramma's\balabolka_text.exe" -f "mwb_%WLDVdate%.epub" -p "laatste WLDV" -u -e utf8 --remove-spaces --remove-line-breaks --remove-empty-lines
set WLDVdate=
taskkill /im akelpad.exe
"..\hulpprogramma's\AkelPad.exe" /OpenFile("laatste WLDV.txt") /Call("Scripts::Main",2,"wldv_naar_csv.js") /Quit

ECHO(
ECHO Bestand OK? Bewerken met LO?
ECHO(
"..\hulpprogramma's\AkelPad.exe" /OpenFile("programmaties\verwerkte gegevens\wldv.csv")
for /f "delims=" %%i in ('dir /s /b "C:\Program Files\*soffice.exe"') do set LO=%%i
"%LO%" "programmaties\voorbereiden nieuw schema.ods" "macro://voorbereiden nieuw schema/Standard.voorbereiden_schema.main"

set LO=
pause

ECHO(
ECHO VOER MANUEEL INVOERVELDEN IN EN CONTROLEER OP 'SPECIALE GELEGENHEDEN' (KRING,...)
ECHO Je kan het aangemaakte schema nu doorsturen
ECHO(
"%USERPROFILE%\Opera Mail\operamail.exe"
pause

exit
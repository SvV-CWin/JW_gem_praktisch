@ECHO OFF

for %%i in (*.epub) do set oldW=%%i
if %oldW:~6,2% EQU 12 (
set /A Wdate=%oldW:~2,6%-11+100
) else (
set /A Wdate=%oldW:~2,6%+1
)

ECHO Uitgave %Wdate% aan het downloaden...
"..\hulpprogramma's\DownloadFile.exe" "http://www.jw.org/apps/TRGCHlZRQVNYVrXF?issue=%Wdate%&output=html&pub=w&fileformat=EPUB&alllangs=0&langwritten=O&txtCMSLang=O" "w_%Wdate%.epub"
"..\hulpprogramma's\DownloadFile.exe" "http://www.jw.org/apps/TRGCHlZRQVNYVrXF?issue=%Wdate%&output=html&pub=w&fileformat=PDF&alllangs=0&langwritten=O&txtCMSLang=O" "%Wdate%_pdf.html"
"%Wdate%_pdf.html"
ECHO TODO:: als %%Wdate%%.epub niet bestaat, afbreken en waarschuwen
"..\hulpprogramma's\balabolka_text.exe" -f "w_%Wdate%.epub" -p "laatste W" -u -e utf8 --remove-spaces --remove-line-breaks --remove-empty-lines
"..\hulpprogramma's\filter leesteksten.exe" "%cd%\laatste W.txt" "%cd%\..\hulpprogramma's\AkelFiles\Plugs\Scripts\verwerk_w_teksten.js"
"..\hulpprogramma's\AkelPad.exe" /OpenFile("laatste W.txt") /Call("Scripts::Main",2,"verwerk_w_besprekingen.js") /Quit
"..\hulpprogramma's\AkelPad.exe" /OpenFile("laatste W.txt") /Call("Scripts::Main",2,"verwerk_w_teksten.js") /Quit
for /f "delims=" %%i in ('dir /s /b "C:\Program Files\*soffice.exe"') do set LO=%%i
"%LO%" "verwerk_w_teksten.odt"  "macro://verwerk_w_teksten/Standard.MainModule.main(x:\w_teksten.html)"
set LO=

exit

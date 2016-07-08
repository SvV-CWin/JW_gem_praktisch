@ECHO OFF

ECHO(
ECHO Annuleer dit batch-script als je nog geen datum hebt voor JW Broadcasting!
ECHO(
pause

IF NOT EXIST "schema.xls" (
ECHO(
ECHO Gelieve het toegekomen schema in
ECHO %CD%
ECHO op te slaan als "schema.xls"
ECHO(
pause
exit )

set /p DOkuis=Mogen alle gegevens van eerdere verwerkingen weg?: (Ja/Iets anders...)
if /I %DOkuis% EQU Ja (
	call "programmaties\voorkuis.bat"
)

for /f "delims=" %%i in ('dir /s /b "C:\Program Files\*soffice.exe"') do set LO=%%i
"%LO%" "programmaties\verwerken toegekomen schema.ods" "macro://verwerken toegekomen schema/Standard.initialisatie.main"
set LO=
ECHO(
ECHO Volgende stap is het spiegelen en afdrukken van het programmablad.
ECHO(
pause

call "programmaties\maak programmablad.bat"

for %%i in (*_gespiegeld.pdf) do set programmablad=%%i
"%programmablad%"
ECHO(
ECHO Je kan het aangemaakte programmablad nu afdrukken
ECHO(
pause
set programmablad=
ECHO(
ECHO Je kan de aangemaakte programmabladen nu doorsturen
ECHO(
"%USERPROFILE%\Opera Mail\operamail.exe"
pause

call "programmaties\nakuis.bat"

exit
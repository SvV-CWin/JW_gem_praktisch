rem wat gemaild is bijhouden, want mail wordt niet bijgehouden in Verzonden map
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set datum=%%c%%b%%a)
md "archief\gemailde gegevens\%datum%"
copy "programmaties\verwerkte gegevens\toewijzingen*" "archief\gemailde gegevens\%datum%"

for %%i in (*.pdf) do set programmablad=%%i
set programmablad=%programmablad:_gespiegeld.pdf=%.pdf
copy "%programmablad%" "archief\%programmablad%"
set programmablad=

ren "schema.xls" "schema %datum%.xls"
copy "schema %datum%.xls" "archief\schema %datum%.xls"
del "schema %datum%.xls"
set datum=
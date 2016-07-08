del "programmaties\verwerkte gegevens\*.ics_part"
del "programmaties\verwerkte gegevens\*.ics"
del "programmaties\verwerkte gegevens\*.pdf"
del "programmaties\verwerkte gegevens\*.txt"

for %%i in (*.pdf) do set programmablad=%%i
set programmablad=%programmablad:_gespiegeld.pdf=%.pdf
del "%programmablad%"
del "%programmablad:.pdf=%_gespiegeld.pdf"
del "%programmablad:.pdf=%_A4.pdf
set programmablad=
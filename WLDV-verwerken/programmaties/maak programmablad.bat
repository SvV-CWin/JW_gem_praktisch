for %%i in (*.pdf) do set programmablad=%%i
"..\hulpprogramma's\pdftk.exe" "%programmablad%" cat 4 1 2 3 output "%programmablad:.pdf=%_A4_ToImpose.pdf"
"..\hulpprogramma's\Gimpose.exe"
"..\hulpprogramma's\pdftk.exe" "%programmablad:.pdf=%_A4.pdf" rotate 2south output "%programmablad:.pdf=%_A4_gespiegeld.pdf"
del "%programmablad:.pdf=%_A4_ToImpose.pdf"
set programmablad=
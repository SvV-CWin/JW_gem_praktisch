#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void kortaf(char []);
void add_filter(FILE *, char [], char [], char []);
void complete_js(FILE *, char []);

int main(int argc, char *argv[])
{
	if(argc < 3)
	{
		puts("\nOnvoldoende parameters!\nEerste parameter: in te lezen bestandsnaam.\nTweede parameter: aan te vullen js-script.");
		printf("argc = %d\n", argc);
		switch(argc)
		{
			case 1:
				printf("argv[0] = %s\n", argv[0]);
				break;
			case 2:
				printf("argv[0] = %s\nargv[1] = %s\n", argv[0], argv[1]);
				break;
		}
		return 0;
	}
	printf("\nDe te lezen teksten worden van\n \'%s\'\ngefilterd, hervormt naar de verkorte vorm en in een regel verwerkt naar\n \'%s\'.\n\n", argv[1], argv[2]);
	
	FILE *in, *js;
	in = fopen(argv[1], "r");
	int x = strlen(argv[2]);
	char fjs[x+2], orig [x+1];
	sprintf(fjs, "%s_", argv[2]);
	strcpy(orig, argv[2]);
	js = fopen(fjs, "w");
	fputs("//De volgende regels zijn toegevoegd door het zelfgemaakt programma \'filter leesteksten\'.\n", js);

	char boeknaam[25], hoofdstuk[4], verzen[8];
	short int i, j;

	while(x = fgetc(in), x != EOF)
	{
		while((x != EOF)&&(x != 'l')&&(x != 'L'))
			x = fgetc(in);
		if((fgetc(in) != 'e')||(fgetc(in) != 'e')||(fgetc(in) != 's')||(fgetc(in) != ' '))
			goto loopend;
		if(x = fgetc(in), !isdigit(x)&&!isupper(x))
		{
			printf("Vreemd! Vond \'%c\' (= %d) (EOF=%d,ERROR=%d) achter \"Lees \".\n", x, x, feof(in), ferror(in));
			goto loopend;
		}
		ungetc(x, in);
		for(i=0; x = fgetc(in), x != '.'; ++i)
		{
			boeknaam[i] = x;
			if((x == ' ')&&(i != 1))
				break;
		}
		boeknaam[i] = '\0';
		kortaf(boeknaam);
		for(i=0; x = fgetc(in), x != '.'; ++i)
		{
			hoofdstuk[i] = x;
			if(x == ':')
				break;
		}
		hoofdstuk[i] = '\0';
		if(x == '.')
		{
			printf("%s %s\n", boeknaam, hoofdstuk);
			add_filter(js, boeknaam, hoofdstuk, NULL);
		}
		else
		{
			for(i=0; x = fgetc(in), (x != '.')&&(x != ')'); ++i)
			{
				verzen[i] = x;
				if(!isdigit(x))
				{
					switch(x)
					{
						case ',':	//"x, y" (met y = x + 1 staat ook zo in de lijst met teksten)
							if(i == 0)
							{
								if(x = fgetc(in), x != ' ')
									ungetc(x, in);
								i = -1;
								break;
							}
							for(++i; x = fgetc(in), (x == ' ')||isdigit(x); ++i)
								verzen[i] = x;
							verzen[i] = '\0';
							j = atoi(verzen);
							if(strchr(verzen, ' ') != NULL)
								j = atoi(strchr(verzen, ' ')+1) - j;
							else
								j = atoi(strchr(verzen, ',')+1) - j;
							if(j == 1)
							{
								printf("%s %s:%s\n", boeknaam, hoofdstuk, verzen);
								add_filter(js, boeknaam, hoofdstuk, verzen);
							}
							else
							{
								if(strchr(verzen, ' ') != NULL)
									memmove(strchr(verzen, ' '), strchr(verzen, ' ')+1, strlen(strchr(verzen, ' ')+1)+1);
								*strchr(verzen, ',') = '\0';
								printf("%s %s:%s\n%s %s:%s\n", boeknaam, hoofdstuk, verzen, boeknaam, hoofdstuk, strrchr(verzen, '\0')+1);
								add_filter(js, boeknaam, hoofdstuk, verzen);
								add_filter(js, boeknaam, hoofdstuk, strrchr(verzen, '\0')+1);
							}
							i = -1;
							ungetc(x, in);
							break;
						case '-':
							for(++i; x= fgetc(in), isdigit(x); ++i)
								verzen[i] = x;
							verzen[i] = '\0';
							printf("%s %s:%s\n", boeknaam, hoofdstuk, verzen);
							add_filter(js, boeknaam, hoofdstuk, verzen);
							i = -1;
							ungetc(x, in);
							break;
						case ';':
							verzen[i] = '\0';
							printf("%s %s:%s\n", boeknaam, hoofdstuk, verzen);
							add_filter(js, boeknaam, hoofdstuk, verzen);
							if(x = fgetc(in), x != ' ')
								ungetc(x, in);
							verzen[0] = fgetc(in);
							verzen[1] = fgetc(in);
							if((verzen[1] == ' ')||(isalpha(verzen[1])))
							{
								boeknaam[0] = verzen[0];
								boeknaam[1] = verzen[1];
								for(j=2; x = fgetc(in), x != '.'; ++j)
								{
									boeknaam[j] = x;
									if(x == ' ')
										break;
								}
								boeknaam[j] = '\0';
								for(j=0; x = fgetc(in), x != '.'; ++j)
								{
									hoofdstuk[j] = x;
									if(x == ':')
										break;
								}
								hoofdstuk[j] = '\0';
								if(x == '.')
								{
									printf("%s %s\n", boeknaam, hoofdstuk);
									add_filter(js, boeknaam, hoofdstuk, NULL);
								}
							}
							else
							{
								hoofdstuk[0] = verzen[0];
								if(verzen[1] == ':')
									hoofdstuk[1] = '\0';
								else
								{
									hoofdstuk[1] = verzen[1];
									for(j=2; x = fgetc(in), x != ':'; ++j)
										hoofdstuk[j] = x;
									hoofdstuk[j] = '\0';
								}
							}
							i = -1;
							break;
						default:
							verzen[i] = '\0';
							printf("Vreemd! Vond dit teken (\'%c\') bij het doorzoeken van de verzen van deze referentie:\n %s %s:%s\nDeze referentie wordt genegeerd.\n", x, boeknaam, hoofdstuk, verzen);
							i = -1;
							break;
					}
				}
			}
			if(i != 0)
			{
				verzen[i] = '\0';
				printf("%s %s:%s\n", boeknaam, hoofdstuk, verzen);
				add_filter(js, boeknaam, hoofdstuk, verzen);
			}
		}
		loopend:;
	}
	fclose(in);
	complete_js(js, orig);
	fclose(js);
	remove(orig);
	rename(fjs, orig);
	return 0;
}

void add_filter(FILE *js, char boeknaam[], char hoofdstuk[], char verzen[])
{
//^[\^] [^0-9]+[0-9]{1,2} [(]Deut[.] 6:6-9[)][^\n]+\n
	if(verzen == NULL)
		fprintf(js, "AkelPad.TextReplace(0, \"^[\\\\^] [^0-9]+[0-9]{1,2} [(]%s %s[)][^\\\\n]+\\\\n\", \"\", 0x00280005, true);\n", boeknaam, hoofdstuk);
	else
		fprintf(js, "AkelPad.TextReplace(0, \"^[\\\\^] [^0-9]+[0-9]{1,2} [(]%s %s:%s[)][^\\\\n]+\\\\n\", \"\", 0x00280005, true);\n", boeknaam, hoofdstuk, verzen);
}

void complete_js(FILE *js, char fin[])
{
puts("\n aan de vervollediging...\n");
	FILE *in = fopen(fin, "r");
	fputs("//@ EINDE toegevoegde regels\n", js);
	char x;
	while(x = fgetc(in), x != '@');
	while(x = fgetc(in), x != '\n');
	while(x = fgetc(in), x != EOF)
		fputc(x, js);
	fclose(in);
}

void kortaf(char boeknaam[])
{
	char x;
	if(!(strcmp(boeknaam, "Amos")&&strcmp(boeknaam, "Esther")&&strcmp(boeknaam, "Ezra")&&/*strcmp("Hosea")&&*/strcmp(boeknaam, "Job")&&(strncmp(boeknaam, "Jo", 2)||(boeknaam[4] != 'l'))&&strcmp(boeknaam, "Jona")&&strcmp(boeknaam, "Micha")&&strcmp(boeknaam, "Nahum")&&strcmp(boeknaam, "Ruth")))	//Ezra!, Job!, Joël!, Jona!, Micha!, Ruth!
		return;
	switch(boeknaam[0])
	{
		case '1':
		case '2':
		case '3':
			switch(boeknaam[2])
			{
				case 'K':
					if(boeknaam[3] == 'r')
						x = 6;
					else
						x = 5;
					break;
				case 'T':
					if(boeknaam[5] == 'h')
						x = 7;
					else
						x = 5;
					break;
				case 'J':
				case 'S':
					x = 5;
					break;
				case 'P':
					x = 6;
					break;
			}
			break;
		case 'E':
			if((boeknaam[1] == 'f')||(boeknaam[1] == 'x'))
				x = 2;
			else
				x = 5;
			break;
		case 'D':
			if(boeknaam[1] == 'a')
				x = 3;
			else
				x = 4;
			break;
		case 'K':
			if(boeknaam[1] == 'o')
				x = 3;
			else
				x = 6;
			break;
		case 'M':
			switch(boeknaam[2])
			{
				case 'l':
					x = 3;
					break;
				case 'r':
					x = 4;
					break;
				case 't':
					x = 5;
					break;
			}
			break;
		case 'O':
			if(boeknaam[1] == 'p')
				x = 5;
			else
				x = 2;
			break;
		case 'P':
			if(boeknaam[1] == 'r')
				x = 4;
			else
				x = 2;
			break;
		case 'R':
			if(boeknaam[1] == 'e')
				x = 5;
			else
				x = 3;
			break;
		case 'Z':
			if(boeknaam[1] == 'a')
				x = 4;
			else
				x = 3;
			break;
		case 'F':
		case 'G':
		case 'J':
		case 'L':
		case 'N':
		case 'S':
		case 'T':
			x = 3;
			break;
		case 'H':
			if(!(strncmp(boeknaam, "Hab", 3)||strncmp(boeknaam, "Hag", 3)||strncmp(boeknaam, "Hos", 3)))	//Hosea?
				x = 3;
			else if((boeknaam[1] == 'a')||(boeknaam[1] == 'e'))
				x = 4;
			else if(boeknaam[2] == 'o')
				x = 5;
			break;
		default:
			x = 0;
			break;
	}
	if(x)
	{
		boeknaam[x] = '.';
		boeknaam[x+1] = '\0';
	}
}
//Genesis
//Exodus
//Leviticus
//Numeri
//Deuteronomium
//Jozua
//Rechters
//Ruth
//1 Samuël
//2 Samuël
//1 Koningen
//2 Koningen
//1 Kronieken
//2 Kronieken
//Ezra
//Nehemia
//Esther
//Job
//Psalmen
//Spreuken
//Prediker
//Hooglied
//Jesaja
//Jeremia
//Klaagliederen
//Ezechiël
//Daniël
//Hosea
//Joël
//Amos
//Obadja
//Jona
//Micha
//Nahum
//Habakuk
//Zefanja
//Haggaï
//Zacharia
//Maleachi
//Mattheüs
//Markus
//Lukas
//Johannes
//Handelingen
//Romeinen
//1 Korinthiërs
//2 Korinthiërs
//Galaten
//Efeziërs
//Filippenzen
//Kolossenzen
//1 Thessalonicenzen
//2 Thessalonicenzen
//1 Timotheüs
//2 Timotheüs
//Titus
//Filemon
//Hebreeën
//Jakobus
//1 Petrus
//2 Petrus
//1 Johannes
//2 Johannes
//3 Johannes
//Judas
//Openbaring

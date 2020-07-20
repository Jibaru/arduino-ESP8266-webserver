
#include <Arduino.h>
#include "volumetro.h"

Volumetro::Volumetro(
int pin_1, 
int pin_2, 
int pin_3, 
int pin_4, 
int pin_5, 
int pin_6,
int pin_7,
int pin_8, 
int pin_max,
int pin_musica)
{
	_pin_1 = pin_1;
	_pin_2 = pin_2;
	_pin_3 = pin_3;
	_pin_4 = pin_4;
	_pin_5 = pin_5;
	_pin_6 = pin_6;
	_pin_7 = pin_7;
	_pin_8 = pin_8;
	_pin_max = pin_max;
	_pin_musica = pin_musica;
	_usa_potenciometro = true;
}

void Volumetro::inicializar()
{
	pinMode(_pin_1, OUTPUT);
	pinMode(_pin_2, OUTPUT);
	pinMode(_pin_3, OUTPUT);
	pinMode(_pin_4, OUTPUT);
	pinMode(_pin_5, OUTPUT);
	pinMode(_pin_6, OUTPUT);
	pinMode(_pin_7, OUTPUT);
	pinMode(_pin_8, OUTPUT);
	
	digitalWrite(_pin_1, LOW);
	digitalWrite(_pin_2, LOW);
	digitalWrite(_pin_3, LOW);
	digitalWrite(_pin_4, LOW);
	digitalWrite(_pin_5, LOW);
	digitalWrite(_pin_6, LOW);
	digitalWrite(_pin_7, LOW);
	digitalWrite(_pin_8, LOW);
}

void Volumetro::setMax(int max)
{
	_max = max;
}

void Volumetro::setUsaPotenciometro(bool usa)
{
	_usa_potenciometro = usa;
}

int Volumetro::max()
{
	return (_usa_potenciometro) 
		? analogRead(_pin_max)
		: max;
}

int Volumetro::seg()
{
	return max() / 8;
}

int Volumetro::musica()
{
	return analogRead(_pin_musica);
}

void Volumetro::ejecutar()
{
	int musica = musica();
	int seg = seg();
	///////////////LED 1/////////////////////////////   
    if(musica > 0)
    	digitalWrite(_pin_1, HIGH);
    else
    	digitalWrite(_pin_1, LOW);
    
    ///////////////LED 2/////////////////////////////
    
    if(musica > seg)
		digitalWrite(_pin_2, HIGH);
    else 
		digitalWrite(_pin_2, LOW);
    
    ///////////////LED 3/////////////////////////////
    
    if(musica > (seg * 2))
    	digitalWrite(_pin_3, HIGH);
    else
		digitalWrite(_pin_3, LOW);
    
    ///////////////LED 4/////////////////////////////
    if(musica > (seg * 3))  
		digitalWrite(_pin_4, HIGH);
    else {
		digitalWrite(_pin_4, LOW);
    
    ///////////////LED 5/////////////////////////////    
    if(musica > (seg * 4))  
		digitalWrite(_pin_5, HIGH);
    else
    	digitalWrite(_pin_5, LOW);
    
    ///////////////LED 6/////////////////////////////    
    if(musica > (seg * 5))
    	digitalWrite(_pin_6, HIGH);
    else
    	digitalWrite(_pin_6, LOW);
    
    ///////////////LED 7/////////////////////////////
    if(musica > (seg * 6))
    	digitalWrite(_pin_7, HIGH);
    else
    	digitalWrite(_pin_7, LOW);
    
    ///////////////LED 8/////////////////////////////
    if(musica > (seg * 7))
    	digitalWrite(_pin_8, HIGH);
    else {
    	digitalWrite(_pin_8, LOW);
}

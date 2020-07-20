
#ifndef
#define _VOLUMETRO_H_

class Volumetro	{
private:
	int _pin_1, _pin_2, _pin_3, _pin_4, _pin_5, _pin_6, _pin_7, _pin_8;
	int _pin_max;
	int _pin_musica;
	int _max;
	bool _usa_potenciometro;
public:
	Volumetro(int, int, int, int, int, int, int, int, int, int);
	void setUsaPotenciometro(bool);
	void setMax(int);
	void inicializar();
	void ejecutar();
	int seg();
	int max();
	int musica();
};


#endif

'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { exportMenuToPDF } from '@/utils/exportMenuPDF';
import { FaFilePdf, FaMagic } from 'react-icons/fa';
import NavigationButtons from '@/components/shared/NavigationButtons';
import DiaMenuRow from '@/components/menu/DiaMenuRow';
import {
  diasSemana,
  particularidadesRecetas,
  TipoComensal,
  postresDeLeche
} from '@/data/menu-data';
import { generarMenuInteligente } from '@/utils/menu-generator';

const MenuSemanal = () => {
  const [menu, setMenu] = useState(
    diasSemana.map((dia) => ({
      dia,
      principal: '',
      acompanamiento: '',
      recetaBase: '',
      postre: '',
      sinMenu: false,
      porciones: { chica: '', mediana: '', grande: '' },
      incluirPan: true // Por defecto se incluye pan, a menos que la receta lleve masa
    }))
  );

  const [mostrarRecetaBase, setMostrarRecetaBase] = useState(false);
  const [mostrarPostre, setMostrarPostre] = useState(false);
  const [mismaCantidadTodos, setMismaCantidadTodos] = useState(true); // Marcado por defecto
  const [porcionesGlobales, setPorcionesGlobales] = useState({ chica: '', mediana: '', grande: '' });

  const manejarCambio = (index: number, campo: 'principal' | 'acompanamiento' | 'recetaBase' | 'postre', valor: string) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index][campo] = valor;

    // Si se cambia la receta principal, ajustar acompañamiento y postre según recomendaciones
    if (campo === 'principal') {
      const particularidades = valor ? particularidadesRecetas[valor] : null;

      // Si no lleva guarnición (ensaladas completas, lasaña), limpiar acompañamiento
      if (particularidades && particularidades.acompanamientosRecomendados.length === 0 && !particularidades.acompanamientoIncluido) {
        nuevoMenu[index].acompanamiento = '';
      }

      // Si tiene guarnición incluida, limpiar acompañamiento
      if (particularidades?.acompanamientoIncluido) {
        nuevoMenu[index].acompanamiento = '';
      }

      // Si la receta lleva masa, no incluir pan
      if (particularidades?.llevaMasa) {
        nuevoMenu[index].incluirPan = false;
      } else {
        nuevoMenu[index].incluirPan = true;
      }

      // Ajustar postre si el actual no cumple con las recomendaciones
      // (Esta lógica se ha simplificado ya que DiaMenuRow maneja las advertencias visuales,
      // pero mantenemos la limpieza de postres inválidos si es necesario)
      // Por ahora, dejamos que el usuario decida si cambiarlo basado en las advertencias.
    }

    // Si se cambia el acompañamiento a arroz (cualquier variante) y el postre es arroz con leche, limpiar postre
    const acompanamientosConArroz = ['Arroz', 'Arroz con vegetales salteados', 'Arroz amarillo', 'Arroz plato principal'];
    if (campo === 'acompanamiento' && valor && acompanamientosConArroz.includes(valor) && nuevoMenu[index].postre === 'Arroz con leche') {
      nuevoMenu[index].postre = '';
    }

    setMenu(nuevoMenu);
  };

  const manejarCambioPorciones = (index: number, tipo: TipoComensal, valor: string) => {
    const nuevoMenu = [...menu];
    // Permitir string vacío o números
    nuevoMenu[index].porciones[tipo] = valor;
    setMenu(nuevoMenu);
  };

  const manejarCambioPorcionesGlobales = (tipo: TipoComensal, valor: string) => {
    const nuevasPorcionesGlobales = {
      ...porcionesGlobales,
      [tipo]: valor
    };
    setPorcionesGlobales(nuevasPorcionesGlobales);

    // Aplicar a todos los días que no estén marcados como "sin menú"
    setMenu(prevMenu => prevMenu.map(item => {
      if (item.sinMenu) return item;
      return {
        ...item,
        porciones: {
          ...nuevasPorcionesGlobales
        }
      };
    }));
  };

  const manejarToggleMismaCantidad = (activado: boolean) => {
    setMismaCantidadTodos(activado);
    if (activado) {
      // Si se activa, buscar el primer día con valores para inicializar los campos globales
      const primerDiaConValores = menu.find(item => !item.sinMenu &&
        (item.porciones.chica || item.porciones.mediana || item.porciones.grande));

      if (primerDiaConValores) {
        // Si hay valores en algún día, usarlos como valores globales
        setPorcionesGlobales({ ...primerDiaConValores.porciones });
        // Aplicar estos valores a todos los días
        const nuevoMenu = menu.map(item => {
          if (item.sinMenu) return item;
          return {
            ...item,
            porciones: { ...primerDiaConValores.porciones }
          };
        });
        setMenu(nuevoMenu);
      } else {
        // Si no hay valores, aplicar los valores globales actuales (pueden estar vacíos)
        const nuevoMenu = menu.map(item => {
          if (item.sinMenu) return item;
          return {
            ...item,
            porciones: { ...porcionesGlobales }
          };
        });
        setMenu(nuevoMenu);
      }
    }
  };

  const manejarSinMenu = (index: number, valor: boolean) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index].sinMenu = valor;
    if (valor) {
      nuevoMenu[index].principal = '';
      nuevoMenu[index].acompanamiento = '';
      nuevoMenu[index].recetaBase = '';
      nuevoMenu[index].postre = '';
      nuevoMenu[index].porciones = { chica: '', mediana: '', grande: '' };
    } else if (mismaCantidadTodos) {
      // Si se desactiva "sin menú" y el modo global está activo, aplicar porciones globales
      nuevoMenu[index].porciones = { ...porcionesGlobales };
    }
    setMenu(nuevoMenu);
  };

  // Función para convertir las porciones a números para el PDF
  const getPorcionesNumericas = (porciones: { chica: string; mediana: string; grande: string }) => {
    return {
      chica: Number(porciones.chica) || 0,
      mediana: Number(porciones.mediana) || 0,
      grande: Number(porciones.grande) || 0
    };
  };

  return (
    <div className="p-6 bg-neutral-card shadow rounded-xl">
      <div className="mb-4">
        <NavigationButtons />
      </div>

      <h2 className="text-2xl font-bold text-primary mb-6">Planificación semanal</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <button
          onClick={() => {
            const nuevoMenu = generarMenuInteligente();
            // Si el modo "misma cantidad" está activo, mantener las porciones globales
            if (mismaCantidadTodos) {
              nuevoMenu.forEach(item => {
                if (!item.sinMenu) {
                  item.porciones = { ...porcionesGlobales };
                }
              });
            }
            setMenu(nuevoMenu);
            // Mostrar postres automáticamente si se generaron
            if (nuevoMenu.some(item => item.postre)) {
              setMostrarPostre(true);
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-hover hover:to-primary-dark transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          title="Genera un menú semanal automáticamente respetando las frecuencias de carnes y postres recomendadas"
        >
          <FaMagic className="text-lg" />
          Generar Menú Inteligente
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => setMostrarRecetaBase(!mostrarRecetaBase)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${mostrarRecetaBase
                ? 'bg-primary text-white'
                : 'bg-neutral-soft text-neutral-text hover:bg-neutral-soft/80'
              }`}
          >
            {mostrarRecetaBase ? 'Ocultar' : 'Mostrar'} Receta Base
          </button>
          <button
            onClick={() => setMostrarPostre(!mostrarPostre)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${mostrarPostre
                ? 'bg-primary text-white'
                : 'bg-neutral-soft text-neutral-text hover:bg-neutral-soft/80'
              }`}
          >
            {mostrarPostre ? 'Ocultar' : 'Mostrar'} Postre
          </button>
        </div>
      </div>

      {/* Opción para mantener misma cantidad de comensales */}
      <div className="mb-6 p-4 bg-gradient-to-r from-neutral-bg to-neutral-card rounded-lg border-2 border-primary/30 shadow-sm">
        <label className="inline-flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={mismaCantidadTodos}
            onChange={(e) => manejarToggleMismaCantidad(e.target.checked)}
            className="w-5 h-5 text-primary border-neutral-soft rounded focus:ring-primary focus:ring-2 cursor-pointer"
          />
          <span className="ml-3 text-base font-semibold text-neutral-text group-hover:text-primary transition-colors">
            Mantener la misma cantidad de comensales en todos los días
          </span>
        </label>

        {mismaCantidadTodos && (
          <div className="mt-4 p-4 bg-neutral-card rounded-lg border border-primary/20 shadow-inner">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Ingrese la cantidad de porciones que se aplicará a todos los días:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['chica', 'mediana', 'grande'] as TipoComensal[]).map((tipo) => (
                <div key={tipo}>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Porciones {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </label>
                  <input
                    type="number"
                    value={porcionesGlobales[tipo]}
                    onChange={(e) => manejarCambioPorcionesGlobales(tipo, e.target.value)}
                    className="w-full p-3 border-2 border-primary rounded-lg text-neutral-text text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    min={0}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {menu.map((item, index) => (
        <DiaMenuRow
          key={item.dia}
          item={item}
          index={index}
          onChange={manejarCambio}
          onToggleSinMenu={manejarSinMenu}
          onPorcionesChange={manejarCambioPorciones}
          mostrarRecetaBase={mostrarRecetaBase}
          mostrarPostre={mostrarPostre}
          mismaCantidadTodos={mismaCantidadTodos}
        />
      ))}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            // Convertir las porciones a números antes de exportar y asegurar incluirPan
            const menuConNumeros = menu.map(item => {
              const particularidades = item.principal ? particularidadesRecetas[item.principal] : null;
              const incluirPan = particularidades?.llevaMasa ? false : (item.incluirPan !== false);
              return {
                ...item,
                porciones: getPorcionesNumericas(item.porciones),
                incluirPan
              };
            });
            exportMenuToPDF(menuConNumeros);
          }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
        >
          <FaFilePdf className="text-white" />
          Exportar menú semanal
        </button>
      </div>
    </div>
  );
};

export default MenuSemanal;

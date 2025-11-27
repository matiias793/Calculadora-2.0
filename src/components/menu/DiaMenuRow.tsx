import React from 'react';
import {
    particularidadesRecetas,
    TipoComensal,
    postresDeLeche,
    variantesPostreDeLeche
} from '@/data/menu-data';
import {
    nombresRecetasAlmuerzo,
    nombresAcompanamientos,
    nombresRecetasBase
} from '@/utils/recetas-almuerzo';
import {
    obtenerAdvertenciaPostre,
    obtenerRecomendacionesPostre,
    calcularPan
} from '@/utils/menu-rules';
import { obtenerPesoPostre, pesosPostres } from '@/utils/pesos-postres';

interface MenuDayItem {
    dia: string;
    principal: string;
    acompanamiento: string;
    recetaBase: string;
    postre: string;
    sinMenu: boolean;
    porciones: { chica: string; mediana: string; grande: string };
    incluirPan: boolean;
}

interface DiaMenuRowProps {
    item: MenuDayItem;
    index: number;
    onChange: (index: number, campo: 'principal' | 'acompanamiento' | 'recetaBase' | 'postre', valor: string) => void;
    onToggleSinMenu: (index: number, valor: boolean) => void;
    onPorcionesChange: (index: number, tipo: TipoComensal, valor: string) => void;
    mostrarRecetaBase: boolean;
    mostrarPostre: boolean;
    mismaCantidadTodos: boolean;
}

const DiaMenuRow: React.FC<DiaMenuRowProps> = ({
    item,
    index,
    onChange,
    onToggleSinMenu,
    onPorcionesChange,
    mostrarRecetaBase,
    mostrarPostre,
    mismaCantidadTodos
}) => {
    const particularidades = item.principal ? particularidadesRecetas[item.principal] : null;

    // Cálculos para renderizado
    const tieneGuarnicionIncluida = particularidades?.acompanamientoIncluido;
    const noLlevaGuarnicion = particularidades &&
        particularidades.acompanamientosRecomendados.length === 0 &&
        !particularidades.acompanamientoIncluido &&
        (item.principal?.includes('Ensalada completa') || item.principal === 'Lasaña' || item.principal === 'Pasta sorpresa');

    const advertenciaPostre = obtenerAdvertenciaPostre(item.principal, item.acompanamiento, item.postre);

    const recomendacionesPostre = item.principal ? obtenerRecomendacionesPostre(item.principal, item.acompanamiento) : null;

    const recomendacionesPostreLabel = (() => {
        if (particularidades?.postreRecomendado) {
            const map: Record<string, string> = {
                'leche': 'Postre de leche recomendado',
                'fruta': 'Postre de fruta recomendado',
                'fruta_estacion': 'Fruta de estación recomendada',
                'fruta_citrica': 'Fruta cítrica recomendada'
            };
            return map[particularidades.postreRecomendado];
        }
        return null;
    })();

    const panCalculado = (() => {
        if (!item.principal || item.sinMenu) return null;
        const incluirPan = particularidades?.llevaMasa ? false : (item.incluirPan !== false);
        const totalPan = calcularPan(incluirPan, item.porciones);
        return { incluirPan, totalPan };
    })();

    return (
        <div className="mb-4 border-b pb-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">{item.dia}</h3>

            {/* Selector Receta Principal */}
            <div className="mt-2 w-full max-w-md">
                <label className="block mb-1 text-sm text-black">Receta principal</label>
                <select
                    disabled={item.sinMenu}
                    value={item.principal}
                    onChange={(e) => onChange(index, 'principal', e.target.value)}
                    className="w-full p-2 border rounded text-black"
                >
                    <option value="">Seleccionar...</option>
                    {nombresRecetasAlmuerzo.map((nombre) => (
                        <option key={nombre} value={nombre}>{nombre}</option>
                    ))}
                </select>
                {particularidades?.notas && (
                    <p className="mt-1 text-xs text-gray-600 italic">
                        {particularidades.notas}
                    </p>
                )}
                {particularidades?.llevaMasa && (
                    <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                        <p className="font-semibold text-purple-800">
                            🍞 Esta receta lleva masa - No se incluirá pan en el cálculo
                        </p>
                    </div>
                )}
            </div>

            {/* Selector Acompañamiento o Info */}
            {tieneGuarnicionIncluida ? (
                <div className="mt-2 w-full max-w-md">
                    <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                        <p className="font-semibold text-yellow-800">
                            ℹ️ Guarnición incluida: {particularidades.acompanamientoIncluido}
                        </p>
                        {particularidades.acompanamientoReemplazo && particularidades.acompanamientoReemplazo.length > 0 && (
                            <p className="text-yellow-700 text-xs mt-1">
                                Puede reemplazarse por: {particularidades.acompanamientoReemplazo.join(', ')}
                            </p>
                        )}
                    </div>
                </div>
            ) : noLlevaGuarnicion ? (
                <div className="mt-2 w-full max-w-md">
                    <div className="p-2 bg-gray-100 border border-gray-300 rounded text-sm">
                        <p className="font-semibold text-gray-700">
                            ℹ️ Esta receta no lleva guarnición adicional
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-2 w-full max-w-md">
                    <label className="block mb-1 text-sm text-black">
                        Acompañamiento
                        {particularidades?.acompanamientosRecomendados && particularidades.acompanamientosRecomendados.length > 0 && (
                            <span className="ml-2 text-xs text-gray-500 font-normal">
                                (Recomendados: {particularidades.acompanamientosRecomendados.join(', ')})
                            </span>
                        )}
                    </label>
                    <select
                        disabled={item.sinMenu}
                        value={item.acompanamiento}
                        onChange={(e) => onChange(index, 'acompanamiento', e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Seleccionar...</option>
                        {particularidades?.acompanamientosRecomendados && particularidades.acompanamientosRecomendados.length > 0 && (
                            <optgroup label="Recomendados">
                                {particularidades.acompanamientosRecomendados
                                    .filter(a => nombresAcompanamientos.includes(a))
                                    .map((nombre) => (
                                        <option key={nombre} value={nombre}>{nombre}</option>
                                    ))}
                            </optgroup>
                        )}
                        <optgroup label="Todos los acompañamientos">
                            {nombresAcompanamientos
                                .filter(a => !particularidades?.acompanamientosRecomendados?.includes(a))
                                .map((nombre) => (
                                    <option key={nombre} value={nombre}>{nombre}</option>
                                ))}
                        </optgroup>
                    </select>
                </div>
            )}

            {/* Selector Receta Base */}
            {mostrarRecetaBase && (
                <div className="mt-2 w-full max-w-md">
                    <label className="block mb-1 text-sm text-black">Receta base</label>
                    <select
                        disabled={item.sinMenu}
                        value={item.recetaBase}
                        onChange={(e) => onChange(index, 'recetaBase', e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Seleccionar...</option>
                        {nombresRecetasBase.map((nombre) => (
                            <option key={nombre} value={nombre}>{nombre}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Selector Postre */}
            {mostrarPostre && (
                <div className="mt-2 w-full max-w-md">
                    <label className="block mb-1 text-sm text-black">
                        Postre
                        {recomendacionesPostreLabel && (
                            <span className="ml-2 text-xs text-gray-500 font-normal">
                                ({recomendacionesPostreLabel})
                            </span>
                        )}
                    </label>
                    <select
                        disabled={item.sinMenu}
                        value={item.postre}
                        onChange={(e) => onChange(index, 'postre', e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Seleccionar...</option>
                        {recomendacionesPostre && (
                            <>
                                {recomendacionesPostre.postreEspecifico && (
                                    <optgroup label="⭐⭐ Altamente recomendado">
                                        <option value={recomendacionesPostre.postreEspecifico}>{recomendacionesPostre.postreEspecifico}</option>
                                    </optgroup>
                                )}

                                {/* Recomendados combinados para Pan de Carne / Pasta sorpresa */}
                                {(item.principal === 'Pan de Carne / Hamburguesa' || item.principal === 'Pasta sorpresa') &&
                                    (recomendacionesPostre.postresLecheRecomendados.length > 0 || recomendacionesPostre.frutasRecomendadas.length > 0) && (
                                        <optgroup label="⭐ Recomendados">
                                            {recomendacionesPostre.postresLecheRecomendados
                                                .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                                .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                            {recomendacionesPostre.frutasRecomendadas
                                                .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                                .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                        </optgroup>
                                    )}

                                {/* Recomendados por categoría para otros */}
                                {item.principal !== 'Pan de Carne / Hamburguesa' && item.principal !== 'Pasta sorpresa' && recomendacionesPostre.postresLecheRecomendados.length > 0 && (
                                    <optgroup label="⭐ Recomendados - Postres de leche">
                                        {recomendacionesPostre.postresLecheRecomendados
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}

                                {recomendacionesPostre.variantesLecheDisponibles.length > 0 && (
                                    <optgroup label="Variantes de postre de leche">
                                        {recomendacionesPostre.variantesLecheDisponibles
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}

                                {recomendacionesPostre.postresLecheOtros.length > 0 && (
                                    <optgroup label="Postre de leche">
                                        {recomendacionesPostre.postresLecheOtros
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}

                                {recomendacionesPostre.budinesRecomendados.length > 0 && (
                                    <optgroup label="⭐ Recomendados - Budines">
                                        {recomendacionesPostre.budinesRecomendados
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}

                                {recomendacionesPostre.budinesOtros.length > 0 && (
                                    <optgroup label="Budines">
                                        {recomendacionesPostre.budinesOtros
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}

                                {item.principal !== 'Pan de Carne / Hamburguesa' && item.principal !== 'Pasta sorpresa' && recomendacionesPostre.frutasRecomendadas.length > 0 && (
                                    <optgroup label="⭐ Recomendados - Frutas frescas">
                                        {recomendacionesPostre.frutasRecomendadas
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}

                                {recomendacionesPostre.frutasOtros.length > 0 && (
                                    <optgroup label="Frutas frescas">
                                        {recomendacionesPostre.frutasOtros
                                            .filter(p => p !== recomendacionesPostre.postreEspecifico)
                                            .map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                    </optgroup>
                                )}
                            </>
                        )}
                        {/* Fallback si no hay recomendaciones (ej: sin plato principal seleccionado) */}
                        {!recomendacionesPostre && (
                            <>
                                <optgroup label="Postres de leche">
                                    {postresDeLeche.map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                                </optgroup>
                                {/* Se podrían agregar más grupos genéricos aquí si fuera necesario */}
                            </>
                        )}
                    </select>

                    {/* Advertencias y Mensajes */}
                    {advertenciaPostre && (
                        <p className={`mt-1 text-xs font-semibold ${advertenciaPostre.tipo === 'error' ? 'text-red-600' :
                                advertenciaPostre.tipo === 'warning' ? 'text-orange-600 italic' :
                                    'text-blue-600'
                            }`}>
                            {advertenciaPostre.mensaje}
                        </p>
                    )}

                    {/* Info Peso Postre */}
                    {item.postre && obtenerPesoPostre(item.postre) && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                            <span className="font-semibold text-blue-800">Porción por persona: </span>
                            <span className="text-blue-700">{obtenerPesoPostre(item.postre)}</span>
                            {pesosPostres[item.postre]?.tipo === 'fruta_fresca' && (
                                <span className="block mt-1 text-xs text-blue-600 italic">
                                    {pesosPostres[item.postre].unidad === 'g' && '(con cáscara)'}
                                </span>
                            )}
                            {variantesPostreDeLeche.includes(item.postre) && (
                                <span className="block mt-2 text-[11px] text-gray-600 italic">
                                    Consulta el recetario para ver las cantidades de ingredientes de esta variante.
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Inputs Porciones */}
            {!mismaCantidadTodos && (
                <div className="mt-2 grid grid-cols-3 gap-2 max-w-md">
                    {(['chica', 'mediana', 'grande'] as TipoComensal[]).map((tipo) => (
                        <div key={tipo}>
                            <label className="block text-sm text-black">Porciones {tipo}</label>
                            <input
                                type="number"
                                disabled={item.sinMenu}
                                value={item.porciones[tipo]}
                                onChange={(e) => onPorcionesChange(index, tipo, e.target.value)}
                                className="w-full p-2 border rounded text-black"
                                min={0}
                                placeholder="0"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Display Porciones Globales */}
            {mismaCantidadTodos && !item.sinMenu && (
                <div className="mt-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-2">Porciones aplicadas (modo global):</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                            <span className="font-medium text-gray-700">Chica:</span>
                            <span className="ml-2 text-gray-900 font-semibold">{item.porciones.chica || '0'}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Mediana:</span>
                            <span className="ml-2 text-gray-900 font-semibold">{item.porciones.mediana || '0'}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Grande:</span>
                            <span className="ml-2 text-gray-900 font-semibold">{item.porciones.grande || '0'}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Pan */}
            {!item.sinMenu && item.principal && panCalculado && (
                <div className="mt-2">
                    {panCalculado.incluirPan && panCalculado.totalPan > 0 ? (
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                            <span className="font-semibold text-amber-800">🍞 Pan para este día: </span>
                            <span className="text-amber-700">{panCalculado.totalPan}g</span>
                            <span className="text-xs text-amber-600 block mt-1">
                                (20g por porción chica, 25g por porción mediana/grande)
                            </span>
                        </div>
                    ) : !panCalculado.incluirPan ? (
                        <div className="p-2 bg-gray-100 border border-gray-300 rounded text-sm">
                            <span className="font-semibold text-gray-700">🍞 Pan: </span>
                            <span className="text-gray-600">No incluido (receta con masa)</span>
                        </div>
                    ) : null}
                </div>
            )}

            {/* Checkbox Sin Menú */}
            <div className="mt-2">
                <label className="inline-flex items-center text-black">
                    <input
                        type="checkbox"
                        checked={item.sinMenu}
                        onChange={(e) => onToggleSinMenu(index, e.target.checked)}
                        className="mr-2"
                    />
                    No se cocina este día
                </label>
            </div>
        </div>
    );
};

export default DiaMenuRow;

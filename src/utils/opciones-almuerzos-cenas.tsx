import Image from "next/image";
import bocaditos from "../assets/images/1-BOCADITOS.jpg";
import budin from "../assets/images/2-BUDIN.jpg";
import carbonada from "../assets/images/3-CARBONADA.jpg";
import carnePortugesa from "../assets/images/4-CARNE-PORTUGUESA.jpg";
import cazuelaLentejas from "../assets/images/5-CAZUELA-LENTEJAS.jpg";
import chopSuey from "../assets/images/6-CHOPSUEY.jpg";
import chupin from "../assets/images/CHUPIN-PESCADO.jpg";
import croquetas from "../assets/images/7-CROQUETAS.jpg";
import ensaladaPollo from "../assets/images/8-ENSALADA-POLLO.jpg";
import ensaladaAtun from "../assets/images/9-ENSALADA-ATUN.jpg";
import hamburgesaPescado from "../assets/images/10-HAMBURGUESA-ATUN.jpg";
import lasagna from "../assets/images/11-LASAÑA.jpg";
import panCarne from "../assets/images/12-PAN-CARNE.jpg";
import pastaSorpresa from "../assets/images/13-PASTA-SORPRESA.jpg";
import pastaVerdusalsa from "../assets/images/14-PASTA-VERDUSALSA.jpg";
import pastelPapa from "../assets/images/15-PASTEL-CARNE.jpg";
import polloColorido from "../assets/images/16-POLLO-COLORIDO.jpg";
import pastelCarneBerenjena from "../assets/images/17-PASTEL-BERENJENAS.jpg";
import polloSalsaBlanca from "../assets/images/POLLO-SALSA-BLANCA.jpg";
import tortaCarne from "../assets/images/18-TORTA-CARNE.jpg";
import tortilla from "../assets/images/19-TORTILLA.jpg";
import tortaAtun from "../assets/images/20-TORTA-ATUN.jpg";
import arroz from "../assets/images/21-ARROZ.jpg";
import fideos from "../assets/images/22-FIDEOS.jpg";
import arrozVegetales from "../assets/images/23-ARROZ-SALTEADO.jpg";
import arrozAmarillo from "../assets/images/24-ARROZ-AMARILLO.jpg";
import ensaladaVegetales from "../assets/images/25-ENSALADA-VEGETALES.jpg";
import ensaladaJardinera from "../assets/images/26-JARDINERA.jpg";
import ensaladaPrimavera from "../assets/images/27-JARDINERA.jpg";
import ensaladaLeguminosas from "../assets/images/28-ENSALADA-LEGUMINOSAS.jpg";
import papasNatural from "../assets/images/PAPAS-NATURAL.webp";
import purePapas from "../assets/images/PURE-NATURAL.jpg";
import pureTriple from "../assets/images/31-PURE-TRIPLE.jpg";
import pureInstantaneo from "../assets/images/32-PURE-INSTANTANEO.jpg";
import hortalizas from "../assets/images/33-HORTALIZAS-ASADAS.jpg";
import salsaBlanca from "../assets/images/34-SALSA-BLANCA.jpg";
import arrozPrincipal from "../assets/images/35-ARROZ-PRINCIPAL.jpg";
import fideosPrincipal from "../assets/images/36-FIDEOS-PRINCIPAL.jpg";
// Imágenes para postres
import arrozConLeche from "../assets/images/arroz-con-leche.jpg";
import cremaNaranja from "../assets/images/cremanaranja.jpg";
import budinCalabaza from "../assets/images/budincalabaza_vertical.jpg";
import budinMaiz from "../assets/images/budin-maiz.jpg";
// Imágenes para recetas base
import polenta from "../assets/images/polenta.jpg";
import masaBasica from "../assets/images/masa-basica.jpg";
import filloas from "../assets/images/filloas.webp";


export const opcionesAlmuerzosCenas = [
    {
        image: <Image
                src = { bocaditos }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Bocaditos de pollo',
        url: '/recetas/101'
    },
    {
        image: <Image
                src = { budin }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Budín de pescado',
        url: '/recetas/102'
    },
    {
        image: <Image
                src = { carbonada }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Carbonada criolla',
        url: '/recetas/103'
    },
    {
        image: <Image
                src = { carnePortugesa }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Carne a la portuguesa',
        url: '/recetas/104'
    },
    {
        image: <Image
                src = { cazuelaLentejas }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Cazuela de lentejas',
        url: '/recetas/105'
    },
    {
        image: <Image
                src = { chopSuey }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Chop suey de cerdo',
        url: '/recetas/106'
    },
    {
        image: <Image
                src = { chupin }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Chupín de pescado y verduras',
        url: '/recetas/107'
    },
    {
        image: <Image
                src = { croquetas }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Croquetas de atún y papas',
        url: '/recetas/108'
    },
    {
        image: <Image
                src = { ensaladaPollo }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Ensalada completa de pollo',
        url: '/recetas/109'
    },
    {
        image: <Image
                src = { ensaladaAtun }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Ensalada completa de atún',
        url: '/recetas/110'
    },
    {
        image: <Image
                src = { hamburgesaPescado }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Hamburguesa de pescado',
        url: '/recetas/111'
    },
    {
        image: <Image
                src = { lasagna }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Lasaña',
        url: '/recetas/112'
    },
    {
        image: <Image
                src = { panCarne }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pan de carne / Hamburguesa',
        url: '/recetas/113'
    },
    {
        image: <Image
                src = { pastaSorpresa }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pasta sorpresa',
        url: '/recetas/114'
    },
    {
        image: <Image
                src = { pastaVerdusalsa }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pasta con verdusalsa',
        url: '/recetas/115'
    },
    {
        image: <Image
                src = { pastelPapa }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pastel de carne y papa',
        url: '/recetas/116'
    },
    {
        image: <Image
                src = { polloColorido }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pollo colorido',
        url: '/recetas/117'
    },
    {
        image: <Image
                src = { pastelCarneBerenjena }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pastel de carne y berenjenas',
        url: '/recetas/118'
    },
    {
        image: <Image
                src = { polloSalsaBlanca }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Pollo con salsa blanca y verduras',
        url: '/recetas/119'
    },
    {
        image: <Image
                src = { tortaCarne }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Torta de carne y vegetales',
        url: '/recetas/120'
    },
    {
        image: <Image
                src = { tortilla }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Tortilla de papa, vegetales y pollo',
        url: '/recetas/121'
    },
    {
        image: <Image
                src = { tortaAtun }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Torta de atún',
        url: '/recetas/122'
    },
    {
        image: <Image
                src = { arroz }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Arroz',
        url: '/recetas/123'
    },
    {
        image: <Image
                src = { fideos }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Fideos',
        url: '/recetas/124'
    },
    {
        image: <Image
                src = { arrozVegetales }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Arroz con vegetales salteados',
        url: '/recetas/125'
    },
    {
        image: <Image
                src = { arrozAmarillo }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Arroz amarillo',
        url: '/recetas/126'
    },
    {
        image: <Image
                src = { ensaladaVegetales }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Ensalada de vegetales',
        url: '/recetas/127'
    },
    {
        image: <Image
                src = { ensaladaJardinera }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Ensalada jardinera',
        url: '/recetas/128'
    },
    {
        image: <Image
                src = { ensaladaPrimavera }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Ensalada primavera',
        url: '/recetas/129'
    },
    {
        image: <Image
                src = { ensaladaLeguminosas }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Ensalada de leguminosas y vegetales',
        url: '/recetas/130'
    },
    {
        image: <Image
                src = { papasNatural }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Papas al natural',
        url: '/recetas/131'
    },
    {
        image: <Image
                src = { purePapas }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Puré de papas',
        url: '/recetas/132'
    },
    {
        image: <Image
                src = { pureTriple }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Puré triple',
        url: '/recetas/133'
    },
    {
        image: <Image
                src = { pureInstantaneo }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Puré de papas instantáneo',
        url: '/recetas/134'
    },
    {
        image: <Image
                src = { hortalizas }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Hortalizas asadas',
        url: '/recetas/135'
    },
    {
        image: <Image
                src = { salsaBlanca }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Salsa blanca liviana',
        url: '/recetas/136'
    },
    {
        image: <Image
                src = { arrozPrincipal }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Arroz plato principal',
        url: '/recetas/137'
    },
    {
        image: <Image
                src = { fideosPrincipal }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Fideos plato principal',
        url: '/recetas/138'
    },
    {
        image: <Image
                src = { arrozConLeche }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Arroz con leche',
        url: '/recetas/139'
    },
    {
        image: <Image
                src = { cremaNaranja }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Crema de naranja',
        url: '/recetas/140'
    },
    {
        image: <Image
                src = { cremaNaranja }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Crema de vainilla',
        url: '/recetas/141'
    },
    {
        image: <Image
                src = { budinCalabaza }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Budín de zapallo y coco',
        url: '/recetas/142'
    },
    {
        image: <Image
                src = { budinMaiz }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Budín de harina de maíz',
        url: '/recetas/143'
    },
    {
        image: <Image
                src = { polenta }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Polenta/plato principal',
        url: '/recetas/145'
    },
    {
        image: <Image
                src = { masaBasica }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Masa básica para tortas',
        url: '/recetas/146'
    },
    {
        image: <Image
                src = { filloas }
                layout="fill"
                objectFit="cover"
                alt=""
              ></Image>,
        title: 'Filloas',
        url: '/recetas/147'
    },
]
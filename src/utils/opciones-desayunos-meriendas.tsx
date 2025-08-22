import Image from "next/image";
import brownie from "@/assets/images/brownie.png";
import budin from "@/assets/images/budin.png";
import faina from "@/assets/images/faina.png";
import pastaFrola from "@/assets/images/pasta-frola.png";
import tortaVainilla from "@/assets/images/torta-vainilla.png";
import tortaCalabaza from "@/assets/images/torta-calabaza.png";
import tortaNaranja from "@/assets/images/torta-naranja.png";
import panCasero from "@/assets/images/pan-casero.png";
import panCalabaza from "@/assets/images/pan-calabaza.png";
import sconesQueso from "@/assets/images/scones-queso.png";
import sconesDulces from "@/assets/images/scones-dulces.png";
import hummus from "@/assets/images/hummus.png";
import untableRicota from "@/assets/images/untable-ricota.png";
import untableZanahoria from "@/assets/images/untable-zanahoria.png";
import galletasAvenaPasas from "@/assets/images/galletas-avena-pasas.png";
import galletasAvenaQueso from "@/assets/images/galletas-avena-queso.png";
import galletitasCitricas from "@/assets/images/galletitas-citricas.png";
import ojitosCaseros from "@/assets/images/ojistos-jardin-115.jpg";
import alfajoresMaicena from "@/assets/images/alfajores-maicena.png";
import barraCereales from "@/assets/images/barra-cereales.png";
import mixFrutosSecos from "@/assets/images/mix-frutos-secos.png";
import cremaVainila from "@/assets/images/crema-vainilla.png";
import licuado from "@/assets/images/licuado.png";
import ojitosMijo from "@/assets/images/ojitos-mijo.png";

export const opcionesDesayunosMeriendas = [
    {
      image: <Image
              src = { brownie }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Brownie de porotos negros',
      url: '/recetas/1'
    },
    {
      image: <Image
              src = { budin }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Budín de banana',
      url: '/recetas/2'
    },
    {
      image: <Image
              src = { faina }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Fainá de zanahoria y queso',
      url: '/recetas/3'
    },
    {
      image: <Image
              src = { pastaFrola }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Pasta frola',
      url: '/recetas/4'
    },
    {
      image: <Image
              src = { tortaVainilla }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Torta básica de vainilla',
      url: '/recetas/5'
    },
    {
      image: <Image
              src = { tortaCalabaza }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Torta de calabaza',
      url: '/recetas/6'
    },
    {
      image: <Image
              src = { tortaNaranja }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Torta de naranja',
      url: '/recetas/7'
    },
    {
      image: <Image
              src = { panCasero }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Pan casero',
      url: '/recetas/8'
    },
    {
      image: <Image
              src = { panCalabaza }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Pan de calabaza',
      url: '/recetas/9'
    },
    {
      image: <Image
              src = { sconesQueso }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Scones de queso',
      url: '/recetas/10'
    },
    {
      image: <Image
              src = { sconesDulces }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Scones dulces',
      url: '/recetas/11'
    },
    {
      image: <Image
              src = { hummus }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Hummus',
      url: '/recetas/12'
    },
    {
      image: <Image
              src = { untableRicota }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Untable de ricota',
      url: '/recetas/13'
    },
    {
      image: <Image
              src = { untableZanahoria }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Untable de zanahoria',
      url: '/recetas/14'
    },
    {
      image: <Image
              src = { galletasAvenaPasas }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Galletas de avena y pasas',
      url: '/recetas/15'
    },
    {
      image: <Image
              src = { galletasAvenaQueso }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Galletas de avena y queso',
      url: '/recetas/16'
    },
    {
      image: <Image
              src = { galletitasCitricas }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Galletitas cítricas',
      url: '/recetas/17'
    },
    {
      image: <Image
              src = { ojitosCaseros }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Ojitos caseros',
      subtitle: 'Foto: Jardín N°115 de Paysandú',
      url: '/recetas/18'
    },
    {
      image: <Image
              src = { alfajoresMaicena }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Alfajores de maicena',
      url: '/recetas/19'
    },
    {
      image: <Image
              src = { barraCereales }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Barra de cereales',
      url: '/recetas/20'
    },
    {
      image: <Image
              src = { mixFrutosSecos }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Mix de frutos secos',
      url: '/recetas/21'
    },
    {
      image: <Image
              src = { cremaVainila }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Crema de vainilla',
      url: '/recetas/22'
    },
    {
      image: <Image
              src = { licuado }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Licuado de leche y fruta',
      url: '/recetas/23'
    },
    {
      image: <Image
              src = { ojitosMijo }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>,
      title: 'Ojitos de mijo',
      url: '/recetas/24'
    },
]
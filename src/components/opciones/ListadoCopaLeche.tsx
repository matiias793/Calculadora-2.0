import Image from 'next/image'
import React from 'react'

import lecheEnPolvo from '@/assets/images/leche-en-polvo.png';
import lecheFluida from '@/assets/images/leche-fluida.png';
import OptionCard from '../main/OptionCard';

const ListadoCopaLeche = () => {
    
    const options = [
        {
            image: <Image
                    src={lecheEnPolvo}
                    fill
                    style={{ objectFit: "cover" }}
                    alt="Leche en polvo"
                />,
            title: 'Leche en polvo',
            url: '/copa-leche/1'
          },
          {
            image: <Image
                    src={lecheFluida}
                    fill
                    style={{ objectFit: "cover" }}
                    alt="Leche fluida"
                  />,
            title: 'Lecha fluída',
            url: '/copa-leche/2'
          }
    ]

    return (
      <>
          <span className="mb-8 text-center text-gray-800 w-full flex flex-col mt-3 text-lg">¿Qué tipo de leche usarás?</span>
          <div className="flex flex-row flex-wrap justify-center gap-5 mt-10 w-full px-4 md:px-0 mb-8">
              {
              options.map(
                  option => (
                    <OptionCard key = { option.title } {...option}></OptionCard>
                  )
              )
              }
          </div>
      </>
    )
}

export default ListadoCopaLeche

import React, { useEffect, useState } from 'react'
// import data from "../data2.js"
import { Box, Heading, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react'

 const oneItem = {
        "title": "Lahsuniya(Cat's eye)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities."
,
        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [85, 150, 250] },
            { "type": "1st Quality", "prices": [350, 500, 750] },
            { "type": "Special Quality", "prices": [1000, 1500, 2000] },
            { "type": "Super Quality", "prices": [2500, 3000] }
        ]
    }
 


const data = [
    {
        "id": 1,
        "title": "Manik(Ruby)",
        "img": "img1",
        "description": "Diamonds are known for their brilliance and durability.",
        "benefits": [
            "Enhances inner vision and creativity.",
            "Promotes clarity and purity of thought.",
            "Boosts self-confidence and positive energy.",
            "Aids in better relationships and communication.",
            "Provides mental strength and resilience."
        ],
        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [150, 250, 350] },
            { "type": "1st Quality", "prices": [500, 750, 1000] },
            { "type": "Special Quality", "prices": [1500, 2000, 2500] },
            { "type": "Super Quality", "prices": [3000, 3500] }
        ]
    },
    {
        "id": 2,
        "title": "Munga(Red Color)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],
        "quantity": 30,
        "qualities": [
            { "type": "II nd Quality", "prices": [150, 250, 350] },
            { "type": "1st Quality", "prices": [500, 750, 1000] },
            { "type": "Special Quality", "prices": [1500, 2000, 2500] },
            { "type": "Super Quality", "prices": [3000] }

        ]
    },
    {
        "id": 3,
        "title": "Pukhraj(Yellow Sapphire)",
        "img": "img1",
        "description": "Diamonds are known for their brilliance and durability.",
        "benefits": [
            "Enhances inner vision and creativity.",
            "Promotes clarity and purity of thought.",
            "Boosts self-confidence and positive energy.",
            "Aids in better relationships and communication.",
            "Provides mental strength and resilience."
        ],
        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [500, 750, 1000] },
            { "type": "1st Quality", "prices": [1500, 2000, 2500] },
            { "type": "Special Quality", "prices": [3000, 3500, 4500] },
            { "type": "Special Quality", "prices": [5500, 6000] }
        ]
    },
    {
        "id": 4,
        "title": "Moti(Pearl)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],
        "price": 5000,
        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [60, 100, 150] },
            { "type": "1st Quality", "prices": [200, 250, 300] },
            { "type": "Special Quality", "prices": [450, 500, 600] },
            { "type": "Super Quality", "prices": [700, 1000] }
        ]
    },
    {
        "id": 5,
        "title": "Panna(Emerald)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],
        "price": 5000,
        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [150, 250, 350] },
            { "type": "1st Quality", "prices": [500, 750, 1000] },
            { "type": "Special Quality", "prices": [1500, 2000, 2500] }
        ]
    },
    {
        "id": 6,
        "title": "Heera(Diamond)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],

        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [1000, 1500, 2000] },
            { "type": "1st Quality", "prices": [2500, 3000, 3500] },
            { "type": "Special Quality", "prices": [4000, 4500, 5000] },
            { "type": "Special Quality", "prices": [] }
        ]
    },
    {
        "id": 7,
        "title": "Neelam(Blue Sapphire)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],

        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [350, 500, 750] },
            { "type": "1st Quality", "prices": [1000, 1500, 2000] },
            { "type": "Special Quality", "prices": [2500, 3000, 4000] },
            { "type": "Special Quality", "prices": [5000, 6000] }
        ]
    },
    {
        "id": 8,
        "title": "Gomed(Hessonite)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],

        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [85, 150, 250] },
            { "type": "1st Quality", "prices": [350, 500, 750] },
            { "type": "Special Quality", "prices": [1000, 1500, 2000] },
            { "type": "Super Quality", "prices": [2500, 3000] }
        ]
    },
    {
        "id": 9,
        "title": "Lahsuniya(Cat's eye)",
        "img": "img2",
        "description": "Cat's Eye stones are known for their unique appearance.",
        "benefits": [
            "Promotes intuition and awareness.",
            "Wards off negative energies.",
            "Brings good fortune and protection.",
            "Aids in spiritual healing and growth.",
            "Enhances psychic abilities."
        ],
        "quantity": 20,
        "qualities": [
            { "type": "II nd Quality", "prices": [85, 150, 250] },
            { "type": "1st Quality", "prices": [350, 500, 750] },
            { "type": "Special Quality", "prices": [1000, 1500, 2000] },
            { "type": "Super Quality", "prices": [2500, 3000] }
        ]
    }

]


// console.log(data)
const Practiescart = () => {
    const [selectedQuality, setSelectedQuality] = useState("")
    const [radioItem, setRadioItem] = useState({})
    let gem = "Lahsuniya(Cat's eye)";
    const matchdata =  data.find((el)=> el.title == gem)
  
   let matchdatafound = oneItem.qualities.find((el) => el.type == selectedQuality)

    const handleSort = (e) => {
        const {value} = e.target
        setRadioItem(value)
    }

useEffect(()=> {

},[selectedQuality, matchdatafound])

    return (
        <div>
            <Heading>this is preacties cart page</Heading>




            <Box >
                <Select placeholder='Select quality' width={"30%"} onChange={(e)=>setSelectedQuality(e.target.value)}>
              {
                  matchdata.qualities && matchdata.qualities.map((item)=> (
                   <>
                    <option value={item.type}>{item.type}</option>
                  
                    </> 
                  ))
                
              }   
                </Select>
                {
  matchdatafound && matchdatafound.prices.map((item)=> {
    return    (<Box onChange={handleSort}>
        <input type="radio" name='order' value={item} />
        <label>{item}</label><br />
    </Box>)
})
                
                }
            </Box>

        </div>
    )
}

export default Practiescart

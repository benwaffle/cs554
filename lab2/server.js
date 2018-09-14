const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('main', {
    products: [
      {
        id: 'cheese',
        name: 'Cheese Wheel',
        img: 'cheese.jpg',
        short: 'Tasty parmesan cheese wheels',
        long: `
          Parmigiano-Reggiano (/ˌpɑːrmɪˌdʒɑːnoʊ rɛˈdʒɑːnoʊ/; Italian pronunciation: [ˌparmiˈdʒaːno redˈdʒaːno]) is an Italian hard, granular cheese. The name "Parmesan" is often used generically for various simulations of this cheese, although this is prohibited in trading in the European Economic Area under European law.[1] 
        `,
      },
      {
        id: 'glasses',
        name: 'Sunglasses',
        img: 'glasses.jpg',
        short: 'cool UV-blocking ray bans',
        long: `
          Sunglasses or sun glasses (informally called shades) are a form of protective eyewear designed primarily to prevent bright sunlight and high-energy visible light from damaging or discomforting the eyes. They can sometimes also function as a visual aid, as variously termed spectacles or glasses exist, featuring lenses that are colored, polarized or darkened. In the early 20th century, they were also known as sun cheaters (cheaters then being an American slang term for glasses).[1] 
        `,
      },
      {
        id: 'lens',
        name: 'Camera Lens',
        img: 'lens.jpg',
        short: 'Nikon D900 150x zoom lens',
        long: `
          A camera lens (also known as photographic lens or photographic objective) is an optical lens or assembly of lenses used in conjunction with a camera body and mechanism to make images of objects either on photographic film or on other media capable of storing an image chemically or electronically.  
        `,
      },
      {
        id: 'milk',
        name: 'Milk',
        img: 'milk.jpg',
        short: 'Raw, unfiltered calcium',
        long: `
          Milk is a white liquid nutrient-rich food produced by the mammary glands of mammals. It is the primary source of nutrition for infant mammals (including humans who are breastfed) before they are able to digest other types of food. Early-lactation milk contains colostrum, which carries the mother's antibodies to its young and can reduce the risk of many diseases. It contains many other nutrients[1] including protein and lactose. Interspecies consumption of milk is not uncommon, particularly among humans, many of whom consume the milk of other mammals.[2][3] 
        `,
      },
      {
        id: 'watch',
        name: 'Wrist Watch',
        img: 'watch.jpg',
        short: 'Millenials can\'t read it!',
        long: `
          A watch is a timepiece intended to be carried or worn by a person. It is designed to keep working despite the motions caused by the person's activities. A wristwatch is designed to be worn around the wrist, attached by a watch strap or other type of bracelet. A pocket watch is designed for a person to carry in a pocket. 
        `,
      },
      {
        id: 'nuclear',
        name: 'Nuclear Energy',
        img: 'nuclear.jpg',
        short: 'Safest form of energy',
        long: `
        Nuclear power is the use of nuclear reactions that release nuclear energy to generate heat, which most frequently is then used in steam turbines to produce electricity in a nuclear power plant. Nuclear power can be obtained from nuclear fission, nuclear decay and nuclear fusion. Presently, the vast majority of electricity from nuclear power is produced by nuclear fission of elements in the actinide series of the periodic table. Nuclear decay processes are used in niche applications such as radioisotope thermoelectric generators. The possibility of generating electricity from nuclear fusion is still at a research phase with no commercial applications. This article mostly deals with nuclear fission power for electricity generation. 
        `,
      },
      {
        id: 'pancakes',
        name: 'Pancakes',
        img: 'pancakes.jpg',
        short: 'yummy',
        long: `
        A pancake (or hotcake, griddlecake, or flapjack) is a flat cake, often thin and round, prepared from a starch-based batter that may contain eggs, milk and butter and cooked on a hot surface such as a griddle or frying pan, often frying with oil or butter. Archaeological evidence suggests that pancakes were probably the earliest and most widespread cereal food eaten in prehistoric societies.[1] 
        `,
      },
      {
        id: 'rocket',
        name: 'Rocket Booster',
        img: 'rocket.jpg',
        short: 'Boom',
        long: `
        <a href="https://castlepointrocketry.space">Nice</a>
        `,
      },
      {
        id: 'nails',
        name: 'Nails & Screws',
        img: 'nails.jpg',
        short: 'Ouch',
        long: `
        In woodworking and construction, a nail is a pin-shaped object of metal (or wood, called a tree nail or "trunnel") which is used as a fastener, as a peg to hang something, or sometimes as a decoration.[1] Generally, nails have a sharp point on one end and a flattened head on the other, but headless nails are available. Nails are made in a great variety of forms for specialized purposes. The most common is a wire nail. Other types of nails include pins, tacks, brads, spikes, and cleats. 
        `,
      },
      {
        id: 'wind',
        name: 'Wind Power',
        img: 'wind.jpg',
        short: 'whoosh',
        long: `
        Wind power is the use of air flow through wind turbines to provide the mechanical power to turn electric generators. Wind power, as an alternative to burning fossil fuels, is plentiful, renewable, widely distributed, clean, produces no greenhouse gas emissions during operation, consumes no water, and uses little land.[2] The net effects on the environment are far less problematic than those of nonrenewable power sources. 
        `,
      },
    ]
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))
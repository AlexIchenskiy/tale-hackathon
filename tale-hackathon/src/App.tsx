import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { bestTextColor, mixColors } from './utils';
import { useSwipeable } from 'react-swipeable';

function App() {
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <div className='start-container' style={{ height: '100vh', top: pressed ? '-100%' : 0, position: 'absolute', transition: 'top 0.3s ease-in-out' }} onClick={() => setPressed(true)}>
        <div className='start'>Start reading</div>
      </div>
      <div style={{ height: '100vh', top: pressed ? 0 : '100%', position: 'absolute', transition: 'top 0.3s ease-in-out' }}>
        <PageContainer prevCallback={() => setPressed(false)} />
      </div>
    </>
  );
}

function PageContainer({ prevCallback }: { prevCallback?: () => void }) {
  const recapRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const width = 430;

  const bgColors = ['#000', '#fff', '#000'];

  const [bgColor, setBgColor] = useState(bgColors[0]);
  const [textColor, setTextColor] = useState(bgColors[1]);
  const [recapShown, setRecapShown] = useState(false);

  const dropdownData = ['EN', 'HR'];

  const [dropdownCurrent, setDropdownCurrent] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const recap = recapByLanguage[dropdownData[dropdownCurrent]].slice(0, currentPage).reverse().find((recap) => recap !== undefined);

  useEffect(() => {
    // let bg = bgColors[0];
    // let text = bgColors[1];

    // if (currentPage === 0) {
    //   bg = bgColors[0];
    //   text = bgColors[1];
    // } else if (currentPage === 1) {
    //   bg = bgColors[1];
    //   text = bgColors[0];
    // } else if (currentPage === pages.length - 1) {
    //   bg = bgColors[2];
    //   text = bgColors[1];
    // } else {
    //   const w1 = (pages.length) / currentPage / 12;
    //   bg = mixColors(bgColors[1], bgColors[2], w1);
    //   text = bestTextColor(bg);
    // }
    // setBgColor(bg);
    // setTextColor(text);
    setBgColor(colors[currentPage].bg);
    setTextColor(colors[currentPage].text);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
  }

  const handlePrevPage = () => {
    const newPage = Math.max(0, currentPage - 1)
    setCurrentPage((prev) => newPage);
    if (newPage === 0) {
      setRecapShown(false);
    }
    if (prevCallback && currentPage - 1 < 0) {
      prevCallback();
    }
  }

  const openRecapHandler = useSwipeable({
    onSwiped: (eventData) => eventData.dir === 'Up' && currentPage > 0 && setRecapShown(true),
  });

  const closeRecapHandler = useSwipeable({
    onSwiped: (eventData) => eventData.dir === 'Down' && setRecapShown(false),
  });

  const pageSwitchHandler = useSwipeable({
    onSwiped: (eventData) => {
      eventData.dir === 'Right' && handlePrevPage();
      eventData.dir === 'Left' && handleNextPage()
    }
  });

  return <div style={{ height: '100vh', overflow: 'hidden' }}>
    <div className="App" style={{ width: width, backgroundColor: bgColor }} onClick={(e) => {
      const x = e.clientX;
      if (x < width / 2) {
        handlePrevPage();
      }
      else {
        handleNextPage();
      }
    }}
      {...pageSwitchHandler}
    >
      <div>
        {pages.map((page, index) => {
          return (
            <>
              {<div className='page' key={index} style={{
                width: width, left: width * (index - currentPage), color: textColor, whiteSpace:
                  "pre-line"
              }}>{page}</div>}
              {/* { {currentPage !== index && <div style={{width: width, left: width * (index - currentPage), height: '100%', position: 'absolute', backdropFilter: 'blur(15px)'}}></div>} */}
            </>
          );

        })}
      </div>
      <div className='swipe' {...openRecapHandler}></div>
    </div>
    <div className='recap' style={{ backgroundColor: textColor, color: bgColor, bottom: recapShown ? 0 : (recapRef?.current?.clientHeight ? -2 * recapRef?.current?.clientHeight : '-100%') }} {...closeRecapHandler} ref={recapRef}>
      <div className='modal-actions'>
        <div className="modal-close-button" onClick={() => setRecapShown(false)}>
          <span style={{ backgroundColor: bgColor }}></span>
          <span style={{ backgroundColor: bgColor }}></span>
        </div>

        <div className='modal-dropdown' style={{ borderColor: bgColor }}>
          <div className='modal-dropdown-button'>
            <div className='modal-dropdown-current' style={{ backgroundColor: textColor }} onClick={() => setDropdownOpen((prev) => !prev)}>{dropdownData[dropdownCurrent]}</div>
            {/* <div className='modal-dropdown-arrow' style={{ borderColor: bgColor }}></div> */}
          </div>
          <div className='modal-dropdown-other' style={{ top: dropdownOpen ? '98%' : 0, position: 'absolute', backgroundColor: textColor, borderColor: bgColor }} onClick={() => {
            setDropdownOpen(false);
            setDropdownCurrent((prev) => 1 - prev);
          }}>{dropdownData[1 - dropdownCurrent]}</div>
        </div>
      </div>

      <div style={{ color: bgColor }}>{recap}</div>
    </div>
  </div>
}

const recaps = [
  "The bed is large enough for two people, including the listener and another person. A table and two books are mentioned, along with a reference to the bed.",
  "The speaker is unable to understand others and brought a German-Croatian dictionary to help. They also brought two large Milka chocolate bars for meals and as a way of remembering their shared life with listener.",
  "The speaker and the listener exchanged 73 messages, each word holding meaning. This number of messages was greater than what they had exchanged in the last ten years."
]

const recaps2 = [
  "Krevet je dovoljno velik za dvije osobe, sugovornicu i još jednu osobu. Spominju se stol i dvije knjige, uz referencu na krevet.",
  "Govornik ne razumije druge pa je ponio njemačko-hrvatski rječnik kao pomoć. Također je ponio dvije velike Milka čokolade za obroke i kao način sjećanja na zajednički život sa sugovornicom.",
  "Govornik i sugovornica razmijenili su 73 poruke, a svaka riječ imala je značenje. Ovaj broj poruka bio je veći od onoga što su razmijenili u posljednjih deset godina."
];

const recapByLanguage = {
  'EN': recaps,
  'HR': recaps2,
}

const colors = [
  { bg: '#0a0a0a', text: '#fff' },
  { bg: '#141414', text: '#fff' },
  { bg: '#1e1e1e', text: '#fff' },
  { bg: '#7f7f7f', text: '#000' },
  { bg: '#ffffff', text: '#000' },
  { bg: '#f9f9f9', text: '#000' },
  { bg: '#f3f3f3', text: '#000' },
  { bg: '#ededed', text: '#000' },
  { bg: '#e7e7e7', text: '#000' },
  { bg: '#e1e1e1', text: '#000' },
  { bg: '#dbdbdb', text: '#000' },
  { bg: '#d5d5d5', text: '#000' },
  { bg: '#cfcfcf', text: '#000' },
  { bg: '#c9c9c9', text: '#000' },
  { bg: '#c3c3c3', text: '#000' },
  { bg: '#bdbdbd', text: '#000' },
  { bg: '#b7b7b7', text: '#000' },
  { bg: '#b1b1b1', text: '#000' },
  { bg: '#ababab', text: '#000' },
  { bg: '#a5a5a5', text: '#000' },
  { bg: '#9f9f9f', text: '#000' },
  { bg: '#999999', text: '#000' },
  { bg: '#919191', text: '#000' },
  { bg: '#535353', text: '#fff' },
  { bg: '#535353', text: '#fff' },
  { bg: '#535353', text: '#fff' },
  { bg: '#535353', text: '#fff' },
  { bg: '#535353', text: '#fff' },
  { bg: '#535353', text: '#fff' },
  { bg: '#535353', text: '#fff' },
  { bg: '#4c4c4c', text: '#fff' },
  { bg: '#454545', text: '#fff' },
  { bg: '#3e3e3e', text: '#fff' },
  { bg: '#373737', text: '#fff' },
  { bg: '#303030', text: '#fff' },
  { bg: '#292929', text: '#fff' },
  { bg: '#222222', text: '#fff' },
  { bg: '#1b1b1b', text: '#fff' },
  { bg: '#141414', text: '#fff' },
  { bg: '#0d0d0d', text: '#fff' },
  { bg: '#060606', text: '#fff' },
  { bg: '#060606', text: '#fff' },
  { bg: '#000000', text: '#fff' }
];

const pages = [`the bed is big enough for two people\nshe and someone else\na table\ntwo books\nshe and someone else`, `i cannot understand anyone\ni brought a dictionary (german croatian)\nand two big milka\nchocolate bars for lunch dinner and over night\nthat is how i was remembering our shared life`, `before this the two of us exchanged 73 messages\neach word a message\nenter like inhale\n73 more than over the last ten years\nmore than ever before`, ``, `a missed call\na german phone number\na whatsapp message\ni am calling you for support and cheer i am in the hospital\nshe quipped about the dinamo soccer team and cheering fans\nso far only medical tests\nenter like exhale\ni did not call\nbecause i am selfish\nbecause i wanted us to be writing \nto have the messages to remember\nto mull over later\ni brought a dictionary (german croatian)\nto read the test results\nthere is room in the bed for two`, `i cannot write from her perspective\ni cannot know how she feels\ni cannot write the character of the woman who is speaking to me\ni cannot create her motivation\ncomplexity\nto build a character for this text\ni cannot write her\nwithout knowing her\nbut i can write about her\nabout what she told me\nabout us\nhow i got to know her again now that i am a man\nand squeezed my eyes tight shut\ni try to remember when we last\nslept together when i was a girl\nthere is room in the bed for two `, `let them chop off whatever they like\nshe said\nbut i thought of all the texts i have been reading about the\nrepresentation of women\ni disgust myself\nmy own mother is writing me about her disease\nbut my thoughts are on literature\nwho are you to write about that\non the promenade in split\ncrammed into a cafe where they pile\nbooks by each table\nbooks that have assumed the color of coffee`, `because nobody has ever opened them\ni imagined taking a glass and throwing it at\nthe wall of the hipster cafe\nthe whatsapp message\nmagnetic procedure infusion up down ct then\nmagnetic on a full stomach then antibiotic\na big wound`, `i wanted to throw a glass at the wall\nbut all i did was respond to my cell phone\ncalmest in the world\nand asked have you eaten so what is the food like\nthat seemed logical\nbecause concern for another is manifested through\nfeeding\nas if i have any idea what she likes\nbesides chocolate\ntwo big milkas\nfor lunch dinner and over night`, `i eat pudding\nshe listed the flavors for me\nstrawberry\nchocolate\nvanilla\nbanana\nshe described the way the food is served in the most minute \ndetail\neverything that a person who cannot eat\nobserves\nbecause she knows that silence over the phone has\nspecial weight`, `let them chop off whatever they like\nshe said\nshe laughed\ni said\ngerman hospitals are better than ours\ni do not know why\ni have never been to germany\ni know nothing about their hospitals \nbut i wanted her to feel safe`, `i said that and what i wanted to say was\neverything will be fine\nthey have modern equipment and what matters is\nyou decided to go to the hospital\nthough i know this is not the case\nand my brother made her go\nalthough i know she knew what was happening for months`, `you talk to me about dinamo and cheering you on\nand i stand there with beers and peanuts and tightly \nsqueeze my eyes shut\ni try to remember when we last\nslept together when i was a girl`, `i hate languages\nand german\nand hospitals that are far away\nand i would prefer you being right here at vinogradska hospital\nso we could go out in front of the building \nand talk about the crappy equipment\nabout how somewhere else would be better\nand getting to know each other in the city where we both\nlived when i was a girl\nwhere later i wandered as a man by night through the streets\nand you stood at home by the phone\nin the city where you had a child\nand i had a mother\nthere is room in the bed for two`, `i am not at all sure you are telling the truth\ni know that sounds terrible\nhow dare you talk with her like that\nshe is ill\nshe gave birth to you\nbe by her side\nthese are the toughest moments\nthe struggle is only beginning\nthis is not merely a physical thing\neverything ends\nthis information is difficult to take in\nbe by her side`, `i imagine how it eats away at you\nhow your organs fail\nhow i hugged you as a child\nand how your skin was soft\nthat part i invented\nyou have been a smoker for 40 years\nnever has your skin been soft`, `i cannot remember when i last hugged you\nbut i picture your body falling apart\nand i break out in a sweat\ni am scared\nwait\ndo not rush\ntake it easy`, `i always had a thousand questions\nthis drove you crazy\nwhen you drove 2000 kilometers\nto another country\nto father in jail\ni could never sleep\na thousand questions\nthis drove you crazy`, `the 73 whatsapp messages\nenter inhale\ndo not ask\nwait\neven i do not know everything yet\nwe will see\nit is a tumor\nthey need to consult with a plastic surgeon\nstop patience\nenter exhale\ni always panic about everything\nbut this has already happened to so many people\nthere is nothing so awful about it`, `i spoke with the world's calmest voice\nbut i wanted to throw a glass at the wall\nmama\ndo you have any family history of cancer\ni asked you\nbecause at home there was never mention of it\nyou said they asked you that too but only after everything\nyour grandmother died of colon cancer\nsilence\ncolon cancer?\nyes\nyou said yes`, `but what you meant to say was\nyes grandma had cancer\nand we lied to you children that it was a ruptured\nappendix\nso you two would not worry or think about it\ni did not say anything`, `your grandmother died of cancer\nreverberated in my head\ni remembered every no i circled\nevery consent in the transition process \nevery form\ni have no family history of cancer\nand this is why i shoot up testosterone\nand why i am confident when the lady psychologist \nsays\ncancer it is often a congenital disease\nand if it does not appear in your family history`, `that is good news for a hypochondriac\ni am scared for myself\ni am obsessed with palpating my breasts`, `i asked you\ndo they remove the whole breast\nand i wanted to ask\nmama\nhas it spread\nhow big is it\ni wanted to hear\nthey only remove that part\nbut you said you do not know\nand added\nlet them chop off what they like and laughed\nluckily you have breasts like grandma had\nand besides i only wear a size one`, `i imagined you saying to me\nwhat do you know about that\nand about the flint of a cigarette lighter \non the sixth floor of a hospital in germany\nthe feeling when i go out alone onto the balcony for smokers \nand how i felt while i was carrying you in my\nbelly\nand when we conceived you 2000 kilometers away\nduring an open visit to a prison in the netherlands`, `how could you know anything at all about how i feel\nfrom that armchair of yours\nand empty word processor\nand how you turn our shared grief into\nmaterial for writing\nwhat do you know about that\nwhen we exchanged the 73 messages over\nwhatsapp\n73 more than over the last ten years`, `i imagine you telling me all that\nbut all you do is pretend nothing is happening\nand talk to me about food\nbecause that is what i asked you \nthe other day i was still appalled about the drama of a\nwoman\n(a prominent italian woman writer)\nwho wrote about migrants\nfrom her armchair\nin her sparsely designed home`, `and here am i\nmy very own mother has cancer\nthat is consuming her organs\nand i am drinking beer\nin another country\nin another city\nand writing about imminent death\nor healing\nholy shit`, `once a person told me about their\nexperience\nin the context of me being transgendered\nand having my breasts reduced\nshe told me she is thinking about doing it\nthough she is not trans\nbecause her grandmother and mother died of breast cancer`, `how candid she is\nand brave\ni thought\ni thought long and hard about those lives\nand about her feeling this every day\nfears for her own life`, `i thought long and hard\nabout how she says to herself\nbreathe in\nslowly\ndo not rush\nwait\nand then it happened to you\nand i ask you about the food \nbecause concern for another is manifested through\nfood`, `because i actually wanted you to be in the city where\nwe were together when i was a girl\nwhere i had a mother\nand you had a child\nbreathe out`, `message\npick up\nholy shit\nwhat is happening\nhi bro\nhey\nis everything okay\nhe is crying\nmy brother never cries`, `is everything okay\nno it is not where you are\nin split what happened\nit has spread\nembolism to both lungs\nher liver\npointless to operate\nlisten i think that\nlisten i think that\nlong pause`, `dunno\nthey will prolong her life for as long as they can\ni say nothing\nare you still there he asks\ni am \nsorry\ni tell him sorry\nas if you are not my mother too\ni tell him sorry\nbecause you truly were that for him\nbecause you two are bonded in ways i cannot even imagine`, `i wanted to tell him everything would be fine\ni did not say that to him\nwe do not talk that way\nwe know life is never fine`, `sorry\ni repeat once more\nlove you bro\ncall\ni am here\nright?`, `i go back to the table as if nothing has happened\npay for the coffee\nwalk\ni do not know where i am\npanic attacks\nan everyday thing\nnothing new\ncut the melodrama\ni repeat to myself \nyou have no right to make yourself the victim`, `i told my brother i love him\ni had not said that to him for 10 years\npoor me while i stand in the breeze by the sea and\nwait for the bus\nbecause split is a foreign city\nbecause i am nauseous\nbecause i need my bed\ndiazepams\nand my bathtub\nbecause i need to be a grown up and pack my suitcase`, `on the bus for eight hours i imagined\na place you two have been existing for years\na place i have never been\nin your room i see the blanket you covered yourself with\nthe blanket under which i tucked my hand so often\ntook the remote and switched off the tv when you were already\nfast asleep\nand i came in high from being out`, `the blanket full of burn holes because you fell asleep \na hundred times with a cigarette in your hand\nthe blanket i used to cover my mouth when i\nvomited in the room from drugs\nso i would be quieter\nso you would not hear me`, `i remember we had the blanket when we lived\ntogether back when i was a girl\nwe all had it\nbrother\nyou\nand me\nthat blanket is the only familiar thing i can\nconnect to you`, `i do not know you\ni do not even know your favorite song\never since i heard that you are dying\ni have been calling you mama\nmama\nmama`];

export default App;


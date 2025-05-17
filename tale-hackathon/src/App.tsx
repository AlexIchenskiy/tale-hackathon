import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pressed, setPressed] = useState(false);

  return (
    <>
      {!pressed && <button onClick={() => setPressed(true)}>Start reading</button>}
      {pressed && <PageContainer />}
    </>
  );
}

function PageContainer() {
  const [currentPage, setCurrentPage] = useState(0);

  const width = 430;

  const bgColors = ['#000', '#fff', '#000'];

  const [bgColor, setBgColor] = useState(bgColors[0]);

  useEffect(() => {
    if (currentPage === 0) {
      setBgColor(bgColors[0]);
    } else if (currentPage === pages.length - 1) {
      setBgColor(bgColors[2]);
    } else {
      setBgColor((currentPage === 0) ? (bgColors[0]) : (`color-mix(in srgb, ${bgColors[1] + ' ' + ((pages.length-1) / currentPage * 100 / 12) + '%'}, ${bgColors[2] + ' ' + (100 - ((pages.length-1) / currentPage * 100 / 12)) + '%'})`));
    }
  }, [currentPage]);

  return <div className="App" style={{ width: width, backgroundColor: bgColor }} onClick={(e) => {
    const x = e.clientX;
    if (x < width / 2) {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    }
    else {
      setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
    }
  }}>{pages.map((page, index) => {
    return (
      <div className='page' key={index} style={{ width: width, left: width * (index - currentPage) }}>{page}</div>
    );
  })}</div>
}


const pages = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed ullamcorper velit, vitae mattis magna. Aliquam et finibus tortor. Nulla facilisi. Cras ac cursus elit. Nam auctor felis ut dui porttitor ultricies. Vestibulum nunc nisi, tincidunt sodales aliquet nec, euismod at lorem. Cras dignissim ornare laoreet.",
  "Suspendisse vel sapien posuere, sagittis justo sit amet, pulvinar orci. Mauris accumsan vitae ipsum eget tincidunt. Pellentesque ut sollicitudin libero, ut sodales quam. Nunc non condimentum nisi, fringilla sodales tellus. Nulla diam lacus, tempor non pharetra efficitur, facilisis eget enim. Mauris justo tortor, facilisis in luctus eget, ullamcorper vitae felis. Ut diam lorem, sagittis nec nibh nec, vulputate ornare nibh.",
  "Maecenas et mattis sapien. Aliquam erat volutpat. Nullam aliquet nunc id eros scelerisque scelerisque. Aliquam sed ipsum ante. Cras sed lacus dui. Mauris varius, arcu eu mattis egestas, tortor risus pellentesque dui, ac elementum magna augue in ligula. Etiam quis laoreet ipsum. Cras a ante id urna commodo porta ornare vel neque. Mauris id risus semper nulla gravida faucibus. Donec eget facilisis dolor.",
  "Nullam commodo ex et accumsan finibus. Maecenas a maximus dolor. Nam sed maximus quam. In quis ligula vel ex iaculis ornare at id massa. Sed aliquet eros ex, id consequat est aliquam non. Donec lobortis augue eu ligula tristique, a maximus mi convallis. Vivamus eu neque eleifend, finibus libero ac, pellentesque mauris. Nullam fermentum ante congue mi consequat interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi scelerisque rutrum lacus id bibendum. Proin nec est eget tellus viverra facilisis a in neque. Vestibulum eleifend iaculis congue. Nunc aliquam id ipsum condimentum finibus. Donec eu auctor ex.",
  "Vestibulum metus ipsum, malesuada vitae dictum a, rhoncus vitae orci. Vivamus nisi neque, rutrum ut mollis sed, fringilla vel lorem. Vestibulum sapien dolor, laoreet in dapibus euismod, pellentesque a tellus. Ut pharetra odio ac dui iaculis bibendum. In facilisis fermentum nunc sit amet tincidunt. Integer ultricies ligula turpis, ut sollicitudin elit molestie nec. Aliquam odio urna, bibendum facilisis nunc et, ullamcorper pretium tortor. Nunc eget turpis ullamcorper, faucibus ante at, egestas ante. In placerat vel est sit amet hendrerit. Vestibulum eget purus leo. Praesent bibendum nulla tempus tincidunt mollis. Proin dictum leo mi, quis pretium enim interdum vel. Fusce sit amet nunc vitae augue fermentum tincidunt vitae viverra sem.",
  "Sed consequat ut nisl at egestas. Duis ullamcorper ornare tortor, non mollis mi tincidunt vitae. In mattis erat in lectus varius interdum. Pellentesque quam nisl, feugiat sed ligula ac, porttitor accumsan justo. Nunc rutrum convallis urna sit amet volutpat. Vivamus rhoncus neque quis urna auctor elementum. Nunc ultricies, risus eget consectetur pulvinar, metus nulla ultrices odio, at volutpat leo tortor eget erat. Cras lectus dui, eleifend ut laoreet vitae, suscipit in neque. Mauris aliquam lorem a blandit sollicitudin.",
  "Phasellus sagittis, turpis ut laoreet laoreet, velit augue laoreet urna, vitae sagittis nulla augue ac lorem. Donec in nunc nec arcu auctor cursus. Nullam sed quam at enim tristique aliquet. Cras efficitur elit et finibus tincidunt. Fusce non elit vehicula, gravida nulla vitae, varius mauris. Mauris fringilla arcu vel urna facilisis, ut auctor sapien semper. Phasellus at libero nec ligula elementum blandit eu non enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi luctus imperdiet nunc, vitae scelerisque ante mattis eget. Aenean mollis enim ac justo luctus, eu suscipit lacus laoreet.",
  "Aenean aliquet interdum consequat. In hac habitasse platea dictumst. Quisque tristique consequat sem, eget lacinia felis tincidunt in. Nulla ac pellentesque massa. Suspendisse tincidunt condimentum orci non posuere. Vivamus consequat tempus sapien, et faucibus libero porta vehicula. Sed iaculis nisi dolor, eu hendrerit lacus volutpat ut. Donec in mollis nulla, in scelerisque lorem. Etiam et nunc eu lacus porta lobortis eget in tortor. Morbi quis tincidunt eros.",
  "Duis nulla ex, pulvinar vitae elementum non, laoreet sed ligula. Duis dignissim id tortor ac imperdiet. Nulla et metus est. Aliquam feugiat sagittis mi, id eleifend ante. Aliquam tempor nec augue vitae vehicula. Suspendisse et ullamcorper nisi. Fusce cursus eu justo at iaculis. Nullam in congue ante. Proin dapibus risus volutpat arcu mollis, eget accumsan lacus tristique. Curabitur ullamcorper odio ut bibendum vestibulum. Aenean eget erat ullamcorper, vehicula urna quis, tincidunt turpis. Nulla scelerisque fringilla porta. Nam sit amet lacus quis neque lacinia volutpat nec at sapien.",
  "Duis porta vitae dolor vitae viverra. Vivamus rhoncus dolor ut mi aliquam, non sollicitudin libero suscipit. Maecenas vestibulum nunc tincidunt, condimentum purus in, fringilla dolor. Mauris imperdiet pretium sem, hendrerit dapibus nunc bibendum eu. Cras mattis euismod mi, eget congue urna volutpat eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue sagittis lacus, non tristique sem sodales quis. Etiam quis ullamcorper felis. Quisque et nulla risus. Mauris porttitor elit finibus ipsum malesuada, eget viverra nibh fringilla.",
  "Sed elementum felis eu vestibulum commodo. Nullam ultrices molestie quam, ut tincidunt lacus rhoncus nec. Nullam id lacinia eros. Fusce feugiat pharetra odio eget condimentum. Quisque nec justo odio. Etiam auctor sem id eros mollis, vitae interdum elit scelerisque. Sed laoreet fermentum enim, et cursus leo faucibus vel. Nunc ut lectus id magna pharetra interdum quis id mauris. Sed id neque molestie, hendrerit nisi quis, varius quam. Nulla egestas nunc id neque bibendum egestas. Fusce laoreet pellentesque massa, in vestibulum massa dignissim sit amet. Nullam pharetra sapien sit amet odio accumsan elementum. Maecenas hendrerit pellentesque lorem ac laoreet.",
  "Pellentesque vehicula massa condimentum metus dapibus consequat nec a turpis. Mauris ut arcu eget ipsum posuere porta vitae nec nunc. Curabitur ac mi diam. Quisque ornare urna ut arcu venenatis, vel aliquam arcu volutpat. Phasellus ut rutrum diam. In sed nunc finibus, finibus ligula sit amet, vulputate arcu. Nullam ultricies eleifend sapien, nec dictum neque scelerisque vel. Sed quis libero bibendum, finibus ex at, malesuada neque."
];

export default App;

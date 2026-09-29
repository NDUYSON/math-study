import React,{useEffect,useMemo,useState}from"react";
import katex from"katex";import"katex/dist/katex.min.css";
import{BookOpen,CheckCircle2,ChevronRight,Circle,Menu,Moon,RotateCcw,Sun,X}from"lucide-react";

const units=[
{id:"root-position",no:"01",title:"解の配置",sub:"2つの解が区間・半直線に入る条件",rank:"応用"},
{id:"intersection",no:"02",title:"放物線と直線",sub:"共有点・接線・弦の中点",rank:"応用"},
{id:"moving-axis",no:"03",title:"軸が動く最大・最小",sub:"定義域固定、軸の位置で場合分け",rank:"重要"},
{id:"moving-domain",no:"04",title:"定義域が動く最大・最小",sub:"区間と頂点の位置関係",rank:"発展"},
{id:"parameter-ineq",no:"05",title:"2次不等式と定数",sub:"恒成立・解集合の包含",rank:"応用"},
{id:"absolute",no:"06",title:"絶対値と実数解の個数",sub:"グラフの折り返しと共有点",rank:"発展"},
{id:"existence",no:"07",title:"存在条件・通過領域",sub:"定数についての方程式とみる",rank:"発展"},
{id:"optimization",no:"08",title:"条件付き最適化",sub:"2変数を1変数の2次関数へ",rank:"応用"}
];

const lessons={
"root-position":{
 key:"解そのものを求めるのではなく、解がどこにあるかを調べる。",
 tools:["判別式で実数解の存在を保証する","軸で2解の平均位置を調べる","境界での関数値の符号を調べる"],
 theorem:String.raw`f(x)=ax^2+bx+c\quad(a>0)`,
 insight:"2解がともに k より大きい条件は、単に和と積を見るだけでは不十分。グラフ全体を k の右側に配置する。",
 model:{title:"2つの解が指定値より大きい",problemBefore:"2次方程式 ",p1:String.raw`x^2-2mx+m+2=0`,problemAfter:" の2つの解がともに 1 より大きくなるような実数 m の範囲を求めよ。",eye:"境界 x=1、軸 x=m、実数解の存在の3条件を同時に見る。",plan:["異なる2実数解をもつ条件 D>0","軸が境界より右にある条件 m>1","上に開くので、境界で正となる条件 f(1)>0"],solution:[String.raw`D=4(m-2)(m+1)>0`,String.raw`m>1`,String.raw`f(1)=3-m>0`],answer:String.raw`2<m<3`,trap:"D>0 だけでは、2解が1より大きいことまでは保証できない。"},
 practice:[{q:String.raw`x^2-2(a+1)x+a^2-1=0`,text:" の2解が区間 (0,4) に入る a の範囲を求めよ。",hint:"f(0), f(4), 軸、D を組み合わせる。"},{q:String.raw`x^2-2mx+2m-3=0`,text:" が区間 (-1,2) にちょうど1つの解をもつ条件を求めよ。",hint:"端点での関数値の積に注目する。"}]},
"intersection":{
 key:"共有点の座標を直接追うか、解と係数で対称量を処理する。",
 tools:["2式を等しくして共有点方程式を作る","接する条件は重解 D=0","中点・距離では解と係数を使う"],
 theorem:String.raw`f(x)=g(x)`,
 insight:"共有点A、Bのx座標を α、β と置くと、中点や弦の長さは α+β、αβ、(α-β)^2 で処理できる。",
 model:{title:"弦の中点の軌跡",problemBefore:"放物線 ",p1:String.raw`y=x^2`,middle:" と直線 ",p2:String.raw`y=2tx-t^2+1`,problemAfter:" が異なる2点 A、B で交わる。線分ABの中点Mの軌跡を求めよ。",eye:"交点を解かず、α+β と α²+β² を利用する。",plan:["共有点方程式を作る","解の和から中点のx座標を求める","α²+β² から中点のy座標を求め、tを消去する"],solution:[String.raw`x^2-2tx+t^2-1=0`,String.raw`\alpha+\beta=2t,\quad \alpha\beta=t^2-1`,String.raw`X_M=t,\quad Y_M=\frac{\alpha^2+\beta^2}{2}=t^2+1`],answer:String.raw`Y=X^2+1`,trap:"A、Bを個別に求めると計算が長くなり、軌跡の構造が見えにくい。"},
 practice:[{q:String.raw`y=x^2-2x`,text:" と、点 (0,3) を通る直線が接するとき、接線をすべて求めよ。",hint:"直線を y=mx+3 とおく。"},{q:String.raw`y=x^2`,text:" と y=mx+2 の2交点間のx座標の差が4となる m を求めよ。",hint:"(α-β)^2=D を使う。"}]},
"moving-axis":{
 key:"定義域は固定。軸が区間の左・内部・右のどこにあるかで分ける。",
 tools:["平方完成して軸を求める","場合分けの境界は定義域の端点","最大値は頂点から遠い端点で決まる"],
 theorem:String.raw`f(x)=(x-a)^2+c`,
 insight:"場合分けは答えを見て行うのではなく、軸 x=a が定義域 [L,R] を横切る位置 L、R から先に決める。",
 model:{title:"軸が動くときの最小値",problemBefore:"関数 ",p1:String.raw`f(x)=x^2-2ax+2a`,problemAfter:" の 0≦x≦3 における最小値を a の式で表せ。",eye:"軸 x=a と区間 [0,3] の位置関係。",plan:["平方完成する","a<0、0≦a≦3、a>3 に分ける","各場合で最小となる点を選ぶ"],solution:[String.raw`f(x)=(x-a)^2-a^2+2a`,String.raw`a<0:\ \min f=f(0)=0`,String.raw`0\le a\le3:\ \min f=f(a)=-a^2+2a`,String.raw`a>3:\ \min f=f(3)=9-4a`],answer:String.raw`\min f=\begin{cases}0&(a<0)\\-a^2+2a&(0\le a\le3)\\9-4a&(a>3)\end{cases}`,trap:"頂点の値を無条件に最小値としてはいけない。頂点が定義域外なら端点で決まる。"},
 practice:[{q:String.raw`f(x)=x^2-2ax+a+1`,text:" の -1≦x≦2 における最大値を a の式で表せ。",hint:"軸から遠い端点がどちらかを比較する。"},{q:String.raw`f(x)=x^2-2ax+3`,text:" の 0≦x≦2 における最小値が1となる a を求めよ。",hint:"先に最小値を場合分けする。"}]},
"moving-domain":{
 key:"軸は固定、区間が動く。区間の中央と軸の距離で最大値を判断する。",
 tools:["区間の両端を明示する","頂点が区間内か確認する","最大値は軸から遠い端点"],
 theorem:String.raw`a\le x\le a+2`,
 insight:"区間が動く問題では、軸が区間に入る境界だけでなく、どちらの端点が軸から遠いかが変わる境界も必要。",
 model:{title:"動く区間での最大値",problemBefore:"関数 ",p1:String.raw`f(x)=x^2-4x+5`,problemAfter:" の a≦x≦a+2 における最大値を求めよ。",eye:"軸 x=2 と両端 a、a+2 の距離を比較する。",plan:["平方完成して軸を確認する","f(a) と f(a+2) を比較する","等しくなる a を場合分けの境界にする"],solution:[String.raw`f(x)=(x-2)^2+1`,String.raw`f(a)-f(a+2)=4(1-a)`],answer:String.raw`\max f=\begin{cases}f(a)&(a\le1)\\f(a+2)&(a\ge1)\end{cases}`,trap:"最大値では、頂点が区間に入るかよりも、どちらの端点が軸から遠いかが本質。"},
 practice:[{q:String.raw`f(x)=x^2-6x+10`,text:" の a≦x≦a+4 における最小値を求めよ。",hint:"軸 x=3 が区間の左・内部・右にある場合を分ける。"},{q:String.raw`f(x)=-(x-1)^2+5`,text:" の a≦x≦a+2 における最大値が4となる a を求めよ。",hint:"頂点が区間内なら最大値は5。"}]},
"parameter-ineq":{
 key:"2次式であることを先に確認し、恒成立は向きと判別式で処理する。",
 tools:["最高次係数が0になる場合を分離する","上に開く＋D≦0で常に0以上","解集合の包含は境界の位置で考える"],
 theorem:String.raw`ax^2+bx+c\ge0\quad(\forall x)`,
 insight:"パラメータが最高次係数にあるとき、a=0 の退化ケースを落とさない。ここが応用問題の典型的な失点源。",
 model:{title:"すべての実数で成り立つ条件",problemBefore:"すべての実数 x に対して ",p1:String.raw`(m-1)x^2-2mx+m+3\ge0`,problemAfter:" が成り立つ m の範囲を求めよ。",eye:"m=1 のとき2次式でなくなる。まず別に調べる。",plan:["m=1 を直接代入して判定する","m≠1 では上に開く条件 m-1>0","判別式 D≦0 を連立する"],solution:[String.raw`m=1:\ -2x+4\ge0\ \text{は恒成立しない}`,String.raw`m>1`,String.raw`D=4m^2-4(m-1)(m+3)\le0`],answer:String.raw`m\ge3`,trap:"いきなり D≦0 とすると、下に開く場合や1次式になる場合を誤って含める。"},
 practice:[{q:String.raw`x^2-2mx+m+2>0`,text:" がすべての実数 x で成り立つ m の範囲を求めよ。",hint:"厳密不等号なので D<0。"},{q:String.raw`(a+1)x^2-2ax+a-3\le0`,text:" がすべての実数 x で成り立つ a を求めよ。",hint:"a=-1 を別扱いする。"}]},
"absolute":{
 key:"絶対値はグラフの負の部分をx軸対称に折り返す。",
 tools:["元の2次関数の零点と頂点を調べる","折り返し後の山・谷の高さを求める","水平線との交点数を数える"],
 theorem:String.raw`|f(x)|=k`,
 insight:"代数的に場合分けするより、グラフの特徴値を先に出すと実数解の個数を一気に分類できる。",
 model:{title:"実数解の個数の分類",problemBefore:"方程式 ",p1:String.raw`|x^2-4x+3|=k`,problemAfter:" の実数解の個数を k の値によって分類せよ。",eye:"元の放物線の零点は1、3、頂点値は-1。折り返すと中央の山の高さが1。",plan:["k<0 は不可能","k=0 は元の零点","0<k<1、k=1、k>1 で水平線との交点数を数える"],solution:[String.raw`x^2-4x+3=(x-2)^2-1`],answer:String.raw`\begin{array}{c|ccccc}k&k<0&k=0&0<k<1&k=1&k>1\\\hline 個数&0&2&4&3&2\end{array}`,trap:"|f(x)|=k を f(x)=k だけにしてしまうと、f(x)=-k の解を失う。"},
 practice:[{q:String.raw`|x^2-2x-3|=k`,text:" の実数解の個数を分類せよ。",hint:"頂点値と零点を調べる。"},{q:String.raw`|x^2-4|=ax`,text:" の実数解の個数を a によって分類せよ。",hint:"右辺の符号から x の範囲も制限される。"}]},
"existence":{
 key:"点 (x,y) を固定し、パラメータについて実数解が存在する条件へ変換する。",
 tools:["パラメータについて整理する","実数パラメータの存在条件に判別式を使う","等号成立は領域の境界"],
 theorem:String.raw`F(x,y,t)=0\quad\text{を t の方程式とみる}`, 
 insight:"変数とパラメータの役割を交換する発想が、この分野の中心。",
 model:{title:"放物線群の通過領域",problemBefore:"実数 a を動かすとき、放物線 ",p1:String.raw`y=x^2-2ax+a^2+a`,problemAfter:" が通過する領域を求めよ。",eye:"(x,y) を固定すると、aについての2次方程式になる。",plan:["式を a について整理する","実数 a が存在するための判別式 D≧0","x、y の不等式へ戻す"],solution:[String.raw`a^2+(1-2x)a+x^2-y=0`,String.raw`D_a=(1-2x)^2-4(x^2-y)\ge0`],answer:String.raw`y\ge x-\frac14`,trap:"各aの頂点だけを追っても、放物線群全体の通過領域は得られない。"},
 practice:[{q:String.raw`y=x^2+2ax+2a^2-1`,text:" が実数 a を動かすときに通過する領域を求めよ。",hint:"aについての2次方程式として整理する。"},{q:String.raw`y=ax^2+(1-a)x+a`,text:" が実数 a を動かすとき、必ず通る定点を求めよ。",hint:"aを含む部分と含まない部分に分ける。"}]},
"optimization":{
 key:"条件式で1変数を消去し、定義域付き2次関数に帰着する。",
 tools:["変数の範囲を最初に決める","条件式から一方を消去する","平方完成または頂点で最適化"],
 theorem:String.raw`x+y=s\quad\Longrightarrow\quad y=s-x`,
 insight:"数値だけでなく、等号成立の x、y と条件範囲を必ず確認する。",
 model:{title:"2変数の条件付き最小",problemBefore:"実数 x、y が ",p1:String.raw`x+y=6,\quad x\ge0,\ y\ge0`,problemAfter:" を満たすとき、x²+2y² の最小値を求めよ。",eye:"y=6-x として1変数化し、0≦x≦6 を忘れない。",plan:["yを消去する","2次関数として平方完成する","頂点が定義域内か確認する"],solution:[String.raw`x^2+2(6-x)^2=3(x-4)^2+24`],answer:String.raw`\min=24\quad(x,y)=(4,2)`,trap:"相加相乗平均を無理に使うより、制約式から2次関数へ帰着する方が自然。"},
 practice:[{q:String.raw`x+2y=8,\quad x,y\ge0`,text:" のとき xy の最大値を求めよ。",hint:"x=8-2y とする。"},{q:String.raw`x^2+y^2=10`,text:" のとき x+y の最大値・最小値を求めよ。",hint:"(x+y)^2 と xy の関係、または回転した座標を考える。"}]}
};

function Formula({tex,inline=false}){const html=katex.renderToString(tex,{throwOnError:false,displayMode:!inline,strict:false});return inline?<span className="formula inline" dangerouslySetInnerHTML={{__html:html}}/>:<div className="formula" dangerouslySetInnerHTML={{__html:html}}/>}
function ProblemText({m}){return <h3 className="problemText"><span>{m.problemBefore}</span>{m.p1&&<Formula tex={m.p1} inline/>}{m.middle&&<span>{m.middle}</span>}{m.p2&&<Formula tex={m.p2} inline/>}<span>{m.problemAfter}</span></h3>}
function Model({m,open,setOpen}){return <div className="model"><div className="modelTitle"><span>標準例題</span><b>{m.title}</b></div><ProblemText m={m}/><div className="eye"><b>着眼点</b><p>{m.eye}</p></div><div className="buttons"><button onClick={()=>setOpen(o=>({...o,plan:!o.plan}))}>解法設計</button><button className="primary" onClick={()=>setOpen(o=>({...o,answer:!o.answer}))}>模範答案</button></div>{open.plan&&<div className="plan"><b>解法のプロセス</b><ol>{m.plan.map((x,i)=><li key={i}>{x}</li>)}</ol></div>}{open.answer&&<div className="answer"><ol>{m.solution.map((x,i)=><li key={i}><Formula tex={x}/></li>)}</ol><div className="final"><b>結論</b><Formula tex={m.answer}/></div><div className="trap"><b>誤答分析</b><p>{m.trap}</p></div></div>}</div>}
function Practice({items}){return <div className="practice"><h3>対応演習</h3>{items.map((p,i)=><div className="practiceItem" key={i}><span>演習 {i+1}</span><p><Formula tex={p.q} inline/>{p.text}</p><details><summary>方針を見る</summary><p>{p.hint}</p></details></div>)}</div>}
export default function App(){const[active,setActive]=useState(units[0].id),[dark,setDark]=useState(false),[drawer,setDrawer]=useState(false),[opened,setOpened]=useState({}),[done,setDone]=useState(()=>{try{return JSON.parse(localStorage.getItem("advanced-progress")||"{}")}catch{return{}}});useEffect(()=>localStorage.setItem("advanced-progress",JSON.stringify(done)),[done]);const progress=Math.round(units.filter(u=>done[u.id]).length/units.length*100);const go=id=>{setActive(id);document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setDrawer(false)};const nav=<aside><div className="brand"><div>数</div><span><b>数学学習ノート</b><small>応用問題編</small></span><button onClick={()=>setDrawer(false)}><X/></button></div><nav>{units.map(u=><button key={u.id} className={active===u.id?"active":""} onClick={()=>go(u.id)}><span>{u.no}</span><div><b>{u.title}</b><small>{u.sub}</small></div><ChevronRight/></button>)}</nav><div className="progress"><span>習得度 {progress}%</span><i><em style={{width:`${progress}%`}}/></i></div></aside>;return <div className={dark?"app dark":"app"}>{drawer&&<div className="shade" onClick={()=>setDrawer(false)}/>}<div className={drawer?"mobile show":"mobile"}>{nav}</div><div className="desktop">{nav}</div><div className="content"><header><button className="menu" onClick={()=>setDrawer(true)}><Menu/></button><div><small>高校数学I・応用</small><h1>2次関数・2次方程式 発展講座</h1></div><button className="theme" onClick={()=>setDark(v=>!v)}>{dark?<Sun/>:<Moon/>}</button></header><main><section className="hero"><div><span>上位層向け</span><h2>問題の「型」ではなく<br/>解法の設計を学ぶ</h2><p>条件を図・式・判別式へ翻訳し、場合分けの境界を自分で決める。</p></div><div><b>学習サイクル</b><ol><li>着眼点を確認</li><li>解法を自分で設計</li><li>模範答案と比較</li><li>対応演習で再現</li></ol></div></section>{units.map(u=>{const l=lessons[u.id],op=opened[u.id]||{};return <section className="unit" id={u.id} key={u.id}><div className="unitHead"><span>{u.no}</span><div><em>{u.rank}</em><h2>{u.title}</h2><p>{u.sub}</p></div><button className="complete" onClick={()=>setDone(d=>({...d,[u.id]:!d[u.id]}))}>{done[u.id]?<CheckCircle2/>:<Circle/>}{done[u.id]?"習得済み":"習得済みにする"}</button></div><p className="key">{l.key}</p><div className="toolbox"><div><b>使う道具</b><ul>{l.tools.map(x=><li key={x}>{x}</li>)}</ul></div><Formula tex={l.theorem}/></div><div className="insight"><b>本質</b><p>{l.insight}</p></div><Model m={l.model} open={op} setOpen={v=>setOpened(all=>({...all,[u.id]:typeof v==="function"?v(all[u.id]||{}):v}))}/><Practice items={l.practice}/></section>})}<section className="footer"><BookOpen/><div><h2>レビュー用試作版</h2><p>8テーマ、標準例題8題、対応演習16題。内容・難度・解説構成を確認後、各テーマを3段階演習へ拡張する。</p></div><button onClick={()=>{setDone({});setOpened({})}}><RotateCcw/>リセット</button></section></main></div></div>}

import React,{useEffect,useState}from"react";
import katex from"katex";
import"katex/dist/katex.min.css";
import{CheckCircle2,Circle,FunctionSquare,Menu,Moon,Sigma,Sun,X}from"lucide-react";

function MathFormula({tex}){
  const html=katex.renderToString(tex,{throwOnError:false,displayMode:true,strict:false});
  return <div className="mathFormula" dangerouslySetInnerHTML={{__html:html}}/>;
}

const topics=[
  {id:"functions",title:"2次関数",sub:"グラフ・最大値と最小値",icon:FunctionSquare},
  {id:"equations",title:"2次方程式",sub:"解法・判別式・解と係数",icon:Sigma}
];
const exercises=[
  {q:"x² - 5x + 6 = 0 を解きなさい。",a:"(x - 2)(x - 3)=0 より、x=2, 3"},
  {q:"2x² + 3x - 1 = 0 を解きなさい。",a:"x=(-3±√17)/4"},
  {q:"x² - 4x + k = 0 が重解をもつとき、kを求めなさい。",a:"16-4k=0 より、k=4"}
];
function Card({title,children,done,toggle}){return <section className="card"><div className="sectionTitle"><h2>{title}</h2><button className="done" onClick={toggle}>{done?<CheckCircle2/>:<Circle/>}理解できた</button></div>{children}</section>}
export default function App(){
 const[topic,setTopic]=useState("equations"),[dark,setDark]=useState(false),[menu,setMenu]=useState(false),[open,setOpen]=useState({}),[done,setDone]=useState(()=>JSON.parse(localStorage.getItem("math-study-progress")||"{}"));
 useEffect(()=>localStorage.setItem("math-study-progress",JSON.stringify(done)),[done]);
 const mark=id=>setDone(p=>({...p,[id]:!p[id]})); const current=topics.find(t=>t.id===topic);
 const sidebar=<aside className="sidebar"><div className="brand"><div className="logo">数</div><div><b>数学学習ノート</b><small>高校1年生・2学期</small></div><button className="close" onClick={()=>setMenu(false)}><X/></button></div><nav>{topics.map(t=>{const I=t.icon;return <button key={t.id} className={topic===t.id?"nav active":"nav"} onClick={()=>{setTopic(t.id);setMenu(false)}}><I/><span><b>{t.title}</b><small>{t.sub}</small></span></button>})}</nav></aside>;
 return <div className={dark?"app dark":"app"}>{menu&&<div className="shade" onClick={()=>setMenu(false)}/>}<div className={menu?"mobileSide show":"mobileSide"}>{sidebar}</div><div className="desktopSide">{sidebar}</div><div className="content"><header><button className="menu" onClick={()=>setMenu(true)}><Menu/></button><div><small>高校1年生 / 2学期</small><h1>{current.title}</h1></div><button className="theme" onClick={()=>setDark(v=>!v)}>{dark?<Sun/>:<Moon/>}</button></header><main>
 {topic==="equations"?<>
 <section className="hero green"><div><small>高校1年生・2学期</small><h2>2次方程式</h2><p>問題を見て、どの方法を使うかを順番に理解します。</p></div></section>
 <Card title="1. 因数分解で解く" done={done.factor} toggle={()=>mark("factor")}><p>積の形に直して「積が0なら、どちらかが0」を使います。</p><MathFormula tex={String.raw`AB=0\quad\Longrightarrow\quad A=0\ \text{または}\ B=0`}/><div className="example"><MathFormula tex={String.raw`\begin{aligned}x^2-5x+6&=0\\(x-2)(x-3)&=0\\x&=2,\ 3\end{aligned}`}/></div></Card>
 <Card title="2. 解の公式を使う" done={done.formula} toggle={()=>mark("formula")}><p>係数 a、b、c を符号も含めて公式へ代入します。</p><MathFormula tex={String.raw`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`}/><div className="example"><MathFormula tex={String.raw`\begin{aligned}2x^2+3x-1&=0\\x&=\frac{-3\pm\sqrt{3^2-4\cdot2\cdot(-1)}}{2\cdot2}\\x&=\frac{-3\pm\sqrt{17}}{4}\end{aligned}`}/></div></Card>
 <Card title="3. 判別式" done={done.disc} toggle={()=>mark("disc")}><MathFormula tex={String.raw`D=b^2-4ac`}/><div className="three"><div><b>D &gt; 0</b><span>異なる2つの実数解</span></div><div><b>D = 0</b><span>重解</span></div><div><b>D &lt; 0</b><span>実数解なし</span></div></div></Card>
 <Card title="4. 解と係数の関係" done={done.vieta} toggle={()=>mark("vieta")}><div className="two"><MathFormula tex={String.raw`\alpha+\beta=-\frac{b}{a}`}/><MathFormula tex={String.raw`\alpha\beta=\frac{c}{a}`}/></div><div className="example"><MathFormula tex={String.raw`\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta`}/></div></Card>
 <Card title="5. 確認問題" done={done.practice} toggle={()=>mark("practice")}>{exercises.map((e,i)=><div className="question" key={i}><b>Q{i+1}. {e.q}</b><button onClick={()=>setOpen(p=>({...p,[i]:!p[i]}))}>答えを見る</button>{open[i]&&<p className="answer">{e.a}</p>}</div>)}</Card>
 </>:<>
 <section className="hero purple"><div><small>高校1年生・2学期</small><h2>2次関数</h2><p>グラフの形と移動から学びます。</p></div></section>
 <Card title="1. 基本の形" done={done.qbasic} toggle={()=>mark("qbasic")}><MathFormula tex={String.raw`y=a(x-p)^2+q`}/><p>頂点は (p,q)、軸は x=p です。</p></Card>
 <Card title="2. グラフの移動" done={done.qgraph} toggle={()=>mark("qgraph")}><MathFormula tex={String.raw`y=ax^2\ \longrightarrow\ y=a(x-p)^2+q`}/><p>x軸方向へ p、y軸方向へ q だけ移動します。</p></Card>
 </>}
 </main></div></div>}

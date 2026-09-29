import React,{useEffect,useState}from"react";
import{BookOpen,CheckCircle2,Circle,FunctionSquare,Menu,Moon,Sigma,Sun,X}from"lucide-react";
const topics=[{id:"functions",title:"2次関数",sub:"グラフ・最大値と最小値",icon:FunctionSquare},{id:"equations",title:"2次方程式",sub:"解法・判別式・解と係数",icon:Sigma}];
const exercises=[
 {q:"x² - 5x + 6 = 0 を解きなさい。",h:"積が6、和が-5になる2数を探します。",a:"(x - 2)(x - 3)=0 より、x=2, 3"},
 {q:"2x² + 3x - 1 = 0 を解きなさい。",h:"因数分解が難しいので解の公式を使います。",a:"x=(-3±√17)/4"},
 {q:"x² - 4x + k = 0 が重解をもつとき、kを求めなさい。",h:"重解の条件はD=0です。",a:"16-4k=0 より、k=4"}
];
function Card({id,title,children,done,toggle}){return <section id={id} className="card"><div className="sectionTitle"><h2>{title}</h2><button className="done" onClick={toggle}>{done?<CheckCircle2/>:<Circle/>}理解できた</button></div>{children}</section>}
export default function App(){
 const[topic,setTopic]=useState("equations"),[dark,setDark]=useState(false),[menu,setMenu]=useState(false),[open,setOpen]=useState({}),[done,setDone]=useState(()=>JSON.parse(localStorage.getItem("math-study-progress")||"{}"));
 useEffect(()=>localStorage.setItem("math-study-progress",JSON.stringify(done)),[done]);
 const mark=id=>setDone(p=>({...p,[id]:!p[id]}));
 const current=topics.find(t=>t.id===topic);
 const sidebar=<aside className="sidebar"><div className="brand"><div className="logo">数</div><div><b>数学学習ノート</b><small>高校1年生・2学期</small></div><button className="close" onClick={()=>setMenu(false)}><X/></button></div><nav>{topics.map(t=>{const I=t.icon;return <button key={t.id} className={topic===t.id?"nav active":"nav"} onClick={()=>{setTopic(t.id);setMenu(false)}}><I/><span><b>{t.title}</b><small>{t.sub}</small></span></button>})}</nav><div className="progress"><span>学習の進み具合</span><b>{Object.values(done).filter(Boolean).length}/6</b></div></aside>;
 return <div className={dark?"app dark":"app"}>{menu&&<div className="shade" onClick={()=>setMenu(false)}/>}<div className={menu?"mobileSide show":"mobileSide"}>{sidebar}</div><div className="desktopSide">{sidebar}</div><div className="content"><header><button className="menu" onClick={()=>setMenu(true)}><Menu/></button><div><small>高校1年生 / 2学期</small><h1>{current.title}</h1></div><button className="theme" onClick={()=>setDark(v=>!v)}>{dark?<Sun/>:<Moon/>}</button></header><main>
 {topic==="equations"?<>
 <section className="hero green"><div><small>高校1年生・2学期</small><h2>2次方程式</h2><p>問題を見て、どの方法を使うかを順番に理解します。</p></div><ol><li>右辺を0にする</li><li>因数分解を確認</li><li>難しければ解の公式</li><li>解の個数は判別式</li></ol></section>
 <Card id="factor" title="1. 因数分解で解く" done={done.factor} toggle={()=>mark("factor")}><p>積の形に直して「積が0なら、どちらかが0」を使います。</p><div className="formula greenBox">AB=0 → A=0 または B=0</div><div className="example"><b>例題　x²-5x+6=0</b><p>① (x-2)(x-3)=0</p><p>② x-2=0 または x-3=0</p><strong>x=2, 3</strong></div><div className="note">注意：右辺が0でないときは、最初にすべて左辺へ移項します。</div></Card>
 <Card id="formula" title="2. 解の公式を使う" done={done.formula} toggle={()=>mark("formula")}><p>ax²+bx+c=0 の a、b、c を符号も含めて確認します。</p><div className="formula">x=(-b±√(b²-4ac))/2a</div><div className="steps"><span>1. a・b・cを確認</span><span>2. 符号ごと代入</span><span>3. 最後まで整理</span></div></Card>
 <Card id="disc" title="3. 判別式で解の個数を調べる" done={done.disc} toggle={()=>mark("disc")}><div className="formula amber">D=b²-4ac</div><div className="three"><div><b>D&gt;0</b><span>異なる2つの実数解</span></div><div><b>D=0</b><span>重解</span></div><div><b>D&lt;0</b><span>実数解なし</span></div></div></Card>
 <Card id="vieta" title="4. 解と係数の関係" done={done.vieta} toggle={()=>mark("vieta")}><p>解をα、βとすると：</p><div className="two"><div className="formula greenBox">α+β=-b/a</div><div className="formula greenBox">αβ=c/a</div></div><div className="example">よく使う式：α²+β²=(α+β)²-2αβ</div></Card>
 <Card id="practice" title="5. 確認問題" done={done.practice} toggle={()=>mark("practice")}>{exercises.map((e,i)=><div className="question" key={i}><b>Q{i+1}. {e.q}</b><div><button onClick={()=>setOpen(p=>({...p,[`h${i}`]:!p[`h${i}`]}))}>ヒント</button><button onClick={()=>setOpen(p=>({...p,[`a${i}`]:!p[`a${i}`]}))}>答えを見る</button></div>{open[`h${i}`]&&<p className="hint">ヒント：{e.h}</p>}{open[`a${i}`]&&<p className="answer">解答：{e.a}</p>}</div>)}</Card>
 </>:<>
 <section className="hero purple"><div><small>高校1年生・2学期</small><h2>2次関数</h2><p>グラフの形と移動から学びます。</p></div></section>
 <Card title="1. 基本の形" done={done.qbasic} toggle={()=>mark("qbasic")}><div className="formula">y=a(x-p)²+q</div><p>頂点は(p,q)、軸はx=pです。a&gt;0なら下に凸、a&lt;0なら上に凸です。</p></Card>
 <Card title="2. グラフの移動" done={done.qgraph} toggle={()=>mark("qgraph")}><p>y=a(x-p)²+q は y=ax² をx軸方向へp、y軸方向へq移動したグラフです。</p><div className="pending">次に追加：最大値・最小値 / 2次関数の決定 / 確認問題</div></Card>
 </>}
 </main></div></div>}

const finiteVector=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite);
export function motion({mass,force,velocity,origin=[0,0,0],t0=0},t){
 if(!(Number.isFinite(mass)&&mass>0)||!finiteVector(force)||!finiteVector(velocity)||!finiteVector(origin)||!Number.isFinite(t)||!Number.isFinite(t0))throw Error('Invalid physical inputs');
 const dt=t-t0,a=force.map(f=>f/mass),v=velocity.map((x,i)=>x+a[i]*dt),r=origin.map((x,i)=>x+velocity[i]*dt+a[i]*dt*dt/2);
 return {r,v,a,f:[...force],p:v.map(x=>mass*x),kinetic:mass*v.reduce((s,x)=>s+x*x,0)/2};
}
export function inverse(mode,mass,b,t){
 if(!(mass>0)||![mass,b,t].every(Number.isFinite))throw Error('Invalid inverse inputs');
 const r=mode==='circle'?[2*Math.cos(b*t),2*Math.sin(b*t),0]:[t,b*t*t,0];
 const v=mode==='circle'?[-2*b*Math.sin(b*t),2*b*Math.cos(b*t),0]:[1,2*b*t,0];
 const a=mode==='circle'?r.map(x=>-b*b*x):[0,2*b,0];
 return {r,v,a,f:a.map(x=>mass*x)};
}
export function compare(x0,v0,t,a=.5){return {a:t+a*t*t/2,b:x0+v0*t+a*t*t/2,delta:x0+(v0-1)*t};}
export function predict(t,steps=200){let x=0,v=1;const dt=t/steps;for(let i=0;i<steps;i++){x+=v*dt+.25*dt*dt;v+=.5*dt;}return {analytic:t+.25*t*t,stepped:x};}


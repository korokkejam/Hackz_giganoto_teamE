export default function resize(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
  const dpr=window.devicePixelRatio || 1;
  const rect=canvas.getBoundingClientRect();
  canvas.width=rect.width*dpr;
  canvas.height=rect.height*dpr;
  ctx.scale(dpr,dpr);
};

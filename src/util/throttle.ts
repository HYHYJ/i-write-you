/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = <T extends (...args: any[]) => any>(fn: T, time: number = 5000) => {
  let throttle = false;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>){
      if(!throttle){
        fn.apply(this, args);
          throttle = true;
          setTimeout(()=>{throttle = false}, time);
      }
  }
}
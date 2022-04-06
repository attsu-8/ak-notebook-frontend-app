
export const debounce = (fn,timerIdState, setTimerIdState, bufferInterval) => {
    return () => {
        clearTimeout(timerIdState); // 前回のタイマーを解除
        let timer = setTimeout(() => { // 新たにタイマーをセット
            fn();
        }, bufferInterval);
        setTimerIdState(timer); // 今回のタイマーのタイマーIDをセット
    };        
}
import { utils as wiv } from '@/utils/wiv/index.js';

//scale 缩放方式：'contain'-等比缩放并留白，'100per'-不等比缩放至留白，'false'-不缩放。
//此项目中 scale 不定义则认为是 'false'
const SCALE = wiv.fGetUrlParams().scale || 'false';

const SELECTOR = '#app'; // 需要自适应屏幕尺寸的元素的选择器
let sStyleName; // 将向 <head> 中添加 name 为此值的 <style>，其中保存实时计算的主容器样式规则，第一次执行 fInitScreenAutoScale 时生成

//将 SELECTOR 指定的元素设置为自动缩放
//nDesignWidth, nDesignHeight 定义最佳分辨率
const fInitScreenAutoScale = function(nDesignWidth, nDesignHeight) {
    let timerRezize;
    const fWindowResize = () => { // 监听页面大小改变
        //console.log('fWindowResize')
        if (timerRezize) {
            return;
        }
        timerRezize = setTimeout(() => {
            timerRezize = undefined;
            fScaleWrap();
        }, 500);
    };
    const fScaleWrap = () => { // 计算页面缩放比例
        let nViewW = window.innerWidth,
            nViewH = window.innerHeight;
        var nScaleW = wiv.fFloatDiv(nViewW, nDesignWidth),
            nScaleH = wiv.fFloatDiv(nViewH, nDesignHeight);
        let sTransform;
        //let sElse = '',
        //    sClose = '';
        let dStyle = document.querySelector('style[name="' + sStyleName + '"]');

        //等比缩放
        if (SCALE === 'contain') {
            if (nScaleW < nScaleH) { //横向铺满，纵向留白
                sTransform = 'translate(0, ' + wiv.fFloatDiv(nViewH - nDesignHeight * nScaleW, 2) + 'px) ' +
                    'scale(' + nScaleW + ', ' + nScaleW + ');'
                //sElse = `.wi-imageview{ 
                //                height:${nDesignHeight * nScaleW}px  !important; top: ${(nViewH - nDesignHeight * nScaleW) / 2}px;
                //                left: ${1809 * nScaleW}px !important;
                //                width: ${2120 * nScaleW}px !important;
                //                }`;
                //sClose = `.wi-imageview-close{
                //                width: ${nScaleW * 60}px;
                //                height: ${nScaleW * 60}px;
                //                right: ${nScaleW * 17}px;
                //                top: ${nScaleW * 18}px;
                //                background-size: 100% 100%;
                //            }`
            }
            else { //纵向铺满，横向留白
                sTransform = 'translate(' + wiv.fFloatDiv(nViewW - nDesignWidth * nScaleH, 2) + 'px, 0) ' +
                    'scale(' + nScaleH + ', ' + nScaleH + ');'
            }
        }
        //非等比缩放（铺满屏幕）
        else if (SCALE === '100per') {
            sTransform = 'scale(' + nScaleW + ', ' + nScaleH + ');';
        }

        if (!dStyle) {
            dStyle = document.createElement('style');
            dStyle.setAttribute('name', sStyleName);
            dStyle.type = 'text/css';
            document.getElementsByTagName('head').item(0).appendChild(dStyle);
        }
        dStyle.innerHTML = 'body{overflow:hidden;}\n' +
            //sElse +
            //sClose +
            SELECTOR + '{' +
            'width:' + nDesignWidth + 'px!important;height:' + nDesignHeight + 'px!important;' +
            '-webkit-transform-origin: left top;' +
            '-moz-transform-origin: left top;' +
            '-ms-transform-origin: left top;' +
            'transform-origin: left top;' +
            '-webkit-transform:' + sTransform +
            '-moz-transform:' + sTransform +
            '-ms-transform:' + sTransform +
            'transform:' + sTransform +
            '}';

        //console.log(nDesignWidth, nDesignHeight, nViewW, nViewH)
    };

    if (SCALE !== 'false' && !sStyleName) { //默认不等比缩放
        sStyleName = wiv.fGenerateGuid(); // 将向 <head> 中添加 name 为此值的 <style>，其中保存实时计算的主容器样式规则
        window.addEventListener('resize', fWindowResize); // 监听页面大小改变，缩放页面
        fScaleWrap();
    }
};

export { fInitScreenAutoScale };
'use strict';
import echarts from 'echarts';
//import store from '@/store.js'
//水质级别数据
const aWaterConf = [{
    lv: '2',
    level: 'Ⅰ-Ⅱ类',
    state: '优',
    tip: '',
    max: 2,
    color: '#29ee5d'
}, {
    lv: '3',
    level: 'Ⅲ类',
    state: '良',
    tip: '',
    max: 3,
    color: '#f87103'
}, {
    lv: '4',
    level: 'Ⅳ类',
    state: '轻度污染',
    tip: '',
    max: 4,
    color: '#fe5c5c'
}, {
    lv: '5',
    level: 'Ⅴ类',
    state: '中度污染',
    tip: '',
    max: 5,
    color: '#f2173c'
}, {
    lv: '6',
    level: '劣Ⅴ类',
    state: '重度污染',
    tip: '',
    max: -1,
    color: '#ae2020'
}];
//aqi 等级数据
const aAqiConf = [{
    lv: '1',
    level: 'Ⅰ',
    state: '优',
    tip: '空气质量令人满意，基本无空气污染。',
    max: 50,
    color: '#29ee5d'
}, {
    lv: '2',
    level: 'Ⅱ',
    state: '良',
    tip: '空气质量可接受，某些污染物对极少数敏感人群健康有较弱影响。',
    max: 100,
    color: '#fadb14'
}, {
    lv: '3',
    level: 'Ⅲ',
    state: '轻度污染',
    tip: '易感人群有症状有轻度加剧，健康人群出现刺激症状。',
    max: 150,
    color: '#f87103'
}, {
    lv: '4',
    level: 'Ⅳ',
    state: '中度污染',
    tip: '进一步加剧易感人群症状，会对健康人群的呼吸系统有影响。',
    max: 200,
    color: '#fe5c5c'
}, {
    lv: '5',
    level: 'Ⅴ',
    state: '重度污染',
    tip: '心脏病和肺病患者症状加剧运动耐受力降低，健康人群出现症状。',
    max: 300,
    color: '#f2173c'
}, {
    lv: '6',
    level: 'Ⅵ',
    state: '严重污染',
    tip: '健康人群运动耐受力降低，有明显强烈症状，可能导致疾病。',
    max: -1,
    color: '#ae2020'
}];
/**
 * 根据aqi值获取aqi等级详细数据
 */
const fGetAqiConf = function(nValue) {
    let i, oConf;
    const nLen = aAqiConf.length;
    nValue = parseInt(nValue, 10) || 0;
    for (i = 0; i < nLen; i++) {
        oConf = aAqiConf[i];
        if (nValue <= oConf.max) {
            return oConf;
        }
    }
    return oConf;
};
/**
 * 根据水质类别获取水质等级详细数据
 */
const fGetWaterConf = function(nValue) {
    let i, oConf;
    const nLen = aWaterConf.length;
    nValue = parseInt(nValue, 10) || 0;
    for (i = 0; i < nLen; i++) {
        oConf = aWaterConf[i];
        if (nValue <= oConf.max) {
            return oConf;
        }
    }
    return oConf;
};

/**
 * 图表颜色配置
 */
const oChartColorConf = {
    main: "#8FDCE2", //主色：用于 tooltip 的 lineStyle
    legendLabel: '#8FDCE2', //图例说明文字
    lengendInativeLabel: '#91AEAF', //禁用的图例说明文字
    axisLabel: '#8FDCE2', //坐标轴刻度文字
    axisName: "#8FDCE2", //坐标轴文字（单位）
    gridLine: "rgba(168,252,255,.2)", //网格线
    aData: [
        '#A8FCFF', '#FFBE34', '#49D2CE', '#BDDB68', '#57ADF8', '#FFED94', '#FF7E7E', '#97BDFF', '#C1C1C1', '#BC98FF',
    ],
    aGradient: [
        //渐变色
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(168,252,255,1)' },
            { offset: 0.6, color: 'rgba(168,252,255,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255,190,52,1)' },
            { offset: 0.6, color: 'rgba(255,190,52,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(73,210,206,1)' },
            { offset: 0.6, color: 'rgba(73,169,64,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(189,219,104,1)' },
            { offset: 0.6, color: 'rgba(189,219,104,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(87,173,248,1)' },
            { offset: 0.6, color: 'rgba(87,173,248,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255,237,148,1)' },
            { offset: 0.6, color: 'rgba(255,237,148,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255,126,126,1)' },
            { offset: 0.6, color: 'rgba(255,126,126,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(151,189,255,1)' },
            { offset: 0.6, color: 'rgba(151,189,255,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(193,193,193,1)' },
            { offset: 0.6, color: 'rgba(193,193,193,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(188,152,255,1)' },
            { offset: 0.6, color: 'rgba(188,152,255,.36)' },
        ]),
    ],
    aGradientHor: [
        //渐变色(横向)
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(168,252,255,1)' },
            { offset: 0.6, color: 'rgba(168,252,255,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(255,190,52,1)' },
            { offset: 0.6, color: 'rgba(255,190,52,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(73,210,206,1)' },
            { offset: 0.6, color: 'rgba(73,169,64,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(189,219,104,1)' },
            { offset: 0.6, color: 'rgba(189,219,104,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(87,173,248,1)' },
            { offset: 0.6, color: 'rgba(87,173,248,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(255,237,148,1)' },
            { offset: 0.6, color: 'rgba(255,237,148,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(255,126,126,1)' },
            { offset: 0.6, color: 'rgba(255,126,126,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(151,189,255,1)' },
            { offset: 0.6, color: 'rgba(151,189,255,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(193,193,193,1)' },
            { offset: 0.6, color: 'rgba(193,193,193,.36)' },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(188,152,255,1)' },
            { offset: 0.6, color: 'rgba(188,152,255,.36)' },
        ]),
    ],
};

export { fGetAqiConf, fGetWaterConf, oChartColorConf }
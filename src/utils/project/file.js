'use strict';
import * as Base64 from 'js-base64';
import { URLS_COM } from '@/urls.js';

//文件预览
const fPreviewDoc = function(sFileid, sFilename) {
    //当 fullfilename 重名时，即使 id 不同，也会预览缓存的重名文件，因此将 id 拼接到文件名中，以保证唯一
    window.open(WISOFT_CONFIG.onlinePreview + '?url=' +
        encodeURIComponent(Base64.encode(URLS_COM.i_pre + sFileid + '?fullfilename=' + sFileid + '_' + (sFilename || ''))),
        '_blank');
};

//根据文件名 filenmae 获取文件类型
const fGetFileTypeByName = function(sFileName) {
    const oTypeSet = {
        image: ['BMP', 'JPG', 'JPEG', 'PNG', 'GIF'],
        doc: ['DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'PDF', 'TXT']
    };
    if (typeof sFileName === 'string') {
        sFileName = sFileName.replace(/.+\.(.+)$/, '$1').toUpperCase();
        for (var type in oTypeSet) {
            if (oTypeSet[type].indexOf(sFileName) !== -1) {
                return type;
            }
        }
    }
};

export {
    fPreviewDoc, //文件在线预览
    fGetFileTypeByName, //根据文件名 filenmae 获取文件类型
}
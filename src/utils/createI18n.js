import { createI18n } from 'vue-i18n'
// import messages from '@intlify/vite-plugin-vue-i18n/messages'

import zh from '@/locales/zh-Hans.json';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import de from '@/locales/de.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import ja from '@/locales/ja.json';
import ko from '@/locales/ko.json';
import ptPT from '@/locales/pt-Pt.json';
import ru from '@/locales/ru.json';
import th from '@/locales/th.json';
import vi from '@/locales/vi.json';
import zhHant from '@/locales/zh-Hant.json';
import bn from '@/locales/bn.json';
import ar from '@/locales/ar.json';
import fa from '@/locales/fa.json';
import km from '@/locales/km.json';
import cs from '@/locales/cs.json';
import ms from '@/locales/ms.json';
import my from '@/locales/my.json';
import tr from '@/locales/tr.json';
import ur from '@/locales/ur.json';
import uk from '@/locales/uk.json';
import id from '@/locales/id.json';
import it from '@/locales/it.json';


const resources = {
    //中文简体
    "zh-CN":zh,
    //英语
    "en": en,
    //中文繁体
    "zh-Hant": zhHant,
    //日语
    "ja":ja,
    //韩语
    "ko": ko,
    //俄语
    "ru": ru,
    //法语
    "fr": fr,
    //德语
    "de":de,
    //西班牙语
    "es": es,
    //葡萄牙语
    "pt-PT": ptPT,
    //印地语
    "hi": hi,
    //越南语
    "vi": vi,
    //孟加拉语
    "bn-BD":bn,
    //泰语
    "th": th,
    //阿拉伯
    "ar":ar,
    //波斯语 fa
    "fa":fa,
    //高棉 km
    "km":km,
    //捷克cs
    "cs":cs,
    //马来ms
    "ms":ms,
    //缅甸my
    "my":my,
    //土耳其 tr
    "tr":tr,
    //乌尔都语ur
    "ur":ur,
    //乌克兰uk
    "uk":uk,
    //印度尼西亚 id and in
    "id":id,
    "in":id,
    //意大利 it
    "it":it
  }

export default createI18n({
    // resources,
    locale: 'en',
    messages:resources
})

// en（英文）、zh-Hant（繁体）、zh-Hans（简体）、fr（法语）、ja（日语）、ko（韩语）、ru（俄语）、es（西班牙）、de（德语）、pt-PT（葡萄牙）、hi（印地语）、vi（越南）、ar（阿拉伯）、bn（孟加拉）、th（泰语） 、fil（菲利宾）,hi(印地语),id(印尼语)、it（意大利语）、mn（ 蒙古语）、uk（乌克兰语）
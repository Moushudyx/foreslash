/*!
Copyright (c) 2024 moushu
foreslash is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
          http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.foreslash = {}));
})(this, (function (exports) { 'use strict';

  function range(start, end, stepOrOptions) {
      if (!isFinite(start))
          throw new Error('start must be finite');
      if (end == null)
          return range(0, start);
      if (!isFinite(end))
          throw new Error('end must be finite');
      let step = 1;
      let getter = null;
      if (typeof stepOrOptions === 'number') {
          step = stepOrOptions;
      }
      else if (stepOrOptions) {
          const { step: _step } = stepOrOptions;
          if (_step)
              step = _step;
          if ('value' in stepOrOptions)
              getter = () => stepOrOptions.value;
          else if ('getter' in stepOrOptions)
              getter = stepOrOptions.getter;
      }
      if (!isFinite(step))
          throw new Error('step must be finite');
      if (step === 0)
          throw new Error('step must not be 0');
      if ((start > end && step > 0) || (start < end && step < 0))
          step = -step;
      const res = [];
      for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
          res.push(getter ? getter(i, res) : i);
          if (step > 0 ? i + step > end : i + step < end)
              break;
      }
      return res;
  }
  function sleep(time = 1000) {
      return new Promise((res) => {
          setTimeout(res, time);
      });
  }
  const isArray = Array.isArray;
  const object2String = Object.prototype.toString;
  function getTag(value) {
      return object2String.call(value).slice(8, -1);
  }
  function getGlobalThis() {
      if (typeof self !== 'undefined')
          return self;
      if (typeof window !== 'undefined')
          return window;
      if (typeof global !== 'undefined')
          return global;
      return Function('return this')();
  }
  const global$7 = getGlobalThis();
  const ArrayBuffer$1 = global$7.ArrayBuffer;
  function isArrayBuffer(val) {
      return !!ArrayBuffer$1 && val instanceof ArrayBuffer$1;
  }
  function isInteger(value) {
      return typeof value === 'number' && isFinite(value) && value % 1 === 0;
  }
  function isArrayLike(value) {
      return value != null && typeof value !== 'function' && isInteger(value.length) && value.length >= 0;
  }
  function isBigInt(value) {
      return typeof value === 'bigint';
  }
  function isBoolean(value) {
      return typeof value === 'boolean';
  }
  const global$6 = getGlobalThis();
  const Buffer = global$6.Buffer;
  const isBuffer = (Buffer && Buffer.isBuffer) || (() => false);
  function isObject(value) {
      return typeof value === 'object' && value !== null;
  }
  function isDataView(value) {
      return isObject(value) && getTag(value) === 'DataView';
  }
  function isDate(value) {
      return isObject(value) && getTag(value) === 'Date';
  }
  const global$5 = getGlobalThis();
  const File = global$5.File;
  function isFile(value) {
      return !!File && value instanceof File;
  }
  const global$4 = getGlobalThis();
  const FormData$1 = global$4.FormData;
  function isFormData(value) {
      return !!FormData$1 && value instanceof FormData$1;
  }
  function isFunction(value) {
      return typeof value === 'function';
  }
  function isNil(value) {
      return value === null || value === void 0;
  }
  function isNull(value) {
      return value === null;
  }
  function isUndefined(value) {
      return value === void 0;
  }
  function isIterable(value) {
      return !isNil(value) && typeof value[Symbol.iterator] === 'function';
  }
  const global$3 = getGlobalThis();
  function isMap(value) {
      return !!global$3.Map && value instanceof Map;
  }
  function isWeakMap(value) {
      return !!global$3.WeakMap && value instanceof WeakMap;
  }
  function isNumber(value) {
      return typeof value === 'number';
  }
  function isPrimitive(value) {
      return value == null || (typeof value !== 'object' && typeof value !== 'function');
  }
  function isPromise(value) {
      return isObject(value) && isFunction(value.then) && getTag(value) === 'Promise';
  }
  function isPromiseLike(value) {
      return isObject(value) && isFunction(value.then);
  }
  function isRegExp(value) {
      return isObject(value) && getTag(value) === 'RegExp';
  }
  const global$2 = getGlobalThis();
  function isSet(value) {
      return !!global$2.Set && value instanceof Set;
  }
  function isWeakSet(value) {
      return !!global$2.WeakSet && value instanceof WeakSet;
  }
  function isString(value) {
      return typeof value === 'string';
  }
  function isSymbol(value) {
      return typeof value === 'symbol';
  }
  const allTypedArrayTags = new Set([
      'Int8Array',
      'Int16Array',
      'Int32Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Uint16Array',
      'Uint32Array',
      'Float32Array',
      'Float64Array',
      'BigInt64Array',
      'BigUint64Array',
  ]);
  function isTypedArray(value) {
      return isObject(value) && allTypedArrayTags.has(getTag(value));
  }
  function isInt8Array(value) {
      return isObject(value) && getTag(value) === 'Int8Array';
  }
  function isInt16Array(value) {
      return isObject(value) && getTag(value) === 'Int16Array';
  }
  function isInt32Array(value) {
      return isObject(value) && getTag(value) === 'Int32Array';
  }
  function isUint8Array(value) {
      return isObject(value) && getTag(value) === 'Uint8Array';
  }
  function isUint8ClampedArray(value) {
      return isObject(value) && getTag(value) === 'Uint8ClampedArray';
  }
  function isUint16Array(value) {
      return isObject(value) && getTag(value) === 'Uint16Array';
  }
  function isUint32Array(value) {
      return isObject(value) && getTag(value) === 'Uint32Array';
  }
  function isFloat32Array(value) {
      return isObject(value) && getTag(value) === 'Float32Array';
  }
  function isFloat64Array(value) {
      return isObject(value) && getTag(value) === 'Float64Array';
  }
  function isBigInt64Array(value) {
      return isObject(value) && getTag(value) === 'BigInt64Array';
  }
  function isBigUint64Array(value) {
      return isObject(value) && getTag(value) === 'BigUint64Array';
  }
  const global$1 = getGlobalThis();
  function isWrapperObject(value) {
      return (!!value &&
          typeof value === 'object' &&
          (isWrapperNumber(value) ||
              isWrapperBoolean(value) ||
              isWrapperString(value) ||
              isWrapperSymbol(value) ||
              isWrapperBigInt(value)));
  }
  function isWrapperNumber(value) {
      return value instanceof Number;
  }
  function isWrapperBoolean(value) {
      return value instanceof Boolean;
  }
  function isWrapperString(value) {
      return value instanceof String;
  }
  function isWrapperSymbol(value) {
      return !!global$1.Symbol && value instanceof Symbol;
  }
  function isWrapperBigInt(value) {
      return !!global$1.BigInt && value instanceof BigInt;
  }
  function tryit(fn) {
      return function tryitConvert(...args) {
          try {
              const res = fn.apply(this, args);
              return isPromise(res)
                  ? res.then((val) => [undefined, val], (err) => [err, undefined])
                  : [undefined, res];
          }
          catch (err) {
              return [err, undefined];
          }
      };
  }
  const noop = function noop() { };
  function withResolvers(PromiseLike = Promise) {
      let promise;
      let resolve = noop;
      let reject = noop;
      promise = new PromiseLike((res, rej) => {
          resolve = res;
          reject = rej;
      });
      return { promise, resolve, reject };
  }
  const mimeMap = {
      application: {
          acrobat: ['pdf'],
          bat: ['bat'],
          cdr: ['cdr'],
          coreldraw: ['cdr'],
          csv: ['csv'],
          dbase: ['dbf'],
          dbf: ['dbf'],
          ecmascript: ['ecma', 'es'],
          emf: ['emf'],
          'epub+zip': ['epub'],
          exi: ['exi'],
          express: ['exp'],
          'font-woff': ['woff'],
          'geo+json': ['geojson', 'geojson'],
          gzip: ['gz'],
          ico: ['ico'],
          java: ['class'],
          'java-archive': ['jar', 'war', 'ear'],
          'java-byte-code': ['class'],
          'java-serialized-object': ['ser'],
          'java-vm': ['class'],
          javascript: ['js', 'mjs', 'jsm'],
          json: ['json', 'map'],
          'json-patch+json': ['json-patch'],
          json5: ['json5'],
          'jsonml+json': ['jsonml'],
          'ld+json': ['jsonld'],
          m3u: ['m3u', 'm3u8', 'vlc'],
          'manifest+json': ['webmanifest'],
          'mathml+xml': ['mathml', 'mml'],
          mbox: ['mbox'],
          mdb: ['mdb'],
          mp21: ['m21', 'mp21'],
          mp4: ['mp4s', 'm4p'],
          msaccess: ['mdb'],
          msexcel: ['xls', 'xlc', 'xll', 'xlm', 'xlw', 'xla', 'xlt', 'xld'],
          mspowerpoint: ['ppz', 'ppt', 'pps', 'pot'],
          msword: ['doc', 'dot'],
          'msword-template': ['dot'],
          nappdf: ['pdf'],
          node: ['cjs'],
          'octet-stream': [
              'bin',
              'dms',
              'lrf',
              'mar',
              'so',
              'dist',
              'distz',
              'pkg',
              'bpk',
              'dump',
              'elc',
              'deploy',
              'exe',
              'dll',
              'deb',
              'dmg',
              'iso',
              'img',
              'msi',
              'msp',
              'msm',
              'buffer',
          ],
          oda: ['oda'],
          ogg: ['ogx'],
          pdf: ['pdf'],
          photoshop: ['psd'],
          powerpoint: ['ppz', 'ppt', 'pps', 'pot'],
          ram: ['ram'],
          'raml+yaml': ['raml'],
          'rss+xml': ['rss'],
          rtf: ['rtf'],
          'schema+json': ['json'],
          sdp: ['sdp'],
          sql: ['sql'],
          tga: ['tga', 'icb', 'tpic', 'vda', 'vst'],
          toml: ['toml'],
          trig: ['trig'],
          'ttml+xml': ['ttml'],
          'vnd.adobe.flash.movie': ['swf', 'spl'],
          'vnd.android.package-archive': ['apk'],
          'vnd.apple.installer+xml': ['mpkg'],
          'vnd.apple.mpegurl': ['m3u8', 'm3u'],
          'vnd.bmi': ['bmi'],
          'vnd.coffeescript': ['coffee'],
          'vnd.dart': ['dart'],
          'vnd.dbf': ['dbf'],
          'vnd.dna': ['dna'],
          'vnd.dolby.mlp': ['mlp'],
          'vnd.efi.img': ['raw-disk-image', 'img'],
          'vnd.efi.iso': ['iso', 'iso9660'],
          'vnd.geo+json': ['geojson', 'geojson'],
          'vnd.lotus-organizer': ['org'],
          'vnd.ms-access': ['mdb'],
          'vnd.ms-asf': ['asf'],
          'vnd.ms-cab-compressed': ['cab'],
          'vnd.ms-excel': ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw', 'xll', 'xld'],
          'vnd.ms-excel.addin.macroenabled.12': ['xlam'],
          'vnd.ms-excel.sheet.binary.macroenabled.12': ['xlsb'],
          'vnd.ms-excel.sheet.macroenabled.12': ['xlsm'],
          'vnd.ms-excel.template.macroenabled.12': ['xltm'],
          'vnd.ms-fontobject': ['eot'],
          'vnd.ms-htmlhelp': ['chm'],
          'vnd.ms-ims': ['ims'],
          'vnd.ms-lrm': ['lrm'],
          'vnd.ms-officetheme': ['thmx'],
          'vnd.ms-outlook': ['msg'],
          'vnd.ms-pki.seccat': ['cat'],
          'vnd.ms-pki.stl': ['stl'],
          'vnd.ms-powerpoint': ['ppt', 'pps', 'pot', 'ppz'],
          'vnd.ms-powerpoint.addin.macroenabled.12': ['ppam'],
          'vnd.ms-powerpoint.presentation.macroenabled.12': ['pptm'],
          'vnd.ms-powerpoint.slide.macroenabled.12': ['sldm'],
          'vnd.ms-powerpoint.slideshow.macroenabled.12': ['ppsm'],
          'vnd.ms-powerpoint.template.macroenabled.12': ['potm'],
          'vnd.ms-project': ['mpp', 'mpt'],
          'vnd.ms-publisher': ['pub'],
          'vnd.ms-word': ['doc'],
          'vnd.ms-word.document.macroenabled.12': ['docm'],
          'vnd.ms-word.template.macroenabled.12': ['dotm'],
          'vnd.ms-works': ['wps', 'wks', 'wcm', 'wdb', 'xlr'],
          'vnd.ms-wpl': ['wpl'],
          'vnd.msaccess': ['mdb'],
          'vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],
          'vnd.openxmlformats-officedocument.presentationml.slide': ['sldx'],
          'vnd.openxmlformats-officedocument.presentationml.slideshow': ['ppsx'],
          'vnd.openxmlformats-officedocument.presentationml.template': ['potx'],
          'vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
          'vnd.openxmlformats-officedocument.spreadsheetml.template': ['xltx'],
          'vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
          'vnd.openxmlformats-officedocument.wordprocessingml.template': ['dotx'],
          'vnd.rar': ['rar'],
          'vnd.svd': ['svd'],
          'vnd.vcx': ['vcx'],
          'vnd.youtube.yt': ['yt'],
          wasm: ['wasm'],
          widget: ['wgt'],
          wmf: ['wmf'],
          'x-7z-compressed': ['7z', '7z001'],
          'x-ace': ['ace'],
          'x-ace-compressed': ['ace'],
          'x-aportisdoc': ['pdb', 'pdc'],
          'x-asp': ['asp'],
          'x-bat': ['bat'],
          'x-bittorrent': ['torrent'],
          'x-blender': ['blend', 'blender'],
          'x-bzip': ['bz'],
          'x-bzip-compressed-tar': ['tarbz', 'tbz', 'tbz2', 'tb2'],
          'x-bzip2': ['bz2', 'boz'],
          'x-bzip2-compressed-tar': ['tarbz2', 'tbz2', 'tb2'],
          'x-bzip3': ['bz3'],
          'x-bzip3-compressed-tar': ['tarbz3', 'tbz3'],
          'x-cd-image': ['iso', 'iso9660'],
          'x-cdlink': ['vcd'],
          'x-cdr': ['cdr'],
          'x-cfs-compressed': ['cfs'],
          'x-chat': ['chat'],
          'x-chm': ['chm'],
          'x-compress': ['z'],
          'x-compressed-tar': ['targz', 'tgz'],
          'x-dreamcast-rom': ['iso'],
          'x-dtbresource+xml': ['res'],
          'x-flash-video': ['flv'],
          'x-font-truetype': ['ttf'],
          'x-font-ttf': ['ttf'],
          'x-font-ttx': ['ttx'],
          'x-font-woff': ['woff'],
          'x-gzip': ['gz'],
          'x-httpd-php': ['php'],
          'x-javascript': ['js', 'jsm', 'mjs'],
          'x-linguist': ['ts'],
          'x-magicpoint': ['mgp'],
          'x-makeself': ['run'],
          'x-ms-dos-executable': ['exe'],
          'x-ms-pdb': ['pdb'],
          'x-ms-shortcut': ['lnk'],
          'x-ms-wim': ['wim', 'swm'],
          'x-ms-wmd': ['wmd'],
          'x-msdos-program': ['exe'],
          'x-msdownload': ['exe', 'dll', 'com', 'bat', 'msi'],
          'x-msexcel': ['xls', 'xlc', 'xll', 'xlm', 'xlw', 'xla', 'xlt', 'xld'],
          'x-msi': ['msi'],
          'x-msmetafile': ['wmf', 'wmz', 'emf', 'emz'],
          'x-mspowerpoint': ['ppz', 'ppt', 'pps', 'pot'],
          'x-mspublisher': ['pub'],
          'x-msschedule': ['scd'],
          'x-msterminal': ['trm'],
          'x-mswinurl': ['url'],
          'x-msword': ['doc'],
          'x-pak': ['pak'],
          'x-pdf': ['pdf'],
          'x-photoshop': ['psd'],
          'x-php': ['php', 'php3', 'php4', 'php5', 'phps'],
          'x-rar': ['rar'],
          'x-rar-compressed': ['rar'],
          'x-sh': ['sh'],
          'x-sql': ['sql'],
          'x-sqlite2': ['sqlite2'],
          'x-sqlite3': ['sqlite3'],
          'x-tar': ['tar', 'gtar', 'gem'],
          'x-targa': ['tga', 'icb', 'tpic', 'vda', 'vst'],
          'x-tarz': ['tarZ', 'taz'],
          'x-tga': ['tga', 'icb', 'tpic', 'vda', 'vst'],
          'x-tgif': ['obj'],
          'x-theme': ['theme'],
          'x-tiled-tsx': ['tsx'],
          'x-vdi-disk': ['vdi'],
          'x-vhd-disk': ['vhd', 'vpc'],
          'x-vhdx-disk': ['vhdx'],
          'x-virtualbox-hdd': ['hdd'],
          'x-virtualbox-ova': ['ova'],
          'x-virtualbox-ovf': ['ovf'],
          'x-virtualbox-vbox': ['vbox'],
          'x-virtualbox-vdi': ['vdi'],
          'x-virtualbox-vhd': ['vhd', 'vpc'],
          'x-virtualbox-vhdx': ['vhdx'],
          'x-virtualbox-vmdk': ['vmdk'],
          'x-vmdk-disk': ['vmdk'],
          'x-wais-source': ['src'],
          'x-wbfs': ['iso'],
          'x-web-app-manifest+json': ['webapp'],
          'x-wia': ['iso'],
          'x-windows-themepack': ['themepack'],
          'x-wmf': ['wmf'],
          'x-xar': ['xar', 'pkg'],
          'x-xz': ['xz'],
          'x-xz-compressed-tar': ['tarxz', 'txz'],
          'x-xzpdf': ['pdfxz'],
          'x-yaml': ['yaml', 'yml'],
          'x-zip': ['zip', 'zipx'],
          'x-zip-compressed': ['zip', 'zipx'],
          'x-zip-compressed-fb2': ['fb2zip'],
          'xhtml+xml': ['xhtml', 'xht', 'html', 'htm'],
          xml: ['xml', 'xsl', 'xsd', 'rng', 'xbl'],
          yaml: ['yaml', 'yml'],
          yang: ['yang'],
          'yin+xml': ['yin'],
          zip: ['zip', 'zipx'],
      },
      audio: {
          basic: ['au', 'snd'],
          flac: ['flac'],
          m3u: ['m3u', 'm3u8', 'vlc'],
          m4a: ['m4a', 'f4a'],
          midi: ['mid', 'midi', 'kar', 'rmi'],
          mp2: ['mp2'],
          mp3: ['mp3', 'mpga'],
          mp4: ['m4a', 'mp4a', 'f4a'],
          mpeg: ['mp3', 'mpga', 'mp2', 'mp2a', 'm2a', 'm3a'],
          mpegurl: ['m3u', 'm3u8', 'vlc'],
          ogg: ['ogg', 'oga', 'spx', 'opus'],
          vorbis: ['oga', 'ogg'],
          wav: ['wav'],
          wave: ['wav'],
          webm: ['weba'],
          wma: ['wma'],
          'x-ms-wmv': ['wmv'],
      },
      'flv-application': {
          'octet-stream': ['flv'],
      },
      font: {
          collection: ['ttc'],
          otf: ['otf'],
          ttf: ['ttf'],
          woff: ['woff'],
          woff2: ['woff2'],
      },
      image: {
          apng: ['apng', 'png'],
          avif: ['avif', 'avifs'],
          'avif-sequence': ['avif', 'avifs'],
          bmp: ['bmp', 'dib'],
          gif: ['gif'],
          heic: ['heic', 'heif', 'hif'],
          'heic-sequence': ['heics', 'heic', 'heif', 'hif'],
          heif: ['heif', 'heic', 'hif'],
          'heif-sequence': ['heifs', 'heic', 'heif', 'hif'],
          hej2k: ['hej2'],
          hsj2: ['hsj2'],
          ico: ['ico'],
          icon: ['ico'],
          jp2: ['jp2', 'jpg2'],
          jpeg: ['jpg', 'jpeg', 'jpe'],
          jpeg2000: ['jp2', 'jpg2'],
          'jpeg2000-image': ['jp2', 'jpg2'],
          jpx: ['jpx', 'jpf'],
          jxl: ['jxl'],
          pdf: ['pdf'],
          photoshop: ['psd'],
          pjpeg: ['jpg', 'jpeg', 'jpe'],
          png: ['png'],
          psd: ['psd'],
          svg: ['svg'],
          'svg+xml': ['svg', 'svgz'],
          'svg+xml-compressed': ['svgz', 'svggz'],
          tiff: ['tif', 'tiff'],
          'vnd.adobe.photoshop': ['psd'],
          'vnd.microsoft.icon': ['ico'],
          'vnd.mozilla.apng': ['apng', 'png'],
          webp: ['webp'],
      },
      message: {
          global: ['u8msg'],
          rfc822: ['eml', 'mime'],
          'vnd.wfa.wsc': ['wsc'],
      },
      model: {
          '3mf': ['3mf'],
          iges: ['igs', 'iges'],
          mesh: ['msh', 'mesh', 'silo'],
          mtl: ['mtl'],
          obj: ['obj'],
          stl: ['stl'],
          'vnd.collada+xml': ['dae'],
          'vnd.dwf': ['dwf'],
          'vnd.gdl': ['gdl'],
          'vnd.gtw': ['gtw'],
          'vnd.mts': ['mts'],
          'vnd.opengex': ['ogex'],
          'vnd.sap.vds': ['vds'],
          'vnd.usdz+zip': ['usdz'],
          'vnd.valve.source.compiled-map': ['bsp'],
          'vnd.vtu': ['vtu'],
          vrml: ['wrl', 'vrml', 'vrm'],
      },
      text: {
          'cache-manifest': ['appcache', 'manifest'],
          coffeescript: ['coffee', 'litcoffee'],
          css: ['css'],
          csv: ['csv'],
          directory: ['vcard', 'vcf', 'vct', 'gcrd'],
          ecmascript: ['es'],
          html: ['html', 'htm', 'shtml'],
          ico: ['ico'],
          jade: ['jade'],
          javascript: ['js', 'jsm', 'mjs'],
          jsx: ['jsx'],
          less: ['less'],
          markdown: ['md', 'markdown', 'mkd'],
          mathml: ['mml'],
          mdx: ['mdx'],
          org: ['org'],
          plain: ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini', 'asc'],
          rss: ['rss'],
          rtf: ['rtf'],
          rust: ['rs'],
          stylus: ['stylus', 'styl'],
          troff: ['t', 'tr', 'roff', 'man', 'me', 'ms'],
          'uri-list': ['uri', 'uris', 'urls'],
          vbs: ['vbs'],
          vbscript: ['vbs'],
          vcard: ['vcard', 'vcf', 'vct', 'gcrd'],
          'x-asm': ['s', 'asm'],
          'x-blueprint': ['blp'],
          'x-c': ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'],
          'x-c++hdr': ['hh', 'hp', 'hpp', 'h++', 'hxx'],
          'x-c++src': ['cpp', 'cxx', 'cc', 'C', 'c++'],
          'x-chdr': ['h'],
          'x-cmake': ['cmake'],
          'x-cobol': ['cbl', 'cob'],
          'x-common-lisp': ['asd', 'fasl', 'lisp', 'ros'],
          'x-csharp': ['cs'],
          'x-csrc': ['c'],
          'x-csv': ['csv'],
          'x-dart': ['dart'],
          'x-dbus-service': ['service'],
          'x-diff': ['diff', 'patch'],
          'x-dsl': ['dsl'],
          'x-dsrc': ['d', 'di'],
          'x-dtd': ['dtd'],
          'x-eiffel': ['e', 'eif'],
          'x-elixir': ['ex', 'exs'],
          'x-emacs-lisp': ['el'],
          'x-erlang': ['erl'],
          'x-go': ['go'],
          'x-log': ['log'],
          'x-lua': ['lua'],
          'x-python': ['py', 'pyx', 'wsgi'],
          'x-python3': ['py', 'py3', 'py3x', 'pyi'],
          'x-sass': ['sass'],
          'x-scala': ['scala', 'sc'],
          'x-scss': ['scss'],
          'x-sfv': ['sfv'],
          'x-sh': ['sh'],
          'x-sql': ['sql'],
          'x-svhdr': ['svh'],
          'x-svsrc': ['sv'],
          'x-vala': ['vala', 'vapi'],
          'x-vcalendar': ['vcs', 'ics'],
          'x-vcard': ['vcf', 'vcard', 'vct', 'gcrd'],
          'x-verilog': ['v'],
          'x-vhdl': ['vhd', 'vhdl'],
          'x-yaml': ['yaml', 'yml'],
          'x.gcode': ['gcode'],
          xml: ['xml', 'xbl', 'xsd', 'rng'],
          'xml-external-parsed-entity': ['ent'],
          yaml: ['yaml', 'yml'],
      },
      video: {
          avi: ['avi', 'avf', 'divx'],
          divx: ['avi', 'avf', 'divx'],
          dv: ['dv'],
          fli: ['fli', 'flc'],
          flv: ['flv'],
          h261: ['h261'],
          h263: ['h263'],
          h264: ['h264'],
          jpeg: ['jpgv'],
          mp2t: ['ts', 'm2t', 'm2ts', 'mts', 'cpi', 'clpi', 'mpl', 'mpls', 'bdm', 'bdmv'],
          mp4: ['mp4', 'mp4v', 'mpg4', 'm4v', 'f4v', 'lrv'],
          mpeg: ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v', 'mp2', 'vob'],
          msvideo: ['avi', 'avf', 'divx'],
          ogg: ['ogv', 'ogg'],
          quicktime: ['mov', 'qt', 'moov', 'qtvr'],
          webm: ['webm'],
          'x-matroska': ['mkv', 'mk3d', 'mks'],
          'x-ms-wmv': ['wmv'],
      },
  };
  const extMap = (() => {
      const map = {};
      Object.keys(mimeMap).forEach((type) => {
          const subMap = mimeMap[type];
          Object.keys(subMap).forEach((subType) => {
              const extList = subMap[subType];
              extList.forEach((ext) => {
                  if (!map[ext])
                      map[ext] = [];
                  map[ext].push(`${type}/${subType}`);
              });
          });
      });
      Object.keys(map).forEach((ext) => {
          map[ext].sort((a, b) => a.length - b.length);
      });
      return map;
  })();
  function _getAcceptableExtByMIME(mime) {
      var _a;
      const [t, st] = mime.split('/');
      if (!t || !st)
          return [];
      if (st === '*') {
          return Object.values(mimeMap[t] || {}).flat();
      }
      return ((_a = mimeMap[t]) === null || _a === void 0 ? void 0 : _a[st]) || [];
  }
  function _getAcceptableMIMEByExt(ext) {
      return extMap[ext] || [];
  }
  function acceptableFileName(fileName, accept) {
      const _ext = fileName.split('.').pop();
      const ext = /^[CZ]$/.test(_ext) ? _ext : _ext.toLowerCase();
      const allMimeType = _getAcceptableMIMEByExt(ext);
      const acceptList = accept.split(',').map((s) => s.trim());
      for (const item of acceptList) {
          if (item.includes('/')) {
              const i = item.toLowerCase();
              if (i === '*/*')
                  return true;
              for (const mime of allMimeType) {
                  if (i === mime)
                      return true;
                  if (i.endsWith('/*') && mime.startsWith(i.slice(0, -2)))
                      return true;
              }
          }
          else {
              const _acceptExt = item.replace(/^\./, '');
              const acceptExt = /^[CZ]$/.test(_acceptExt) ? _acceptExt : _acceptExt.toLowerCase();
              if (acceptExt === ext)
                  return true;
          }
      }
      return false;
  }
  function acceptableFileType(fileType, accept) {
      const type = fileType.toLowerCase();
      const allExtList = _getAcceptableExtByMIME(type);
      const acceptList = accept.split(',').map((s) => s.trim());
      for (const item of acceptList) {
          if (item.includes('/')) {
              const i = item.toLowerCase();
              if (i === '*/*' || i === type)
                  return true;
              if (i.endsWith('/*') && type.startsWith(i.slice(0, -2)))
                  return true;
          }
          else {
              const _ext = item.replace(/^\./, '');
              const ext = /^[CZ]$/.test(_ext) ? _ext : _ext.toLowerCase();
              if (allExtList.includes(ext))
                  return true;
          }
      }
      return false;
  }
  function getAcceptableExtByMIME(mime) {
      if (!mime || !isString(mime))
          return [];
      return _getAcceptableExtByMIME(mime.trim().toLowerCase());
  }
  function getAcceptableMIMEByExt(ext) {
      if (!ext || !isString(ext))
          return [];
      const _ext = ext.split('.').pop().trim();
      const e = /^[CZ]$/.test(_ext) ? _ext : _ext.toLowerCase();
      return _getAcceptableMIMEByExt(e);
  }
  function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomIntFloor(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
  function randomChoice(arr, weights) {
      if (!weights || !weights.length)
          return arr[randomIntFloor(0, arr.length)];
      let sum = 0;
      const cumulativeWeights = [];
      for (let i = 0; i < weights.length; i++) {
          sum += weights[i] ? weights[i] : 0;
          cumulativeWeights.push(sum);
      }
      const randomWeight = Math.random() * sum;
      const index = cumulativeWeights.findIndex(weight => weight > randomWeight);
      return arr[index];
  }
  const radix32 = '0123456789abcdefghijklmnopqrstuv';
  const base32Chars = 'abcdefghijklmnopqrstuvwxyz234567';
  const base32Crockford = '0123456789abcdefghjkmnpqrstvwxyz';
  const base32CharsMap = new Map(radix32.split('').map((c, i) => [c, base32Chars[i]]));
  const base32CrockfordMap = new Map(radix32.split('').map((c, i) => [c, base32Crockford[i]]));
  function toBase32(str, mapping) {
      return str
          .split('')
          .map((c) => mapping.get(c))
          .join('');
  }
  function numberToBase32(num, length, mapping) {
      let res = num.toString(32);
      while (res.length < length)
          res = '0' + res;
      return toBase32(res, mapping);
  }
  function randomString(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
      if (!Number.isInteger(length) || length <= 0) {
          throw new Error('Invalid length parameter');
      }
      let res = '';
      for (let i = 0; i < length; i++)
          res += randomChoice(chars);
      return res;
  }
  function randomHexString(length) {
      if (!Number.isInteger(length) || length <= 0) {
          throw new Error('Invalid length parameter');
      }
      if (length > 13) {
          const count = Math.floor(length / 13);
          let res = _randomHexString(length % 13);
          for (let i = 0; i < count; i++)
              res += _randomHexString(13);
          return res;
      }
      else {
          return _randomHexString(length);
      }
  }
  function _randomHexString(length) {
      let res = Math.floor(Math.random() * 16 ** length).toString(16);
      while (res.length < length)
          res = '0' + res;
      return res;
  }
  function randomBase32String(length, isCrockford = false) {
      if (!Number.isInteger(length) || length <= 0) {
          throw new Error('Invalid length parameter');
      }
      const map = isCrockford ? base32CrockfordMap : base32CharsMap;
      if (length > 13) {
          const count = Math.floor(length / 10);
          let res = _randomBase32String(length % 10, map);
          for (let i = 0; i < count; i++)
              res += _randomBase32String(10, map);
          return res;
      }
      else {
          return _randomBase32String(length, map);
      }
  }
  function _randomBase32String(length, mapping) {
      return numberToBase32(Math.floor(Math.random() * 32 ** length), length, mapping);
  }
  function shuffle(arr) {
      const array = Array.from(arr);
      if (array.length <= 1)
          return array;
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  let lastTime = 0;
  let lastNum1 = 0;
  let lastNum2 = 0;
  function ulid(monotonic = true, time = NaN) {
      const now = isInteger(time) ? time : Date.now();
      if (!monotonic)
          return (_encodeTime(now) + randomBase32String(16)).toUpperCase();
      if (lastTime !== now) {
          lastTime = now;
          lastNum1 = randomIntFloor(0, 32 ** 6);
          lastNum2 = randomIntFloor(0, 32 ** 10);
      }
      else {
          lastNum2++;
          if (lastNum2 >= 32 ** 10) {
              lastNum1++;
              lastNum2 = 0;
          }
          if (lastNum1 >= 32 ** 6) {
              lastNum1 = 0;
          }
      }
      return (_encodeTime(now) +
          numberToBase32(lastNum1, 6, base32CrockfordMap) +
          numberToBase32(lastNum2, 10, base32CrockfordMap)).toUpperCase();
  }
  function _encodeTime(time) {
      let str = '';
      while (str.length < 10) {
          str = base32Crockford[time % 32] + str;
          time = Math.floor(time / 32);
      }
      return str;
  }
  const uuidNil = '00000000-0000-0000-0000-000000000000';
  function uuidV4() {
      const r = randomHexString(30);
      return (`${r.slice(0, 8)}-${r.slice(8, 12)}-4${r.slice(12, 15)}-` +
          `${'89ab'[Math.floor(Math.random() * 4)]}${r.slice(15, 18)}-${r.slice(18)}`);
  }
  const getDefaultVarCase = () => ({ code: '', upperCase: false, number: false });
  const isUpperCase = RegExp.prototype.test.bind(/[A-Z]/);
  const isLowerCase = RegExp.prototype.test.bind(/[a-z]/);
  const isNumberCase = RegExp.prototype.test.bind(/[0-9]/);
  const isSymbolCase = RegExp.prototype.test.bind(/[^a-z0-9A-Z]/);
  function _splitVar(c) {
      const res = [];
      let temp = getDefaultVarCase();
      let i;
      for (i = 0; i < c.length; i++) {
          const char = c[i];
          if (isSymbolCase(char)) {
              if (temp.code) {
                  res.push(temp);
                  temp = getDefaultVarCase();
              }
          }
          else if (isNumberCase(char)) {
              if (!temp.code)
                  temp.number = true;
              if (temp.number) {
                  temp.code += char;
              }
              else {
                  res.push(temp);
                  temp = { code: char, number: true, upperCase: false };
              }
          }
          else if (isLowerCase(char)) {
              if (!temp.code) {
                  temp.code += char;
              }
              else if (temp.upperCase) {
                  if (temp.code.length === 1) {
                      temp.upperCase = false;
                      temp.code += char;
                  }
                  else {
                      const lastUpperCase = temp.code[temp.code.length - 1];
                      temp.code = temp.code.slice(0, -1);
                      res.push(temp);
                      temp = { code: lastUpperCase + char, upperCase: false, number: false };
                  }
              }
              else if (temp.number) {
                  res.push(temp);
                  temp = { code: char, upperCase: false, number: false };
              }
              else {
                  temp.code += char;
              }
          }
          else if (isUpperCase(char)) {
              if (!temp.code)
                  temp.upperCase = true;
              if (temp.upperCase) {
                  temp.code += char;
              }
              else {
                  res.push(temp);
                  temp = { code: char, upperCase: true, number: false };
              }
          }
      }
      res.push(temp);
      return res;
  }
  function _caseConvert(tokens, joiner, handler) {
      return tokens
          .map(handler)
          .filter((s) => s.length)
          .join(joiner);
  }
  function camelCase(str, options) {
      const { keepLetterCase = false, keepNumber = true } = options || {};
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '', keepLetterCase
          ? ({ code }, index) => {
              if (index)
                  return code.slice(0, 1).toUpperCase() + code.slice(1);
              else
                  return code;
          }
          : ({ code }, index) => {
              if (index)
                  return code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase();
              else
                  return code.toLowerCase();
          });
  }
  function kebabCase(str, options) {
      const { keepLetterCase = false, keepNumber = true } = options || {};
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '-', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase());
  }
  function pascalCase(str, options) {
      const { keepLetterCase = false, keepNumber = true } = options || {};
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '', keepLetterCase
          ? ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1)
          : ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase());
  }
  function snakeCase(str, options) {
      const { keepLetterCase = false, keepNumber = true } = options || {};
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '_', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase());
  }
  function titleCase(str, options) {
      const { keepLetterCase = false, keepNumber = true } = options || {};
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, ' ', keepLetterCase
          ? ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1)
          : ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase());
  }
  function caseConvert(str, joiner = '', handler) {
      const hc = handler ? handler : (token) => token.code;
      return _caseConvert(_splitVar(str), joiner, hc);
  }
  function caseCamel(str, keepLetterCase = false, keepNumber = true) {
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '', keepLetterCase
          ? ({ code }, index) => {
              if (index)
                  return code.slice(0, 1).toUpperCase() + code.slice(1);
              else
                  return code;
          }
          : ({ code }, index) => {
              if (index)
                  return code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase();
              else
                  return code.toLowerCase();
          });
  }
  function casePascal(str, keepLetterCase = false, keepNumber = true) {
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '', keepLetterCase
          ? ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1)
          : ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase());
  }
  function caseKebab(str, keepLetterCase = false, keepNumber = true) {
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '-', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase());
  }
  function caseSnake(str, keepLetterCase = false, keepNumber = true) {
      let tokens = _splitVar(str);
      if (!keepNumber)
          tokens = tokens.filter(({ number }) => !number);
      return _caseConvert(tokens, '_', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase());
  }
  function splitWords(str) {
      return _splitVar(str).map(({ code }) => code);
  }
  function compose(...composeFunc) {
      if (composeFunc.length === 0) {
          throw new Error('Invalid composeFunc parameter: composeFunc is empty');
      }
      for (let i = 0; i < composeFunc.length; i++) {
          if (typeof composeFunc[i] !== 'function') {
              throw new Error(`Invalid composeFunc parameter: composeFunc[${i}] is not a function`);
          }
      }
      const _fnList = composeFunc.slice().reverse();
      return (...args) => {
          let result = _fnList[0](...args);
          for (let i = 1; i < _fnList.length; i++) {
              result = _fnList[i](result);
          }
          return result;
      };
  }
  const _ = Object.freeze({ '@@functional/placeholder': true });
  function isPlaceholder(arg) {
      return typeof arg === 'object' && Boolean(arg) && arg['@@functional/placeholder'] === true;
  }
  const _curry1 = function _curry1(fn) {
      return function curried1(arg1) {
          if (arguments.length < 1 || isPlaceholder(arg1)) {
              return curried1;
          }
          else {
              return fn.apply(this, arguments);
          }
      };
  };
  const _curry2 = function _curry2(fn) {
      return function curried2(arg1, arg2) {
          const p1 = arguments.length < 1 || isPlaceholder(arg1);
          const p2 = arguments.length < 2 || isPlaceholder(arg2);
          if (p1 && p2) {
              return curried2;
          }
          else if (!p1 && p2) {
              return _curry1(function (_arg2) {
                  return fn.apply(this, [arg1, _arg2]);
              });
          }
          else if (p1 && !p2) {
              return _curry1(function (_arg1) {
                  return fn.apply(this, [_arg1, arg2]);
              });
          }
          else {
              return fn.apply(this, arguments);
          }
      };
  };
  const _curry3 = function _curry3(fn) {
      return function curried3(arg1, arg2, arg3) {
          const p1 = arguments.length < 1 || isPlaceholder(arg1);
          const p2 = arguments.length < 2 || isPlaceholder(arg2);
          const p3 = arguments.length < 3 || isPlaceholder(arg3);
          if (p1) {
              if (p2 && p3) {
                  return curried3;
              }
              else if (p2 && !p3) {
                  return _curry2(function (_arg1, _arg2) {
                      return fn.apply(this, [_arg1, _arg2, arg3]);
                  });
              }
              else if (!p2 && p3) {
                  return _curry2(function (_arg1, _arg3) {
                      return fn.apply(this, [_arg1, arg2, _arg3]);
                  });
              }
              else {
                  return _curry1(function (_arg1) {
                      return fn.apply(this, [_arg1, arg2, arg3]);
                  });
              }
          }
          else {
              if (p2 && p3) {
                  return _curry2(function (_arg2, _arg3) {
                      return fn.apply(this, [arg1, _arg2, _arg3]);
                  });
              }
              else if (p2 && !p3) {
                  return _curry1(function (_arg2) {
                      return fn.apply(this, [arg1, _arg2, arg3]);
                  });
              }
              else if (!p2 && p3) {
                  return _curry1(function (_arg3) {
                      return fn.apply(this, [arg1, arg2, _arg3]);
                  });
              }
              else {
                  return fn.apply(this, arguments);
              }
          }
      };
  };
  const _curryAny = function _curryAny(fn, args) {
      return function curriedAny(...currentArguments) {
          const currArgs = _mergeArguments(args, currentArguments);
          if (_countArguments(currArgs) >= fn.length) {
              return fn.apply(this, currArgs);
          }
          else
              return _curryAny.apply(this, [fn, currArgs]);
      };
  };
  function _mergeArguments(args, currentArguments) {
      let p1 = 0;
      const res = args.concat([]);
      for (let i = 0; i < currentArguments.length; i++) {
          while (!isPlaceholder(res[p1]) && p1 < res.length)
              p1++;
          res[p1] = currentArguments[i];
          p1++;
      }
      return res;
  }
  function _countArguments(args) {
      for (let i = 0; i < args.length; i++) {
          if (isPlaceholder(args[i]))
              return i;
      }
      return args.length;
  }
  function _curryMore(fn) {
      if (typeof fn !== 'function') {
          throw new Error('Invalid fn parameter: fn is not a function.');
      }
      const fnStr = fn.toString();
      const rightBracket = fnStr.indexOf(')');
      if (rightBracket < 3 || /=|\.{3}/.test(fnStr.substring(0, rightBracket))) {
          return _curryAny(fn, []);
      }
      switch (fn.length) {
          case 0:
              return fn;
          case 1:
              return _curry1(fn);
          case 2:
              return _curry2(fn);
          case 3:
              return _curry3(fn);
          default:
              return _curryAny(fn, []);
      }
  }
  function _cloneArray(obj, map, cloner, ...args) {
      const res = obj.slice();
      map.set(obj, res);
      for (let index = 0; index < obj.length; index++) {
          res[index] = cloner(obj[index], map, ...args);
      }
      return res;
  }
  function _cloneMap(obj, map, cloner, ...args) {
      const res = new Map();
      map.set(obj, res);
      obj.forEach((value, key) => {
          res.set(cloner(key, map, ...args), cloner(value, map, ...args));
      });
      return res;
  }
  function _cloneSet(obj, map, cloner, ...args) {
      const res = new Set();
      map.set(obj, res);
      obj.forEach((item) => res.add(cloner(item, map, ...args)));
      return res;
  }
  function _cloneFormData(obj, map, cloner, ...args) {
      const res = new FormData();
      map.set(obj, res);
      obj.forEach((value, key) => {
          res.append(key, cloner(value, map, ...args));
      });
      return res;
  }
  function _cloneArrayBuffer(obj, map) {
      const res = new ArrayBuffer(obj.byteLength);
      map.set(obj, res);
      new Uint8Array(res).set(new Uint8Array(obj));
      return res;
  }
  function _deepClone(obj, map, options) {
      if (map.has(obj))
          return map.get(obj);
      if (options.customCloner.length) {
          for (let i = 0; i < options.customCloner.length; i++) {
              const { cloner, judger } = options.customCloner[i];
              if (judger(obj)) {
                  const res = cloner(obj, map);
                  map.set(obj, res);
                  return res;
              }
          }
      }
      if (!isObject(obj) || isFunction(obj) || isWeakMap(obj) || isWeakSet(obj) || isPromise(obj))
          return obj;
      if (isArray(obj))
          return _cloneArray(obj, map, _deepClone, options);
      if (isMap(obj))
          return _cloneMap(obj, map, _deepClone, options);
      if (isSet(obj))
          return _cloneSet(obj, map, _deepClone, options);
      if (isFormData(obj))
          return _cloneFormData(obj, map, _deepClone, options);
      let res;
      if (obj instanceof Date) {
          res = new Date(obj.valueOf());
          map.set(obj, res);
      }
      else if (obj instanceof RegExp) {
          res = new RegExp(obj.source, obj.flags);
          map.set(obj, res);
      }
      else if (obj instanceof ArrayBuffer) {
          res = _cloneArrayBuffer(obj, map);
      }
      else if (isTypedArray(obj)) {
          res = new obj.constructor(_cloneArrayBuffer(obj.buffer, map), obj.byteOffset, obj.length);
          map.set(obj, res);
      }
      else if (obj instanceof DataView) {
          res = new DataView(map.has(obj.buffer) ? map.get(obj.buffer) : _cloneArrayBuffer(obj.buffer, map), obj.byteOffset, obj.byteLength);
          map.set(obj, res);
      }
      else if (isWrapperObject(obj)) {
          res = Object(obj.valueOf());
          map.set(obj, res);
      }
      else {
          res = options.clonePrototype ? Object.create(Object.getPrototypeOf(obj)) : {};
          map.set(obj, res);
          Reflect.ownKeys(obj).forEach((key) => {
              if (!options.cloneSymbol && typeof key === 'symbol')
                  return;
              if (options.cloneDescriptor) {
                  const val = Object.getOwnPropertyDescriptor(obj, key);
                  if (!val)
                      return;
                  if (val.value)
                      val.value = _deepClone(val.value, map, options);
                  Object.defineProperty(res, key, val);
              }
              else {
                  Reflect.set(res, key, _deepClone(Reflect.get(obj, key), map, options));
              }
          });
      }
      return res;
  }
  function deepClone(obj, options, map) {
      if (!isMap(map))
          map = new Map();
      const res = _deepClone(obj, map, Object.assign({ cloneSymbol: true, clonePrototype: false, cloneDescriptor: false, customCloner: [] }, options));
      map.clear();
      return res;
  }
  function _fastClone(obj, map) {
      if (map.has(obj))
          return map.get(obj);
      if (!isObject(obj) || isFunction(obj) || isWeakMap(obj) || isWeakSet(obj) || isPromise(obj))
          return obj;
      if (isArray(obj))
          return _cloneArray(obj, map, _fastClone);
      if (isMap(obj))
          return _cloneMap(obj, map, _fastClone);
      if (isSet(obj))
          return _cloneSet(obj, map, _fastClone);
      if (isFormData(obj))
          return _cloneFormData(obj, map, _fastClone);
      let res;
      if (obj instanceof Date) {
          res = new Date(obj.valueOf());
          map.set(obj, res);
      }
      else if (obj instanceof RegExp) {
          res = new RegExp(obj.source, obj.flags);
          map.set(obj, res);
      }
      else {
          res = {};
          map.set(obj, res);
          Object.keys(obj).forEach((key) => {
              res[key] = _fastClone(obj[key], map);
          });
      }
      return res;
  }
  function fastClone(obj, map) {
      if (!isMap(map))
          map = new Map();
      const res = _fastClone(obj, map);
      map.clear();
      return res;
  }
  function isEmpty(value) {
      if (value === null || value === undefined)
          return true;
      if (typeof value !== 'object') {
          if (value === '' || value === 0)
              return true;
          if (typeof value === 'function')
              return false;
          return false;
      }
      else {
          if (isArrayLike(value))
              return !value.length;
          if (isBuffer(value) || isArrayBuffer(value))
              return !value.byteLength;
          if (isDate(value))
              return isNaN(value.getTime());
          if (isSet(value) || isMap(value))
              return !value.size;
          for (const key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key))
                  return false;
          }
          return true;
      }
  }
  function _getKey(args) {
      function toString(item) {
          if (isBigInt(item))
              return String(item) + 'n';
          if (isRegExp(item))
              return 'RegExp' + String(item);
          if (isDate(item))
              return 'Date' + item.toISOString();
          try {
              return JSON.stringify(item);
          }
          catch (e) {
              return String(item);
          }
      }
      let res = 'ForeSlashMemoKey:[';
      for (let i = 0; i < args.length; i++) {
          res += toString(args[i]) + ',';
      }
      return res + ']';
  }
  function memo(fn, options) {
      const map = new Map();
      const getKey = (options === null || options === void 0 ? void 0 : options.getKey) ? options.getKey : _getKey;
      const setTtl = (options === null || options === void 0 ? void 0 : options.ttl) ? options.ttl : 0;
      const setCount = (options === null || options === void 0 ? void 0 : options.count) ? options.count : 0;
      return function (...args) {
          const key = getKey(args);
          if (map.has(key)) {
              const item = map.get(key);
              const { res, ttl, count } = item;
              const isValidCache = ttl >= Date.now() && count > 0;
              item.count -= 1;
              if (item.count <= 0)
                  map.delete(key);
              if (ttl < Date.now())
                  map.delete(key);
              if (isValidCache)
                  return res;
          }
          const res = fn.apply(this, args);
          const memoItem = { res, ttl: Infinity, count: Infinity };
          if (setCount > 0)
              memoItem.count = setCount;
          if (setTtl > 0)
              memoItem.ttl = Date.now() + setTtl;
          map.set(key, memoItem);
          return res;
      };
  }
  function not(value) {
      return !Boolean(value);
  }
  function pass(value) {
      return value;
  }
  function passWith(fn) {
      return ((arg) => {
          fn(arg);
          return arg;
      });
  }
  function pipe(...pipeFunc) {
      if (pipeFunc.length === 0) {
          throw new Error('Invalid pipeFunc parameter: pipeFunc is empty');
      }
      for (let i = 0; i < pipeFunc.length; i++) {
          if (typeof pipeFunc[i] !== 'function') {
              throw new Error(`Invalid pipeFunc parameter: pipeFunc[${i}] is not a function`);
          }
      }
      return (...args) => {
          let result = pipeFunc[0](...args);
          for (let i = 1; i < pipeFunc.length; i++) {
              result = pipeFunc[i](result);
          }
          return result;
      };
  }
  exports._ = _;
  exports.acceptableFileName = acceptableFileName;
  exports.acceptableFileType = acceptableFileType;
  exports.camelCase = camelCase;
  exports.caseCamel = caseCamel;
  exports.caseConvert = caseConvert;
  exports.caseKebab = caseKebab;
  exports.casePascal = casePascal;
  exports.caseSnake = caseSnake;
  exports.compose = compose;
  exports.curry = _curryMore;
  exports.deepClone = deepClone;
  exports.fastClone = fastClone;
  exports.getAcceptableExtByMIME = getAcceptableExtByMIME;
  exports.getAcceptableMIMEByExt = getAcceptableMIMEByExt;
  exports.getGlobalThis = getGlobalThis;
  exports.getTag = getTag;
  exports.isArray = isArray;
  exports.isArrayBuffer = isArrayBuffer;
  exports.isArrayLike = isArrayLike;
  exports.isBigInt = isBigInt;
  exports.isBigInt64Array = isBigInt64Array;
  exports.isBigUint64Array = isBigUint64Array;
  exports.isBoolean = isBoolean;
  exports.isBuffer = isBuffer;
  exports.isDataView = isDataView;
  exports.isDate = isDate;
  exports.isEmpty = isEmpty;
  exports.isFile = isFile;
  exports.isFloat32Array = isFloat32Array;
  exports.isFloat64Array = isFloat64Array;
  exports.isFormData = isFormData;
  exports.isFunction = isFunction;
  exports.isInt16Array = isInt16Array;
  exports.isInt32Array = isInt32Array;
  exports.isInt8Array = isInt8Array;
  exports.isInteger = isInteger;
  exports.isIterable = isIterable;
  exports.isMap = isMap;
  exports.isNil = isNil;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isPlaceholder = isPlaceholder;
  exports.isPrimitive = isPrimitive;
  exports.isPromise = isPromise;
  exports.isPromiseLike = isPromiseLike;
  exports.isRegExp = isRegExp;
  exports.isSet = isSet;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.isTypedArray = isTypedArray;
  exports.isUint16Array = isUint16Array;
  exports.isUint32Array = isUint32Array;
  exports.isUint8Array = isUint8Array;
  exports.isUint8ClampedArray = isUint8ClampedArray;
  exports.isUndefined = isUndefined;
  exports.isWeakMap = isWeakMap;
  exports.isWeakSet = isWeakSet;
  exports.isWrapperBigInt = isWrapperBigInt;
  exports.isWrapperBoolean = isWrapperBoolean;
  exports.isWrapperNumber = isWrapperNumber;
  exports.isWrapperObject = isWrapperObject;
  exports.isWrapperString = isWrapperString;
  exports.isWrapperSymbol = isWrapperSymbol;
  exports.kebabCase = kebabCase;
  exports.memo = memo;
  exports.noop = noop;
  exports.not = not;
  exports.pascalCase = pascalCase;
  exports.pass = pass;
  exports.passWith = passWith;
  exports.pipe = pipe;
  exports.randomBase32String = randomBase32String;
  exports.randomChoice = randomChoice;
  exports.randomHexString = randomHexString;
  exports.randomInt = randomInt;
  exports.randomIntFloor = randomIntFloor;
  exports.randomString = randomString;
  exports.range = range;
  exports.shuffle = shuffle;
  exports.sleep = sleep;
  exports.snakeCase = snakeCase;
  exports.splitWords = splitWords;
  exports.titleCase = titleCase;
  exports.tryit = tryit;
  exports.ulid = ulid;
  exports.uuidNil = uuidNil;
  exports.uuidV4 = uuidV4;
  exports.withResolvers = withResolvers;

}));

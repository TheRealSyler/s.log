// TODO Re implement the converter.

// import { Converter, ConverterContext, LogStyle, ConverterTypeStyles } from './interfaces';
// import { styler } from './styler';
// import { createBrowserStyle } from './handleStyle';

// const defaultTypeStyles: ConverterTypeStyles = {
//   bracket: '#fa4',
//   key: '#0c1',
//   number: '#0AA',
//   string: '#f64',
//   name: '#fff',
//   null: '#06f',
//   undefined: '#06f',
//   emptyArray: '#06f'
// };

// export const converter: Converter = (message, ctx) => {
//   if (!ctx) ctx = {};

//   if (message === null) {
//     return { message: convertNullOrUndefined('null', ctx), styled: true };
//   }
//   switch (typeof message) {
//     case 'undefined':
//       return { message: convertNullOrUndefined('undefined', ctx), styled: true };
//     case 'string':
//       return { message: convertString(message, ctx), styled: !!ctx.styled };
//     case 'number':
//       return { message: convertNumber(message, ctx), styled: !!ctx.styled };
//     case 'object':
//       return { message: convertObject(message, ctx), styled: true };
//   }

//   return { message: '::NOT IMPLEMENTED::', styled: false };
// };

// function convertNullOrUndefined(type: 'null' | 'undefined', ctx: ConverterContext) {
//   removeCurrentBrowserStyle(ctx);
//   const typeStyles = ctx.typeStyles || defaultTypeStyles;
//   addBrowserStyle(ctx, typeStyles[type]);
//   return styler(type, typeStyles[type]);
// }

// function convertString(message: string, ctx: ConverterContext) {
//   const typeStyles = ctx.typeStyles || defaultTypeStyles;
//   if (ctx.isObject) {
//     addBrowserStyle(ctx, typeStyles.string);
//     return styler(message, typeStyles.string);
//   }
//   return message;
// }

// function convertNumber(message: number, ctx: ConverterContext) {
//   removeCurrentBrowserStyle(ctx);
//   const typeStyles = ctx.typeStyles || defaultTypeStyles;
//   addBrowserStyle(ctx, typeStyles.number);
//   return styler(`${message}`, typeStyles.number);
// }

// function addObjectKey(key: string, ctx: ConverterContext) {
//   const typeStyles = ctx.typeStyles || defaultTypeStyles;
//   addBrowserStyle(ctx, typeStyles.key);
//   return styler(`${key}: `, typeStyles.key);
// }

// function convertObject(object: object, ctx: ConverterContext): string {
//   const typeStyles = ctx.typeStyles || defaultTypeStyles;
//   let brackets = ['{', '}'];
//   if (Array.isArray(object)) {
//     brackets = ['[', ']'];
//     if (object.length === 0) {
//       return `\n${styler('Array', typeStyles.name)} ${styler('[EMPTY]', typeStyles.emptyArray)}`;
//     }
//   }
//   const name = object.constructor.name;
//   ctx.indentation = ctx.indentation ? ctx.indentation + 2 : 2;
//   ctx.isObject = true;

//   removeCurrentBrowserStyle(ctx);
//   addBrowserStyle(ctx, typeStyles.name);
//   let output = styler(`\n${name} `, typeStyles.name);
//   addBrowserStyle(ctx, typeStyles.bracket);
//   output += styler(`${brackets[0]}\n`, typeStyles.bracket);

//   for (const key in object) {
//     if (object.hasOwnProperty(key)) {
//       const item = object[key];
//       output += addIndentation(
//         `${addObjectKey(key, ctx)}${converter(item, ctx).message}`,
//         ctx.indentation
//       );
//     }
//   }

//   output = output.replace(/\n?$/, '');
//   ctx.indentation -= 2;
//   output += styler(addIndentation(brackets[1], ctx.indentation), typeStyles.bracket);
//   addBrowserStyle(ctx, typeStyles.bracket);
//   return output;
// }

// function addIndentation(text: string, indentation: number) {
//   return text.replace(/^/, ' '.repeat(indentation));
// }

// function addBrowserStyle(ctx: ConverterContext, style: LogStyle, offset?: boolean) {
//   if (ctx.browserContext) {
//     const i = ctx.browserContext.index;
//     const o = ctx.browserContext.offset;
//     ctx.browserContext.styles.splice(i + o, 0, createBrowserStyle(style));
//     if (offset) {
//       ctx.browserContext.offset++;
//     }
//   }
// }
// function removeCurrentBrowserStyle(ctx: ConverterContext) {
//   if (ctx.browserContext) {
//     const i = ctx.browserContext.index;
//     const o = ctx.browserContext.offset;
//     ctx.browserContext.styles.splice(i + o, 1);
//   }
// }

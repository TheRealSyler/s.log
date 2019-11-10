import { convertedMessage, PresetHandler, CustomHandlerData } from './interfaces';
import { converter } from './converter';
import { styler } from './styler';

export class PresetBase {
  constructor(private func: PresetHandler<any>) {}
  Use(data: CustomHandlerData) {
    return this.func(this, data);
  }
}
export class PresetNodeHelp extends PresetBase {
  constructor(
    public text?: string,
    public splitter = ';',
    public firstColumnWidth: number = 20,
    public secondColumnWidth: number = 120
  ) {
    super(nodeHelpMessage);
  }
}

const nodeHelpMessage: PresetHandler<PresetNodeHelp> = (preset, data) => {
  if (preset.text) {
    const lines = preset.text.split(/\n/g);
    preset.text = undefined;
    let output = '';
    output += nodeHelpMessage(preset, {
      rawMessages: ['\n ', ' '],
      styles: data.styles,
      wrappers: []
    });
    for (const line of lines) {
      output += nodeHelpMessage(preset, {
        rawMessages: '\n'.concat(line).split(preset.splitter),
        styles: data.styles,
        wrappers: []
      });
    }
    output += nodeHelpMessage(preset, {
      rawMessages: ['\n ', ''],
      styles: data.styles,
      wrappers: []
    });
    return output.replace(/^\n/, '');
  } else {
    const messages: convertedMessage[] = [];
    for (let i = 0; i < data.rawMessages.length; i++) {
      messages.push(converter(data.rawMessages[i]));
    }

    const lastIndex = messages.length - 1;
    if (messages.length > 1) {
      const space = preset.firstColumnWidth - messages[0].message.length;
      if (space >= 0) {
        messages[0].message = messages[0].message.replace(/^(\n)?/, '$1 ').concat(' '.repeat(space));
      }

      let concatenatedMessages: string = '';
      for (let i = 1; i < messages.length; i++) {
        concatenatedMessages += messages[i].message;
      }
      const endingSpace = preset.secondColumnWidth - (concatenatedMessages.length + (messages.length - 1) * 2);
      if (endingSpace >= 0) {
        messages[lastIndex].message = messages[lastIndex].message.concat(' '.repeat(endingSpace));
      }
    }
    let output = '';
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      message.message = message.message.replace(/^(\n)?/, '$1 ');
      output += styler(message, data.styles[i], ['', ' ']);
    }

    return output;
  }
};
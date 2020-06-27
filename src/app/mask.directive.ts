import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appMask]',
})
export class MaskDirective implements OnInit {
  @Input('appMask') appMask: string;
  @Input('seperator') seperator: string = '';
  private inputElem: HTMLInputElement;
  private _lastMaskedValue = '';
  _formatToRegExp = {
    '0': /[0-9]/,
    'a': /[a-z]/,
    'A': /[A-Z]/,
    'B': /[a-zA-Z]/,
    'M': /[01]/,
    'm': /[0-9]/,
    'D': /[0-3]/,
    'd': /[0-9]/,
    'Y': /[0-9]/
  };

  _allFormatsStr = '(' +
    Object.keys(this._formatToRegExp)
      .map(key => this._formatToRegExp[key].toString())
      .map(regexStr => regexStr.substr(1, regexStr.length - 2))
      .join('|')
    + ')';

  _allFormatsGlobal = this.getAllFormatRegexp('g');
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.inputElem = this.el.nativeElement;
  }

  @HostListener('input')
  onInput() {
    this.inputElem.value = this._maskValue(this.inputElem.value);
  }

  private _maskValue(val: string): string {
    if (!val || !this.appMask || val === this._lastMaskedValue) {
      return val;
    }

    if (this.appMask.indexOf("M") || this.appMask.indexOf("D")) {
      let valueArray = val.split(this.seperator);
      let maskArray = this.appMask.split(this.seperator);
      let matDateArr = [];
      for (let counter = 0; counter < valueArray.length; counter++) {
        let lastindex = valueArray[counter].length - 1;
        if (maskArray[counter] === "Mm") {
          if (parseInt(valueArray[counter]) <= 12) {
            matDateArr.push(valueArray[counter]);
          } else {
            matDateArr.push(valueArray[counter].substr(0, lastindex));
            return matDateArr.join(this.seperator);
          }
        }
        if (maskArray[counter] === "Dd") {
          if (parseInt(valueArray[counter]) <= 31) {
            matDateArr.push(valueArray[counter]);
          } else {
            matDateArr.push(valueArray[counter].substr(0, lastindex));
            return matDateArr.join(this.seperator);
          }
        }
      }
    }

    let maskedVal = this._lastMaskedValue =
      this.valueToFormat(
        val,
        this.appMask,
        this._lastMaskedValue.length > val.length,
        this._lastMaskedValue);

    return maskedVal;
  }
  valueToFormat(value: string, format: string, goingBack = false, prevValue?: string): string {
    let maskedValue = '';
    const unmaskedValue = this.unmaskValue(value);
    const isLastCharFormatter = !this.getAllFormatRegexp().test(value[value.length - 1]);
    const isPrevLastCharFormatter = prevValue && !this.getAllFormatRegexp().test(prevValue[prevValue.length - 1]);
    let formatOffset = 0;
    for (let i = 0, maxI = Math.min(unmaskedValue.length, format.length); i < maxI; ++i) {
      const valueChar = unmaskedValue[i];
      let formatChar = format[formatOffset + i];
      let formatRegex = this.getFormatRegexp(formatChar);

      if (formatChar && !formatRegex) {
        maskedValue += formatChar;
        formatChar = format[++formatOffset + i];
        formatRegex = this.getFormatRegexp(formatChar);
      }

      if (valueChar && formatRegex) {
        if (formatRegex && formatRegex.test(valueChar)) {
          maskedValue += valueChar;
        } else {
          break;
        }
      }
      const nextFormatChar = format[formatOffset + i + 1];
      const nextFormatRegex = this.getFormatRegexp(nextFormatChar);
      const isLastIteration = i === maxI - 1;

      if (isLastIteration && nextFormatChar && !nextFormatRegex) {
        if (!isLastCharFormatter && goingBack) {
          if (prevValue && !isPrevLastCharFormatter) {
            continue;
          }
          maskedValue = maskedValue.substr(0, formatOffset + i);
        } else {
          maskedValue += nextFormatChar;
        }
      }
    }
    return maskedValue;
  }
  unmaskValue(value: string): string {
    const unmaskedMathes = value.replace(' ', '').match(this._allFormatsGlobal);
    return unmaskedMathes ? unmaskedMathes.join('') : '';
  }
  getAllFormatRegexp(flags?: string) {
    return new RegExp(this._allFormatsStr, flags);
  }
  getFormatRegexp(formatChar: string): RegExp | null {
    return formatChar && this._formatToRegExp[formatChar] ? this._formatToRegExp[formatChar] : null;
  }
}




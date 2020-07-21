import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputMask]'
})
export class InputMaskDirective {
  @Input('inputMask') inputMask: string;
  formatToRegExp = {
    '0': /[0-9]/,
    'a': /[a-z]/,
    'A': /[A-Z]/,
    'B': /[a-zA-Z]/
  };
  curPosition:number = 0;
  allFormatsStr = '(' +
    Object.keys(this.formatToRegExp)
      .map(key => this.formatToRegExp[key].toString())
      .map(regexStr => regexStr.substr(1, regexStr.length - 2))
      .join('|')
    + ')';
  allFormatsGlobal = this.getAllFormatRegexp('g');
  private inputElem: HTMLInputElement;
  private lastMaskedValue = '';
  backSpaceState:boolean = false;
  constructor(
    private el: ElementRef,
  ) { }
  ngOnInit() {
    this.inputElem = this.el.nativeElement;
  }
  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.backSpaceState = true;
  }
  @HostListener('input')
  onInput() {
    this.curPosition = this.el.nativeElement.selectionEnd;
    this.inputElem.value = this.maskValue(this.inputElem.value);
    if(this.curPosition === 4 || this.backSpaceState){
      this.curPosition = this.curPosition + 1;
    }
    this.el.nativeElement.selectionStart = this.curPosition;
    this.el.nativeElement.selectionEnd = this.curPosition;
  }
  private maskValue(val: string): string {
    if (!val || !this.inputMask || val === this.lastMaskedValue) {
      return val;
    }
    const maskedVal = this.lastMaskedValue =
      this.valueToFormat(
        val,
        this.inputMask,
        this.lastMaskedValue.length > val.length,
        this.lastMaskedValue);        
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
    const unmaskedMathes = value.replace(' ', '').match(this.allFormatsGlobal);
    return unmaskedMathes ? unmaskedMathes.join('') : '';
  }
  getAllFormatRegexp(flags?: string) {
    return new RegExp(this.allFormatsStr, flags);
  }
  getFormatRegexp(formatChar: string): RegExp | null {
    return formatChar && this.formatToRegExp[formatChar] ? this.formatToRegExp[formatChar] : null;
  }
}


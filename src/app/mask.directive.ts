import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import { isNullOrUndefined } from 'util';


@Directive({
  selector: '[appMask]',
})
export class MaskDirective implements OnInit {
  @Input('appMask') appMask: string;
  @Input('seperator') seperator: string = '';
  private inputElem: HTMLInputElement;
  private _lastMaskedValue = '';
  private curPosition = 0;
  private backSpaceState = false;
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
  @HostListener('change')
  change() {
    this.initControl();
  }
  
  @HostListener('input')
  onInput() {   
    this.initControl();
  }
  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.backSpaceState = true;    
  }

  initControl(){
    this.curPosition = this.el.nativeElement.selectionEnd;
    this.inputElem.value = this._maskValue(this.inputElem.value);
    if(this.backSpaceState){
      this.backSpaceState = false;
    }
    this.el.nativeElement.selectionStart = this.curPosition;
    this.el.nativeElement.selectionEnd = this.curPosition;
  }

  private _maskValue(val: string): string {
    if (!val || !this.appMask || val === this._lastMaskedValue) {
      return val;
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
    maskedValue = this.addMaskSlashes(maskedValue);
    return maskedValue;
  }
  addMaskSlashes(maskedValue) {
    if(maskedValue === ""){
      return "";
    }
    maskedValue = maskedValue.replace(/_/,'');
    if (this.appMask.indexOf("M") || this.appMask.indexOf("D")) {
      let maskedarr = maskedValue.split('');
      let addmasks = "";
      let posstatus = false;
      for (let i = 0; i < 10; i++) {
        if (!isNullOrUndefined(maskedarr[i])) {
          if (maskedarr[i] !== this.seperator) {
            addmasks += maskedarr[i];
          } else {
            posstatus = true;
            addmasks += this.seperator;
          }
        } else if (i != 2 && i != 5) {
          addmasks += '_';
        } else {
          addmasks += this.seperator;
        }
      }
      if (posstatus === true) {
        if(!this.backSpaceState){
          this.curPosition = this.curPosition + 1;
        }              
        posstatus = false;
      }
      return addmasks;
    } else {
      return maskedValue;
    }
  }
  unmaskValue(value: string): string {
    const unmaskedMathes = value.replace(' ', '').match(this._allFormatsGlobal);
    return unmaskedMathes ? unmaskedMathes.join('') : '';
  }
  getAllFormatRegexp(flags?: string) {
    return new RegExp(this._allFormatsStr, flags);
  }
  getFormatRegexp(formatChar: string): RegExp | null {
    // console.log(formatChar);
    // console.log(this._formatToRegExp[formatChar]);
    return formatChar && this._formatToRegExp[formatChar] ? this._formatToRegExp[formatChar] : null;
  }
}




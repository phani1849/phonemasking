import { Directive, Input, OnInit, ElementRef, HostListener, Renderer } from '@angular/core';
import { isNullOrUndefined } from 'util';


@Directive({
  selector: '[appMask]',
})
export class MaskDirective {
  @Input('appMask') appMask: string;
  @Input('seperator') seperator: string = '';
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
  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('input')
  onInput() {
    this.el.nativeElement.value = this._maskValue(this.el.nativeElement.value);
    this.el.nativeElement.selectionStart = this.curPosition;
    this.el.nativeElement.selectionEnd = this.curPosition;
  }
  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.backSpaceState = true;
  }

  private _maskValue(val: string): string {
    if (!val || !this.appMask || val === this._lastMaskedValue) {
      return val;
    }
    val = val.replace(/\D/g, '');
    let maskedVal = this._lastMaskedValue =
      this.valueToFormat(
        val,
        this.appMask,
        this._lastMaskedValue.length > val.length,
        this._lastMaskedValue);

    if (this.appMask === 'Mm/Dd/YYYY') {
      if (maskedVal != "") {
        let valueArray = val.replace(/\D/g, '');
        let lenocc = (maskedVal.match(new RegExp("/", "g")) || []).length;
        let monthOrg = valueArray.substr(0, 2);
        let month = parseInt(monthOrg);
        let dateOrg = valueArray.substr(2, 2);
        let date = parseInt(dateOrg);
        let yearOrg = valueArray.substr(4, 4);
        let year = parseInt(yearOrg);
        let checkDate = 31;
        if (this.backSpaceState) {
          this.curPosition = this.el.nativeElement.selectionEnd;
          this.backSpaceState = false;
        } else {
          if (valueArray.length === 3 || valueArray.length === 5) {
            this.curPosition = maskedVal.length + 1;
          } else {
            this.curPosition = this.el.nativeElement.selectionEnd;
          }
        }
        if (month > 12) {
          this.curPosition = 0;
          return this.addMaskSlashes('');
        } else {
          if (month === 2) {
            checkDate = 29;
          } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            checkDate = 31;
          } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            checkDate = 30;
          }
        }
        if (date > checkDate) {
          this.curPosition = 3;
          return this.addMaskSlashes(monthOrg);
        }
        if (yearOrg.length === 4 && year < 1900) {
          this.curPosition = 6;
          return this.addMaskSlashes(monthOrg + this.seperator + dateOrg);
        } else {
          if (month === 2) {
            let leepyear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
            if (yearOrg.length === 4 && !leepyear && date === 29) {
              this.curPosition = 0;
              return this.addMaskSlashes(monthOrg);
            }
          }
        }
      }
      maskedVal = this.addMaskSlashes(maskedVal);
      return maskedVal;
    } else {
      return maskedVal;
    }

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
  addMasks(n, dateValue) {
    let dateValueArray = dateValue.split('');
    console.log(dateValueArray);
    let response = [];
    for (let i = 0; i < n; i++) {
      if (!isNullOrUndefined(dateValueArray[i])) {
        response.push(dateValueArray[i]);
      } else {
        response.push('_');
      }
    }
    return response.join('');
  }
  addMaskSlashes(maskedValue) {
    if (maskedValue === "") {
      return "__/__/____";
    }
    if (this.appMask === 'Mm/Dd/YYYY') {
      let dateArray = maskedValue.split(this.seperator);
      let month = (!isNullOrUndefined(dateArray[0])) ? dateArray[0] : "";
      let day = (!isNullOrUndefined(dateArray[1])) ? dateArray[1] : "";
      let year = (!isNullOrUndefined(dateArray[2])) ? dateArray[2] : "";
      let monthMask = "";
      let dayMask = "";
      let yearMask = "";
      if (month.length === 2) {
        monthMask = month;
      } else {
        monthMask = this.addMasks(2, month);
      }
      if (day.length === 2) {
        dayMask = day;
      } else {
        dayMask = this.addMasks(2, day);
      }
      if (year.length === 4) {
        yearMask = year;
      } else {
        yearMask = this.addMasks(4, year);
      }
      console.log(monthMask + this.seperator + dayMask + this.seperator + yearMask);
      return monthMask + this.seperator + dayMask + this.seperator + yearMask;
      return maskedValue;
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
    return formatChar && this._formatToRegExp[formatChar] ? this._formatToRegExp[formatChar] : null;
  }
}




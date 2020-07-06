import { NativeDateAdapter } from '@angular/material';
import * as moment from 'moment';
import { FormControl, Validators } from '@angular/forms';
export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/DD/YYYY',
    },
    display: {
        dateInput: 'input',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
export class MyDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear().toString();
            let datenew = this._to2digit(month) + '/' + this._to2digit(day) + '/' + this._checkYrar(year);
            return datenew;
        } else {
            return date.toDateString();
        }
    }
    parse(value: any): Date | null {
        const date = moment(value, 'MM/DD/YYYY');
        return date.isValid() ? date.toDate() : null;
    }


    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
    private _checkYrar(n: string): string {
        if (n.length < 4) {
            let loopval = 4 - n.length;
            let addedStr = "";
            for (let i = 0; i < loopval; i++) {
                addedStr = addedStr + "_";
            }
            return n.substr(0, n.length) + addedStr;
        } else {
            return n;
        }
    }
    private _get4digit(n: string) {
        if (n.length < 4) {
            let loopval = 4 - n.length;
            let addedStr = "";
            for (let i = 0; i < loopval; i++) {
                addedStr = addedStr + "_";
            }
            return n.substr(0, n.length) + addedStr;
        } else {
            return n.substr(0, 4);
        }

    }
}
export class DateValidator extends Validators {
    static dateValidator(fdValue: FormControl) {
        const date = fdValue.value;
        if (date === null || date === '') {
            return { requiredFromDate: true };
        }
        let year = date.getFullYear();
        if (year < 1900) {
            return { requiredFromDate: true };
        }
    }
    static fromDateValidator(fdValue: FormControl) {
        const date = fdValue.value;
        if (date === null || date === '') return { requiredFromDate: true };
    }
    static ToDateValidator(todValue: FormControl) {
        const date = todValue.value;
        if (date === null || date === '') return { requiredToDate: true };
    }
}

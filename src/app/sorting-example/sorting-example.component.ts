import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sorting-example',
  templateUrl: './sorting-example.component.html',
  styleUrls: ['./sorting-example.component.scss']
})
export class SortingExampleComponent implements OnInit {

  sortingForm: FormGroup;
  transactions = [
    {
      'lable': 'Unmatched Payments',
      'data': [
        { 'transactionId': 12345677, 'shares': 2.34, 'possiblematches': '1g', 'accountid': '12-257895' },
        { 'transactionId': 12345678, 'shares': 3.34, 'possiblematches': '2g', 'accountid': '12-257896' },
        { 'transactionId': 12345679, 'shares': 1.34, 'possiblematches': '3g', 'accountid': '12-257897' },
        { 'transactionId': 12345680, 'shares': 1.34, 'possiblematches': '4g', 'accountid': '12-257898' },
        { 'transactionId': 12345681, 'shares': 0.34, 'possiblematches': '5g', 'accountid': '12-257899' },
        { 'transactionId': 12345682, 'shares': 3.34, 'possiblematches': '6g', 'accountid': '12-257820' },
        { 'transactionId': 12345683, 'shares': 5.34, 'possiblematches': '1g', 'accountid': '12-257821' },
        { 'transactionId': 12345677, 'shares': 1.34, 'possiblematches': '1g', 'accountid': '12-257822' },
        { 'transactionId': 12345677, 'shares': 4.34, 'possiblematches': '1g', 'accountid': '12-257823' },
        { 'transactionId': 12345677, 'shares': 8.34, 'possiblematches': '4g', 'accountid': '12-257895' },
        { 'transactionId': 12345684, 'shares': 1.34, 'possiblematches': '1g', 'accountid': '12-257895' }
      ]
    },
    {
      'lable': 'Grants',
      'data': [
        { 'transactionId': 12345677, 'shares': 4.34, 'possiblematches': '1g', 'accountid': '12-257825' },
        { 'transactionId': 12345677, 'shares': 2.34, 'possiblematches': '1g', 'accountid': '12-257895' },
        { 'transactionId': 12345685, 'shares': 5.34, 'possiblematches': '8g', 'accountid': '12-257895' },
        { 'transactionId': 12345677, 'shares': 2.34, 'possiblematches': '1g', 'accountid': '12-257826' }
      ]
    },
    {
      'lable': 'Accounting',
      'data': [
        { 'transactionId': 12345686, 'shares': 2.34, 'possiblematches': '1g', 'accountid': '12-257827' },
        { 'transactionId': 12345687, 'shares': 6.34, 'possiblematches': '8g', 'accountid': '12-257856' },
        { 'transactionId': 12345681, 'shares': 2.34, 'possiblematches': '3g', 'accountid': '12-257821' },
        { 'transactionId': 12345682, 'shares': 2.34, 'possiblematches': '9g', 'accountid': '12-257895' },
        { 'transactionId': 12345634, 'shares': 8.34, 'possiblematches': '1g', 'accountid': '12-257812' },
      ]
    }
  ];
  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.sortingForm = this.fb.group({
      sortByFiledValue: ['transactionId', []],
      orderBy: ['asc', []]
    });

  }
  get sortByValue() {
    return this.sortingForm.controls['sortByFiledValue'].value;
  }
  get orderByValue() {
    return this.sortingForm.controls['orderBy'].value;
  }

}

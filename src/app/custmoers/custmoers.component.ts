import { FormsModule } from '@angular/forms';
import { ICustomers } from '../Interfaces/icustomers';
import { Itransaction } from '../Interfaces/itransaction';
import { CustomerDataServiceService } from './../Services/customer-data-service.service';
import { Chart, ChartModule } from 'angular-highcharts';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custmoers',
  standalone: true,
  imports: [FormsModule, ChartModule],
  providers: [],
  templateUrl: './custmoers.component.html',
  styleUrls: ['./custmoers.component.css'] 
})
export class CustmoersComponent {
  constructor(private _CustomerServices: CustomerDataServiceService) { }
  Customers: ICustomers[] = [];
  Transactions: Itransaction[] = [];
  searchInput: string = '';
  amountData: number[] = [];
  dateData: string[] = [];
  lineChart: Chart | undefined;


  ngOnInit(): void {
    this._CustomerServices.getAllCustomers().subscribe({
      next: (res) => {
        console.log(res);
        this.Customers = res.customers
      },
      error: (error) => {
        console.log(error);

      }
    })

    this._CustomerServices.getAllTransactions().subscribe({
      next: (res) => {
        console.log(res);

        this.Transactions = res.transactions
      },
      error: (error) => {
        console.log(error);
      }


    })

    this.ApplyChart();
  }


  getCustomerNameFromTransaction(customerId: number, Customers: ICustomers[]): string {
    return Customers.find(c => c.id == customerId.toString())?.name || 'Not Found';
  }

  filterTransactionsAndCustomerName(): Itransaction[] {
    var query = this.searchInput.toLowerCase();
    return this.Transactions.filter(transaction => {
      var customerName = this.getCustomerNameFromTransaction(transaction.customer_id, this.Customers).toLowerCase();
      var transactionAmount = transaction.amount.toString();
        return customerName.includes(query) || transactionAmount.includes(query) ;
    }
    );
  }

  UpdateChart(Transaction: Itransaction) {

    var customerTransactions = this.Transactions.filter(t => t.customer_id === Transaction.customer_id);

    const customerName = this.getCustomerNameFromTransaction(Transaction.customer_id, this.Customers);

    this.amountData = customerTransactions.map(t => t.amount);

    this.dateData = customerTransactions.map(t => t.date);

    if (this.lineChart) {
      this.lineChart.ref$.subscribe(chart => {
        chart.setTitle({ text: `${customerName} Transactions` });
        chart.series[0].setData(this.amountData);
        chart.xAxis[0].setCategories(this.dateData);
      });
    } else {
      console.error('lineChart is not Found');
    }


  }

  ApplyChart() {
    this.lineChart = new Chart({
      chart: { type: 'line' },
      title: { text: "" },
      credits: { enabled: false },
      series: [
        {
          name: 'Amount',
          data: this.amountData
        } as any
      ],
      xAxis: {
        categories: this.dateData
      },
      yAxis: {
        title: { text: 'Amount' },
        min: 0,
        max: 3000
      }
    });
  }



















}

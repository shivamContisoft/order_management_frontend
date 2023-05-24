import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { DateFilterPipe } from '../pipe/date-filter';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root',
})

export class ExporterClass {

    constructor(private datePipe: DateFilterPipe) { }

    public exportToXlsx(dataArray: any, dataColumns: any, fileName: string = "Report excel", disableHtmlInExport: boolean = false) {
        let Heading: any = [[]];
        let Data: any = [];

        // Filter out header data 
        dataColumns.map((col: any) => {
            if (col.isEnabled && col.exportable) {
                Heading[0].push(col.value);
            }
        });

        // Prepare data for export
        dataArray.map((dt: any) => {
            var dtR: any = {};
            dataColumns.map((col: any) => {
                if (col.isEnabled && col.exportable) {
                    dtR[col.name] = disableHtmlInExport ? (this.removeTags('isDate' in col && col.isDate ? this.datePipe.transform(dt[col.name], col) : dt[col.name])) : ('isDate' in col && col.isDate ? this.datePipe.transform(dt[col.name], col) : dt[col.name]);
                }
            });
            Data.push(dtR);
        });

        //Had to create a new workbook and then add the header
        const wb = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, Data, { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    private removeTags(dataValue: any) {
        if ((dataValue === null) || (dataValue === '')) return ''; else return typeof dataValue == 'object' ? dataValue.changingThisBreaksApplicationSecurity.toString().replace(/(<([^>]+)>)/ig, '')  : dataValue.toString().replace(/(<([^>]+)>)/ig, '');
    }
}


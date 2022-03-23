import {Component} from '@angular/core';
import {capSQLiteSet, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {SQLiteService} from "./SQLiteService";
import {capSQLiteValues} from "@capacitor-community/sqlite/dist/esm/definitions";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    private readonly CREATEDEMOTABLE: string = 'CREATE TABLE demo (id INTEGER PRIMARY KEY, nr INTEGER, message TEXT)';
    private readonly SELECTSTATEMENT: string = 'SELECT * FROM demo';

    public entities = [];

    private db: SQLiteDBConnection;

    constructor(private sqliteService: SQLiteService) {
        this.initialize();
        this.demo();
    }

    private async initialize(): Promise<void> {
        await this.sqliteService.initializePlugin();
    }

    private async demo(): Promise<void> {

        this.db = await this.sqliteService.createConnection('demo', false, 'secret', 1);
        await this.db.open();

      console.log("----------- CREATE TABLE:")
      await this.db.execute(this.CREATEDEMOTABLE);

        // inserts
      console.log("----------- INSERTS:")
        const queries: capSQLiteSet[] = [{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [11, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [12, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [13, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [14, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [15, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [16, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [17, "abcdefgh"]
        },{
          statement: 'INSERT INTO demo (nr, message) VALUES (?,?)',
          values: [18, "abcdefgh"]
        },];

        await this.db.executeSet(queries);

        // select
      console.log("----------- SELECT:")
      const result: capSQLiteValues = await this.db.query(this.SELECTSTATEMENT);

      if(result && result.values) {
        result.values.forEach((entry) => {
            this.entities.push(JSON.stringify(entry));
          })
      }
    }
}

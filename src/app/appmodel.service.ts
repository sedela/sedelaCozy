import { Injectable } from '@angular/core'; // importing the OnInit interface

 import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import CozyClient from 'cozy-client';


@Injectable()

export class DataService {

   client: any;
   dbdata: any;
   dballdata: any;
   constructor(private http: HttpClient) {}

   setConnect(tokenparam, domain) {
    const  cozyclient = new CozyClient({
      uri: 'http://' + domain,
      token: tokenparam
  });
    this.client = cozyclient;
  }

  public getDelta() {
      const query =  this.client.query(
        this.client.find('io.sedela.writings').where({doc_name: 'mydocument'})
      ).then(
        ({ data }) => this.dbdata = data
      );

  
   return this.dbdata[0];

  }
  public getAllDocs() {
      const query =  this.client.query(
        this.client.find('io.sedela.writings').sortBy({create_date: 'asc'})
      ).then(
        ({ data }) => this.dballdata = data
      );
   return this.dballdata;

  }

  public postDelta(opss: any, name: string) {
    let documents  = {doc_name: name, ops: opss, create_date: new Date(), last_modif: new Date()};
    //this.client.mutate(
        this.client.create('io.sedela.writings', documents)
  //  )
  /** setTimeout(() => {
     return this.getAllDocs();  
     }, 1000)*/
     return documents;  
  }

  public CreateDoctype() {
        this.client.create('io.sedela.writings');
        console.log('le doctype est cree');
  }

 /* public getForum() {
    const query =  this.client.query(
      this.client.find('io.sedela.comments').sortBy({date_post: 'desc'})
    ).then(
      ({ data }) => console.log(data)
    );

 return query;
  }*/
 
  getCommentaire() {
    //const uri = this.client.uri + '/api/commentaires';
    //const uri = 'http://cozy.tools:3000/api/commentaires';
    const uri = '/api/commentaires';
    console.log('URL MONGODB:', uri);
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  public postForum(posts: any) {
    //const post = {subject: posts.subject, comment: posts.subject, date_post: posts.date };
    const   post = {posts: posts}
    this.client.mutate(
        this.client.create('io.sedela.comments', post)
         ).then(
       ({ data }) => console.log(data)
   );

  }

   public deleteForum() {
        this.client.delete('io.sedela.comments');
  }

 

}

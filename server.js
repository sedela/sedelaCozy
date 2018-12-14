//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express'); 

 //Nous créons un objet body-parser
 var bodyParser = require("body-parser"); 
 // variable pour gerer les chemmins
 var path = require('path');

// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose'); 

// Nous définissons ici les paramètres du serveur.
//var hostname = 'localhost'; 
//var port = 3000; 
//const port = process.env.PORT || '3000';

 
 // La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose'); 

// Ces options sont recommandées par mLab pour une connexion à la base
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 
 
//URL de notre base de données
 var urlmongo = "mongodb://mniang:mniang86@ds119080.mlab.com:19080/sedeladb";
 
 // Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, options);
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
}); 

// Nous créons un objet de type Express. 
var app       = express(); 

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    app.set('port', port);
  });
//app.set('port', port);

//Nous créons un objet body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//Nous activons le cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
   });

   //Nous creeons le s
 var commentaireSchema = mongoose.Schema({
    post_id:  {type: Number, default: 0 },
    date: { type: Date, default: Date.now },  
    description: String   
}); 
 
var Commentaire  = mongoose.model('Commentaire', commentaireSchema);

//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 
 
 // Je souhaite la bienvenue à mes utilisateurs
 //s'ils appellent l'URI racine (/)
 myRouter.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "Bienvenue sur notre Sedela API ", methode : req.method});
});
 
// Je vous rappelle notre route (/commentaires).  
myRouter.route('/commentaires')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET

.get(function(req,res){ 
// Utilisation de notre schéma Commentaire pour interrogation de la base
    Commentaire.find(function(err, commentaires){
        if (err){
            res.send(err); 
        }
        res.json(commentaires); 
    }); 
})

//POST
.post(function(req,res){
 // Nous utilisons le schéma Commentaire
      var commentaire = new Commentaire();
      // Nous récupérons les données reçues pour les ajouter à l'objet Commentaire
      
      commentaire.description = req.body.description;
      //Nous stockons l'objet en base
       commentaire.save(function(err){
        if(err){
          res.send(err);
        }
        res.send({message : 'Bravo, le commentaire est maintenant stockée en base de données'});
      });
     
})

 //Acceder à des ressources par leur identifiant
myRouter.route('/commentaires/:post_id')
.get(function(req,res){ 
            //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
            Commentaire.findById(req.params.post_id, function(err, commentaire) {
            if (err)
                res.send(err);
            res.json(commentaire);
        });
})

.put(function(req,res){ 
    // On commence par rechercher le commentaire souhaité
                Commentaire.findById(req.params.post_id, function(err, commentaire) {
                if (err){
                    res.send(err);
                }
                    // Mise à jour des données du commentaire
                       commentaire.post_id = req.body.post_id;
     		       commentaire.date = req.body.date;
      		       commentaire.description = req.body.description;
                              commentaire.save(function(err){
                                if(err){
                                  res.send(err);
                                }
                                // Si tout est ok
                                res.json({message : 'Bravo, mise à jour des données OK'});
                              });                
                });
})

.delete(function(req,res){ 
 
    Commentaire.remove({_id: req.params.post_id}, function(err, commentaire){
        if (err){
            res.send(err); 
        }
        res.json({message:"Bravo, commentaire supprimé"}); 
    }); 
    
});
 

// Nous demandons à l'application d'utiliser notre routeur
 
 app.use('/api', myRouter);  
 
// Démarrer le serveur 
/*app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});*/


/** app.listen(port, function(){
    console.log('Listening on port', +port);
  });*/
  
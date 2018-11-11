import React, { Component } from 'react'
import * as firebase from 'firebase';

class Clothy extends Component {
    constructor(){
        super();
        this.state = {
            
        }

        this.changeFormValue = this.changeFormValue.bind(this);
        this.changeFormValueCouleur = this.changeFormValueCouleur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const config = {
            apiKey: "AIzaSyCnGZv18P30Fx24q5H0mx2LP3S5vJuH23M",
            authDomain: "clothy-a191a.firebaseapp.com",
            databaseURL: "https://clothy-a191a.firebaseio.com",
            projectId: "clothy-a191a",
            storageBucket: "clothy-a191a.appspot.com",
            messagingSenderId: "464382396170"
            
            
        };
        
        firebase.initializeApp(config);
        this.state = {
            vetement: "",
            value: "",
            valueCouleur: "",
        
            
          };
        
        
       
        
        
    }
    //Methode permettant d'acctualiser vetement de firebase
    actualiserBase(){
        const itemsRef = firebase.database().ref('vetement');
          
        itemsRef.on('value', (snapshot) => {
            
            this.setState({
            vetement: snapshot.val()
        });
        console.log(this.state.vetement)

        
      });
        
    }
    
    
    //Methode appeller a l'actualisation de la page
    componentWillMount(){
        this.actualiserBase()
    };
    
    changeFormValue(event){
        console.log(event.target.value)
        this.setState({
            value: event.target.value
        })
    }
    changeFormValueCouleur(event){
        console.log(event.target.value)
        this.setState({
            valueCouleur: event.target.value
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        const itemsRef = firebase.database().ref("vetement");
        const item = {
            name: this.state.value,
            couleur: this.state.valueCouleur,

        }
        itemsRef.push(item);
        this.setState({
            value: ""
        })
    }
    
    render(){
        return(

            <div>
                
                <div className="navbar-brand navbar-light navbar-expand-lg">
                </div>
                
               <form onSubmit={this.handleSubmit} className="form-inline center-block">


                  <label className="form-control">
                    Nom du vetement:
                    </label>
                    <input type="text" placeholder="exemple: Jeans" className="form-control" value={this.state.value} onChange={this.changeFormValue} />
                    <button className="btn btn-primary">Créer un vetement</button>


                <label className="form-control">
                    Couleur du Vetement::
                    </label>
                    <input type="text" placeholder="exemple: Bleu" className="form-control" value={this.state.valueCouleur} onChange={this.changeFormValueCouleur} />
                  
                  
            </form>
            
            <div>
                <div>
                    <h3>Ma garde robe: </h3>
                    {Object.values(this.state.vetement).map(object => {
                        return(<div key={object.name}>  Vetement: {object.name} Couleur: {object.couleur} </div>
                            )
                        
                        
                        }
                    )}
                </div>
            </div>
               
            </div>

        )
    }

}


export default Clothy
